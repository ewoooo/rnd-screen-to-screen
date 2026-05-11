export const dividerFigmaSpec = {
	$schema: "component-spec-v1" as const,
	name: "atom/divider",
	category: "atom" as const,
	description: "Inset-aware feedback divider.",
	base: {
		layout: {
			mode: "VERTICAL" as const,
			width: "{dimension.size.screen-content-width}",
			height: "{spacing.1}",
		},
		visual: {
			fill: "{color.semantic.line.normal.normal}",
		},
	},
};
