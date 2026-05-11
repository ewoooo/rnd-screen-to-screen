export const queryBarFigmaSpec = {
	$schema: "component-spec-v1",
	name: "mol/query-bar",
	category: "mol",
	description: "Read-only search/query input pattern.",
	widthFallback: "{dimension.size.screen-content-width}",
	base: {
		layout: {
			mode: "HORIZONTAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			counterAxisAlignItems: "CENTER",
			paddingTop: "{spacing.12}",
			paddingBottom: "{spacing.12}",
			paddingLeft: "{spacing.16}",
			paddingRight: "{spacing.16}",
			itemSpacing: "{spacing.8}",
			width: "FILL",
			height: "48px",
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
				kind: "text",
				id: "value",
				content: "디자인 시스템",
				textStyle: "{typography.body1.regular}",
				color: "{color.semantic.label.alternative}",
				layoutGrow: 1,
				autoResize: "HEIGHT",
				exposeAs: "value",
			},
		],
	},
};
