import Link from 'next/link'

export default function GlobalNotFound() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold text-red-600">
        صفحه مورد نظر در داشبورد یافت نشد!
      </h2>
      <p className="mt-2 text-gray-600">
        آدرسی که وارد کرده‌اید در بخش مدیریت وجود ندارد.
      </p>

      <Link
        href="/"
        className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        بازگشت به داشبورد
      </Link>
    </div>
  )
}
