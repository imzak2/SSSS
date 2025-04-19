"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Github, Terminal, Check } from 'lucide-react';
import { signUp } from '@/lib/supabase-client';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signUp(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Error creating account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Password strength indicators
  const hasLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  return (
    <main className="flex items-center justify-center min-h-screen bg-background">
      <div className="relative w-full max-w-md mx-4">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 transform -rotate-12 rounded-3xl blur-3xl" />
        
        <Card className="relative border-border/50 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <Terminal className="h-8 w-8 text-purple-500" />
            </div>
            <h1 className="text-2xl font-bold">{t('auth.register.title')}</h1>
            <p className="text-sm text-muted-foreground">
              {t('auth.register.description')}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">{t('auth.register.fullName')}</Label>
                <Input
                  id="fullName"
                  placeholder={t('auth.register.namePlaceholder')}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.register.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('auth.register.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.register.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${hasLength ? 'bg-green-500' : 'bg-gray-300'}`}>
                      {hasLength && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span className={hasLength ? 'text-green-500' : 'text-muted-foreground'}>
                      {t('auth.register.passwordStrength.characters')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${hasUpperCase ? 'bg-green-500' : 'bg-gray-300'}`}>
                      {hasUpperCase && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span className={hasUpperCase ? 'text-green-500' : 'text-muted-foreground'}>
                      {t('auth.register.passwordStrength.uppercase')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${hasNumber ? 'bg-green-500' : 'bg-gray-300'}`}>
                      {hasNumber && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span className={hasNumber ? 'text-green-500' : 'text-muted-foreground'}>
                      {t('auth.register.passwordStrength.number')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${hasSpecial ? 'bg-green-500' : 'bg-gray-300'}`}>
                      {hasSpecial && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span className={hasSpecial ? 'text-green-500' : 'text-muted-foreground'}>
                      {t('auth.register.passwordStrength.special')}
                    </span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-500 text-center">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500"
                disabled={loading}
              >
                {loading ? t('auth.register.creatingAccount') : t('auth.register.createAccount')}
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

            <Button variant="outline" className="w-full" disabled={loading}>
              <Github className="mr-2 h-4 w-4" /> Github
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 text-center">
            <div className="text-sm text-muted-foreground">
              {t('auth.register.haveAccount')}{' '}
              <Link 
                href="/login" 
                className="text-purple-500 hover:text-purple-600 font-medium"
              >
                {t('auth.register.signIn')}
              </Link>
            </div>
            <Link 
              href="/" 
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {t('auth.backToHome')}
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}