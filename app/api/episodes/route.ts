
import { NextResponse } from 'next/server';
import { getYouTubeVideo, getYouTubeVideos } from './service';


export async function GET(request: Request) {
  try {
    const episodes = await getYouTubeVideos(50);
    return NextResponse.json(episodes);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Failed to fetch episodes" }, { status: 500 });
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