'use client';

import "@/css/style.css";
import AdminLayout from '@/components/Admin/AdminLayout';
import { useState, useEffect } from 'react';
import UserTable from '@/components/Admin/UserTable';
import UserFormModal from '@/components/Admin/UserFormModal';

type User = {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  useEffect(() => {
    // Mock data for now
    const mockUsers: User[] = [
      { id: 1, username: 'john_doe', email: 'john@example.com', role: 'admin', createdAt: '2024-01-01' },
      { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'user', createdAt: '2024-05-22' }
    ];
    setUsers(mockUsers);
  }, []);

  const handleAdd = () => {
    setEditUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditUser(null);
  };

  const handleSave = (user: User) => {
    if (editUser) {
      // Edit existing user
      setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
    } else {
      // Add new user (mocking ID)
      const newUser = { ...user, id: Date.now(), createdAt: new Date().toISOString() };
      setUsers((prev) => [...prev, newUser]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <AdminLayout>
      <div className="admin-users">
        <div className="header">
          <h2>Manage Users</h2>
          <button className="add-button" onClick={handleAdd}>Add User</button>
        </div>
        <UserTable data={users} onEdit={handleEdit} onDelete={handleDelete} />
        {isModalOpen && (
          <UserFormModal
            user={editUser}
            onClose={handleCloseModal}
            onSave={handleSave}
          />
        )}
      </div>
    </AdminLayout>
  );
}
