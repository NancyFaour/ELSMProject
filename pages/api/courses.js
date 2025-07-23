// pages/api/courses.js
// pages/api/courses.js
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Dev-only fix

export default async function handler(req, res) {
  const BASE_URL = 'https://localhost:7177/api/Courses';

  try {
    if (req.method === 'GET') {
      const { loadCategories } = req.query;

      // If ?loadCategories=true is passed
      if (loadCategories === 'true') {
        const response = await fetch(`${BASE_URL}/loadcategories`);
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`GET categories failed: ${response.status} - ${text}`);
        }
        const categories = await response.json();
        return res.status(200).json(categories);
      }

      // Otherwise, return all courses
      const response = await fetch(`${BASE_URL}/AllCourses`);
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`GET courses failed: ${response.status} - ${text}`);
      }
      const data = await response.json();
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const response = await fetch(`${BASE_URL}/AddCourses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`POST failed: ${response.status} - ${text}`);
      }

      const data = await response.json();
      return res.status(response.status).json(data);
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    console.error('Courses API error:', error.message);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
