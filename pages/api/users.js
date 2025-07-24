process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default async function handler(req, res) {
  const BASE_URL = 'https://localhost:7177/api/User';

  try {
    let response, data;
    const { id } = req.query;

    switch (req.method) {
      case 'GET': {
        // Get all users or by id if provided
        const url = id ? `${BASE_URL}/${id}` : `${BASE_URL}/GetAllUsers`;
        response = await fetch(url);
        data = await response.json();
        return res.status(200).json(data);
      }

      case 'POST': {
        response = await fetch(`${BASE_URL}/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(req.body),
        });
        data = await response.json();
        return res.status(response.status).json(data);
      }

      case 'PUT': {
        if (!id) return res.status(400).json({ message: 'Missing user id for update' });
        response = await fetch(`${BASE_URL}/update/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(req.body),
        });
        data = await response.json();
        return res.status(response.status).json(data);
      }

      case 'DELETE': {
        if (!id) return res.status(400).json({ message: 'Missing user id for delete' });
        response = await fetch(`${BASE_URL}/delete/${id}`, {
          method: 'DELETE',
        });
        return res.status(response.status).end();
      }

      default:
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('User API Error:', error.message);
    return res.status(500).json({ error: error.message });
  }
}
