import type { ScreenFigmaExportSpec, ScreenFigmaNodeSpec, ScreenFigmaSlot } from "./types";

export type RenderScreenSpecLike = {
	schemaVersion?: string;
	screen?: {
		id?: string;
		name?: string;
		route?: `/${string}` | string;
		type?: "page" | "bottom-sheet";
	};
	slots?: {
		systemHeader?: boolean;
		header?: RenderSpecNodeLike | false;
		content?: readonly RenderSpecNodeLike[];
		bottom?: readonly RenderSpecNodeLike[] | false;
	};
};

export type RenderSpecNodeLike = {
	component: string;
	section?: Record<string, unknown>;
	props?: Record<string, unknown>;
	children?: readonly RenderSpecNodeLike[];
};

export type RenderSpecRegistryEntryLike = {
	id: string;
	figmaSpec?: () => unknown;
};

export type RenderSpecValidationIssue = {
	severity: "error" | "warning";
	message: string;
};

type RenderScreenSpecToScreenFigmaSpecOptions = {
	registeredComponentIds?: readonly string[];
};

export function renderScreenSpecToScreenFigmaSpec(
	spec: RenderScreenSpecLike,
	options: RenderScreenSpecToScreenFigmaSpecOptions = {},
): ScreenFigmaExportSpec {
	const registeredComponentIds = new Set(options.registeredComponentIds ?? []);
	const screenId = spec.screen?.id ?? "screen.unknown";
	const rootNode = normalizeRenderSpecScreen(spec);

	return {
		$schema: "screen-figma-export-v1",
		id: screenId,
		name: spec.screen?.name ?? screenId,
		route: spec.screen?.route ?? `/${screenId}`,
		type: spec.screen?.type ?? "page",
		data: {
			source: "render-spec",
		},
		frame: {
			width: 375,
			height: 812,
			background: "{color.semantic.surface.page.normal}",
			inset: "{spacing.12}",
			gap: "{spacing.4}",
		},
		root: mapRenderSpecNode(rootNode, registeredComponentIds),
	};
}

export function validateRenderScreenSpec(
	spec: RenderScreenSpecLike,
	registry: readonly RenderSpecRegistryEntryLike[],
	options: { requireFigmaSpec?: boolean } = {},
): RenderSpecValidationIssue[] {
	const issues: RenderSpecValidationIssue[] = [];
	const registryById = new Map(
		registry.map((entry) => [normalizeComponentId(entry.id), entry]),
	);

	if (spec.schemaVersion !== "render-spec-v1") {
		issues.push({
			severity: "error",
			message: "render spec schemaVersion must be render-spec-v1.",
		});
	}

	const nodes = collectRenderSpecNodes(spec);
	for (const node of nodes) {
		const componentId = normalizeComponentId(node.component);
		const registryEntry = registryById.get(componentId);
		if (!registryEntry) {
			issues.push({
				severity: "error",
				message: `render spec component is not registered: ${node.component}.`,
			});
			continue;
		}
		if (options.requireFigmaSpec && !registryEntry.figmaSpec) {
			issues.push({
				severity: "error",
				message: `render spec component has no figmaSpec: ${componentId}.`,
			});
		}
	}

	return issues;
}

export function isRenderScreenSpecLike(value: unknown): value is RenderScreenSpecLike {
	return (
		Boolean(value) &&
		typeof value === "object" &&
		(value as { schemaVersion?: unknown }).schemaVersion === "render-spec-v1" &&
		Boolean((value as { screen?: unknown }).screen) &&
		Boolean((value as { slots?: unknown }).slots)
	);
}

function normalizeRenderSpecScreen(spec: RenderScreenSpecLike): RenderSpecNodeLike {
	const children: RenderSpecNodeLike[] = [];
	if (spec.slots?.header) {
		children.push(withSlot(spec.slots.header, "top"));
	}
	for (const child of spec.slots?.content ?? []) {
		children.push(withSlot(child, "content"));
	}
	if (Array.isArray(spec.slots?.bottom)) {
		for (const child of spec.slots.bottom) {
			children.push(withSlot(child, "bottom"));
		}
	}

	return {
		component: "app-screen",
		props: {
			id: spec.screen?.id,
		},
		children,
	};
}

function withSlot(node: RenderSpecNodeLike, slot: ScreenFigmaSlot): RenderSpecNodeLike {
	return {
		...node,
		props: {
			...(node.props ?? {}),
			_slot: slot,
		},
	};
}

function mapRenderSpecNode(
	node: RenderSpecNodeLike,
	registeredComponentIds: ReadonlySet<string>,
): ScreenFigmaNodeSpec {
	const props = node.props ?? {};
	const slot = toScreenSlot(props._slot);
	const componentId = normalizeComponentId(node.component);
	return {
		id: componentId,
		type: componentToType(componentId),
		componentId,
		registered: registeredComponentIds.has(componentId),
		slot,
		section: node.section,
		props: stripInternalProps(props),
		children:
			node.children?.map((child) =>
				mapRenderSpecNode(child, registeredComponentIds),
			) ?? [],
	};
}

function collectRenderSpecNodes(spec: RenderScreenSpecLike) {
	const nodes: RenderSpecNodeLike[] = [];
	const visit = (node: RenderSpecNodeLike) => {
		nodes.push(node);
		for (const child of node.children ?? []) visit(child);
	};
	if (spec.slots?.header) visit(spec.slots.header);
	for (const child of spec.slots?.content ?? []) visit(child);
	if (Array.isArray(spec.slots?.bottom)) {
		for (const child of spec.slots.bottom) visit(child);
	}
	return nodes;
}

function toScreenSlot(value: unknown): ScreenFigmaSlot | undefined {
	if (
		value === "top" ||
		value === "content" ||
		value === "bottom" ||
		value === "background" ||
		value === "sheet"
	) {
		return value;
	}
	return undefined;
}

function stripInternalProps(props: Record<string, unknown>) {
	const stripped: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(props)) {
		if (key.startsWith("_")) continue;
		stripped[key] = value;
	}
	return Object.keys(stripped).length > 0 ? stripped : undefined;
}

function normalizeComponentId(component: string) {
	return component.replace(/_/g, "-").toLowerCase();
}

function componentToType(component: string) {
	return component
		.split(/[-_\s]+/)
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join("");
}
