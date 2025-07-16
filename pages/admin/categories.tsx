'use client';

import "@/css/style.css";
import AdminLayout from '@/components/Admin/AdminLayout';
import CategoryTable from '@/components/Admin/CategoryTable';
import CategoryFormModal from '@/components/Admin/CategoryFormModal';
import { useEffect, useState } from 'react';

type Category = {
  id?: number;
  name: string;
  courseCount?: number;
};


export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  useEffect(() => {
    const mockData: Category[] = [
      { id: 1, name: 'Programming', courseCount: 10 },
      { id: 2, name: 'Design', courseCount: 7 },
      { id: 3, name: 'Marketing', courseCount: 5 },
    ];
    setCategories(mockData);
  }, []);

  const handleAddClick = () => {
    setEditCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditCategory(null);
    setIsModalOpen(false);
  };

 const handleSave = (category: Category) => {
  if (editCategory) {
    setCategories(prev =>
      prev.map(c => (c.id === category.id ? { ...c, ...category } : c))
    );
  } else {
    const newCategory = {
      ...category,
      id: Date.now(),
      courseCount: 0, // mock value
    };
    setCategories(prev => [...prev, newCategory]);
  }
  handleCloseModal();
};

  return (
    <AdminLayout>
      <div className="admin-categories">
        <div className="header">
          <h2>Manage Categories</h2>
          <button className="add-button" onClick={handleAddClick}>Add Category</button>
        </div>
        <CategoryTable data={categories} onEdit={handleEdit} />
        {isModalOpen && (
          <CategoryFormModal
            category={editCategory}
            onClose={handleCloseModal}
            onSave={handleSave}
          />
        )}
      </div>
    </AdminLayout>
  );
}
