import type { ComponentSpecDraft } from "../types";
import {
	filterTabsFigmaSpec as filterTabsComponentFigmaSpec,
	formFieldFigmaSpec as formFieldComponentFigmaSpec,
	mediaBlockFigmaSpec as mediaBlockComponentFigmaSpec,
	queryBarFigmaSpec as queryBarComponentFigmaSpec,
	selectFieldFigmaSpec as selectFieldComponentFigmaSpec,
} from "@pxds/pxds-components/shared";

export const infoListRowFigmaSpec = {
	$schema: "component-spec-v1",
	name: "mol/info-list-row",
	category: "mol",
	description: "Flow summary info row with thumbnail, title, and value chip.",
	base: {
		layout: {
			mode: "HORIZONTAL",
			primaryAxisSizingMode: "FIXED",
			counterAxisSizingMode: "FIXED",
			counterAxisAlignItems: "CENTER",
			width: "FILL",
			height: "64px",
			itemSpacing: "{spacing.12}",
		},
		children: [
			{
				kind: "group",
				id: "media",
				layout: {
					mode: "HORIZONTAL",
					primaryAxisSizingMode: "FIXED",
					counterAxisSizingMode: "FIXED",
					primaryAxisAlignItems: "CENTER",
					counterAxisAlignItems: "CENTER",
					width: "48px",
					height: "48px",
				},
				visual: {
					fill: "{color.semantic.fill.alternative}",
					cornerRadius: "{spacing.16}",
				},
				children: [
					{
						kind: "text",
						id: "mediaIcon",
						content: "▧",
						textStyle: "{typography.caption1.medium}",
						color: "{color.semantic.label.disable}",
					},
				],
			},
			{
				kind: "text",
				id: "title",
				content: "탈퇴 일시",
				textStyle: "{typography.label1.medium}",
				color: "{color.semantic.label.normal}",
				autoResize: "HEIGHT",
				layoutGrow: 1,
				exposeAs: "title",
			},
			{
				kind: "group",
				id: "valueChip",
				layout: {
					mode: "HORIZONTAL",
					primaryAxisSizingMode: "AUTO",
					counterAxisSizingMode: "FIXED",
					primaryAxisAlignItems: "CENTER",
					counterAxisAlignItems: "CENTER",
					height: "32px",
					paddingLeft: "{spacing.12}",
					paddingRight: "{spacing.12}",
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
						id: "value",
						content: "2026-05-04 14:32",
						textStyle: "{typography.body1.medium}",
						color: "{color.semantic.label.normal}",
						exposeAs: "value",
					},
				],
			},
		],
	},
} satisfies ComponentSpecDraft;

export const mediaBlockFigmaSpec =
	mediaBlockComponentFigmaSpec as ComponentSpecDraft;

export const queryBarFigmaSpec =
	queryBarComponentFigmaSpec as ComponentSpecDraft;

export const selectFieldFigmaSpec =
	selectFieldComponentFigmaSpec as ComponentSpecDraft;

export const formFieldFigmaSpec =
	formFieldComponentFigmaSpec as ComponentSpecDraft;

export const filterTabsFigmaSpec =
	filterTabsComponentFigmaSpec as ComponentSpecDraft;






export const termsAgreementRowFigmaSpec = {
	$schema: "component-spec-v1",
	name: "mol/terms-agreement-row",
	category: "mol",
	description: "Agreement row with checkbox, title, and caption.",
	base: {
		layout: {
			mode: "HORIZONTAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			counterAxisAlignItems: "MIN",
			width: "FILL",
			paddingTop: "{spacing.12}",
			paddingBottom: "{spacing.12}",
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
						color: "{color.semantic.line.solid.normal}",
						weight: 1,
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
					itemSpacing: "{spacing.2}",
				},
				layoutGrow: 1,
				children: [
					{
						kind: "text",
						id: "title",
						content: "서비스 이용약관",
						textStyle: "{typography.body1.medium}",
						color: "{color.semantic.label.normal}",
						autoResize: "HEIGHT",
						layoutAlign: "STRETCH",
						exposeAs: "title",
					},
					{
						kind: "text",
						id: "caption",
						content: "필수 · v1.0",
						textStyle: "{typography.caption1.medium}",
						color: "{color.semantic.status.negative}",
						autoResize: "HEIGHT",
						layoutAlign: "STRETCH",
						exposeAs: "caption",
					},
				],
			},
		],
	},
	variants: {
		axes: [{ name: "tone", values: ["required", "optional", "all"] }],
		overrides: {
			"tone=optional": {
				"children[copy].children[caption].content":
					"선택 · 동의하지 않아도 가입 가능",
				"children[copy].children[caption].color":
					"{color.semantic.label.alternative}",
			},
			"tone=all": {
				"children[copy].children[title].content": "전체 동의",
				"children[copy].children[title].textStyle":
					"{typography.headline1.medium}",
				"children[copy].children[caption].content":
					"선택 약관까지 한 번에 동의",
				"children[copy].children[caption].color":
					"{color.semantic.label.alternative}",
			},
		},
	},
} satisfies ComponentSpecDraft;
