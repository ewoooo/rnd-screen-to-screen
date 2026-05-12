export type RenderPrimitiveValue = string | number | boolean | null;

export type RenderPropValue =
	| RenderPrimitiveValue
	| readonly RenderPropValue[]
	| { readonly [key: string]: RenderPropValue };

export type RenderComponentId = string;
export const RENDER_SPEC_SCHEMA_VERSION = "render-spec-v1";

export type RenderSectionInset = "inherit" | "bleed";
export type RenderSectionRail = "none" | "inset" | "measure" | "full";
export type RenderSectionMeasure = "caption" | "body" | "title";

export type RenderSectionLayout = {
	inset?: RenderSectionInset;
	rail?: RenderSectionRail;
	measure?: RenderSectionMeasure;
};

export type RenderSpecNode = {
	component: RenderComponentId;
	section?: RenderSectionLayout;
	props?: Readonly<Record<string, RenderPropValue>>;
	children?: readonly RenderSpecNode[];
};

export type RenderScreenSpec = {
	schemaVersion: typeof RENDER_SPEC_SCHEMA_VERSION;
	screen: {
		id: string;
		name: string;
		route: `/${string}`;
		type: "page" | "bottom-sheet";
	};
	slots: {
		systemHeader?: boolean;
		header?: RenderSpecNode | false;
		content?: readonly RenderSpecNode[];
		bottom?: readonly RenderSpecNode[] | false;
	};
};

export type RenderScreenSpecIssue = {
	severity: "error" | "warning";
	message: string;
};
