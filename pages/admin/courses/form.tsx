'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AdminLayout from '@/components/Admin/AdminLayout';

type Course = {
  id: number;
  title: string;
  overview: string;
  price: number;
  level: string;
  durationWeeks: number;
  onlineClasses: number;
  lessons: number;
  quizzes: number;
  passPercentage: number;
  certificate: boolean;
  language: string;
  categoryId: number;
};

type Category = {
  id: number;
  name: string;
  courseCount: number;
};

export default function CourseFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mode = searchParams?.get('mode') || 'add';
  const id = searchParams?.get('id') || '';

  const [formData, setFormData] = useState<Course>({
    id: 0,
    title: '',
    overview: '',
    price: 0,
    level: '',
    durationWeeks: 0,
    onlineClasses: 0,
    lessons: 0,
    quizzes: 0,
    passPercentage: 0,
    certificate: false,
    language: '',
    categoryId: 0,
  });

  const [categories, setCategories] = useState<Category[]>([]);

useEffect(() => {
  async function fetchCategories() {
    try {
      const response = await fetch('/api/courses?loadCategories=true'); // updated endpoint
      if (!response.ok) throw new Error('Failed to load categories');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  }

  async function fetchCourse() {
    if (mode === 'edit' && id) {
      try {
        const response = await fetch(`/api/courses/${id}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch course: ${response.status} - ${errorText}`);
        }
        const data = await response.json();


        setFormData({
          ...data,
          categoryId: Number(data.categoryId || 0),
        });
      } catch (error: any) {
        console.error('Error fetching course:', error.message || error);
        alert(`Error loading course data: ${error.message || error}`);
      }
    }
  }

  fetchCategories();
  fetchCourse();
}, [mode, id]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;

    let newValue: string | number | boolean = value;

    if (type === 'checkbox') {
      newValue = checked;
    } else if (type === 'number') {
      newValue = value === '' ? 0 : Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = mode === 'add' ? '/api/courses' : `/api/courses/${formData.id}`;
      const method = mode === 'add' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to save course: ${response.status} - ${errorText}`);
      }

      router.push('/admin/courses');
    } catch (error: any) {
      console.error(`${mode === 'add' ? 'Add' : 'Update'} failed:`, error.message || error);
      alert(`Failed to save course: ${error.message || error}`);
    }
  };

  return (
    <AdminLayout>
      <div className="form-container">
        <h2>{mode === 'edit' ? 'Edit Course' : 'Add Course'}</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <label>Title</label>
          <input name="title" value={formData.title} onChange={handleChange} required />

          <label>Overview</label>
          <textarea name="overview" value={formData.overview} onChange={handleChange} rows={4} />

          <label>Price ($)</label>
          <input
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <label>Level</label>
          <input name="level" value={formData.level} onChange={handleChange} required />

          <label>Duration (weeks)</label>
          <input
            name="durationWeeks"
            type="number"
            value={formData.durationWeeks}
            onChange={handleChange}
          />

          <label>Online Classes</label>
          <input
            name="onlineClasses"
            type="number"
            value={formData.onlineClasses}
            onChange={handleChange}
          />

          <label>Lessons</label>
          <input name="lessons" type="number" value={formData.lessons} onChange={handleChange} />

          <label>Quizzes</label>
          <input name="quizzes" type="number" value={formData.quizzes} onChange={handleChange} />

          <label>Pass Percentage</label>
          <input
            name="passPercentage"
            type="number"
            value={formData.passPercentage}
            onChange={handleChange}
          />

          <label>Certificate</label>
          <input
            type="checkbox"
            name="certificate"
            checked={formData.certificate}
            onChange={handleChange}
          />

          <label>Language</label>
          <input name="language" value={formData.language} onChange={handleChange} />

          <label>Category</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button type="submit" className="submit-button">
            {mode === 'edit' ? 'Update' : 'Add'} Course
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
