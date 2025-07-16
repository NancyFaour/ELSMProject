'use client';

import React from 'react';

type Role = {
  id: number;
  roleName: string;
  createdAt: string;
};

type Props = {
  data: Role[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function RoleTable({ data, onEdit, onDelete }: Props) {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Role Name</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr><td colSpan={3}>No roles found.</td></tr>
        ) : (
          data.map(role => (
            <tr key={role.id}>
              <td>{role.roleName}</td>
              <td>{new Date(role.createdAt).toLocaleDateString()}</td>
              <td className="action-icons">
                <span onClick={() => onEdit(role.id)} title="Modify">✏️</span>
                <span onClick={() => onDelete(role.id)} title="Delete">🗑️</span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
