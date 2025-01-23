"use client";

import { Youtube, AlignJustify as Spotify, Linkedin, Instagram, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="py-12 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p>Email: saniyasimplifies@gmail.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {[Youtube, Spotify, Linkedin, Instagram, Music2].map((Icon, index) => (
                <Button 
                  key={index}
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-purple-800 transform hover:scale-110 transition-all"
                >
                  <Icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/episodes" className="hover:text-purple-400 transition-colors">Episodes</a></li>
              <li><a href="#about" className="hover:text-purple-400 transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {new Date().getFullYear()} Learnings of Life of an 18yr Old. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}