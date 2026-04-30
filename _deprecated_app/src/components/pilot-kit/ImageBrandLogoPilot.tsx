"use client";

import { Typography } from "@wanteddev/wds";

import { ImageBrandLogoRoundPilot } from "./ImageBrandLogoRoundPilot";

// Figma image/brand-logo (molecule, stacked logos) — atom의 image/brand-logo/round 단일과 별개
// Source: data/binding/overrides/image-brand-logo.json
export function ImageBrandLogoPilot({
	logos = [],
	size = "m",
	showBadge = true,
	badgeText = "+N",
}: {
	logos?: readonly (string | undefined)[];
	size?: "m" | "s";
	showBadge?: boolean;
	badgeText?: string;
}) {
	const isS = size === "s";
	const overlap = isS ? -12 : -20;
	const items = logos.length > 0 ? logos.slice(0, 2) : [undefined, undefined];

	return (
		<div style={{ position: "relative", display: "inline-flex", paddingRight: Math.abs(overlap) }}>
			{items.map((src, i) => (
				<div key={i} style={{ marginRight: i < items.length - 1 ? overlap : 0, zIndex: items.length - i }}>
					<ImageBrandLogoRoundPilot src={src} size={isS ? "small" : "large"} />
				</div>
			))}
			{isS && showBadge && (
				<div
					style={{
						position: "absolute",
						left: 48,
						top: -8,
						width: 20,
						height: 20,
						borderRadius: 30,
						background: "#4d4d4d",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Typography
						variant="caption2"
						weight="bold"
						sx={{ color: "#ffffff", fontSize: 10, lineHeight: "11px" }}
					>
						{badgeText}
					</Typography>
				</div>
			)}
		</div>
	);
}
