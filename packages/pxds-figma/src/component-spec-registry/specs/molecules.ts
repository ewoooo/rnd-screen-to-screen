import type { ComponentSpecDraft } from "../../component-spec/types";

export const mediaBlockFigmaSpec = {
	$schema: "component-spec-v1",
	name: "mol/media-block",
	category: "mol",
	description: "Reusable media surface with optional badge slot.",
	base: {
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "FIXED",
			counterAxisSizingMode: "FIXED",
			width: "224px",
			height: "168px",
		},
		visual: {
			fill: "{semantic.background.elevated.alternative}",
			stroke: {
				color: "{semantic.line.normal.normal}",
				weight: 1,
			},
			cornerRadius: "{spacing.12}",
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
					fill: "{semantic.primary.normal}",
					cornerRadius: "{spacing.8}",
				},
				layoutPositioning: "ABSOLUTE",
				x: 164,
				y: 12,
				constraints: {
					horizontal: "RIGHT",
					vertical: "TOP",
				},
				children: [
					{
						kind: "text",
						id: "text",
						content: "NEW",
						textStyle: "{typography.caption1.medium}",
						color: "#ffffff",
						exposeAs: "badgeText",
					},
				],
			},
		],
	},
} satisfies ComponentSpecDraft;

export const queryBarFigmaSpec = {
	$schema: "component-spec-v1",
	name: "mol/query-bar",
	category: "mol",
	description: "Read-only search/query input pattern.",
	widthFallback: "{foundation.dimension.size.screen-content-width}",
	base: {
		layout: {
			mode: "HORIZONTAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			counterAxisAlignItems: "CENTER",
			paddingTop: "{spacing.12}",
			paddingBottom: "{spacing.12}",
			paddingLeft: "{spacing.16}",
			paddingRight: "{spacing.16}",
			itemSpacing: "{spacing.8}",
			width: "FILL",
			height: "48px",
		},
		visual: {
			fill: "{semantic.background.elevated.normal}",
			stroke: {
				color: "{semantic.line.normal.normal}",
				weight: 1,
			},
			cornerRadius: "{spacing.12}",
		},
		children: [
			{
				kind: "text",
				id: "value",
				content: "디자인 시스템",
				textStyle: "{typography.body1.regular}",
				color: "{semantic.label.alternative}",
				layoutGrow: 1,
				autoResize: "HEIGHT",
				exposeAs: "value",
			},
		],
	},
} satisfies ComponentSpecDraft;

export const selectFieldFigmaSpec = {
	$schema: "component-spec-v1",
	name: "mol/select-field",
	category: "mol",
	description: "Select control pattern with normalized options.",
	widthFallback: "{foundation.dimension.size.screen-content-width}",
	base: {
		layout: {
			mode: "HORIZONTAL",
			primaryAxisSizingMode: "FIXED",
			counterAxisSizingMode: "FIXED",
			counterAxisAlignItems: "CENTER",
			paddingLeft: "{spacing.16}",
			paddingRight: "{spacing.16}",
			itemSpacing: "{spacing.8}",
			width: "FILL",
			height: "48px",
		},
		visual: {
			fill: "{semantic.background.elevated.normal}",
			stroke: {
				color: "{semantic.line.normal.normal}",
				weight: 1,
			},
			cornerRadius: "{spacing.8}",
		},
		children: [
			{
				kind: "text",
				id: "value",
				content: "기본 옵션",
				textStyle: "{typography.body1.regular}",
				color: "{semantic.label.normal}",
				layoutGrow: 1,
				autoResize: "HEIGHT",
				exposeAs: "value",
			},
			{
				kind: "text",
				id: "indicator",
				content: "⌄",
				textStyle: "{typography.body1.medium}",
				color: "{semantic.label.assistive}",
			},
		],
	},
} satisfies ComponentSpecDraft;

export const formFieldFigmaSpec = {
	$schema: "component-spec-v1",
	name: "mol/form-field",
	category: "mol",
	description: "Label, helper, and field composition boundary.",
	widthFallback: "{foundation.dimension.size.screen-content-width}",
	base: {
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "AUTO",
			itemSpacing: "{spacing.8}",
			width: "FILL",
		},
		children: [
			{
				kind: "text",
				id: "label",
				content: "옵션",
				textStyle: "{typography.label1.medium}",
				color: "{semantic.label.normal}",
				exposeAs: "label",
			},
			{
				kind: "group",
				id: "field",
				layout: {
					mode: "HORIZONTAL",
					primaryAxisSizingMode: "FIXED",
					counterAxisSizingMode: "FIXED",
					counterAxisAlignItems: "CENTER",
					paddingLeft: "{spacing.16}",
					paddingRight: "{spacing.16}",
					itemSpacing: "{spacing.8}",
					width: "FILL",
					height: "48px",
				},
				visual: {
					fill: "{semantic.background.elevated.normal}",
					stroke: {
						color: "{semantic.line.normal.normal}",
						weight: 1,
					},
					cornerRadius: "{spacing.8}",
				},
				layoutAlign: "STRETCH",
				children: [
					{
						kind: "text",
						id: "value",
						content: "기본 옵션",
						textStyle: "{typography.body1.regular}",
						color: "{semantic.label.normal}",
						layoutGrow: 1,
						autoResize: "HEIGHT",
						exposeAs: "value",
					},
					{
						kind: "text",
						id: "indicator",
						content: "⌄",
						textStyle: "{typography.body1.medium}",
						color: "{semantic.label.assistive}",
					},
				],
			},
			{
				kind: "text",
				id: "helper",
				content: "선택 가능한 값을 확인합니다.",
				textStyle: "{typography.caption1.regular}",
				color: "{semantic.label.alternative}",
				exposeAs: "helperText",
			},
		],
	},
} satisfies ComponentSpecDraft;

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
						color: "{semantic.label.strong}",
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
							fill: "{semantic.label.strong}",
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
						color: "{semantic.label.assistive}",
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
							fill: "{semantic.label.strong}",
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
						color: "{semantic.label.assistive}",
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
							fill: "{semantic.label.strong}",
						},
						visible: false,
					},
				],
			},
		],
	},
} satisfies ComponentSpecDraft;
