"use client";

import { Youtube, AlignJustify as Spotify, Linkedin, Instagram, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutSection() {
  const socialLinks = {
    youtube: "#",
    spotify: "#",
    linkedin: "#",
    instagram: "#",
    amazonMusic: "#"
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20" />
            <img
              src="https://images.unsplash.com/photo-1557425493-6f90ae4659fc?auto=format&fit=crop&q=80&w=800"
              alt="Saniya Mazumder"
              className="rounded-lg shadow-xl relative transform hover:scale-105 transition-all"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              About Saniya
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Welcome to Learnings of life of an 18 yr old, a podcast created by an eighteen year old Indian girl who has been through many such situations in her life that has helped fill her bag of experience with tons of learnings and life lessons that she very kindly decided to share with the world for she wants them to know that they are not alone.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Youtube, link: socialLinks.youtube },
                { icon: Spotify, link: socialLinks.spotify },
                { icon: Linkedin, link: socialLinks.linkedin },
                { icon: Instagram, link: socialLinks.instagram },
                { icon: Music2, link: socialLinks.amazonMusic }
              ].map((social, index) => (
                <Button 
                  key={index}
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-purple-100 hover:text-purple-600 transform hover:scale-110 transition-all"
                  onClick={() => window.open(social.link, '_blank')}
                >
                  <social.icon className="h-6 w-6" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}