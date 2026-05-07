import type { ComponentSpecDraft, ComponentSpecValidation } from "./useComponentSpecAuthor";

export function validateComponentSpec(
	draft: ComponentSpecDraft,
): ComponentSpecValidation {
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
