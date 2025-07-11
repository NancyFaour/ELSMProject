import https from 'https';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const httpsAgent = new https.Agent({
    rejectUnauthorized: false, 
  });

  try {
    const backendUrl = 'https://localhost:7177/api/Notification/login';

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
      agent: httpsAgent,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Backend login error:', data);
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('Login API error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
