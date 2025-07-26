import Head from 'next/head'

export default function Home() {
  return (
    <div dir="rtl" className="font-sans bg-white text-gray-900">
      <Head>
        <title>شَغّلني - منصة فرص العمل في سوريا</title>
      </Head>

      <section className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center p-6">
        <h1 className="text-4xl font-bold mb-4">وظائف حقيقية. ناس حقيقية. فرص حقيقية.</h1>
        <p className="text-lg mb-6 max-w-xl">
          منصة شَغّلني بتوصلك مباشرةً مع فرص العمل المتوفرة <strong>في سوريا</strong> من خلال واتساب – بدون تطبيقات، بدون تسجيل معقد.
        </p>
        <a
          href="#"
          className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
        >
          ابدأ المحادثة على واتساب
        </a>
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
        <form className="max-w-xl mx-auto space-y-4" method="POST" action="/api/job-request">
          <input type="text" name="company_name" placeholder="اسم الشركة" className="w-full p-3 border rounded" required />
          <input type="text" name="job_title" placeholder="المسمى الوظيفي" className="w-full p-3 border rounded" required />
          <input type="number" name="number_of_workers" placeholder="عدد الأشخاص المطلوبين" className="w-full p-3 border rounded" required />
          <input type="text" name="contact_name" placeholder="اسم جهة التواصل" className="w-full p-3 border rounded" required />
          <input type="tel" name="phone" placeholder="رقم الهاتف" className="w-full p-3 border rounded" required />
          <input type="email" name="email" placeholder="البريد الإلكتروني" className="w-full p-3 border rounded" required />
          <textarea name="notes" placeholder="ملاحظات إضافية" className="w-full p-3 border rounded" rows="3"></textarea>
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