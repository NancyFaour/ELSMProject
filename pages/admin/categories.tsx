'use client';

import "@/css/style.css";
import AdminLayout from '@/components/Admin/AdminLayout';
import CategoryTable from '@/components/Admin/CategoryTable';
import { useEffect, useState } from 'react';

type Category = {
  id: number;
  name: string;
  courseCount: number;
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Use mock data for now
    const mockData: Category[] = [
      { id: 1, name: 'Programming', courseCount: 10 },
      { id: 2, name: 'Design', courseCount: 7 },
      { id: 3, name: 'Marketing', courseCount: 5 },
    ];

    setCategories(mockData);
  }, []);

  return (
    <AdminLayout>
      <div className="admin-categories">
        <div className="header">
          <h2>Manage Categories</h2>
          <button className="add-button">Add Category</button>
        </div>
        <CategoryTable data={categories} />
      </div>
    </AdminLayout>
  );
}
