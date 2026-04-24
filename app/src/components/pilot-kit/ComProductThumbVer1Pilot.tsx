"use client";

import { FlexBox, Typography } from "@wanteddev/wds";
import { IconPlus } from "@wanteddev/wds-icon";

// Figma com-product-thumb-ver-1 (136 wide) — 13_list_product_vertical 그리드용
// Source: data/binding/overrides/com-product-thumb-ver-1.json
export function ComProductThumbVer1Pilot({
	thumbnailSrc,
	brand = "brand-name",
	name = "타이틀 텍스트 최대 두 줄",
	infoSmall = "15%",
	priceOrigin = "21,000원",
	price = "18,900원",
	period = "/ 2개월",
	showAdd = true,
	showStrike = true,
	onAdd,
	onClick,
}: {
	thumbnailSrc?: string;
	brand?: string;
	name?: string;
	infoSmall?: string;
	priceOrigin?: string;
	price?: string;
	period?: string;
	showAdd?: boolean;
	showStrike?: boolean;
	onAdd?: () => void;
	onClick?: () => void;
}) {
	return (
		<FlexBox
			flexDirection="column"
			gap={16}
			onClick={onClick}
			sx={{ width: 136, cursor: onClick ? "pointer" : "default" }}
		>
			<div
				style={{
					position: "relative",
					width: 136,
					height: 136,
					borderRadius: 20,
					background: thumbnailSrc
						? `url(${thumbnailSrc}) center/cover no-repeat`
						: "rgba(0,0,0,0.03)",
					overflow: "hidden",
				}}
			>
				{showAdd && (
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							onAdd?.();
						}}
						aria-label="add"
						style={{
							position: "absolute",
							bottom: 12,
							right: 12,
							width: 26,
							height: 26,
							borderRadius: 99,
							background: "rgba(0,0,0,0.7)",
							border: "none",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							padding: 0,
						}}
					>
						<IconPlus width={16} height={16} color="#ffffff" />
					</button>
				)}
			</div>

			<FlexBox flexDirection="column" gap={10} sx={{ paddingRight: 6 }}>
				<FlexBox flexDirection="column" gap={2}>
					<Typography
						variant="caption1"
						weight="medium"
						sx={{
							color: "#000",
							fontSize: 12,
							lineHeight: "14px",
							display: "block",
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
						}}
					>
						{brand}
					</Typography>
					<Typography
						variant="label1"
						weight="bold"
						sx={{
							color: "#000",
							fontSize: 14,
							lineHeight: "20px",
							letterSpacing: "-0.05em",
							display: "-webkit-box",
							WebkitLineClamp: 2,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
						}}
					>
						{name}
					</Typography>
				</FlexBox>

				<FlexBox flexDirection="column">
					{showStrike && (
						<FlexBox flexDirection="row" gap={2} alignItems="baseline">
							<Typography
								variant="caption1"
								weight="bold"
								sx={{ color: "#3617ce", fontSize: 12, lineHeight: "14px" }}
							>
								{infoSmall}
							</Typography>
							<Typography
								variant="caption1"
								weight="medium"
								sx={{
									color: "#a0a0a0",
									fontSize: 12,
									lineHeight: "14px",
									textDecoration: "line-through",
									opacity: 0.5,
								}}
							>
								{priceOrigin}
							</Typography>
						</FlexBox>
					)}
					<FlexBox flexDirection="row" gap={2} alignItems="baseline">
						<Typography
							variant="body1"
							weight="bold"
							sx={{ color: "#000", fontSize: 16, lineHeight: "20px" }}
						>
							{price}
						</Typography>
						<Typography
							variant="caption1"
							weight="bold"
							sx={{ color: "#000", fontSize: 12, lineHeight: "14px" }}
						>
							{period}
						</Typography>
					</FlexBox>
				</FlexBox>
			</FlexBox>
		</FlexBox>
	);
}
