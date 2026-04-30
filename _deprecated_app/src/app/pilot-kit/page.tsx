import Link from "next/link";

const ATOM_CATEGORIES = [
	{ slug: "atoms-buttons", title: "Buttons", count: 7, items: "btn-search · btn-text · btn-text-icon · button-add · button-icon-text-background · button-chip · button-calltoaction" },
	{ slug: "atoms-badges", title: "Badges", count: 5, items: "badge-product-state · badge-label-text · badge-pass-product · badge-number · pageindicator-number" },
	{ slug: "atoms-form", title: "Form / Input", count: 4, items: "input/default · dropdown-list · accordion-option · product-progress-bar" },
	{ slug: "atoms-display", title: "Display", count: 5, items: "divider · image/brand-logo/round · img/rectangle · text-area/body · indicator-dot" },
	{ slug: "atoms-misc", title: "Misc", count: 4, items: "button-tabbar · button-survey-option · button-select-product · banner" },
] as const;

const MOLECULE_CATEGORIES = [
	{ slug: "molecules-cards", title: "Cards", count: 10, items: "vertical 4 (medium · small · list · promotion) + horizontal 6 (product · option · delivery · barcode-info · pass · information · select)" },
	{ slug: "molecules-misc", title: "Information · Header · Misc · Stateful · Banner · Button-icon", count: 9, items: "button-icon · banner-contents · header-bottomsheet · information-barcode · information-membership · image/brand-logo · text-icon · accordion · input" },
] as const;

const ORGANISM_CATEGORIES = [
	{ slug: "organisms-section-product", title: ".org/section-product", count: 1, items: "title + slot wrapper (footer 없음) — best-case 2 (horizontal rows · vertical grid)" },
	{ slug: "organisms-card-product", title: ".org/card-product", count: 1, items: "size m/l + best-case 5 화면 (rank-all · list-vertical · 단독 · 5-pass · barcode)" },
	{ slug: "organisms-card-product-pass", title: ".org/card-product-pass", count: 1, items: "이중 카드 + image overlap + dot divider + 외부 small btn — best-case 1 (미디어 패스)" },
	{ slug: "organisms-card-product-info", title: ".org/card-product-info", count: 1, items: "쿠폰/바코드 단독 카드 (slot-img + title 22/26 + slot-badge + sub × 3 + slot-contents 148h + footer btn + more) — best-case 3" },
	{ slug: "organisms-card-product-barcode", title: ".org/card-product-barcode", count: 1, items: "할인 바코드 카드 (이중 카드 + dot divider, brand row + InformationBarcode + 주의사항 list) — best-case 2" },
	{ slug: "organisms-card-product-recommand", title: ".org/card-product-recommand", count: 1, items: "묶음 상품 추천 카드 (title + slot-product 큰 영역 + 가격/dark CTA + pagination) — best-case 2" },
	{ slug: "organisms-bottomsheet-list", title: ".bottomsheet-list", count: 1, items: "바텀시트 list (header close + title/sub + scroll slot + 선택 CTA) — best-case 4 (브랜드/카드/약관/발행수단)" },
	{ slug: "organisms-extras", title: "extras (header/tabbar/footer)", count: 3, items: "header (search/cart) · tabbar (홈/이용/카테고리/구독함) · footer (SK텔레콤 정보 + 약관 + 패밀리)" },
] as const;

const COMPONENT_PREVIEWS = [
	{ slug: "header", title: "HeaderPilot", note: "organism · floating + backdrop blur 검증" },
] as const;

