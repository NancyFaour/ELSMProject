'use client';
import fetch from 'node-fetch';
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
  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      if (!response.ok) {
        throw new Error(`Failed to fetch courses: ${response.status}`);
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchCourses();
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

