"use client";

import { Button, FlexBox, PageCounter, Typography } from "@wanteddev/wds";
import { IconArrowRight } from "@wanteddev/wds-icon";

// Figma banner-contents (C6) → WDS 컴포넌트 조합 (전용 Banner 없음)
// Source: data/binding/overrides/banner-contents.json
export function BannerContentsPilot({
	title = "한 줄 또는 두 줄까지 노출되는\n프로모션 타이틀",
	subTitle = "서브 타이틀 한 줄",
	imageSrc,
	currentPage = 1,
	totalPages = 5,
	dDay = "D-7",
	date = "11월 11일 11시",
	info = "23%",
	price = "9,900원",
	month = "/1개월",
	ctaLabel = "보러가기",
	areaContents = true,
	areaPageControl = true,
	onCtaClick,
}: {
	title?: string;
	subTitle?: string;
	imageSrc?: string;
	currentPage?: number;
	totalPages?: number;
	dDay?: string;
	date?: string;
	info?: string;
	price?: string;
	month?: string;
	ctaLabel?: string;
	areaContents?: boolean;
	areaPageControl?: boolean;
	onCtaClick?: () => void;
}) {
	return (
		<FlexBox flexDirection="column" gap={12} sx={{ width: 336 }}>
			{/* mol/banner: 336×162 — 전용 컴포넌트 없어 div + Typography 합성 */}
			<div
				style={{
					position: "relative",
					height: 162,
					borderRadius: 35,
					overflow: "hidden",
					backgroundColor: "#333",
					backgroundImage: imageSrc ? `url(${imageSrc})` : undefined,
					backgroundSize: "cover",
					backgroundPosition: "center",
					boxShadow: "0px 4px 15px 0px rgba(0,0,0,0.1)",
					padding: 18,
					color: "#fff",
				}}
			>
				<FlexBox flexDirection="column" gap={4}>
					<Typography
						variant="headline1"
						weight="medium"
						sx={{
							color: "#fff",
							fontSize: 18,
							lineHeight: "20px",
							letterSpacing: "-0.05em",
							whiteSpace: "pre-line",
						}}
					>
						{title}
					</Typography>
					<Typography
						variant="caption1"
						weight="medium"
						sx={{
							color: "#fff",
							opacity: 0.7,
							fontSize: 12,
							lineHeight: "14px",
							letterSpacing: "-0.05em",
						}}
					>
						{subTitle}
					</Typography>
				</FlexBox>
				<div
					style={{
						position: "absolute",
						right: 18,
						bottom: 18,
						backdropFilter: "blur(2px)",
						borderRadius: 30,
					}}
				>
					<PageCounter
						size="small"
						currentPage={currentPage}
						totalPages={totalPages}
						alternative
					/>
				</div>
			</div>

			{areaContents && (
				<FlexBox
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
					gap={12}
				>
					<FlexBox flexDirection="column" gap={4}>
						<FlexBox flexDirection="row" gap={6} alignItems="center">
							<Typography
								variant="caption1"
								weight="bold"
								sx={{
									color: "var(--semantic-text-accent-violet)",
									fontSize: 12,
									lineHeight: "14px",
								}}
							>
								{dDay}
							</Typography>
							<Typography
								variant="caption1"
								weight="medium"
								sx={{ fontSize: 12, lineHeight: "14px" }}
							>
								{date}
							</Typography>
						</FlexBox>
						<Typography
							variant="body1"
							weight="bold"
							sx={{ fontSize: 16, lineHeight: "20px", letterSpacing: "-0.05em" }}
						>
							<span style={{ color: "var(--semantic-text-accent-violet)" }}>{info} </span>
							<span>{price}</span>
							<span style={{ fontSize: 12 }}>{month}</span>
						</Typography>
					</FlexBox>
					<Button
						variant="solid"
						color="primary"
						size="medium"
						trailingContent={<IconArrowRight width={16} height={16} />}
						onClick={onCtaClick}
					>
						{ctaLabel}
					</Button>
				</FlexBox>
			)}

			{areaPageControl && (
				<FlexBox flexDirection="row" justifyContent="center" gap={6}>
					{Array.from({ length: totalPages }).map((_, i) => (
						<span
							key={i}
							style={{
								width: i + 1 === currentPage ? 16 : 6,
								height: 6,
								borderRadius: 3,
								backgroundColor:
									i + 1 === currentPage
										? "var(--semantic-background-inverse)"
										: "var(--semantic-line-normal)",
								transition: "width .2s",
							}}
						/>
					))}
				</FlexBox>
			)}
		</FlexBox>
	);
}
