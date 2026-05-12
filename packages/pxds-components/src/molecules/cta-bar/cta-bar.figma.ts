export const primaryCtaBarFigmaSpec = {
	$schema: "component-spec-v1",
	name: "mol/primary-cta-bar",
	category: "mol",
	description: "Docked primary CTA bar with optional secondary action.",
	base: {
		layout: {
			mode: "HORIZONTAL",
			primaryAxisSizingMode: "FIXED",
			counterAxisSizingMode: "AUTO",
			counterAxisAlignItems: "CENTER",
			width: "FILL",
			paddingTop: "{spacing.12}",
			paddingBottom: "{spacing.20}",
			paddingLeft: "{spacing.16}",
			paddingRight: "{spacing.16}",
			itemSpacing: "{spacing.8}",
		},
		visual: {
			fill: "{color.semantic.surface.page.normal}",
		},
		children: [
			{
				kind: "group",
				id: "secondary",
				layout: {
					mode: "HORIZONTAL",
					primaryAxisSizingMode: "FIXED",
					counterAxisSizingMode: "FIXED",
					primaryAxisAlignItems: "CENTER",
					counterAxisAlignItems: "CENTER",
					width: "120px",
					height: "52px",
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
						id: "secondary-label",
						content: "이전",
						textStyle: "{typography.body1.medium}",
						color: "{color.semantic.label.normal}",
						exposeAs: "secondaryLabel",
					},
				],
			},
			{
				kind: "group",
				id: "primary",
				layout: {
					mode: "HORIZONTAL",
					primaryAxisSizingMode: "FIXED",
					counterAxisSizingMode: "FIXED",
					primaryAxisAlignItems: "CENTER",
					counterAxisAlignItems: "CENTER",
					width: "FILL",
					height: "52px",
				},
				visual: {
					fill: "{color.semantic.primary.normal}",
					cornerRadius: "{spacing.12}",
				},
				layoutGrow: 1,
				children: [
					{
						kind: "text",
						id: "primary-label",
						content: "계속하기",
						textStyle: "{typography.body1.medium}",
						color: "{color.semantic.static.white}",
						exposeAs: "primaryLabel",
					},
				],
			},
		],
	},
	variants: {
		axes: [
			{
				name: "secondary",
				values: ["true", "false"],
			},
		],
		overrides: {
			"secondary=false": {
				"children[secondary].visible": false,
			},
		},
	},
};
