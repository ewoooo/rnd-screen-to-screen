export const progressTopBarFigmaSpec = {
	$schema: "component-spec-v1",
	name: "ogn/progress-top-bar",
	category: "ogn",
	description: "Shared progress top bar for routed mobile flow screens.",
	base: {
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "375px",
		},
		visual: {
			fill: "{color.semantic.surface.page.normal}",
		},
		children: [
			{
				kind: "group",
				id: "navigation",
				layout: {
					mode: "HORIZONTAL",
					primaryAxisSizingMode: "FIXED",
					counterAxisSizingMode: "FIXED",
					counterAxisAlignItems: "CENTER",
					paddingLeft: "{spacing.16}",
					paddingRight: "{spacing.16}",
					width: "FILL",
					height: "56px",
				},
				children: [
					{
						kind: "text",
						id: "leading",
						content: "‹",
						textStyle: "{typography.title2.medium}",
						color: "{color.semantic.label.normal}",
						exposeAs: "leadingIcon",
					},
					{
						kind: "text",
						id: "title",
						content: "회원 가입",
						textStyle: "{typography.heading1.medium}",
						color: "{color.semantic.label.normal}",
						textAlignHorizontal: "CENTER",
						layoutGrow: 1,
						autoResize: "HEIGHT",
						exposeAs: "title",
					},
					{
						kind: "text",
						id: "trailing",
						content: " ",
						textStyle: "{typography.title2.medium}",
						color: "{color.semantic.label.normal}",
					},
				],
			},
			{
				kind: "group",
				id: "progress-stack",
				layout: {
					mode: "VERTICAL",
					primaryAxisSizingMode: "AUTO",
					counterAxisSizingMode: "FIXED",
					paddingLeft: "{spacing.12}",
					paddingRight: "{spacing.12}",
					paddingBottom: "{spacing.16}",
					itemSpacing: "{spacing.8}",
					width: "FILL",
				},
				children: [
					{
						kind: "text",
						id: "progress-label",
						content: "2 / 5",
						textStyle: "{typography.label1.medium}",
						color: "{color.semantic.label.alternative}",
						exposeAs: "progressLabel",
					},
					{
						kind: "group",
						id: "progress-track",
						layout: {
							mode: "HORIZONTAL",
							primaryAxisSizingMode: "FIXED",
							counterAxisSizingMode: "FIXED",
							width: "FILL",
							height: "4px",
						},
						visual: {
							fill: "{color.semantic.line.solid.alternative}",
							cornerRadius: "{spacing.8}",
						},
						children: [
							{
								kind: "group",
								id: "progress-fill",
								layout: {
									mode: "HORIZONTAL",
									primaryAxisSizingMode: "FIXED",
									counterAxisSizingMode: "FIXED",
									width: "140px",
									height: "4px",
								},
								visual: {
									fill: "{color.semantic.primary.normal}",
									cornerRadius: "{spacing.8}",
								},
							},
						],
					},
				],
			},
		],
	},
	variants: {
		axes: [
			{
				name: "progress",
				values: ["40", "100"],
			},
		],
		overrides: {
			"progress=40": {
				"children[progress-stack].children[progress-track].children[progress-fill].layout.width":
					"131px",
			},
			"progress=100": {
				"children[progress-stack].children[progress-track].children[progress-fill].layout.width":
					"327px",
			},
		},
	},
} as const;
