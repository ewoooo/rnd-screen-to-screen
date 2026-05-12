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

export type ComponentRenderContract = {
	$schema: "component-render-v1";
	componentId: string;
	layer: ComponentLayer;
	layout?: RenderLayout;
	props?: Readonly<Record<string, RenderPropContract>>;
	children?: readonly RenderNode[];
	notes?: readonly string[];
};

export type PageRenderContract = {
	$schema: "page-render-v1";
	screen: {
		id: string;
		name: string;
		route: `/${string}`;
		type: ScreenType;
	};
	source?: {
		useCaseIds?: readonly string[];
		ognSpecIds?: readonly string[];
		policyRefs?: readonly string[];
	};
	slots: {
		systemHeader?: boolean;
		header?: RenderNode | false;
		content?: readonly RenderNode[];
		bottom?: readonly RenderNode[] | false;
	};
};

export type RenderPropContract = {
	type: "string" | "number" | "boolean" | "enum" | "object" | "array";
	required?: boolean;
	defaultValue?: SchemaValue;
	values?: readonly string[];
	description?: string;
};

export function defineComponentRender<T extends ComponentRenderContract>(
	contract: T,
): T {
	return contract;
}

export function definePageRender<T extends PageRenderContract>(
	contract: T,
): T {
	return contract;
}
