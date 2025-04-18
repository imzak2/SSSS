import React from 'react';
import { ShieldCheck } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center animate-pulse">
        <ShieldCheck className="h-16 w-16 text-indigo-600 dark:text-indigo-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">SecureGuard</h1>
        <p className="text-gray-600 dark:text-gray-400">Loading secure environment...</p>
      </div>
      
      <div className="mt-8 w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-600 dark:bg-indigo-400 animate-pulse-slow rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;