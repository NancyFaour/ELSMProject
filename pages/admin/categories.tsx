'use client';

import "@/css/style.css";
import AdminLayout from '@/components/Admin/AdminLayout';
import CategoryTable from '@/components/Admin/CategoryTable';
import CategoryFormModal from '@/components/Admin/CategoryFormModal';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  setIsModalOpen,
} from '@/redux/slices/categorySlice';

type Category = {
  id?: number;
  name: string;
  courseCount?: number;
};

export default function AdminCategoriesPage() {
  const dispatch: AppDispatch = useDispatch();
  const { list: categories, loading, error, isModalOpen } = useSelector(
    (state: RootState) => state.categories
  );

 
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddClick = () => {
    setEditCategory(null);
    dispatch(setIsModalOpen(true));
  };

  const handleEdit = (category: Category) => {
    setEditCategory(category);
    dispatch(setIsModalOpen(true));
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    try {
      await fetch(`/api/categories?id=${id}`, { method: 'DELETE' });
      dispatch(deleteCategory(id));
    } catch (err) {
      console.error('Failed to delete category:', err);
    }
  };

  const handleCloseModal = () => {
    setEditCategory(null);
    dispatch(setIsModalOpen(false));
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
          courseCount: 0,
        }),
      });

      if (!response.ok) throw new Error('Save failed');
      const data = await response.json();

      if (editCategory) {
        dispatch(updateCategory(data));
      } else {
        dispatch(addCategory(data));
      }

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
          <button className="add-button" onClick={handleAddClick}>
            Add Category
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : (
          <CategoryTable data={categories} onEdit={handleEdit} onDelete={handleDelete} />
        )}

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
