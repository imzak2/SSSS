"use client"

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';
import { Users, MessageSquare, Trophy, Heart } from 'lucide-react';

export default function CommunityPage() {
  const stats = [
    {
      title: "Active Members",
      value: "10,000+",
      icon: <Users className="h-6 w-6 text-purple-400" />
    },
    {
      title: "Daily Discussions",
      value: "500+",
      icon: <MessageSquare className="h-6 w-6 text-blue-400" />
    },
    {
      title: "Challenges Completed",
      value: "50,000+",
      icon: <Trophy className="h-6 w-6 text-yellow-400" />
    },
    {
      title: "Success Stories",
      value: "1,000+",
      icon: <Heart className="h-6 w-6 text-red-400" />
    }
  ];

  const features = [
    {
      title: "Discussion Forums",
      description: "Engage with fellow security enthusiasts, share knowledge, and solve challenges together.",
      icon: <MessageSquare className="h-6 w-6" />
    },
    {
      title: "Study Groups",
      description: "Join or create study groups focused on specific security topics or certifications.",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "Mentorship",
      description: "Connect with experienced professionals for guidance and career advice.",
      icon: <Trophy className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Community</Badge>
            <h1 className="text-4xl font-bold mb-4">Join Our Cybersecurity Community</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with fellow security enthusiasts, share knowledge, and grow together.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-lg bg-background/50">
                        {stat.icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="p-3 rounded-lg bg-purple-500/10 text-purple-500 w-fit mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <Button variant="outline" className="w-full">Learn More</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}