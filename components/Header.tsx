import Image from 'next/image'
import Link from 'next/link'
import './header.css' // 👈 스타일 따로 분리

export default function Header() {
  return (
    <header className="custom-header">
      <Link href="/" className="logo-link">
        <Image src="/logo.png" alt="Logo" width={250} height={250} />
      </Link>
      <div className="header-text">
        <h1>당신의 삶, 우리의 이야기 – <span className="highlight">Klife.AI</span></h1>
        <h2>한인을 위한 새로운 지식과 연결의 공간,</h2>
        <h2>그리고 AI가 함께하는 따뜻한 동행.</h2>
      </div>
    </header>
  )
}
