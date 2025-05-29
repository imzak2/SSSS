'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeroSection } from '@/components/landing/hero-section';
import { FeatureSection } from '@/components/landing/feature-section';
import { Footer } from '@/components/landing/footer';
import { Navbar } from '@/components/landing/navbar';
import { Check, Zap, Crown, Terminal } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  const plans = [
    { 
      id: "kvip",
      name: "KVIP", 
      price: "15",
      description: "Perfect for getting started with web security",
      features: [
        "Access to Web Pentesting Lab",
        "25% discount on all courses",
        "Basic progress tracking",
        "Public leaderboard"
      ],
      icon: <Terminal className="h-6 w-6" />
    },
    { 
      id: "sudoer",
      name: "Sudoer", 
      price: "30",
      description: "For serious security professionals",
      features: [
        "All KVIP features",
        "45% discount on all courses",
        "Access to exclusive lab tools",
        "Priority support",
        "Private leaderboard",
        "Advanced analytics",
        "Team collaboration"
      ],
      popular: true,
      icon: <Crown className="h-6 w-6" />
    }
  ];

  const handleSubscribe = (planId: string) => {
    router.push(`/checkout?plan=${planId}`);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/circuit-pattern.png')] bg-repeat opacity-20"></div>
      </div>

      <div className="fixed top-20 -left-28 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"></div>
      <div className="fixed top-1/2 -right-28 w-96 h-96 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 blur-3xl"></div>

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <FeatureSection />

        {/* Pricing Section */}
        <section id="pricing" className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4">Pricing</Badge>
              <h2 className="text-4xl font-bold mb-4">Choose Your Learning Path</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Flexible plans designed to meet your learning needs. Start your journey in cybersecurity today.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                    <Card className={`relative bg-background border-border ${plan.popular ? 'border-purple-500' : ''}`}>
                      {plan.popular && (
                        <div className="absolute top-0 right-0 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm rounded-full">
                          Most Popular
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`p-3 rounded-lg ${plan.popular
                              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                              : 'bg-purple-500/10 text-purple-500'
                            }`}>
                            {plan.icon}
                          </div>
                          <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        </div>
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold">${plan.price}</span>
                          <span className="text-muted-foreground ml-2">/mo</span>
                        </div>
                        <p className="text-muted-foreground mt-2">{plan.description}</p>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4 mb-8">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center">
                              <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button 
                          className={`w-full ${plan.popular
                              ? 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600'
                              : ''
                            }`}
                          variant={plan.popular ? 'default' : 'outline'}
                          onClick={() => handleSubscribe(plan.id)}
                        >
                          Get Started
                          {plan.popular && <Zap className="ml-2 h-4 w-4" />}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}