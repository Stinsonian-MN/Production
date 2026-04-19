export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { path = 'jobs', ...params } = req.query;
  const apiKey = req.headers['x-api-key'] || '';

  const qs = new URLSearchParams(params).toString();
  const url = `https://app.jobnimbus.com/api1/${path}${qs ? '?' + qs : ''}`;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
