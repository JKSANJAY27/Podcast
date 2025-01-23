"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Episode } from "@/types/episode";
import { Button } from "@/components/ui/button";
import { Youtube } from "lucide-react";

export default function EpisodesPage() {
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            }
        };
        fetchEpisodes();
    }, []);

    const filteredEpisodes = episodes.filter(episode =>
        episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        episode.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openModal = (episode: Episode) => {
        setSelectedEpisode(episode);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedEpisode(null);
        setIsModalOpen(false);
    };

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
                            onClick={() => openModal(episode)}
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

                {/* Episode Modal */}
                {isModalOpen && selectedEpisode && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center transition-opacity duration-300"
                         style={{opacity: isModalOpen ? 1 : 0}}>
                        <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white transition-transform duration-300"
                             style={{transform: isModalOpen ? 'translateY(0)' : 'translateY(-50px)'}}>
                            <div className="mt-3 text-center">
                                <img
                                    src={selectedEpisode.thumbnail}
                                    alt={selectedEpisode.title}
                                    className="w-full h-48 object-cover mb-4 rounded"
                                />
                                <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedEpisode.title}</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500 whitespace-pre-line">{selectedEpisode.description}</p>
                                </div>
                                <div className="flex justify-center items-center px-4 py-3">
                                    <Button
                                        onClick={() => window.location.href = `https://www.youtube.com/watch?v=${selectedEpisode.id}`}
                                        className="bg-red-600 hover:bg-red-700"
                                    >
                                        <Youtube className="mr-2 h-5 w-5" /> Watch on YouTube
                                    </Button>
                                    <Button
                                        onClick={closeModal}
                                        className="ml-4"
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}