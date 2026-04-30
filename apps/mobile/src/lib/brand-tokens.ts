/**
 * 앱 전역 브랜드 톤 SSOT.
 * WDS 토큰(--semantic-* / --atomic-* / --spacing-*)으로 표현되지 않는 T 앱 고유 시각 어휘만 둔다.
 * organisms/home/tokens.ts는 여기서 re-export 한다.
 */

export const GNB_BORDER = "#ecf1ff";

/**
 * `semantic.surface.*` — 프로젝트 자체 토큰 어휘 확장 (page-level chrome 배경).
 * SSOT: `apps/mobile/src/app/wds-tokens.css` + `registry/wds-token-registry.json`
 */
export const semanticSurface = {
	page: {
		normal: "var(--semantic-surface-page-normal)",
		semi: "var(--semantic-surface-page-semi)",
	},
} as const;
export type SemanticSurfacePage = keyof typeof semanticSurface.page;

export const CARD_BG = "var(--semantic-background-normal-normal)";
export const CARD_BORDER = "var(--semantic-line-solid-alternative)";
export const CARD_RADIUS = 24;
export const CARD_SHADOW = "none";

export const OFFERING_BG = "rgba(253, 253, 254, 0.5)";
export const OFFERING_BORDER = "rgba(255, 255, 255, 0.5)";

export const BADGE_BG = "#f4f5fa";

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
