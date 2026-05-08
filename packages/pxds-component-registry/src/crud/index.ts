import {
	componentRegistry,
	type ComponentGroup,
	type ComponentId,
	type ComponentLayer,
	type ComponentOwner,
	type ComponentRegistryEntry,
} from "../registry/index";

export type ComponentRegistry = readonly ComponentRegistryEntry[];
export type ComponentRegistryPatch = Partial<Omit<ComponentRegistryEntry, "id">>;

function assertUniqueComponent(
	registry: ComponentRegistry,
	entry: ComponentRegistryEntry,
	ignoreId?: string,
) {
	const duplicateId = registry.find(
		(component) => component.id === entry.id && component.id !== ignoreId,
	);
	if (duplicateId) {
		throw new Error(`Component id already exists: ${entry.id}`);
	}
}

export function findComponentById(
	registry: ComponentRegistry,
	id: ComponentId | string,
) {
	return registry.find((component) => component.id === id);
}

export function findComponentsByLayer(
	registry: ComponentRegistry,
	layer: ComponentLayer,
) {
	return registry.filter((component) => component.layer === layer);
}

export function findComponentsByGroup(
	registry: ComponentRegistry,
	group: ComponentGroup,
) {
	return registry.filter((component) => component.group === group);
}

export function findComponentsByOwner(
	registry: ComponentRegistry,
	owner: ComponentOwner,
) {
	return registry.filter((component) => component.owner === owner);
}

export function getComponentById(id: ComponentId | string) {
	return findComponentById(componentRegistry, id);
}

export function getComponentsByLayer(layer: ComponentLayer) {
	return findComponentsByLayer(componentRegistry, layer);
}

export function getComponentsByGroup(group: ComponentGroup) {
	return findComponentsByGroup(componentRegistry, group);
}

export function getComponentsByOwner(owner: ComponentOwner) {
	return findComponentsByOwner(componentRegistry, owner);
}

export function createComponent(
	registry: ComponentRegistry,
	entry: ComponentRegistryEntry,
) {
	assertUniqueComponent(registry, entry);
	return [...registry, entry];
}

export function updateComponent(
	registry: ComponentRegistry,
	id: ComponentId | string,
	patch: ComponentRegistryPatch,
) {
	let didUpdate = false;
	const next = registry.map((component) => {
		if (component.id !== id) {
			return component;
		}

		didUpdate = true;
		const updated = { ...component, ...patch };
		assertUniqueComponent(registry, updated, component.id);
		return updated;
	});

	if (!didUpdate) {
		throw new Error(`Component not found: ${id}`);
	}

	return next;
}

export function deleteComponent(
	registry: ComponentRegistry,
	id: ComponentId | string,
) {
	const next = registry.filter((component) => component.id !== id);
	if (next.length === registry.length) {
		throw new Error(`Component not found: ${id}`);
	}

	return next;
}

export function upsertComponent(
	registry: ComponentRegistry,
	entry: ComponentRegistryEntry,
) {
	if (findComponentById(registry, entry.id)) {
		return updateComponent(registry, entry.id, entry);
	}

	return createComponent(registry, entry);
}
