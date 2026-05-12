export const listCellAuthMethodFigmaSpec = {
	$schema: "component-spec-v1",
	name: "ogn/mbr-list-cell-auth-method",
	category: "ogn",
	description: "MBR authentication method selection and verification area.",
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
				kind: "ref",
				id: "auth-methods",
				component: "mol/selectable-list",
				layoutAlign: "STRETCH",
			},
			createAuthCodeField(),
			{
				kind: "text",
				id: "timer",
				content: "남은 시간 02:48",
				textStyle: "{typography.body2.regular}",
				color: "{color.semantic.label.alternative}",
				exposeAs: "timerText",
			},
			{
				kind: "group",
				id: "actions",
				layout: {
					mode: "HORIZONTAL",
					primaryAxisSizingMode: "AUTO",
					counterAxisSizingMode: "FIXED",
					width: "FILL",
					itemSpacing: "{spacing.8}",
				},
				children: [
					createButton("request", "인증번호 요청", "primary"),
					createButton("resend", "재요청", "assistive"),
				],
			},
		],
	},
} as const;

function createAuthCodeField() {
	return {
		kind: "group",
		id: "auth-code-field",
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
				id: "auth-code-label",
				content: "인증번호 *",
				textStyle: "{typography.label1.medium}",
				color: "{color.semantic.label.normal}",
				exposeAs: "authCodeLabel",
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
						id: "auth-code-placeholder",
						content: "6자리 숫자",
						textStyle: "{typography.body1.regular}",
						color: "{color.semantic.label.assistive}",
						exposeAs: "authCodePlaceholder",
					},
				],
			},
			{
				kind: "text",
				id: "auth-code-helper",
				content: "유효시간 3분",
				textStyle: "{typography.body2.regular}",
				color: "{color.semantic.label.alternative}",
				exposeAs: "helperText",
			},
		],
	} as const;
}

function createButton(id: string, label: string, tone: "primary" | "assistive") {
	return {
		kind: "group",
		id,
		layout: {
			mode: "HORIZONTAL",
			primaryAxisSizingMode: "FIXED",
			counterAxisSizingMode: "FIXED",
			primaryAxisAlignItems: "CENTER",
			counterAxisAlignItems: "CENTER",
			width: "FILL",
			height: "48px",
		},
		layoutGrow: 1,
		visual: {
			fill:
				tone === "primary"
					? "{color.semantic.primary.normal}"
					: "{color.semantic.background.elevated.normal}",
			stroke:
				tone === "primary"
					? undefined
					: {
							color: "{color.semantic.line.normal.normal}",
							weight: 1,
						},
			cornerRadius: "{spacing.8}",
		},
		children: [
			{
				kind: "text",
				id: `${id}-label`,
				content: label,
				textStyle: "{typography.body1.medium}",
				color:
					tone === "primary"
						? "{color.semantic.static.white}"
						: "{color.semantic.label.normal}",
				exposeAs: `${id}Label`,
			},
		],
	} as const;
}
