"use client";

import { useState } from "react";
import { FlexBox } from "@wanteddev/wds";

import { mockProducts } from "@/fixtures/products";

import {
	C1Header,
	C3List,
	C4Card,
	C6Banner,
	C7Gnb,
	SktSection,
	type GnbTab,
} from "./_compounds";

// Discover v5-compound — 레지스트리 compound 경계를 그대로 코드로.
// 화면 명세: data/screens/TU-DSP-MAIN-MO-02-PG-001-1.json (비로그인)
// 각 SPEC 은 <Cn .../> 한 줄에 대응 — page.tsx 는 IA 선언만.

export default function DiscoverV5CompoundPage() {
	const [tab, setTab] = useState<GnbTab>("discover");

	const ottProducts = mockProducts.filter((p) => p.tags?.includes("OTT"));
	const discounted = mockProducts.filter((p) => p.discountRate);

	return (
		<FlexBox
			flexDirection="column"
			sx={{ width: "100%", height: "100%", flex: 1, minHeight: 0 }}
		>
			{/* SPEC-01 */}
			<C1Header variant="discover_main" cartCount={1} />

			<FlexBox
				flexDirection="column"
				gap={24}
				sx={{
					flex: 1,
					minHeight: 0,
					overflowY: "auto",
					paddingTop: 8,
					paddingBottom: 24,
				}}
			>
				{/* SPEC-02 personalized_context */}
				<C3List
					eyebrow="통신사 상관없이 모두의 구독"
					title="T우주"
					products={mockProducts.slice(0, 6)}
				/>

				{/* SPEC-03 best */}
				<C3List
					title="실시간 인기 베스트"
					subTitle="집계 기반 · 매시간 갱신"
					products={mockProducts.slice(0, 6)}
				/>

				{/* SPEC-04 big banner */}
				<C6Banner
					title="봄맞이 구독 페스타 최대 50%"
					caption="기간 한정 프로모션"
					imageSrc="https://picsum.photos/seed/bigbanner/800/400"
					ratio="2:1"
				/>

				{/* SPEC-05 new_open */}
				<C3List
					title="신규 오픈"
					subTitle="최근 30일 내 최신순"
					products={mockProducts.slice(4, 10)}
				/>

				{/* SPEC-06 banner */}
				<C6Banner
					title="넷플릭스 3개월 무료 체험"
					caption="신규 가입자 전용"
					imageSrc="https://picsum.photos/seed/banner2/800/280"
					ratio="21:9"
				/>

				{/* SPEC-07 ott_popular (전체보기) */}
				<C3List
					title="인기 OTT"
					onMore={() => {}}
					products={ottProducts}
				/>

				{/* SPEC-08 long_subscribe */}
				<C3List
					title="장기 구독 할인"
					subTitle="12개월 약정 시 추가 할인"
					products={discounted}
				/>

				{/* SPEC-09 SKT 단일 카드 */}
				<SktSection title="SKT 가입 고객 전용 혜택">
					<C4Card product={mockProducts[0]} variant="skt_benefit" />
				</SktSection>
			</FlexBox>

			{/* SPEC-10 */}
			<C7Gnb value={tab} onValueChange={setTab} />
		</FlexBox>
	);
}
