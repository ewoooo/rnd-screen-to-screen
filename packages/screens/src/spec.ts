export type ScreenSpecStatus = "active";
export type ScreenSpecSource = "implemented-page";
export type ScreenSpecType = "page" | "bottom-sheet";
export type ScreenSpecSlot =
	| "top"
	| "content"
	| "bottom"
	| "background"
	| "backdrop"
	| "sheet";
export type ScreenSpecFlow = "reserved" | "overlay";

export type ScreenSlotContract = {
	owner: string;
	patterns?: readonly string[];
	flow?: ScreenSpecFlow;
};

export type ScreenAreaContract = {
	id: string;
	slot: ScreenSpecSlot;
	pattern: string;
	uses: readonly string[];
	layout?: Record<string, string | null>;
	content_role: string;
	semantics?: string;
};

export type ScreenLayoutContract = {
	content_outlet_inline_inset: "spacing-12" | null;
	section_inset: "inherit" | "sheet-owned";
	content_gap: "spacing-4" | "section" | "stack";
	content_gap_owner?: "ContentList";
	top_bottom_flow: ScreenSpecFlow;
	bleed_sections: readonly string[];
	portal_context?: "frame";
	sheet_edge?: "bottom";
};

export type DesignException = {
	id?: string;
	location?: string;
	kind?: string;
	value?: string;
	reason: string;
	owner: string;
};

export type DesignSystemContract = {
	templates: readonly string[];
	organisms: readonly string[];
	molecules: readonly string[];
	atoms: readonly string[];
	allowed_escape_hatches: readonly DesignException[];
	new_vocabulary_required: readonly string[];
};

export type ScreenSpecV2 = {
	meta: {
		schema_version: 2;
		status: ScreenSpecStatus;
		route: `/${string}`;
		source: ScreenSpecSource;
		source_ref?: string;
	};
	screen: {
		id: string;
		name: string;
		domain: "home" | "membership" | "product" | "search" | "tu";
		type: ScreenSpecType;
	};
	screen_contract: {
		shell: "AppScreen" | "AppScreenRoot + BottomSheet";
		slots: Partial<Record<ScreenSpecSlot, ScreenSlotContract>>;
	};
	layout_contract: ScreenLayoutContract;
	areas: readonly ScreenAreaContract[];
	design_system_contract: DesignSystemContract;
};

export type SDUIPrimitiveValue = string | number | boolean | null;
export type SDUIJsonValue =
	| SDUIPrimitiveValue
	| readonly SDUIJsonValue[]
	| { readonly [key: string]: SDUIJsonValue };

export type SDUINode = {
	type: string;
	id: string;
	componentVersion?: string;
	props?: Record<string, SDUIJsonValue>;
	className?: string;
	style?: Record<string, SDUIJsonValue>;
	display?: Record<string, SDUIJsonValue>;
	events?: Record<string, SDUIJsonValue>;
	validation?: Record<string, SDUIJsonValue>;
	errorHandling?: Record<string, SDUIJsonValue>;
	children?: readonly SDUINode[];
};

export type PolicyExtract = {
	source: {
		type: "policy" | "implemented-page" | "handoff" | "manual";
		refs: readonly string[];
	};
	process?: {
		id?: string;
		name?: string;
		cluster?: string;
		actor?: string;
		entry_condition?: string;
		exit_condition?: string;
		predecessor?: readonly string[];
		successor?: readonly string[];
		related_functions?: readonly string[];
		related_policies?: readonly string[];
	};
	purpose: string;
	system_inputs_to_user: readonly string[];
	user_inputs: readonly string[];
	system_outputs: readonly string[];
	branches: readonly string[];
	exceptions: readonly string[];
	design_signals: Record<string, string>;
};

export type ScreenBenchmarkTrace = {
	criteria: readonly string[];
	guards: readonly string[];
	notes?: readonly string[];
};

export type RenderableScreenSpecV1 = {
	version: "1.0.0";
	minRendererVersion: string;
	minComponentsVersion: string;
	metadata: {
		id: string;
		name: string;
		route: `/${string}`;
		domain: ScreenSpecV2["screen"]["domain"];
		type: ScreenSpecType;
		status: "pilot" | "active";
		source_ref?: string;
	};
	theme?: Record<string, SDUIJsonValue>;
	data: Record<string, SDUIJsonValue>;
	children: readonly SDUINode[];
	x_policyExtract: PolicyExtract;
	x_screenContract: {
		screen_contract: ScreenSpecV2["screen_contract"];
		layout_contract: ScreenLayoutContract;
		areas: readonly ScreenAreaContract[];
		design_system_contract: DesignSystemContract;
	};
	x_benchmark: ScreenBenchmarkTrace;
};

export type ScreenSpecIssueSeverity = "error" | "warning";

