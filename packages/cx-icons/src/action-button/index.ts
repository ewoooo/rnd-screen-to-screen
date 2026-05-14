export const actionButtonLeftItemAssets = {
	ai: new URL("./ActionButton.LeftItem.AI.svg", import.meta.url).href,
	div: new URL("./ActionButton.LeftItem.Div.svg", import.meta.url).href,
	gift: new URL("./ActionButton.LeftItem.Gift.svg", import.meta.url).href,
} as const;

export type ActionButtonLeftItemAsset =
	(typeof actionButtonLeftItemAssets)[keyof typeof actionButtonLeftItemAssets];
