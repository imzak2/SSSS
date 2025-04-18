import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';
import { useSessionTimeout } from './hooks/useSessionTimeout';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import LoadingScreen from './components/common/LoadingScreen';

// Public Pages
const Login = lazy(() => import('./pages/public/Login'));
const Register = lazy(() => import('./pages/public/Register'));
const SetupTwoFactor = lazy(() => import('./pages/public/SetupTwoFactor'));
const VerifyTwoFactor = lazy(() => import('./pages/public/VerifyTwoFactor'));
const ForgotPassword = lazy(() => import('./pages/public/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/public/ResetPassword'));
const NotFound = lazy(() => import('./pages/public/NotFound'));

// Protected Pages
const Dashboard = lazy(() => import('./pages/protected/Dashboard'));
const PasswordManager = lazy(() => import('./pages/protected/passwords/PasswordManager'));
const VulnerabilityScanner = lazy(() => import('./pages/protected/scanner/VulnerabilityScanner'));
const CTFDashboard = lazy(() => import('./pages/protected/ctf/CTFDashboard'));
const CTFChallenge = lazy(() => import('./pages/protected/ctf/CTFChallenge'));
const AdminPanel = lazy(() => import('./pages/protected/admin/AdminPanel'));
const Profile = lazy(() => import('./pages/protected/Profile'));
const Settings = lazy(() => import('./pages/protected/Settings'));

function App() {
  const { user, isLoading } = useAuth();
  const { theme } = useTheme();
  
  // Set up session timeout
  useSessionTimeout(30); // Auto logout after 30 minutes of inactivity
  
  // Apply theme to body
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50';
  }, [theme]);
  
  // Update title
  useEffect(() => {
    document.title = 'SecureGuard - Cybersecurity Platform';
  }, []);
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/setup-2fa" element={<SetupTwoFactor />} />
          <Route path="/verify-2fa" element={<VerifyTwoFactor />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        
        {/* Protected Routes */}
        <Route element={user ? <DashboardLayout /> : <Navigate to="/login" />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/passwords" element={<PasswordManager />} />
          <Route path="/scanner" element={<VulnerabilityScanner />} />
          <Route path="/ctf" element={<CTFDashboard />} />
          <Route path="/ctf/:challengeId" element={<CTFChallenge />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;