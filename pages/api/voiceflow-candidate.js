import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { full_name, gender, age, city, skills, experience, contact_number } = req.body;

  if (!full_name || !city || !skills || !contact_number) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { data, error } = await supabase.from('candidates').insert([
    {
      full_name,
      gender,
      age,
      city,
      skills,
      experience,
      contact_number,
    },
  ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ message: 'Candidate inserted successfully', data });
}
