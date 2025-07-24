// components/VideoFormModal.tsx
'use client';

import { useState } from 'react';

type Video = {
  id?: number;
  title: string;
  fileName?: string;
  filePath?: string;
};

type Props = {
  sessionId: number;
  video: Video | null;
  onClose: () => void;
};

export default function VideoFormModal({ sessionId, video, onClose }: Props) {
  const [title, setTitle] = useState(video?.title || '');
  const [file, setFile] = useState<File | null>(null);

  const isEdit = !!video;

const handleSubmit = async () => {
  if (!sessionId) {
    alert('Session ID is missing');
    return;
  }

  const formData = new FormData();
  formData.append('title', title);
  formData.append('sessionId', sessionId.toString());
  if (file) formData.append('file', file);

  const method = isEdit ? 'PUT' : 'POST';
  const url = isEdit ? `/api/courseSession?videos=true&id=${video?.id}` : '/api/courseSession?videos=true';

  try {
    const res = await fetch(url, {
      method,
      body: formData,
    });

    if (res.ok) {
      onClose();
    } else {
      const errText = await res.text();
      console.error('Failed to save video:', errText);
      alert(`Failed to save video: ${errText}`);
    }
  } catch (error) {
    console.error('Request error:', error);
    alert('An error occurred while saving video.');
  }
};

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded w-96">
        <h3 className="text-xl mb-2">{isEdit ? 'Edit Video' : 'Add Video'}</h3>
        <input
          type="text"
          value={title}
          placeholder="Video Title"
          className="border p-2 mb-2 w-full"
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="file"
          accept="video/*"
          className="mb-4"
          onChange={e => setFile(e.target.files?.[0] || null)}
        />
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-1 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
          <button className="px-4 py-1 bg-blue-500 text-white rounded" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
}
