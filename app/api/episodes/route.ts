import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import type { Episode } from '@/types/episode';

const youtube = google.youtube('v3');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

async function getYouTubeVideos(maxResults = 50): Promise<Episode[]> {
    console.log('YouTube API Key:', YOUTUBE_API_KEY ? 'Present' : 'Missing');
    console.log('Channel ID:', CHANNEL_ID);
    if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
        console.error("Missing YouTube API key or Channel ID");
        return [];
    }
    try {
        const response = await youtube.search.list({
            key: YOUTUBE_API_KEY,
            channelId: CHANNEL_ID,
            part: ['snippet'],
            order: 'date',
            maxResults,
            type: ['video']
        });

        console.log('YouTube API Response:', JSON.stringify(response.data, null, 2));

        if (!response.data.items) {
            return [];
        }

        const videos = await Promise.all(
            response.data.items.map(async (item) => {
                if (!item.id?.videoId) {
                    return null;
                }

                try{
                    const videoDetails = await youtube.videos.list({
                        key: YOUTUBE_API_KEY,
                        part: ['contentDetails'],
                        id: [item.id.videoId],
                    });

                    if (!videoDetails.data.items || videoDetails.data.items.length === 0 || !videoDetails.data.items[0].contentDetails?.duration) {
                        return null;
                    }

                    const duration = videoDetails.data.items[0].contentDetails.duration;

                    return {
                        id: item.id.videoId,
                        title: item.snippet?.title || 'No Title',
                        description: item.snippet?.description || 'No Description',
                        thumbnail: item.snippet?.thumbnails?.high?.url || '',
                        publishedAt: item.snippet?.publishedAt || '',
                        duration: formatDuration(duration),
                    } as Episode;
                } catch (error) {
                    console.error('Error fetching YouTube video:', error);
                    return null;
                }
            })
        );

        return videos.filter(Boolean) as Episode[]; // Filter out nulls

    } catch (error) {
        console.error('Complete error in getYouTubeVideos:', error);
        return [];
    }
}

async function getYouTubeVideo(videoId: string): Promise<Episode | null> {
    if (!YOUTUBE_API_KEY) {
        console.error("Missing YouTube API key");
        return null;
    }
    try {
        const response = await youtube.videos.list({
            key: YOUTUBE_API_KEY,
            part: ['snippet', 'contentDetails'],
            id: [videoId],
        });

        if (!response.data.items || response.data.items.length === 0) {
            return null;
        }

        const video = response.data.items[0];

        if (!video.snippet || !video.contentDetails?.duration) {
            return null;
        }

        return {
            id: videoId,
            title: video.snippet.title || 'No Title',
            description: video.snippet.description || 'No Description',
            thumbnail: video.snippet.thumbnails?.high?.url || '',
            publishedAt: video.snippet.publishedAt || '',
            duration: formatDuration(video.contentDetails.duration),
        } as Episode;
    } catch (error) {
        console.error('Error fetching YouTube video:', error);
        return null;
    }
}

function formatDuration(duration: string): string {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    const hours = (match?.[1] || '').replace('H', '');
    const minutes = (match?.[2] || '').replace('M', '');
    const seconds = (match?.[3] || '').replace('S', '');

    let result = '';
    if (hours) result += `${hours}:`;
    result += `${minutes.padStart(2, '0')}:`;
    result += seconds.padStart(2, '0');

    return result;
}


export async function GET(request: Request) {
    console.log('API Route: GET /api/episodes called');
    
    try {
        const episodes = await getYouTubeVideos(50);
        console.log('Fetched Episodes:', episodes.length);
        return NextResponse.json(episodes);
    } catch (error) {
        console.error("Comprehensive error in API route:", error);
        return NextResponse.json({ 
            error: "Failed to fetch episodes", 
            details: error instanceof Error ? error.message : 'Unknown error' 
        }, { status: 500 });
    }
}

// Add a new handler for a specific video ID

export async function POST(request: Request) {
    try {
        const { videoId } = await request.json();

        if (!videoId) {
            return NextResponse.json({ error: "Video ID is required" }, { status: 400 });
        }

        const episode = await getYouTubeVideo(videoId);

        if (!episode) {
            return NextResponse.json({ error: "Episode not found" }, { status: 404 });
        }

        return NextResponse.json(episode);
    } catch (error) {
        console.error("Error fetching single episode:", error);
        return NextResponse.json({ error: "Failed to fetch episode" }, { status: 500 });
    }
}