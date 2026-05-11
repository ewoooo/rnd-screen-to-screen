export const selectFieldFigmaSpec = {
	$schema: "component-spec-v1",
	name: "mol/select-field",
	category: "mol",
	description: "Select control pattern with normalized options.",
	widthFallback: "{dimension.size.screen-content-width}",
	base: {
		layout: {
			mode: "HORIZONTAL",
			primaryAxisSizingMode: "FIXED",
			counterAxisSizingMode: "FIXED",
			counterAxisAlignItems: "CENTER",
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
			cornerRadius: "{spacing.8}",
		},
		children: [
			{
				kind: "text",
				id: "value",
				content: "기본 옵션",
				textStyle: "{typography.body1.regular}",
				color: "{color.semantic.label.normal}",
				layoutGrow: 1,
				autoResize: "HEIGHT",
				exposeAs: "value",
			},
			{
				kind: "text",
				id: "indicator",
				content: "⌄",
				textStyle: "{typography.body1.medium}",
				color: "{color.semantic.label.assistive}",
			},
		],
	},
};
