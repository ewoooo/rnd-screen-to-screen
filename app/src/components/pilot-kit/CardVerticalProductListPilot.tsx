"use client";

import {
	Card,
	CardContent,
	CardTitle,
	FlexBox,
	Typography,
} from "@wanteddev/wds";
import type { ReactNode } from "react";

import { Placeholder } from "@/components/home-kit";

// Figma card-vertical-product-list (molecule, 312×386) → WDS Card
// Source: data/binding/overrides/card-vertical-product-list.json
export function CardVerticalProductListPilot({
	productName = "product-name",
	title = "어드민 지정 타이틀 텍스트",
	priceOriginal = "29,900원~/1개월",
	slotImage,
	slotProduct,
	onClick,
}: {
	productName?: string;
	title?: string;
	priceOriginal?: string;
	slotImage?: ReactNode;
	slotProduct?: ReactNode;
	onClick?: () => void;
}) {
	return (
		<Card
			platform="mobile"
			flexDirection="column"
			justifyContent="space-between"
			width={312}
			flexShrink={0}
			onClick={onClick}
			sx={{ height: 386, padding: 24, borderRadius: 32 }}
		>
			<FlexBox flexDirection="row" gap={18} sx={{ width: "100%" }}>
				<CardContent flexDirection="column" gap={10} sx={{ flex: 1, minWidth: 0, paddingTop: 10 }}>
					<Typography
						variant="caption1"
						weight="bold"
						sx={{ fontSize: 12, lineHeight: "14px", letterSpacing: "-0.05em" }}
					>
						{productName}
					</Typography>
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
						variant="caption1"
						weight="medium"
						sx={{ color: "#666", fontSize: 12, lineHeight: "14px", letterSpacing: "-0.05em" }}
					>
						{priceOriginal}
					</Typography>
				</CardContent>
				<div
					style={{
						width: 100,
						height: 60,
						display: "flex",
						alignItems: "stretch",
						justifyContent: "stretch",
						flexShrink: 0,
					}}
				>
					{slotImage ?? <Placeholder w="100%" h="100%" label="image" />}
				</div>
			</FlexBox>
			<div
				style={{
					width: 264,
					height: 206,
					display: "flex",
					alignItems: "stretch",
					justifyContent: "stretch",
					alignSelf: "center",
				}}
			>
				{slotProduct ?? <Placeholder w="100%" h="100%" label="slot" />}
			</div>
		</Card>
	);
}
