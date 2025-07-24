import fetch from 'node-fetch';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default async function handler(req, res) {
  const BASE_URL = 'https://localhost:7177/api/Session';
  const { method, query, body } = req;
  const { videos, sessionId, videoId } = query;

  try {
    // 🔸 Video-related operations
    if (videos === 'true') {
      if (method === 'GET') {
        // Get all videos for a session
        if (!sessionId) return res.status(400).json({ error: 'Missing sessionId for getting videos' });

        const response = await fetch(`${BASE_URL}/${sessionId}/videos`);
        const data = await response.json();
        return res.status(200).json(data);

      } else if (method === 'POST') {
        // Add new video to session
        if (!sessionId) return res.status(400).json({ error: 'Missing sessionId for adding video' });

        const response = await fetch(`${BASE_URL}/${sessionId}/videos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (!response.ok) throw new Error(await response.text());

        const data = await response.json();
        return res.status(201).json(data);

      } else if (method === 'DELETE') {
        // Delete video by ID
        if (!videoId) return res.status(400).json({ error: 'Missing videoId for deletion' });

        const response = await fetch(`${BASE_URL}/videos/${videoId}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error(await response.text());

        return res.status(200).json({ message: 'Video deleted successfully' });
      }

      return res.status(405).json({ error: 'Video operation method not allowed' });
    }

    // 🔹 Session-related operations
    if (method === 'GET') {
      const response = await fetch(`${BASE_URL}/GetSessionAndVideos`);
      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error('Invalid JSON:', text);
        return res.status(500).json({ error: 'Invalid JSON response from backend', raw: text });
      }

      return res.status(200).json(data);

    } else if (method === 'POST') {
      const response = await fetch(`${BASE_URL}/AddSession`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      return res.status(201).json(data);

    } else if (method === 'PUT') {
      const { id } = query;
      if (!id) return res.status(400).json({ error: 'Missing session ID for update' });

      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      return res.status(200).json(data);

    } else if (method === 'DELETE') {
      const { id } = query;
      if (!id) return res.status(400).json({ error: 'Missing session ID for delete' });

      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error(await response.text());

      return res.status(200).json({ message: 'Session deleted successfully' });

    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Session API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
