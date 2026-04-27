import type { CSSProperties } from "react";

import { T_BRAND } from "@/components/home-kit";

/**
 * Typography variant SSOT — Figma 픽셀 실측 기반.
 * 6 슬롯의 fontSize/weight/letterSpacing/lineHeight + color + 특수 속성을 한 곳에 정의.
 */
export type Variant =
	| "section-label"
	| "heading-20"
	| "ai-text"
	| "list-title"
	| "list-sub"
	| "mono-caption";

export const VARIANT_STYLES: Record<Variant, CSSProperties> = {
	"section-label": {
		fontSize: 13,
		fontWeight: 700,
		letterSpacing: "-0.39px",
		lineHeight: 1.4,
		color: "var(--semantic-label-neutral)",
	},
	"heading-20": {
		fontSize: 20,
		fontWeight: 700,
		letterSpacing: "-1px",
		lineHeight: 1.3,
		color: "var(--semantic-label-normal)",
		whiteSpace: "pre-line",
	},
	"ai-text": {
		fontSize: 13,
		fontWeight: 700,
		letterSpacing: "-0.39px",
		lineHeight: 1.4,
		color: T_BRAND,
	},
	"list-title": {
		fontSize: 14,
		fontWeight: 600,
		letterSpacing: "-0.7px",
		lineHeight: 1.4,
		color: "var(--semantic-label-normal)",
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
	"list-sub": {
		fontSize: 13,
		fontWeight: 700,
		letterSpacing: "-0.52px",
		lineHeight: 1.3,
		color: "var(--semantic-label-alternative)",
	},
	"mono-caption": {
		fontSize: 11,
		fontWeight: 700,
		letterSpacing: "-0.44px",
		lineHeight: 1.4,
		color: "var(--semantic-label-alternative)",
	},
};

export const DEFAULT_TAG: Record<Variant, "p" | "span"> = {
	"section-label": "span",
	"heading-20": "p",
	"ai-text": "span",
	"list-title": "span",
	"list-sub": "span",
	"mono-caption": "span",
};
