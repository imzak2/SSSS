import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, Flag, CheckCircle, AlertCircle, HelpCircle, 
  Tag, Activity, Trophy, Clock, Users, ArrowLeft
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
  hints: { text: string }[] | null;
  is_active: boolean;
  created_at: string;
}

interface Submission {
  id: string;
  challenge_id: string;
  user_id: string;
  is_correct: boolean;
  submitted_flag: string;
  submitted_at: string;
}

const CTFChallenge: React.FC = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const { user } = useAuth();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [flag, setFlag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [revealedHints, setRevealedHints] = useState<Record<number, boolean>>({});
  const [isSolved, setIsSolved] = useState(false);
  
  useEffect(() => {
    if (!challengeId || !user) return;
    
    const fetchChallenge = async () => {
      try {
        // Get challenge details
        const { data, error } = await supabase
          .from('ctf_challenges')
          .select('*')
          .eq('id', challengeId)
          .eq('is_active', true)
          .single();
          
        if (error) throw error;
        
        setChallenge(data);
        
        // Get user's submissions for this challenge
        const { data: submissionsData, error: submissionsError } = await supabase
          .from('ctf_submissions')
          .select('*')
          .eq('challenge_id', challengeId)
          .eq('user_id', user.id)
          .order('submitted_at', { ascending: false });
          
        if (submissionsError) throw submissionsError;
        
        setSubmissions(submissionsData);
        
        // Check if the challenge is already solved
        setIsSolved(submissionsData.some(s => s.is_correct));
      } catch (error) {
        console.error('Error fetching challenge:', error);
        toast.error('Failed to load challenge');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchChallenge();
  }, [challengeId, user]);
  
  // Submit flag
  const submitFlag = async () => {
    if (!user || !challenge || !flag.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Check if flag is correct (in a real app, this would be done securely on the server)
      const isCorrect = flag.trim() === challenge.flag;
      
      // Create submission record
      const { data, error } = await supabase
        .from('ctf_submissions')
        .insert({
          user_id: user.id,
          challenge_id: challenge.id,
          submitted_flag: flag,
          is_correct: isCorrect
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // Update submissions
      setSubmissions([data, ...submissions]);
      
      // Show toast
      if (isCorrect) {
        toast.success('Correct flag! Challenge solved 🎉');
        setIsSolved(true);
      } else {
        toast.error('Incorrect flag. Try again!');
      }
      
      // Clear input
      setFlag('');
    } catch (error) {
      console.error('Error submitting flag:', error);
      toast.error('Failed to submit flag');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Toggle hint visibility
  const toggleHint = (index: number) => {
    setRevealedHints(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
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
  
  if (!challenge) {
    return (
      <div className="card p-8">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Challenge Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The challenge you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/ctf" className="btn btn-primary">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Challenges
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <Link to="/ctf" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
        <ChevronLeft className="h-5 w-5 mr-1" />
        Back to Challenges
      </Link>
      
      <div className="card">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{challenge.title}</h1>
            {isSolved && (
              <div className="flex items-center text-green-500">
                <CheckCircle className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">Solved</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
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
            
            <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {format(new Date(challenge.created_at), 'MMM d, yyyy')}
            </div>
            
            <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 flex items-center">
              <Users className="h-3 w-3 mr-1" />
              {Math.floor(Math.random() * 20) + 1} solves
            </div>
          </div>
          
          <div className="prose dark:prose-invert max-w-none mb-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              {challenge.description}
            </div>
          </div>
          
          {/* Hints */}
          {challenge.hints && challenge.hints.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-amber-500" />
                Hints
              </h3>
              
              <div className="space-y-2">
                {challenge.hints.map((hint, index) => (
                  <div 
                    key={index}
                    className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3"
                  >
                    <button
                      onClick={() => toggleHint(index)}
                      className="w-full flex justify-between items-center text-left"
                    >
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Hint {index + 1}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {revealedHints[index] ? 'Hide' : 'Reveal'}
                      </span>
                    </button>
                    
                    {revealedHints[index] && (
                      <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-300">
                        {hint.text}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Flag submission */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
              <Flag className="h-5 w-5 mr-2 text-indigo-500" />
              Submit Flag
            </h3>
            
            <div className="flex items-start space-x-2">
              <input
                type="text"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                placeholder="Enter flag (e.g., flag{...})"
                className="form-input flex-grow"
                disabled={isSolved || isSubmitting}
              />
              
              <button 
                onClick={submitFlag}
                className="btn btn-primary"
                disabled={isSolved || isSubmitting || !flag.trim()}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
            
            {submissions.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Submissions ({submissions.length})
                </h4>
                
                <div className="space-y-2">
                  {submissions.slice(0, 5).map((submission) => (
                    <div 
                      key={submission.id}
                      className={`p-2 text-sm rounded-lg flex items-center ${
                        submission.is_correct 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}
                    >
                      {submission.is_correct 
                        ? <CheckCircle className="h-4 w-4 mr-2" /> 
                        : <AlertCircle className="h-4 w-4 mr-2" />}
                      
                      <div className="flex-grow">
                        <code className="font-mono">{submission.submitted_flag}</code>
                      </div>
                      
                      <div className="text-xs">
                        {format(new Date(submission.submitted_at), 'MMM d, h:mm a')}
                      </div>
                    </div>
                  ))}
                  
                  {submissions.length > 5 && (
                    <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                      + {submissions.length - 5} more submissions
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTFChallenge;