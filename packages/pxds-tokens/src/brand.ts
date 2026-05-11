import { semanticSurface, type SemanticSurfacePage } from "./semantic";

/**
 * PXDS legacy brand aliases.
 *
 * Thin wrappers over `--pxds-*` CSS vars emitted from the registry SSOT.
 * Prefer reading the CSS var directly in new code; once existing callers
 * migrate, this file can be removed.
 */

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

/** @deprecated Use `var(--pxds-brand-t-logo)` directly. */
export const T_LOGO_FILL = "var(--pxds-brand-t-logo)";
/** @deprecated Use `var(--pxds-bottom-sheet-backdrop)` directly. */
export const BOTTOM_SHEET_BACKDROP = "var(--pxds-bottom-sheet-backdrop)";
/** @deprecated Use `var(--pxds-typography-status-bar-font-size)` directly. */
export const STATUS_BAR_FONT_SIZE =
	"var(--pxds-typography-status-bar-font-size)";
/** @deprecated Use `var(--pxds-typography-placeholder-icon-font-size)` directly. */
export const PLACEHOLDER_ICON_FONT_SIZE =
	"var(--pxds-typography-placeholder-icon-font-size)";
