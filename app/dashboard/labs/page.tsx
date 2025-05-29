"use client"

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Terminal, Code, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LabsPage() {
  const labs = [
    {
      title: "Web Pentesting Lab",
      icon: <Terminal className="h-6 w-6" />,
      description: "Exploit web vulnerabilities in realistic scenarios",
      color: "from-red-500 to-orange-500",
      href: "/dashboard/labs/web-pentesting",
      machineCount: 6
    },
    {
      title: "Programming Lab",
      icon: <Code className="h-6 w-6" />,
      description: "Practice secure coding and exploit development",
      color: "from-blue-500 to-cyan-500",
      href: "/dashboard/labs/programming",
      challengeCount: 12
    },
    {
      title: "Cryptography Lab",
      icon: <Lock className="h-6 w-6" />,
      description: "Master cryptographic challenges and techniques",
      color: "from-purple-500 to-pink-500",
      href: "/dashboard/labs/cryptography",
      challengeCount: 8
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Labs Overview</h1>
          <p className="text-muted-foreground">Choose your lab environment and start hacking</p>
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
            <Link href={lab.href}>
              <Card className="relative overflow-hidden hover:border-purple-500/30 transition-colors">
                <div className={`absolute inset-0 bg-gradient-to-br ${lab.color} opacity-5`} />
                <CardHeader>
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${lab.color} text-white mb-4`}>
                    {lab.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{lab.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{lab.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>
                      {lab.machineCount 
                        ? `${lab.machineCount} Machines Available` 
                        : `${lab.challengeCount} Challenges Available`}
                    </span>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                  >
                    View Lab <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}