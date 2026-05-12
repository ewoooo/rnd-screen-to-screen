export type ScreenSpecStatus = "active";
export type ScreenSpecSource =
	| "implemented-page"
	| "policy-driven"
	| "handoff"
	| "manual";
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

/**
 * @deprecated Page-rendering SSOT is the compact `SduiScreen` contract in
 * `./sdui`. Keep this type only for legacy audit/spec artifacts during
 * migration.
 */
export type ScreenSpecV2 = {
	meta: {
		schema_version: 2;
		status: ScreenSpecStatus;
		route: `/${string}`;
		source: ScreenSpecSource;
		/** @deprecated Document-to-screen trace belongs in @policy/authoring. */
		source_ref?: string;
		/** @deprecated Document-to-screen trace belongs in @policy/authoring. */
		policy_doc?: string;
		/** @deprecated Document-to-screen trace belongs in @policy/authoring. */
		policy_section?: string;
		/** @deprecated Document-to-screen trace belongs in @policy/authoring. */
		pagination_ref?: string;
	};
	screen: {
		id: string;
		name: string;
		domain:
			| "home"
			| "membership"
			| "product"
			| "search"
			| "tu"
			| "nc-full"
			| "nc-simple";
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

/**
 * @deprecated Use `SduiPrimitiveValue` from `./sdui` for new renderable screens.
 */
export type SDUIPrimitiveValue = string | number | boolean | null;

/**
 * @deprecated Use `SduiPropValue` from `./sdui` for new renderable screens.
 */
export type SDUIJsonValue =
	| SDUIPrimitiveValue
	| readonly SDUIJsonValue[]
	| { readonly [key: string]: SDUIJsonValue };

/**
 * @deprecated Use `SduiNode` from `./sdui`. This legacy node shape mixes
 * implementation metadata, raw style escape hatches, and render tree concerns.
 */
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
	evidence_refs?: readonly {
		field: string;
		source_ref: string;
		summary: string;
	}[];
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
	legal_notices?: readonly PolicyNotice[];
	output_mapping?: readonly PolicyOutputMapping[];
};

export type UXJourneyStage =
	| "entry"
	| "explore"
	| "search"
	| "decision"
	| "execution"
	| "complete"
	| "support";

export type UXStageClassification = {
	primary: UXJourneyStage;
	secondary?: readonly UXJourneyStage[];
	evidence: string;
	checkpoints?: readonly string[];
};

export type PolicyNotice = {
	id: string;
	source_ref: string;
	priority: "required" | "usability";
	summary: string;
	display_rule: string;
	target_area?: string;
};

export type PolicyOutputMapping = {
	source_output: string;
	target_screen?: string;
	target_area?: string;
	display_as: string;
};

export type ScreenStateMatrixItem = {
	state: string;
	trigger: string;
	visual: string;
	action?: string;
	data_requirements?: readonly string[];
};

export type ScreenDecisionLogItem = {
	decision: string;
	accepted: string;
	rejected?: readonly string[];
	reason: string;
};

export type ScreenInteractionTag =
	| "tap"
	| "interactive"
	| "sync"
	| "enabled"
	| "loading"
	| "modal"
	| "state"
	| "nav";

export type ScreenInteraction = {
	tag: ScreenInteractionTag;
	selector?: string;
	source?: string;
	target?: string;
	condition?: string;
	action?: string;
	description: string;
};

export type ScreenInterfacePlan = {
	screen_genre?: string;
	genre?: string;
	primary_task: string;
	user_decision?: string;
	user_input?: string;
	info_hierarchy?: readonly string[] | Record<string, SDUIJsonValue>;
	hierarchy?: readonly string[] | Record<string, SDUIJsonValue>;
	visual_order?: readonly string[];
	progress_location?: string;
	cta_location?: string | Record<string, SDUIJsonValue>;
	selection_pattern?: string;
	input_pattern?: string;
	copy_policy?: Record<string, SDUIJsonValue>;
	rail_policy?: Record<string, SDUIJsonValue>;
	state_matrix?: readonly ScreenStateMatrixItem[];
	decision_log?: readonly ScreenDecisionLogItem[];
};

export type ScreenBenchmarkTrace = {
	criteria: readonly string[];
	guards: readonly string[];
	notes?: readonly string[];
};

/**
 * @deprecated Use compact `SduiScreen` from `./sdui` for new page rendering and
 * Figma page export. This legacy type keeps policy extract, interface plan,
 * screen contract, benchmark, data, and render tree in one document.
 */
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
	x_uxStage?: UXStageClassification;
	x_interfacePlan?: ScreenInterfacePlan;
	x_stateMatrix?: readonly ScreenStateMatrixItem[];
	x_interactions?: readonly ScreenInteraction[];
	x_decisionLog?: readonly ScreenDecisionLogItem[];
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

/**
 * @deprecated Use `getSduiScreenIssues` from `./sdui` for canonical SDUI.
 */
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

	if (
		spec.x_policyExtract.source.type === "policy" &&
		(spec.x_policyExtract.evidence_refs?.length ?? 0) === 0
	) {
		issues.push({
			severity: "warning",
			message:
				"x_policyExtract.evidence_refs should map extracted policy fields back to source sections or clauses.",
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
