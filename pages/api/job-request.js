// pages/api/job-request.js

import { Resend } from 'resend'

const resend = new Resend('re_9eYLYPFD_KcrmdGd9rC2nde43Eux5crg8')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' })
  }

  const { company_name, contact_name, phone, email } = req.body

  const SUPABASE_URL = 'https://ddoldpwzzfqwzojaubep.supabase.co'
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkb2xkcHd6emZxd3pvamF1YmVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0OTk5NzQsImV4cCI6MjA2OTA3NTk3NH0.H915nQ8HSqyDf1cXdmw-0n0yHxGQ_JfWYqxkbUkylLs'

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
      contact_name,
      phone,
      email
    })
  })

  const data = await response.json()

  if (!response.ok) {
    return res.status(500).json({ error: 'Failed to save to Supabase', details: data })
  }

  // ✅ Send email to admin
  await resend.emails.send({
    from: 'Shaghelni <onboarding@resend.dev>',
    to: 'support@shaghelni.com', // change this to your actual email if needed
    subject: '📥 New Employer Job Request',
    html: `
      <h2>New Job Request Received</h2>
      <p><strong>Company Name:</strong> ${company_name}</p>
      <p><strong>Contact Name:</strong> ${contact_name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
    `
  })

  return res.status(200).json({ message: 'Success', data })
}
