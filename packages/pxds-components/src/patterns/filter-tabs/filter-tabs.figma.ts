export const filterTabsFigmaSpec = {
	$schema: "component-spec-v1",
	name: "mol/filter-tabs",
	category: "mol",
	description: "Selection tabs for filtering a result set.",
	base: {
		layout: {
			mode: "HORIZONTAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "AUTO",
			counterAxisAlignItems: "CENTER",
			paddingLeft: "{spacing.20}",
			paddingRight: "{spacing.20}",
			itemSpacing: "{spacing.24}",
		},
		children: [
			{
				kind: "group",
				id: "tab-all",
				layout: {
					mode: "VERTICAL",
					primaryAxisSizingMode: "AUTO",
					counterAxisSizingMode: "AUTO",
					counterAxisAlignItems: "CENTER",
					paddingTop: "{spacing.12}",
					itemSpacing: "{spacing.12}",
				},
				children: [
					{
						kind: "text",
						id: "label",
						content: "전체",
						textStyle: "{typography.headline2.medium}",
						color: "{color.semantic.label.strong}",
						exposeAs: "label",
					},
					{
						kind: "group",
						id: "indicator",
						layout: {
							mode: "HORIZONTAL",
							width: "FILL",
							height: "{spacing.2}",
						},
						visual: {
							fill: "{color.semantic.label.strong}",
						},
					},
				],
			},
			{
				kind: "group",
				id: "tab-popular",
				layout: {
					mode: "VERTICAL",
					primaryAxisSizingMode: "AUTO",
					counterAxisSizingMode: "AUTO",
					counterAxisAlignItems: "CENTER",
					paddingTop: "{spacing.12}",
					itemSpacing: "{spacing.12}",
				},
				children: [
					{
						kind: "text",
						id: "label",
						content: "인기",
						textStyle: "{typography.headline2.medium}",
						color: "{color.semantic.label.assistive}",
						exposeAs: "label",
					},
					{
						kind: "group",
						id: "indicator",
						layout: {
							mode: "HORIZONTAL",
							width: "FILL",
							height: "{spacing.2}",
						},
						visual: {
							fill: "{color.semantic.label.strong}",
						},
						visible: false,
					},
				],
			},
			{
				kind: "group",
				id: "tab-recent",
				layout: {
					mode: "VERTICAL",
					primaryAxisSizingMode: "AUTO",
					counterAxisSizingMode: "AUTO",
					counterAxisAlignItems: "CENTER",
					paddingTop: "{spacing.12}",
					itemSpacing: "{spacing.12}",
				},
				children: [
					{
						kind: "text",
						id: "label",
						content: "최신",
						textStyle: "{typography.headline2.medium}",
						color: "{color.semantic.label.assistive}",
						exposeAs: "label",
					},
					{
						kind: "group",
						id: "indicator",
						layout: {
							mode: "HORIZONTAL",
							width: "FILL",
							height: "{spacing.2}",
						},
						visual: {
							fill: "{color.semantic.label.strong}",
						},
						visible: false,
					},
				],
			},
		],
	},
};
