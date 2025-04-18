"use client"

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Star, Quote, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TestimonialSection() {
  const testimonials = [
    {
      content: "KaliumLabs completely transformed my approach to learning cybersecurity. The hands-on labs and challenges helped me understand concepts I'd been struggling with for months.",
      author: "Alex Rivera",
      position: "Security Analyst at TechGuard",
      rating: 5,
      type: "large"
    },
    {
      content: "The best investment I've made in my career. The progression system kept me motivated, and I could actually see myself improving week after week.",
      author: "Sarah Chen",
      position: "Pentester",
      rating: 5,
      type: "small"
    },
    {
      content: "I went from complete beginner to landing my first security job in just 6 months. The community is incredibly supportive and the challenges are both fun and educational.",
      author: "Marcus Johnson",
      position: "Junior Security Engineer",
      rating: 5,
      type: "small"
    },
    {
      content: "As someone who teaches cybersecurity, I recommend KaliumLabs to all my students. It provides practical experience that textbooks simply can't offer.",
      author: "Dr. Elena Vasquez",
      position: "Professor of Computer Science",
      rating: 5,
      type: "small"
    }
  ];

  return (
    <section id="testimonials" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-3 px-3 py-1 bg-green-500/10 text-green-400 border-green-500/20">
            <MessageSquare className="mr-1 h-3 w-3" /> Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Success <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-400">Stories</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Hear from security professionals who have transformed their skills with KaliumLabs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className={cn(
                "bg-background/50 backdrop-blur-sm border border-border hover:border-purple-500/30 transition-all duration-300",
                testimonial.type === "large" ? "lg:col-span-2 lg:row-span-2" : ""
              )}
            >
              <CardContent className="p-6">
                <div className="mb-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <Quote className="h-8 w-8 text-purple-400 opacity-40 mb-2" />
                
                <blockquote className={cn(
                  "mb-6 italic text-foreground/90",
                  testimonial.type === "large" ? "text-lg" : "text-base"
                )}>
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center">
                  <div className={cn(
                    "rounded-full flex items-center justify-center font-bold text-white",
                    "bg-gradient-to-r from-purple-500 to-blue-500",
                    testimonial.type === "large" ? "w-12 h-12 text-lg" : "w-10 h-10 text-sm"
                  )}>
                    {testimonial.author.split(' ').map(name => name[0]).join('')}
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.position}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}