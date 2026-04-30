"use client";

import { FlexBox, Typography } from "@wanteddev/wds";
import { IconArrowRight } from "@wanteddev/wds-icon";
import type { ReactNode } from "react";

import { Placeholder } from "@/components/home-kit";
import { BadgeAiPickPilot } from "./BadgeAiPickPilot";
import { BadgeLabelTextPilot } from "./BadgeLabelTextPilot";
import { BadgePassProductPilot } from "./BadgePassProductPilot";
import { ButtonIconTextBackgroundPilot } from "./ButtonIconTextBackgroundPilot";
import { ImgRectanglePilot } from "./ImgRectanglePilot";

const dotDividerStyle = {
	width: "100%",
	height: 1,
	background:
		"repeating-linear-gradient(90deg, #d6d6d6 0 4px, transparent 4px 8px)",
} as const;

// Figma .org/card-product-pass (336×674) — 패스 상품 organism, 이중 카드 + image overlap + dot divider
// Source: data/binding/overrides/org-card-product-pass.json
export function OrgCardProductPassPilot({
	showOuterTitle = true,
	outerTitle = "다양한 상품을\n하나의 패스로",
	outerSub = "2개 구성 상품이에요",
	showOuterSubIco = true,
	thumbnailSrc,
	passLabel = "PASS",
	innerTitle = "미디어 패스",
	innerSub = "기본 상품을 1개 선택해 이용할 수 있어요",
	info = "첫 구독",
	price = "1,000원",
	period = "/1개월",
	showSlotBadge = true,
	slotBadge,
	ctaLabel = "구성 담기 +",
	onCta,
	showOuterBtn = true,
	outerBtnLabel = "더 많은 패스 보러가기",
	onOuterBtn,
	slot,
}: {
	showOuterTitle?: boolean;
	outerTitle?: string;
	outerSub?: string;
	showOuterSubIco?: boolean;
	thumbnailSrc?: string;
	passLabel?: string;
	innerTitle?: string;
	innerSub?: string;
	info?: string;
	price?: string;
	period?: string;
	showSlotBadge?: boolean;
	slotBadge?: ReactNode;
	ctaLabel?: string;
	onCta?: () => void;
	showOuterBtn?: boolean;
	outerBtnLabel?: string;
	onOuterBtn?: () => void;
	slot?: ReactNode;
}) {
	return (
		<FlexBox flexDirection="column" gap={25} alignItems="center" sx={{ width: 336 }}>
			{showOuterTitle && (
				<FlexBox flexDirection="column" gap={8} sx={{ width: "100%", padding: "0 12px" }}>
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
						{outerTitle}
					</Typography>
					<FlexBox flexDirection="row" gap={4} alignItems="center" sx={{ width: "100%" }}>
						{showOuterSubIco && <BadgeAiPickPilot />}
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
							{outerSub}
						</Typography>
					</FlexBox>
				</FlexBox>
			)}

			<div
				style={{
					position: "relative",
					width: 336,
					boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
					borderRadius: 30,
					background: "white",
					overflow: "visible",
				}}
			>
				<div
					style={{
						position: "absolute",
						right: 24,
						top: -28,
						zIndex: 2,
						transform: "rotate(8deg)",
					}}
				>
					<ImgRectanglePilot src={thumbnailSrc} size="medium" type="pass-product" alt={innerTitle} />
				</div>

				<div
					style={{
						background: "white",
						borderTopLeftRadius: 30,
						borderTopRightRadius: 30,
						padding: "37px 24px 18px",
						display: "flex",
						flexDirection: "column",
						gap: 35,
					}}
				>
					<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
						<BadgePassProductPilot text={passLabel} />
						<Typography
							variant="headline1"
							weight="bold"
							sx={{
								fontSize: 18,
								lineHeight: "24px",
								color: "#000",
								display: "block",
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap",
								maxWidth: 220,
							}}
						>
							{innerTitle}
						</Typography>
						<Typography
							variant="caption1"
							weight="medium"
							sx={{ fontSize: 12, lineHeight: "14px", color: "#a0a0a0" }}
						>
							{innerSub}
						</Typography>
					</div>

					<div
						style={{
							width: 288,
							minHeight: slot ? "auto" : 200,
							display: "flex",
							alignItems: "stretch",
							justifyContent: "stretch",
							alignSelf: "center",
						}}
					>
						{slot ?? <Placeholder w="100%" h="100%" label="slot" />}
					</div>
				</div>

				<div style={{ padding: "0 16px" }}>
					<div style={dotDividerStyle} />
				</div>

				<div
					style={{
						background: "white",
						borderBottomLeftRadius: 30,
						borderBottomRightRadius: 30,
						padding: "16px 24px 24px",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<FlexBox flexDirection="column" gap={7} sx={{ width: 156 }}>
						<FlexBox flexDirection="row" gap={2} alignItems="baseline">
							<Typography
								variant="body1"
								weight="bold"
								sx={{ fontSize: 16, lineHeight: "20px", color: "#3617ce" }}
							>
								{info}
							</Typography>
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
							<div style={{ display: "flex", gap: 4, alignItems: "center" }}>
								{slotBadge ?? (
									<>
										<BadgeLabelTextPilot text="BEST" />
										<Typography
											variant="caption1"
											weight="medium"
											sx={{ fontSize: 12, lineHeight: "14px", color: "#a0a0a0" }}
										>
											플러스 할인
										</Typography>
									</>
								)}
							</div>
						)}
					</FlexBox>
					<ButtonIconTextBackgroundPilot
						text={ctaLabel}
						type="fill"
						size="middle"
						onClick={onCta}
					/>
				</div>
			</div>

			{showOuterBtn && (
				<button
					type="button"
					onClick={onOuterBtn}
					style={{
						background: "white",
						border: "1px solid #f2f2f2",
						borderRadius: 14,
						padding: "4px 8px 4px 12px",
						display: "flex",
						alignItems: "center",
						gap: 2,
						cursor: onOuterBtn ? "pointer" : "default",
					}}
				>
					<Typography
						variant="label1"
						weight="bold"
						sx={{ fontSize: 14, lineHeight: "20px", color: "#1a1a1a" }}
					>
						{outerBtnLabel}
					</Typography>
					<IconArrowRight width={16} height={16} />
				</button>
			)}
		</FlexBox>
	);
}
