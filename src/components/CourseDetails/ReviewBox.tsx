'use client';

import { useState } from 'react';

export default function ReviewBox() {
  const [review, setReview] = useState({
    name: '',
    email: '',
    stars: 0,
    text: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReview(prev => ({ ...prev, [name]: value }));
  };

  const handleStars = (value: number) => {
    setReview(prev => ({ ...prev, stars: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Later: replace with your actual backend POST request
    console.log('Review submitted:', review);

    // Reset form or display thank you
    setSubmitted(true);
    setReview({ name: '', email: '', stars: 0, text: '' });
  };

  return (
    <div className="review-box">
      <h3>Leave a Review</h3>
      {submitted && <p className="thank-you">Thank you for your review!</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={review.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={review.email}
          onChange={handleChange}
          required
        />

        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={review.stars >= star ? 'filled' : ''}
              onClick={() => handleStars(star)}
              style={{ cursor: 'pointer', fontSize: '1.5rem', color: review.stars >= star ? '#FFD700' : '#ccc' }}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          name="text"
          placeholder="Write your review here..."
          value={review.text}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Review</button>
      </form>
      </div>
  );
}


