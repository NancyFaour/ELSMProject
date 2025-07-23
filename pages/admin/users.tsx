'use client';

import "@/css/style.css";
import AdminLayout from '@/components/Admin/AdminLayout';
import { useState, useEffect } from 'react';
import UserTable from '@/components/Admin/UserTable';
import UserFormModal from '@/components/Admin/UserFormModal';

export type User = {
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
    async function fetchUsers() {
      try {
        const res = await fetch('/api/users');
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Failed to load users:', err);
        alert('Error loading users. Please try again later.');
      }
    }
    fetchUsers();
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

  const handleSave = async (user: User) => {
    try {
      const isEditing = !!editUser;
      const url = isEditing ? `/api/users?id=${editUser?.id}` : '/api/users';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Save failed: ${text}`);
      }

      const savedUser = await res.json();

      setUsers((prev) =>
        isEditing
          ? prev.map((u) => (u.id === savedUser.id ? savedUser : u))
          : [...prev, savedUser]
      );

      handleCloseModal();
    } catch (err: any) {
      console.error('Save error:', err);
      alert(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(await res.text());
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err: any) {
      console.error('Delete error:', err);
      alert(`Error deleting user: ${err.message}`);
    }
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
