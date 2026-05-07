/**
 * PXDS semantic spacing vocabulary.
 *
 * WDS exposes atomic spacing values (`theme.spacing` / `--spacing-N`).
 * PXDS keeps this smaller intent-based layer so screens choose spacing by
 * responsibility, not by raw pixel keys.
 */
export type SpacingToken =
	| "row" //     4px — text rows / label-value pairs
	| "inline" //  8px — inline elements such as icon+text or chips
	| "stack" //  12px — default stack inside a block
	| "group" //  16px — related groups
	| "inset" //  20px — standard card padding
	| "block" //  24px — block-to-block separation
	| "section"; // 32px — large section separation

export const spacingPx = {
	row: 4,
	inline: 8,
	stack: 12,
	group: 16,
	inset: 20,
	block: 24,
	section: 32,
} as const satisfies Record<SpacingToken, number>;

export const spacingVar = (token: SpacingToken): string =>
	`var(--spacing-${spacingPx[token]})`;
