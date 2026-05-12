import type { ComponentRegistryEntry } from "../../registry";

export type MbrComponentMeta = Pick<
	ComponentRegistryEntry,
	| "id"
	| "name"
	| "layer"
	| "owner"
	| "importPath"
	| "group"
	| "status"
	| "createdAt"
	| "exportMode"
	| "composedOf"
>;

export function asMbrComponentMeta(meta: unknown) {
	return meta as MbrComponentMeta;
}
