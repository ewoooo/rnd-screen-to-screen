import type { ReactNode } from "react";

export type RenderReactPrimitive = string | number | boolean | null;

export type RenderReactPropValue =
	| RenderReactPrimitive
	| readonly RenderReactPropValue[]
	| { readonly [key: string]: RenderReactPropValue };

export type RenderReactSection = {
	inset?: "inherit" | "bleed";
	rail?: "none" | "inset" | "measure" | "full";
	measure?: "caption" | "body" | "title";
};

export type RenderReactNode = {
	component: string;
	section?: RenderReactSection;
	props?: Readonly<Record<string, RenderReactPropValue>>;
	children?: readonly RenderReactNode[];
};

export type RenderReactContext = {
	node: RenderReactNode;
	renderChildren: () => ReactNode;
};

export type ComponentRenderReact = (context: RenderReactContext) => ReactNode;

export function renderString(value: RenderReactPropValue | undefined) {
	return typeof value === "string" ? value : undefined;
}

export function renderStringArray(
	value: RenderReactPropValue | undefined,
): readonly string[] | undefined {
	if (!Array.isArray(value)) return undefined;
	const strings = value.filter((item): item is string => typeof item === "string");
	return strings.length > 0 ? strings : undefined;
}

export function renderBoolean(
	value: RenderReactPropValue | undefined,
	fallback: boolean,
) {
	return typeof value === "boolean" ? value : fallback;
}

export function renderRecord(
	value: RenderReactPropValue | undefined,
): Readonly<Record<string, RenderReactPropValue>> | undefined {
	if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
	return value as Readonly<Record<string, RenderReactPropValue>>;
}
