import React, { useState, useEffect } from 'react';
import { Plus, Search, Eye, EyeOff, Edit, Trash2, Copy, ExternalLink, Filter } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../config/supabase';
import { encryptData, decryptData } from '../../../utils/encryption';
import { getStrengthColor, getStrengthLabel } from '../../../utils/passwordStrength';
import toast from 'react-hot-toast';
import PasswordForm from './PasswordForm';

interface Password {
  id: string;
  title: string;
  website_url: string | null;
  username: string;
  encrypted_password: string;
  iv: string;
  strength_score: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
  decrypted_password?: string;
}

const PasswordManager: React.FC = () => {
  const { user } = useAuth();
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [filteredPasswords, setFilteredPasswords] = useState<Password[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState<Password | null>(null);
  const [masterPassword, setMasterPassword] = useState('');
  const [showMasterPasswordModal, setShowMasterPasswordModal] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [filterType, setFilterType] = useState<'all' | 'weak' | 'strong'>('all');
  
  // Load passwords
  useEffect(() => {
    if (!user) return;
    
    const fetchPasswords = async () => {
      try {
        const { data, error } = await supabase
          .from('passwords')
          .select('*')
          .eq('user_id', user.id)
          .order('title');
          
        if (error) throw error;
        
        setPasswords(data || []);
        setFilteredPasswords(data || []);
      } catch (error) {
        console.error('Error fetching passwords:', error);
        toast.error('Failed to load passwords');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPasswords();
  }, [user]);
  
  // Apply filters and search
  useEffect(() => {
    let filtered = [...passwords];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.website_url && p.website_url.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply type filter
    if (filterType === 'weak') {
      filtered = filtered.filter(p => p.strength_score <= 2);
    } else if (filterType === 'strong') {
      filtered = filtered.filter(p => p.strength_score >= 3);
    }
    
    setFilteredPasswords(filtered);
  }, [passwords, searchQuery, filterType]);
  
  // Handle master password submit
  const handleMasterPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!masterPassword) {
      toast.error('Please enter your master password');
      return;
    }
    
    setShowMasterPasswordModal(false);
    
    // In a real app, you would verify the master password against a stored verifier
    toast.success('Master password set for this session');
  };
  
  // Toggle password visibility
  const togglePasswordVisibility = (passwordId: string) => {
    if (!masterPassword) {
      setShowMasterPasswordModal(true);
      return;
    }
    
    setVisiblePasswords(prev => {
      const newState = { ...prev };
      
      if (!newState[passwordId]) {
        try {
          // Find the password
          const password = passwords.find(p => p.id === passwordId);
          if (!password) return prev;
          
          // Decrypt the password
          const decrypted = decryptData(password.encrypted_password, masterPassword, password.iv);
          
          // Update the password object with decrypted value
          const updatedPasswords = passwords.map(p => 
            p.id === passwordId ? { ...p, decrypted_password: decrypted } : p
          );
          
          setPasswords(updatedPasswords);
          newState[passwordId] = true;
        } catch (error) {
          toast.error('Incorrect master password');
          return prev;
        }
      } else {
        newState[passwordId] = false;
      }
      
      return newState;
    });
  };
  
  // Copy password to clipboard
  const copyPassword = (passwordId: string) => {
    if (!masterPassword) {
      setShowMasterPasswordModal(true);
      return;
    }
    
    try {
      // Find the password
      const password = passwords.find(p => p.id === passwordId);
      if (!password) return;
      
      // If already decrypted, use that
      if (password.decrypted_password) {
        navigator.clipboard.writeText(password.decrypted_password);
        toast.success('Password copied to clipboard');
        return;
      }
      
      // Otherwise decrypt it
      const decrypted = decryptData(password.encrypted_password, masterPassword, password.iv);
      navigator.clipboard.writeText(decrypted);
      toast.success('Password copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy password. Check your master password.');
    }
  };
  
  // Handle add/edit form submit
  const handleFormSubmit = async (formData: Omit<Password, 'id' | 'created_at' | 'updated_at'> & { password: string }) => {
    if (!user) return;
    
    try {
      const { encryptedData, iv } = encryptData(formData.password, masterPassword || formData.password);
      
      if (currentPassword) {
        // Update existing password
        const { error } = await supabase
          .from('passwords')
          .update({
            title: formData.title,
            website_url: formData.website_url,
            username: formData.username,
            encrypted_password: encryptedData,
            iv: iv,
            strength_score: formData.strength_score,
            notes: formData.notes,
            updated_at: new Date().toISOString()
          })
          .eq('id', currentPassword.id);
          
        if (error) throw error;
        
        // Update local state
        setPasswords(prev => prev.map(p => 
          p.id === currentPassword.id 
            ? { 
                ...p, 
                title: formData.title,
                website_url: formData.website_url,
                username: formData.username,
                encrypted_password: encryptedData,
                iv: iv,
                strength_score: formData.strength_score,
                notes: formData.notes,
                updated_at: new Date().toISOString()
              } 
            : p
        ));
        
        toast.success('Password updated successfully');
      } else {
        // Create new password
        const { data, error } = await supabase
          .from('passwords')
          .insert({
            user_id: user.id,
            title: formData.title,
            website_url: formData.website_url,
            username: formData.username,
            encrypted_password: encryptedData,
            iv: iv,
            strength_score: formData.strength_score,
            notes: formData.notes
          })
          .select()
          .single();
          
        if (error) throw error;
        
        // Add to local state
        setPasswords(prev => [...prev, data]);
        
        toast.success('Password added successfully');
      }
      
      // If we didn't have a master password, set it
      if (!masterPassword) {
        setMasterPassword(formData.password);
      }
      
      setIsModalOpen(false);
      setCurrentPassword(null);
    } catch (error) {
      console.error('Error saving password:', error);
      toast.error('Failed to save password');
    }
  };
  
  // Delete password
  const deletePassword = async (id: string) => {
    if (!confirm('Are you sure you want to delete this password?')) return;
    
    try {
      const { error } = await supabase
        .from('passwords')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setPasswords(prev => prev.filter(p => p.id !== id));
      toast.success('Password deleted successfully');
    } catch (error) {
      console.error('Error deleting password:', error);
      toast.error('Failed to delete password');
    }
  };
  
  // Open edit modal
  const editPassword = (password: Password) => {
    if (!masterPassword) {
      setShowMasterPasswordModal(true);
      return;
    }
    
    setCurrentPassword(password);
    setIsModalOpen(true);
  };
  
  // UI for master password modal
  const renderMasterPasswordModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Enter Master Password</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Your master password is used to encrypt and decrypt your passwords. 
          It is not stored anywhere and cannot be recovered if forgotten.
        </p>
        
        <form onSubmit={handleMasterPasswordSubmit}>
          <div className="mb-4">
            <label htmlFor="masterPassword" className="form-label">
              Master Password
            </label>
            <input 
              type="password"
              id="masterPassword"
              className="form-input"
              value={masterPassword}
              onChange={(e) => setMasterPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={() => setShowMasterPasswordModal(false)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      {showMasterPasswordModal && renderMasterPasswordModal()}
      
      {isModalOpen && (
        <PasswordForm 
          password={currentPassword}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setCurrentPassword(null);
          }}
          masterPassword={masterPassword}
        />
      )}
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Password Manager</h1>
        
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="btn btn-primary flex items-center"
        >
          <Plus size={20} className="mr-2" /> Add Password
        </button>
      </div>
      
      <div className="card mb-6">
        <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search passwords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'weak' | 'strong')}
              className="form-input"
            >
              <option value="all">All Passwords</option>
              <option value="weak">Weak Passwords</option>
              <option value="strong">Strong Passwords</option>
            </select>
          </div>
        </div>
      </div>
      
      {filteredPasswords.length === 0 ? (
        <div className="card p-8 text-center">
          <div className="mb-4 flex justify-center">
            <Key className="h-16 w-16 text-gray-300 dark:text-gray-600" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No passwords found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {searchQuery || filterType !== 'all' 
              ? 'Try changing your search or filter criteria' 
              : 'Start by adding your first password'}
          </p>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="btn btn-primary"
          >
            Add Password
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredPasswords.map((password) => (
            <div key={password.id} className="card overflow-hidden">
              <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-grow">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{password.title}</h3>
                    <div className={`text-xs px-2 py-0.5 rounded-full ${
                      password.strength_score <= 1 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                      password.strength_score === 2 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                      password.strength_score === 3 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    }`}>
                      {getStrengthLabel(password.strength_score)}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {password.username}
                  </div>
                  
                  {password.website_url && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                      <a 
                        href={password.website_url.startsWith('http') ? password.website_url : `https://${password.website_url}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        {password.website_url} <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => togglePasswordVisibility(password.id)}
                    className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {visiblePasswords[password.id] ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  
                  <button 
                    onClick={() => copyPassword(password.id)}
                    className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Copy size={18} />
                  </button>
                  
                  <button 
                    onClick={() => editPassword(password)}
                    className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Edit size={18} />
                  </button>
                  
                  <button 
                    onClick={() => deletePassword(password.id)}
                    className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              {visiblePasswords[password.id] && password.decrypted_password && (
                <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Password:</span>
                    <code className="px-2 py-1 bg-gray-100 dark:bg-gray-600 rounded text-sm font-mono">
                      {password.decrypted_password}
                    </code>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PasswordManager;