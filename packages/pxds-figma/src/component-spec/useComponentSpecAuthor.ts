"use client";

import { useState } from "react";

import { validateComponentSpec } from "./validation";
import type { ComponentSpecDraft } from "./types";

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
