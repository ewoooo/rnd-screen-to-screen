import type { ScreenFigmaExportSpec, ScreenFigmaNodeSpec, ScreenFigmaSlot } from "./types";
import {
	isRenderScreenSpecLike,
	renderScreenSpecToScreenFigmaSpec,
	type RenderScreenSpecLike,
} from "./render-spec";

type SDUINodeLike = {
	type: string;
	id: string;
	componentId?: string;
	slot?: ScreenFigmaSlot;
	section?: Record<string, unknown>;
	props?: Record<string, unknown>;
	children?: readonly SDUINodeLike[];
};

type RenderableScreenSpecLike = {
	metadata?: {
		id?: string;
		name?: string;
		route?: string;
		type?: "page" | "bottom-sheet";
	};
	data?: Record<string, unknown>;
	children?: readonly SDUINodeLike[];
	$schema?: string;
	schemaVersion?: string;
	screen_id?: string;
	shell?: string;
	slots?: {
		system_header?: boolean;
		header?: SduiComponentNodeLike | false;
		content?: readonly SduiComponentNodeLike[];
		bottom?: readonly SduiComponentNodeLike[] | false;
	};
};

type CreateScreenFigmaExportSpecOptions = {
	registeredComponentIds?: readonly string[];
};

type SduiComponentNodeLike = {
	component: string;
	section?: Record<string, unknown>;
	props?: Record<string, unknown>;
	children?: readonly SduiComponentNodeLike[];
};

export function createScreenFigmaExportSpec(
	renderableSpec: RenderableScreenSpecLike,
	options: CreateScreenFigmaExportSpecOptions = {},
): ScreenFigmaExportSpec {
	if (isRenderScreenSpecLike(renderableSpec)) {
		return renderScreenSpecToScreenFigmaSpec(
			renderableSpec as RenderScreenSpecLike,
			options,
		);
	}

	const normalized = normalizeRenderableSpec(renderableSpec);
	const registeredComponentIds = new Set(options.registeredComponentIds ?? []);

	return {
		$schema: "screen-figma-export-v1",
		id: normalized.id,
		name: normalized.name,
		route: normalized.route,
		type: normalized.type,
		data: normalized.data,
		frame: {
			width: 375,
			height: 812,
			background: "{color.semantic.surface.page.normal}",
			inset: "{spacing.12}",
			gap: "{spacing.4}",
		},
		root: mapNode(normalized.rootNode, registeredComponentIds),
	};
}

function normalizeRenderableSpec(renderableSpec: RenderableScreenSpecLike) {
	if (isSduiScreenLike(renderableSpec)) {
		const screenId = renderableSpec.screen_id ?? "screen.unknown";
		const rootNode = normalizeSduiScreen(renderableSpec);
		return {
			id: renderableSpec.metadata?.id ?? screenId,
			name: renderableSpec.metadata?.name ?? screenId,
			route: renderableSpec.metadata?.route ?? `/${screenId}`,
			type: renderableSpec.metadata?.type ?? "page",
			data: renderableSpec.data ?? {},
			rootNode,
		};
	}

	const rootNode = renderableSpec.children?.[0] ?? {
		type: "UnknownScreen",
		id: "screen.unknown",
		children: [],
	};
	return {
		id: renderableSpec.metadata?.id ?? rootNode.id,
		name: renderableSpec.metadata?.name ?? rootNode.type,
		route: renderableSpec.metadata?.route ?? "/",
		type: renderableSpec.metadata?.type ?? "page",
		data: renderableSpec.data ?? {},
		rootNode,
	};
}

function normalizeSduiScreen(renderableSpec: RenderableScreenSpecLike): SDUINodeLike {
	const shell = renderableSpec.shell ?? "app-screen";
	const children: SDUINodeLike[] = [];
	const header = renderableSpec.slots?.header;
	if (header) {
		children.push(normalizeSduiNode(header, "top"));
	}
	for (const child of renderableSpec.slots?.content ?? []) {
		children.push(normalizeSduiNode(child, "content"));
	}
	const bottom = renderableSpec.slots?.bottom;
	if (Array.isArray(bottom)) {
		for (const child of bottom) {
			children.push(normalizeSduiNode(child, "bottom"));
		}
	}

	return {
		type: toPascalCase(shell),
		id: renderableSpec.screen_id ?? "screen.unknown",
		componentId: normalizeComponentId(shell),
		children,
	};
}

function normalizeSduiNode(
	node: SduiComponentNodeLike,
	slot?: ScreenFigmaSlot,
): SDUINodeLike {
	const componentId = normalizeComponentId(node.component);
	return {
		type: componentToType(node.component),
		id: componentId,
		componentId,
		slot,
		section: normalizeProps(node.section),
		props: normalizeProps(node.props),
		children: node.children?.map((child) => normalizeSduiNode(child)),
	};
}

function mapNode(
	node: SDUINodeLike,
	registeredComponentIds: ReadonlySet<string>,
	slot?: ScreenFigmaSlot,
): ScreenFigmaNodeSpec {
	const componentId = node.componentId ?? toComponentId(node.type);
	const props = normalizeProps(node.props);
	const slotChildren = extractSlotChildren(props, registeredComponentIds);
	const contentChildren =
		node.children?.map((child) => mapNode(child, registeredComponentIds)) ??
		[];

	return {
		id: node.id,
		type: node.type,
		componentId,
		registered: registeredComponentIds.has(componentId),
		slot: slot ?? node.slot,
		section: node.section,
		props: props ? stripNodeProps(props) : undefined,
		children: [...slotChildren, ...contentChildren],
	};
}

function extractSlotChildren(
	props: Record<string, unknown> | undefined,
	registeredComponentIds: ReadonlySet<string>,
): ScreenFigmaNodeSpec[] {
	if (!props) return [];
	const slots: ScreenFigmaNodeSpec[] = [];
	for (const slot of ["top", "bottom", "background", "sheet"] as const) {
		const value = props[slot];
		if (isNodeLike(value)) {
			slots.push(mapNode(value, registeredComponentIds, slot));
		}
	}
	return slots;
}

function stripNodeProps(props: Record<string, unknown>) {
	const stripped: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(props)) {
		if (isNodeLike(value)) continue;
		stripped[key] = value;
	}
	return Object.keys(stripped).length ? stripped : undefined;
}

function normalizeProps(props: unknown) {
	return props && typeof props === "object" && !Array.isArray(props)
		? (props as Record<string, unknown>)
		: undefined;
}

function isNodeLike(value: unknown): value is SDUINodeLike {
	return (
		Boolean(value) &&
		typeof value === "object" &&
		!Array.isArray(value) &&
		typeof (value as { type?: unknown }).type === "string" &&
		typeof (value as { id?: unknown }).id === "string"
	);
}

function isSduiScreenLike(value: RenderableScreenSpecLike) {
	return (
		value.$schema === "sdui-v1" ||
		value.schemaVersion === "sdui-v1" ||
		(typeof value.screen_id === "string" &&
			Boolean(value.slots) &&
			typeof value.slots === "object")
	);
}

function normalizeComponentId(component: string) {
	return component.replace(/_/g, "-").toLowerCase();
}

function componentToType(component: string) {
	return toPascalCase(component.replace(/^ogn-/i, ""));
}

function toPascalCase(value: string) {
	return value
		.split(/[-_\s]+/)
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
		.join("");
}

function toComponentId(type: string) {
	return type
		.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
		.replace(/_/g, "-")
		.toLowerCase();
}
