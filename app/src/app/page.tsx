import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Screen-to-Screen</h1>
      <p style={{ color: '#6b7280', fontSize: 13, margin: 0 }}>
        screen-features.json 기반 WDS 와이어프레임
      </p>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
        <Link
          href="/discover"
          style={{
            display: 'block',
            padding: '14px 16px',
            borderRadius: 12,
            background: '#111827',
            color: '#fff',
            textDecoration: 'none',
            fontSize: 14,
          }}
        >
          발견 · case1 비로그인 (MAIN) · 10 specs
        </Link>
        <Link
          href="/product"
          style={{
            display: 'block',
            padding: '14px 16px',
            borderRadius: 12,
            background: '#111827',
            color: '#fff',
            textDecoration: 'none',
            fontSize: 14,
          }}
        >
          상품상세 · case1 단독상품 (PRDD) · 16 specs
        </Link>
      </nav>
    </main>
  );
}
