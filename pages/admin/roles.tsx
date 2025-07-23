'use client';

import '@/css/style.css';
import AdminLayout from '@/components/Admin/AdminLayout';
import RoleCard from '@/components/Admin/RoleCard';
import RoleFormModal from '@/components/Admin/RoleFormModal';
import { useEffect, useState } from 'react';

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

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);


 useEffect(() => {
  const fetchRolesWithPermissions = async () => {
    try {
      const res = await fetch('/api/WebRole');
      const roles = await res.json();

      if (!Array.isArray(roles)) {
        throw new Error('Roles response is not an array');
      }

      const rolesWithPermissions = await Promise.all(
        roles.map(async (role: any) => {
          try {
            const permissionsRes = await fetch(`/api/RoleSection/${role.id}`);
            const permissionsJson = await permissionsRes.json();
            const permissions = Array.isArray(permissionsJson)
              ? permissionsJson
              : permissionsJson.data || [];

            const formattedPermissions = permissions.map((perm: any) => {
              const actions: string[] = [];
              if (perm.isView) actions.push('View');
              if (perm.isAdd) actions.push('Add');
              if (perm.isUpdate) actions.push('Modify');
              if (perm.isDelete) actions.push('Delete');
              return {
                section: perm.sectionName,
                actions,
              };
            });

            return {
              id: role.id,
              roleName: role.name, // ✅ Fixed here
              createdAt: role.createdAt,
              permissions: formattedPermissions,
              userCount: role.userCount || 0,
            };
          } catch (err) {
            console.warn(`Permission fetch failed for role ${role.id}`, err);
            return {
              id: role.id,
              roleName: role.name,
              createdAt: role.createdAt,
              permissions: [],
              userCount: 0,
            };
          }
        })
      );

      setRoles(rolesWithPermissions);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching roles:', error);
      setError('Failed to load roles.');
      setLoading(false);
    }
  };

  fetchRolesWithPermissions();
}, []);


  const openModal = (mode: 'add' | 'edit' | 'view', roleId: number | null = null) => {
    setModalMode(mode);
    setSelectedRoleId(roleId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoleId(null);
  };

  const handleDeleteRole = async (id: number) => {
  if (!confirm('Are you sure you want to delete this role?')) return;

  try {
    const res = await fetch(`/api/WebRole?id=${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const errorMsg = await res.text();
      throw new Error(errorMsg || 'Failed to delete role');
    }

    setRoles((prev) => prev.filter((role) => role.id !== id));
  } catch (error) {
    console.error('Delete role failed:', error);
    alert('Failed to delete the role. Please try again.');
  }
};

  return (
    <AdminLayout>
      <div className="admin-roles-page">
        <header className="header">
          <h2>Manage Roles</h2>
          <button className="add-button" onClick={() => openModal('add')}>
            + Add Role
          </button>
        </header>

        {loading && <p className="loading">Loading roles...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && roles.length === 0 && <p>No roles found.</p>}

        {!loading && !error && roles.length > 0 && (
          <div className="role-card-container">
            {roles.map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                onEdit={() => openModal('edit', role.id)}
                onDelete={() => handleDeleteRole(role.id)}
              />
            ))}
          </div>
        )}

        {isModalOpen && (
          <RoleFormModal
            mode={modalMode}
            roleId={selectedRoleId}
            onClose={closeModal}
          />
        )}
      </div>
    </AdminLayout>
  );
}
