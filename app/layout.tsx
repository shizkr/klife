import Link from 'next/link'
import '../styles/globals.css'
import styles from '../styles/main.module.css'
import Header from '../components/Header'

export const metadata = {
  title: 'kLife',
  description: '한인 커뮤니티 플랫폼',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col">
        
        {/* ✅ 상단 고정 헤더 */}
        <Header />

        {/* ✅ 아래쪽: 왼쪽 메뉴 + 콘텐츠 */}
        <div className="flex flex-1">
          {/* 왼쪽 사이드바 */}
          <aside className={styles.sidebar}>
              <ul className="text-sm">
    {/* ✅ 메인/기본 메뉴 */}
    <li><Link href="/" className="text-blue-700 hover:underline"> 🏠 홈</Link></li>
    <li><Link href="/boards" className="block pl-8 text-blue-700 hover:underline">   🔍 전체 게시판 보기</Link></li>
    <li><Link href="/notice" className="block pl-8 text-blue-700 hover:underline">📰 공지사항</Link></li>
    <li><Link href="/events" className="block pl-8 text-blue-700 hover:underline">📢 이벤트</Link></li>


    {/* ✅ 커뮤니티 메뉴 */}
    <li><Link href="/free" className="block pl-8 text-blue-700 hover:underline">💬         자유게시판</Link></li>
    <li><Link href="/new" className="block pl-8 text-blue-700 hover:underline">🙋 새로 온 이웃</Link></li>
    <li><Link href="/friends" className="block pl-8 text-blue-700 hover:underline">🤝 친구 찾기</Link></li>
    <li><Link href="/tips" className="block pl-8 text-blue-700 hover:underline">💡 꿀팁 공유</Link></li>
    <li><Link href="/gallery" className="block pl-8 text-blue-700 hover:underline">📸 사진 갤러리</Link></li>

    {/* ✅ 생활 정보 / 비즈니스 */}
    <li><Link href="/real-estate" className="block pl-8 text-blue-700 hover:underline">🏡 렌트 / 부동산</Link></li>
    <li><Link href="/cars" className="block pl-8 text-blue-700 hover:underline">🚗 중고차 거래</Link></li>
    <li><Link href="/jobs" className="block pl-8 text-blue-700 hover:underline">💼 구인 / 구직</Link></li>
    <li><Link href="/directory" className="block pl-8 text-blue-700 hover:underline">🍱 한인업소록</Link></li>
    <li><Link href="/finance" className="block pl-8 text-blue-700 hover:underline">🏦 금융 / 보험 정보</Link></li>

    {/* ✅ 지식/학습/문화 */}
    <li><Link href="/english" className="block pl-8 text-blue-700 hover:underline">🇺🇸 영어 공부</Link></li>
    <li><Link href="/korean" className="block pl-8 text-blue-700 hover:underline">🇰🇷 한국어 공부</Link></li>
    <li><Link href="/education" className="block pl-8 text-blue-700 hover:underline">🎓 유학/교육 정보</Link></li>
    <li><Link href="/culture" className="block pl-8 text-blue-700 hover:underline">🎭   문화생활</Link></li>

    {/* ✅ 건강 / 가족 / 나눔 */}
    <li><Link href="/health" className="block pl-8 text-blue-700 hover:underline">🧑‍⚕️ 건강 정보</Link></li>
    <li><Link href="/parenting" className="block pl-8 text-blue-700 hover:underline">🧒 육아 / 교육</Link></li>
    <li><Link href="/seniors" className="block pl-8 text-blue-700 hover:underline">👵 시니어 모임</Link></li>
    <li><Link href="/volunteer" className="block pl-8 text-blue-700 hover:underline">❤️ 나눔 / 봉사</Link></li>

    {/* ✅ 사용자 메뉴 */}
    <li><Link href="/profile" className="block pl-8 text-blue-700 hover:underline">👤 내 프로필</Link></li>
    <li><Link href="/my-posts" className="block pl-8 text-blue-700 hover:underline">✏️ 내 글 관리</Link></li>
    <li><Link href="/favorites" className="block pl-8 text-blue-700 hover:underline">⭐ 즐겨찾기</Link></li>
    <li><Link href="/logout" className="block pl-8 text-blue-700 hover:underline">🚪 로그아웃</Link></li>

              </ul>
          </aside>
          {/* 메인 콘텐츠 */}
          <main className="flex-1 flex items-center justify-center p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