export type ScreenSpecIssue = {
	severity: ScreenSpecIssueSeverity;
	message: string;
};

export function getScreenSpecIssues(spec: ScreenSpecV2): ScreenSpecIssue[] {
	const issues: ScreenSpecIssue[] = [];
	const slots = spec.screen_contract.slots;
	const areaIds = new Set<string>();

	if (spec.meta.schema_version !== 2) {
		issues.push({
			severity: "error",
			message: "schema_version must be 2.",
		});
	}

	if (spec.meta.route.length < 2) {
		issues.push({
			severity: "error",
			message: "meta.route must be an absolute app route.",
		});
	}

	if (spec.screen.type === "page") {
		for (const slot of ["top", "content", "bottom"] as const) {
			if (!slots[slot]) {
				issues.push({
					severity: "error",
					message: `page spec must define ${slot} slot contract.`,
				});
			}
		}
		if (spec.layout_contract.content_outlet_inline_inset !== "spacing-12") {
			issues.push({
				severity: "error",
				message: "page spec must use spacing-12 as ContentOutlet inline inset.",
			});
		}
	}

	if (spec.screen.type === "bottom-sheet") {
		for (const slot of ["background", "backdrop", "sheet"] as const) {
			if (!slots[slot]) {
				issues.push({
					severity: "error",
					message: `bottom-sheet spec must define ${slot} slot contract.`,
				});
			}
		}
		if (spec.layout_contract.portal_context !== "frame") {
			issues.push({
				severity: "error",
				message: "bottom-sheet spec must declare frame portal context.",
			});
		}
	}

	for (const area of spec.areas) {
		if (areaIds.has(area.id)) {
			issues.push({
				severity: "error",
				message: `duplicate area id: ${area.id}.`,
			});
		}
		areaIds.add(area.id);

		if (!slots[area.slot]) {
			issues.push({
				severity: "error",
				message: `area ${area.id} references undefined slot ${area.slot}.`,
			});
		}

		if (area.uses.length === 0) {
			issues.push({
				severity: "warning",
				message: `area ${area.id} has no expected system API in uses.`,
			});
		}
	}

	for (const id of spec.layout_contract.bleed_sections) {
		if (!areaIds.has(id)) {
			issues.push({
				severity: "error",
				message: `bleed section ${id} does not match any area id.`,
			});
		}
	}

	return issues;
}

export function getRenderableScreenSpecIssues(
	spec: RenderableScreenSpecV1,
): ScreenSpecIssue[] {
	const issues: ScreenSpecIssue[] = [];
	const nodeIds = new Set<string>();

	if (spec.version !== "1.0.0") {
		issues.push({
			severity: "error",
			message: "renderable screen spec version must be 1.0.0.",
		});
	}

	if (!spec.metadata.route.startsWith("/")) {
		issues.push({
			severity: "error",
			message: "metadata.route must be an absolute app route.",
		});
	}

	if (spec.children.length === 0) {
		issues.push({
			severity: "error",
			message: "renderable screen spec must include at least one SDUI child.",
		});
	}

	if (spec.x_policyExtract.source.refs.length === 0) {
		issues.push({
			severity: "warning",
			message: "x_policyExtract.source.refs should preserve policy traceability.",
		});
	}

	if (spec.x_policyExtract.purpose.trim().length === 0) {
		issues.push({
			severity: "error",
			message: "x_policyExtract.purpose is required.",
		});
	}

	for (const issue of getScreenSpecIssues({
		meta: {
			schema_version: 2,
			status: "active",
			route: spec.metadata.route,
			source: "implemented-page",
			source_ref: spec.metadata.source_ref,
		},
		screen: {
			id: spec.metadata.id,
			name: spec.metadata.name,
			domain: spec.metadata.domain,
			type: spec.metadata.type,
		},
		screen_contract: spec.x_screenContract.screen_contract,
		layout_contract: spec.x_screenContract.layout_contract,
		areas: spec.x_screenContract.areas,
		design_system_contract: spec.x_screenContract.design_system_contract,
	})) {
		issues.push(issue);
	}

	const visit = (node: SDUINode) => {
		if (nodeIds.has(node.id)) {
			issues.push({
				severity: "error",
				message: `duplicate SDUI node id: ${node.id}.`,
			});
		}
		nodeIds.add(node.id);

		if (node.className) {
			issues.push({
				severity: "warning",
				message: `SDUI node ${node.id} uses className; prefer registered component props or token aliases.`,
			});
		}

		if (node.style) {
			issues.push({
				severity: "warning",
				message: `SDUI node ${node.id} uses raw style; record it as an escape hatch if kept.`,
			});
		}

		for (const child of node.children ?? []) {
			visit(child);
		}
	};

	for (const child of spec.children) {
		visit(child);
	}

	return issues;
}
