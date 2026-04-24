"use client";

import { FlexBox, Typography } from "@wanteddev/wds";
import { IconCircleInfo } from "@wanteddev/wds-icon";
import type { ReactNode } from "react";

import { Placeholder } from "@/components/home-kit";
import { ButtonIconTextBackgroundPilot } from "./ButtonIconTextBackgroundPilot";
import { IndicatorDotPilot } from "./IndicatorDotPilot";

// Figma .org/card-product-recommand (336×~555) — 묶음 상품 추천 organism
// Source: data/binding/overrides/org-card-product-recommand.json
export function OrgCardProductRecommandPilot({
	showText = true,
	title = "타이틀 컨텍스트 영역\n최대 두 줄 입력",
	showSub = true,
	showIco = true,
	icon,
	sub = "서브 텍스트 최대 한 줄",
	slotProduct,
	showInfo = true,
	info = "첫 구독",
	price = "12,900원",
	period = "/1개월",
	showSlotBadge = true,
	slotBadge,
	ctaLabel = "구성 담기 +",
	onCta,
	showPagination = true,
	paginationCount = 2,
	paginationActive = 0,
}: {
	showText?: boolean;
	title?: string;
	showSub?: boolean;
	showIco?: boolean;
	icon?: ReactNode;
	sub?: string;
	slotProduct?: ReactNode;
	showInfo?: boolean;
	info?: string;
	price?: string;
	period?: string;
	showSlotBadge?: boolean;
	slotBadge?: ReactNode;
	ctaLabel?: string;
	onCta?: () => void;
	showPagination?: boolean;
	paginationCount?: number;
	paginationActive?: number;
}) {
	return (
		<FlexBox flexDirection="column" gap={20} alignItems="center" sx={{ width: 336 }}>
			{showText && (
				<FlexBox flexDirection="column" gap={9} sx={{ width: "100%", padding: "0 12px" }}>
					<Typography
						variant="heading2"
						weight="medium"
						sx={{
							fontSize: 28,
							lineHeight: "32px",
							letterSpacing: "-0.05em",
							color: "#000",
							display: "-webkit-box",
							WebkitLineClamp: 2,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
							whiteSpace: "pre-line",
						}}
					>
						{title}
					</Typography>
					{showSub && (
						<FlexBox flexDirection="row" gap={4} alignItems="center" sx={{ width: "100%" }}>
							{showIco && (icon ?? <IconCircleInfo width={18} height={18} />)}
							<Typography
								variant="label1"
								weight="regular"
								sx={{
									fontSize: 14,
									lineHeight: "20px",
									color: "#000",
									flex: 1,
									minWidth: 0,
									display: "block",
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
			)}

			<div
				style={{
					width: "100%",
					background: "white",
					borderRadius: 30,
					boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
					padding: "20px 0",
					display: "flex",
					flexDirection: "column",
					gap: 16,
					alignItems: "center",
					overflow: "hidden",
				}}
			>
				<div
					style={{
						width: "100%",
						minHeight: slotProduct ? "auto" : 345,
						display: "flex",
						alignItems: "stretch",
						justifyContent: "stretch",
						overflow: "hidden",
					}}
				>
					{slotProduct ?? <Placeholder w="100%" h="100%" label="slot" />}
				</div>

				<FlexBox
					flexDirection="column"
					gap={15}
					alignItems="center"
					sx={{ width: "100%", padding: "0 24px" }}
				>
					<FlexBox
						flexDirection="row"
						justifyContent="space-between"
						alignItems="center"
						sx={{ width: "100%" }}
					>
						<FlexBox flexDirection="column" gap={7} sx={{ width: 156 }}>
							<FlexBox flexDirection="row" gap={2} alignItems="baseline">
								{showInfo && (
									<Typography
										variant="body1"
										weight="bold"
										sx={{ fontSize: 16, lineHeight: "20px", color: "#3617ce" }}
									>
										{info}
									</Typography>
								)}
								<Typography
									variant="body1"
									weight="bold"
									sx={{ fontSize: 16, lineHeight: "20px", color: "#000" }}
								>
									{price}
								</Typography>
								<Typography
									variant="caption1"
									weight="bold"
									sx={{ fontSize: 12, lineHeight: "14px", color: "#000" }}
								>
									{period}
								</Typography>
							</FlexBox>
							{showSlotBadge && (
								<div
									style={{
										width: "100%",
										display: "flex",
										alignItems: "stretch",
										justifyContent: "stretch",
										padding: "2px 0",
									}}
								>
									{slotBadge ?? <Placeholder w="100%" h="100%" label="badge" />}
								</div>
							)}
						</FlexBox>
						<ButtonIconTextBackgroundPilot
							text={ctaLabel}
							type="fill"
							size="middle"
							onClick={onCta}
						/>
					</FlexBox>

					{showPagination && (
						<FlexBox flexDirection="row" gap={4} alignItems="center" justifyContent="center">
							{Array.from({ length: paginationCount }).map((_, i) => (
								<IndicatorDotPilot
									key={i}
									state={i === paginationActive ? "selected" : "default"}
								/>
							))}
						</FlexBox>
					)}
				</FlexBox>
			</div>
		</FlexBox>
	);
}
