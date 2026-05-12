const memberInfoFields = [
	["아이디", "영문, 숫자 6~20자", "중복확인"],
	["비밀번호", "영문/숫자/특수문자 조합 10~20자"],
	["비밀번호 확인", "비밀번호 재입력"],
	["이메일", "example@domain.com"],
	["휴대폰번호", "숫자만 입력"],
] as const;

export const textFieldMemberInfoFigmaSpec = {
	$schema: "component-spec-v1",
	name: "ogn/mbr-text-field-member-info",
	category: "ogn",
	description: "MBR member information field set.",
	base: {
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
			itemSpacing: "{spacing.16}",
		},
		children: memberInfoFields.map(([label, placeholder, action]) =>
			action
				? createFieldWithAction(label, placeholder, action)
				: createField(label, placeholder),
		),
	},
} as const;

function createField(label: string, placeholder: string) {
	return {
		kind: "group",
		id: toId(label),
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
			itemSpacing: "{spacing.8}",
		},
		children: [createLabel(label), createInput(placeholder)],
	} as const;
}

function createFieldWithAction(label: string, placeholder: string, action: string) {
	return {
		kind: "group",
		id: toId(label),
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
			itemSpacing: "{spacing.8}",
		},
		children: [
			createLabel(label),
			{
				kind: "group",
				id: `${toId(label)}-row`,
				layout: {
					mode: "HORIZONTAL",
					primaryAxisSizingMode: "AUTO",
					counterAxisSizingMode: "FIXED",
					counterAxisAlignItems: "CENTER",
					width: "FILL",
					height: "48px",
					itemSpacing: "{spacing.8}",
				},
				children: [
					{
						...createInput(placeholder),
						layoutGrow: 1,
					},
					{
						kind: "group",
						id: `${toId(label)}-action`,
						layout: {
							mode: "HORIZONTAL",
							primaryAxisSizingMode: "AUTO",
							counterAxisSizingMode: "FIXED",
							counterAxisAlignItems: "CENTER",
							paddingLeft: "{spacing.16}",
							paddingRight: "{spacing.16}",
							width: "HUG",
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
								id: `${toId(label)}-action-label`,
								content: action,
								textStyle: "{typography.body1.medium}",
								color: "{color.semantic.label.normal}",
							},
						],
					},
				],
			},
		],
	} as const;
}

function createLabel(label: string) {
	return {
		kind: "text",
		id: `${toId(label)}-label`,
		content: `${label} *`,
		textStyle: "{typography.label1.medium}",
		color: "{color.semantic.label.normal}",
		autoResize: "HEIGHT",
	} as const;
}

function createInput(placeholder: string) {
	return {
		kind: "group",
		id: `${toId(placeholder)}-input`,
		layout: {
			mode: "HORIZONTAL",
			primaryAxisSizingMode: "FIXED",
			counterAxisSizingMode: "FIXED",
			counterAxisAlignItems: "CENTER",
			paddingLeft: "{spacing.16}",
			paddingRight: "{spacing.16}",
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
				id: `${toId(placeholder)}-placeholder`,
				content: placeholder,
				textStyle: "{typography.body1.regular}",
				color: "{color.semantic.label.assistive}",
				autoResize: "HEIGHT",
			},
		],
	} as const;
}

function toId(value: string) {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9가-힣]+/g, "-")
		.replace(/^-|-$/g, "");
}
