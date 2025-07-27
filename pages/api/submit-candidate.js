import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    full_name,
    gender,
    age,
    city,
    skills,
    work_experience,
    phone_number
  } = req.body;

  if (!full_name || !gender || !city || !skills || !phone_number) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { data, error } = await supabase
    .from('candidates')
    .insert([
      {
        full_name,
        gender,
        age,
        city,
        skills,
        work_experience,
        phone_number
      }
    ]);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to insert data' });
  }

  return res.status(200).json({ message: 'Success', data });
}
