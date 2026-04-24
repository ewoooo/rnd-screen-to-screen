"use client";

import { useState } from "react";
import { FlexBox, Typography } from "@wanteddev/wds";

import { BannerPilot } from "@/components/pilot-kit/BannerPilot";
import { CardVerticalProductMediumPilot } from "@/components/pilot-kit/CardVerticalProductMediumPilot";
import { GnbPilot } from "@/components/pilot-kit/GnbPilot";
import { HeaderPilot } from "@/components/pilot-kit/HeaderPilot";
import { ListPilot } from "@/components/pilot-kit/ListPilot";
import { mockProducts, type MockProduct } from "@/fixtures/products";

// Discover v6-kit — kit-first 절차 준수 버전.
// CLAUDE.md "화면 제작 진입 순서" 의 4단계(registry → project_kits → pilot-kit) 그대로.
// 화면 명세: data/screens/TU-DSP-MAIN-MO-02-PG-001-1.json (비로그인)
//
// v2-pilot 과 차이: v2 는 pilot-kit raw 조립, v6 는 compound 레지스트리의
// variants 의도(personalized_context/best/new_open/ott_popular/long_subscribe)를
// ListPilot props 로 드러내 계약을 시각화.

const krw = (n: number) => `${n.toLocaleString("ko-KR")}원`;

function toMediumProps(p: MockProduct) {
	return {
		thumbnailSrc: p.thumbnailUrl,
		brand: p.brand,
		title: p.title,
		info: p.discountRate ? `${p.discountRate}%` : "",
		showInfo: Boolean(p.discountRate),
		price: krw(p.priceKrw),
		month: " / 1개월",
		showSlot: false,
	};
}

export default function DiscoverV6KitPage() {
	const [tab, setTab] = useState("discover");

	const ottProducts = mockProducts.filter((p) => p.tags?.includes("OTT"));
	const discounted = mockProducts.filter((p) => p.discountRate);

	return (
		<FlexBox
			flexDirection="column"
			sx={{ width: "100%", height: "100%", flex: 1, minHeight: 0 }}
		>
			{/* SPEC-01 헤더 (C1) */}
			<HeaderPilot badgeCount={1} />

			<FlexBox
				flexDirection="column"
				gap={28}
				sx={{
					flex: 1,
					minHeight: 0,
					overflowY: "auto",
					paddingTop: 8,
					paddingBottom: 24,
				}}
			>
				{/* SPEC-02 personalized_context — 비로그인 고정 메시지 + 카드 */}
				<FlexBox flexDirection="column" gap={12}>
					<FlexBox
						flexDirection="column"
						gap={2}
						sx={{ paddingLeft: 18, paddingRight: 18 }}
					>
						<Typography variant="caption1" weight="medium">
							통신사 상관없이 모두의 구독
						</Typography>
						<Typography variant="title2" weight="bold">
							T우주
						</Typography>
					</FlexBox>
					<ListPilot title="" direction="horizontal">
						{mockProducts.slice(0, 6).map((p) => (
							<CardVerticalProductMediumPilot
								key={`ctx-${p.id}`}
								{...toMediumProps(p)}
							/>
						))}
					</ListPilot>
				</FlexBox>

				{/* SPEC-03 best */}
				<ListPilot
					title="실시간 인기 베스트"
					subTitle="집계 기반 · 매시간 갱신"
					direction="horizontal"
				>
					{mockProducts.slice(0, 6).map((p) => (
						<CardVerticalProductMediumPilot
							key={`best-${p.id}`}
							{...toMediumProps(p)}
						/>
					))}
				</ListPilot>

				{/* SPEC-04 빅 배너 */}
				<FlexBox sx={{ paddingLeft: 12, paddingRight: 12 }}>
					<BannerPilot
						size="midium"
						title="봄맞이 구독 페스타 최대 50%"
						subTitle="기간 한정 프로모션"
						imageSrc="https://picsum.photos/seed/bigbanner/800/400"
					/>
				</FlexBox>

				{/* SPEC-05 new_open */}
				<ListPilot
					title="신규 오픈"
					subTitle="최근 30일 내 최신순"
					direction="horizontal"
				>
					{mockProducts.slice(4, 10).map((p) => (
						<CardVerticalProductMediumPilot
							key={`new-${p.id}`}
							{...toMediumProps(p)}
						/>
					))}
				</ListPilot>

				{/* SPEC-06 일반 배너 */}
				<FlexBox sx={{ paddingLeft: 0 }}>
					<BannerPilot
						size="small"
						title="넷플릭스 3개월 무료 체험"
						subTitle="신규 가입자 전용"
						imageSrc="https://picsum.photos/seed/banner2/800/280"
					/>
				</FlexBox>

				{/* SPEC-07 ott_popular (전체보기) */}
				<ListPilot
					title="인기 OTT"
					showMore
					onMoreClick={() => {}}
					direction="horizontal"
				>
					{ottProducts.map((p) => (
						<CardVerticalProductMediumPilot
							key={`ott-${p.id}`}
							{...toMediumProps(p)}
						/>
					))}
				</ListPilot>

				{/* SPEC-08 long_subscribe */}
				<ListPilot
					title="장기 구독 할인"
					subTitle="12개월 약정 시 추가 할인"
					direction="horizontal"
				>
					{discounted.map((p) => (
						<CardVerticalProductMediumPilot
							key={`long-${p.id}`}
							{...toMediumProps(p)}
						/>
					))}
				</ListPilot>

				{/* SPEC-09 SKT — 단일 강조 카드 */}
				<FlexBox flexDirection="column" gap={12}>
					<FlexBox
						flexDirection="column"
						gap={2}
						sx={{ paddingLeft: 18, paddingRight: 18 }}
					>
						<Typography variant="title3" weight="bold">
							SKT 가입 고객 전용 혜택
						</Typography>
					</FlexBox>
					<FlexBox sx={{ paddingLeft: 18, paddingRight: 18 }}>
						<CardVerticalProductMediumPilot
							{...toMediumProps(mockProducts[0])}
						/>
					</FlexBox>
				</FlexBox>
			</FlexBox>

			{/* SPEC-10 GNB (C7) */}
			<GnbPilot value={tab} onValueChange={setTab} />
		</FlexBox>
	);
}
