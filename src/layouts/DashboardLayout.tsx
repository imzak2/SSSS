import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Menu, X, Home, Key, Search, Flag, Settings, 
  User, LogOut, Bell, ShieldAlert 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from '../components/common/ThemeToggle';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signOut, isAdmin, user } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-900/50 transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-md transform transition-transform lg:translate-x-0 lg:static lg:inset-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">SecureGuard</span>
            </div>
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto scrollbar-hide">
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </NavLink>
            
            <div className="pt-2 pb-1">
              <p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Security Tools
              </p>
            </div>
            
            <NavLink 
              to="/passwords" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Key className="h-5 w-5" />
              Password Manager
            </NavLink>
            
            <NavLink 
              to="/scanner" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Search className="h-5 w-5" />
              Vulnerability Scanner
            </NavLink>
            
            <NavLink 
              to="/ctf" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Flag className="h-5 w-5" />
              CTF Challenges
            </NavLink>
            
            {isAdmin && (
              <>
                <div className="pt-2 pb-1">
                  <p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Administration
                  </p>
                </div>
                
                <NavLink 
                  to="/admin" 
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                >
                  <ShieldAlert className="h-5 w-5" />
                  Admin Panel
                </NavLink>
              </>
            )}
            
            <div className="pt-2 pb-1">
              <p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Account
              </p>
            </div>
            
            <NavLink 
              to="/profile" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <User className="h-5 w-5" />
              Profile
            </NavLink>
            
            <NavLink 
              to="/settings" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Settings className="h-5 w-5" />
              Settings
            </NavLink>
            
            <button 
              onClick={handleSignOut}
              className="sidebar-link w-full text-left"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </nav>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top navbar */}
        <header className="h-16 bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="h-full px-4 flex justify-between items-center">
            <button
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <Bell className="h-5 w-5" />
              </button>
              
              <ThemeToggle />
              
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                  {user?.email || 'User'}
                </span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;