"use client";

import { FlexBox, Typography } from "@wanteddev/wds";

import { ImageBrandLogoRoundPilot } from "./ImageBrandLogoRoundPilot";

// Figma card-horizontal-product-barcode-information (molecule, 288×56)
// Source: data/binding/overrides/card-horizontal-product-barcode-information.json
export function CardHorizontalProductBarcodeInformationPilot({
	brandLogoSrc,
	option = "option name",
	title = "title text",
	information = "info",
	date = "2026-04-24",
	showOption = true,
	showInfoDate = true,
	onClick,
}: {
	brandLogoSrc?: string;
	option?: string;
	title?: string;
	information?: string;
	date?: string;
	showOption?: boolean;
	showInfoDate?: boolean;
	onClick?: () => void;
}) {
	return (
		<FlexBox
			flexDirection="row"
			gap={12}
			alignItems="center"
			onClick={onClick}
			sx={{ width: 288, padding: "4px 0", cursor: onClick ? "pointer" : "default" }}
		>
			<ImageBrandLogoRoundPilot src={brandLogoSrc} size="middle" alt={title} />
			<FlexBox flexDirection="column" gap={2} sx={{ flex: 1, minWidth: 0 }}>
				{showOption && (
					<Typography
						variant="caption1"
						weight="medium"
						sx={{
							color: "#666",
							display: "block",
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
						}}
					>
						{option}
					</Typography>
				)}
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
					{title}
				</Typography>
				{showInfoDate && (
					<FlexBox flexDirection="row" gap={6} alignItems="center">
						<Typography variant="caption1" weight="medium" sx={{ color: "#666" }}>
							{information}
						</Typography>
						<div
							style={{
								width: 1,
								height: 8,
								background: "#666",
								opacity: 0.5,
							}}
						/>
						<Typography variant="caption1" weight="medium" sx={{ color: "#666" }}>
							{date}
						</Typography>
					</FlexBox>
				)}
			</FlexBox>
		</FlexBox>
	);
}
