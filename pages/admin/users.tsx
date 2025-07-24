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
  roleId: number;
  createdAt: string;
};

export type Role = {
  id: number;
  name: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  // Load users and roles
  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, roleRes] = await Promise.all([
          fetch('/api/users'),
          fetch('/api/WebRole'),
        ]);

        if (!userRes.ok || !roleRes.ok) throw new Error('Failed to load data');

        const usersData = await userRes.json();
        const rolesData = await roleRes.json();

        setUsers(usersData);
        setRoles(rolesData);
      } catch (err) {
        console.error('Failed to load users or roles:', err);
        alert('Error loading users or roles. Please try again later.');
      }
    }

    fetchData();
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
      const isEditing = user.id !== 0;
      // Use id in the URL path for update
      const url = isEditing ? `/api/users/?id=${user.id}` : '/api/users';
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

      const savedUser: User = await res.json();

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
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || 'Failed to delete user');
    }
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

        <UserTable
          data={users}
          roles={roles}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {isModalOpen && (
          <UserFormModal
            user={editUser}
            roles={roles}
            onClose={handleCloseModal}
            onSave={handleSave}
          />
        )}
      </div>
    </AdminLayout>
  );
}
