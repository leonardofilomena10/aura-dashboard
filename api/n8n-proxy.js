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

  // Prepend https:// if protocol is missing
  let cleanUrl = n8nUrl.trim().replace(/\/$/, '');
  if (!/^https?:\/\//i.test(cleanUrl)) {
    cleanUrl = `https://${cleanUrl}`;
  }

  console.log(`[n8n-proxy] Forwarding workflow creation to: ${cleanUrl}/api/v1/workflows`);

  try {
    const response = await fetch(`${cleanUrl}/api/v1/workflows`, {
      method: 'POST',
      headers: {
        'X-N8N-API-KEY': apiKey.trim(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workflow),
    });

    const responseText = await response.text();
    let responseData;
    
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error('[n8n-proxy] Failed to parse n8n response as JSON:', responseText);
      return res.status(response.status).json({ 
        error: `n8n returned non-JSON response (status ${response.status})`,
        details: responseText.slice(0, 200)
      });
    }

    return res.status(response.status).json(responseData);

  } catch (error) {
    console.error('[n8n-proxy] Fetch error:', error);
    return res.status(500).json({ error: error.message });
  }
}
