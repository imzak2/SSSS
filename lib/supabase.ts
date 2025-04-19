import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type User = {
  id: string;
  full_name: string;
  current_rank: string;
  rank_level: number;
  points: number;
  streak_days: number;
};

export type Challenge = {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  points: number;
  completion_count: number;
  description: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  earned?: boolean;
};

export type ActivityLog = {
  id: string;
  activity_type: string;
  title: string;
  description: string;
  points_earned?: number;
  created_at: string;
};

export async function fetchUserData(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
  
  return data;
}

export async function fetchChallenges(): Promise<Challenge[]> {
  const { data, error } = await supabase
    .from('challenges')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching challenges:', error);
    return [];
  }
  
  return data || [];
}

export async function fetchAchievements(userId: string): Promise<Achievement[]> {
  const { data: achievements, error: achievementsError } = await supabase
    .from('achievements')
    .select('*');
    
  if (achievementsError) {
    console.error('Error fetching achievements:', achievementsError);
    return [];
  }

  const { data: userAchievements, error: userAchievementsError } = await supabase
    .from('user_achievements')
    .select('achievement_id')
    .eq('user_id', userId);
    
  if (userAchievementsError) {
    console.error('Error fetching user achievements:', userAchievementsError);
    return [];
  }

  const earnedAchievementIds = new Set(userAchievements?.map(ua => ua.achievement_id));
  
  return (achievements || []).map(achievement => ({
    ...achievement,
    earned: earnedAchievementIds.has(achievement.id)
  }));
}

export async function fetchActivityLogs(userId: string): Promise<ActivityLog[]> {
  const { data, error } = await supabase
    .from('activity_logs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(10);
  
  if (error) {
    console.error('Error fetching activity logs:', error);
    return [];
  }
  
  return data || [];
}