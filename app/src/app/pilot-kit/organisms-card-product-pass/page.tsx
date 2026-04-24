import type { ReactNode } from "react";

import { OrgCardProductPassPilot } from "@/components/pilot-kit/OrgCardProductPassPilot";

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
		<header
			style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}
		>
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

export default function OrganismsCardProductPass() {
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
					Organisms / .org/card-product-pass
				</h1>
				<p style={{ margin: 0, color: "#6b7280", fontSize: 13 }}>
					Figma{" "}
					<a
						href="https://www.figma.com/design/HEe3mcTVRPCZBlGwAaysWM/-R-D--Tokenize-Design-System--Preflight-SKT-?node-id=27-24399"
						target="_blank"
						rel="noreferrer"
						style={{ color: "#6b7280" }}
					>
						Tokenize DS / ogn/card-product-pass
					</a>
					{" — "}이중 카드(상/하) + image overlap + dot divider 구조
				</p>
			</header>

			<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>정식 컴포넌트 (placeholder)</h2>
			<Section title=".org/card-product-pass (336×674)" figma="27:24399">
				<OrgCardProductPassPilot />
			</Section>

			<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Best-case 1 화면 — 미디어 패스</h2>
			<Section title="다양한 상품을 하나의 패스로 (FLO + Wavve + 추가)" figma="27:31907">
				<OrgCardProductPassPilot
					outerTitle={"다양한 상품을\n하나의 패스로"}
					outerSub="2개 구성 상품이에요"
					innerTitle="미디어 패스"
					innerSub="기본 상품을 1개 선택해 이용할 수 있어요"
					info="첫 구독"
					price="1,000원"
					period="/1개월"
					ctaLabel="구성 담기 +"
					outerBtnLabel="더 많은 패스 보러가기"
					slot={
						<div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", padding: "0 8px" }}>
							{[
								{ label: "옵션", name: "FLO 스트리밍(모바일) + 전용데이터", color: "#3617ce" },
								{ label: "옵션 2", name: "Wavve 앤 데이터 플러스 구독", color: "#3617ce" },
								{ label: "추가 상품", name: "자유롭게 선택할 수 있어요", color: "#a0a0a0" },
							].map((it, i) => (
								<div
									key={i}
									style={{
										display: "flex",
										gap: 12,
										alignItems: "center",
										width: "100%",
									}}
								>
									<div
										style={{
											width: 36,
											height: 36,
											borderRadius: 99,
											background: it.color,
											flexShrink: 0,
											opacity: it.color === "#a0a0a0" ? 0.3 : 1,
										}}
									/>
									<div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, minWidth: 0 }}>
										<span style={{ fontSize: 11, color: "#a0a0a0", lineHeight: "13px" }}>
											{it.label}
										</span>
										<span
											style={{
												fontSize: 13,
												fontWeight: 700,
												color: "#1a1a1a",
												lineHeight: "16px",
												overflow: "hidden",
												textOverflow: "ellipsis",
												whiteSpace: "nowrap",
											}}
										>
											{it.name}
										</span>
									</div>
								</div>
							))}
						</div>
					}
				/>
			</Section>
		</main>
	);
}
