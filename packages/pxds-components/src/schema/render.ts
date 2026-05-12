import type { ComponentLayer } from "./registry";
import type { RenderLayoutContract, RenderSlot } from "./layout";

export type RenderTreeExportMode = "render-tree" | "instance";

export type RenderPropType =
	| "string"
	| "number"
	| "boolean"
	| "enum"
	| "object"
	| "array";

export type RenderTreePropDefinition = {
	type: RenderPropType;
	required?: boolean;
	defaultValue?: unknown;
	values?: readonly string[];
	description?: string;
};

export type RenderTreeChild = {
	id: string;
	component: string;
	slot?: RenderSlot;
	variant?: string;
	props?: Readonly<Record<string, unknown>>;
	layout?: RenderLayoutContract;
};

export type ComponentRenderTree = {
	$schema: "pxds-render-tree-v1";
	componentId: string;
	layer: ComponentLayer;
	mode: RenderTreeExportMode;
	layout?: RenderLayoutContract;
	props?: Readonly<Record<string, RenderTreePropDefinition>>;
	children?: readonly RenderTreeChild[];
	notes?: readonly string[];
};

export function defineComponentRenderTree<T extends ComponentRenderTree>(
	renderTree: T,
): T {
	return renderTree;
}
