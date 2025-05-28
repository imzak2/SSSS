"use client"

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Terminal, Code, Lock, ArrowRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function LabsPage() {
  const labs = [
    {
      title: "Programming Lab",
      icon: <Code className="h-6 w-6" />,
      description: "Practice secure coding and exploit development",
      machines: [
        { 
          name: "Buffer Overflow 101", 
          difficulty: "Easy", 
          points: 20,
          completionRate: "45%",
          os: "Linux",
          ip: "10.10.10.1",
          status: "active"
        },
        { 
          name: "Race Condition", 
          difficulty: "Medium", 
          points: 30,
          completionRate: "32%",
          os: "Linux",
          ip: "10.10.10.2",
          status: "active"
        },
        { 
          name: "Memory Corruption", 
          difficulty: "Hard", 
          points: 50,
          completionRate: "15%",
          os: "Windows",
          ip: "10.10.10.3",
          status: "active"
        }
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Cryptography Lab",
      icon: <Lock className="h-6 w-6" />,
      description: "Master cryptographic challenges and techniques",
      machines: [
        { 
          name: "Classic Ciphers", 
          difficulty: "Easy", 
          points: 20,
          completionRate: "52%",
          os: "Linux",
          ip: "10.10.10.4",
          status: "active"
        },
        { 
          name: "RSA Challenge", 
          difficulty: "Medium", 
          points: 30,
          completionRate: "28%",
          os: "Linux",
          ip: "10.10.10.5",
          status: "active"
        },
        { 
          name: "Hash Cracking", 
          difficulty: "Hard", 
          points: 40,
          completionRate: "20%",
          os: "Linux",
          ip: "10.10.10.6",
          status: "active"
        }
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Web Pentesting Lab",
      icon: <Terminal className="h-6 w-6" />,
      description: "Exploit web vulnerabilities in realistic scenarios",
      machines: [
        { 
          name: "XSS Playground", 
          difficulty: "Easy", 
          points: 25,
          completionRate: "48%",
          os: "Linux",
          ip: "10.10.10.7",
          status: "active"
        },
        { 
          name: "SQL Injection", 
          difficulty: "Medium", 
          points: 35,
          completionRate: "35%",
          os: "Windows",
          ip: "10.10.10.8",
          status: "active"
        },
        { 
          name: "Authentication Bypass", 
          difficulty: "Hard", 
          points: 45,
          completionRate: "18%",
          os: "Linux",
          ip: "10.10.10.9",
          status: "active"
        }
      ],
      color: "from-red-500 to-orange-500"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Labs Overview</h1>
          <p className="text-muted-foreground">Choose your challenge and start hacking</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {labs.map((lab, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${lab.color} opacity-5`} />
              <CardHeader>
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${lab.color} text-white mb-4`}>
                  {lab.icon}
                </div>
                <CardTitle className="text-xl mb-2">{lab.title}</CardTitle>
                <p className="text-muted-foreground text-sm">{lab.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lab.machines.map((machine, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                      <div className="relative bg-background p-4 rounded-lg border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{machine.name}</h4>
                          <Badge 
                            className={
                              machine.difficulty === "Easy" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                              machine.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                              "bg-red-500/10 text-red-400 border-red-500/20"
                            }
                          >
                            {machine.difficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                          <div className="flex items-center space-x-2">
                            <span>{machine.os}</span>
                            <span>•</span>
                            <span>{machine.points} points</span>
                          </div>
                          <span>{machine.ip}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Completion Rate</span>
                            <span>{machine.completionRate}</span>
                          </div>
                          <Progress value={parseInt(machine.completionRate)} className="h-1" />
                        </div>
                        <Button 
                          className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                        >
                          Start Machine <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}