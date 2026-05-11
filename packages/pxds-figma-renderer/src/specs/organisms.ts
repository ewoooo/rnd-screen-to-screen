import type { ComponentSpecDraft } from "../types";

export const ncTopBarFigmaSpec = {
	$schema: "component-spec-v1",
	name: "ogn/nc-top-bar",
	category: "ogn",
	description: "NC flow top navigation with progress indicator.",
	base: {
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "FIXED",
			counterAxisSizingMode: "FIXED",
			width: "375px",
			height: "92px",
		},
		visual: {
			fill: "{color.semantic.surface.page.normal}",
		},
		children: [
			{
				kind: "group",
				id: "nav",
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
						content: "×",
						textStyle: "{typography.title2.medium}",
						color: "{color.semantic.label.normal}",
						exposeAs: "leadingIcon",
					},
					{
						kind: "text",
						id: "title",
						content: "회원가입",
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
				id: "track",
				layout: {
					mode: "HORIZONTAL",
					primaryAxisSizingMode: "FIXED",
					counterAxisSizingMode: "FIXED",
					width: "FILL",
					height: "2px",
				},
				visual: {
					fill: "{color.semantic.line.normal.alternative}",
				},
				children: [
					{
						kind: "group",
						id: "progress",
						layout: {
							mode: "HORIZONTAL",
							width: "94px",
							height: "2px",
						},
						visual: {
							fill: "{color.semantic.primary.normal}",
						},
					},
				],
			},
		],
	},
} satisfies ComponentSpecDraft;

export const ncHeroFigmaSpec = {
	$schema: "component-spec-v1",
	name: "ogn/nc-hero",
	category: "ogn",
	description: "NC flow primary copy block.",
	base: {
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
			paddingTop: "{spacing.24}",
			paddingBottom: "{spacing.32}",
			itemSpacing: "{spacing.16}",
		},
		children: [
			{
				kind: "text",
				id: "title",
				content: "약관에 동의하고\n가입을 시작하세요",
				textStyle: "{typography.title1.medium}",
				color: "{color.semantic.label.normal}",
				autoResize: "HEIGHT",
				exposeAs: "title",
				layoutAlign: "STRETCH",
			},
			{
				kind: "text",
				id: "description",
				content:
					"필수 약관에 동의하면 다음 단계로 진행할 수 있어요. 선택 약관은 가입 후에도 변경할 수 있습니다.",
				textStyle: "{typography.body1.medium}",
				color: "{color.semantic.label.alternative}",
				autoResize: "HEIGHT",
				exposeAs: "description",
				layoutAlign: "STRETCH",
			},
		],
	},
} satisfies ComponentSpecDraft;

export const flowHeroFigmaSpec = {
	$schema: "component-spec-v1",
	name: "ogn/flow-hero",
	category: "ogn",
	description: "Web renderer aligned FlowHero copy block.",
	base: {
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
			paddingTop: "{spacing.24}",
			paddingBottom: "{spacing.32}",
			itemSpacing: "{spacing.16}",
		},
		children: [
			{
				kind: "text",
				id: "title",
				content: "탈퇴가 처리됐어요\n그동안 함께해 주셔서 감사해요",
				textStyle: "{typography.title2.medium}",
				color: "{color.semantic.label.normal}",
				autoResize: "HEIGHT",
				exposeAs: "title",
				layoutAlign: "STRETCH",
			},
			{
				kind: "text",
				id: "description",
				content: "30일 이내에 같은 정보로 로그인하면 탈퇴를 철회할 수 있어요.",
				textStyle: "{typography.body2.medium}",
				color: "{color.semantic.label.alternative}",
				autoResize: "HEIGHT",
				exposeAs: "description",
				layoutAlign: "STRETCH",
			},
		],
	},
} satisfies ComponentSpecDraft;

export const flowSummaryCardFigmaSpec = {
	$schema: "component-spec-v1",
	name: "ogn/flow-summary-card",
	category: "ogn",
	description:
		"FlowSummaryCard component boundary. Page assembly expands data rows recursively.",
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
			itemSpacing: "{spacing.16}",
		},
		visual: {
			fill: "{color.semantic.background.elevated.normal}",
			stroke: {
				color: "{color.semantic.line.solid.alternative}",
				weight: 1,
			},
			cornerRadius: "{spacing.12}",
		},
		children: [
			{
				kind: "text",
				id: "title",
				content: "탈퇴 정보",
				textStyle: "{typography.headline1.medium}",
				color: "{color.semantic.label.normal}",
				exposeAs: "title",
			},
		],
	},
} satisfies ComponentSpecDraft;

export const flowNoticeFigmaSpec = {
	$schema: "component-spec-v1",
	name: "ogn/flow-notice",
	category: "ogn",
	description: "Web renderer aligned FlowNotice / NoticeBlock.",
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
			itemSpacing: "{spacing.4}",
		},
		visual: {
			fill: "{color.semantic.background.normal.alternative}",
			stroke: {
				color: "{color.semantic.line.solid.alternative}",
				weight: 1,
			},
		},
		children: [
			{
				kind: "group",
				id: "badge",
				layout: {
					mode: "HORIZONTAL",
					primaryAxisSizingMode: "AUTO",
					counterAxisSizingMode: "AUTO",
					paddingTop: "{spacing.4}",
					paddingBottom: "{spacing.4}",
					paddingLeft: "{spacing.8}",
					paddingRight: "{spacing.8}",
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
						id: "badgeText",
						content: "안내",
						textStyle: "{typography.caption1.medium}",
						color: "{color.semantic.primary.normal}",
						exposeAs: "badge",
					},
				],
			},
			{
				kind: "text",
				id: "text",
				content:
					"유예 기간 후에는 회원 정보가 영구 삭제되며, 동일 정보로 즉시 재가입할 수 없을 수 있어요.",
				textStyle: "{typography.body1.medium}",
				color: "{color.semantic.label.normal}",
				autoResize: "HEIGHT",
				layoutAlign: "STRETCH",
				exposeAs: "text",
			},
		],
	},
} satisfies ComponentSpecDraft;

