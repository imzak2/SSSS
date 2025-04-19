"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Github, Terminal } from 'lucide-react';
import { signIn } from '@/lib/supabase-client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-background">
      <div className="relative w-full max-w-md mx-4">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 transform rotate-12 rounded-3xl blur-3xl" />
        
        <Card className="relative border-border/50 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <Terminal className="h-8 w-8 text-purple-500" />
            </div>
            <h1 className="text-2xl font-bold">{t('auth.login.title')}</h1>
            <p className="text-sm text-muted-foreground">
              {t('auth.login.description')}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.login.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('auth.login.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.login.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
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
                {loading ? t('auth.login.loggingIn') : t('auth.login.signIn')}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {t('auth.login.orContinueWith')}
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full" disabled={loading}>
              <Github className="mr-2 h-4 w-4" /> Github
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 text-center">
            <div className="text-sm text-muted-foreground">
              {t('auth.login.noAccount')}{' '}
              <Link 
                href="/register" 
                className="text-purple-500 hover:text-purple-600 font-medium"
              >
                {t('auth.login.signUp')}
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