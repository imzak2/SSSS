"use client"

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Terminal, Code, Lock, ArrowRight, Trophy, Users, Star } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
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

  const rankings = {
    webPentesting: [
      { rank: 1, name: "h4ck3r", points: 450, machines: 8 },
      { rank: 2, name: "securecoder", points: 380, machines: 7 },
      { rank: 3, name: "pwn3r", points: 350, machines: 6 },
      { rank: 4, name: "cyberwarrior", points: 320, machines: 6 },
      { rank: 5, name: "rootkit", points: 290, machines: 5 }
    ],
    programming: [
      { rank: 1, name: "codebeast", points: 380, challenges: 12 },
      { rank: 2, name: "debugger", points: 340, challenges: 10 },
      { rank: 3, name: "compiler", points: 310, challenges: 9 },
      { rank: 4, name: "bitmaster", points: 280, challenges: 8 },
      { rank: 5, name: "algorithm", points: 250, challenges: 7 }
    ],
    cryptography: [
      { rank: 1, name: "cryptoking", points: 420, challenges: 14 },
      { rank: 2, name: "cipher", points: 360, challenges: 12 },
      { rank: 3, name: "enigma", points: 330, challenges: 11 },
      { rank: 4, name: "decoder", points: 300, challenges: 10 },
      { rank: 5, name: "hash", points: 270, challenges: 9 }
    ],
    teams: [
      { rank: 1, name: "Elite Hackers", points: 1200, totalPwned: 32 },
      { rank: 2, name: "Security Ninjas", points: 1050, totalPwned: 28 },
      { rank: 3, name: "Binary Bandits", points: 950, totalPwned: 25 },
      { rank: 4, name: "Cyber Dragons", points: 850, totalPwned: 23 },
      { rank: 5, name: "Code Warriors", points: 750, totalPwned: 20 }
    ]
  };

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

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-5 w-5 text-yellow-400 mr-2" />
            Rankings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="web" className="space-y-4">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="web">Web Pentesting</TabsTrigger>
              <TabsTrigger value="programming">Programming</TabsTrigger>
              <TabsTrigger value="crypto">Cryptography</TabsTrigger>
              <TabsTrigger value="teams">Team Rankings</TabsTrigger>
            </TabsList>

            <TabsContent value="web" className="space-y-4">
              <div className="space-y-2">
                {rankings.webPentesting.map((user, index) => (
                  <RankingRow 
                    key={index}
                    rank={user.rank}
                    name={user.name}
                    points={user.points}
                    extra={`${user.machines} machines pwned`}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="programming" className="space-y-4">
              <div className="space-y-2">
                {rankings.programming.map((user, index) => (
                  <RankingRow 
                    key={index}
                    rank={user.rank}
                    name={user.name}
                    points={user.points}
                    extra={`${user.challenges} challenges solved`}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="crypto" className="space-y-4">
              <div className="space-y-2">
                {rankings.cryptography.map((user, index) => (
                  <RankingRow 
                    key={index}
                    rank={user.rank}
                    name={user.name}
                    points={user.points}
                    extra={`${user.challenges} challenges solved`}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="teams" className="space-y-4">
              <div className="space-y-2">
                {rankings.teams.map((team, index) => (
                  <RankingRow 
                    key={index}
                    rank={team.rank}
                    name={team.name}
                    points={team.points}
                    extra={`${team.totalPwned} total pwned`}
                    isTeam
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function RankingRow({ rank, name, points, extra, isTeam = false }: { 
  rank: number; 
  name: string; 
  points: number; 
  extra: string;
  isTeam?: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border hover:bg-muted/50 transition-colors">
      <div className="flex items-center space-x-4">
        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
          rank === 1 ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" :
          rank === 2 ? "bg-gray-300/10 text-gray-400 border border-gray-300/20" :
          rank === 3 ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" :
          "bg-muted text-muted-foreground"
        }`}>
          {rank}
        </div>
        <div className="flex items-center space-x-2">
          {isTeam ? <Users className="h-4 w-4 text-purple-400" /> : <Star className="h-4 w-4 text-purple-400" />}
          <span className="font-medium">{name}</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-muted-foreground">{extra}</span>
        <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
          {points} pts
        </Badge>
      </div>
    </div>
  );
}