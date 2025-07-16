'use client';

import '@/css/style.css';
import AdminLayout from '@/components/Admin/AdminLayout';
import RoleTable from '@/components/Admin/RoleTable';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Role = {
  id: number;
  roleName: string;
  createdAt: string;
};

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Mock data
    const mockRoles: Role[] = [
      { id: 1, roleName: 'Admin', createdAt: '2024-01-10' },
      { id: 2, roleName: 'Editor', createdAt: '2024-04-22' },
    ];
    setRoles(mockRoles);
  }, []);

  const handleAdd = () => {
    router.push('/admin/roles/form?mode=add');
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/roles/form?mode=edit&id=${id}`);
  };

  const handleDelete = (id: number) => {
    setRoles(prev => prev.filter(role => role.id !== id));
  };

  return (
    <AdminLayout>
      <div className="admin-roles">
        <div className="header">
          <h2>Manage Roles</h2>
          <button className="add-button" onClick={handleAdd}>Add Role</button>
        </div>
        <RoleTable data={roles} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </AdminLayout>
  );
}
