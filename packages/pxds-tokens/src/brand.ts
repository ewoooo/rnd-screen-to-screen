import { semanticSurface, type SemanticSurfacePage } from "./semantic";

/**
 * PXDS legacy brand aliases.
 *
 * WDS 원본에서 흡수한 token과 project extension은 token registry와 semantic aliases에 둔다.
 * 이 파일은 기존 home organism 호환용 alias만 제공한다.
 */

/** @deprecated Use `var(--pxds-line-gnb-border)` directly. */
export const GNB_BORDER = "var(--pxds-line-gnb-border)";

export { semanticSurface, type SemanticSurfacePage };

/** @deprecated Use `var(--pxds-surface-card-background)` directly. */
export const CARD_BG = "var(--pxds-surface-card-background)";
/** @deprecated Use `var(--pxds-surface-card-border)` directly. */
export const CARD_BORDER = "var(--pxds-surface-card-border)";
/** @deprecated Use `var(--pxds-surface-card-radius)` directly. */
export const CARD_RADIUS = "var(--pxds-surface-card-radius)";
/** @deprecated Use `var(--pxds-surface-card-shadow)` directly. */
export const CARD_SHADOW = "var(--pxds-surface-card-shadow)";

/** @deprecated Use `var(--pxds-surface-offering-background)` directly. */
export const OFFERING_BG = "var(--pxds-surface-offering-background)";
/** @deprecated Use `var(--pxds-surface-offering-border)` directly. */
export const OFFERING_BORDER = "var(--pxds-surface-offering-border)";

/** @deprecated Use `var(--pxds-surface-badge-background)` directly. */
export const BADGE_BG = "var(--pxds-surface-badge-background)";

export const T_LOGO_FILL = "var(--pxds-brand-t-logo)";
export const BOTTOM_SHEET_BACKDROP = "var(--pxds-bottom-sheet-backdrop)";
export const STATUS_BAR_FONT_SIZE = "var(--pxds-typography-status-bar-font-size)";
export const PLACEHOLDER_ICON_FONT_SIZE =
	"var(--pxds-typography-placeholder-icon-font-size)";

export type FontStyle = {
	fontSize: string;
	fontWeight: string;
	letterSpacing: string;
	lineHeight: string;
};

/** @deprecated Use the matching `--pxds-typography-*` CSS vars directly. */
export const FONT = {
	statBadge: {
		fontSize: "var(--pxds-typography-stat-badge-font-size)",
		fontWeight: "var(--pxds-typography-stat-badge-font-weight)",
		letterSpacing: "var(--pxds-typography-stat-badge-letter-spacing)",
		lineHeight: "var(--pxds-typography-stat-badge-line-height)",
	},
	pillChip: {
		fontSize: "var(--pxds-typography-pill-chip-font-size)",
		fontWeight: "var(--pxds-typography-pill-chip-font-weight)",
		letterSpacing: "var(--pxds-typography-pill-chip-letter-spacing)",
		lineHeight: "var(--pxds-typography-pill-chip-line-height)",
	},
} as const satisfies Record<string, FontStyle>;
