import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const VerifyTwoFactor: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { verifyTwoFactor } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode.trim()) {
      toast.error('Please enter the verification code');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await verifyTwoFactor(verificationCode);
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      toast.success('2FA verification successful');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error verifying 2FA:', error);
      toast.error('Failed to verify code');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="card p-6 sm:p-8">
      <div className="text-center mb-6">
        <div className="mx-auto w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4">
          <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Two-Factor Authentication</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Enter the verification code from your authenticator app
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="code" className="form-label">
            Verification Code
          </label>
          <input
            id="code"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="form-input"
            placeholder="Enter 6-digit code"
            required
            autoFocus
          />
        </div>
        
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Verifying...' : 'Verify Code'}
        </button>
      </form>
      
      <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
        Having trouble? Contact support for assistance.
      </p>
    </div>
  );
};

export default VerifyTwoFactor;