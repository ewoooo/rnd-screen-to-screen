"use client";

import { FlexBox } from "@wanteddev/wds";

import { mockProducts } from "@/fixtures/products";
import { BannerContentsPilot } from "@/components/pilot-kit/BannerContentsPilot";
import { CardHorizontalProductPilot } from "@/components/pilot-kit/CardHorizontalProductPilot";
import { GnbPilot } from "@/components/pilot-kit/GnbPilot";
import { HeaderPilot } from "@/components/pilot-kit/HeaderPilot";
import { ListPilot } from "@/components/pilot-kit/ListPilot";

// Discover v2-pilot — 모든 섹션을 *Pilot 컴포넌트로 조립
// 화면 명세: data/screens/TU-DSP-MAIN-MO-02-PG-001-1.json (비로그인)

const krw = (n: number) => `${n.toLocaleString("ko-KR")}원`;

function ProductCard({ product }: { product: (typeof mockProducts)[number] }) {
	return (
		<CardHorizontalProductPilot
			thumbnailSrc={product.thumbnailUrl}
			brand={product.brand}
			title={product.title}
			info={product.discountRate ? `${product.discountRate}%` : ""}
			price={krw(product.priceKrw)}
			month="/1개월"
			showAdd
			showCta={false}
		/>
	);
}

export default function DiscoverV2PilotPage() {
	return (
		<FlexBox
			flexDirection="column"
			sx={{ width: "100%", height: "100%", flex: 1, minHeight: 0 }}
		>
			<HeaderPilot badgeCount={1} />

			<FlexBox
				flexDirection="column"
				gap={24}
				sx={{
					flex: 1,
					minHeight: 0,
					overflowY: "auto",
					paddingTop: 64,
					paddingBottom: 24,
				}}
			>
				{/* SPEC-MAIN-02 — 비로그인 컨텍스트 + 비개인화 리스트 */}
				<ListPilot
					title="통신사 상관없이 모두의 구독, T우주"
					subTitle="비로그인 사용자를 위한 추천 상품"
				>
					{mockProducts.slice(0, 6).map((p) => (
						<ProductCard key={p.id} product={p} />
					))}
				</ListPilot>

				{/* SPEC-MAIN-03 — 실시간 인기 베스트 */}
				<ListPilot
					title="실시간 인기 베스트"
					subTitle="집계 기반 · 매시간 갱신"
				>
					{mockProducts.slice(0, 6).map((p) => (
						<ProductCard key={p.id} product={p} />
					))}
				</ListPilot>

				{/* SPEC-MAIN-04 — 빅 배너 */}
				<div style={{ paddingLeft: 12, paddingRight: 12 }}>
					<BannerContentsPilot
						title={"봄맞이 구독 페스타\n최대 50% 할인"}
						subTitle="기간 한정 프로모션"
						currentPage={1}
						totalPages={3}
						dDay="D-7"
						date="4월 30일까지"
						info="50%"
						price="9,900원"
					/>
				</div>

				{/* SPEC-MAIN-05 — 신규 오픈 */}
				<ListPilot title="신규 오픈" subTitle="최근 30일 내 최신순">
					{mockProducts.slice(4, 10).map((p) => (
						<ProductCard key={p.id} product={p} />
					))}
				</ListPilot>

				{/* SPEC-MAIN-06 — 일반 배너 */}
				<div style={{ paddingLeft: 12, paddingRight: 12 }}>
					<BannerContentsPilot
						title="넷플릭스 3개월 무료 체험"
						subTitle="신규 가입자 전용"
						currentPage={2}
						totalPages={3}
						dDay="D-3"
						date="이번 주 마감"
						info="100%"
						price="0원"
						month="/3개월"
					/>
				</div>

				{/* SPEC-MAIN-07 — 인기 OTT (전체보기 포함) */}
				<ListPilot
					title="인기 OTT"
					showMore
					moreLabel="전체보기"
					onMoreClick={() => {
						/* /category/ott 이동 자리 */
					}}
				>
					{mockProducts
						.filter((p) => p.tags?.includes("OTT"))
						.map((p) => (
							<ProductCard key={p.id} product={p} />
						))}
				</ListPilot>

				{/* SPEC-MAIN-08 — 장기 구독 할인 */}
				<ListPilot
					title="장기 구독 할인"
					subTitle="12개월 약정 시 추가 할인"
				>
					{mockProducts
						.filter((p) => p.discountRate)
						.map((p) => (
							<ProductCard key={p.id} product={p} />
						))}
				</ListPilot>

				{/* SPEC-MAIN-09 — SKT 연계 혜택 (단일 카드, list 미사용) */}
				<FlexBox
					flexDirection="column"
					gap={12}
					sx={{ paddingLeft: 18, paddingRight: 18 }}
				>
					<ProductCard product={mockProducts[0]} />
				</FlexBox>
			</FlexBox>

			{/* SPEC-MAIN-10 — 하단 GNB */}
			<GnbPilot value="discover" />
		</FlexBox>
	);
}
