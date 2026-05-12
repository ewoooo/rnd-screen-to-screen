import type { PolicyDefinition } from "@policy/core";

/**
 * Per-part composition entry inside an ogn spec.
 *
 * The `component` field is a registry id (resolved at build/render time);
 * `policy` carries the bound policy text source (resolved by the rendering
 * mol via its `policySlots` declaration).
 */
export type OgnPartSlot = "content" | "bottom";

export type OgnPart = {
	id: string;
	component: string;
	variant?: string | null;
	event?: string | null;
	action?: OgnAction | null;
	policies?: readonly PolicyDefinition[];
	label?: string;
	placeholder?: string;
	required?: boolean;
	note?: string;
	/**
	 * Physical layout slot the part belongs to inside its hosting screen.
	 * Defaults to "content". Parts marked "bottom" are hoisted to the
	 * AppScreen bottom slot when the ogn is rendered.
	 */
	slot?: OgnPartSlot;
};

export type OgnAction =
	| { kind: "setState"; key: string }
	| { kind: "apiCall"; endpoint?: string }
	| { kind: "navigate"; target: string };

export type OgnStateName = string;

export type OgnSnapshot = {
	visibleParts: readonly string[];
	/** Per-part overrides for this state — e.g. force error slot visible. */
	emphasize?: Readonly<Record<string, "hint" | "error">>;
};

export type OgnSpec = {
	id: string;
	module: string;
	composedOfRegistryId: string;
	states: readonly OgnStateName[];
	triggers?: Readonly<Record<string, string>>;
	serverControl?: readonly string[];
	policyRefs: readonly string[];
	parts: readonly OgnPart[];
	snapshots: Readonly<Record<OgnStateName, OgnSnapshot>>;
	copyStatus: {
		status: "tentative" | "authored";
		author?: string;
		updatedAt?: string;
	};
};

export function defineOgnSpec<T extends OgnSpec>(spec: T): T {
	return spec;
}

export function partPolicyTexts(part: OgnPart): {
	hint?: string;
	error?: string;
} {
	if (!part.policies || part.policies.length === 0) return {};
	const hint = part.policies
		.map((p) => p.copy.requirement)
		.join(" · ");
	const error = part.policies.map((p) => p.copy.error).join(" / ");
	return { hint, error };
}
