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

type RegistryEntryLike = {
	id: string;
	figmaSpec?: () => unknown;
};

type ValidateRenderScreenSpecOptions = {
	requireFigmaSpec?: boolean;
};

export function validateRenderScreenSpec(
	spec: RenderScreenSpec,
	registry: readonly RegistryEntryLike[],
	options: ValidateRenderScreenSpecOptions = {},
): RenderScreenSpecIssue[] {
	const issues: RenderScreenSpecIssue[] = [];
	const registryById = new Map(
		registry.map((entry) => [normalizeComponentId(entry.id), entry]),
	);
	const nodes = collectRenderSpecNodes(spec);

	if (spec.schemaVersion !== RENDER_SPEC_SCHEMA_VERSION) {
		issues.push({
			severity: "error",
			message: `render spec schemaVersion must be ${RENDER_SPEC_SCHEMA_VERSION}.`,
		});
	}

	if (!spec.screen.id) {
		issues.push({ severity: "error", message: "render spec screen.id is required." });
	}

	if (!spec.screen.route?.startsWith("/")) {
		issues.push({
			severity: "error",
			message: "render spec screen.route must start with '/'.",
		});
	}

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

	const content = spec.slots.content ?? [];
	const completeTextBlocks = content.filter(
		(node) =>
			normalizeComponentId(node.component) === "text-block" &&
			typeof node.props?.text === "string" &&
			(node.props.text.includes("가입이 완료") ||
				node.props.text.includes("가입 후 이용 안내")),
	);
	if (spec.screen.id === "NOVA-MBR-PG-005-0" && completeTextBlocks.length > 0) {
		issues.push({
			severity: "error",
			message:
				"NOVA-MBR-PG-005-0 completion copy must stay inside ogn-mbr-section-message-join-complete-view.",
		});
	}

	return issues;
}

export function collectRenderSpecNodes(
	spec: RenderScreenSpec,
): RenderSpecNode[] {
	const nodes: RenderSpecNode[] = [];
	const visit = (node: RenderSpecNode) => {
		nodes.push(node);
		for (const child of node.children ?? []) visit(child);
	};
	if (spec.slots.header) visit(spec.slots.header);
	for (const child of spec.slots.content ?? []) visit(child);
	if (Array.isArray(spec.slots.bottom)) {
		for (const child of spec.slots.bottom) visit(child);
	}
	return nodes;
}

export function isRenderScreenSpec(value: unknown): value is RenderScreenSpec {
	return (
		Boolean(value) &&
		typeof value === "object" &&
		(value as { schemaVersion?: unknown }).schemaVersion ===
			RENDER_SPEC_SCHEMA_VERSION &&
		Boolean((value as { screen?: unknown }).screen) &&
		Boolean((value as { slots?: unknown }).slots)
	);
}

export function normalizeComponentId(componentId: string) {
	return componentId.replace(/_/g, "-").toLowerCase();
}
