import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function useSessionTimeout(timeoutMinutes: number) {
  const { user, signOut } = useAuth();
  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  
  useEffect(() => {
    if (!user) return;
    
    // Update last activity time on user interactions
    const updateActivity = () => {
      setLastActivity(Date.now());
    };
    
    // Add event listeners for user activity
    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keypress', updateActivity);
    window.addEventListener('click', updateActivity);
    window.addEventListener('scroll', updateActivity);
    
    // Check for inactivity every minute
    const intervalId = setInterval(() => {
      const now = Date.now();
      const inactiveTime = now - lastActivity;
      const timeoutMilliseconds = timeoutMinutes * 60 * 1000;
      
      if (inactiveTime > timeoutMilliseconds) {
        // Log out user due to inactivity
        signOut();
      }
    }, 60000); // Check every minute
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keypress', updateActivity);
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('scroll', updateActivity);
      clearInterval(intervalId);
    };
  }, [user, lastActivity, timeoutMinutes, signOut]);
}