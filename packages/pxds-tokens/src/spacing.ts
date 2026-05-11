/**
 * PXDS semantic spacing vocabulary.
 *
 * Values live in the registry SSOT under `semantic.spacing.{token}` and emit
 * as `--semantic-spacing-{token}` CSS vars. Screens choose spacing by
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

export const spacingVar = (token: SpacingToken): string =>
	`var(--semantic-spacing-${token})`;
