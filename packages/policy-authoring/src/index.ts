import {
	activeRenderableScreenSpecs,
	activeScreenSpecs,
	type ActiveRenderableScreenSpecId,
	type ActiveScreenSpecId,
} from "@screen/specs";
import type {
	PolicyExtract,
	RenderableScreenSpecV1,
	ScreenSpecV2,
	SDUIJsonValue,
} from "@screen/specs";
import type { EvidenceRef, PolicySourceKind } from "@policy/core";

export type { EvidenceRef, PolicySourceKind } from "@policy/core";

export type PolicySourceRef = {
	id: string;
	kind: PolicySourceKind;
	document?: string;
	section?: string;
	ref?: string;
	paginationRef?: string;
};

export type PolicyToScreenTrace = {
	screenId: string;
	route: `/${string}`;
	source: PolicySourceRef;
	evidenceRefs: readonly EvidenceRef[];
	purpose?: string;
};

type LegacySpecMeta = ScreenSpecV2["meta"] & {
	policy_doc?: string;
	policy_section?: string;
	pagination_ref?: string;
};

function normalizeSourceKind(source: string | undefined): PolicySourceKind {
	if (source === "policy-driven") return "policy";
	if (
		source === "policy" ||
		source === "implemented-page" ||
		source === "handoff" ||
		source === "manual"
	) {
		return source;
	}
	return "manual";
}

function getSourceId(source: PolicySourceRef) {
	return [
		source.kind,
		source.document,
		source.section,
		source.ref,
		source.paginationRef,
	]
		.filter(Boolean)
		.join(":");
}

function toEvidenceRefs(policyExtract?: PolicyExtract) {
	return (policyExtract?.evidence_refs ?? []).map((ref) => ({
		field: ref.field,
		sourceRef: ref.source_ref,
		summary: ref.summary,
	}));
}

export function getPolicySourceFromScreenSpec(
	spec: ScreenSpecV2,
): PolicySourceRef | undefined {
	const meta = spec.meta as LegacySpecMeta;
	const kind = normalizeSourceKind(meta.source);
	const document = meta.policy_doc;
	const section = meta.policy_section;
	const ref = meta.source_ref;
	const paginationRef = meta.pagination_ref;

	if (!document && !section && !ref && !paginationRef && kind !== "policy") {
		return undefined;
	}

	const source = {
		id: "",
		kind,
		document,
		section,
		ref,
		paginationRef,
	};

	return {
		...source,
		id: getSourceId(source),
	};
}

export function getPolicySourceFromRenderableSpec(
	spec: RenderableScreenSpecV1,
): PolicySourceRef | undefined {
	const extract = spec.x_policyExtract;
	const refs = extract.source.refs;
	const source = {
		id: "",
		kind: extract.source.type,
		ref: refs.join("; "),
	};

	if (refs.length === 0 && extract.source.type !== "policy") {
		return undefined;
	}

	return {
		...source,
		id: getSourceId(source),
	};
}

export function getPolicyToScreenTraceFromSpec(
	spec: ScreenSpecV2,
	renderableSpec?: RenderableScreenSpecV1,
): PolicyToScreenTrace | undefined {
	const source =
		getPolicySourceFromScreenSpec(spec) ??
		(renderableSpec
			? getPolicySourceFromRenderableSpec(renderableSpec)
			: undefined);

	if (!source) return undefined;

	return {
		screenId: spec.screen.id,
		route: spec.meta.route,
		source,
		evidenceRefs: toEvidenceRefs(renderableSpec?.x_policyExtract),
		purpose: renderableSpec?.x_policyExtract.purpose,
	};
}

export function getPolicyToScreenTraceFromRenderableSpec(
	spec: RenderableScreenSpecV1,
): PolicyToScreenTrace | undefined {
	const source = getPolicySourceFromRenderableSpec(spec);

	if (!source) return undefined;

	return {
		screenId: spec.metadata.id,
		route: spec.metadata.route,
		source,
		evidenceRefs: toEvidenceRefs(spec.x_policyExtract),
		purpose: spec.x_policyExtract.purpose,
	};
}

export const policyToScreenTraces = Object.fromEntries(
	Object.entries(activeScreenSpecs).flatMap(([id, spec]) => {
		const trace = getPolicyToScreenTraceFromSpec(
			spec,
			activeRenderableScreenSpecs[id as ActiveRenderableScreenSpecId],
		);

		return trace ? [[id, trace]] : [];
	}),
) as Partial<Record<ActiveScreenSpecId, PolicyToScreenTrace>>;

export function getPolicyToScreenTrace(screenId: ActiveScreenSpecId | string) {
	return policyToScreenTraces[screenId as ActiveScreenSpecId];
}

export type ProvenanceJsonValue = SDUIJsonValue;
