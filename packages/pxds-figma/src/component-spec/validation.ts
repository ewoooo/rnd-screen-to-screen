import type { ComponentSpecDraft, ComponentSpecValidation } from "./types";

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

	validateChildren(draft.base.children, errors);

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

function validateChildren(
	children: ComponentSpecDraft["base"]["children"],
	errors: string[],
) {
	for (const child of children ?? []) {
		if (!child.id.trim()) errors.push("child.id is required.");
		if (child.kind === "ref" && !child.component.trim()) {
			errors.push("ref child.component is required.");
		}
		if (child.kind === "text" && !child.content.trim()) {
			errors.push("text child.content is required.");
		}
		if (child.kind === "group") {
			validateChildren(child.children, errors);
		}
	}
}
