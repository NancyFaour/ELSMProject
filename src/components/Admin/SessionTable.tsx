'use client';

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
  data: Session[];
  onEdit: (session: Session) => void;
  onDelete: (id: number) => void;
  onManageVideos: (sessionId: number) => void; // ✅ Needed
};

export default function SessionTable({ data, onEdit, onDelete, onManageVideos }: Props) {
  return (
    <table className="session-table" role="grid" aria-label="Session management table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Course ID</th>
          <th>Videos</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={5}>No sessions found.</td>
          </tr>
        ) : (
          data.map((session) => (
            <tr key={session.id}>
              <td>{session.title}</td>
              <td>{session.description}</td>
              <td>{session.courseId}</td>
              <td>{session.videos?.length || 0}</td>
              <td>
                <button onClick={() => onEdit(session)} title="Edit">✏️</button>
                <button onClick={() => onDelete(session.id)} title="Delete">🗑️</button>
                <button onClick={() => onManageVideos(session.id)} title="Manage Videos">🎞️</button> {/* ✅ */}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
