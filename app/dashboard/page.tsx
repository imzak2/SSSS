"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserRankCard } from '@/components/dashboard/user-rank-card';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { ChallengeCard } from '@/components/dashboard/challenge-card';
import { RecentAchievements } from '@/components/dashboard/recent-achievements';
import { 
  Trophy, 
  Zap, 
  ArrowUpRight, 
  TrendingUp, 
  Award,
  Terminal,
  Code,
  Lock,
  Users,
  Flame
} from 'lucide-react';

export default function DashboardPage() {
  const [progress, setProgress] = useState(0);
  const [challengeProgress, setChallengeProgress] = useState({ completed: 0, total: 0 });
  
  // Simulate loading progress
  useEffect(() => {
    // Simulate progress loading
    const timer = setTimeout(() => setProgress(72), 500);
    
    // Simulate challenge data loading
    setChallengeProgress({ completed: 18, total: 25 });
    
    return () => clearTimeout(timer);
  }, []);

  // Dashboard stats
  const stats = [
    { 
      title: "Current Rank", 
      value: "Hacker", 
      category: "Pentesting Web",
      change: "+2 ranks", 
      trend: "up",
      icon: <Trophy className="h-5 w-5 text-yellow-400" />
    },
    { 
      title: "Points", 
      value: "740", 
      change: "+120 this week", 
      trend: "up",
      icon: <Zap className="h-5 w-5 text-purple-400" />
    },
    { 
      title: "Streak", 
      value: "12 days", 
      change: "Personal best!", 
      trend: "up",
      icon: <Flame className="h-5 w-5 text-red-400" />
    },
    { 
      title: "Platform Ranking", 
      value: "#342", 
      change: "Top 10%", 
      trend: "up",
      icon: <TrendingUp className="h-5 w-5 text-blue-400" />
    }
  ];

  // Featured challenges
  const featuredChallenges = [
    {
      title: "Web Shell Injection",
      category: "Pentesting Web",
      difficulty: "Medium",
      points: 75,
      completedBy: "63%",
      color: "from-purple-500 to-blue-500",
      icon: <Terminal className="h-5 w-5" />
    },
    {
      title: "Buffer Overflow Basics",
      category: "Programming",
      difficulty: "Hard",
      points: 120,
      completedBy: "27%",
      color: "from-blue-500 to-cyan-500",
      icon: <Code className="h-5 w-5" />
    },
    {
      title: "Cipher Challenge",
      category: "Cryptography",
      difficulty: "Easy",
      points: 50,
      completedBy: "82%",
      color: "from-green-500 to-emerald-500",
      icon: <Lock className="h-5 w-5" />
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Alex</h1>
            <p className="text-muted-foreground">Your cybersecurity journey continues</p>
          </div>
          <Button className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
            <Zap className="mr-2 h-4 w-4" /> Daily Challenge
          </Button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-background/50 backdrop-blur-sm border border-border hover:border-purple-500/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-full bg-background border border-border">
                  {stat.icon}
                </div>
                {stat.trend === 'up' && (
                  <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                    {stat.change}
                  </Badge>
                )}
              </div>
              <div className="mt-3">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <div className="flex items-end">
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  {stat.category && (
                    <span className="ml-2 text-xs text-muted-foreground">{stat.category}</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-background/50 backdrop-blur-sm border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5 text-purple-400" />
              Learning Progress
            </CardTitle>
            <CardDescription>
              Level 5 - {challengeProgress.completed} of {challengeProgress.total} challenges completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-muted" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Terminal className="mr-1 h-3 w-3 text-purple-400" />
                      <span>Pentesting Web</span>
                    </div>
                    <span className="font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2 bg-muted" 
                    indicatorClassName="bg-gradient-to-r from-purple-500 to-blue-500" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Code className="mr-1 h-3 w-3 text-blue-400" />
                      <span>Programming</span>
                    </div>
                    <span className="font-medium">83%</span>
                  </div>
                  <Progress value={83} className="h-2 bg-muted"
                    indicatorClassName="bg-gradient-to-r from-blue-500 to-cyan-500" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Lock className="mr-1 h-3 w-3 text-green-400" />
                      <span>Cryptography</span>
                    </div>
                    <span className="font-medium">42%</span>
                  </div>
                  <Progress value={42} className="h-2 bg-muted"
                    indicatorClassName="bg-gradient-to-r from-green-500 to-emerald-500" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Tabs defaultValue="featured" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
              </TabsList>
              <Button variant="link" className="text-primary">
                View all <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
            
            <TabsContent value="featured" className="space-y-4">
              {featuredChallenges.map((challenge, index) => (
                <ChallengeCard key={index} challenge={challenge} />
              ))}
            </TabsContent>
            
            <TabsContent value="recommended" className="space-y-4">
              <ChallengeCard 
                challenge={{
                  title: "Password Cracking Lab",
                  category: "Cryptography",
                  difficulty: "Medium",
                  points: 85,
                  completedBy: "48%",
                  color: "from-green-500 to-emerald-500",
                  icon: <Lock className="h-5 w-5" />
                }} 
              />
              {/* Additional recommended challenges would go here */}
            </TabsContent>
            
            <TabsContent value="new" className="space-y-4">
              <ChallengeCard 
                challenge={{
                  title: "Docker Escape Challenge",
                  category: "Pentesting Web",
                  difficulty: "Expert",
                  points: 150,
                  completedBy: "12%",
                  color: "from-purple-500 to-blue-500",
                  icon: <Terminal className="h-5 w-5" />
                }} 
              />
              {/* Additional new challenges would go here */}
            </TabsContent>
          </Tabs>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex flex-col space-y-6">
          <UserRankCard />
          <RecentAchievements />
        </motion.div>
      </div>
      
      <motion.div variants={itemVariants}>
        <ActivityFeed />
      </motion.div>
    </motion.div>
  );
}