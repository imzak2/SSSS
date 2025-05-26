"use client"

import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Trophy, 
  Layers, 
  Users, 
  BarChart, 
  Terminal, 
  Code, 
  Lock,
  Zap,
  Server,
  Database,
  Cpu,
  Shield,
  Crown
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase-client';

export function FeatureSection() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleViewChallenges = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  const features = [
    {
      icon: <Terminal className="h-6 w-6 text-purple-400" />,
      title: t('features.items.challenges.title'),
      description: t('features.items.challenges.description'),
      color: "from-purple-500/20 to-blue-500/20"
    },
    {
      icon: <Trophy className="h-6 w-6 text-yellow-400" />,
      title: t('features.items.progression.title'),
      description: t('features.items.progression.description'),
      color: "from-yellow-500/20 to-orange-500/20"
    },
    {
      icon: <Users className="h-6 w-6 text-blue-400" />,
      title: t('features.items.community.title'),
      description: t('features.items.community.description'),
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: <BarChart className="h-6 w-6 text-green-400" />,
      title: t('features.items.analytics.title'),
      description: t('features.items.analytics.description'),
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: <Shield className="h-6 w-6 text-red-400" />,
      title: t('features.items.disciplines.title'),
      description: t('features.items.disciplines.description'),
      color: "from-red-500/20 to-pink-500/20"
    },
    {
      icon: <Layers className="h-6 w-6 text-indigo-400" />,
      title: t('features.items.paths.title'),
      description: t('features.items.paths.description'),
      color: "from-indigo-500/20 to-purple-500/20"
    }
  ];

  const categories = [
    { 
      title: t('curriculum.categories.pentesting.title'),
      icon: <Server className="h-10 w-10 text-purple-400" />,
      items: t('curriculum.categories.pentesting.items', { returnObjects: true }) || [],
      color: "from-purple-500 to-blue-500"
    },
    { 
      title: t('curriculum.categories.programming.title'),
      icon: <Code className="h-10 w-10 text-blue-400" />,
      items: t('curriculum.categories.programming.items', { returnObjects: true }) || [],
      color: "from-blue-500 to-cyan-500"
    },
    { 
      title: t('curriculum.categories.cryptography.title'),
      icon: <Lock className="h-10 w-10 text-green-400" />,
      items: t('curriculum.categories.cryptography.items', { returnObjects: true }) || [],
      color: "from-green-500 to-emerald-500",
      beta: true
    }
  ];

  return (
    <>
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-3 px-3 py-1 bg-blue-500/10 text-blue-400 border-blue-500/20">
              <Zap className="mr-1 h-3 w-3" /> {t('nav.features')}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-400">
                {t('features.title')}
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('features.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-background/50 backdrop-blur-sm border border-border hover:border-purple-500/30 transition-all duration-300 overflow-hidden group">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-background border border-border">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section id="curriculum" className="py-20 bg-gradient-to-b from-background to-background/80 relative">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/circuit-pattern.png')] bg-repeat opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-3 px-3 py-1 bg-purple-500/10 text-purple-400 border-purple-500/20">
              <Cpu className="mr-1 h-3 w-3" /> {t('nav.curriculum')}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-400">
                {t('curriculum.title')}
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('curriculum.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative bg-background/95 backdrop-blur-sm rounded-lg p-6 h-full border border-border flex flex-col">
                  {category.beta && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                        <Crown className="mr-1 h-3 w-3" />
                        Coming Soon Beta Access
                      </Badge>
                    </div>
                  )}
                  <div className="mb-6 flex items-center space-x-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} text-white`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>
                  
                  <ul className="space-y-3 mb-6 flex-grow">
                    {(Array.isArray(category.items) ? category.items : []).map((item: string, i: number) => (
                      <li key={i} className="flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant="outline" 
                    className="mt-auto w-full border-purple-500/30 hover:bg-purple-500/10 hover:border-purple-500/50"
                    onClick={handleViewChallenges}
                  >
                    {t('curriculum.viewChallenges')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}