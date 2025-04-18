import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Key, Search, Flag, User, Settings, Calendar, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../config/supabase';
import { format } from 'date-fns';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  BarElement
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

interface Stats {
  passwordCount: number;
  scanCount: number;
  ctfSolved: number;
  weakPasswords: number;
}

interface RecentActivity {
  id: string;
  type: 'password' | 'scan' | 'ctf';
  title: string;
  timestamp: string;
}

const Dashboard: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState<Stats>({
    passwordCount: 0,
    scanCount: 0,
    ctfSolved: 0,
    weakPasswords: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Charts data
  const securityScoreData = {
    labels: ['Passwords', 'Scans', 'CTF Challenges', 'Overall'],
    datasets: [
      {
        label: 'Security Score',
        data: [75, 80, 65, 73],
        backgroundColor: [
          'rgba(79, 70, 229, 0.6)',
          'rgba(16, 185, 129, 0.6)',
          'rgba(245, 158, 11, 0.6)',
          'rgba(99, 102, 241, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const activityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Activity',
        data: [3, 5, 2, 8, 4, 6, 2],
        backgroundColor: 'rgba(79, 70, 229, 0.6)',
        borderColor: 'rgb(79, 70, 229)',
        borderWidth: 2,
      },
    ],
  };
  
  const vulnerabilityData = {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    datasets: [
      {
        label: 'Count',
        data: [2, 5, 8, 12],
        backgroundColor: [
          'rgba(239, 68, 68, 0.6)',
          'rgba(245, 158, 11, 0.6)',
          'rgba(16, 185, 129, 0.6)',
          'rgba(59, 130, 246, 0.6)',
        ],
      },
    ],
  };
  
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        // Fetch password count
        const { count: passwordCount } = await supabase
          .from('passwords')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id);
        
        // Fetch scan count
        const { count: scanCount } = await supabase
          .from('vulnerability_scans')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id);
        
        // Fetch CTF solutions count
        const { count: ctfSolved } = await supabase
          .from('ctf_submissions')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('is_correct', true);
        
        // Fetch weak passwords count
        const { count: weakPasswords } = await supabase
          .from('passwords')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .lte('strength_score', 2);
        
        setStats({
          passwordCount: passwordCount || 0,
          scanCount: scanCount || 0,
          ctfSolved: ctfSolved || 0,
          weakPasswords: weakPasswords || 0
        });
        
        // Fetch recent activity
        // For a real app, you would create a single query or function to get this efficiently
        const recentPasswords = await supabase
          .from('passwords')
          .select('id, title, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3);
          
        const recentScans = await supabase
          .from('vulnerability_scans')
          .select('id, target, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3);
          
        const recentCTF = await supabase
          .from('ctf_submissions')
          .select('id, challenge_id, submitted_at')
          .eq('user_id', user.id)
          .order('submitted_at', { ascending: false })
          .limit(3);
        
        // Combine and sort activity
        const activity: RecentActivity[] = [
          ...(recentPasswords.data || []).map(item => ({
            id: item.id,
            type: 'password' as const,
            title: `Password: ${item.title}`,
            timestamp: item.created_at
          })),
          ...(recentScans.data || []).map(item => ({
            id: item.id,
            type: 'scan' as const,
            title: `Scan: ${item.target}`,
            timestamp: item.created_at
          })),
          ...(recentCTF.data || []).map(item => ({
            id: item.id,
            type: 'ctf' as const,
            title: `Challenge submitted`,
            timestamp: item.submitted_at
          }))
        ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 5);
        
        setRecentActivity(activity);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [user]);
  
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="h-4 w-4" />
          <span>{format(new Date(), 'MMMM d, yyyy')}</span>
          <span className="mx-2">•</span>
          <Clock className="h-4 w-4" />
          <span>{format(new Date(), 'h:mm a')}</span>
        </div>
      </div>
      
      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-2">
              <Key className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Saved Passwords</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.passwordCount}</p>
            </div>
          </div>
          <div className="mt-2 text-sm">
            <span className="text-red-600 dark:text-red-400">{stats.weakPasswords} weak</span>
            {' • '}
            <Link to="/passwords" className="text-indigo-600 dark:text-indigo-400">View all</Link>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-2">
              <Search className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Vulnerability Scans</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.scanCount}</p>
            </div>
          </div>
          <div className="mt-2 text-sm">
            <span className="text-amber-600 dark:text-amber-400">7 issues found</span>
            {' • '}
            <Link to="/scanner" className="text-indigo-600 dark:text-indigo-400">Scan now</Link>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-2">
              <Flag className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">CTF Challenges Solved</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.ctfSolved}</p>
            </div>
          </div>
          <div className="mt-2 text-sm">
            <span className="text-green-600 dark:text-green-400">850 pts earned</span>
            {' • '}
            <Link to="/ctf" className="text-indigo-600 dark:text-indigo-400">View challenges</Link>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2">
              <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Account Security</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">73<span className="text-base font-normal">/100</span></p>
            </div>
          </div>
          <div className="mt-2 text-sm">
            <span className="text-amber-600 dark:text-amber-400">2FA not enabled</span>
            {' • '}
            <Link to="/settings" className="text-indigo-600 dark:text-indigo-400">Setup now</Link>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-4 col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Activity Overview</h2>
          <div className="h-64">
            <Line 
              data={activityData} 
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(156, 163, 175, 0.1)'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          </div>
        </div>
        
        <div className="card p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security Score</h2>
          <div className="h-64 flex items-center justify-center">
            <Doughnut 
              data={securityScoreData} 
              options={{
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Recent activity and vulnerabilities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className="p-4 flex items-start">
                  <div className={`rounded-full p-2 mr-3 ${
                    activity.type === 'password' ? 'bg-indigo-100 dark:bg-indigo-900/30' :
                    activity.type === 'scan' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                    'bg-amber-100 dark:bg-amber-900/30'
                  }`}>
                    {activity.type === 'password' ? (
                      <Key className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    ) : activity.type === 'scan' ? (
                      <Search className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Flag className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {format(new Date(activity.timestamp), 'MMM d, yyyy • h:mm a')}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No recent activity
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Link 
              to="/settings" 
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
            >
              View all activity
            </Link>
          </div>
        </div>
        
        <div className="card">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Vulnerability Overview</h2>
          </div>
          
          <div className="p-4">
            <div className="h-64">
              <Bar 
                data={vulnerabilityData} 
                options={{
                  maintainAspectRatio: false,
                  indexAxis: 'y',
                  scales: {
                    x: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(156, 163, 175, 0.1)'
                      }
                    },
                    y: {
                      grid: {
                        display: false
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Link 
              to="/scanner" 
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
            >
              View detailed results
            </Link>
          </div>
        </div>
      </div>
      
      {/* Quick actions */}
      <div className="card p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Link to="/passwords" className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Key className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-3" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Add Password</span>
          </Link>
          
          <Link to="/scanner" className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Search className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mb-3" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">New Scan</span>
          </Link>
          
          <Link to="/ctf" className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Flag className="h-8 w-8 text-amber-600 dark:text-amber-400 mb-3" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">CTF Challenges</span>
          </Link>
          
          <Link to="/settings" className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Settings className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-3" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Account Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;