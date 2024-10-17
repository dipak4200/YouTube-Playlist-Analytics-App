import axios from 'axios';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const playlistId = searchParams.get('playlistId');

    if (!playlistId) {
        return new Response(JSON.stringify({ error: 'Missing playlistId parameter' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const API_KEY = process.env.YOUTUBE_API_KEY;
    const maxResults = 50; // Maximum allowed by YouTube

    try {
        let videos = [];
        let nextPageToken = '';
        do {
            const playlistResponse = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
                params: {
                    part: 'contentDetails',
                    playlistId,
                    maxResults,
                    pageToken: nextPageToken,
                    key: API_KEY,
                },
            });

            const videoIds = playlistResponse.data.items.map(item => item.contentDetails.videoId).join(',');

            const videosResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {
                    part: 'snippet,statistics',
                    id: videoIds,
                    key: API_KEY,
                },
            });

            const fetchedVideos = videosResponse.data.items.map(video => ({
                id: video.id,
                title: video.snippet.title,
                thumbnail: video.snippet.thumbnails.default.url,
                viewCount: parseInt(video.statistics.viewCount, 10),
            }));

            videos = [...videos, ...fetchedVideos];
            nextPageToken = playlistResponse.data.nextPageToken;
        } while (nextPageToken);

        return new Response(JSON.stringify({ videos }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error.response?.data || error.message);
        return new Response(JSON.stringify({ error: 'Failed to fetch playlist data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
