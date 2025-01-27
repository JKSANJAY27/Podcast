import type { Episode } from '@/types/episode';
import { google } from 'googleapis';

const youtube = google.youtube('v3');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

export async function getYouTubeVideos(maxResults = 50): Promise<Episode[]> {
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
        });

        if (!response.data.items) {
            return [];
        }

        const videos = await Promise.all(
            response.data.items.map(async (item) => {
                if (!item.id?.videoId) {
                    return null;
                }

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
            })
        );

        return videos.filter(Boolean) as Episode[]; // Filter out nulls

    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        return [];
    }
}

export async function getYouTubeVideo(videoId: string): Promise<Episode | null> {
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
