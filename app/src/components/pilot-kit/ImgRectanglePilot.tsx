"use client";

import { Thumbnail } from "@wanteddev/wds";

// Figma img/rectangle (atom) → WDS Thumbnail
// Source: data/binding/overrides/img-rectangle.json
// src 없으면 회색 체크패턴 placeholder

type Size = "extra-small" | "small" | "medium" | "large";
type Type = "standard-product" | "pass-product" | "promotion-product";

const dimensions = (size: Size, type: Type): { width: number; ratio: "1:1" } => {
	if (size === "extra-small") return { width: 56, ratio: "1:1" };
	if (size === "small") return { width: 80, ratio: "1:1" };
	if (size === "large") return { width: 188, ratio: "1:1" };
	if (type === "pass-product") return { width: 160, ratio: "1:1" }; // 실제 10:9 — WDS ratio enum에 없어 1:1 근사
	if (type === "promotion-product") return { width: 146, ratio: "1:1" };
	return { width: 136, ratio: "1:1" };
};

const checkerStyle = {
	background:
		"conic-gradient(#e5e7eb 25%, #f3f4f6 0 50%, #e5e7eb 0 75%, #f3f4f6 0) 0 0 / 16px 16px",
} as const;

export function ImgRectanglePilot({
	src,
	alt = "",
	size = "medium",
	type = "standard-product",
}: {
	src?: string;
	alt?: string;
	size?: Size;
	type?: Type;
}) {
	const { width, ratio } = dimensions(size, type);
	if (!src) {
		return (
			<div
				style={{
					width,
					height: width,
					borderRadius: 8,
					...checkerStyle,
				}}
				role="img"
				aria-label={alt || "placeholder"}
			/>
		);
	}
	return <Thumbnail src={src} alt={alt} ratio={ratio} width={width} />;
}
