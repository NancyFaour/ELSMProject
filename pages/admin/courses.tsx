'use client';

import "@/css/style.css";
import AdminLayout from '@/components/Admin/AdminLayout';
import CourseTable from '@/components/Admin/CourseTable';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Replace later with backend fetch
    const mockData: Course[] = [
      {
        id: 1,
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
      },
    ];
    setCourses(mockData);
  }, []);

  const handleAddCourse = () => {
    router.push('/admin/courses/form?mode=add');
  };

  return (
    <AdminLayout>
      <div className="admin-courses">
        <div className="header">
          <h2>Manage Courses</h2>
          <button className="add-button" onClick={handleAddCourse}>
            Add Course
          </button>
        </div>
        <CourseTable data={courses} />
      </div>
    </AdminLayout>
  );
}

