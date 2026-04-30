"use client";

import { FlexBox, Typography } from "@wanteddev/wds";
import { IconPlus } from "@wanteddev/wds-icon";

// Figma com-product-thumb-hor-1 (312×80) — 08_rank_all 등 best-case row 전용
// Source: data/binding/overrides/com-product-thumb-hor-1.json
export function ComProductThumbHor1Pilot({
	thumbnailSrc,
	rank,
	brand = "brand-name",
	name = "어드민 지정 타이틀 텍스트 최대 두 줄까지 노출됩니다",
	info = "10%",
	price = "15,900원",
	period = "/ 1주",
	showAdd = true,
	onAdd,
	onClick,
}: {
	thumbnailSrc?: string;
	rank?: string;
	brand?: string;
	name?: string;
	info?: string;
	price?: string;
	period?: string;
	showAdd?: boolean;
	onAdd?: () => void;
	onClick?: () => void;
}) {
	return (
		<FlexBox
			flexDirection="row"
			gap={18}
			alignItems="center"
			onClick={onClick}
			sx={{ width: 312, cursor: onClick ? "pointer" : "default" }}
		>
			<div
				style={{
					position: "relative",
					width: 80,
					height: 80,
					borderRadius: 15,
					background: thumbnailSrc
						? `url(${thumbnailSrc}) center/cover no-repeat`
						: "rgba(0,0,0,0.03)",
					flexShrink: 0,
					overflow: "hidden",
				}}
			>
				{rank && (
					<div
						style={{
							position: "absolute",
							top: 5,
							left: 5,
							width: 17,
							height: 17,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							backdropFilter: "blur(2.5px)",
							background: "rgba(255,255,255,0.5)",
							borderRadius: 4,
						}}
					>
						<Typography
							variant="caption2"
							weight="bold"
							sx={{ fontSize: 11, lineHeight: "11px", color: "#1a1a1a" }}
						>
							{rank}
						</Typography>
					</div>
				)}
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
							bottom: 8,
							right: 8,
							width: 20,
							height: 20,
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
						<IconPlus width={12} height={12} color="#ffffff" />
					</button>
				)}
			</div>

			<FlexBox flexDirection="column" gap={2} sx={{ flex: 1, minWidth: 0 }}>
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
						paddingRight: 6,
					}}
				>
					{name}
				</Typography>
				<FlexBox flexDirection="row" gap={2} alignItems="baseline" sx={{ paddingTop: 2 }}>
					{info && (
						<Typography
							variant="label1"
							weight="bold"
							sx={{ color: "#3617ce", fontSize: 14, lineHeight: "20px" }}
						>
							{info}
						</Typography>
					)}
					<Typography
						variant="label1"
						weight="bold"
						sx={{ color: "#000", fontSize: 14, lineHeight: "20px" }}
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
	);
}
