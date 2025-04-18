/*
  # Initial schema for SecureGuard

  1. New Tables
     - `user_profiles` - User profile information
     - `passwords` - Encrypted passwords for Password Manager
     - `vulnerability_scans` - Vulnerability scan results
     - `ctf_challenges` - CTF challenges
     - `ctf_submissions` - User submissions for CTF challenges
  
  2. Security
     - Enable RLS on all tables
     - Add policies for authenticated users to access only their data
     - Add policies for admins to access all data
*/

-- Create user profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  display_name text,
  avatar_url text,
  is_admin boolean DEFAULT false NOT NULL,
  two_factor_enabled boolean DEFAULT false NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id)
);

-- Create passwords table for password manager
CREATE TABLE IF NOT EXISTS passwords (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  website_url text,
  username text NOT NULL,
  encrypted_password text NOT NULL,
  iv text NOT NULL,
  strength_score integer NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create vulnerability scans table
CREATE TABLE IF NOT EXISTS vulnerability_scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  target text NOT NULL,
  scan_type text NOT NULL,
  status text NOT NULL,
  results jsonb,
  started_at timestamptz DEFAULT now() NOT NULL,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create ctf challenges table
CREATE TABLE IF NOT EXISTS ctf_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  difficulty text NOT NULL,
  points integer NOT NULL,
  flag text NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  hints jsonb,
  created_at timestamptz DEFAULT now() NOT NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create ctf submissions table
CREATE TABLE IF NOT EXISTS ctf_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  challenge_id uuid REFERENCES ctf_challenges(id) ON DELETE CASCADE NOT NULL,
  is_correct boolean NOT NULL,
  submitted_flag text NOT NULL,
  submitted_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE passwords ENABLE ROW LEVEL SECURITY;
ALTER TABLE vulnerability_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE ctf_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE ctf_submissions ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Users can view their own profile"
  ON user_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
  ON user_profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_id = auth.uid() AND is_admin = true
    )
  );

-- Policies for passwords
CREATE POLICY "Users can view their own passwords"
  ON passwords
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own passwords"
  ON passwords
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own passwords"
  ON passwords
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own passwords"
  ON passwords
  FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for vulnerability_scans
CREATE POLICY "Users can view their own scans"
  ON vulnerability_scans
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own scans"
  ON vulnerability_scans
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own scans"
  ON vulnerability_scans
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own scans"
  ON vulnerability_scans
  FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all scans"
  ON vulnerability_scans
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_id = auth.uid() AND is_admin = true
    )
  );

-- Policies for ctf_challenges
CREATE POLICY "Anyone can view active challenges"
  ON ctf_challenges
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can view all challenges"
  ON ctf_challenges
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Admins can insert challenges"
  ON ctf_challenges
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Admins can update challenges"
  ON ctf_challenges
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Admins can delete challenges"
  ON ctf_challenges
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_id = auth.uid() AND is_admin = true
    )
  );

-- Policies for ctf_submissions
CREATE POLICY "Users can view their own submissions"
  ON ctf_submissions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own submissions"
  ON ctf_submissions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all submissions"
  ON ctf_submissions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_id = auth.uid() AND is_admin = true
    )
  );

-- Function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, display_name, is_admin, two_factor_enabled)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email), FALSE, FALSE);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create a profile for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample challenges for CTF
INSERT INTO ctf_challenges (title, description, category, difficulty, points, flag, hints)
VALUES 
('Web Fundamentals', 'Can you find the hidden flag in this webpage? View the source code carefully.', 'Web', 'easy', 100, 'flag{hidden_in_plain_sight}', '[{"text": "Sometimes important information is hidden in HTML comments."}]'),
('Crypto Challenge', 'Decrypt this message: Uijt jt b tjnqmf tijgu djqifs.', 'Crypto', 'medium', 200, 'flag{simple_shift_cipher}', '[{"text": "This is a classic Caesar cipher with a shift of 1."}]'),
('Binary Exploitation', 'Can you exploit this binary to get the flag?', 'Pwn', 'hard', 300, 'flag{buffer_overflow_101}', '[{"text": "Think about buffer overflows."}, {"text": "The program isn''t checking input length properly."}]');