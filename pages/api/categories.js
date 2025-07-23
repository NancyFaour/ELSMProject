// pages/api/categories.js
import fetch from 'node-fetch'; // Ensure you have node-fetch installed
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
export default async function handler(req, res) {
  const BASE_URL = 'https://localhost:7177/api/Courses';
  const { method } = req;

  try {
    if (method === 'GET') {
      const response = await fetch(`${BASE_URL}/GetCategoriesWithCount`);
      const text = await response.text();

      // Try to parse JSON
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('Invalid JSON:', text);
        return res.status(500).json({ error: 'Invalid JSON response from backend', raw: text });
      }

      return res.status(200).json(data);
    } else if (method === 'POST') {
      // Add a new category
      const body = req.body;
      const response = await fetch(`${BASE_URL}/AddCategories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error('Failed to add category');
      const data = await response.json();
      return res.status(201).json(data);

    } else if (method === 'PUT') {
      // Update an existing category
      const body = req.body;
      const response = await fetch(`${BASE_URL}/UpdateCategory`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error('Failed to update category');
      const data = await response.json();
      return res.status(200).json(data);

    } else if (method === 'DELETE') {
      // Delete a category by ID (passed via query)
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'Missing category ID' });

      const response = await fetch(`${BASE_URL}/DeleteCategory/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete category');
      return res.status(200).json({ message: 'Category deleted successfully' });

    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Category API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
