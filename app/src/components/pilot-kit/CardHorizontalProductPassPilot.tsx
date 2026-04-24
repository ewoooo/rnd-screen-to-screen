"use client";

import { Card, FlexBox, Typography } from "@wanteddev/wds";

import { BtnTextPilot } from "./BtnTextPilot";

// Figma card-horizontal-product-pass (molecule, 336×75) → WDS Card 회색 bg
// Source: data/binding/overrides/card-horizontal-product-pass.json
export function CardHorizontalProductPassPilot({
	name = "pass-product-name",
	price = "29,900원",
	month = "1개월",
	actionLabel = "변경",
	showAction = true,
	onAction,
	onClick,
}: {
	name?: string;
	price?: string;
	month?: string;
	actionLabel?: string;
	showAction?: boolean;
	onAction?: () => void;
	onClick?: () => void;
}) {
	return (
		<Card
			platform="mobile"
			flexDirection="row"
			gap={20}
			alignItems="center"
			width={336}
			flexShrink={0}
			onClick={onClick}
			sx={{
				padding: "18px 20px 18px 24px",
				borderRadius: 20,
				background: "#f2f2f2",
				boxShadow: "none",
			}}
		>
			<FlexBox flexDirection="column" gap={5} sx={{ flex: 1, minWidth: 0 }}>
				<Typography
					variant="body2"
					weight="bold"
					sx={{
						display: "block",
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}
				>
					{name}
				</Typography>
				<FlexBox flexDirection="row" alignItems="center">
					<Typography variant="caption1" weight="medium" sx={{ color: "#666" }}>
						{price}
					</Typography>
					<Typography variant="caption1" weight="medium" sx={{ color: "#666" }}>
						{` / ${month}`}
					</Typography>
				</FlexBox>
			</FlexBox>
			{showAction && (
				<BtnTextPilot text={actionLabel} type="line" weight="bold" onClick={onAction} />
			)}
		</Card>
	);
}
