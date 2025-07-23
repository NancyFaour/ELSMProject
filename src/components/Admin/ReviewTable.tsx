'use client';

type Review = {
  id ?: number;
  courseId: number;
  name: string;
  email: string;
  reviewComment: string;
  starsOfTheReview: number;
  reviewDate: string;
};

type Props = {
  data: Review[];
  onDeleteSuccess: (id: number) => void;
};

export default function ReviewTable({ data, onDeleteSuccess }: Props) {
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const res = await fetch(`/api/reviews?id=${id}`, { method: 'DELETE' });

      if (res.ok) {
        onDeleteSuccess(id);
      } else {
        const error = await res.json();
        alert('Failed to delete review: ' + error.error);
      }
    } catch (err) {
      console.error('Error deleting review:', err);
      alert('An error occurred while deleting the review.');
    }
  };

  return (
    <table className="review-table">
      <thead>
        <tr>
          <th>Course ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Comment</th>
          <th>Stars</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={7}>No reviews found.</td>
          </tr>
        ) : (
          data.map((review) => (
            <tr key={review.id}>
              <td>{review.courseId}</td>
              <td>{review.name}</td>
              <td>{review.email}</td>
              <td>{review.reviewComment}</td>
              <td>{review.starsOfTheReview} ⭐</td>
              <td>{new Date(review.reviewDate).toLocaleDateString()}</td>
              <td className="action-icons">
                <span onClick={() => handleDelete(review.id!)} title="Delete">🗑️</span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
