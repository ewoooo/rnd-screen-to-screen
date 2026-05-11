export const mediaBlockFigmaSpec = {
	$schema: "component-spec-v1",
	name: "mol/media-block",
	category: "mol",
	description: "Reusable media surface with optional badge slot.",
	base: {
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "FIXED",
			counterAxisSizingMode: "FIXED",
			width: "224px",
			height: "168px",
		},
		visual: {
			fill: "{color.semantic.background.elevated.alternative}",
			stroke: {
				color: "{color.semantic.line.normal.normal}",
				weight: 1,
			},
			cornerRadius: "{spacing.12}",
		},
		children: [
			{
				kind: "group",
				id: "badge",
				layout: {
					mode: "HORIZONTAL",
					primaryAxisSizingMode: "AUTO",
					counterAxisSizingMode: "AUTO",
					paddingTop: "{spacing.4}",
					paddingBottom: "{spacing.4}",
					paddingLeft: "{spacing.8}",
					paddingRight: "{spacing.8}",
				},
				visual: {
					fill: "{color.semantic.primary.normal}",
					cornerRadius: "{spacing.8}",
				},
				layoutPositioning: "ABSOLUTE",
				x: 164,
				y: 12,
				constraints: {
					horizontal: "RIGHT",
					vertical: "TOP",
				},
				children: [
					{
						kind: "text",
						id: "text",
						content: "NEW",
						textStyle: "{typography.caption1.medium}",
						color: "#ffffff",
						exposeAs: "badgeText",
					},
				],
			},
		],
	},
};
