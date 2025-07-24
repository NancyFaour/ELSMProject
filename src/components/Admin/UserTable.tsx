'use client';

type User = {
  id: number;
  username: string;
  email: string;
  roleId: number;
  createdAt: string;
};

type Role = {
  id: number;
  name: string;
};

type Props = {
  data: User[];
  roles: Role[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
};

export default function UserTable({ data, roles, onEdit, onDelete }: Props) {
 const getRoleName = (roleId: number) => {
  if (!roleId) return 'No Role Assigned';
  const role = roles.find((r) =>  Number(roleId) ===Number(r.id) );
  if (!role) {
    console.warn(`Role with id ${roleId} not found in roles list`);
    return 'Unknown';
  }
  return role.name;
};


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
          <tr>
            <td colSpan={5}>No users found.</td>
          </tr>
        ) : (
          data.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</td>
              <td>{getRoleName(user.roleId)}</td>
              <td>
                <button onClick={() => onEdit(user)} title="Edit">
                  ✏️
                </button>
                <button onClick={() => onDelete(user.id)} title="Delete">
                  🗑️
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
