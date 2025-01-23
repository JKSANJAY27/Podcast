"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";


export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/newsletter?subscribe=true", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email})
      })

       if(!response.ok){
           const error = await response.json()
           throw new Error(error.error)
       }

      toast({
        title: "Successfully subscribed!",
        description: "You'll receive updates about new episodes.",
      });
      setEmail("");
    } catch (error:any) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-purple-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
        <p className="text-lg mb-8">
          Subscribe to our newsletter and never miss a new episode or life lesson.
        </p>
        <form onSubmit={handleSubscribe} className="flex gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white text-black"
            required
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            className="bg-pink-600 hover:bg-pink-700 transform hover:scale-105 transition-all"
            disabled={isLoading}
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  );
}