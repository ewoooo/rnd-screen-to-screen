export type PolicySourceKind =
	| "policy"
	| "implemented-page"
	| "handoff"
	| "manual";

export type PolicySource = {
	id: string;
	kind: PolicySourceKind;
	document?: string;
	version?: string;
	path?: string;
};

export type PolicySection = {
	id: string;
	policyId: string;
	label: string;
	ref: string;
	order?: number;
};

export type UseCase = {
	id: string;
	policyId: string;
	label: string;
	sectionIds: readonly string[];
	primaryGoal: string;
};

export type EvidenceRef = {
	field: string;
	sourceRef: string;
	summary: string;
};

export {
	definePolicy,
	assertPolicyDrift,
	type PolicyCopy,
	type PolicyDefinition,
	type PolicyDriftReport,
	type PolicySourceRefShape,
} from "./policy";

