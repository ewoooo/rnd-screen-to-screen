export type PolicyCopy = {
	requirement: string;
	error: string;
};

export type PolicySourceRefShape = {
	document: string;
	section?: string;
};

export type PolicyDefinition = {
	id: string;
	parent?: string;
	domain: string;
	group: string;
	title: string;
	sourceText: string;
	sourceRef: PolicySourceRefShape;
	copy: PolicyCopy;
};

export function definePolicy<T extends PolicyDefinition>(policy: T): T {
	return policy;
}

export type PolicyDriftReport = {
	policyId: string;
	bodyPath: string;
	ok: boolean;
	missing?: string;
};

export function assertPolicyDrift(
	policy: PolicyDefinition,
	bodyPath: string,
	bodyText: string,
): PolicyDriftReport {
	const normalizedBody = bodyText.replace(/\s+/g, " ").trim();
	const normalizedSource = policy.sourceText.replace(/\s+/g, " ").trim();
	const ok = normalizedBody.includes(normalizedSource);
	return {
		policyId: policy.id,
		bodyPath,
		ok,
		missing: ok ? undefined : normalizedSource,
	};
}
