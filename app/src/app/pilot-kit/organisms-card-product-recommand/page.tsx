import type { ReactNode } from "react";

import { OrgCardProductRecommandPilot } from "@/components/pilot-kit/OrgCardProductRecommandPilot";

const Section = ({
	title,
	figma,
	children,
}: {
	title: string;
	figma: string;
	children: ReactNode;
}) => (
	<section style={{ display: "flex", flexDirection: "column", gap: 8 }}>
		<header style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
			<h3 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>{title}</h3>
			<span style={{ fontSize: 11, color: "#9ca3af", fontFamily: "monospace" }}>{figma}</span>
		</header>
		<div
			style={{
				display: "flex",
				gap: 24,
				flexWrap: "wrap",
				padding: 16,
				background: "#fafafa",
				borderRadius: 12,
				border: "1px solid #e5e7eb",
				alignItems: "flex-start",
			}}
		>
			{children}
		</div>
	</section>
);

const ProductBundleArt = () => (
	<div
		style={{
			width: "100%",
			height: 345,
			padding: "20px 24px",
			display: "grid",
			gridTemplateColumns: "1fr 1fr",
			gap: 12,
			alignItems: "center",
		}}
	>
		<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
			<span style={{ fontSize: 24, fontWeight: 600, color: "#1a1a1a", lineHeight: "30px" }}>
				나를 위한
				<br />
				자기계발
			</span>
			<div
				style={{
					padding: "10px 14px",
					background: "white",
					borderRadius: 16,
					boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
					display: "flex",
					gap: 10,
					alignItems: "center",
				}}
			>
				<div style={{ width: 32, height: 32, borderRadius: 99, background: "#000" }} />
				<div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
					<span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>클래스101</span>
					<span style={{ fontSize: 11, color: "#6c6c6c" }}>캐시 및 할인권</span>
				</div>
			</div>
		</div>
		<div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
			<div
				style={{
					padding: "10px 14px",
					background: "white",
					borderRadius: 16,
					boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
					display: "flex",
					gap: 10,
					alignItems: "center",
				}}
			>
				<div style={{ width: 32, height: 32, borderRadius: 99, background: "#3617ce" }} />
				<div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
					<span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>사운드짐</span>
					<span style={{ fontSize: 11, color: "#6c6c6c" }}>멤버십 무료쿠폰</span>
				</div>
			</div>
			<span
				style={{
					fontSize: 24,
					fontWeight: 600,
					color: "#1a1a1a",
					lineHeight: "30px",
					textAlign: "right",
				}}
			>
				건강한
				<br />
				자기관리
			</span>
		</div>
	</div>
);

export default function OrganismsCardProductRecommand() {
	return (
		<main
			style={{
				padding: 24,
				display: "flex",
				flexDirection: "column",
				gap: 28,
				maxWidth: 1100,
				margin: "0 auto",
			}}
		>
			<header style={{ display: "flex", flexDirection: "column", gap: 4 }}>
				<h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>
					Organisms / .org/card-product-recommand
				</h1>
				<p style={{ margin: 0, color: "#6b7280", fontSize: 13 }}>
					Figma{" "}
					<a
						href="https://www.figma.com/design/HEe3mcTVRPCZBlGwAaysWM/-R-D--Tokenize-Design-System--Preflight-SKT-?node-id=29-6865"
						target="_blank"
						rel="noreferrer"
						style={{ color: "#6b7280" }}
					>
						Tokenize DS / ogn/card-product-recommand
					</a>
					{" — "}묶음 상품 추천 카드 (title + slot-product 큰 영역 + 가격/CTA + pagination)
				</p>
			</header>

			<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>정식 컴포넌트 (placeholder)</h2>
			<Section title=".org/card-product-recommand (336×555)" figma="29:6865">
				<OrgCardProductRecommandPilot />
			</Section>

			<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Best-case 변형 — 대표 2종</h2>

			<Section title="방금 본 상품이 포함된 조합 (다중 product 그리드)" figma="27:31912 변형">
				<OrgCardProductRecommandPilot
					title={"방금 본 상품이\n포함된 조합이에요"}
					sub="다른 상품과 함께 구독해 보세요"
					slotProduct={<ProductBundleArt />}
					showInfo
					info="첫 구독"
					price="12,900원"
					period="/1개월"
					slotBadge={
						<div style={{ display: "flex", gap: 4 }}>
							<div style={{ background: "#f2f2f2", padding: "2px 8px", borderRadius: 4 }}>
								<span style={{ fontSize: 12, color: "#6c6c6c", fontWeight: 500 }}>AI 추천</span>
							</div>
							<div style={{ background: "#f2f2f2", padding: "2px 8px", borderRadius: 4 }}>
								<span style={{ fontSize: 12, color: "#6c6c6c", fontWeight: 500 }}>플러스 할인</span>
							</div>
						</div>
					}
					ctaLabel="구성 담기 +"
					showPagination={false}
				/>
			</Section>

			<Section title="이런 조합은 어때요? (자취생 조합)" figma="27:31912 변형">
				<OrgCardProductRecommandPilot
					title={"이런 조합은\n어때요?"}
					sub="라이프스타일에 따라 묶어서 구독해 보세요"
					slotProduct={
						<div
							style={{
								width: "100%",
								height: 345,
								padding: "16px 24px",
								display: "flex",
								flexDirection: "column",
								gap: 8,
								justifyContent: "center",
							}}
						>
							<span style={{ fontSize: 12, color: "#6c6c6c" }}>묶음 상품</span>
							<span style={{ fontSize: 22, fontWeight: 700, color: "#1a1a1a" }}>
								자취생 조합
							</span>
							<div
								style={{
									flex: 1,
									marginTop: 12,
									background: "linear-gradient(135deg, #ffe6c4 0%, #d8e8ed 100%)",
									borderRadius: 16,
								}}
							/>
						</div>
					}
					showInfo={false}
					price="12,900원"
					period="/2주"
					slotBadge={
						<div style={{ display: "flex", gap: 4 }}>
							<div style={{ background: "#f2f2f2", padding: "2px 8px", borderRadius: 4 }}>
								<span style={{ fontSize: 12, color: "#6c6c6c", fontWeight: 500 }}>NEW</span>
							</div>
							<div style={{ background: "#f2f2f2", padding: "2px 8px", borderRadius: 4 }}>
								<span style={{ fontSize: 12, color: "#6c6c6c", fontWeight: 500 }}>플러스 할인</span>
							</div>
						</div>
					}
					ctaLabel="구성 확인 →"
					showPagination
					paginationCount={2}
					paginationActive={0}
				/>
			</Section>
		</main>
	);
}
