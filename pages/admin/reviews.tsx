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
  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();

      if (Array.isArray(data)) {
        setReviews(data);
      } else {
        console.error('Invalid review format:', data);
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  };

  fetchReviews();
}, []);

  return (
    <AdminLayout>
      <div className="admin-reviews">
        <div className="header">
          <h2>Manage Reviews</h2>
        </div>
        <ReviewTable data={reviews} onDeleteSuccess={(id) => {
  setReviews(prev => prev.filter(r => r.id !== id));
}} />
      </div>
    </AdminLayout>
  );
}
