// pages/api/RoleSection/[roleId].js
import https from 'https';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { roleId } = req.query;
  const agent = new https.Agent({ rejectUnauthorized: false }); // allow self-signed certs

  if (req.method === 'GET') {
    // Fetch role permissions
    const BACKEND_URL = `https://localhost:7177/api/RoleSection/GetRoleSections/${roleId}`;
    try {
      const response = await fetch(BACKEND_URL, { agent });
      if (!response.ok) {
        throw new Error(`Failed with status ${response.status}`);
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching role permissions:', error);
      res.status(500).json({ message: 'Failed to fetch role permissions', error: error.message });
    }
  } else if (req.method === 'PUT') {
    // Update role permissions
    const BACKEND_URL = `https://localhost:7177/api/RoleSection/UpdateRoleSection/${roleId}`;
    try {
      const response = await fetch(BACKEND_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
        agent,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error updating role permissions:', error);
      res.status(500).json({ message: 'Failed to update role permissions', error: error.message });
    }
  } else {
    // Method not allowed
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
