import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({
  company_name: '',
  contact_name: '',
  phone: '',
  email: '',
})

  const [showModal, setShowModal] = useState(false)
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

  const { company_name, contact_name, phone, email } = formData
  if (!company_name || !contact_name || !phone || !email) {
    alert('يرجى تعبئة جميع الحقول المطلوبة')
    return
  }

  const response = await fetch('/api/job-request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })

  if (response.ok) {
    setSuccess(true)
    setFormData({
      company_name: '',
      contact_name: '',
      phone: '',
      email: '',
    })
  } else {
    alert('حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.')
  }
}

  return (
    <div dir="rtl" className="font-sans bg-white text-gray-900">
     <Head>
  <title>شَغّلني - منصة فرص العمل في سوريا</title>
  <link rel="icon" href="/favicon.ico" />
</Head>


     <section className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center px-6 py-12 space-y-6">
  <h1 className="text-3xl md:text-4xl font-bold max-w-2xl leading-relaxed">
    الطريقة الجديدة لتوظيف عمّال سوريا
  </h1>
  <p className="text-lg max-w-xl text-gray-700">
    شَغّلني منصة بسيطة بتربط أصحاب الشغل مع العمّال الجاهزين من سوريا — بدون سيرة ذاتية، بدون تسجيل دخول.
  </p>
  <div className="flex flex-col md:flex-row gap-4">
    <a
      href="https://wa.me/WHATSAPPNUMBER" // replace when ready
      className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 text-lg font-semibold"
    >
      بدي اشتغل
    </a>
    <button
  onClick={() => setShowModal(true)}
  className="bg-blue-700 text-white px-8 py-3 rounded-full hover:bg-blue-800 text-lg font-semibold"
>
  بدي وظّف
</button>
  </div>
</section>
        
<section className="bg-white py-12 px-6 text-center">
  <h2 className="text-2xl font-bold mb-4">بدي اشتغل!</h2>
  <p className="text-lg text-gray-700 mb-6 max-w-xl mx-auto">
    شَغّلني هي خدمة مجانية لكل حدا عم يدوّر على شغل بسوريا. لا حاجة لسيرة ذاتية أو إجراءات مطولة بس بتبعتلنا رسالة على واتساب وبنكمل سوا.
  </p>
  <a
    href="https://wa.me/WHATSAPPNUMBER" // replace with your number
    className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition text-lg font-semibold"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className="w-6 h-6"
    >
      <path d="M20.52 3.48A11.88 11.88 0 0012 0C5.38 0 .01 5.36 0 11.97a11.9 11.9 0 001.65 6.03L0 24l6.24-1.63a11.94 11.94 0 005.73 1.46h.01c6.62 0 12-5.37 12-12a11.89 11.89 0 00-3.46-8.35zM12 21.52h-.01a9.54 9.54 0 01-4.86-1.3l-.35-.21-3.7.97.99-3.61-.23-.37A9.46 9.46 0 012.4 12c0-5.26 4.29-9.54 9.6-9.54s9.6 4.28 9.6 9.54c0 5.26-4.29 9.54-9.6 9.54zm5.28-7.2c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.9 1.13-.17.19-.33.21-.61.07-.29-.15-1.23-.45-2.34-1.45-.86-.77-1.44-1.73-1.61-2.02-.17-.29-.02-.44.13-.58.13-.13.29-.33.43-.49.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.88-2.11-.23-.55-.46-.47-.64-.48-.17-.01-.36-.01-.55-.01s-.51.07-.78.36c-.26.29-1 1-1 2.42 0 1.42 1.02 2.8 1.16 2.99.14.19 2.01 3.06 4.87 4.29.68.29 1.21.46 1.63.58.68.22 1.3.19 1.79.12.55-.08 1.7-.7 1.94-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34z" />
    </svg>
    احكي معنا
  </a>
</section>
<section className="bg-white py-16 px-6 text-center">
  <h2 className="text-2xl font-bold mb-8">كيف شَغّلني بتساعدك تلاقي شغل؟</h2>
  <div className="max-w-2xl mx-auto space-y-6 text-right text-lg leading-relaxed">
    <div className="flex items-start gap-3">
      <span className="material-icons text-green-600 text-2xl">chat_bubble_outline</span>
      <p className="m-0">احكي معنا على واتساب</p>
    </div>
    <div className="flex items-start gap-3">
      <span className="material-icons text-green-600 text-2xl">assignment_turned_in</span>
      <p className="m-0">جاوب على كم سؤال بسيط</p>
    </div>
    <div className="flex items-start gap-3">
      <span className="material-icons text-green-600 text-2xl">storage</span>
      <p className="m-0">منفوت معلوماتك على قاعدة البيانات</p>
    </div>
    <div className="flex items-start gap-3">
      <span className="material-icons text-green-600 text-2xl">emoji_people</span>
      <p className="m-0">منوصلك بفرص شغل مناسبة</p>
    </div>
  </div>
</section>
  <section className="bg-gray-50 py-16 px-6 text-center">
  <h2 className="text-2xl font-bold mb-8">ليش ‏الشركات و أصحاب الشغل عم يختاروا شَغّلني؟</h2>

  <div className="max-w-2xl mx-auto space-y-6 text-right text-lg leading-relaxed">
    <div className="flex items-start gap-3">
      <span className="material-icons text-green-600 text-2xl">groups</span>
      <p className="m-0">تواصل مع موظفين وعمال ما عم تقدر توصل لهم اليوم</p>
    </div>
    <div className="flex items-start gap-3">
      <span className="material-icons text-green-600 text-2xl">access_time_filled</span>
      <p className="m-0">وَفّر وقتك — ما في حاجة لمراجعة مئات الطلبات أو متابعة ناس ما بترد أو مالها جاهزة</p>
    </div>
    <div className="flex items-start gap-3">
      <span className="material-icons text-green-600 text-2xl">account_box</span>
      <p className="m-0">الموظفين والعمال بيشتغلوا عندك بشكل مباشر ونحنا ما بنطلب منك تدفعنا لَبَعد ما يبدأ العمل و نضمن من النتائج</p>
    </div>
  </div>

  <div className="mt-10">
    <button
  onClick={() => setShowModal(true)}
  className="bg-blue-700 text-white px-8 py-3 rounded-full hover:bg-blue-800 text-lg font-semibold"
>
  بدي وظّف
</button>
  </div>
</section>

<section className="bg-white py-16 px-6 text-center">
  <h2 className="text-2xl font-bold mb-12">كيف شَغّلني بيساعد أصحاب الشغل؟</h2>

  <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-4 text-right text-lg leading-relaxed">
    <div className="bg-gray-50 p-6 rounded-xl shadow-md flex flex-col items-start">
      <div className="text-4xl font-bold text-blue-700 mb-3">١</div>
      <h3 className="font-bold text-xl mb-2">نزّل فرصة شغل (بأقل من دقيقة)</h3>
      <p>عبّي نموذج بسيط بتشرح فيه شو بدك.</p>
    </div>
    <div className="bg-gray-50 p-6 rounded-xl shadow-md flex flex-col items-start">
      <div className="text-4xl font-bold text-blue-700 mb-3">٢</div>
      <h3 className="font-bold text-xl mb-2">منبعتلك مرشّحين موثوقين</h3>
      <p>‏نحنا بنجري مقابلات مع المتقدمين و نتأكد انه عندهم سلوك ممتاز، وانهم مهتمين بفرصة العمل و يطابقوا المواصفات ياللي طلبتها</p>
    </div>
    <div className="bg-gray-50 p-6 rounded-xl shadow-md flex flex-col items-start">
      <div className="text-4xl font-bold text-blue-700 mb-3">٣</div>
      <h3 className="font-bold text-xl mb-2">إ تختار مين بدك تقابل</h3>
      <p>‏نحنا منسق مواعيد المقابلات الأخيرة لكي تتأكد وتختار بين المرشحين</p>
    </div>
    <div className="bg-gray-50 p-6 rounded-xl shadow-md flex flex-col items-start">
      <div className="text-4xl font-bold text-blue-700 mb-3">٤</div>
      <h3 className="font-bold text-xl mb-2">بتعمل مقابلة أخيرة وبتوظّف</h3>
      <p>وهيك بتعطي فرص حقيقية لناس جدّيين وعم يشتغلوا ليبنوا حياة أفضل</p>
    </div>
  </div>
</section>

<section className="bg-white py-12 px-6 text-right">
  <div className="max-w-2xl mx-auto space-y-6 text-lg">
    <p>سوريا عم ترجع تعمّر، وفرص الشغل عم تكبر بكل القطاعات – من المرافئ والإنشاءات، للطاقة والمطاعم. شَغّلني ‏موجودة لتساعدك تكون جزء من هالفرص.</p>
    <p>منصتنا بتوصلك مع الشركات الحقيقية يلي بحاجة لناس متلك – ومن دون سير ذاتية ولا تعقيدات.</p>
    <div className="mt-6 text-center">
      <a
        href="https://wa.me/whatsapplink" // ← replace with your actual WhatsApp link
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
      >
        ابعتلنا هلق عالواتساب
      </a>
    </div>
  </div>
</section>

      <footer className="bg-gray-800 text-white text-center py-6 text-sm">
        منصة شَغّلني © 2025 – بريد: support@shaghelni.com
      </footer>
          {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative text-right">
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-2 left-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      <p className="mb-6 text-gray-700 leading-relaxed text-right">
  <strong className="text-xl">سجّل معنا لإستشارة مجانية</strong><br />
  اترك معلوماتك، وخبير من فريقنا بيتواصل معك ليفهم احتياجاتك<br />
</p>

      <form onSubmit={handleSubmit} className="space-y-4">
{success && (
  <div className="bg-green-100 text-green-800 p-4 rounded text-center">
    ✅ شكراً! تم استلام معلوماتك وسنتواصل معك قريباً.
  </div>
)}          
  
        <input
          type="text"
          name="company_name"
          placeholder="اسم الشركة"
          value={formData.company_name}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="text"
          name="contact_name"
          placeholder="الاسم الكامل"
          value={formData.contact_name}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="رقم الهاتف"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="البريد الإلكتروني"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-3 rounded hover:bg-blue-800 transition"
        >
          أرسل الطلب الآن
        </button>
      </form>
    </div>
  </div>
)}

    </div>
  )
}
