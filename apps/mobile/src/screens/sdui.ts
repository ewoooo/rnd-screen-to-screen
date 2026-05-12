export type SduiPrimitiveValue = string | number | boolean | null;

export type SduiPropValue =
	| SduiPrimitiveValue
	| readonly SduiPropValue[]
	| { readonly [key: string]: SduiPropValue };

export type SduiComponentId = string;
export const SDUI_SCHEMA_REF = "../../../../../sdui.schema.json";
export const SDUI_SCHEMA_VERSION = "sdui-v1";

export type SduiSectionInset = "inherit" | "bleed";
export type SduiSectionRail = "none" | "inset" | "measure" | "full";
export type SduiSectionMeasure = "caption" | "body" | "title";

export type SduiSectionLayout = {
	inset?: SduiSectionInset;
	rail?: SduiSectionRail;
	measure?: SduiSectionMeasure;
};

export type SduiNode = {
	component: SduiComponentId;
	section?: SduiSectionLayout;
	props?: Readonly<Record<string, SduiPropValue>>;
	children?: readonly SduiNode[];
};

export type SduiScreenShell = "app-screen";

export type SduiScreenSlots = {
	system_header: boolean;
	header: SduiNode | false;
	content: readonly SduiNode[];
	bottom: readonly SduiNode[] | false;
};

export type SduiScreen = {
	$schema: typeof SDUI_SCHEMA_REF | "sdui-v1";
	schemaVersion: typeof SDUI_SCHEMA_VERSION;
	screen_id: string;
	shell: SduiScreenShell;
	slots: SduiScreenSlots;
};

export type SduiScreenIssueSeverity = "error" | "warning";

export type SduiScreenIssue = {
	severity: SduiScreenIssueSeverity;
	message: string;
};

export function getSduiScreenIssues(spec: SduiScreen): SduiScreenIssue[] {
	const issues: SduiScreenIssue[] = [];
	const componentPaths = new Set<string>();
	const content = Array.isArray(spec.slots.content) ? spec.slots.content : [];
	const bottom = Array.isArray(spec.slots.bottom) ? spec.slots.bottom : [];

	if (!isSduiSchemaRef(spec.$schema)) {
		issues.push({
			severity: "error",
			message: `canonical SDUI $schema must reference ${SDUI_SCHEMA_REF}.`,
		});
	}

	if (spec.schemaVersion !== SDUI_SCHEMA_VERSION) {
		issues.push({
			severity: "error",
			message: `canonical SDUI schemaVersion must be ${SDUI_SCHEMA_VERSION}.`,
		});
	}

	if (!spec.screen_id) {
		issues.push({
			severity: "error",
			message: "canonical SDUI screen_id is required.",
		});
	}

	if (spec.shell !== "app-screen") {
		issues.push({
			severity: "error",
			message: "canonical SDUI shell must be app-screen.",
		});
	}

	if (typeof spec.slots.system_header !== "boolean") {
		issues.push({
			severity: "error",
			message: "canonical SDUI slots.system_header must be an explicit boolean.",
		});
	}

	if (!Object.hasOwn(spec.slots, "header")) {
		issues.push({
			severity: "error",
			message: "canonical SDUI slots.header is required. Use false when absent.",
		});
	}

	if (!Array.isArray(spec.slots.content)) {
		issues.push({
			severity: "error",
			message: "canonical SDUI slots.content must be an explicit node array.",
		});
	}

	if (!Object.hasOwn(spec.slots, "bottom")) {
		issues.push({
			severity: "error",
			message: "canonical SDUI slots.bottom is required. Use false when absent.",
		});
	}

	if (
		Array.isArray(spec.slots.bottom) &&
		bottom.length === 0
	) {
		issues.push({
			severity: "error",
			message: "canonical SDUI slots.bottom must be false or a non-empty node array.",
		});
	}

	if (!spec.slots.header && content.length === 0) {
		issues.push({
			severity: "warning",
			message: "canonical SDUI should define header or content slot.",
		});
	}

	const visit = (node: SduiNode, path: string) => {
		if (!node.component) {
			issues.push({
				severity: "error",
				message: `canonical SDUI node at ${path} must define component.`,
			});
			return;
		}
		if (node.props && Object.hasOwn(node.props, "slot")) {
			issues.push({
				severity: "warning",
				message: `canonical SDUI node ${path} uses props.slot; slot ownership belongs to slots.*.`,
			});
		}
		validateSection(node.section, path, issues);
		const componentPath = `${path}:${node.component}`;
		if (componentPaths.has(componentPath)) {
			issues.push({
				severity: "warning",
				message: `canonical SDUI repeats component at same path: ${componentPath}.`,
			});
		}
		componentPaths.add(componentPath);

		for (const [index, child] of (node.children ?? []).entries()) {
			visit(child, `${path}.children[${index}]`);
		}
	};

	if (spec.slots.header) visit(spec.slots.header, "slots.header");
	for (const [index, child] of content.entries()) {
		visit(child, `slots.content[${index}]`);
	}
	if (Array.isArray(spec.slots.bottom)) {
		for (const [index, child] of bottom.entries()) {
			visit(child, `slots.bottom[${index}]`);
		}
	}

	return issues;
}

function validateSection(
	section: SduiSectionLayout | undefined,
	path: string,
	issues: SduiScreenIssue[],
) {
	if (!section) return;
	if (section.measure && section.rail !== "measure") {
		issues.push({
			severity: "warning",
			message: `canonical SDUI node ${path} defines section.measure without section.rail="measure".`,
		});
	}
	if (section.inset === "inherit" && section.rail === "full") {
		issues.push({
			severity: "warning",
			message: `canonical SDUI node ${path} uses section.rail="full" without bleed inset.`,
		});
	}
}

export function isSduiScreen(value: unknown): value is SduiScreen {
	return (
		Boolean(value) &&
		typeof value === "object" &&
		isSduiSchemaRef((value as { $schema?: unknown }).$schema) &&
		(value as { schemaVersion?: unknown }).schemaVersion === SDUI_SCHEMA_VERSION &&
		typeof (value as { screen_id?: unknown }).screen_id === "string" &&
		(value as { shell?: unknown }).shell === "app-screen" &&
		Boolean((value as { slots?: unknown }).slots)
	);
}

function isSduiSchemaRef(value: unknown) {
	return (
		value === SDUI_SCHEMA_REF ||
		value === "sdui-v1" ||
		(typeof value === "string" && value.endsWith("/sdui.schema.json"))
	);
}
