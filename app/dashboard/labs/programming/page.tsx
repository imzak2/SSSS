"use client"

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, ArrowRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function ProgrammingLabPage() {
  const challenges = [
    { 
      name: "Buffer Overflow 101", 
      difficulty: "Easy", 
      points: 20,
      completionRate: "45%",
      category: "Memory Corruption",
      language: "C",
      description: "Learn the basics of buffer overflow exploitation"
    },
    { 
      name: "Race Condition", 
      difficulty: "Medium", 
      points: 30,
      completionRate: "32%",
      category: "Concurrency",
      language: "C",
      description: "Exploit and fix race conditions in concurrent programs"
    },
    { 
      name: "Memory Corruption", 
      difficulty: "Hard", 
      points: 50,
      completionRate: "15%",
      category: "Memory Safety",
      language: "C++",
      description: "Advanced memory corruption techniques and mitigations"
    },
    { 
      name: "Format String", 
      difficulty: "Medium", 
      points: 35,
      completionRate: "28%",
      category: "Memory Safety",
      language: "C",
      description: "Exploit format string vulnerabilities"
    },
    { 
      name: "Integer Overflow", 
      difficulty: "Easy", 
      points: 25,
      completionRate: "42%",
      category: "Memory Safety",
      language: "C++",
      description: "Understand and exploit integer overflow vulnerabilities"
    },
    { 
      name: "Heap Exploitation", 
      difficulty: "Hard", 
      points: 50,
      completionRate: "12%",
      category: "Memory Safety",
      language: "C",
      description: "Advanced heap exploitation techniques"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Programming Lab</h1>
          <p className="text-muted-foreground">Practice secure coding and exploit development</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              <Card className="relative bg-background border-border">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">{challenge.name}</h3>
                    <Badge 
                      className={
                        challenge.difficulty === "Easy" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                        challenge.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                        "bg-red-500/10 text-red-400 border-red-500/20"
                      }
                    >
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">{challenge.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <span>{challenge.category}</span>
                        <span>•</span>
                        <span>{challenge.language}</span>
                        <span>•</span>
                        <span>{challenge.points} points</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Completion Rate</span>
                        <span>{challenge.completionRate}</span>
                      </div>
                      <Progress value={parseInt(challenge.completionRate)} className="h-1" />
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                    >
                      View Challenge <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}