'use client';

import { useState } from 'react';
import InputForm from '../components/InputForm';
import VideoList from '../components/VideoList';
import ViewsGraph from '../components/ViewsGraph';
import axios from 'axios';
import styles from '../styles/Home.module.css';

export default function Home() {
    const [videos, setVideos] = useState([]);
    const [playlistId, setPlaylistId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const extractPlaylistId = (url) => {
        try {
            const urlObj = new URL(url);
            return urlObj.searchParams.get('list');
        } catch (e) {
            return null;
        }
    };

    const handleSubmit = async (url) => {
        const id = extractPlaylistId(url);
        if (!id) {
            setError('Invalid playlist URL');
            return;
        }
        setPlaylistId(id);
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/api/getPlaylistVideos', {
                params: { playlistId: id },
            });
            setVideos(response.data.videos);
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>YouTube Playlist Views Graph</h1>
            </div>
            <div className={styles.main}>
                <div className={styles.inputSection}>
                    <InputForm onSubmit={handleSubmit} />
                    {error && <p className={styles.error}>{error}</p>}
                </div>
                {loading && <p>Loading...</p>}
                {videos.length > 0 && (
                    <div className={styles.content}>
                        <VideoList videos={videos} />
                        <ViewsGraph videos={videos} />
                    </div>
                )}
            </div>
            <style jsx>{`
        .error {
          color: red;
          text-align: center;
        }
      `}</style>
        </div>
    );
}
