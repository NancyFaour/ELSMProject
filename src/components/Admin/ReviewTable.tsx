'use client';

type Review = {
  id: number;
  courseId: number;
  name: string;
  email: string;
  reviewComment: string;
  starsOfTheReview: number;
  reviewDate: string;
};

type Props = {
  data: Review[];
};

export default function ReviewTable({ data }: Props) {
  const handleDelete = (id: number) => {
    console.log('Delete review', id);
    // Later: show confirm and call delete API
  };

  return (
    <table className="review-table">
      <thead>
        <tr>
          <th>ID</th>
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
            <td colSpan={8}>No reviews found.</td>
          </tr>
        ) : (
          data.map((review) => (
            <tr key={review.id}>
              <td>{review.id}</td>
              <td>{review.courseId}</td>
              <td>{review.name}</td>
              <td>{review.email}</td>
              <td>{review.reviewComment}</td>
              <td>{review.starsOfTheReview} ⭐</td>
              <td>{new Date(review.reviewDate).toLocaleDateString()}</td>
              <td className="action-icons">
                <span onClick={() => handleDelete(review.id)} title="Delete">🗑️</span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
