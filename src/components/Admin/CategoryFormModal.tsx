'use client';

import { useEffect, useState } from 'react';

type Category = {
  id?: number;
  name: string;
  courseCount?: number; 
};

type Props = {
  category: Category | null;
  onClose: () => void;
  onSave: (category: Category) => void; 
};

export default function CategoryFormModal({ category, onClose, onSave }: Props) {
  const [formData, setFormData] = useState({ name: '' });

  useEffect(() => {
    if (category) {
      setFormData({ name: category.name });
    }
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = category?.id
      ? { id: category.id, name: formData.name }
      : { name: formData.name };
    onSave(payload); // ✅ Now matches onSave type
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{category ? 'Edit Category' : 'Add Category'}</h3>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <div className="form-actions">
            <button type="submit">{category ? 'Update' : 'Create'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
