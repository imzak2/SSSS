"use client"

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';
import { Check, Zap } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for getting started",
      features: [
        "Access to basic challenges",
        "Community forum access",
        "Basic progress tracking",
        "Public leaderboard"
      ]
    },
    {
      name: "Pro",
      price: "29",
      description: "For serious learners",
      features: [
        "All Free features",
        "Advanced challenges",
        "Private leaderboard",
        "Priority support",
        "Certificate of completion",
        "Team collaboration"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For organizations",
      features: [
        "All Pro features",
        "Custom challenges",
        "Dedicated support",
        "API access",
        "SSO integration",
        "Custom reporting"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Pricing</Badge>
            <h1 className="text-4xl font-bold mb-4">Choose Your Learning Path</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Flexible plans designed to meet your learning needs. Start for free and upgrade as you grow.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`relative ${plan.popular ? 'border-purple-500' : ''}`}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm rounded-full">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>
                      <div className="flex items-center justify-between">
                        <span>{plan.name}</span>
                        <div className="text-right">
                          {plan.price === "Custom" ? (
                            <span className="text-2xl font-bold">Custom</span>
                          ) : (
                            <>
                              <span className="text-3xl font-bold">${plan.price}</span>
                              <span className="text-muted-foreground">/mo</span>
                            </>
                          )}
                        </div>
                      </div>
                    </CardTitle>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-blue-500' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                      {plan.popular && <Zap className="ml-2 h-4 w-4" />}
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