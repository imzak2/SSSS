"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Bell, Trophy, Calendar, BarChart, CheckCircle, XCircle, Flag, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function ActivityFeed() {
  // Activity feed data
  const activities = [
    {
      id: 1,
      type: "challenge_complete",
      title: "XSS Challenge Completed",
      description: "You successfully completed the Cross-Site Scripting challenge",
      timestamp: "2 hours ago",
      points: "+75",
      icon: <CheckCircle className="h-5 w-5 text-green-400" />
    },
    {
      id: 2,
      type: "rank_up",
      title: "Rank Increased!",
      description: "Congratulations! You've advanced to Hacker rank in Pentesting Web",
      timestamp: "Yesterday",
      icon: <Trophy className="h-5 w-5 text-yellow-400" />
    },
    {
      id: 3,
      type: "achievement",
      title: "New Achievement Unlocked",
      description: "First Blood: Complete a challenge within 24 hours of release",
      timestamp: "2 days ago",
      icon: <Flag className="h-5 w-5 text-purple-400" />
    },
    {
      id: 4,
      type: "challenge_failed",
      title: "SQL Injection Challenge Failed",
      description: "You were unable to complete the challenge within the time limit",
      timestamp: "3 days ago",
      icon: <XCircle className="h-5 w-5 text-red-400" />
    },
    {
      id: 5,
      type: "streak",
      title: "7-Day Streak!",
      description: "You've been active for 7 consecutive days",
      timestamp: "1 week ago",
      icon: <Zap className="h-5 w-5 text-blue-400" />
    }
  ];

  // Filter and map different tab data
  const allActivities = activities;
  const achievements = activities.filter(a => a.type === "achievement" || a.type === "rank_up");
  const challenges = activities.filter(a => a.type === "challenge_complete" || a.type === "challenge_failed");

  return (
    <Card className="bg-background/50 backdrop-blur-sm border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Bell className="mr-2 h-5 w-5 text-blue-400" />
            Activity Feed
          </CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        <CardDescription>
          Your recent activity and achievements
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
          </TabsList>
          
          <ActivityList activities={allActivities} value="all" />
          <ActivityList activities={achievements} value="achievements" />
          <ActivityList activities={challenges} value="challenges" />
        </Tabs>
      </CardContent>
    </Card>
  );
}

interface Activity {
  id: number;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  points?: string;
  icon: React.ReactNode;
}

interface ActivityListProps {
  activities: Activity[];
  value: string;
}

function ActivityList({ activities, value }: ActivityListProps) {
  return (
    <TabsContent value={value} className="m-0">
      <ScrollArea className="h-[300px]">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 rounded-md p-3 hover:bg-muted/50 transition-colors"
            >
              <div className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border",
                activity.type === "challenge_complete" && "bg-green-500/10 border-green-500/20",
                activity.type === "rank_up" && "bg-yellow-500/10 border-yellow-500/20",
                activity.type === "achievement" && "bg-purple-500/10 border-purple-500/20",
                activity.type === "streak" && "bg-blue-500/10 border-blue-500/20",
                activity.type === "challenge_failed" && "bg-red-500/10 border-red-500/20"
              )}>
                {activity.icon}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{activity.title}</p>
                  {activity.points && (
                    <span className="text-sm font-medium text-green-400">{activity.points}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </TabsContent>
  );
}