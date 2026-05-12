export const selectableListFigmaSpec = {
	$schema: "component-spec-v1",
	name: "mol/selectable-list",
	category: "mol",
	description: "Selectable vertical list with single-choice affordance.",
	widthFallback: "{dimension.size.screen-content-width}",
	base: {
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
			itemSpacing: "{spacing.4}",
		},
		children: [
			{
				kind: "group",
				id: "option-phone",
				layout: {
					mode: "HORIZONTAL",
					primaryAxisSizingMode: "FIXED",
					counterAxisSizingMode: "FIXED",
					counterAxisAlignItems: "CENTER",
					width: "FILL",
					height: "48px",
					paddingLeft: "{spacing.16}",
					paddingRight: "{spacing.16}",
					itemSpacing: "{spacing.12}",
				},
				visual: {
					fill: "{color.semantic.background.elevated.normal}",
					stroke: {
						color: "{color.semantic.primary.normal}",
						weight: 1,
					},
					cornerRadius: "{spacing.8}",
				},
				children: [
					{
						kind: "text",
						id: "title",
						content: "휴대폰 인증",
						textStyle: "{typography.body1.medium}",
						color: "{color.semantic.label.normal}",
						layoutGrow: 1,
						autoResize: "HEIGHT",
					},
					{
						kind: "group",
						id: "radio",
						layout: {
							mode: "HORIZONTAL",
							primaryAxisSizingMode: "FIXED",
							counterAxisSizingMode: "FIXED",
							width: "20px",
							height: "20px",
						},
						visual: {
							stroke: {
								color: "{color.semantic.primary.normal}",
								weight: 2,
							},
							cornerRadius: "{spacing.16}",
						},
					},
				],
			},
			{
				kind: "group",
				id: "option-pass",
				layout: {
					mode: "HORIZONTAL",
					primaryAxisSizingMode: "FIXED",
					counterAxisSizingMode: "FIXED",
					counterAxisAlignItems: "CENTER",
					width: "FILL",
					height: "48px",
					paddingLeft: "{spacing.16}",
					paddingRight: "{spacing.16}",
					itemSpacing: "{spacing.12}",
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
						id: "title",
						content: "PASS 인증",
						textStyle: "{typography.body1.medium}",
						color: "{color.semantic.label.normal}",
						layoutGrow: 1,
						autoResize: "HEIGHT",
					},
					{
						kind: "group",
						id: "radio",
						layout: {
							mode: "HORIZONTAL",
							primaryAxisSizingMode: "FIXED",
							counterAxisSizingMode: "FIXED",
							width: "20px",
							height: "20px",
						},
						visual: {
							stroke: {
								color: "{color.semantic.line.normal.normal}",
								weight: 1,
							},
							cornerRadius: "{spacing.16}",
						},
					},
				],
			},
			{
				kind: "group",
				id: "option-cert",
				layout: {
					mode: "HORIZONTAL",
					primaryAxisSizingMode: "FIXED",
					counterAxisSizingMode: "FIXED",
					counterAxisAlignItems: "CENTER",
					width: "FILL",
					height: "48px",
					paddingLeft: "{spacing.16}",
					paddingRight: "{spacing.16}",
					itemSpacing: "{spacing.12}",
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
						id: "title",
						content: "공동인증서",
						textStyle: "{typography.body1.medium}",
						color: "{color.semantic.label.normal}",
						layoutGrow: 1,
						autoResize: "HEIGHT",
					},
					{
						kind: "group",
						id: "radio",
						layout: {
							mode: "HORIZONTAL",
							primaryAxisSizingMode: "FIXED",
							counterAxisSizingMode: "FIXED",
							width: "20px",
							height: "20px",
						},
						visual: {
							stroke: {
								color: "{color.semantic.line.normal.normal}",
								weight: 1,
							},
							cornerRadius: "{spacing.16}",
						},
					},
				],
			},
		],
	},
};
