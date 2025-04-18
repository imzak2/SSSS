import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { checkPasswordStrength, getStrengthColor, getStrengthLabel } from '../../utils/passwordStrength';
import toast from 'react-hot-toast';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();
  
  const passwordStrength = checkPasswordStrength(password);
  const strengthColor = getStrengthColor(passwordStrength.score);
  const strengthLabel = getStrengthLabel(passwordStrength.score);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (passwordStrength.score < 3) {
      toast.error('Please use a stronger password');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await signUp(email, password, displayName);
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      toast.success('Registration successful');
      navigate('/dashboard');
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'At least one uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'At least one lowercase letter', met: /[a-z]/.test(password) },
    { label: 'At least one number', met: /[0-9]/.test(password) },
    { label: 'At least one special character', met: /[^A-Za-z0-9]/.test(password) }
  ];
  
  return (
    <div className="card p-6 sm:p-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create your account</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Join SecureGuard's cybersecurity platform
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="displayName" className="form-label">
            Display Name
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="form-input"
            placeholder="John Doe"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            placeholder="you@example.com"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input pr-10"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          
          {password && (
            <div className="mt-2">
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                  <div 
                    className={`h-1.5 rounded-full ${
                      passwordStrength.score === 0 ? 'bg-red-500' :
                      passwordStrength.score === 1 ? 'bg-red-500' :
                      passwordStrength.score === 2 ? 'bg-orange-500' :
                      passwordStrength.score === 3 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${(passwordStrength.score + 1) * 20}%` }}
                  ></div>
                </div>
                <span className={`ml-2 text-sm ${strengthColor}`}>{strengthLabel}</span>
              </div>
              
              <ul className="mt-2 space-y-1 text-sm">
                {passwordRequirements.map((req, index) => (
                  <li key={index} className="flex items-center">
                    {req.met ? (
                      <Check className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-gray-400 mr-1" />
                    )}
                    <span className={req.met ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}>
                      {req.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input"
            placeholder="••••••••"
            required
          />
          {confirmPassword && password !== confirmPassword && (
            <p className="mt-1 text-sm text-red-500">Passwords do not match</p>
          )}
        </div>
        
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>
      
      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;