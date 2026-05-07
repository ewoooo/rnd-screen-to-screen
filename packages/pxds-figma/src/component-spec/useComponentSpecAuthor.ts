"use client";

import { useState } from "react";

import { validateComponentSpec } from "./validation";

export type ComponentSpecCategory = "atom" | "molecule" | "organism" | "template";
export type ComponentSpecLayoutMode = "HORIZONTAL" | "VERTICAL" | "NONE";
export type ComponentSpecSizingMode = "FIXED" | "HUG" | "FILL";
export type ComponentSpecAlignItems = "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN";

type ComponentSpecToken = `{${string}}`;
export type ComponentSpecValue = ComponentSpecToken | string | number | null;

export type ComponentSpecLayout = {
	mode?: ComponentSpecLayoutMode;
	primaryAxisSizingMode?: ComponentSpecSizingMode;
	counterAxisSizingMode?: ComponentSpecSizingMode;
	primaryAxisAlignItems?: ComponentSpecAlignItems;
	counterAxisAlignItems?: ComponentSpecAlignItems;
	paddingTop?: ComponentSpecValue;
	paddingBottom?: ComponentSpecValue;
	paddingLeft?: ComponentSpecValue;
	paddingRight?: ComponentSpecValue;
	itemSpacing?: ComponentSpecValue;
	width?: ComponentSpecValue;
	height?: ComponentSpecValue;
};

export type ComponentSpecVisual = {
	cornerRadius?: ComponentSpecValue;
	fill?: ComponentSpecValue;
	stroke?: ComponentSpecValue;
	shadow?: ComponentSpecValue;
};

export type ComponentSpecChild = {
	kind: "ref";
	id: string;
	component: string;
	exposeAs?: string;
};

export type ComponentSpecVariantAxis = {
	name: string;
	values: string[];
};

export type ComponentSpecVariantOverride = {
	layout?: ComponentSpecLayout;
	visual?: ComponentSpecVisual;
};

export type ComponentSpecDraft = {
	$schema: "component-spec-v1";
	name: string;
	category: ComponentSpecCategory;
	description?: string;
	widthFallback?: ComponentSpecValue;
	base: {
		layout?: ComponentSpecLayout;
		visual?: ComponentSpecVisual;
		children?: ComponentSpecChild[];
	};
	variants?: {
		axes: ComponentSpecVariantAxis[];
		overrides?: Record<string, ComponentSpecVariantOverride>;
	};
};

export type ComponentSpecValidation = {
	ok: boolean;
	errors: string[];
};

const EMPTY_DRAFT: ComponentSpecDraft = {
	$schema: "component-spec-v1",
	name: "",
	category: "atom",
	base: {},
};

export function useComponentSpecAuthor(initialDraft?: Partial<ComponentSpecDraft>) {
	const [draft, setDraft] = useState<ComponentSpecDraft>({
		...EMPTY_DRAFT,
		...initialDraft,
		base: {
			...EMPTY_DRAFT.base,
			...initialDraft?.base,
		},
	});

	const validation = validateComponentSpec(draft);

	const updateDraft = (patch: Partial<ComponentSpecDraft>) => {
		setDraft((current) => ({
			...current,
			...patch,
			base: patch.base
				? {
						...current.base,
						...patch.base,
					}
				: current.base,
		}));
	};

	const resetDraft = () => {
		setDraft(EMPTY_DRAFT);
	};

	const exportJson = () => {
		return JSON.stringify(draft, null, 2);
	};

	return {
		draft,
		validation,
		updateDraft,
		resetDraft,
		exportJson,
		isValid: validation.ok,
	};
}
