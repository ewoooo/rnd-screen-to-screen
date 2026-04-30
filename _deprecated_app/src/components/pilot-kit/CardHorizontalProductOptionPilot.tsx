"use client";

import {
	Card,
	CardCaption,
	CardContent,
	CardTitle,
	FlexBox,
	Typography,
} from "@wanteddev/wds";

import { BtnTextPilot } from "./BtnTextPilot";
import { ImgRectanglePilot } from "./ImgRectanglePilot";

// Figma card-horizontal-product-option (molecule, 336×108) → WDS Card 보더형
// Source: data/binding/overrides/card-horizontal-product-option.json
export function CardHorizontalProductOptionPilot({
	thumbnailSrc,
	category = "어드민에 등록된 상품명 최대 1줄",
	title = "어드민에 등록된 상품명 최대 1줄까지",
	price = "29,900원",
	month = "/ 1개월",
	actionLabel = "옵션 변경",
	showAction = true,
	onAction,
	onClick,
}: {
	thumbnailSrc?: string;
	category?: string;
	title?: string;
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
			flexDirection="column"
			gap={10}
			width={336}
			flexShrink={0}
			onClick={onClick}
			sx={{ padding: 16, border: "1px solid #f2f2f2", borderRadius: 20 }}
		>
			<FlexBox flexDirection="row" gap={10} sx={{ width: "100%" }}>
				<ImgRectanglePilot src={thumbnailSrc} size="extra-small" alt={title} />
				<CardContent flexDirection="column" sx={{ flex: 1, minWidth: 0 }}>
					<CardCaption
						variant="caption1"
						weight="medium"
						sx={{
							display: "block",
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
							paddingBottom: 4,
						}}
					>
						{category}
					</CardCaption>
					<CardTitle
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
					</CardTitle>
					<Typography
						variant="label1"
						weight="bold"
						sx={{ paddingTop: 4, fontSize: 14, lineHeight: "20px", letterSpacing: "-0.05em" }}
					>
						<span>{price}</span>
						<span style={{ fontSize: 12, fontWeight: 700, marginLeft: 2 }}>
							{month}
						</span>
					</Typography>
				</CardContent>
			</FlexBox>
			{showAction && (
				<FlexBox flexDirection="row" justifyContent="flex-end" sx={{ width: "100%" }}>
					<BtnTextPilot text={actionLabel} type="line" weight="medium" onClick={onAction} />
				</FlexBox>
			)}
		</Card>
	);
}
