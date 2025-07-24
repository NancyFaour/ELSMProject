'use client';

import "@/css/style.css";
import AdminLayout from '@/components/Admin/AdminLayout';
import { useEffect, useState } from 'react';
import SessionTable from '@/components/Admin/SessionTable';
import SessionFormModal from '@/components/Admin/SessionFormModal';
import CourseList from '@/components/Admin/CourseList';
import VideoList from '@/components/Admin/VideoList'; // ✅ VideoList import

export type Video = {
  id: number;
  sessionId: number;
  fileName: string;
  filePath: string;
  uploadDate: string;
  title: string;
};

export type Session = {
  id: number;
  courseId: number;
  title: string;
  description: string;
  videos: Video[];
};

export type Course = {
  id: number;
  title: string;
};

export default function CourseSessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [allSessions, setAllSessions] = useState<Session[]>([]);
  const [editSession, setEditSession] = useState<Session | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null); // ✅ used for video display

  useEffect(() => {
    async function fetchSessions() {
      try {
        const res = await fetch('/api/courseSession');
        if (!res.ok) throw new Error('Failed to fetch sessions');
        const data: Session[] = await res.json();
        setAllSessions(data);
      } catch (err) {
        console.error(err);
        alert('Failed to load course sessions.');
      }
    }

    fetchSessions();
  }, []);

  useEffect(() => {
    if (selectedCourseId !== null) {
      const filtered = allSessions.filter(s => s.courseId === selectedCourseId);
      setSessions(filtered);
    }
  }, [selectedCourseId, allSessions]);

  const handleAdd = () => {
    setEditSession({ id: 0, courseId: selectedCourseId!, title: '', description: '', videos: [] });
    setIsModalOpen(true);
  };

  const handleEdit = (session: Session) => {
    setEditSession(session);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditSession(null);
  };

  const handleSave = async (form: Session) => {
    try {
      const isEditing = form.id !== 0;
      const url = isEditing ? `/api/courseSession/?id=${form.id}` : '/api/courseSession';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Save failed');
      }

      const savedSession: Session = isEditing ? form : await res.json();

      setAllSessions((prev) =>
        isEditing
          ? prev.map((s) => (s.id === savedSession.id ? savedSession : s))
          : [...prev, savedSession]
      );

      handleCloseModal();
    } catch (err: any) {
      console.error('Save error:', err);
      alert(`Error saving session: ${err.message}`);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this session?')) return;
    try {
      const res = await fetch(`/api/courseSession/?id=${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Failed to delete session');
      }
      setAllSessions((prev) => prev.filter((s) => s.id !== id));
      if (selectedSessionId === id) setSelectedSessionId(null); // clear videos if deleted
    } catch (err: any) {
      console.error('Delete error:', err);
      alert(`Error deleting session: ${err.message}`);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-sessions">
        {!selectedCourseId ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Select a Course</h2>
            <CourseList onSelectCourse={setSelectedCourseId} />
          </>
        ) : (
          <>
            <div className="header">
              <h2>Sessions for Course ID {selectedCourseId}</h2>
              <button onClick={() => setSelectedCourseId(null)} className="text-blue-600 underline">← Back to Course List</button>
              <button className="add-button" onClick={handleAdd}>Add Session</button>
            </div>

            <SessionTable
              data={sessions}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onManageVideos={setSelectedSessionId} // ✅ Pass sessionId to show videos
            />

            {selectedSessionId && (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-2">Videos for Session #{selectedSessionId}</h3>
                <VideoList sessionId={selectedSessionId} />
              </div>
            )}

            {isModalOpen && (
              <SessionFormModal
                session={editSession}
                onClose={handleCloseModal}
                onSave={handleSave}
              />
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}
