export const sectionHeaderPageFigmaSpec = {
	$schema: "component-spec-v1",
	name: "ogn/mbr-section-header-page",
	category: "ogn",
	description: "MBR page section title block.",
	base: {
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
			paddingTop: "{spacing.24}",
			paddingBottom: "{spacing.16}",
		},
		children: [
			{
				kind: "text",
				id: "title",
				content: "개인정보 입력",
				textStyle: "{typography.title1.medium}",
				color: "{color.semantic.label.normal}",
				autoResize: "HEIGHT",
				layoutAlign: "STRETCH",
				exposeAs: "title",
			},
		],
	},
} as const;
