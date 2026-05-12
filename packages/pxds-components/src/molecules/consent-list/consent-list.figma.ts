const defaultItems = [
	{
		id: "service",
		title: "[필수] 서비스 이용약관 동의",
		caption: "필수 · 회원 가입 및 서비스 이용을 위해 필요합니다.",
		required: true,
	},
	{
		id: "privacy",
		title: "[필수] 개인정보 수집·이용 동의",
		caption: "필수 · 이름·연락처 등 회원 정보 처리에 필요합니다.",
		required: true,
	},
	{
		id: "marketing",
		title: "[선택] 마케팅 정보 수신 동의",
		caption: "선택 · 혜택·이벤트 안내를 받습니다.",
		required: false,
	},
] as const;

export const consentListFigmaSpec = {
	$schema: "component-spec-v1",
	name: "mol/consent-list",
	category: "mol",
	description:
		"Agreement checklist with all-select row, dividers, and required-state helper copy.",
	widthFallback: "{dimension.size.screen-content-width}",
	base: {
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
			height: "HUG",
		},
		children: [
			createConsentRow("all", {
				title: "전체 동의",
				caption: "필수·선택 약관을 모두 동의합니다",
				emphasis: true,
				invalid: false,
			}),
			createDivider("divider-all"),
			...defaultItems.flatMap((item, index) => [
				createConsentRow(item.id, {
					title: item.title,
					caption: item.caption,
					emphasis: false,
					invalid: item.required,
				}),
				...(index < defaultItems.length - 1
					? [createDivider(`divider-${index}`)]
					: []),
			]),
			{
				kind: "group",
				id: "required-helper",
				layout: {
					mode: "VERTICAL",
					primaryAxisSizingMode: "AUTO",
					counterAxisSizingMode: "FIXED",
					width: "FILL",
					paddingTop: "{spacing.8}",
				},
				children: [
					{
						kind: "text",
						id: "required-helper-text",
						content: "2개의 필수 약관 동의가 필요합니다.",
						textStyle: "{typography.caption1.regular}",
						color: "{color.semantic.status.negative}",
						exposeAs: "requiredHelperText",
					},
				],
			},
		],
	},
} as const;

function createConsentRow(
	id: string,
	props: {
		title: string;
		caption: string;
		emphasis: boolean;
		invalid: boolean;
	},
) {
	return {
		kind: "group",
		id: `consent-row-${id}`,
		layout: {
			mode: "HORIZONTAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			counterAxisAlignItems: "CENTER",
			width: "FILL",
			minHeight: props.emphasis ? "60px" : "64px",
			itemSpacing: "{spacing.12}",
		},
		children: [
			{
				kind: "group",
				id: "checkbox",
				layout: {
					mode: "HORIZONTAL",
					primaryAxisSizingMode: "FIXED",
					counterAxisSizingMode: "FIXED",
					width: "20px",
					height: "20px",
				},
				visual: {
					fill: "{color.semantic.background.elevated.normal}",
					stroke: {
						color: props.invalid
							? "{color.semantic.status.negative}"
							: "{color.semantic.line.normal.normal}",
						weight: 1.5,
					},
					cornerRadius: "{spacing.4}",
				},
			},
			{
				kind: "group",
				id: "copy",
				layout: {
					mode: "VERTICAL",
					primaryAxisSizingMode: "AUTO",
					counterAxisSizingMode: "FIXED",
					width: "FILL",
					itemSpacing: "{spacing.4}",
				},
				layoutGrow: 1,
				children: [
					{
						kind: "text",
						id: "title",
						content: props.title,
						textStyle: props.emphasis
							? "{typography.heading1.medium}"
							: "{typography.body1.medium}",
						color: "{color.semantic.label.normal}",
						autoResize: "HEIGHT",
					},
					{
						kind: "text",
						id: "caption",
						content: props.caption,
						textStyle: "{typography.body2.regular}",
						color: props.invalid
							? "{color.semantic.status.negative}"
							: "{color.semantic.label.alternative}",
						autoResize: "HEIGHT",
					},
				],
			},
		],
	} as const;
}

function createDivider(id: string) {
	return {
		kind: "group",
		id,
		layout: {
			mode: "HORIZONTAL",
			primaryAxisSizingMode: "FIXED",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
			height: "1px",
		},
		visual: {
			fill: "{color.semantic.line.solid.alternative}",
		},
	} as const;
}
