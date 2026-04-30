"use client";

import { Card, FlexBox, TextButton, Typography } from "@wanteddev/wds";

import { Placeholder } from "@/components/home-kit";
import { IconChevronRight } from "@wanteddev/wds-icon";
import type { ReactNode } from "react";

// Figma .org/card-product (organism, size m/l) → 카드 컨테이너 organism
// Source: data/binding/overrides/org-card-product.json
export function OrgCardProductPilot({
	size = "l",
	showTxt = true,
	title = "타이틀 컨텍스트 영역 최대 두 줄까지 가능",
	showSub = true,
	showIcoSub = true,
	showIcoTxt = true,
	icon,
	sub = "서브 텍스트 최대 한 줄",
	showBtn = true,
	btnLabel = "전체보기",
	slot,
	onBtn,
}: {
	size?: "m" | "l";
	showTxt?: boolean;
	title?: string;
	showSub?: boolean;
	showIcoSub?: boolean;
	showIcoTxt?: boolean;
	icon?: ReactNode;
	sub?: string;
	showBtn?: boolean;
	btnLabel?: string;
	slot?: ReactNode;
	onBtn?: () => void;
}) {
	const isL = size === "l";
	const slotHeight = isL ? 637 : 214;
	const titleSize = isL ? 28 : 20;

	const aiBadge = icon ?? (
		<div
			style={{
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "1px 6px",
				border: "1px solid #1a1a1a",
				borderRadius: 4,
				fontSize: 10,
				fontWeight: 700,
				lineHeight: "11px",
				color: "#1a1a1a",
			}}
		>
			AI PICK
		</div>
	);

	return (
		<FlexBox flexDirection="column" gap={20} alignItems="flex-start" sx={{ width: 336 }}>
			{showTxt && isL && (
				<FlexBox flexDirection="column" gap={8} sx={{ width: "100%", padding: "0 12px" }}>
					<Typography
						sx={{
							fontSize: titleSize,
							lineHeight: "32px",
							letterSpacing: "-0.04em",
							fontWeight: 500,
							display: "-webkit-box",
							WebkitLineClamp: 2,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
						}}
					>
						{title}
					</Typography>
					{showSub && (
						<FlexBox flexDirection="row" gap={4} alignItems="center">
							{showIcoSub && aiBadge}
							<Typography variant="label1" weight="regular">
								{sub}
							</Typography>
						</FlexBox>
					)}
				</FlexBox>
			)}

			{showTxt && !isL && (
				<FlexBox flexDirection="column" gap={2} sx={{ width: "100%", padding: "0 12px" }}>
					<FlexBox flexDirection="row" gap={2} alignItems="center">
						<Typography
							sx={{
								fontSize: titleSize,
								lineHeight: "32px",
								letterSpacing: "-0.05em",
								fontWeight: 500,
							}}
						>
							{title}
						</Typography>
						{showIcoTxt && <IconChevronRight width={24} height={24} />}
					</FlexBox>
					{showSub && (
						<FlexBox flexDirection="row" gap={4} alignItems="center">
							{showIcoSub && aiBadge}
							<Typography variant="label1" weight="regular">
								{sub}
							</Typography>
						</FlexBox>
					)}
				</FlexBox>
			)}

			<Card
				platform="mobile"
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
				gap={40}
				sx={{
					padding: "40px 16px 0",
					borderRadius: 30,
					background: "white",
					boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
					overflow: "hidden",
					width: "100%",
				}}
			>
				<div
					style={{
						width: 304,
						height: slotHeight,
						display: "flex",
						alignItems: "stretch",
						justifyContent: "stretch",
						flexDirection: "column",
					}}
				>
					{slot ?? <Placeholder w="100%" h="100%" label="slot" />}
				</div>
				{showBtn && (
					<FlexBox flexDirection="column" alignItems="center" sx={{ width: "100%" }}>
						<div style={{ width: 267.81, height: 1, background: "#f6f6f6" }} />
						<FlexBox
							flexDirection="column"
							alignItems="center"
							sx={{ width: "100%", padding: "14px 10px 20px" }}
						>
							<TextButton
								color="primary"
								size="small"
								trailingContent={<IconChevronRight width={16} height={16} />}
								onClick={onBtn}
							>
								{btnLabel}
							</TextButton>
						</FlexBox>
					</FlexBox>
				)}
			</Card>
		</FlexBox>
	);
}
