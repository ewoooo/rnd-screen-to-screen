import type { ComponentLayer } from "./registry";
import type { RenderLayoutContract, RenderSlot } from "./layout";

export type RenderExportMode = "render-tree" | "instance";

export type RenderPropType =
	| "string"
	| "number"
	| "boolean"
	| "enum"
	| "object"
	| "array";

export type RenderPropContract = {
	type: RenderPropType;
	required?: boolean;
	defaultValue?: unknown;
	values?: readonly string[];
	description?: string;
};

export type RenderChildContract = {
	id: string;
	component: string;
	slot?: RenderSlot;
	variant?: string;
	props?: Readonly<Record<string, unknown>>;
	layout?: RenderLayoutContract;
};

export type ComponentRenderContract = {
	$schema: "pxds-render-contract-v1";
	componentId: string;
	layer: ComponentLayer;
	mode: RenderExportMode;
	layout?: RenderLayoutContract;
	props?: Readonly<Record<string, RenderPropContract>>;
	children?: readonly RenderChildContract[];
	notes?: readonly string[];
};

export function defineComponentRender<T extends ComponentRenderContract>(
	contract: T,
): T {
	return contract;
}