export const flowResultActionsFigmaSpec = {
	$schema: "component-spec-v1",
	name: "ogn/flow-result-actions",
	category: "ogn",
	description: "Web renderer aligned FlowResultActions / PrimaryCTABar.",
	base: {
		layout: {
			mode: "HORIZONTAL",
			primaryAxisSizingMode: "FIXED",
			counterAxisSizingMode: "FIXED",
			counterAxisAlignItems: "CENTER",
			width: "375px",
			height: "80px",
			paddingTop: "{spacing.12}",
			paddingBottom: "{spacing.20}",
			paddingLeft: "{spacing.16}",
			paddingRight: "{spacing.16}",
			itemSpacing: "{spacing.8}",
		},
		visual: {
			fill: "{color.semantic.surface.page.normal}",
		},
		children: [
			{
				kind: "group",
				id: "secondaryButton",
				layout: {
					mode: "HORIZONTAL",
					primaryAxisSizingMode: "FIXED",
					counterAxisSizingMode: "FIXED",
					primaryAxisAlignItems: "CENTER",
					counterAxisAlignItems: "CENTER",
					width: "112px",
					height: "48px",
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
					{
						kind: "text",
						id: "secondaryLabel",
						content: "탈퇴 철회 안내",
						textStyle: "{typography.body1.medium}",
						color: "{color.semantic.label.normal}",
						exposeAs: "secondaryLabel",
					},
				],
			},
			{
				kind: "group",
				id: "primaryButton",
				layout: {
					mode: "HORIZONTAL",
					primaryAxisSizingMode: "FIXED",
					counterAxisSizingMode: "FIXED",
					primaryAxisAlignItems: "CENTER",
					counterAxisAlignItems: "CENTER",
					width: "223px",
					height: "48px",
				},
				visual: {
					fill: "{color.semantic.primary.normal}",
					cornerRadius: "{spacing.12}",
				},
				children: [
					{
						kind: "text",
						id: "primaryLabel",
						content: "홈으로 가기",
						textStyle: "{typography.body1.medium}",
						color: "{color.semantic.static.white}",
						exposeAs: "primaryLabel",
					},
				],
			},
		],
	},
} satisfies ComponentSpecDraft;

export const termsAgreementGroupFigmaSpec = {
	$schema: "component-spec-v1",
	name: "ogn/terms-agreement-group",
	category: "ogn",
	description: "Required/optional terms agreement section.",
	base: {
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
			paddingTop: "{spacing.24}",
			paddingBottom: "{spacing.24}",
			paddingLeft: "{spacing.16}",
			paddingRight: "{spacing.16}",
			itemSpacing: "{spacing.16}",
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
			{
				kind: "text",
				id: "title",
				content: "약관 동의",
				textStyle: "{typography.heading1.medium}",
				color: "{color.semantic.label.normal}",
				exposeAs: "title",
			},
			{
				kind: "text",
				id: "allLabel",
				content: "□ 전체 동의",
				textStyle: "{typography.headline1.medium}",
				color: "{color.semantic.label.normal}",
				exposeAs: "allLabel",
			},
			{
				kind: "text",
				id: "allCaption",
				content: "선택 약관까지 한 번에 동의",
				textStyle: "{typography.caption1.medium}",
				color: "{color.semantic.label.alternative}",
				exposeAs: "allCaption",
			},
			{
				kind: "text",
				id: "items",
				content:
					"□ 서비스 이용약관\n필수 · v1.0\n\n□ 개인정보 수집·이용 동의\n필수 · v1.0\n\n□ 개인정보 제3자 제공 동의\n필수 · v1.0\n\n□ 혜택·이벤트 정보 수신 동의\n선택 · 동의하지 않아도 가입 가능",
				textStyle: "{typography.body1.medium}",
				color: "{color.semantic.label.normal}",
				autoResize: "HEIGHT",
				layoutAlign: "STRETCH",
				exposeAs: "itemsText",
			},
		],
	},
} satisfies ComponentSpecDraft;

export const ncContinueBarFigmaSpec = {
	$schema: "component-spec-v1",
	name: "ogn/nc-continue-bar",
	category: "ogn",
	description: "NC flow bottom CTA bar.",
	base: {
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "375px",
			paddingTop: "{spacing.16}",
			paddingBottom: "{spacing.16}",
			paddingLeft: "{spacing.24}",
			paddingRight: "{spacing.24}",
			itemSpacing: "{spacing.12}",
		},
		visual: {
			fill: "{color.semantic.surface.page.normal}",
		},
		children: [
			{
				kind: "text",
				id: "eyebrow",
				content: "필수 약관 3개 동의가 남았어요",
				textStyle: "{typography.caption1.medium}",
				color: "{color.semantic.status.negative}",
				exposeAs: "eyebrow",
				autoResize: "HEIGHT",
				layoutAlign: "STRETCH",
			},
			{
				kind: "group",
				id: "button",
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
					fill: "{color.semantic.interaction.disable}",
					cornerRadius: "{spacing.12}",
				},
				children: [
					{
						kind: "text",
						id: "primaryAction",
						content: "동의하고 계속하기",
						textStyle: "{typography.body1.medium}",
						color: "{color.semantic.label.disable}",
						exposeAs: "primaryAction",
					},
				],
			},
		],
	},
} satisfies ComponentSpecDraft;
