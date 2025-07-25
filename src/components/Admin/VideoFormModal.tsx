'use client';

import { useState } from 'react';

type Video = {
  id?: number;
  title: string;
  videoUrl?: string;
};

type Props = {
  sessionId: number;
  video?: Video;
  isEdit: boolean;
  onClose: () => void;
};

export default function VideoFormModal({
  sessionId,
  video,
  isEdit,
  onClose,
}: Props) {
  const [title, setTitle] = useState(video?.title || '');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert('Video title is required');
      return;
    }

    setLoading(true);

    try {
      if (isEdit && video?.id !== undefined) {
        // Update video title inside session
        const sessionRes = await fetch(`/api/Session/${sessionId}`);
        if (!sessionRes.ok) throw new Error('Failed to fetch session');
        const sessionData = await sessionRes.json();

        const updatedVideos = sessionData.videos.map((v: Video) =>
          v.id === video.id ? { ...v, title } : v
        );

        const updatedSession = {
          ...sessionData,
          videos: updatedVideos,
        };

        const updateRes = await fetch(`/api/Session/${sessionId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedSession),
        });

        if (!updateRes.ok) {
          const errText = await updateRes.text();
          throw new Error(errText);
        }

        alert('Video title updated successfully');
      } else {
        // Upload new video
        if (!file) {
          alert('Please select a video file');
          return;
        }

        const formData = new FormData();
        // formData.append('title', title);           // Not used by backend but good for future
        formData.append('file', file);             // ✅ Required

        const createRes = await fetch(
          `/api/courseSession?videos=true&sessionId=${sessionId}`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!createRes.ok) {
          const errText = await createRes.text();
          throw new Error(errText);
        }

        alert('Video uploaded successfully');
      }

      onClose();
    } catch (err: any) {
      console.error('VideoFormModal Error:', err);
      alert(err?.message || 'Failed to save video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{isEdit ? 'Edit Video' : 'Add Video'}</h2>

        <label>Video Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter video title"
        />

        {!isEdit && (
          <>
            <label>Upload Video File</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </>
        )}

        <div className="button-group">
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : isEdit ? 'Update' : 'Upload'}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
