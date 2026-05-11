import type { ComponentSpecDraft } from "../../component-spec/types";

export const textBlockFigmaSpec = {
	$schema: "component-spec-v1",
	name: "atom/text-block",
	category: "atom",
	description: "PXDS typography primitive for screen copy.",
	base: {
		layout: {
			mode: "HORIZONTAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "AUTO",
		},
		children: [
			{
				kind: "text",
				id: "text",
				content: "멤버십 혜택을 한눈에 확인하세요",
				textStyle: "{typography.body1.medium}",
				color: "{color.semantic.label.normal}",
				autoResize: "WIDTH_AND_HEIGHT",
				exposeAs: "text",
			},
		],
	},
} satisfies ComponentSpecDraft;

export const dividerFigmaSpec = {
	$schema: "component-spec-v1",
	name: "atom/divider",
	category: "atom",
	description: "Inset-aware feedback divider.",
	base: {
		layout: {
			mode: "VERTICAL",
			width: "{dimension.size.screen-content-width}",
			height: "{spacing.1}",
		},
		visual: {
			fill: "{color.semantic.line.normal.normal}",
		},
	},
} satisfies ComponentSpecDraft;

export const placeholderFigmaSpec = {
	$schema: "component-spec-v1",
	name: "atom/placeholder",
	category: "atom",
	description: "Thumbnail based empty media surface.",
	base: {
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "FIXED",
			counterAxisSizingMode: "FIXED",
			primaryAxisAlignItems: "CENTER",
			counterAxisAlignItems: "CENTER",
			width: "104px",
			height: "104px",
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
				id: "label",
				content: "IMG",
				textStyle: "{typography.body2.medium}",
				color: "{color.semantic.label.assistive}",
				exposeAs: "label",
			},
		],
	},
} satisfies ComponentSpecDraft;
