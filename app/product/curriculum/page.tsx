"use client"

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';
import { Terminal, Code, Lock, ArrowRight } from 'lucide-react';

export default function CurriculumPage() {
  const tracks = [
    {
      title: "Web Penetration Testing",
      icon: <Terminal className="h-6 w-6" />,
      description: "Master the art of finding and exploiting web application vulnerabilities",
      topics: ["XSS Attacks", "SQL Injection", "CSRF", "Authentication Bypass", "File Inclusion"],
      color: "from-purple-500 to-blue-500"
    },
    {
      title: "Secure Programming",
      icon: <Code className="h-6 w-6" />,
      description: "Learn to write secure code and identify common vulnerabilities",
      topics: ["Secure Coding Practices", "Code Review", "Vulnerability Assessment", "Security Testing"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Cryptography",
      icon: <Lock className="h-6 w-6" />,
      description: "Understand modern cryptographic methods and their applications",
      topics: ["Symmetric Encryption", "Public Key Cryptography", "Hash Functions", "Digital Signatures"],
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Learning Paths</Badge>
            <h1 className="text-4xl font-bold mb-4">Comprehensive Cybersecurity Curriculum</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Structured learning paths designed by industry experts to take you from beginner to professional.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${track.color} opacity-5`} />
                  <CardContent className="p-6">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${track.color} text-white mb-4`}>
                      {track.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{track.title}</h3>
                    <p className="text-muted-foreground mb-4">{track.description}</p>
                    <ul className="space-y-2 mb-6">
                      {track.topics.map((topic, i) => (
                        <li key={i} className="flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500">
                      Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
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