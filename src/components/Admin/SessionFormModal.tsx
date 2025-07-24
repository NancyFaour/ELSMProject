'use client';

import { useEffect, useState } from 'react';

type Video = {
  id: number;
  sessionId: number;
  fileName: string;
  filePath: string;
  uploadDate: string;
  title: string;
};

type Session = {
  id: number;
  courseId: number;
  title: string;
  description: string;
  videos: Video[];
};

type Props = {
  session: Session | null;
  onClose: () => void;
  onSave: (data: Session) => void;
};

export default function SessionFormModal({ session, onClose, onSave }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courseId, setCourseId] = useState(0);

  useEffect(() => {
    if (session) {
      setTitle(session.title);
      setDescription(session.description);
      setCourseId(session.courseId);
    }
  }, [session]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData: Session = {
      id: session?.id ?? 0,
      courseId: Number(courseId),
      title,
      description,
      videos: session?.videos ?? [],
    };

    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{session ? 'Edit Session' : 'Add Session'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <label>
            Course ID:
            <input
              type="number"
              value={courseId}
              onChange={(e) => setCourseId(Number(e.target.value))}
              required
            />
          </label>

          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
