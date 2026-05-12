import type {
	ComponentGroup,
	ComponentLayer,
	ComponentRegistryEntry,
} from "@pxds/pxds-components/registry";

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
	"billing-html",
] as const satisfies readonly ComponentGroup[];

export type ComponentLayerGroups = Partial<
	Record<ComponentLayer, ComponentRegistryEntry[]>
>;

export type ComponentGroups = Partial<
	Record<ComponentGroup, ComponentRegistryEntry[]>
>;

export function getComponentLayers(
	components: readonly ComponentRegistryEntry[],
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
	components: readonly ComponentRegistryEntry[],
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
	components: readonly ComponentRegistryEntry[],
) {
	return components.reduce<ComponentLayerGroups>((acc, component) => {
		(acc[component.layer] ??= []).push(component);
		return acc;
	}, {});
}

export function groupComponentsByGroup(
	components: readonly ComponentRegistryEntry[],
) {
	return components.reduce<ComponentGroups>((acc, component) => {
		(acc[component.group] ??= []).push(component);
		return acc;
	}, {});
}
