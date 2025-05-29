"use client"

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, Crown, Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const planId = searchParams.get('plan');

  const plans = {
    kvip: {
      name: "KVIP",
      price: "15",
      description: "Perfect for getting started with web security",
      features: [
        "Access to Web Pentesting Lab",
        "25% discount on all courses",
        "Basic progress tracking",
        "Public leaderboard"
      ],
      icon: <Shield className="h-6 w-6" />
    },
    sudoer: {
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
      icon: <Crown className="h-6 w-6" />
    }
  };

  const selectedPlan = planId && plans[planId as keyof typeof plans];

  const handleSubscribe = async () => {
    setLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Redirect to dashboard after successful payment
    window.location.href = '/dashboard';
  };

  if (!selectedPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-500">Invalid Plan Selected</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">Please select a valid subscription plan.</p>
            <Button onClick={() => window.location.href = '/#pricing'}>
              View Plans
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Complete Your Subscription</h1>
              <p className="text-muted-foreground">You're just one step away from accessing premium features</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Plan Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded-lg ${
                          selectedPlan.name === "Sudoer" 
                            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                            : "bg-purple-500/10 text-purple-500"
                        }`}>
                          {selectedPlan.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{selectedPlan.name}</h3>
                          <p className="text-sm text-muted-foreground">Monthly Subscription</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold">${selectedPlan.price}</span>
                        <span className="text-muted-foreground">/mo</span>
                      </div>
                    </div>

                    <div className="border-t pt-4 mt-4">
                      <h4 className="font-medium mb-2">Included Features:</h4>
                      <ul className="space-y-2">
                        {selectedPlan.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Badge className="mb-2 bg-green-500/10 text-green-400 border-green-500/20">
                        Secure Payment
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        Your payment information is encrypted and secure
                      </p>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                      onClick={handleSubscribe}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>Subscribe Now - ${selectedPlan.price}/month</>
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground mt-4">
                      By subscribing, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}