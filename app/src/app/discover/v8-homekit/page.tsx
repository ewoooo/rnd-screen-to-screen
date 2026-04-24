import type { ReactNode } from "react";

import {
	Card,
	Heading20,
	ListRow,
	ListSub,
	MyEditButton,
	OfferingBanner,
	PillChip,
	Placeholder,
	SectionLabel,
	Shell,
	T_BRAND,
	T_BRAND_SHADOW,
} from "@/components/home-kit";
import { mockProducts, type MockProduct } from "@/fixtures/products";

// Discover v8-homekit — 홈킷 시각언어로 발견(비로그인) 화면 재구성.
// 원칙:
//  - PAGE_BG 위 soft Card(32 padding, radius 24) 섹션을 차곡차곡 쌓는다.
//  - 가로 스크롤 상품 스트립은 home-kit Placeholder 썸네일로 슬롯만 잡는다.
//  - 세로 리스트(SPEC-08 장기할인)는 ListRow 재사용.
//  - 빅배너/일반배너는 OfferingBanner 톤(투명 stripe)으로 통일.
// 화면: data/screens/TU-DSP-MAIN-MO-02-PG-001-1.json (비로그인)

const krw = (n: number) => `${n.toLocaleString("ko-KR")}원`;

function SectionHeader({
	label,
	title,
	more,
}: {
	label: string;
	title: string;
	more?: string;
}) {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "flex-end",
				gap: "var(--spacing-12)",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-4)",
					minWidth: 0,
				}}
			>
				<SectionLabel>{label}</SectionLabel>
				<Heading20>{title}</Heading20>
			</div>
			{more && <PillChip>{more}</PillChip>}
		</div>
	);
}

// 가로 스크롤 상품 스트립 — 144 셀, Placeholder 썸네일 + 2줄 메타.
function ProductStrip({ products }: { products: MockProduct[] }) {
	return (
		<div
			style={{
				display: "flex",
				gap: "var(--spacing-12)",
				overflowX: "auto",
				marginLeft: "calc(var(--spacing-32) * -1)",
				marginRight: "calc(var(--spacing-32) * -1)",
				paddingLeft: "var(--spacing-32)",
				paddingRight: "var(--spacing-32)",
				scrollbarWidth: "none",
			}}
		>
			{products.map((p) => (
				<div
					key={p.id}
					style={{
						width: 144,
						flexShrink: 0,
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-8)",
					}}
				>
					<Placeholder w={144} h={144} label={p.brand} />
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: 2,
						}}
					>
						<span
							style={{
								fontSize: 11,
								fontWeight: 700,
								letterSpacing: "-0.44px",
								color: "var(--semantic-label-alternative)",
							}}
						>
							{p.brand}
						</span>
						<span
							style={{
								fontSize: 13,
								fontWeight: 600,
								letterSpacing: "-0.52px",
								lineHeight: 1.3,
								color: "var(--semantic-label-normal)",
								display: "-webkit-box",
								WebkitLineClamp: 2,
								WebkitBoxOrient: "vertical",
								overflow: "hidden",
							}}
						>
							{p.title}
						</span>
						<span
							style={{
								fontSize: 13,
								fontWeight: 700,
								letterSpacing: "-0.52px",
								color: "var(--semantic-label-normal)",
							}}
						>
							{p.discountRate ? (
								<span style={{ color: T_BRAND, marginRight: 4 }}>
									{p.discountRate}%
								</span>
							) : null}
							{krw(p.priceKrw)}
						</span>
					</div>
				</div>
			))}
		</div>
	);
}

// SPEC-04 빅배너 — Card 안에 큰 placeholder + headline + CTA. T_BRAND 톤 강조.
function BigBannerCard({
	label,
	headline,
	cta,
}: {
	label: string;
	headline: string;
	cta: string;
}) {
	return (
		<Card
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "var(--spacing-16)",
			}}
		>
			<Placeholder w="100%" h={180} label="big banner" />
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-end",
					gap: "var(--spacing-12)",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-4)",
						minWidth: 0,
					}}
				>
					<SectionLabel>{label}</SectionLabel>
					<Heading20>{headline}</Heading20>
				</div>
				<button
					type="button"
					style={{
						background: T_BRAND,
						color: "#fff",
						height: 36,
						padding: "0 var(--spacing-16)",
						borderRadius: 12,
						border: "none",
						fontSize: 12,
						fontWeight: 600,
						letterSpacing: "-0.48px",
						boxShadow: T_BRAND_SHADOW,
						cursor: "pointer",
						whiteSpace: "nowrap",
					}}
				>
					{cta}
				</button>
			</div>
		</Card>
	);
}

