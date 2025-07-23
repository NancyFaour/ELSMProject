// /pages/api/WebRole.js
import https from 'https';
import fetch from 'node-fetch';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // Only use this in development
});

export default async function handler(req, res) {
  const BASE_URL = 'https://localhost:7177/api/WebRole';
  const { method, body, query } = req;

  try {
    let response;

    switch (method) {
      case 'GET':
        response = await fetch(`${BASE_URL}/list`, { agent: httpsAgent });  
        break;

      case 'POST':
        response = await fetch(`${BASE_URL}/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          agent: httpsAgent,
        });
        break;

      case 'PUT':
        response = await fetch(`${BASE_URL}/update/${query.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          agent: httpsAgent,
        });
        break;

      case 'DELETE':
        response = await fetch(`${BASE_URL}/delete/${query.id}`, {
          method: 'DELETE',
          agent: httpsAgent,
        });
        break;

      default:
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // ensure response is valid
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ message: errorText });
    }

    const data = await response.json();
    res.status(200).json(data); // always return in consistent format
  } catch (error) {
    console.error('API proxy error:', error);
    res.status(500).json({
      message: 'Internal Proxy Error',
      error: error.message,
    });
  }
}
