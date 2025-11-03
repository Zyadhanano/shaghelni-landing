import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function verifyAuth(req: NextApiRequest) {
  const hdr = req.headers["x-intake-secret"];
  return hdr === process.env.INTAKE_SHARED_SECRET;
}

function toCandidate(p: any) {
  return {
    user_name:        p.user_name ?? p.name ?? null,
    user_gender:      p.user_gender ?? p.gender ?? null,
    user_phone:       p.user_phone ?? p.phone ?? null,
    user_experience:  p.user_experience ?? p.experience ?? null,
    user_job_type:    Array.isArray(p.user_job_type) ? p.user_job_type.join(", ") : (p.user_job_type ?? null),
    user_location:    typeof p.user_location === "object"
                        ? [p.user_location?.governorate, p.user_location?.city, p.user_location?.area].filter(Boolean).join(" - ")
                        : (p.user_location ?? null),
    user_availability: p.user_availability ?? null,
    user_relocate:     typeof p.user_relocate === "boolean" ? p.user_relocate : null,
    user_salary:       p.user_salary ?? null,
    user_notes:        p.user_notes ?? p.notes ?? null
  };
}

function toRequisition(p: any) {
  return {
    job_id:         p.job_id ?? p.case_id ?? null,
    company_name:   p.company_name ?? (p.company?.name ?? null),
    contact_name:   p.contact_name ?? (p.contact?.person_name ?? p.contact?.name ?? null),
    contact_phone:  p.contact_phone ?? p.contact?.phone ?? null,
    contact_email:  p.contact_email ?? p.contact?.email ?? null
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    if (!verifyAuth(req)) return res.status(401).json({ error: "Unauthorized" });

    const p = typeof req.body === "object" ? req.body : JSON.parse(req.body || "{}");

    const isEmployer = (p.record_type === "employer_requisition") || !!p.company_name || !!p.company;
    if (isEmployer) {
      const row = toRequisition(p);
      if (!row.company_name || !row.contact_phone) {
        return res.status(400).json({ error: "Missing required fields (company_name, contact_phone)" });
      }
      const { error } = await supabase.from("11L_job_requisitions").insert(row);
      if (error) throw error;
      return res.status(200).json({ ok: true, inserted: "employer_requisition" });
    }

    const row = toCandidate(p);
    if (!row.user_name || !row.user_phone) {
      return res.status(400).json({ error: "Missing required fields (user_name, user_phone)" });
    }
    const { error } = await supabase.from("11L_candidates").insert(row);
    if (error) throw error;
    return res.status(200).json({ ok: true, inserted: "candidate" });
  } catch (e: any) {
    console.error("INTAKE ERROR:", e?.message || e);
    return res.status(500).json({ error: "Server error", detail: String(e?.message || e) });
  }
}
