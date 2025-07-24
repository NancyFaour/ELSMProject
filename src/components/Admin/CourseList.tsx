'use client';

import { useEffect, useState } from 'react';

type Course = {
  id: number;
  title: string;
};

type Props = {
  onSelectCourse: (courseId: number) => void;
};

export default function CourseList({ onSelectCourse }: Props) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/courses'); 
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;

  return (
    <div>
      
      <ul className="space-y-2">
        {courses.map((course) => (
          <li
            key={course.id}
            onClick={() => onSelectCourse(course.id)}
            className="cursor-pointer p-2 border rounded hover:bg-gray-100"
          >
            {course.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
