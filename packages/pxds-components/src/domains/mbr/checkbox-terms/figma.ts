const termRows = [
	{
		id: "service",
		title: "[필수] 서비스 이용약관 동의",
		caption: "회원 가입 및 서비스 이용을 위해 필요합니다.",
		required: true,
	},
	{
		id: "privacy",
		title: "[필수] 개인정보 수집·이용 동의",
		caption: "이름·연락처 등 회원 정보 처리에 필요합니다.",
		required: true,
	},
	{
		id: "marketing",
		title: "[선택] 마케팅 정보 수신 동의",
		caption: "혜택·이벤트 안내를 받습니다.",
		required: false,
	},
] as const;

export const checkboxTermsFigmaSpec = {
	$schema: "component-spec-v1",
	name: "ogn/mbr-checkbox-terms",
	category: "ogn",
	description: "MBR required and optional terms agreement list.",
	base: {
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
			paddingTop: "{spacing.16}",
			paddingBottom: "{spacing.16}",
			paddingLeft: "{spacing.16}",
			paddingRight: "{spacing.16}",
			itemSpacing: "{spacing.8}",
		},
		visual: {
			fill: "{color.semantic.background.elevated.normal}",
			stroke: {
				color: "{color.semantic.line.normal.normal}",
				weight: 1,
			},
			cornerRadius: "{spacing.12}",
		},
		children: [
			createTermRow("all", "전체 동의", "필수·선택 약관을 모두 동의합니다", "all"),
			createDivider("divider-all"),
			...termRows.flatMap((item, index) => [
				createTermRow(
					item.id,
					item.title,
					item.caption,
					item.required ? "required" : "optional",
				),
				...(index < termRows.length - 1 ? [createDivider(`divider-${index}`)] : []),
			]),
		],
	},
} as const;

function createTermRow(
	id: string,
	title: string,
	caption: string,
	tone: "all" | "required" | "optional",
) {
	return {
		kind: "group",
		id: `terms-row-${id}`,
		layout: {
			mode: "HORIZONTAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			counterAxisAlignItems: "CENTER",
			width: "FILL",
			minHeight: tone === "all" ? "60px" : "64px",
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
						color: "{color.semantic.line.normal.normal}",
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
						content: title,
						textStyle:
							tone === "all"
								? "{typography.heading1.medium}"
								: "{typography.body1.medium}",
						color: "{color.semantic.label.normal}",
						autoResize: "HEIGHT",
						exposeAs: tone === "all" ? "allLabel" : undefined,
					},
					{
						kind: "text",
						id: "caption",
						content: caption,
						textStyle: "{typography.body2.regular}",
						color:
							tone === "required"
								? "{color.semantic.status.negative}"
								: "{color.semantic.label.alternative}",
						autoResize: "HEIGHT",
						exposeAs: tone === "all" ? "allCaption" : undefined,
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
