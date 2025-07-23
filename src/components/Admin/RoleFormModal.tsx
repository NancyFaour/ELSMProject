'use client';

import { useEffect, useState } from 'react';
import '@/css/style.css';

type PermissionGroup = {
  view: boolean;
  add: boolean;
  modify: boolean;
  delete: boolean;
};

type RoleFormData = {
  roleName: string;
  category: PermissionGroup;
  course: PermissionGroup;
  review: PermissionGroup;
  roles: PermissionGroup;
  users: PermissionGroup;
};

type PermissionGroupKey = Exclude<keyof RoleFormData, 'roleName'>;

type RoleFormModalProps = {
  mode: 'add' | 'edit' | 'view';
  roleId: number | null;
  onClose: () => void;
};

export default function RoleFormModal({ mode, roleId, onClose }: RoleFormModalProps) {
  const isView = mode === 'view';

  const [formData, setFormData] = useState<RoleFormData>({
    roleName: '',
    category: { view: false, add: false, modify: false, delete: false },
    course: { view: false, add: false, modify: false, delete: false },
    review: { view: false, add: false, modify: false, delete: false },
    roles: { view: false, add: false, modify: false, delete: false },
    users: { view: false, add: false, modify: false, delete: false },
  });

  // Store existing permission IDs per section for updates
  const [permissionIds, setPermissionIds] = useState<Record<string, number>>({});

  // Map section names to backend section IDs — replace with your real IDs
  const sectionIds: Record<string, number> = {
    category: 1,
    course: 2,
    review: 3,
    roles: 4,
    users: 5,
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if ((mode === 'edit' || mode === 'view') && roleId != null) {
      const fetchRoleData = async () => {
        try {
          // Fetch role
          const roleRes = await fetch(`/api/WebRole?id=${roleId}`);
          if (!roleRes.ok) throw new Error(`Failed to fetch role, status ${roleRes.status}`);
          const roleData = await roleRes.json();

          // Fetch permissions
          const permRes = await fetch(`/api/RoleSection/${roleId}`);
          if (!permRes.ok) throw new Error(`Failed to fetch permissions, status ${permRes.status}`);
          const perms = await permRes.json();
          const permissions = Array.isArray(perms) ? perms : perms.data || [];

          const mappedPermissions: Partial<RoleFormData> = {};
          const permissionIdsMap: Record<string, number> = {};

          for (const section of ['category', 'course', 'review', 'roles', 'users']) {
            const match = permissions.find(
              (p: any) =>
                typeof p.sectionName === 'string' &&
                p.sectionName.toLowerCase() === section
            );

            mappedPermissions[section as PermissionGroupKey] = {
              view: !!match?.isView,
              add: !!match?.isAdd,
              modify: !!match?.isUpdate,
              delete: !!match?.isDelete,
            };

            permissionIdsMap[section] = match?.id || 0; // Save permission id for update
          }

          setFormData({
            roleName: roleData.name || '',
            ...(mappedPermissions as Omit<RoleFormData, 'roleName'>),
          });

          setPermissionIds(permissionIdsMap);
        } catch (err) {
          console.error('Failed to fetch role data:', err);
        }
      };

      fetchRoleData();
    }
  }, [mode, roleId]);

  const handleCheckboxChange = (group: PermissionGroupKey, perm: keyof PermissionGroup) => {
    if (isView) return;
    setFormData((prev) => {
      const currentGroup = { ...prev[group] };
      currentGroup[perm] = !currentGroup[perm];
      return {
        ...prev,
        [group]: currentGroup,
      };
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isView) return;
    setFormData((prev) => ({ ...prev, roleName: e.target.value }));
  };

 // ...
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.roleName.trim()) {
    alert('Role Name is required');
    return;
  }

  try {
    let currentRoleId = roleId;

    if (mode === 'add') {
      const res = await fetch(`/api/WebRole`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData.roleName), // <-- raw string literal
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to create role: ${errorText}`);
      }

      const createdRole = await res.json();
      currentRoleId = createdRole.id;
    } else if (mode === 'edit') {
      if (!currentRoleId) throw new Error('Role ID missing for update');

      console.log('Updating role:', currentRoleId, 'with name:', formData.roleName);

      const res = await fetch(`/api/WebRole?id=${currentRoleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData.roleName), // <-- raw string literal
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to update role: ${errorText}`);
      }
    }

    if (!currentRoleId) {
      throw new Error('Role ID missing after creation/update');
    }

    // Prepare permissions payload
    const permissionPayload = Object.entries(formData)
      .filter(([key]) => key !== 'roleName')
      .map(([section, perms]) => {
        const p = perms as PermissionGroup;
        return {
          id: permissionIds[section as PermissionGroupKey] ?? 0,
          idWebRole: currentRoleId,
          idSection: sectionIds[section as PermissionGroupKey],
          sectionName: section,
          isView: p.view,
          isAdd: p.add,
          isUpdate: p.modify,
          isDelete: p.delete,
        };
        console.log('Permission payload:', permissionPayload);
      });

    const permRes = await fetch(`/api/RoleSection/${currentRoleId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ request: permissionPayload }),
    });

    if (!permRes.ok) {
      const errorText = await permRes.text();
      throw new Error(`Failed to update permissions: ${errorText}`);
    }

    onClose();
  } catch (error) {
    console.error('Error saving role:', error);
    alert('There was an error saving the role. Please try again.');
  }
};

// ...


  const renderPermissions = (
    label: string,
    group: PermissionGroupKey,
    perms: (keyof PermissionGroup)[]
  ) => (
    <>
      <div className="permission-row">
        <span className="permission-label">{label}:</span>
        {perms.map((perm) => (
          <label key={`${group}-${perm}`} className="permission-checkbox">
            <input
              type="checkbox"
              checked={formData[group][perm]}
              onChange={() => handleCheckboxChange(group, perm)}
              disabled={isView}
            />
            {perm.charAt(0).toUpperCase() + perm.slice(1)}
          </label>
        ))}
      </div>
      <hr />
    </>
  );

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content white-theme">
        <button
          type="button"
          className="modal-close-btn"
          aria-label="Close role form"
          onClick={onClose}
        >
          ×
        </button>

        <h2 id="modal-title">
          {mode === 'edit' ? 'Edit Role' : mode === 'view' ? 'View Role' : 'Add Role'}
        </h2>

        <form onSubmit={handleSubmit} className="role-form" noValidate>
          <label htmlFor="roleName">Role Name:</label>
          <input
            id="roleName"
            name="roleName"
            type="text"
            value={formData.roleName}
            onChange={handleInputChange}
            required
            disabled={isView}
            className="input"
            autoFocus
          />

          {renderPermissions('Category', 'category', ['view', 'add', 'modify', 'delete'])}
          {renderPermissions('Course', 'course', ['view', 'add', 'modify', 'delete'])}
          {renderPermissions('Review', 'review', ['view', 'add', 'modify', 'delete'])}
          {renderPermissions('Roles', 'roles', ['view', 'add', 'modify', 'delete'])}
          {renderPermissions('Users', 'users', ['view', 'add', 'modify', 'delete'])}

          <div className="form-actions">
            {!isView && (
              <button type="submit">{mode === 'edit' ? 'Update' : 'Create'} Role</button>
            )}
            <button type="button" onClick={onClose}>
              {isView ? 'Close' : 'Cancel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
