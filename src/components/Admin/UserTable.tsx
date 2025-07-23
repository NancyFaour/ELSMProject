'use client';

type User = {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
};

type Props = {
  data: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
};

export default function UserTable({ data, onEdit, onDelete }: Props) {
  return (
    <table className="user-table" role="grid" aria-label="User management table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Created At</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr><td colSpan={5}>No users found.</td></tr>
        ) : (
          data.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => onEdit(user)} title="Edit">✏️</button>
                <button onClick={() => onDelete(user.id)} title="Delete">🗑️</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
