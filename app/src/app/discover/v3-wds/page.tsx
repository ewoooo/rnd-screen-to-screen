"use client";

import { useState, type ReactNode } from "react";
import {
	BottomNavigation,
	BottomNavigationItem,
	Card,
	CardCaption,
	CardContent,
	CardThumbnail,
	CardTitle,
	Chip,
	FlexBox,
	PushBadge,
	ScrollArea,
	TextButton,
	TopNavigation,
	TopNavigationButton,
	Typography,
} from "@wanteddev/wds";
import {
	IconBusinessBag,
	IconChevronRight,
	IconHome,
	IconList,
	IconPerson,
	IconSearch,
} from "@wanteddev/wds-icon";

import { mockProducts } from "./_mock";

// Discover v3-wds — *Pilot 래퍼 무시. WDS 컴포넌트 직접 합성.
// 화면 명세: data/screens/TU-DSP-MAIN-MO-02-PG-001-1.json (비로그인)
// 디자인 제약: DESIGN.md (모바일 360px, platform="mobile")

const krw = (n: number) => `${n.toLocaleString("ko-KR")}원`;

const PAD_X = 16;
const SECTION_GAP = 24;
const CARD_W = 240;

// ─── helpers (이 화면에서만 사용. 다른 버전과 공유 금지) ───────────────

function HScroll({ children }: { children: ReactNode }) {
	return (
		<ScrollArea scrollbars="horizontal">
			<FlexBox
				flexDirection="row"
				gap={12}
				sx={{ paddingLeft: PAD_X, paddingRight: PAD_X }}
			>
				{children}
			</FlexBox>
		</ScrollArea>
	);
}

function SectionHeader({
	title,
	subTitle,
	onMore,
}: {
	title: string;
	subTitle?: string;
	onMore?: () => void;
}) {
	return (
		<FlexBox
			flexDirection="row"
			justifyContent="space-between"
			alignItems="flex-end"
			sx={{ paddingLeft: PAD_X, paddingRight: PAD_X }}
		>
			<FlexBox flexDirection="column" gap={4}>
				<Typography variant="title3" weight="bold">
					{title}
				</Typography>
				{subTitle && (
					<Typography variant="caption1" weight="medium">
						{subTitle}
					</Typography>
				)}
			</FlexBox>
			{onMore && (
				<TextButton
					color="assistive"
					size="small"
					trailingContent={<IconChevronRight width={14} height={14} />}
					onClick={onMore}
				>
					전체보기
				</TextButton>
			)}
		</FlexBox>
	);
}

function ProductCard({
	product,
	width = CARD_W,
}: {
	product: (typeof mockProducts)[number];
	width?: number;
}) {
	return (
		<Card
			platform="mobile"
			width={width}
			flexShrink={0}
			flexDirection="column"
			gap={8}
		>
			<CardThumbnail
				src={product.thumbnailUrl}
				alt={product.title}
				ratio="1:1"
			/>
			<CardContent flexDirection="column" gap={4}>
				<CardCaption variant="caption1" weight="medium">
					{product.brand}
				</CardCaption>
				<CardTitle
					variant="body2"
					weight="bold"
					sx={{
						display: "-webkit-box",
						WebkitLineClamp: 2,
						WebkitBoxOrient: "vertical",
						overflow: "hidden",
					}}
				>
					{product.title}
				</CardTitle>
				<Typography variant="body2" weight="bold">
					{product.discountRate ? (
						<span style={{ color: "var(--semantic-text-accent-violet)" }}>
							{product.discountRate}%{" "}
						</span>
					) : null}
					<span>{krw(product.priceKrw)}</span>
					<span style={{ fontSize: 12, fontWeight: 400 }}> / 1개월</span>
				</Typography>
				{product.tags?.includes("OTT") && (
					<Chip size="xsmall" variant="outlined">
						OTT
					</Chip>
				)}
			</CardContent>
		</Card>
	);
}

