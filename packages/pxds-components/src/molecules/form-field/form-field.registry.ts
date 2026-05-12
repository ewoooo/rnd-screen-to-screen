import { formFieldFigmaSpec } from "./form-field.figma";
import { formFieldRenderReact } from "./FormField";

export const formFieldRegistryEntry = {
	id: "form-field",
	name: "FormField",
	layer: "molecule",
	owner: "@pxds/pxds-components",
	importPath: "@pxds/pxds-components/molecules/form-field",
	group: "form",
	status: "active",
	createdAt: "2026-04-30",
	figmaSpec: () => formFieldFigmaSpec,
	renderReact: formFieldRenderReact,
	composedOf: [
		"wds-form-field",
		"wds-form-label",
		"wds-form-message",
	],
	sbAliases: ["text-field"],
	policySlots: {
		hint: "policy.copy.requirement",
		error: "policy.copy.error",
	},
} as const;
