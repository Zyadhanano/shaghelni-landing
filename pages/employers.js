import Head from 'next/head'
import { useState } from 'react'

export default function Employers() {
  const [formData, setFormData] = useState({
    company_name: '',
    job_title: '',
    number_of_workers: '',
    contact_name: '',
    phone: '',
    email: '',
    notes: '',
  })

  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccess(false)

    const response = await fetch('/api/job-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      setSuccess(true)
      setFormData({
        company_name: '',
        job_title: '',
        number_of_workers: '',
        contact_name: '',
        phone: '',
        email: '',
        notes: '',
      })
    } else {
      alert('حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.')
    }
  }

  return (
    <div dir="rtl" className="font-sans bg-white text-gray-900">
      <Head>
        <title>شَغّلني - لأصحاب العمل</title>
      </Head>

      <section className="bg-gray-100 py-12 px-6">
        <h1 className="text-3xl font-bold text-center mb-6">هل تحتاج إلى عمّال أو موظفين؟</h1>
        <p className="text-center mb-8 text-lg">املأ هذا النموذج وسنتواصل معك لمساعدتك في إيجاد الأشخاص المناسبين.</p>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto text-right" dir="rtl">
          {success && (
            <div className="bg-green-100 text-green-800 p-4 rounded text-center">
              ✅ تم إرسال طلبك بنجاح!
            </div>
          )}
          <input type="text" name="company_name" placeholder="اسم الشركة" value={formData.company_name} onChange={handleChange} className="w-full p-3 border rounded" required />
          <input type="text" name="job_title" placeholder="المسمى الوظيفي" value={formData.job_title} onChange={handleChange} className="w-full p-3 border rounded" required />
          <input type="number" name="number_of_workers" placeholder="عدد الأشخاص المطلوبين" value={formData.number_of_workers} onChange={handleChange} className="w-full p-3 border rounded" required />
          <input type="text" name="contact_name" placeholder="اسم جهة التواصل" value={formData.contact_name} onChange={handleChange} className="w-full p-3 border rounded" required />
          <input type="tel" name="phone" placeholder="رقم الهاتف" value={formData.phone} onChange={handleChange} className="w-full p-3 border rounded" required />
          <input type="email" name="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded" required />
          <textarea name="notes" placeholder="ملاحظات إضافية" value={formData.notes} onChange={handleChange} className="w-full p-3 border rounded" rows="3"></textarea>
          <button type="submit" className="w-full bg-blue-700 text-white py-3 rounded hover:bg-blue-800 transition">
            أرسل الطلب الآن
          </button>
        </form>
      </section>

      <footer className="bg-gray-800 text-white text-center py-6 text-sm mt-12">
        منصة شَغّلني © 2025 – بريد: support@shaghelni.com
      </footer>
    </div>
  )
}
