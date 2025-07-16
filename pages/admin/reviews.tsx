'use client';

import "@/css/style.css";
import AdminLayout from '@/components/Admin/AdminLayout';
import ReviewTable from '@/components/Admin/ReviewTable';
import { useEffect, useState } from 'react';

type Review = {
  id: number;
  courseId: number;
  name: string;
  email: string;
  reviewComment: string;
  starsOfTheReview: number;
  reviewDate: string; // ISO string
};

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Mock data for now
    const mockReviews: Review[] = [
      {
        id: 1,
        courseId: 101,
        name: 'Alice Smith',
        email: 'alice@example.com',
        reviewComment: 'Great course!',
        starsOfTheReview: 5,
        reviewDate: '2025-07-10T10:00:00Z',
      },
      {
        id: 2,
        courseId: 102,
        name: 'John Doe',
        email: 'john@example.com',
        reviewComment: 'Very helpful and well-structured.',
        starsOfTheReview: 4,
        reviewDate: '2025-07-12T15:30:00Z',
      },
    ];

    setReviews(mockReviews);
  }, []);

  return (
    <AdminLayout>
      <div className="admin-reviews">
        <div className="header">
          <h2>Manage Reviews</h2>
        </div>
        <ReviewTable data={reviews} />
      </div>
    </AdminLayout>
  );
}
