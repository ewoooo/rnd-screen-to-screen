import type { ComponentRenderTree } from "@pxds/pxds-components/schema";
import type { RenderTreeChild } from "@pxds/pxds-components/schema";

import type {
	ScreenRenderTreeDefinition,
	ScreenRenderTreeMeta,
	ScreenRenderTreeNode,
} from "../../type/render-tree";
import type {
	RenderPropValue,
	RenderScreenSpec,
	RenderSectionLayout,
	RenderSpecNode,
} from "../../type/render-spec";
import { RENDER_SPEC_SCHEMA_VERSION } from "../../type/render-spec";

export type {
	ScreenRenderTreeDefinition,
	ScreenRenderTreeMeta,
	ScreenRenderTreeNode,
} from "../../type/render-tree";

export function createRenderTree(
	meta: ScreenRenderTreeMeta,
	definition: ScreenRenderTreeDefinition,
): RenderScreenSpec {
	return {
		schemaVersion: RENDER_SPEC_SCHEMA_VERSION,
		screen: {
			id: meta.id,
			name: meta.name,
			route: toScreenRoute(meta.route),
			type: toScreenType(meta.type),
		},
		slots: {
			systemHeader: definition.slots.systemHeader,
			header: definition.slots.header
				? toRenderSpecNode(definition.slots.header)
				: definition.slots.header,
			content: definition.slots.content?.map(toRenderSpecNode),
			bottom: Array.isArray(definition.slots.bottom)
				? definition.slots.bottom.map(toRenderSpecNode)
				: definition.slots.bottom,
		},
	};
}

function toScreenRoute(route: string): `/${string}` {
	if (!route.startsWith("/")) {
		throw new Error(`screen meta route must start with '/': ${route}`);
	}
	return route as `/${string}`;
}

function toScreenType(type: string): RenderScreenSpec["screen"]["type"] {
	if (type === "page" || type === "bottom-sheet") return type;
	throw new Error(`screen meta type is not supported: ${type}`);
}

function toRenderSpecNode(node: ScreenRenderTreeNode): RenderSpecNode {
	const children =
		node.children?.map(toRenderSpecNode) ?? renderChildren(node.render, node.props);
	return {
		component: node.component,
		section: node.section,
		props: node.props,
		children,
	};
}

function renderChildren(
	render: ComponentRenderTree | undefined,
	parentProps: Readonly<Record<string, RenderPropValue>> | undefined,
): RenderSpecNode[] | undefined {
	if (!render?.children || render.children.length === 0) return undefined;
	return render.children.map((child) =>
		renderChildToRenderSpecNode(child, parentProps),
	);
}

function renderChildToRenderSpecNode(
	child: RenderTreeChild,
	parentProps: Readonly<Record<string, RenderPropValue>> | undefined,
): RenderSpecNode {
	return {
		component: child.component,
		section: toRenderSectionLayout(child.layout),
		props: toRenderProps(
			{
				...(child.variant ? { variant: child.variant } : null),
				...child.props,
			},
			parentProps,
		),
	};
}

function toRenderSectionLayout(
	layout: RenderTreeChild["layout"],
): RenderSectionLayout | undefined {
	const section = layout?.section;
	if (!section) return undefined;
	return {
		inset: section.inset === "bleed" ? "bleed" : "inherit",
		rail: section.rail,
		measure:
			section.measure === "wide"
				? "title"
				: section.measure === "form"
					? "body"
					: section.measure,
	};
}

function toRenderProps(
	props: Readonly<Record<string, unknown>> | undefined,
	parentProps?: Readonly<Record<string, RenderPropValue>>,
): Readonly<Record<string, RenderPropValue>> | undefined {
	if (!props) return undefined;
	return Object.fromEntries(
		Object.entries(props).flatMap(([key, value]) => {
			const renderValue = toRenderPropValue(value, parentProps);
			return renderValue === undefined ? [] : [[key, renderValue]];
		}),
	);
}

function toRenderPropValue(
	value: unknown,
	parentProps?: Readonly<Record<string, RenderPropValue>>,
): RenderPropValue | undefined {
	if (typeof value === "string" && value.startsWith("$props.")) {
		return parentProps?.[value.slice("$props.".length)];
	}
	if (
		value === null ||
		typeof value === "string" ||
		typeof value === "number" ||
		typeof value === "boolean"
	) {
		return value;
	}
	if (Array.isArray(value)) {
		return value
			.map((item) => toRenderPropValue(item, parentProps))
			.filter((item): item is RenderPropValue => item !== undefined);
	}
	if (value && typeof value === "object") {
		return Object.fromEntries(
			Object.entries(value).flatMap(([key, nested]) => {
				const renderValue = toRenderPropValue(nested, parentProps);
				return renderValue === undefined ? [] : [[key, renderValue]];
			}),
		);
	}
	return undefined;
}
