"use client";

import {
	Card,
	CardCaption,
	CardContent,
	CardTitle,
	Typography,
} from "@wanteddev/wds";
import type { ReactNode } from "react";

import { Placeholder } from "@/components/home-kit";
import { ImgRectanglePilot } from "./ImgRectanglePilot";

// Figma card-vertical-product/medium (molecule, 228×369) → WDS Card
// Source: data/binding/overrides/card-vertical-product-medium.json
export function CardVerticalProductMediumPilot({
	thumbnailSrc,
	brand = "brand name",
	title = "어드민 지정 타이틀 텍스트",
	info = "23%",
	price = "29,900원",
	month = "/1개월",
	showInfo = true,
	showSlot = true,
	slotBadge,
	onClick,
}: {
	thumbnailSrc?: string;
	brand?: string;
	title?: string;
	info?: string;
	price?: string;
	month?: string;
	showInfo?: boolean;
	showSlot?: boolean;
	slotBadge?: ReactNode;
	onClick?: () => void;
}) {
	return (
		<Card
			platform="mobile"
			flexDirection="column"
			gap={20}
			width={228}
			flexShrink={0}
			onClick={onClick}
			sx={{ padding: "20px 20px 50px", borderRadius: 32 }}
		>
			<ImgRectanglePilot src={thumbnailSrc} size="large" alt={title} />

			<CardContent flexDirection="column" gap={10} sx={{ width: "100%" }}>
				<CardCaption variant="caption1" weight="medium">
					{brand}
				</CardCaption>
				<CardTitle
					variant="body1"
					weight="bold"
					sx={{
						display: "-webkit-box",
						WebkitLineClamp: 1,
						WebkitBoxOrient: "vertical",
						overflow: "hidden",
					}}
				>
					{title}
				</CardTitle>
				<Typography
					variant="label1"
					weight="bold"
					sx={{ fontSize: 14, lineHeight: "20px", letterSpacing: "-0.05em" }}
				>
					{showInfo && (
						<span style={{ color: "var(--semantic-text-accent-violet)" }}>
							{info}{" "}
						</span>
					)}
					<span>{price}</span>
					<span style={{ fontSize: 12, fontWeight: 400, marginLeft: 2 }}>
						{month}
					</span>
				</Typography>
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
			</CardContent>
		</Card>
	);
}
