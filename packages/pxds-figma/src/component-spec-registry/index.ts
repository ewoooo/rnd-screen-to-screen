import type {
	ComponentSpecDraft,
	FigmaRendererComponentRegistryEntry,
} from "../renderer";

export type ComponentFigmaSpecRegistryEntry =
	FigmaRendererComponentRegistryEntry;

export const componentFigmaSpecRegistry: readonly ComponentFigmaSpecRegistryEntry[] =
	[];

export type ComponentFigmaSpecComponentId =
	(typeof componentFigmaSpecRegistry)[number]["componentId"];

export function getComponentFigmaSpec(
	componentId: string | null | undefined,
): ComponentSpecDraft | null {
	if (!componentId) return null;
	return (
		componentFigmaSpecRegistry.find(
			(entry) => entry.componentId === componentId,
		)?.spec ?? null
	);
}

export function hasComponentFigmaSpec(componentId: string | null | undefined) {
	return Boolean(getComponentFigmaSpec(componentId));
}
