"use client";

import { useState, type ReactNode } from "react";
import {
	Card,
	CardCaption,
	CardContent,
	CardThumbnail,
	CardTitle,
	Chip,
	FlexBox,
	Typography,
} from "@wanteddev/wds";
import { IconArrowRight } from "@wanteddev/wds-icon";

import { BadgeAiPickPilot } from "@/components/pilot-kit/BadgeAiPickPilot";
import { BannerPilot } from "@/components/pilot-kit/BannerPilot";
import { GnbPilot } from "@/components/pilot-kit/GnbPilot";
import { HeaderPilot } from "@/components/pilot-kit/HeaderPilot";
import { ListPilot } from "@/components/pilot-kit/ListPilot";
import { OrgCardProductPassPilot } from "@/components/pilot-kit/OrgCardProductPassPilot";
import { mockProducts, type MockProduct } from "./_mock";

// Discover v7-editorial — Figma "Layout Best Practice / 04_pass" 의 quality 기준 적용.
// 원칙:
//  1) Display 헤드라인 (2줄) + AI-PICK 아이콘 서브라인
//  2) 섹션 gap 48 / horizontal padding 24 — generous whitespace
//  3) Hero composition (focal 1개) + 보조 carousel
//  4) 오버랩/고품질 시각 요소 — SPEC-09는 OrgCardProductPassPilot 직접 차용
//  5) 섹션 하단 중앙 pill CTA "더 많은 X 보러가기"
// 화면 명세: data/screens/TU-DSP-MAIN-MO-02-PG-001-1.json (비로그인)

const krw = (n: number) => `${n.toLocaleString("ko-KR")}원`;
const PAD_X = 24;
const SECTION_GAP = 48;

