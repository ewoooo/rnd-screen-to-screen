"use client";

import type { ReactNode } from "react";
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

import type { MockProduct } from "@/fixtures/products";

// v5-compound 전용 컴파운드 캡슐.
// registry/wds-component-compound-layout-registry.json 의 C1/C3/C4/C6/C7 계약을
// 컴포넌트 경계로 1:1 구현. page.tsx 는 이 경계만 조립.

const PAD_X = 16;
const CARD_W = 240;
const krw = (n: number) => `${n.toLocaleString("ko-KR")}원`;

// ── C1 ogn/header ──────────────────────────────────────────────────────
// variants: discover_main | product_detail
export function C1Header({
	variant = "discover_main",
	cartCount = 0,
}: {
	variant?: "discover_main" | "product_detail";
	cartCount?: number;
}) {
	return (
		<TopNavigation
			variant="normal"
			background
			leadingContent={
				variant === "discover_main" ? (
					<TopNavigationButton variant="icon" color="assistive">
						<IconHome width={24} height={24} />
					</TopNavigationButton>
				) : undefined
			}
			trailingContent={
				<>
					<TopNavigationButton variant="icon" color="assistive">
						<IconSearch width={24} height={24} />
					</TopNavigationButton>
					<TopNavigationButton variant="icon" color="assistive">
						{cartCount > 0 ? (
							<PushBadge
								variant="number"
								count={cartCount}
								position="top-right"
							>
								<IconBusinessBag width={24} height={24} />
							</PushBadge>
						) : (
							<IconBusinessBag width={24} height={24} />
						)}
					</TopNavigationButton>
				</>
			}
		/>
	);
}

// ── C4 mlc/card ────────────────────────────────────────────────────────
// variants: main_list_card | skt_benefit | related
export function C4Card({
	product,
	variant = "main_list_card",
	width = CARD_W,
}: {
	product: MockProduct;
	variant?: "main_list_card" | "skt_benefit" | "related";
	width?: number | string;
}) {
	if (variant === "skt_benefit") {
		return (
			<Card platform="mobile" width="100%" flexDirection="row" gap={12}>
				<div style={{ width: 120, flexShrink: 0 }}>
					<CardThumbnail
						src={product.thumbnailUrl}
						alt={product.title}
						ratio="1:1"
					/>
				</div>
				<CardContent flexDirection="column" gap={4}>
					<CardCaption variant="caption1" weight="medium">
						{product.brand}
					</CardCaption>
					<CardTitle variant="body1" weight="bold">
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
				</CardContent>
			</Card>
		);
	}
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

// ── C3 mlc/list ────────────────────────────────────────────────────────
// variants: personalized_context | best | new_open | ott_popular | long_subscribe | related_product
// structure: 섹션 헤더(제목 + 전체보기) + 가로 스크롤 카드 리스트
export function C3List({
	title,
	subTitle,
	eyebrow,
	onMore,
	products,
}: {
	title?: string;
	subTitle?: string;
	eyebrow?: string;
	onMore?: () => void;
	products: MockProduct[];
}) {
	return (
		<FlexBox flexDirection="column" gap={12}>
			{(title || eyebrow) && (
				<FlexBox
					flexDirection="row"
					justifyContent="space-between"
					alignItems="flex-end"
					sx={{ paddingLeft: PAD_X, paddingRight: PAD_X }}
				>
					<FlexBox flexDirection="column" gap={4}>
						{eyebrow && (
							<Typography variant="caption1" weight="medium">
								{eyebrow}
							</Typography>
						)}
						{title && (
							<Typography variant="title3" weight="bold">
								{title}
							</Typography>
						)}
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
			)}
			<ScrollArea scrollbars="horizontal">
				<FlexBox
					flexDirection="row"
					gap={12}
					sx={{ paddingLeft: PAD_X, paddingRight: PAD_X }}
				>
					{products.map((p) => (
						<C4Card key={p.id} product={p} />
					))}
				</FlexBox>
			</ScrollArea>
		</FlexBox>
	);
}

// ── C6 atom/banner ─────────────────────────────────────────────────────
// registry에는 atom이지만 layout 책임이 있어 compound와 같은 경계에서 캡슐화.
export function C6Banner({
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

// ── C7 ogn/GNB ─────────────────────────────────────────────────────────
export type GnbTab = "discover" | "category" | "subscription";
export function C7Gnb({
	value,
	onValueChange,
}: {
	value: GnbTab;
	onValueChange: (v: GnbTab) => void;
}) {
	return (
		<BottomNavigation
			value={value}
			onValueChange={(v) => onValueChange(v as GnbTab)}
		>
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
	);
}

// ── layout helper (not a compound) ─────────────────────────────────────
export function SktSection({
	title,
	children,
}: {
	title: string;
	children: ReactNode;
}) {
	return (
		<FlexBox flexDirection="column" gap={12}>
			<FlexBox
				flexDirection="column"
				gap={2}
				sx={{ paddingLeft: PAD_X, paddingRight: PAD_X }}
			>
				<Typography variant="title3" weight="bold">
					{title}
				</Typography>
			</FlexBox>
			<div style={{ paddingLeft: PAD_X, paddingRight: PAD_X }}>{children}</div>
		</FlexBox>
	);
}
