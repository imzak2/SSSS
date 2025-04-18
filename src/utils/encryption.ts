import CryptoJS from 'crypto-js';

// Generate a random encryption key (for local storage)
export const generateEncryptionKey = (): string => {
  return CryptoJS.lib.WordArray.random(256 / 8).toString();
};

// Encrypt data with AES
export const encryptData = (data: string, masterPassword: string): { encryptedData: string, iv: string } => {
  const iv = CryptoJS.lib.WordArray.random(128 / 8);
  const encrypted = CryptoJS.AES.encrypt(data, masterPassword, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  
  return {
    encryptedData: encrypted.toString(),
    iv: iv.toString()
  };
};

// Decrypt data with AES
export const decryptData = (encryptedData: string, masterPassword: string, iv: string): string => {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, masterPassword, {
    iv: CryptoJS.enc.Hex.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  
  return decrypted.toString(CryptoJS.enc.Utf8);
};

// Check if master password can decrypt a test string
export const verifyMasterPassword = (testEncrypted: string, testIv: string, masterPassword: string): boolean => {
  try {
    const decrypted = decryptData(testEncrypted, masterPassword, testIv);
    return decrypted === 'VALID'; // This is the known plaintext we encrypted
  } catch (error) {
    return false;
  }
};

// Create a test encrypted string to verify master password later
export const createMasterPasswordVerifier = (masterPassword: string): { encrypted: string, iv: string } => {
  return encryptData('VALID', masterPassword);
};