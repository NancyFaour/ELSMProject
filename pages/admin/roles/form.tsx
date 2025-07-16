'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import '@/css/style.css';

type PermissionGroup = {
  view: boolean;
  add?: boolean;
  modify?: boolean;
  delete: boolean;
};

type RoleFormData = {
  roleName: string;
  category: PermissionGroup;
  course: PermissionGroup;
  review: PermissionGroup;
};

export default function RoleFormPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get('mode') || 'add';

  const [formData, setFormData] = useState<RoleFormData>({
    roleName: '',
    category: { view: false, add: false, modify: false, delete: false },
    course: { view: false, add: false, modify: false, delete: false },
    review: { view: false, delete: false },
  });

  useEffect(() => {
    if (mode === 'edit') {
      // Replace with fetch logic later
      const mock = {
        roleName: 'Instructor',
        category: { view: true, add: false, modify: true, delete: false },
        course: { view: true, add: true, modify: true, delete: false },
        review: { view: true, delete: false },
      };
      setFormData(mock);
    }
  }, [mode]);

  const handleCheckboxChange = (group: keyof RoleFormData, perm: keyof PermissionGroup) => {
    setFormData(prev => ({
      ...prev,
      [group]: {
        ...prev[group],
        [perm]: !prev[group][perm],
      },
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, roleName: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Role:', formData);
    router.push('/admin/roles');
  };

  return (
    <div className="role-form">
      <h2>{mode === 'edit' ? 'Edit Role' : 'Add Role'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Role Name:</label>
        <input
          name="roleName"
          value={formData.roleName}
          onChange={handleInputChange}
          required
        />

        <div className="permission-section">
          <h4>Category Permissions</h4>
          {['view', 'add', 'modify', 'delete'].map((perm) => (
            <label key={`cat-${perm}`}>
              <input
                type="checkbox"
                checked={formData.category[perm as keyof PermissionGroup] || false}
                onChange={() => handleCheckboxChange('category', perm as keyof PermissionGroup)}
              />
              {perm.charAt(0).toUpperCase() + perm.slice(1)}
            </label>
          ))}
        </div>

        <div className="permission-section">
          <h4>Course Permissions</h4>
          {['view', 'add', 'modify', 'delete'].map((perm) => (
            <label key={`course-${perm}`}>
              <input
                type="checkbox"
                checked={formData.course[perm as keyof PermissionGroup] || false}
                onChange={() => handleCheckboxChange('course', perm as keyof PermissionGroup)}
              />
              {perm.charAt(0).toUpperCase() + perm.slice(1)}
            </label>
          ))}
        </div>

        <div className="permission-section">
          <h4>Review Permissions</h4>
          {['view', 'delete'].map((perm) => (
            <label key={`review-${perm}`}>
              <input
                type="checkbox"
                checked={formData.review[perm as keyof PermissionGroup] || false}
                onChange={() => handleCheckboxChange('review', perm as keyof PermissionGroup)}
              />
              {perm.charAt(0).toUpperCase() + perm.slice(1)}
            </label>
          ))}
        </div>

        <div className="form-actions">
          <button type="submit">{mode === 'edit' ? 'Update' : 'Create'} Role</button>
          <button type="button" onClick={() => router.push('/admin/roles')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
