"use client"

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Terminal, Code, Lock, ArrowRight, Trophy, Users, Star, Target, Flag, Award, Zap } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  const userStats = {
    rank: 17,
    teamRank: 8,
    points: 1962,
    machines: 112,
    ownershipRate: 31.51,
    level: 20,
    respect: 72,
    rankProgress: 75
  };

  const recentActivity = [
    {
      type: "machine_owned",
      title: "Owned Machine: CyberSploit1",
      points: 20,
      timestamp: "2 hours ago"
    },
    {
      type: "challenge_completed",
      title: "Completed: Basic Pentesting",
      points: 10,
      timestamp: "5 hours ago"
    },
    {
      type: "rank_up",
      title: "New Rank: Guru",
      points: 0,
      timestamp: "1 day ago"
    }
  ];

  const achievements = [
    {
      title: "First Blood",
      description: "First to own a machine",
      icon: <Flag className="h-5 w-5" />,
      color: "from-red-500 to-orange-500"
    },
    {
      title: "Persistence",
      description: "30 day streak",
      icon: <Zap className="h-5 w-5" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Elite Hacker",
      description: "Reached level 20",
      icon: <Award className="h-5 w-5" />,
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="space-y-8">
      {/* User Overview Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-background/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold">
                    {userStats.level}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Guru</h3>
                    <p className="text-sm text-muted-foreground">Current Rank</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress to next rank</span>
                  <span>{userStats.rankProgress}%</span>
                </div>
                <Progress value={userStats.rankProgress} className="h-1" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-background/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Global Rank</p>
                  <h3 className="text-2xl font-bold">#{userStats.rank}</h3>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Team Rank</p>
                  <h3 className="text-2xl font-bold">#{userStats.teamRank}</h3>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Ownership Rate</p>
                <div className="flex items-center mt-1">
                  <div className="flex-1">
                    <Progress value={userStats.ownershipRate} className="h-1" />
                  </div>
                  <span className="ml-2 text-sm font-medium">{userStats.ownershipRate}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-background/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Points</p>
                  <h3 className="text-2xl font-bold">{userStats.points}</h3>
                </div>
                <Trophy className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Machines Owned</p>
                <h4 className="text-xl font-bold mt-1">{userStats.machines}</h4>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-background/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Respect</p>
                  <h3 className="text-2xl font-bold">{userStats.respect}</h3>
                </div>
                <Star className="h-8 w-8 text-purple-500" />
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Active Streak</p>
                <div className="flex items-center mt-1">
                  <Zap className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-bold">7 days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity & Achievements */}
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Target className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
                      </div>
                    </div>
                    {activity.points > 0 && (
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                        +{activity.points} pts
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                    <div className="relative flex items-center space-x-4 p-4 bg-background rounded-lg">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${achievement.color} text-white`}>
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}