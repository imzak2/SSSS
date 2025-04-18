import zxcvbn from 'zxcvbn';

export interface PasswordStrength {
  score: number; // 0-4
  feedback: {
    warning: string;
    suggestions: string[];
  };
  crack_time_display: string;
}

export function checkPasswordStrength(password: string): PasswordStrength {
  const result = zxcvbn(password);
  
  return {
    score: result.score,
    feedback: result.feedback,
    crack_time_display: result.crack_times_display.offline_slow_hashing_1e4_per_second
  };
}

export function getStrengthColor(score: number): string {
  switch (score) {
    case 0:
    case 1:
      return 'text-red-500';
    case 2:
      return 'text-orange-500';
    case 3:
      return 'text-yellow-500';
    case 4:
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
}

export function getStrengthLabel(score: number): string {
  switch (score) {
    case 0:
      return 'Very Weak';
    case 1:
      return 'Weak';
    case 2:
      return 'Moderate';
    case 3:
      return 'Strong';
    case 4:
      return 'Very Strong';
    default:
      return 'Unknown';
  }
}

export function generateStrongPassword(length = 16, includeSymbols = true): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
  
  let chars = uppercase + lowercase + numbers;
  if (includeSymbols) chars += symbols;
  
  let password = '';
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  
  for (let i = 0; i < length; i++) {
    password += chars[array[i] % chars.length];
  }
  
  // Ensure password has at least one character from each required group
  const ensureGroups = [
    { group: uppercase, character: uppercase[Math.floor(Math.random() * uppercase.length)] },
    { group: lowercase, character: lowercase[Math.floor(Math.random() * lowercase.length)] },
    { group: numbers, character: numbers[Math.floor(Math.random() * numbers.length)] }
  ];
  
  if (includeSymbols) {
    ensureGroups.push({ 
      group: symbols, 
      character: symbols[Math.floor(Math.random() * symbols.length)] 
    });
  }
  
  // Replace random characters in the password with characters from each group
  for (let i = 0; i < ensureGroups.length; i++) {
    const position = Math.floor(Math.random() * length);
    password = password.substring(0, position) + ensureGroups[i].character + password.substring(position + 1);
  }
  
  return password;
}