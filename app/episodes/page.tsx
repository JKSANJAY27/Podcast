"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Episode } from "@/types/episode";

export default function EpisodesPage() {
  const router = useRouter();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch('/api/episodes'); // Fetch from your API route
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEpisodes(data);
      } catch (error) {
        console.error("Failed to fetch episodes:", error);
        // Handle the error (e.g., display an error message to the user)
      }
    };
    fetchEpisodes();
  }, []);

  const filteredEpisodes = episodes.filter(episode =>
    episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    episode.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-12">All Episodes</h1>
        
        <div className="max-w-md mx-auto mb-12">
          <Input
            type="search"
            placeholder="Search episodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredEpisodes.map((episode) => (
            <Card
              key={episode.id}
              className="overflow-hidden hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer"
              onClick={() => router.push(`/episodes/${episode.id}`)}
            >
              <img
                src={episode.thumbnail}
                alt={episode.title}
                className="w-full aspect-video object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2">{episode.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{episode.description}</p>
                <div className="mt-4 text-sm text-gray-500">
                  {new Date(episode.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}