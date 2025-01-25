"use client";

import { useState, useEffect, useId, useRef } from "react";
import { Input } from "@/components/ui/input";
import type { Episode } from "@/types/episode";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Image from "next/image";
import axios from 'axios';
import { CloseIcon } from "@/components/magicui/CloseIcon";

interface Props {
    params: {
        id: string;
    };
}

export default function EpisodesPage() {
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [active, setActive] = useState<Episode | null>(null);
    const ref = useRef<HTMLDivElement>(null);
    const id = useId();

    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                const response = await axios.get('/api/episodes');
                 setEpisodes(response.data);
             } catch (error: any) {
                 return {error: error.message};
             }
        };
        fetchEpisodes();
    }, []);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActive(null);
            }
        }

        if (active) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

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

                <AnimatePresence>
                    {active && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10"
                        />
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {active ? (
                        <div className="fixed inset-0  grid place-items-center z-[100]">
                            <motion.button
                                key={`button-${active.title}-${id}`}
                                layout
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: {
                                        duration: 0.05,
                                    },
                                }}
                                className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                                onClick={() => setActive(null)}
                            >
                                <CloseIcon />
                            </motion.button>
                            <motion.div
                                layoutId={`card-${active.title}-${id}`}
                                ref={ref}
                                className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                            >
                                <motion.div layoutId={`image-${active.title}-${id}`} className="p-2">
                                    <Image
                                        priority
                                        width={200}
                                        height={200}
                                        src={active.thumbnail}
                                        alt={active.title}
                                        className="w-full h-48 md:h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                                    />
                                </motion.div>

                                <div>
                                    <div className="flex justify-between items-start p-4">
                                        <div className="">
                                            <motion.h3
                                                layoutId={`title-${active.title}-${id}`}
                                                className="font-bold text-neutral-700 dark:text-neutral-200"
                                            >
                                                {active.title}
                                            </motion.h3>
                                            <p className="text-neutral-600 dark:text-neutral-400">
                                                {active.description}
                                            </p>
                                        </div>

                                        <motion.a
                                            layoutId={`button-${active.title}-${id}`}
                                            href={`https://www.youtube.com/watch?v=${active.id}`}
                                            target="_blank"
                                            className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                                        >
                                            Play
                                        </motion.a>
                                    </div>
                                    <div className="pt-4 relative px-4">
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                                        >
                                            {active.description}
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ) : null}
                </AnimatePresence>
                <ul className="max-w-2xl mx-auto w-full gap-4">
                    {filteredEpisodes.map((episode, index) => (
                        <motion.div
                            layoutId={`card-${episode.title}-${id}`}
                            key={`card-${episode.title}-${id}`}
                            onClick={() => setActive(episode)}
                            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer border border-gray-300 mb-4"
                        >
                             <motion.div layoutId={`image-${episode.title}-${id}`} className="p-2">
                                  <Image
                                      width={100}
                                      height={100}
                                      src={episode.thumbnail}
                                      alt={episode.title}
                                      className="h-40 w-full  rounded-lg object-cover object-top"
                                      />
                                </motion.div>
                                 <div className="w-full">
                                    <motion.h3
                                        layoutId={`title-${episode.title}-${id}`}
                                        className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                                    >
                                        {episode.title}
                                    </motion.h3>
                                    <p className="text-neutral-600 dark:text-neutral-400 text-center md:text-left">
                                          {episode.description}
                                       </p>
                                   </div>
                            
                         <motion.button
                                layoutId={`button-${episode.title}-${id}`}
                                className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
                            >
                                Play
                         </motion.button>
                        </motion.div>
                    ))}
                </ul>
            </div>
        </div>
    );
}