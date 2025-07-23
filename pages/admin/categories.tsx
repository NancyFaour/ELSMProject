'use client';
import fetch from 'node-fetch';
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
    fetchCategories();
  }, []);

 const fetchCategories = async () => {
  try {
    const response = await fetch('/api/categories');
    const data = await response.json();

    if (Array.isArray(data)) {
      setCategories(data);
    } else {
      console.error('Invalid data format:', data);
      setCategories([]);
    }
  } catch (err) {
    console.error('Failed to fetch categories:', err);
    setCategories([]);
  }
};

  const handleAddClick = () => {
    setEditCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    try {
      await fetch(`/api/categories?id=${id}`, { method: 'DELETE' });
      fetchCategories();
    } catch (err) {
      console.error('Failed to delete category:', err);
    }
  };

  const handleCloseModal = () => {
    setEditCategory(null);
    setIsModalOpen(false);
  };

  const handleSave = async (category: Category) => {
    try {
      const method = editCategory ? 'PUT' : 'POST';
      const response = await fetch('/api/categories', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editCategory ? category.id : 0,
          name: category.name,
          courseCount: 0, // backend expects this
        }),
      });

      if (!response.ok) throw new Error('Save failed');

      fetchCategories();
      handleCloseModal();
    } catch (err) {
      console.error('Failed to save category:', err);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-categories">
        <div className="header">
          <h2>Manage Categories</h2>
          <button className="add-button" onClick={handleAddClick}>Add Category</button>
        </div>
        <CategoryTable data={categories} onEdit={handleEdit} onDelete={handleDelete} />
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