function CarouselCard({
	label,
	title,
	more,
	products,
	footnote,
}: {
	label: string;
	title: string;
	more?: string;
	products: MockProduct[];
	footnote?: ReactNode;
}) {
	return (
		<Card
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "var(--spacing-20)",
			}}
		>
			<SectionHeader label={label} title={title} more={more} />
			<ProductStrip products={products} />
			{footnote}
		</Card>
	);
}

export default function DiscoverV8HomekitPage() {
	const ott = mockProducts.filter((p) => p.tags?.includes("OTT"));
	const discounted = mockProducts.filter((p) => p.discountRate);
	const skt = mockProducts.slice(0, 3);

	return (
		<Shell
			gnbTabs={[
				{ key: "discover", label: "발견", active: true },
				{ key: "category", label: "카테고리", active: false },
				{ key: "my", label: "나의 구독", active: false },
			]}
		>
			{/* SPEC-02 비로그인 컨텍스트 — 헤드라인 + AI 안내 */}
			<Card
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-16)",
				}}
			>
				<SectionLabel>통신사 상관없이 모두의 구독</SectionLabel>
				<Heading20>{`T우주\n모두의 구독을 한 번에`}</Heading20>
				<div
					style={{
						display: "flex",
						alignItems: "flex-start",
						gap: "var(--spacing-2)",
					}}
				>
					<Placeholder w={18} h={18} label="ai" />
					<span
						style={{
							fontSize: 13,
							fontWeight: 700,
							letterSpacing: "-0.39px",
							lineHeight: 1.4,
							color: T_BRAND,
						}}
					>
						로그인 없이 인기 상품부터 둘러보세요
					</span>
				</div>
			</Card>

			{/* SPEC-03 실시간 인기 베스트 */}
			<CarouselCard
				label="집계 기반 · 매시간 갱신"
				title={"지금 가장 많이\n고른 베스트"}
				more="전체"
				products={mockProducts.slice(0, 6)}
			/>

			{/* SPEC-04 빅 배너 */}
			<BigBannerCard
				label="기간 한정 프로모션"
				headline={"봄맞이 구독 페스타\n최대 50% 할인"}
				cta="자세히 보기"
			/>

			{/* SPEC-05 신규 오픈 상품 */}
			<CarouselCard
				label="최근 30일 내 신규"
				title={"이번 달 새로\n등장한 구독"}
				products={mockProducts.slice(4, 10)}
			/>

			{/* SPEC-06 일반 배너 — OfferingBanner 톤으로 가벼운 스트립 */}
			<OfferingBanner
				text="넷플릭스 3개월 무료 체험"
				imageSize={{ w: 72, h: 62 }}
				imageLabel="netflix"
			/>

			{/* SPEC-07 인기 OTT */}
			<CarouselCard
				label="인기순 TOP"
				title={"OTT 한 번에\n골라 구독하기"}
				more="전체"
				products={ott}
			/>

			{/* SPEC-08 장기 구독 할인 — 세로 ListRow */}
			<Card
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-24)",
				}}
			>
				<SectionHeader
					label="12개월 약정 시 추가 할인"
					title={"오래 쓸수록\n더 할인되는 구독"}
				/>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-12)",
					}}
				>
					{discounted.map((p) => (
						<ListRow
							key={p.id}
							thumb={{ w: 40, h: 40, label: p.brand }}
							title={p.title}
							sub={`${p.discountRate}% · ${krw(p.priceKrw)} / 월`}
							pill="담기"
						/>
					))}
				</div>
			</Card>

			{/* SPEC-09 SKT 가입 고객 전용 */}
			<CarouselCard
				label="SKT 가입 고객 전용"
				title={"T 요금제로\n더 받는 PASS 혜택"}
				more="전체"
				products={skt}
				footnote={
					<span
						style={{
							fontSize: 11,
							fontWeight: 700,
							letterSpacing: "-0.44px",
							color: "var(--semantic-label-alternative)",
						}}
					>
						T 요금제 가입자만 노출되는 섹션이에요
					</span>
				}
			/>

			<MyEditButton />
		</Shell>
	);
}
