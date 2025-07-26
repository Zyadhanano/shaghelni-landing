export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  const {
    company_name,
    job_title,
    number_of_workers,
    contact_name,
    phone,
    email,
    notes
  } = req.body;

  const SUPABASE_URL = 'https://ddoldpwzzfqwzojaubep.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkb2xkcHd6emZxd3pvamF1YmVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0OTk5NzQsImV4cCI6MjA2OTA3NTk3NH0.H915nQ8HSqyDf1cXdmw-0n0yHxGQ_JfWYqxkbUkylLs';

  const response = await fetch(`${SUPABASE_URL}/rest/v1/job_requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({
      company_name,
      job_title,
      number_of_workers: parseInt(number_of_workers),
      contact_name,
      phone,
      email,
      notes
    })
  });

  const data = await response.json();

  if (!response.ok) {
    return res.status(500).json({ error: 'Failed to save to Supabase', details: data });
  }

  return res.status(200).json({ message: 'Success', data });
}
