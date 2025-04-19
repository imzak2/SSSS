"use client"

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, Star, Bell } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Welcome to KaliumLabs</h1>
            <p className="text-muted-foreground">Your cybersecurity journey is about to begin</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="min-h-[60vh] flex items-center justify-center"
      >
        <Card className="w-full max-w-3xl bg-background/50 backdrop-blur-sm border border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-transparent"></div>
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Rocket className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              Coming Soon
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6 px-4 md:px-8">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're building something amazing! Our team is working hard to bring you the most comprehensive cybersecurity learning platform.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="p-4 rounded-lg bg-background/50 border border-border">
                <Star className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                <h3 className="font-semibold">Interactive Challenges</h3>
                <p className="text-sm text-muted-foreground">Real-world scenarios to test your skills</p>
              </div>
              <div className="p-4 rounded-lg bg-background/50 border border-border">
                <Bell className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold">Daily Updates</h3>
                <p className="text-sm text-muted-foreground">Fresh content and challenges every day</p>
              </div>
              <div className="p-4 rounded-lg bg-background/50 border border-border">
                <Rocket className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <h3 className="font-semibold">Skill Progression</h3>
                <p className="text-sm text-muted-foreground">Track your growth and achievements</p>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
              >
                Get Notified When We Launch
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}