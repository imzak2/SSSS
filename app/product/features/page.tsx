"use client"

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { FeatureSection } from '@/components/landing/feature-section';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <FeatureSection />
      </main>
      <Footer />
    </div>
  );
}