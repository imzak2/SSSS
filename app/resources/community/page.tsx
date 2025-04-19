"use client"

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';
import { Users, MessageSquare, Trophy, Heart, Disc as Discord } from 'lucide-react';

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Community</Badge>
            <h1 className="text-4xl font-bold mb-4">Join Our Discord Community</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Connect with fellow security enthusiasts, share knowledge, and grow together in our vibrant Discord community.
            </p>
            <a 
              href="https://discord.gg/4sZaPPWDjR" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                size="lg" 
                className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
              >
                <Discord className="mr-2 h-5 w-5" />
                Join our Discord Server
              </Button>
            </a>
          </div>

          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-2xl">Why Join Our Discord?</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-blue-400" />
                  <h3 className="font-semibold">Real-time Support</h3>
                </div>
                <p className="text-muted-foreground">
                  Get help from community members and mentors in real-time when you're stuck on a challenge.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-400" />
                  <h3 className="font-semibold">Study Groups</h3>
                </div>
                <p className="text-muted-foreground">
                  Join or create study groups focused on specific security topics or certifications.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  <h3 className="font-semibold">Exclusive Events</h3>
                </div>
                <p className="text-muted-foreground">
                  Participate in CTFs, workshops, and special events organized exclusively for our Discord community.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Join?</h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of cybersecurity enthusiasts in our Discord community and take your learning to the next level.
            </p>
            <a 
              href="https://discord.gg/4sZaPPWDjR" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
              >
                <Discord className="mr-2 h-5 w-5" />
                Join the Community
              </Button>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
