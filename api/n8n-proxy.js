/**
 * Vercel Serverless Function — n8n API Proxy
 * Bypasses CORS by making the n8n API call from the server side.
 * The browser calls /api/n8n-proxy (same origin = no CORS),
 * and this function forwards the request to the n8n Railway instance.
 */
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { n8nUrl, apiKey, workflow } = req.body;

  // Validate required fields
  if (!n8nUrl || !apiKey || !workflow) {
    return res.status(400).json({ error: 'Missing required fields: n8nUrl, apiKey, workflow' });
  }

  const cleanUrl = n8nUrl.replace(/\/$/, '');

  try {
    const response = await fetch(`${cleanUrl}/api/v1/workflows`, {
      method: 'POST',
      headers: {
        'X-N8N-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workflow),
    });

    const data = await response.json();
    return res.status(response.status).json(data);

  } catch (error) {
    console.error('[n8n-proxy] Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
