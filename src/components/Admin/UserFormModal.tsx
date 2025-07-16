'use client';

import { useEffect, useState } from 'react';

type Props = {
  user: {
    id?: number;
    username: string;
    email: string;
    role: string;
  } | null;
  onClose: () => void;
  onSave: (user: any) => void;
};

export default function UserFormModal({ user, onClose, onSave }: Props) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        role: user.role,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = user?.id ? { ...formData, id: user.id } : formData;
    onSave(payload);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{user ? 'Edit User' : 'Add User'}</h3>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input name="username" value={formData.username} onChange={handleChange} required />

          <label>Email:</label>
          <input name="email" value={formData.email} type="email" onChange={handleChange} required />

          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
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
