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
      <body>
        <Header />
        <div className={styles.layout}>
          {/* 왼쪽 메뉴 */}
          <nav className={styles.leftMenu}>
            <ul className={styles.menuList}>
              <li><Link href="/freetalk" className={styles.menuItem}>🫶🏻 자유 이야기방</Link></li>
              <li><Link href="/investment" className={styles.menuItem}>💸 투자 & 경제 정보</Link></li>
              <li><Link href="/immigrantlife" className={styles.menuItem}>🇺🇸 이민 생활</Link></li>
            </ul>
          </nav>

          {/* 오른쪽 본문 */}
          <main className={styles.mainContent}>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}