function Banner({
	title,
	caption,
	imageSrc,
	ratio = "2:1",
}: {
	title: string;
	caption?: string;
	imageSrc: string;
	ratio?: "2:1" | "21:9" | "16:9";
}) {
	return (
		<div style={{ paddingLeft: PAD_X, paddingRight: PAD_X }}>
			<Card platform="mobile" width="100%" flexDirection="column" gap={8}>
				<CardThumbnail src={imageSrc} alt={title} ratio={ratio} />
				<CardContent flexDirection="column" gap={2}>
					<CardTitle variant="body1" weight="bold">
						{title}
					</CardTitle>
					{caption && (
						<CardCaption variant="caption1" weight="medium">
							{caption}
						</CardCaption>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

// ─── page ────────────────────────────────────────────────────────────

export default function DiscoverV3WdsPage() {
	const [tab, setTab] = useState("discover");

	return (
		<FlexBox
			flexDirection="column"
			sx={{ width: "100%", height: "100%", flex: 1, minHeight: 0 }}
		>
			{/* SPEC-01 헤더 — variant="normal"로 일반 흐름. floating 오버랩 회피 */}
			<TopNavigation
				variant="normal"
				background
				trailingContent={
					<>
						<TopNavigationButton variant="icon" color="assistive">
							<IconSearch width={24} height={24} />
						</TopNavigationButton>
						<TopNavigationButton variant="icon" color="assistive">
							<PushBadge variant="number" count={1} position="top-right">
								<IconBusinessBag width={24} height={24} />
							</PushBadge>
						</TopNavigationButton>
					</>
				}
			/>

			<FlexBox
				flexDirection="column"
				gap={SECTION_GAP}
				sx={{
					flex: 1,
					minHeight: 0,
					overflowY: "auto",
					paddingTop: 8,
					paddingBottom: 24,
				}}
			>
				{/* SPEC-02 비로그인 컨텍스트 + 추천 */}
				<FlexBox flexDirection="column" gap={12}>
					<FlexBox
						flexDirection="column"
						gap={2}
						sx={{ paddingLeft: PAD_X, paddingRight: PAD_X }}
					>
						<Typography variant="caption1" weight="medium">
							통신사 상관없이 모두의 구독
						</Typography>
						<Typography variant="title2" weight="bold">
							T우주
						</Typography>
					</FlexBox>
					<HScroll>
						{mockProducts.slice(0, 6).map((p) => (
							<ProductCard key={p.id} product={p} />
						))}
					</HScroll>
				</FlexBox>

				{/* SPEC-03 실시간 인기 베스트 */}
				<FlexBox flexDirection="column" gap={12}>
					<SectionHeader
						title="실시간 인기 베스트"
						subTitle="집계 기반 · 매시간 갱신"
					/>
					<HScroll>
						{mockProducts.slice(0, 6).map((p) => (
							<ProductCard key={p.id} product={p} />
						))}
					</HScroll>
				</FlexBox>

				{/* SPEC-04 빅 배너 */}
				<Banner
					title="봄맞이 구독 페스타 최대 50%"
					caption="기간 한정 프로모션"
					imageSrc="https://picsum.photos/seed/bigbanner/800/400"
					ratio="2:1"
				/>

				{/* SPEC-05 신규 오픈 */}
				<FlexBox flexDirection="column" gap={12}>
					<SectionHeader title="신규 오픈" subTitle="최근 30일 내 최신순" />
					<HScroll>
						{mockProducts.slice(4, 10).map((p) => (
							<ProductCard key={p.id} product={p} />
						))}
					</HScroll>
				</FlexBox>

				{/* SPEC-06 일반 배너 */}
				<Banner
					title="넷플릭스 3개월 무료 체험"
					caption="신규 가입자 전용"
					imageSrc="https://picsum.photos/seed/banner2/800/280"
					ratio="21:9"
				/>

				{/* SPEC-07 인기 OTT (전체보기) */}
				<FlexBox flexDirection="column" gap={12}>
					<SectionHeader
						title="인기 OTT"
						onMore={() => {
							/* /category/ott 이동 자리 */
						}}
					/>
					<HScroll>
						{mockProducts
							.filter((p) => p.tags?.includes("OTT"))
							.map((p) => (
								<ProductCard key={p.id} product={p} />
							))}
					</HScroll>
				</FlexBox>

				{/* SPEC-08 장기 구독 할인 */}
				<FlexBox flexDirection="column" gap={12}>
					<SectionHeader
						title="장기 구독 할인"
						subTitle="12개월 약정 시 추가 할인"
					/>
					<HScroll>
						{mockProducts
							.filter((p) => p.discountRate)
							.map((p) => (
								<ProductCard key={p.id} product={p} />
							))}
					</HScroll>
				</FlexBox>

				{/* SPEC-09 SKT 단일 카드 */}
				<FlexBox flexDirection="column" gap={12}>
					<FlexBox
						flexDirection="column"
						gap={2}
						sx={{ paddingLeft: PAD_X, paddingRight: PAD_X }}
					>
						<Typography variant="title3" weight="bold">
							SKT 가입 고객 전용 혜택
						</Typography>
					</FlexBox>
					<div style={{ paddingLeft: PAD_X, paddingRight: PAD_X }}>
						<ProductCard product={mockProducts[0]} width={328} />
					</div>
				</FlexBox>
			</FlexBox>

			{/* SPEC-10 GNB */}
			<BottomNavigation value={tab} onValueChange={setTab}>
				<BottomNavigationItem
					value="discover"
					label="발견"
					icon={<IconHome width={24} height={24} />}
				/>
				<BottomNavigationItem
					value="category"
					label="카테고리"
					icon={<IconList width={24} height={24} />}
				/>
				<BottomNavigationItem
					value="subscription"
					label="나의 구독"
					icon={<IconPerson width={24} height={24} />}
				/>
			</BottomNavigation>
		</FlexBox>
	);
}
