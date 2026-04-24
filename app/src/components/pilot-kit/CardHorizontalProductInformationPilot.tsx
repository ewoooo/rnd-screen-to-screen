"use client";

import { Card, Typography } from "@wanteddev/wds";

import { BtnTextPilot } from "./BtnTextPilot";

// Figma card-horizontal-product-information (molecule, 256×46) → 안내 카드
// Source: data/binding/overrides/card-horizontal-product-information.json
export function CardHorizontalProductInformationPilot({
	text = "info",
	actionLabel = "자세히",
	showAction = true,
	onAction,
	onClick,
}: {
	text?: string;
	actionLabel?: string;
	showAction?: boolean;
	onAction?: () => void;
	onClick?: () => void;
}) {
	return (
		<Card
			platform="mobile"
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			width={256}
			flexShrink={0}
			onClick={onClick}
			sx={{
				padding: "16px 20px",
				border: "1px solid #b2b2b2",
				borderRadius: 14,
				background: "#f2f2f2",
				boxShadow: "none",
			}}
		>
			<Typography variant="caption1" weight="medium">
				{text}
			</Typography>
			{showAction && (
				<BtnTextPilot text={actionLabel} type="line" weight="bold" onClick={onAction} />
			)}
		</Card>
	);
}
