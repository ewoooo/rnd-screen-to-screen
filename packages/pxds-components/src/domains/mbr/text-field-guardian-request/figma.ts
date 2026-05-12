export const textFieldGuardianRequestFigmaSpec = {
	$schema: "component-spec-v1",
	name: "ogn/mbr-text-field-guardian-request",
	category: "ogn",
	description: "MBR guardian consent request form for under-14 members.",
	base: {
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
			itemSpacing: "{spacing.24}",
		},
		children: [
			{
				kind: "group",
				id: "notice",
				layout: {
					mode: "VERTICAL",
					primaryAxisSizingMode: "AUTO",
					counterAxisSizingMode: "FIXED",
					width: "FILL",
					paddingTop: "{spacing.16}",
					paddingBottom: "{spacing.16}",
					paddingLeft: "{spacing.16}",
					paddingRight: "{spacing.16}",
					itemSpacing: "{spacing.4}",
				},
				visual: {
					fill: "{color.semantic.background.elevated.alternative}",
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
						content: "법정대리인 동의 안내",
						textStyle: "{typography.body1.medium}",
						color: "{color.semantic.label.normal}",
						exposeAs: "noticeTitle",
					},
					{
						kind: "text",
						id: "description",
						content: "만 14세 미만 고객의 가입은 법정대리인 동의가 필요합니다.",
						textStyle: "{typography.body2.regular}",
						color: "{color.semantic.label.alternative}",
						autoResize: "HEIGHT",
						exposeAs: "noticeDescription",
					},
				],
			},
			createField("guardian-name", "법정대리인 이름", "법정대리인 이름"),
			createField("guardian-phone", "법정대리인 연락처", "법정대리인 연락처"),
			{
				kind: "group",
				id: "request-action",
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
					fill: "{color.semantic.primary.normal}",
					cornerRadius: "{spacing.8}",
				},
				children: [
					{
						kind: "text",
						id: "label",
						content: "동의 요청 보내기",
						textStyle: "{typography.body1.medium}",
						color: "{color.semantic.static.white}",
						exposeAs: "actionLabel",
					},
				],
			},
		],
	},
} as const;

function createField(id: string, label: string, placeholder: string) {
	return {
		kind: "group",
		id,
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
			itemSpacing: "{spacing.8}",
		},
		children: [
			{
				kind: "text",
				id: "label",
				content: `${label} *`,
				textStyle: "{typography.label1.medium}",
				color: "{color.semantic.label.normal}",
			},
			{
				kind: "group",
				id: "input",
				layout: {
					mode: "HORIZONTAL",
					primaryAxisSizingMode: "FIXED",
					counterAxisSizingMode: "FIXED",
					counterAxisAlignItems: "CENTER",
					width: "FILL",
					height: "48px",
					paddingLeft: "{spacing.16}",
					paddingRight: "{spacing.16}",
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
						id: "placeholder",
						content: placeholder,
						textStyle: "{typography.body1.regular}",
						color: "{color.semantic.label.assistive}",
					},
				],
			},
		],
	} as const;
}
