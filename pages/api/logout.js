import https from 'https';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  const httpsAgent = new https.Agent({
    rejectUnauthorized: false, // Dev only
  });

  try {
    const backendUrl = 'https://localhost:7177/api/Notification/logout';

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      agent: httpsAgent,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Logout failed from backend:', data);
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Logout API error:', error);
    return res.status(500).json({ message: 'Logout error' });
  }
}
