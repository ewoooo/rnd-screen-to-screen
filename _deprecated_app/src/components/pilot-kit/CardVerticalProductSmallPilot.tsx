"use client";

import {
	Card,
	CardCaption,
	CardContent,
	CardTitle,
	IconButton,
	Typography,
} from "@wanteddev/wds";
import { IconPlus } from "@wanteddev/wds-icon";
import type { ReactNode } from "react";

import { Placeholder } from "@/components/home-kit";
import { ButtonChipPilot } from "./ButtonChipPilot";
import { ImgRectanglePilot } from "./ImgRectanglePilot";

// Figma card-vertical-product/small (molecule) → WDS Card raw 컨테이너
// Source: data/binding/overrides/card-vertical-product-small.json
export function CardVerticalProductSmallPilot({
	thumbnailSrc,
	brand = "brand name",
	title = "어드민 지정 타이틀 텍스트 최대 두 줄",
	infoSmall = "23%",
	priceOrigin = "39,900원",
	infoLarge = "23%",
	price = "29,900원",
	month = "/1개월",
	chipLabel = "구매",
	showInfoSmall = true,
	showInfoLarge = true,
	showPriceMonth = true,
	showSlot = true,
	showAdd = true,
	showChip = true,
	slotBadge,
	onAdd,
	onChip,
	onClick,
}: {
	thumbnailSrc?: string;
	brand?: string;
	title?: string;
	infoSmall?: string;
	priceOrigin?: string;
	infoLarge?: string;
	price?: string;
	month?: string;
	chipLabel?: string;
	showInfoSmall?: boolean;
	showInfoLarge?: boolean;
	showPriceMonth?: boolean;
	showSlot?: boolean;
	showAdd?: boolean;
	showChip?: boolean;
	slotBadge?: ReactNode;
	onAdd?: () => void;
	onChip?: () => void;
	onClick?: () => void;
}) {
	return (
		<Card
			platform="mobile"
			flexDirection="column"
			gap={16}
			width={142}
			flexShrink={0}
			onClick={onClick}
			sx={{ background: "transparent", boxShadow: "none", padding: 0 }}
		>
			<div style={{ position: "relative", width: 136, height: 136 }}>
				<ImgRectanglePilot src={thumbnailSrc} size="medium" alt={title} />
				{showAdd && (
					<div style={{ position: "absolute", left: 100, top: 100 }}>
						<IconButton
							variant="solid"
							size="small"
							onClick={(e) => {
								e.stopPropagation();
								onAdd?.();
							}}
						>
							<IconPlus width={14} height={14} />
						</IconButton>
					</div>
				)}
			</div>

			<CardContent flexDirection="column" gap={10} sx={{ width: "100%" }}>
				<CardCaption variant="caption1" weight="medium">
					{brand}
				</CardCaption>
				<CardTitle
					variant="body2"
					weight="bold"
					sx={{
						display: "-webkit-box",
						WebkitLineClamp: 2,
						WebkitBoxOrient: "vertical",
						overflow: "hidden",
						minHeight: 40,
					}}
				>
					{title}
				</CardTitle>
				{showInfoSmall && (
					<Typography
						variant="caption1"
						weight="bold"
						sx={{ fontSize: 12, lineHeight: "14px", letterSpacing: "-0.05em" }}
					>
						<span style={{ color: "var(--semantic-text-accent-violet)" }}>
							{infoSmall}{" "}
						</span>
						<span
							style={{
								color: "#666",
								opacity: 0.5,
								textDecoration: "line-through",
								fontWeight: 500,
							}}
						>
							{priceOrigin}
						</span>
					</Typography>
				)}
				{showPriceMonth && (
					<Typography
						variant="body1"
						weight="bold"
						sx={{ fontSize: 16, lineHeight: "20px", letterSpacing: "-0.05em" }}
					>
						{showInfoLarge && (
							<span style={{ color: "var(--semantic-text-accent-violet)" }}>
								{infoLarge}{" "}
							</span>
						)}
						<span>{price}</span>
						<span style={{ fontSize: 12, fontWeight: 400, marginLeft: 2 }}>
							{month}
						</span>
					</Typography>
				)}
				{showSlot && (
					<div
						style={{
							width: "100%",
							height: 17,
							display: "flex",
							alignItems: "stretch",
							justifyContent: "stretch",
							borderRadius: 4,
						}}
					>
						{slotBadge ?? <Placeholder w="100%" h="100%" label="badge" />}
					</div>
				)}
				{showChip && (
					<ButtonChipPilot text={chipLabel} size="small" onClick={onChip} />
				)}
			</CardContent>
		</Card>
	);
}
