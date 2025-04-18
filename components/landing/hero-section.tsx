"use client"

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Code, Lock, Zap, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const { t } = useTranslation();
  const [typedText, setTypedText] = useState('');
  const fullText = t('hero.subtitle');
  const typingSpeed = 50;
  
  useEffect(() => {
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);
    
    return () => clearInterval(typingInterval);
  }, [fullText]);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Badge className="px-3 py-1 bg-purple-500/10 text-purple-400 border-purple-500/20 mb-2">
              <Zap className="mr-1 h-3 w-3" /> {t('hero.promotion')}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
              {t('hero.title')}
            </h1>
            
            <div className="h-12">
              <p className="text-xl text-muted-foreground">
                {typedText}
                <span className="animate-pulse">|</span>
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white">
                  {t('hero.getStarted')} <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="border-purple-500/50 hover:border-purple-500 hover:bg-purple-500/10">
                  {t('hero.tryDemo')}
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur-sm opacity-75 animate-pulse"></div>
            <div className="relative bg-background/80 backdrop-blur-sm p-6 rounded-lg border border-purple-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                </div>
                <div className="text-xs text-muted-foreground">kalium@labs:~</div>
              </div>
              
              <div className="space-y-4 font-mono text-sm">
                <div>
                  <span className="text-green-400">$</span> <span className="text-blue-400">whoami</span>
                  <p className="mt-1 text-purple-400">cybersecurity_student</p>
                </div>
                
                <div>
                  <span className="text-green-400">$</span> <span className="text-blue-400">ls -la challenges/</span>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    {['Pentesting_Web', 'Cryptography', 'Programming', 'Network_Security'].map((item, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <span className="text-purple-400">drwxr-xr-x</span>
                        <span>{item}/</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-green-400">$</span> <span className="text-blue-400">kalium start --challenge xss_injection</span>
                  <p className="mt-1 text-yellow-400">Loading environment... <span className="animate-pulse">▊</span></p>
                  <p className="text-green-400">Challenge ready! Happy hacking!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}