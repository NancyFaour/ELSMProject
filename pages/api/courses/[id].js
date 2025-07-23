process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default async function handler(req, res) {
  const { id } = req.query;
  const BASE_URL = `https://localhost:7177/api/Courses`;

  try {
    if (req.method === 'GET') {
      const response = await fetch(`${BASE_URL}/GetCourseById/${id}`);

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`GET failed: ${response.status} - ${text}`);
      }

      const data = await response.json();
      return res.status(200).json(data);
    }

    if (req.method === 'PUT') {
    const response = await fetch(`https://localhost:7177/api/Courses/UpdateCourses`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(req.body),
});


      if (!response.ok) {
        const text = await response.text();
        throw new Error(`PUT failed: ${response.status} - ${text}`);
      }

      const data = await response.json();
      return res.status(response.status).json(data);
    }

    if (req.method === 'DELETE') {
      const response = await fetch(`${BASE_URL}/DeleteCourses/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`DELETE failed: ${response.status} - ${text}`);
      }

      const result = await response.json();
      return res.status(response.status).json(result);
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    console.error(`Course API error (id: ${id}):`, error.message);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
