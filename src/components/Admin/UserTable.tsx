'use client';

import React from 'react';

type User = {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  role: string;
};

type Props = {
  data: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
};

export default function UserTable({ data, onEdit, onDelete }: Props) {
  return (
    <table className="user-table">
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
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>{user.role}</td>
              <td className="action-icons">
                <span onClick={() => onEdit(user)} title="Modify">✏️</span>
                <span onClick={() => onDelete(user.id)} title="Delete">🗑️</span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
