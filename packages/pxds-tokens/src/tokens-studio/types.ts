export type TokensStudioTokenType =
	| "color"
	| "dimension"
	| "fontFamilies"
	| "fontSizes"
	| "fontWeights"
	| "letterSpacing"
	| "lineHeights"
	| "number"
	| "opacity"
	| "sizing"
	| "spacing"
	| "typography";

export type TokensStudioToken = {
	type: TokensStudioTokenType;
	value: unknown;
	description?: string;
};

export type TokensStudioTokenTree = {
	[key: string]: TokensStudioToken | TokensStudioTokenTree;
};
