import Link from "next/link";

const SCREENS = [
	{ id: "home-benefit", label: "혜택" },
	{ id: "home-manage", label: "관리" },
	{ id: "home-device-change", label: "단말 변경" },
	{ id: "home-senior", label: "시니어" },
	{ id: "home-guest", label: "비로그인" },
	{ id: "product-detail", label: "상품 상세" },
	{ id: "search-result", label: "검색 결과" },
] as const;

export default function Home() {
	return (
		<main
			style={{
				padding: 24,
				display: "flex",
				flexDirection: "column",
				gap: 16,
			}}
		>
			<div>
				<h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>
					Screen-to-Screen · app2
				</h1>
				<p
					style={{
						color: "#6b7280",
						fontSize: 12,
						margin: "4px 0 0",
					}}
				>
					home-kit · {SCREENS.length}개 화면
				</p>
			</div>
			<nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
				{SCREENS.map((s) => (
					<Link
						key={s.id}
						href={`/${s.id}`}
						style={{
							padding: "12px 16px",
							borderRadius: 10,
							background: "#111827",
							color: "#fff",
							textDecoration: "none",
							fontSize: 14,
							fontWeight: 500,
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<span>{s.label}</span>
						<span style={{ opacity: 0.5, fontSize: 12 }}>/{s.id}</span>
					</Link>
				))}
			</nav>
		</main>
	);
}