// 제품 셀 — v5 방식 선호 (WDS Card 저수준 조립, compact gap, 1:1, 가격 composite).
// CardVerticalProductMediumPilot(228 고정 / 20+50 padding) 은 browse feed 에 과함.
// thumbnailSrc 미지정 시 WDS CardThumbnail 이 투명 placeholder 렌더 (플레이스홀더 투명 규약).
function EditorialProductCell({ product }: { product: MockProduct }) {
	return (
		<Card
			platform="mobile"
			width={240}
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

// Editorial 섹션 헤더 — OrgCardProductPassPilot의 outer title 패턴을 따름
// (fontSize 28/32, 2-line, AI-PICK + 14px sub)
function EditorialSectionHeader({
	title,
	sub,
	eyebrow,
}: {
	title: string;
	sub?: string;
	eyebrow?: ReactNode;
}) {
	return (
		<FlexBox
			flexDirection="column"
			gap={8}
			sx={{ paddingLeft: PAD_X, paddingRight: PAD_X, width: "100%" }}
		>
			{eyebrow}
			<Typography
				variant="heading2"
				weight="medium"
				sx={{
					fontSize: 28,
					lineHeight: "32px",
					letterSpacing: "-0.05em",
					color: "#000",
					whiteSpace: "pre-line",
					display: "-webkit-box",
					WebkitLineClamp: 2,
					WebkitBoxOrient: "vertical",
					overflow: "hidden",
				}}
			>
				{title}
			</Typography>
			{sub && (
				<FlexBox flexDirection="row" gap={4} alignItems="center">
					<BadgeAiPickPilot />
					<Typography
						variant="label1"
						weight="regular"
						sx={{
							fontSize: 14,
							lineHeight: "20px",
							color: "#000",
							flex: 1,
							minWidth: 0,
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
						}}
					>
						{sub}
					</Typography>
				</FlexBox>
			)}
		</FlexBox>
	);
}

// OrgCardProductPassPilot의 outer 버튼과 같은 스타일 — "더 많은 X 보러가기" pill
function SectionMoreButton({
	label,
	onClick,
}: {
	label: string;
	onClick?: () => void;
}) {
	return (
		<FlexBox justifyContent="center" sx={{ width: "100%" }}>
			<button
				type="button"
				onClick={onClick}
				style={{
					background: "white",
					border: "1px solid #f2f2f2",
					borderRadius: 14,
					padding: "4px 8px 4px 12px",
					display: "flex",
					alignItems: "center",
					gap: 2,
					cursor: onClick ? "pointer" : "default",
				}}
			>
				<Typography
					variant="label1"
					weight="bold"
					sx={{ fontSize: 14, lineHeight: "20px", color: "#1a1a1a" }}
				>
					{label}
				</Typography>
				<IconArrowRight width={16} height={16} />
			</button>
		</FlexBox>
	);
}

// Editorial 섹션: 헤더 + carousel + pill CTA
function EditorialSection({
	title,
	sub,
	eyebrow,
	products,
	moreLabel,
	onMore,
}: {
	title: string;
	sub?: string;
	eyebrow?: ReactNode;
	products: MockProduct[];
	moreLabel?: string;
	onMore?: () => void;
}) {
	return (
		<FlexBox flexDirection="column" gap={20}>
			<EditorialSectionHeader title={title} sub={sub} eyebrow={eyebrow} />
			<ListPilot title="" direction="horizontal">
				{products.map((p) => (
					<EditorialProductCell key={p.id} product={p} />
				))}
			</ListPilot>
			{moreLabel && <SectionMoreButton label={moreLabel} onClick={onMore} />}
		</FlexBox>
	);
}

export default function DiscoverV7EditorialPage() {
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
				gap={SECTION_GAP}
				sx={{
					flex: 1,
					minHeight: 0,
					overflowY: "auto",
					paddingTop: 16,
					paddingBottom: 40,
				}}
			>
				{/* SPEC-02 비로그인 컨텍스트 — display 헤드라인 "T우주" */}
				<EditorialSection
					eyebrow={
						<Typography
							variant="caption1"
							weight="medium"
							sx={{ fontSize: 12, lineHeight: "14px", color: "#a0a0a0" }}
						>
							통신사 상관없이 모두의 구독
						</Typography>
					}
					title={"T우주\n모두의 구독"}
					sub="로그인 없이 바로 둘러보기"
					products={mockProducts.slice(0, 6)}
				/>

				{/* SPEC-03 베스트 */}
				<EditorialSection
					title={"지금 가장 많이\n고른 베스트"}
					sub="집계 기반 · 매시간 갱신"
					products={mockProducts.slice(0, 6)}
					moreLabel="더 많은 베스트 보러가기"
					onMore={() => {}}
				/>

				{/* SPEC-04 빅 배너 */}
				<FlexBox sx={{ paddingLeft: 12, paddingRight: 12 }}>
					<BannerPilot
						size="midium"
						title="봄맞이 구독 페스타 최대 50%"
						subTitle="기간 한정 프로모션"
						imageSrc="https://picsum.photos/seed/bigbanner/800/400"
					/>
				</FlexBox>

				{/* SPEC-05 신규 오픈 */}
				<EditorialSection
					title={"이번 달 새로\n등장한 구독"}
					sub="최근 30일 내 최신순"
					products={mockProducts.slice(4, 10)}
				/>

				{/* SPEC-06 일반 배너 */}
				<BannerPilot
					size="small"
					title="넷플릭스 3개월 무료 체험"
					subTitle="신규 가입자 전용"
					imageSrc="https://picsum.photos/seed/banner2/800/280"
				/>

				{/* SPEC-07 인기 OTT */}
				<EditorialSection
					title={"OTT 한 번에\n골라 구독하기"}
					sub="인기순 TOP"
					products={ottProducts}
					moreLabel="더 많은 OTT 보러가기"
					onMore={() => {}}
				/>

				{/* SPEC-08 장기 구독 할인 */}
				<EditorialSection
					title={"오래 쓸 수록\n더 할인"}
					sub="12개월 약정 시 추가 할인"
					products={discounted}
				/>

				{/* SPEC-09 SKT — Figma 04_pass 그대로 (OrgCardProductPassPilot) */}
				<FlexBox justifyContent="center" sx={{ width: "100%" }}>
					<OrgCardProductPassPilot
						outerTitle={"SKT 가입 고객\n전용 PASS 혜택"}
						outerSub="T 요금제 기반 구성"
						thumbnailSrc={mockProducts[0].thumbnailUrl}
						passLabel="SKT PASS"
						innerTitle="미디어 패스"
						innerSub="기본 상품을 1개 선택해 이용할 수 있어요"
						info="첫 구독"
						price="1,000원"
						period=" / 1개월"
						ctaLabel="구성 담기 +"
						outerBtnLabel="더 많은 패스 보러가기"
						onCta={() => {}}
						onOuterBtn={() => {}}
					/>
				</FlexBox>
			</FlexBox>

			{/* SPEC-10 GNB (C7) */}
			<GnbPilot value={tab} onValueChange={setTab} />
		</FlexBox>
	);
}
