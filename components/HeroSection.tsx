"use client";

import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 to-pink-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-up">
          Learnings of Life of an 18yr Old
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-up animate-delay-200">
          Join Saniya Mazumder on a journey of self-discovery, growth, and life lessons
        </p>
        <div className="flex justify-center gap-4 animate-fade-up animate-delay-300">
          <Button 
            size="lg" 
            className="bg-white text-purple-700 hover:bg-gray-100 transform hover:scale-105 transition-all"
            onClick={() => router.push('/episodes')}
          >
            <Play className="mr-2 h-5 w-5" /> Listen Now
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white/10 transform hover:scale-105 transition-all"
            onClick={() => router.push('/episodes')}
          >
            View Episodes
          </Button>
        </div>
      </div>
    </section>
  );
}