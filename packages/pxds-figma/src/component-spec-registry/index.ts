import {
	figmaRendererComponentRegistry,
	getFigmaRendererComponentSpec,
	type ComponentSpecDraft,
} from "@pxds/pxds-figma-renderer";

export type ComponentFigmaSpecRegistryEntry = {
	componentId: string;
	spec: ComponentSpecDraft;
};

export const componentFigmaSpecRegistry =
	figmaRendererComponentRegistry satisfies readonly ComponentFigmaSpecRegistryEntry[];

export type ComponentFigmaSpecComponentId =
	(typeof componentFigmaSpecRegistry)[number]["componentId"];

export function getComponentFigmaSpec(
	componentId: string | null | undefined,
): ComponentSpecDraft | null {
	if (!componentId) return null;
	return getFigmaRendererComponentSpec(componentId) as ComponentSpecDraft | null;
}

export function hasComponentFigmaSpec(componentId: string | null | undefined) {
	return Boolean(getComponentFigmaSpec(componentId));
}
