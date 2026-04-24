/**
 * pilot-kit 통합 상수 SSOT (구 home-kit + search-kit 토큰 합본).
 * WDS 토큰에 대응되지 않는 T 앱 브랜드/페이지 톤만 여기에 둔다.
 * 일반 spacing/label/line 등은 globals의 CSS var(--spacing-*, --semantic-*)을 직접 쓸 것.
 */

// search-kit origin
export const KEYBOARD_BG = "#D1D5DB";
export const BUBBLE_USER_BG = "#E5E7EB";
export const SEARCH_BAR_BG = "rgba(255, 255, 255, 0.9)";
export const SEARCH_BAR_RADIUS = 999;

// home-kit origin
export const T_BRAND = "#3617ce";
export const T_BRAND_SHADOW = "0 8px 16px rgba(27, 11, 102, 0.16)";

export const PAGE_BG = "#ebeef6";
export const PAGE_BG_SEMI = "rgba(235, 238, 246, 0.95)";
export const GNB_BORDER = "#ecf1ff";

export const CARD_BG = "rgba(255, 255, 255, 0.9)";
export const CARD_BORDER = "rgba(255, 255, 255, 1)";
export const CARD_RADIUS = 24;

export const OFFERING_BG = "rgba(253, 253, 254, 0.5)";
export const OFFERING_BORDER = "rgba(255, 255, 255, 0.5)";

export const BADGE_BG = "#f4f5fa";

/**
 * Figma 픽셀 실측 기반 텍스트 슬롯 스타일.
 * WDS Typography variant 스케일과 일치하지 않을 수 있어 raw 수치로 고정한다.
 * (memory: feedback_typography_spec_fidelity — 명세 size/line-height 그대로)
 *
 * color 는 여기에 포함하지 않는다 — semantic CSS var 로 슬롯마다 직접 지정.
 */
export type FontStyle = {
	fontSize: number;
	fontWeight: number;
	letterSpacing: string;
	lineHeight: number;
};

export const FONT = {
	sectionLabel: {
		fontSize: 13,
		fontWeight: 700,
		letterSpacing: "-0.39px",
		lineHeight: 1.4,
	},
	heading20: {
		fontSize: 20,
		fontWeight: 700,
		letterSpacing: "-1px",
		lineHeight: 1.3,
	},
	aiText: {
		fontSize: 13,
		fontWeight: 700,
		letterSpacing: "-0.39px",
		lineHeight: 1.4,
	},
	listTitle: {
		fontSize: 14,
		fontWeight: 600,
		letterSpacing: "-0.7px",
		lineHeight: 1.4,
	},
	listSub: {
		fontSize: 13,
		fontWeight: 700,
		letterSpacing: "-0.52px",
		lineHeight: 1.3,
	},
	monoCaption: {
		fontSize: 11,
		fontWeight: 700,
		letterSpacing: "-0.44px",
		lineHeight: 1.4,
	},
	statBadge: {
		fontSize: 11,
		fontWeight: 700,
		letterSpacing: "-0.44px",
		lineHeight: 1.3,
	},
	pillChip: {
		fontSize: 12,
		fontWeight: 600,
		letterSpacing: "-0.6px",
		lineHeight: 1.3,
	},
} as const satisfies Record<string, FontStyle>;
