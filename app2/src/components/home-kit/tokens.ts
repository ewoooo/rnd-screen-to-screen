/**
 * home-kit 자체 토큰 SSOT.
 * WDS 토큰에 대응되지 않는 T 앱 브랜드/페이지 톤만 여기에 둔다.
 * 일반 spacing/label/line 등은 globals의 CSS var(--spacing-*, --semantic-*)을 직접 쓸 것.
 */

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
 * StatBadge / PillChip 의 텍스트 사이즈 토큰.
 * 순수 타이포 6 슬롯 SSOT 는 typography/styles.ts 로 이전.
 */
export type FontStyle = {
	fontSize: number;
	fontWeight: number;
	letterSpacing: string;
	lineHeight: number;
};

export const FONT = {
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
