"use client";

import { Avatar } from "@wanteddev/wds";

// Figma image/brand-logo/round (atom) → WDS Avatar(variant=company)
// Source: data/binding/overrides/image-brand-logo-round.json
// src 없으면 회색 체크패턴 placeholder

const SIZE_MAP = {
	"extra-small": 32,
	small: 36,
	middle: 48,
	large: 60,
} as const;

const checkerStyle = {
	background:
		"conic-gradient(#e5e7eb 25%, #f3f4f6 0 50%, #e5e7eb 0 75%, #f3f4f6 0) 0 0 / 12px 12px",
} as const;

export function ImageBrandLogoRoundPilot({
	src,
	alt = "",
	size = "middle",
}: {
	src?: string;
	alt?: string;
	size?: keyof typeof SIZE_MAP;
}) {
	const px = SIZE_MAP[size];
	if (!src) {
		return (
			<div
				style={{ width: px, height: px, borderRadius: "50%", ...checkerStyle }}
				role="img"
				aria-label={alt || "placeholder"}
			/>
		);
	}
	return <Avatar variant="company" size={px} src={src} alt={alt} />;
}
