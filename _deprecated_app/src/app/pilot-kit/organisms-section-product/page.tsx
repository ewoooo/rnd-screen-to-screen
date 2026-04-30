import type { ReactNode } from "react";

import { ComProductThumbHor1Pilot } from "@/components/pilot-kit/ComProductThumbHor1Pilot";
import { ComProductThumbVer1Pilot } from "@/components/pilot-kit/ComProductThumbVer1Pilot";
import { OrgSectionProductPilot } from "@/components/pilot-kit/OrgSectionProductPilot";

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

const SAMPLE_HOR_ITEMS = [
	{ rank: "1", brand: "T 우주", name: "T 우주에 새로 온 상품 1", info: "10%", price: "9,900원", period: "/ 1주" },
	{ rank: "1", brand: "T 우주", name: "T 우주에 새로 온 상품 2", info: "10%", price: "12,900원", period: "/ 1주" },
	{ rank: "1", brand: "T 우주", name: "T 우주에 새로 온 상품 3", info: "10%", price: "15,900원", period: "/ 1주" },
];

const SAMPLE_VER_ITEMS = [
	{ brand: "구독 라이프", name: "장기 구독 정기 결제 패키지", infoSmall: "15%", priceOrigin: "21,000원", price: "17,850원", period: "/ 1개월" },
	{ brand: "구독 라이프", name: "신상 상품 묶음 정기 배송", infoSmall: "20%", priceOrigin: "25,000원", price: "20,000원", period: "/ 2개월" },
];

export default function OrganismsSectionProduct() {
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
					Organisms / .org/section-product
				</h1>
				<p style={{ margin: 0, color: "#6b7280", fontSize: 13 }}>
					Figma{" "}
					<a
						href="https://www.figma.com/design/HEe3mcTVRPCZBlGwAaysWM/-R-D--Tokenize-Design-System--Preflight-SKT-?node-id=29-6776"
						target="_blank"
						rel="noreferrer"
						style={{ color: "#6b7280" }}
					>
						Tokenize DS / ogn/section-product
					</a>
					{" — "}.org/card-product 의 footer 없는 단순 wrapper. title + slot 만.
				</p>
			</header>

			<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>정식 컴포넌트 (placeholder)</h2>
			<Section title=".org/section-product (336, slot 312h)" figma="29:6776">
				<OrgSectionProductPilot />
			</Section>

			<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Best-case 변형 — 대표 2종</h2>
			<Section title="T 우주에 새로 왔어요 (horizontal rows)" figma="27:31214 변형">
				<OrgSectionProductPilot
					title={"T 우주에\n새로 왔어요"}
					sub="새로 들어온 상품을 빠르게 만나보세요"
					slot={
						<div style={{ display: "flex", flexDirection: "column", gap: 32, width: "100%", padding: "0 12px" }}>
							{SAMPLE_HOR_ITEMS.map((it, i) => (
								<ComProductThumbHor1Pilot
									key={i}
									rank={it.rank}
									brand={it.brand}
									name={it.name}
									info={it.info}
									price={it.price}
									period={it.period}
								/>
							))}
						</div>
					}
				/>
			</Section>

			<Section title="나만의 구독 라이프 시작 (vertical grid)" figma="27:31214 변형">
				<OrgSectionProductPilot
					title={"나만의 구독\n라이프 시작"}
					sub="첫 구독 시작에 도움되는 묶음"
					slot={
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: 32,
								width: "100%",
								padding: "0 12px",
								justifyItems: "center",
							}}
						>
							{SAMPLE_VER_ITEMS.map((it, i) => (
								<ComProductThumbVer1Pilot
									key={i}
									brand={it.brand}
									name={it.name}
									infoSmall={it.infoSmall}
									priceOrigin={it.priceOrigin}
									price={it.price}
									period={it.period}
								/>
							))}
						</div>
					}
				/>
			</Section>
		</main>
	);
}
