export const sectionMessageEntryBranchFigmaSpec = {
	$schema: "component-spec-v1",
	name: "ogn/mbr-section-message-entry-branch",
	category: "ogn",
	description: "MBR conditional entry branch message.",
	base: {
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
			itemSpacing: "{spacing.12}",
		},
		children: [
			{
				kind: "group",
				id: "message",
				layout: {
					mode: "VERTICAL",
					primaryAxisSizingMode: "AUTO",
					counterAxisSizingMode: "FIXED",
					paddingTop: "{spacing.16}",
					paddingBottom: "{spacing.16}",
					paddingLeft: "{spacing.16}",
					paddingRight: "{spacing.16}",
					width: "FILL",
					itemSpacing: "{spacing.4}",
				},
				visual: {
					fill: "{color.semantic.background.elevated.normal}",
					stroke: {
						color: "{color.semantic.status.cautionary}",
						weight: 1,
					},
					cornerRadius: "{spacing.8}",
				},
				children: [
					{
						kind: "text",
						id: "title",
						content: "이미 가입된 회원",
						textStyle: "{typography.body1.medium}",
						color: "{color.semantic.label.normal}",
						exposeAs: "title",
					},
					{
						kind: "text",
						id: "description",
						content: "로그인 화면으로 이동해 주세요.",
						textStyle: "{typography.body2.regular}",
						color: "{color.semantic.label.alternative}",
						autoResize: "HEIGHT",
						exposeAs: "description",
					},
				],
			},
			{
				kind: "group",
				id: "action",
				layout: {
					mode: "HORIZONTAL",
					primaryAxisSizingMode: "FIXED",
					counterAxisSizingMode: "FIXED",
					primaryAxisAlignItems: "CENTER",
					counterAxisAlignItems: "CENTER",
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
						id: "action-label",
						content: "로그인하기",
						textStyle: "{typography.body1.medium}",
						color: "{color.semantic.label.normal}",
						exposeAs: "action",
					},
				],
			},
		],
	},
} as const;
