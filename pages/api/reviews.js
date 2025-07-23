// pages/api/reviews.js

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // DEV ONLY — for self-signed certs

const BASE_URL = 'https://localhost:7177/api/Reviews';

export default async function handler(req, res) {
  const { method, query } = req;

  try {
    if (method === 'GET') {
      const response = await fetch(`${BASE_URL}/GetAllReviews`);
      const data = await response.json();
      return res.status(200).json(data);
    }

    if (method === 'DELETE') {
      const id = query.id;
      const deleteUrl = `${BASE_URL}/${id}`;
      const deleteRes = await fetch(deleteUrl, { method: 'DELETE' });

      if (deleteRes.ok) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(deleteRes.status).json({ error: 'Delete failed' });
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Review API Error:', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