export default function PreviewIndex() {
	const totalAtoms = ATOM_CATEGORIES.reduce((n, c) => n + c.count, 0);

	return (
		<main
			style={{
				padding: 24,
				display: "flex",
				flexDirection: "column",
				gap: 24,
				maxWidth: 720,
				margin: "0 auto",
			}}
		>
			<header style={{ display: "flex", flexDirection: "column", gap: 4 }}>
				<h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Preview</h1>
				<p style={{ margin: 0, color: "#6b7280", fontSize: 13 }}>
					Figma 04_ADP_P3-T1_Library 기반 *Pilot 컴포넌트 카탈로그
				</p>
			</header>

			<section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
				<div
					style={{
						display: "flex",
						alignItems: "baseline",
						justifyContent: "space-between",
					}}
				>
					<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Atoms</h2>
					<span style={{ fontSize: 12, color: "#9ca3af" }}>
						{totalAtoms}종 · 5 카테고리 · Figma 143:8046
					</span>
				</div>
				<ul
					style={{
						listStyle: "none",
						padding: 0,
						margin: 0,
						display: "grid",
						gap: 8,
					}}
				>
					{ATOM_CATEGORIES.map((c) => (
						<li key={c.slug}>
							<Link
								href={`/pilot-kit/${c.slug}`}
								style={{
									display: "flex",
									flexDirection: "column",
									gap: 4,
									padding: 14,
									borderRadius: 10,
									border: "1px solid #e5e7eb",
									textDecoration: "none",
									color: "inherit",
									background: "#fff",
								}}
							>
								<div
									style={{
										display: "flex",
										alignItems: "baseline",
										gap: 8,
									}}
								>
									<span style={{ fontSize: 14, fontWeight: 600 }}>
										{c.title}
									</span>
									<span style={{ fontSize: 11, color: "#9ca3af" }}>
										{c.count}종
									</span>
								</div>
								<span
									style={{
										fontSize: 11,
										color: "#6b7280",
										lineHeight: 1.4,
									}}
								>
									{c.items}
								</span>
							</Link>
						</li>
					))}
				</ul>
			</section>

			<section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
				<div
					style={{
						display: "flex",
						alignItems: "baseline",
						justifyContent: "space-between",
					}}
				>
					<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Molecules</h2>
					<span style={{ fontSize: 12, color: "#9ca3af" }}>
						{MOLECULE_CATEGORIES.reduce((n, c) => n + c.count, 0)}종 · Figma 12:8103
					</span>
				</div>
				<ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
					{MOLECULE_CATEGORIES.map((c) => (
						<li key={c.slug}>
							<Link
								href={`/pilot-kit/${c.slug}`}
								style={{
									display: "flex",
									flexDirection: "column",
									gap: 4,
									padding: 14,
									borderRadius: 10,
									border: "1px solid #e5e7eb",
									textDecoration: "none",
									color: "inherit",
									background: "#fff",
								}}
							>
								<div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
									<span style={{ fontSize: 14, fontWeight: 600 }}>{c.title}</span>
									<span style={{ fontSize: 11, color: "#9ca3af" }}>{c.count}종</span>
								</div>
								<span style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.4 }}>
									{c.items}
								</span>
							</Link>
						</li>
					))}
				</ul>
			</section>

			<section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
				<div
					style={{
						display: "flex",
						alignItems: "baseline",
						justifyContent: "space-between",
					}}
				>
					<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Organisms</h2>
					<span style={{ fontSize: 12, color: "#9ca3af" }}>
						{ORGANISM_CATEGORIES.length}종 · Figma Tokenize DS
					</span>
				</div>
				<ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
					{ORGANISM_CATEGORIES.map((c) => (
						<li key={c.slug}>
							<Link
								href={`/pilot-kit/${c.slug}`}
								style={{
									display: "flex",
									flexDirection: "column",
									gap: 4,
									padding: 14,
									borderRadius: 10,
									border: "1px solid #e5e7eb",
									textDecoration: "none",
									color: "inherit",
									background: "#fff",
								}}
							>
								<div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
									<span style={{ fontSize: 14, fontWeight: 600 }}>{c.title}</span>
									<span style={{ fontSize: 11, color: "#9ca3af" }}>{c.count}종 + best-case</span>
								</div>
								<span style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.4 }}>
									{c.items}
								</span>
							</Link>
						</li>
					))}
				</ul>
			</section>

			<section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
				<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Components</h2>
				<ul
					style={{
						listStyle: "none",
						padding: 0,
						margin: 0,
						display: "grid",
						gap: 8,
					}}
				>
					{COMPONENT_PREVIEWS.map((c) => (
						<li key={c.slug}>
							<Link
								href={`/pilot-kit/${c.slug}`}
								style={{
									display: "flex",
									flexDirection: "column",
									gap: 4,
									padding: 14,
									borderRadius: 10,
									border: "1px solid #e5e7eb",
									textDecoration: "none",
									color: "inherit",
									background: "#fff",
								}}
							>
								<span style={{ fontSize: 14, fontWeight: 600 }}>
									{c.title}
								</span>
								<span style={{ fontSize: 11, color: "#6b7280" }}>
									{c.note}
								</span>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}
