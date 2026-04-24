"use client";

import { FlexBox, Typography } from "@wanteddev/wds";

import { ButtonChipPilot } from "./ButtonChipPilot";
import { ImgRectanglePilot } from "./ImgRectanglePilot";

// Figma card-horizontal-delivery (molecule, 312×76, no card chrome)
// Source: data/binding/overrides/card-horizontal-delivery.json
export function CardHorizontalDeliveryPilot({
	thumbnailSrc,
	brand = "brand-name",
	name = "어드민 지정 타이틀 텍스트 최대 두 줄",
	address = "서울시 어디구 어디동",
	chipLabel = "변경",
	showChip = true,
	onChip,
	onClick,
}: {
	thumbnailSrc?: string;
	brand?: string;
	name?: string;
	address?: string;
	chipLabel?: string;
	showChip?: boolean;
	onChip?: () => void;
	onClick?: () => void;
}) {
	return (
		<FlexBox
			flexDirection="row"
			gap={14}
			alignItems="center"
			onClick={onClick}
			sx={{ width: 312, cursor: onClick ? "pointer" : "default" }}
		>
			<ImgRectanglePilot src={thumbnailSrc} size="extra-small" alt={name} />
			<FlexBox flexDirection="row" gap={10} alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
				<FlexBox flexDirection="column" gap={2} sx={{ flex: 1, minWidth: 0 }}>
					<Typography
						variant="caption1"
						weight="medium"
						sx={{
							display: "block",
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
						}}
					>
						{brand}
					</Typography>
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
					<Typography
						variant="caption1"
						weight="medium"
						sx={{
							display: "block",
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
							marginTop: 4,
						}}
					>
						{address}
					</Typography>
				</FlexBox>
				{showChip && <ButtonChipPilot text={chipLabel} size="small" onClick={onChip} />}
			</FlexBox>
		</FlexBox>
	);
}
