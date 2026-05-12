import type {
	RenderScreenSpec,
	RenderScreenSpecIssue,
	RenderSpecNode,
} from "../type/render-spec";
import { RENDER_SPEC_SCHEMA_VERSION } from "../type/render-spec";

export type {
	RenderComponentId,
	RenderPropValue,
	RenderScreenSpec,
	RenderScreenSpecIssue,
	RenderSectionLayout,
	RenderSpecNode,
} from "../type/render-spec";

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
