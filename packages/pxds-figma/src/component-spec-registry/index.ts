import type { ComponentSpecDraft } from "../component-spec/types";
import {
	dividerFigmaSpec,
	placeholderFigmaSpec,
	textBlockFigmaSpec,
} from "./specs/atoms";
import {
	filterTabsFigmaSpec,
	formFieldFigmaSpec,
	mediaBlockFigmaSpec,
	queryBarFigmaSpec,
	selectFieldFigmaSpec,
} from "./specs/molecules";

export type ComponentFigmaSpecRegistryEntry = {
	componentId: string;
	spec: ComponentSpecDraft;
};

export const componentFigmaSpecRegistry = [
	{ componentId: "text-block", spec: textBlockFigmaSpec },
	{ componentId: "divider", spec: dividerFigmaSpec },
	{ componentId: "placeholder", spec: placeholderFigmaSpec },
	{ componentId: "media-block", spec: mediaBlockFigmaSpec },
	{ componentId: "query-bar", spec: queryBarFigmaSpec },
	{ componentId: "filter-tabs", spec: filterTabsFigmaSpec },
	{ componentId: "form-field", spec: formFieldFigmaSpec },
	{ componentId: "select-field", spec: selectFieldFigmaSpec },
] as const satisfies readonly ComponentFigmaSpecRegistryEntry[];

export type ComponentFigmaSpecComponentId =
	(typeof componentFigmaSpecRegistry)[number]["componentId"];

export function getComponentFigmaSpec(
	componentId: string | null | undefined,
): ComponentSpecDraft | null {
	if (!componentId) return null;
	return (
		componentFigmaSpecRegistry.find((entry) => entry.componentId === componentId)
			?.spec ?? null
	);
}

export function hasComponentFigmaSpec(componentId: string | null | undefined) {
	return Boolean(getComponentFigmaSpec(componentId));
}
