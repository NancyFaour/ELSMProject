'use client';

import { useEffect, useState } from 'react';
import VideoFormModal from './VideoFormModal';
import VideoPlayer from './VideoPlayer';

type Video = {
  id: number;
  sessionId: number;
  fileName: string;
  filePath: string;
  uploadDate: string;
  title: string;
};

type Props = {
  sessionId: number;
};

export default function VideoList({ sessionId }: Props) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async () => {
    if (!sessionId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/courseSession?videos=true&sessionId=${sessionId}`);
      if (!res.ok) throw new Error('Failed to fetch videos');
      const data = await res.json();
      setVideos(data);
    } catch (err) {
      console.error('Failed to fetch videos:', err);
      alert('Error loading videos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [sessionId]);

  const handleDelete = async (videoId: number) => {
    if (!confirm('Delete this video?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/courseSession?videos=true&videoId=${videoId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete video');
      await fetchVideos();
    } catch (err) {
      console.error(err);
      alert('Failed to delete video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold">Videos</h4>
        <button
          aria-label="Add new video"
          onClick={() => { setSelectedVideo(null); setShowModal(true); }}
          className="bg-blue-500 text-white px-3 py-1 rounded"
          disabled={loading}
        >
          + Add Video
        </button>
      </div>

      {loading ? (
        <p>Loading videos...</p>
      ) : videos.length === 0 ? (
        <p className="text-gray-500">No videos yet.</p>
      ) : (
        <ul className="space-y-2">
          {videos.map(video => (
            <li key={video.id} className="border p-2 rounded flex justify-between items-center">
              <span>{video.title}</span>
              <div className="space-x-2">
                <button
                  aria-label={`Preview video ${video.title}`}
                  onClick={() => setSelectedVideo(video)}
                  className="text-blue-600"
                  disabled={loading}
                >
                  Preview
                </button>
                <button
                  aria-label={`Edit video ${video.title}`}
                  onClick={() => { setSelectedVideo(video); setShowModal(true); }}
                  className="text-green-600"
                  disabled={loading}
                >
                  Edit
                </button>
                <button
                  aria-label={`Delete video ${video.title}`}
                  onClick={() => handleDelete(video.id)}
                  className="text-red-600"
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <VideoFormModal
          sessionId={sessionId}
          video={selectedVideo}
          onClose={() => {
            setShowModal(false);
            fetchVideos();
          }}
        />
      )}

      {selectedVideo && !showModal && <VideoPlayer video={selectedVideo} />}
    </div>
  );
}
