"use client";

import { FlexBox, Typography } from "@wanteddev/wds";

import { BtnTextPilot } from "./BtnTextPilot";

const barcodePlaceholder = {
	background:
		"repeating-linear-gradient(90deg, #1a1a1a 0 2px, transparent 2px 5px, #1a1a1a 5px 6px, transparent 6px 9px)",
} as const;

// Figma information-barcode (molecule, 240×127) → 바코드 + 번호 + 복사 버튼
// Source: data/binding/overrides/information-barcode.json
export function InformationBarcodePilot({
	barcodeSrc,
	numberGroups = ["1234", "1234", "1234", "1234"],
	actionLabel = "복사",
	showAction = true,
	onAction,
}: {
	barcodeSrc?: string;
	numberGroups?: readonly string[];
	actionLabel?: string;
	showAction?: boolean;
	onAction?: () => void;
}) {
	return (
		<FlexBox flexDirection="column" gap={5} sx={{ width: 240 }}>
			<div
				style={{
					width: 240,
					height: 108,
					padding: 10,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{barcodeSrc ? (
					<img
						src={barcodeSrc}
						alt="barcode"
						style={{ width: "100%", height: "100%", objectFit: "contain" }}
					/>
				) : (
					<div style={{ width: "100%", height: "100%", ...barcodePlaceholder }} />
				)}
			</div>
			<FlexBox flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ width: "100%" }}>
				<FlexBox flexDirection="row" gap={2} alignItems="center">
					{numberGroups.map((g, i) => (
						<Typography key={i} variant="caption1" weight="medium">
							{g}
						</Typography>
					))}
				</FlexBox>
				{showAction && (
					<BtnTextPilot text={actionLabel} type="line" weight="medium" onClick={onAction} />
				)}
			</FlexBox>
		</FlexBox>
	);
}
