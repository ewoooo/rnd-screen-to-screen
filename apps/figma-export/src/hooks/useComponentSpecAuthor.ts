"use client";

import { useCallback, useMemo, useState } from "react";

type ComponentSpecCategory = "atom" | "molecule" | "organism" | "template";
type ComponentSpecLayoutMode = "HORIZONTAL" | "VERTICAL" | "NONE";
type ComponentSpecSizingMode = "FIXED" | "HUG" | "FILL";
type ComponentSpecAlignItems = "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN";

type ComponentSpecToken = `{${string}}`;
type ComponentSpecValue = ComponentSpecToken | string | number | null;

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

type ComponentSpecValidation = {
	ok: boolean;
	errors: string[];
};

const EMPTY_DRAFT: ComponentSpecDraft = {
	$schema: "component-spec-v1",
	name: "",
	category: "atom",
	base: {},
};

function validateComponentSpec(draft: ComponentSpecDraft): ComponentSpecValidation {
	const errors: string[] = [];

	if (draft.$schema !== "component-spec-v1") {
		errors.push("schema must be component-spec-v1.");
	}

	if (!draft.name.trim()) {
		errors.push("name is required.");
	}

	if (!draft.name.includes("/")) {
		errors.push("name should include a layer path, e.g. atom/icon-bubble.");
	}

	for (const child of draft.base.children ?? []) {
		if (!child.id.trim()) errors.push("child.id is required.");
		if (!child.component.trim()) errors.push("child.component is required.");
	}

	for (const axis of draft.variants?.axes ?? []) {
		if (!axis.name.trim()) errors.push("variant axis name is required.");
		if (axis.values.length === 0) {
			errors.push(`variant axis ${axis.name || "(unnamed)"} needs values.`);
		}
	}

	return {
		ok: errors.length === 0,
		errors,
	};
}

export function useComponentSpecAuthor(initialDraft?: Partial<ComponentSpecDraft>) {
	const [draft, setDraft] = useState<ComponentSpecDraft>({
		...EMPTY_DRAFT,
		...initialDraft,
		base: {
			...EMPTY_DRAFT.base,
			...initialDraft?.base,
		},
	});

	const validation = useMemo(() => validateComponentSpec(draft), [draft]);

	const updateDraft = useCallback((patch: Partial<ComponentSpecDraft>) => {
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
	}, []);

	const resetDraft = useCallback(() => {
		setDraft(EMPTY_DRAFT);
	}, []);

	const exportJson = useCallback(() => {
		return JSON.stringify(draft, null, 2);
	}, [draft]);

	return {
		draft,
		validation,
		updateDraft,
		resetDraft,
		exportJson,
		isValid: validation.ok,
	};
}
