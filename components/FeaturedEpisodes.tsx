"use client";

import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { Episode } from "@/types/episode";
import { MagicCard } from "@/components/magicui/magic-card";
import axios from 'axios';

export default function FeaturedEpisodes() {
  const router = useRouter();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
 const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
          setIsLoading(true);
        const response = await axios.get('/api/episodes');
          setEpisodes(response.data);
      } catch (error:any) {
        console.error("Failed to fetch episodes:", error);
          setError(error.message)
      } finally {
        setIsLoading(false);
      }
    };
    fetchEpisodes();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Episodes</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {episodes.slice(0, 3).map((episode) => (
              <MagicCard
                key={episode.id}
              onClick={() => router.push(`/episodes/${episode.id}`)}
                className="overflow-hidden hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer"
             >
              <img
                src={episode.thumbnail}
                alt={episode.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{episode.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{episode.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{episode.duration}</span>
                  <Button variant="ghost" size="sm">
                    <Play className="mr-2 h-4 w-4" /> Play
                  </Button>
                </div>
              </div>
           </MagicCard>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            onClick={() => router.push('/episodes')}
            className="bg-purple-600 hover:bg-purple-700 text-white transform hover:scale-105 transition-all"
          >
            View All Episodes
          </Button>
        </div>
      </div>
    </section>
  );
}