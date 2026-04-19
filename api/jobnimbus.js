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

  const { path = 'jobs', ...params } = req.query;
  delete params.path;
  const qs = new URLSearchParams(params).toString();
  const url = `https://app.jobnimbus.com/api1/${path}${qs ? '?' + qs : ''}`;

  try {
    const jnRes = await fetch(url, {
      method: req.method,
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      ...(req.method !== 'GET' && req.body ? { body: JSON.stringify(req.body) } : {}),
    });

    const text = await jnRes.text();
    res.setHeader('Content-Type', 'application/json');
    return res.status(jnRes.status).send(text);
  } catch (err) {
    return res.status(500).json({ error: 'Proxy error: ' + err.message });
  }
}
