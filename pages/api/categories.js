import axios from 'axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default async function handler(req, res) {
  const BASE_URL = 'https://localhost:7177/api/Courses';
  const { method } = req;

  try {
   if (method === 'GET') {
  const response = await axios.get(`${BASE_URL}/GetCategoriesWithCount`);
  const data = response.data;

  if (!data) {
    return res.status(404).json({ error: 'No categories found' });
  }

  return res.status(200).json(data); 


    } else if (method === 'POST') {
      const response = await axios.post(`${BASE_URL}/AddCategories`, req.body, {
        headers: { 'Content-Type': 'application/json' },
      });

      return res.status(201).json(response.data);

    } else if (method === 'PUT') {
      const response = await axios.put(`${BASE_URL}/UpdateCategory`, req.body, {
        headers: { 'Content-Type': 'application/json' },
      });

      return res.status(200).json(response.data);

    } else if (method === 'DELETE') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'Missing category ID' });

      await axios.delete(`${BASE_URL}/DeleteCategory/${id}`);
      return res.status(200).json({ message: 'Category deleted successfully' });

    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Category API Error:', error.response?.data || error.message);
    return res.status(500).json({
      error: error.message || 'Internal Server Error',
      details: error.response?.data
    });
  }
}
