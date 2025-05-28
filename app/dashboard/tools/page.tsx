"use client"

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenTool as Tool, Lock } from 'lucide-react';

export default function ToolsPage() {
  const tools = [
    {
      name: "Network Scanner",
      description: "Scan and analyze network vulnerabilities",
      status: "coming_soon"
    },
    {
      name: "Password Cracker",
      description: "Advanced password cracking utility",
      status: "coming_soon"
    },
    {
      name: "Packet Analyzer",
      description: "Analyze network traffic in real-time",
      status: "coming_soon"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Security Tools</h1>
          <p className="text-muted-foreground">Professional-grade security testing tools</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 mb-4">
                  <Tool className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle className="text-xl mb-2">{tool.name}</CardTitle>
                <p className="text-muted-foreground text-sm">{tool.description}</p>
              </CardHeader>
              <CardContent>
                <Button className="w-full" disabled>
                  <Lock className="mr-2 h-4 w-4" />
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}