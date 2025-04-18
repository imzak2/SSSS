import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeroSection } from '@/components/landing/hero-section';
import { FeatureSection } from '@/components/landing/feature-section';
import { Footer } from '@/components/landing/footer';
import { Navbar } from '@/components/landing/navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Circuit background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/circuit-pattern.png')] bg-repeat opacity-20"></div>
      </div>
      
      {/* Animated gradient orbs */}
      <div className="fixed top-20 -left-28 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"></div>
      <div className="fixed top-1/2 -right-28 w-96 h-96 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 blur-3xl"></div>
      
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <FeatureSection />
        <Footer />
      </div>
    </div>
  );
}