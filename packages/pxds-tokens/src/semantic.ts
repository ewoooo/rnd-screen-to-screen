export const semanticSurface = {
	page: {
		normal: "var(--semantic-surface-page-normal)",
		semi: "var(--semantic-surface-page-semi)",
	},
} as const;

export type SemanticSurfacePage = keyof typeof semanticSurface.page;
