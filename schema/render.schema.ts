export type SchemaPrimitive = string | number | boolean | null;

export type SchemaValue =
	| SchemaPrimitive
	| readonly SchemaValue[]
	| { readonly [key: string]: SchemaValue };

export type ComponentLayer =
	| "core"
	| "atom"
	| "molecule"
	| "organism"
	| "template";

export type ScreenType = "page" | "bottom-sheet";

export type RenderSlot = "header" | "content" | "bottom" | "system";

export type RenderLayout = {
	slot?: RenderSlot;
	section?: {
		inset?: "default" | "bleed" | "none";
		rail?: "inset" | "measure" | "full";
		measure?: "body" | "form" | "wide";
	};
	stack?: {
		direction: "vertical" | "horizontal" | "none";
		gap?: string;
		align?: "start" | "center" | "end" | "stretch";
	};
	sizing?: {
		width?: "fill" | "hug" | "fixed";
		height?: "fill" | "hug" | "fixed";
	};
};

export type RenderNode = {
	id?: string;
	component: string;
	slot?: RenderSlot;
	variant?: string;
	props?: Readonly<Record<string, SchemaValue>>;
	layout?: RenderLayout;
	children?: readonly RenderNode[];
};

export type RenderTreePropDefinition = {
	type: "string" | "number" | "boolean" | "enum" | "object" | "array";
	required?: boolean;
	defaultValue?: SchemaValue;
	values?: readonly string[];
	description?: string;
};

export type ComponentRenderTree = {
	$schema: "pxds-render-tree-v1";
	componentId: string;
	layer: ComponentLayer;
	layout?: RenderLayout;
	props?: Readonly<Record<string, RenderTreePropDefinition>>;
	children?: readonly RenderNode[];
	notes?: readonly string[];
};

export type ScreenRenderTreeDefinition = {
	slots: {
		systemHeader?: boolean;
		header?: RenderNode | false;
		content?: readonly RenderNode[];
		bottom?: readonly RenderNode[] | false;
	};
};

export function defineComponentRenderTree<T extends ComponentRenderTree>(
	renderTree: T,
): T {
	return renderTree;
}

export function defineScreenRenderTree<T extends ScreenRenderTreeDefinition>(
	renderTree: T,
): T {
	return renderTree;
}
