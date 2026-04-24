"use client";

import { Typography } from "@wanteddev/wds";

import { ImgRectanglePilot } from "./ImgRectanglePilot";

// Figma card-vertical-promotion (molecule, 146×246) → 보라 카드 + 상단 이미지 겹침
// Source: data/binding/overrides/card-vertical-promotion.json
export function CardVerticalPromotionPilot({
	thumbnailSrc,
	subtitle = "sub title",
	title = "메인 타이틀은 최소 1줄 최대 3줄",
	onClick,
}: {
	thumbnailSrc?: string;
	subtitle?: string;
	title?: string;
	onClick?: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			style={{
				position: "relative",
				width: 146,
				height: 246,
				border: "none",
				background: "transparent",
				padding: 0,
				cursor: onClick ? "pointer" : "default",
				flexShrink: 0,
			}}
		>
			<div style={{ position: "absolute", top: 0, left: 0 }}>
				<ImgRectanglePilot
					src={thumbnailSrc}
					size="medium"
					type="promotion-product"
					alt={title}
				/>
			</div>
			<div
				style={{
					position: "absolute",
					left: 0,
					right: 0,
					top: "21.14%",
					bottom: 0,
					padding: "0 15px 22px 15px",
					background: "#3617ce",
					borderRadius: 32,
					boxShadow:
						"inset 0 2px 0 rgba(255,255,255,0.2), 0 4px 15px rgba(0,0,0,0.1)",
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-end",
					gap: 6,
					textAlign: "left",
				}}
			>
				<Typography
					variant="caption1"
					weight="bold"
					sx={{ color: "#ffffff", fontSize: 12, lineHeight: "14px" }}
				>
					{subtitle}
				</Typography>
				<Typography
					variant="heading2"
					weight="medium"
					sx={{
						color: "#ffffff",
						fontSize: 20,
						lineHeight: "24px",
						letterSpacing: "-0.05em",
						display: "-webkit-box",
						WebkitLineClamp: 3,
						WebkitBoxOrient: "vertical",
						overflow: "hidden",
					}}
				>
					{title}
				</Typography>
			</div>
		</button>
	);
}
