"use client";

import { Play } from "lucide-react";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { useRouter } from "next/navigation";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import GradientText from "./magicui/GradientText";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 to-pink-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
         <GradientText
           colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
           animationSpeed={3}
           showBorder={false}
          className="mb-6 animate-fade-up text-5xl md:text-7xl font-bold"
         >
            Learnings of Life of an 18yr Old
        </GradientText>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-up animate-delay-200">
          Join Saniya Mazumder on a journey of self-discovery, growth, and life lessons
        </p>
        <div className="flex justify-center gap-4 animate-fade-up animate-delay-300">
          <ShimmerButton
            className="text-purple-700"
            onClick={() => window.location.href = "https://open.spotify.com/show/2OJxCOaKWoiRH3RJZmKyYT"}
          >
            <span className="flex items-center">
              <Play className="mr-2 h-5 w-5" /> Listen Now
            </span>
          </ShimmerButton>
          <InteractiveHoverButton
            onClick={() => router.push('/episodes')}
           >
            <span className="flex items-center">
              View Episodes
            </span>
          </InteractiveHoverButton>
        </div>
      </div>
    </section>
  );
}