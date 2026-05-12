import {
	componentRegistry,
	type ComponentRegistryEntry,
} from "@pxds/pxds-components/registry";
import type {
	ComponentSpecDraft,
	FigmaRendererComponentRegistryEntry,
} from "../renderer";

export type ComponentFigmaSpecRegistryEntry =
	FigmaRendererComponentRegistryEntry;

export const componentFigmaSpecRegistry: readonly ComponentFigmaSpecRegistryEntry[] = (
	componentRegistry as readonly ComponentRegistryEntry[]
).flatMap((entry) =>
	entry.figmaSpec
		? [
				{
					componentId: entry.id,
					spec: entry.figmaSpec() as ComponentSpecDraft,
					exportMode: entry.exportMode,
					render: entry.render?.(),
				},
			]
		: [],
);

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
