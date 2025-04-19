"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Github, Terminal, Check, Loader2, User, Mail, Lock, ChevronLeft } from 'lucide-react';
import { signUp } from '@/lib/supabase-client';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({ fullName: false, email: false, password: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signUp(email, password);
      router.push('/login');
    } catch (err) {
      setError('Error creating account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Validation
  const isFullNameValid = fullName.length >= 2;
  const isEmailValid = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const hasLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const isPasswordValid = hasLength && hasUpperCase && hasNumber && hasSpecial;

  // Calculate password strength
  const getPasswordStrength = () => {
    let strength = 0;
    if (hasLength) strength += 25;
    if (hasUpperCase) strength += 25;
    if (hasNumber) strength += 25;
    if (hasSpecial) strength += 25;
    return strength;
  };

  const getStrengthColor = (strength: number) => {
    if (strength <= 25) return 'bg-red-500';
    if (strength <= 50) return 'bg-orange-500';
    if (strength <= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <main className="min-h-screen bg-[url('/images/circuit-pattern.png')] bg-repeat bg-opacity-5 relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="fixed top-20 -left-28 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"></div>
      <div className="fixed top-1/2 -right-28 w-96 h-96 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 blur-3xl"></div>

      {/* Back to Home Link */}
      <a
        href="/"
        className="fixed top-6 left-6 flex items-center text-sm text-muted-foreground hover:text-purple-500 transition-colors duration-200"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        {t('auth.backToHome')}
      </a>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="relative border-border/50 shadow-2xl bg-background/95 backdrop-blur-xl">
              <CardHeader className="space-y-1 text-center pb-8">
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-center mb-2"
                >
                  <div className="p-3 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
                    <Terminal className="h-8 w-8 text-purple-500" />
                  </div>
                </motion.div>
                <h1 className="text-2xl font-bold tracking-tight">{t('auth.register.title')}</h1>
                <p className="text-sm text-muted-foreground">
                  {t('auth.register.description')}
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium">
                      {t('auth.register.fullName')}
                    </Label>
                    <div className="relative">
                      <Input
                        id="fullName"
                        placeholder={t('auth.register.namePlaceholder')}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        onBlur={() => setTouched({ ...touched, fullName: true })}
                        className={`pl-10 ${
                          touched.fullName && !isFullNameValid ? 'border-red-500 focus:ring-red-500' : ''
                        }`}
                        required
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                    {touched.fullName && !isFullNameValid && (
                      <p className="text-xs text-red-500 mt-1">Please enter your full name</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      {t('auth.register.email')}
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder={t('auth.register.emailPlaceholder')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setTouched({ ...touched, email: true })}
                        className={`pl-10 ${
                          touched.email && !isEmailValid ? 'border-red-500 focus:ring-red-500' : ''
                        }`}
                        required
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                    {touched.email && !isEmailValid && (
                      <p className="text-xs text-red-500 mt-1">Please enter a valid email address</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      {t('auth.register.password')}
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => setTouched({ ...touched, password: true })}
                        className={`pl-10 ${
                          touched.password && !isPasswordValid ? 'border-red-500 focus:ring-red-500' : ''
                        }`}
                        required
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Password Strength</span>
                          <span className={`font-medium ${getStrengthColor(getPasswordStrength()).replace('bg-', 'text-')}`}>
                            {getPasswordStrength()}%
                          </span>
                        </div>
                        <Progress value={getPasswordStrength()} className="h-2" 
                          indicatorClassName={getStrengthColor(getPasswordStrength())} />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className={`flex items-center space-x-2 text-sm ${hasLength ? 'text-green-500' : 'text-muted-foreground'}`}>
                          <Check className={`h-4 w-4 ${hasLength ? 'opacity-100' : 'opacity-40'}`} />
                          <span>8+ characters</span>
                        </div>
                        <div className={`flex items-center space-x-2 text-sm ${hasUpperCase ? 'text-green-500' : 'text-muted-foreground'}`}>
                          <Check className={`h-4 w-4 ${hasUpperCase ? 'opacity-100' : 'opacity-40'}`} />
                          <span>Uppercase</span>
                        </div>
                        <div className={`flex items-center space-x-2 text-sm ${hasNumber ? 'text-green-500' : 'text-muted-foreground'}`}>
                          <Check className={`h-4 w-4 ${hasNumber ? 'opacity-100' : 'opacity-40'}`} />
                          <span>Number</span>
                        </div>
                        <div className={`flex items-center space-x-2 text-sm ${hasSpecial ? 'text-green-500' : 'text-muted-foreground'}`}>
                          <Check className={`h-4 w-4 ${hasSpecial ? 'opacity-100' : 'opacity-40'}`} />
                          <span>Special char</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500 text-center bg-red-500/10 border border-red-500/20 rounded-md p-2"
                    >
                      {error}
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
                    disabled={loading || !isFullNameValid || !isEmailValid || !isPasswordValid}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('auth.register.creatingAccount')}
                      </>
                    ) : (
                      t('auth.register.createAccount')
                    )}
                  </Button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      {t('auth.register.orContinueWith')}
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full hover:bg-purple-500/5 hover:border-purple-500/30 transition-colors duration-300"
                  disabled={loading}
                >
                  <Github className="mr-2 h-4 w-4" /> Github
                </Button>
              </CardContent>
              <CardFooter className="text-center">
                <div className="text-sm text-muted-foreground">
                  {t('auth.register.haveAccount')}{' '}
                  <a
                    href="/login"
                    className="text-purple-500 hover:text-purple-600 font-medium underline-offset-4 hover:underline"
                  >
                    {t('auth.register.signIn')}
                  </a>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
}