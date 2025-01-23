"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Episode } from "@/types/episode";
import { Youtube, AlignJustify as Spotify, Music2 } from "lucide-react";

export default function EpisodePage() {
    const params = useParams();
    const [episode, setEpisode] = useState<Episode | null>(null);

    useEffect(() => {
        const fetchEpisode = async () => {
            if (params.id) {
                try {
                    const response = await fetch('/api/episodes', {
                        method: 'POST', // Use POST to send the video ID
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ videoId: params.id }), // Send the video ID in the request body
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();
                    setEpisode(data);
                } catch (error) {
                    console.error("Failed to fetch episode:", error);
                    // Handle the error (e.g., display an error message to the user)
                }
            }
        };
        fetchEpisode();
    }, [params.id]);

    if (!episode) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-20">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="aspect-video">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${episode.id}`}
                            title={episode.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="p-8">
                        <h1 className="text-3xl font-bold mb-4">{episode.title}</h1>

                        <div className="flex gap-4 mb-6">
                            <Button className="bg-red-600 hover:bg-red-700">
                                <Youtube className="mr-2 h-5 w-5" /> Watch on YouTube
                            </Button>
                            <Button className="bg-green-600 hover:bg-green-700">
                                <Spotify className="mr-2 h-5 w-5" /> Listen on Spotify
                            </Button>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Music2 className="mr-2 h-5 w-5" /> Amazon Music
                            </Button>
                        </div>

                        <div className="prose max-w-none">
                            <h2 className="text-xl font-semibold mb-2">Episode Details</h2>
                            <p className="text-gray-600 mb-4">{episode.description}</p>

                            <div className="mt-6 text-sm text-gray-500">
                                <p>Published on: {new Date(episode.publishedAt).toLocaleDateString()}</p>
                                <p>Duration: {episode.duration}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}