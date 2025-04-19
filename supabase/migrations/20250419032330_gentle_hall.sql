/*
  # Dashboard Data Schema

  1. New Tables
    - `users`
      - Core user data and statistics
    - `challenges`
      - Available challenges and their details
    - `user_challenges`
      - Track user progress on challenges
    - `achievements`
      - Available achievements
    - `user_achievements`
      - Track user achievements
    - `activity_logs`
      - User activity history

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table with stats
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  current_rank text DEFAULT 'Beginner',
  rank_level integer DEFAULT 1,
  points integer DEFAULT 0,
  streak_days integer DEFAULT 0,
  last_activity_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Challenges table
CREATE TABLE IF NOT EXISTS challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  difficulty text NOT NULL,
  points integer NOT NULL,
  completion_count integer DEFAULT 0,
  description text,
  created_at timestamptz DEFAULT now()
);

-- User challenges progress
CREATE TABLE IF NOT EXISTS user_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  challenge_id uuid REFERENCES challenges(id),
  status text DEFAULT 'in_progress',
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, challenge_id)
);

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  icon_name text,
  created_at timestamptz DEFAULT now()
);

-- User achievements
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  achievement_id uuid REFERENCES achievements(id),
  earned_at timestamptz DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Activity logs
CREATE TABLE IF NOT EXISTS activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  activity_type text NOT NULL,
  title text NOT NULL,
  description text,
  points_earned integer,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Policies
-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- Users can read all challenges
CREATE POLICY "Users can read all challenges" ON challenges
  FOR SELECT TO authenticated
  USING (true);

-- Users can read their own challenge progress
CREATE POLICY "Users can read own challenge progress" ON user_challenges
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Users can read all achievements
CREATE POLICY "Users can read all achievements" ON achievements
  FOR SELECT TO authenticated
  USING (true);

-- Users can read their own achievements
CREATE POLICY "Users can read own achievements" ON user_achievements
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Users can read their own activity logs
CREATE POLICY "Users can read own activity logs" ON activity_logs
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Insert some initial data
INSERT INTO challenges (title, category, difficulty, points, description) VALUES
  ('Web Shell Injection', 'Pentesting Web', 'Medium', 75, 'Learn to identify and exploit web shell injection vulnerabilities'),
  ('Buffer Overflow Basics', 'Programming', 'Hard', 120, 'Understanding buffer overflows and memory corruption'),
  ('Cipher Challenge', 'Cryptography', 'Easy', 50, 'Practice breaking basic substitution ciphers');

INSERT INTO achievements (title, description, icon_name) VALUES
  ('First Blood', 'Complete a challenge within 24 hours of release', 'Flag'),
  ('Perfect Score', 'Complete a challenge with 100% accuracy', 'Star'),
  ('Streak Master', 'Maintain a 7-day activity streak', 'Zap'),
  ('Web Warrior', 'Complete 5 web pentesting challenges', 'Shield'),
  ('Crypto King', 'Master all cryptography basics', 'Award');