import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <Head>
        <title>KLife 커뮤니티</title>
      </Head>

      <main className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">KLife 커뮤니티</h1>

        <section className="bg-blue-50 p-4 rounded-xl mb-6">
          <h2 className="text-lg font-semibold">공지사항</h2>
          <p className="text-sm text-gray-700 mt-1">새로운 소식을 전해드립니다.</p>
        </section>

        <div className="space-y-4">
          <Link href="/board" className="block bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            게시판
          </Link>
          <Link href="/about" className="block bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            소개 페이지
          </Link>
        </div>
      </main>

      <footer className="text-sm text-gray-500 mt-6">
        &copy; 2025 KLife
      </footer>
    </div>
  );
}
