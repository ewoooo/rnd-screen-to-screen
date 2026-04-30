import type { ReactNode } from "react";

import { ComCardProductPilot } from "@/components/pilot-kit/ComCardProductPilot";
import { ComProductThumbHor1Pilot } from "@/components/pilot-kit/ComProductThumbHor1Pilot";
import { ComProductThumbVer1Pilot } from "@/components/pilot-kit/ComProductThumbVer1Pilot";
import { OrgCardProductPilot } from "@/components/pilot-kit/OrgCardProductPilot";

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

const RANK_ITEMS = [
	{ rank: "1", brand: "배달의민족 쿠폰팩", name: "11번가 쇼핑 혜택/ G마켓 혜택 택 1~2 (+상품 하나 더)", info: "10%", price: "15,900원", period: "/ 1주" },
	{ rank: "1", brand: "쇼핑 패스", name: "11번가 3,000P+아마존 해외직구 무료 배송", info: "10%", price: "15,900원", period: "/ 1주" },
	{ rank: "1", brand: "미디어 패스", name: "FLO 스트리밍 이용권 + 추가 상품", info: "10%", price: "15,900원", period: "/ 1주" },
	{ rank: "1", brand: "배스킨라빈스", name: "배스킨라빈스 7,000원 쿠폰", info: "10%", price: "1,900원", period: "/ 1개월" },
	{ rank: "1", brand: "자취생 조합", name: "CU 할인 + 투썸플레이스 할인 + 배민 쿠폰", info: "40%", price: "15,900원", period: "/ 2개월" },
];

const RankList = () => (
	<div style={{ display: "flex", flexDirection: "column", gap: 32, width: "100%" }}>
		{RANK_ITEMS.map((it, i) => (
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
);

const VERT_ITEMS = [
	{ brand: "월간과자 마니아팩", name: "롯데웰푸드 과자 랜덤 구성 박스 정기 배송", infoSmall: "15%", priceOrigin: "21,000원", price: "18,900원", period: "/ 2개월" },
	{ brand: "이커머스 쇼핑팩", name: "11번가 + 쿠팡 멤버십 + 추가 혜택", infoSmall: "20%", priceOrigin: "32,000원", price: "25,600원", period: "/ 3개월" },
	{ brand: "OTT 스트리밍", name: "Netflix Standard + Tving + 라프텔", infoSmall: "10%", priceOrigin: "29,000원", price: "26,100원", period: "/ 1개월" },
	{ brand: "음악 콘텐츠팩", name: "FLO + 멜론 통합 이용권 정기 결제", infoSmall: "12%", priceOrigin: "18,000원", price: "15,840원", period: "/ 1개월" },
];

const VerticalGrid = () => (
	<div
		style={{
			display: "grid",
			gridTemplateColumns: "1fr 1fr",
			columnGap: 32,
			rowGap: 32,
			width: "100%",
			padding: "0 4px",
			justifyItems: "center",
		}}
	>
		{VERT_ITEMS.map((it, i) => (
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
);

const SINGLE_ITEM = [
	{ name: "Google One 100GB", info: "이용중", sub: "PlusX" },
];

const FIVE_PASS = [
	{ name: "Google One 100GB", info: "이용중", sub: "PlusX" },
	{ name: "요기요 10,000원 쿠폰팩", info: "사용전", sub: "D-6" },
	{ name: "맛남 그릇 정기배송", info: "배송예정", sub: "10/4 도착예정" },
	{ name: "과학동아 정기배송", info: "배송예정", sub: "10/12 도착예정" },
	{ name: "CU 4900", info: "1일 1잔", sub: "사용 가능" },
];

const BARCODE_ITEM = [
	{ name: "CU 4900", info: "1일 1잔", sub: "사용 가능" },
];

export default function OrganismsCardProduct() {
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
					Organisms / .org/card-product
				</h1>
				<p style={{ margin: 0, color: "#6b7280", fontSize: 13 }}>
					Figma{" "}
					<a
						href="https://www.figma.com/design/HEe3mcTVRPCZBlGwAaysWM/-R-D--Tokenize-Design-System--Preflight-SKT-?node-id=4-1251"
						target="_blank"
						rel="noreferrer"
						style={{ color: "#6b7280" }}
					>
						Tokenize DS / ogn/card-product
					</a>
					{" — "}organism 정식 변형 (size m/l) + best-case 5 화면 (3 신규 Pilot 사용)
				</p>
			</header>

			<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>정식 컴포넌트 (.org/card-product)</h2>
			<Section title="size=l (placeholder)" figma="29:6917 · 336×~770">
				<OrgCardProductPilot size="l" />
			</Section>
			<Section title="size=m (placeholder)" figma="29:6932 · 336×~340">
				<OrgCardProductPilot size="m" />
			</Section>

			<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Best-case 5 화면 (정합화)</h2>

			<Section title="08_rank_all — 실시간 인기 베스트 (com-product-thumb-hor-1 × 5)" figma="27:24211 · 336×743">
				<OrgCardProductPilot
					size="l"
					title={"실시간\n인기 베스트"}
					sub="T 우주에서 가장 인기 있는 상품이에요"
					slot={<RankList />}
					btnLabel="전체보기"
				/>
			</Section>

			<Section title="13_list_product_vertical — 일상에 구독이 필요한 순간 (com-product-thumb-ver-1 × 4)" figma="27:24279 · 336×836">
				<OrgCardProductPilot
					size="l"
					title={"일상에 구독이\n필요한 순간"}
					sub="T 우주에서 새로워진 구독 일상"
					slot={<VerticalGrid />}
					btnLabel="전체보기"
				/>
			</Section>

			<Section title="con-title-card — 해지됐지만 이용기간이 남았어요 (com-card-product 1 row)" figma="27:24372 · 336×228">
				<ComCardProductPilot items={SINGLE_ITEM} showBtn={false} />
			</Section>

			<Section title="con-title-card — T 우주패스 쇼핑 (com-card-product 5 rows)" figma="27:24376 · 336×438">
				<ComCardProductPilot items={FIVE_PASS} btnLabel="전체보기" />
			</Section>

			<Section title="con-title-card — 할인 바코드 (com-card-product 1 row, no btn)" figma="27:24381 · 336×88">
				<ComCardProductPilot items={BARCODE_ITEM} showBtn={false} />
			</Section>
		</main>
	);
}
