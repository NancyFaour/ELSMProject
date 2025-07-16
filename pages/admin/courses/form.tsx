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

export default function CourseFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mode = searchParams.get('mode'); // 'add' or 'edit'
  const id = searchParams.get('id');

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
    categoryId: 1,
  });

  useEffect(() => {
    if (mode === 'edit' && id) {
      // Simulate fetching course data for edit
      const mockCourse: Course = {
        id: Number(id),
        title: 'React Basics',
        overview: 'Learn the basics of React.',
        price: 199.99,
        level: 'Beginner',
        durationWeeks: 4,
        onlineClasses: 8,
        lessons: 12,
        quizzes: 2,
        passPercentage: 70,
        certificate: true,
        language: 'English',
        categoryId: 1,
      };
      setFormData(mockCourse);
    }
  }, [mode, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'add') {
      console.log('Add course:', formData);
      // TODO: POST to backend
    } else {
      console.log('Update course:', formData);
      // TODO: PUT to backend
    }

    router.push('/admin/courses');
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
          <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />

          <label>Level</label>
          <input name="level" value={formData.level} onChange={handleChange} required />

          <label>Duration (weeks)</label>
          <input name="durationWeeks" type="number" value={formData.durationWeeks} onChange={handleChange} />

          <label>Online Classes</label>
          <input name="onlineClasses" type="number" value={formData.onlineClasses} onChange={handleChange} />

          <label>Lessons</label>
          <input name="lessons" type="number" value={formData.lessons} onChange={handleChange} />

          <label>Quizzes</label>
          <input name="quizzes" type="number" value={formData.quizzes} onChange={handleChange} />

          <label>Pass Percentage</label>
          <input name="passPercentage" type="number" value={formData.passPercentage} onChange={handleChange} />

          <label>Certificate</label>
          <input type="checkbox" name="certificate" checked={formData.certificate} onChange={handleChange} />

          <label>Language</label>
          <input name="language" value={formData.language} onChange={handleChange} />

          <label>Category ID</label>
          <input name="categoryId" type="number" value={formData.categoryId} onChange={handleChange} />

          <button type="submit" className="submit-button">
            {mode === 'edit' ? 'Update' : 'Add'} Course
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
