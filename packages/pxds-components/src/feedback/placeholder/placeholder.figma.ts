export const placeholderFigmaSpec = {
	$schema: "component-spec-v1" as const,
	name: "atom/placeholder",
	category: "atom" as const,
	description: "Thumbnail based empty media surface.",
	base: {
		layout: {
			mode: "VERTICAL" as const,
			primaryAxisSizingMode: "FIXED" as const,
			counterAxisSizingMode: "FIXED" as const,
			primaryAxisAlignItems: "CENTER" as const,
			counterAxisAlignItems: "CENTER" as const,
			width: "104px",
			height: "104px",
		},
		visual: {
			fill: "{color.semantic.background.elevated.normal}",
			stroke: {
				color: "{color.semantic.line.normal.normal}",
				weight: 1,
			},
			cornerRadius: "{spacing.12}",
		},
		children: [
			{
				kind: "text" as const,
				id: "label",
				content: "IMG",
				textStyle: "{typography.body2.medium}",
				color: "{color.semantic.label.assistive}",
				exposeAs: "label",
			},
		],
	},
};
