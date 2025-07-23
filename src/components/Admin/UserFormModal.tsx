'use client';

import { useEffect, useState } from 'react';

export type User = {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
};

type Props = {
  user: User | null;
  onClose: () => void;
  onSave: (user: User) => void;
};

export default function UserFormModal({ user, onClose, onSave }: Props) {
  const [formData, setFormData] = useState<User>({
    id: user?.id ?? 0,
    username: user?.username ?? '',
    email: user?.email ?? '',
    role: user?.role ?? '',
    createdAt: user?.createdAt ?? new Date().toISOString(),
  });

  const [roles, setRoles] = useState<any[]>([]); 

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        id: 0,
        username: '',
        email: '',
        role: '',
        createdAt: new Date().toISOString(),
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch('/api/WebRole');
        const data = await res.json();
        setRoles(data);
      } catch (err) {
        console.error('Failed to load roles:', err);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.roleName}>
                {role.roleName}
              </option>
            ))}
          </select>

          <div className="form-actions">
            <button type="submit">{user ? 'Update' : 'Create'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
