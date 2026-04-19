export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const apiKey = req.headers['x-api-key'] || '';
  if (!apiKey) {
    return res.status(400).json({ error: 'Missing x-api-key header' });
  }

  // Build the JobNimbus URL — strip 'path' from query params
  const queryParams = { ...req.query };
  const jnPath = queryParams.path || 'jobs';
  delete queryParams.path;
  const qs = new URLSearchParams(queryParams).toString();
  const url = `https://app.jobnimbus.com/api1/${jnPath}${qs ? '?' + qs : ''}`;

  try {
    const fetchOptions = {
      method: req.method,
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    // Attach body for POST/PUT — req.body is already parsed by Vercel
    if (req.method === 'POST' || req.method === 'PUT') {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const jnRes = await fetch(url, fetchOptions);
    const text = await jnRes.text();

    res.setHeader('Content-Type', 'application/json');
    return res.status(jnRes.status).send(text);
  } catch (err) {
    return res.status(500).json({ error: 'Proxy error: ' + err.message });
  }
}
