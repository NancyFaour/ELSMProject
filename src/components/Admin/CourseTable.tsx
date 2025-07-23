'use client';

import { useRouter } from 'next/navigation';

type Course = {
  id?: number;
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

type Props = {
  data: Course[];
};

export default function CourseTable({ data }: Props) {
  const router = useRouter();

  const handleEdit = (id: number) => {
    router.push(`/admin/courses/form?mode=edit&id=${id}`);
  };

const handleDelete = async (id: number) => {
  const confirmDelete = confirm('Are you sure you want to delete this course?');
  if (!confirmDelete) return;

  try {
    const response = await fetch(`/api/courses/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete course');

    // Optionally refresh page or lift state up
    window.location.reload();
  } catch (error) {
    console.error('Error deleting course:', error);
  }
};


  return (
    <table className="course-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Level</th>
          <th>Price</th>
          <th>Duration</th>
          <th>Certificate</th>
          <th>Language</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={7}>No courses found.</td>
          </tr>
        ) : (
          data.map((course) => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.level}</td>
              <td>${course.price.toFixed(2)}</td>
              <td>{course.durationWeeks} weeks</td>
              <td>{course.certificate ? 'Yes' : 'No'}</td>
              <td>{course.language}</td>
              <td className="action-icons">
                <span onClick={() => handleEdit(course.id!)} title="Modify">✏️</span>
                <span onClick={() => handleDelete(course.id!)} title="Delete">🗑️</span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
