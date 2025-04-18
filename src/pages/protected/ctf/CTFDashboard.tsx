import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Flag, CheckCircle, Tag, Activity, Trophy, Filter, 
  Search, ChevronDown, ChevronUp, Clock, Users
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../config/supabase';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  points: number;
  is_active: boolean;
  hints: { text: string }[] | null;
  created_at: string;
  isSolved?: boolean;
}

interface UserScore {
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  total_points: number;
  solved_count: number;
}

const CTFDashboard: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSolved, setShowSolved] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<string[]>(['easy', 'medium', 'hard']);
  const [expandedLeaderboard, setExpandedLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<UserScore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch challenges and submissions
  useEffect(() => {
    if (!user) return;
    
    const fetchChallenges = async () => {
      try {
        // Get all challenges
        const { data: challengesData, error: challengesError } = await supabase
          .from('ctf_challenges')
          .select('*')
          .eq('is_active', true)
          .order('difficulty', { ascending: true })
          .order('points', { ascending: true });
          
        if (challengesError) throw challengesError;
        
        // Get user's solved challenges
        const { data: submissionsData, error: submissionsError } = await supabase
          .from('ctf_submissions')
          .select('challenge_id')
          .eq('user_id', user.id)
          .eq('is_correct', true);
          
        if (submissionsError) throw submissionsError;
        
        // Mark solved challenges
        const solvedChallengeIds = submissionsData.map(sub => sub.challenge_id);
        const updatedChallenges = challengesData.map(challenge => ({
          ...challenge,
          isSolved: solvedChallengeIds.includes(challenge.id)
        }));
        
        setChallenges(updatedChallenges);
        setFilteredChallenges(updatedChallenges);
        
        // Extract categories
        const uniqueCategories = Array.from(new Set(challengesData.map((c: Challenge) => c.category)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching challenges:', error);
        toast.error('Failed to load challenges');
      }
    };
    
    const fetchLeaderboard = async () => {
      try {
        // This would be a database function in a real app
        // For this demo, we'll fetch and calculate manually
        
        // Get all correct submissions
        const { data: submissions, error: submissionsError } = await supabase
          .from('ctf_submissions')
          .select('user_id, challenge_id, is_correct')
          .eq('is_correct', true);
          
        if (submissionsError) throw submissionsError;
        
        // Get challenge point values
        const { data: challengePoints, error: challengesError } = await supabase
          .from('ctf_challenges')
          .select('id, points');
          
        if (challengesError) throw challengesError;
        
        // Get user profiles
        const { data: profiles, error: profilesError } = await supabase
          .from('user_profiles')
          .select('user_id, display_name, avatar_url');
          
        if (profilesError) throw profilesError;
        
        // Create points lookup
        const pointsLookup: Record<string, number> = {};
        challengePoints.forEach((c: any) => {
          pointsLookup[c.id] = c.points;
        });
        
        // Create profiles lookup
        const profilesLookup: Record<string, { display_name: string; avatar_url: string | null }> = {};
        profiles.forEach((p: any) => {
          profilesLookup[p.user_id] = {
            display_name: p.display_name || 'Anonymous',
            avatar_url: p.avatar_url
          };
        });
        
        // Calculate scores
        const scores: Record<string, { points: number; solved: number }> = {};
        submissions.forEach((s: any) => {
          if (!scores[s.user_id]) {
            scores[s.user_id] = { points: 0, solved: 0 };
          }
          
          scores[s.user_id].points += pointsLookup[s.challenge_id] || 0;
          scores[s.user_id].solved += 1;
        });
        
        // Create leaderboard
        const leaderboardData = Object.entries(scores).map(([userId, score]) => ({
          user_id: userId,
          display_name: profilesLookup[userId]?.display_name || 'Anonymous',
          avatar_url: profilesLookup[userId]?.avatar_url,
          total_points: score.points,
          solved_count: score.solved
        }));
        
        // Sort by points
        leaderboardData.sort((a, b) => b.total_points - a.total_points);
        
        setLeaderboard(leaderboardData);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    Promise.all([fetchChallenges(), fetchLeaderboard()]);
  }, [user]);
  
  // Apply filters
  useEffect(() => {
    let filtered = [...challenges];
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }
    
    // Apply difficulty filter
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(c => c.difficulty === selectedDifficulty);
    }
    
    // Apply solved/unsolved filter
    if (!showSolved) {
      filtered = filtered.filter(c => !c.isSolved);
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        c => c.title.toLowerCase().includes(query) || 
             c.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredChallenges(filtered);
  }, [challenges, selectedCategory, selectedDifficulty, showSolved, searchQuery]);
  
  // Get difficulty color
  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  // Get category color
  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      'web': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'crypto': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'forensics': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'pwn': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      'reverse': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      'misc': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    };
    
    return colors[category.toLowerCase()] || 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300';
  };
  
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CTF Challenges</h1>
        
        {isAdmin && (
          <Link to="/admin?tab=challenges" className="btn btn-primary">
            Manage Challenges
          </Link>
        )}
      </div>
      
      {/* Leaderboard */}
      <div className="card">
        <div 
          className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center cursor-pointer"
          onClick={() => setExpandedLeaderboard(!expandedLeaderboard)}
        >
          <div className="flex items-center">
            <Trophy className="h-5 w-5 text-amber-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Leaderboard</h2>
          </div>
          <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
            {expandedLeaderboard ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
        
        {expandedLeaderboard && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Challenges Solved
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {leaderboard.map((entry, index) => (
                  <tr key={entry.user_id} className={entry.user_id === user?.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                          {entry.display_name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {entry.display_name}
                            {entry.user_id === user?.id && ' (You)'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {entry.total_points}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {entry.solved_count}
                    </td>
                  </tr>
                ))}
                
                {leaderboard.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      No entries yet. Be the first to solve a challenge!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Filters */}
      <div className="card mb-6">
        <div className="p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search challenges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-input"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <select 
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="form-input"
            >
              <option value="all">All Difficulties</option>
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showSolved"
              checked={showSolved}
              onChange={(e) => setShowSolved(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="showSolved" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Show solved challenges
            </label>
          </div>
        </div>
      </div>
      
      {/* Challenges */}
      {filteredChallenges.length === 0 ? (
        <div className="card p-8 text-center">
          <div className="mb-4 flex justify-center">
            <Flag className="h-16 w-16 text-gray-300 dark:text-gray-600" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No challenges found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {searchQuery || selectedCategory !== 'all' || selectedDifficulty !== 'all' 
              ? 'Try changing your search or filter criteria' 
              : 'No challenges are available yet'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChallenges.map((challenge) => (
            <Link 
              to={`/ctf/${challenge.id}`} 
              key={challenge.id}
              className="card overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{challenge.title}</h3>
                  {challenge.isSolved && (
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  )}
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-3">
                  {challenge.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <div className={`text-xs px-2 py-1 rounded-full flex items-center ${getCategoryColor(challenge.category)}`}>
                    <Tag className="h-3 w-3 mr-1" />
                    {challenge.category}
                  </div>
                  
                  <div className={`text-xs px-2 py-1 rounded-full flex items-center ${getDifficultyColor(challenge.difficulty)}`}>
                    <Activity className="h-3 w-3 mr-1" />
                    {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                  </div>
                  
                  <div className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 flex items-center">
                    <Trophy className="h-3 w-3 mr-1" />
                    {challenge.points} pts
                  </div>
                </div>
                
                <div className="flex text-xs text-gray-500 dark:text-gray-400 justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {format(new Date(challenge.created_at), 'MMM d, yyyy')}
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {Math.floor(Math.random() * 20) + 1} solves
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CTFDashboard;