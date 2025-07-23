'use client';

import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

type Permission = {
  section: string;
  actions: string[];
};

type Role = {
  id: number;
  roleName: string;
  createdAt: string;
  permissions: Permission[];
  userCount: number;
};

type Props = {
  role: Role;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

// Helper to convert actions to sentence format
const formatSentence = (section: string | null | undefined, actions: string[]): string => {
  const sectionName = section || 'Unknown Section';

  if (!actions || actions.length === 0) {
    return `No permissions in ${sectionName.toLowerCase()}`;
  }

  const capitalized = actions.map(
    (action) => action.charAt(0).toUpperCase() + action.slice(1).toLowerCase()
  );

  if (capitalized.length === 1) {
    return `${capitalized[0]} in ${sectionName}`;
  }

  const last = capitalized.pop();
  return `${capitalized.join(', ')} and ${last} in ${sectionName}`;
};

export default function RoleCard({ role, onEdit, onDelete }: Props) {
  return (
    <div className="role-card" tabIndex={0}>
      <h3 className="role-title">{role.roleName}</h3>

      <p className="sentence">
        Total users with this role is: <strong>{role.userCount}</strong>
      </p>

      <ul className="sentence-list">
        {role.permissions.map((perm, idx) => (
          <li key={idx}>{formatSentence(perm.section, perm.actions)}</li>
        ))}
      </ul>

      <div className="card-actions">
        <button onClick={() => onEdit(role.id)} className="btn card-btn">
          <FaEdit /> Edit
        </button>
        <button onClick={() => onDelete(role.id)} className="btn card-btn">
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
}
