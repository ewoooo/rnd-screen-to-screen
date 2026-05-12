import type {
	ComponentGroup,
	ComponentLayer,
	ComponentRegistryEntry,
} from "@pxds/pxds-components/registry";

export type PreviewComponentRegistryEntry = Omit<
	ComponentRegistryEntry,
	"figmaSpec" | "render"
>;

export const COMPONENT_LAYER_ORDER = [
	"atom",
	"molecule",
	"organism",
	"template",
] as const satisfies readonly ComponentLayer[];

export const COMPONENT_GROUP_ORDER = [
	"typography",
	"feedback",
	"media",
	"layout",
	"navigation",
	"form",
	"selection",
	"template",
	"global",
	"home",
	"mbr",
	"product",
	"search",
	"tu",
	"nc-simple",
] as const satisfies readonly ComponentGroup[];

export type ComponentLayerGroups = Partial<
	Record<ComponentLayer, PreviewComponentRegistryEntry[]>
>;

export type ComponentGroups = Partial<
	Record<ComponentGroup, PreviewComponentRegistryEntry[]>
>;

export function toPreviewComponentRegistryEntry(
	component: ComponentRegistryEntry,
): PreviewComponentRegistryEntry {
	const { figmaSpec, render, ...serializableComponent } = component;
	void figmaSpec;
	void render;
	return serializableComponent;
}

export function toPreviewComponentRegistry(
	components: readonly ComponentRegistryEntry[],
): PreviewComponentRegistryEntry[] {
	return components.map(toPreviewComponentRegistryEntry);
}

export function getComponentLayers(
	components: readonly PreviewComponentRegistryEntry[],
) {
	const orderedLayers = COMPONENT_LAYER_ORDER.filter((layer) =>
		components.some((component) => component.layer === layer),
	);
	const additionalLayers = components
		.map((component) => component.layer)
		.filter(
			(layer, index, layers) =>
				!COMPONENT_LAYER_ORDER.includes(layer) && layers.indexOf(layer) === index,
		);

	return [...orderedLayers, ...additionalLayers];
}

export function getComponentGroups(
	components: readonly PreviewComponentRegistryEntry[],
) {
	const orderedGroups = COMPONENT_GROUP_ORDER.filter((group) =>
		components.some((component) => component.group === group),
	);
	const additionalGroups = components
		.map((component) => component.group)
		.filter(
			(group, index, groups) =>
				!COMPONENT_GROUP_ORDER.includes(group) && groups.indexOf(group) === index,
		);

	return [...orderedGroups, ...additionalGroups];
}

export function groupComponentsByLayer(
	components: readonly PreviewComponentRegistryEntry[],
) {
	return components.reduce<ComponentLayerGroups>((acc, component) => {
		const layerComponents = acc[component.layer] ?? [];
		acc[component.layer] = layerComponents;
		layerComponents.push(component);
		return acc;
	}, {});
}

export function groupComponentsByGroup(
	components: readonly PreviewComponentRegistryEntry[],
) {
	return components.reduce<ComponentGroups>((acc, component) => {
		const groupComponents = acc[component.group] ?? [];
		acc[component.group] = groupComponents;
		groupComponents.push(component);
		return acc;
	}, {});
}
