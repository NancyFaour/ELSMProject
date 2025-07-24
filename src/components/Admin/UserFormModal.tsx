'use client';

import { useEffect, useState } from 'react';

export type User = {
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
  user: User | null;
  roles: Role[];              
  onClose: () => void;
  onSave: (user: User) => void;
};

export default function UserFormModal({ user, roles, onClose, onSave }: Props) {
  const [formData, setFormData] = useState<User>({
    id: user?.id ?? 0,
    username: user?.username ?? '',
    email: user?.email ?? '',
    roleId: user?.roleId ?? 0,
    createdAt: user?.createdAt ?? new Date().toISOString(),
  });

  useEffect(() => {
    setFormData({
      id: user?.id ?? 0,
      username: user?.username ?? '',
      email: user?.email ?? '',
      roleId: user?.roleId ?? 0,
      createdAt: user?.createdAt ?? new Date().toISOString(),
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'roleId' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.roleId) {
      alert('Please select a role');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <h3 id="modal-title">{user ? 'Edit User' : 'Add User'}</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            autoFocus
          />

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="roleId">Role:</label>
          <select
            id="roleId"
            name="roleId"
            value={formData.roleId}
            onChange={handleChange}
            required
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>

          <div className="form-actions" style={{ marginTop: 20 }}>
            <button type="submit">{user ? 'Update' : 'Create'}</button>
            <button type="button" onClick={onClose} style={{ marginLeft: 10 }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
