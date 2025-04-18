import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const SetupTwoFactor: React.FC = () => {
  const [secret, setSecret] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setupTwoFactor, verifyTwoFactor } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const initSetup = async () => {
      try {
        const { error, secret, qrCode } = await setupTwoFactor();
        
        if (error) {
          toast.error('Failed to setup 2FA');
          return;
        }
        
        if (secret && qrCode) {
          setSecret(secret);
          setQrCode(qrCode);
        }
      } catch (error) {
        console.error('Error setting up 2FA:', error);
        toast.error('Failed to setup 2FA');
      }
    };
    
    initSetup();
  }, [setupTwoFactor]);
  
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
      
      toast.success('2FA setup complete');
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Setup Two-Factor Authentication</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Enhance your account security with 2FA
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="text-center">
          {qrCode && (
            <div className="inline-block p-4 bg-white rounded-lg">
              <QRCodeSVG value={qrCode} size={200} />
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Setup Instructions</h3>
            <ol className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>1. Install an authenticator app (like Google Authenticator)</li>
              <li>2. Scan the QR code or enter the secret key manually</li>
              <li>3. Enter the verification code shown in your app</li>
            </ol>
          </div>
          
          {secret && (
            <div>
              <label className="form-label">Secret Key (if QR code doesn't work)</label>
              <div className="mt-1">
                <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">
                  {secret}
                </code>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
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
              />
            </div>
            
            <button
              type="submit"
              className="mt-4 btn btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Verifying...' : 'Verify and Enable 2FA'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetupTwoFactor;