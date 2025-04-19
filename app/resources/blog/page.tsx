"use client"

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const posts = [
    {
      title: "Understanding Cross-Site Scripting (XSS) Attacks",
      excerpt: "Learn about different types of XSS attacks and how to prevent them in your applications.",
      author: "Alex Rivera",
      date: "March 15, 2024",
      category: "Web Security",
      image: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg"
    },
    {
      title: "Secure Coding Best Practices in 2024",
      excerpt: "Stay up-to-date with the latest secure coding practices and protect your applications.",
      author: "Sarah Chen",
      date: "March 12, 2024",
      category: "Secure Coding",
      image: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg"
    },
    {
      title: "Introduction to Cryptography",
      excerpt: "A beginner's guide to understanding cryptography and its importance in cybersecurity.",
      author: "Dr. Elena Vasquez",
      date: "March 10, 2024",
      category: "Cryptography",
      image: "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Blog</Badge>
            <h1 className="text-4xl font-bold mb-4">Latest from Our Blog</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest in cybersecurity, tutorials, and industry insights.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="object-cover w-full h-full transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <Badge variant="outline" className="w-fit mb-2">
                      {post.category}
                    </Badge>
                    <CardTitle className="text-xl mb-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.date}
                      </div>
                    </div>
                    <Button variant="ghost" className="w-full group">
                      Read More 
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}