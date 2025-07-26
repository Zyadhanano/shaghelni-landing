import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
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
      headers: { 'Content-Type': 'application/json' },
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
        <title>شَغّلني - منصة فرص العمل في سوريا</title>
      </Head>

      <section className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center p-6">
  <h1 className="text-4xl font-bold mb-4">‏عم بتدور على شغل ؟ نحنا هون لنساعدك</h1>
<p className="text-lg mb-6 max-w-xl">
  شَغّلني هي خدمة مجانية  لكل حدا عم يدوّر على شغل بسوريا. لا حاجة لسيرة ذاتية أو إجراءات مطولة بس بتبعتلنا رسالة على واتساب وبنكمل سوا.
  <br /><br />
  منصتنا بتدعمك وبتوصلك مع فرص حقيقية في المطاعم والفنادق وشركات التنظيف والنقل والإنشاءات، وحتى المشاريع الكبيرة المعلن عنها من موانئ وبناء وطاقة وغيرها.
</p>
  <a
    href="https://wa.me/WHATSAPPNUMBER" // replace with actual number later
    className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition text-lg font-semibold"
  >
    بلّش معنا على واتساب
  </a>
  <div className="mt-4">
    <a
      href="/employers"
      className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition"
    >
      لأصحاب العمل
    </a>
  </div>
</section>

      <section className="bg-white py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-6">كيف تعمل شَغّلني؟</h2>
        <ul className="max-w-2xl mx-auto space-y-4 text-right text-lg">
          <li>1. تحدث معنا على واتساب باللهجة السورية</li>
          <li>2. جاوب على شوية أسئلة بسيطة (اسمك، مهاراتك، وين ساكن، شو بتعرف تشتغل)</li>
          <li>3. منخزن معلوماتك بقاعدة بيانات</li>
          <li>4. بس يطلب صاحب شغل شخص عنده نفس مهاراتك، منتواصل معك مباشرة</li>
        </ul>
      </section>

      <section className="bg-gray-100 py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-6">هل تحتاج إلى عمّال أو موظفين؟</h2>
        <p className="text-center mb-8">نحن نوصلك مباشرةً مع الأشخاص المناسبين.</p>
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

      <footer className="bg-gray-800 text-white text-center py-6 text-sm">
        منصة شَغّلني © 2025 – بريد: support@shaghelni.com
      </footer>
    </div>
  )
}
