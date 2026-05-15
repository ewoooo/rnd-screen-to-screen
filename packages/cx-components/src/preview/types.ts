import type { ReactNode } from "react";

export type CxComponentPreviewLayer = "base";

export type CxComponentPreviewGroup =
	| "action"
	| "feedback"
	| "form"
	| "layout"
	| "navigation"
	| "selection"
	| "typography";

export type CxComponentPreviewStatus = "active" | "candidate";

export type CxComponentPreviewCandidateKind = "reuse" | "new";

export type CxComponentPreviewOwner = "@pxds/cx-components";

type CxComponentPreviewBaseEntry = {
	id: string;
	name: string;
	layer: CxComponentPreviewLayer;
	group: CxComponentPreviewGroup;
	owner: CxComponentPreviewOwner;
	importPath: string;
};

export type CxComponentPreviewActiveEntry = CxComponentPreviewBaseEntry & {
	status: "active";
	candidateKind?: never;
	sourceRequirementId?: never;
	reuseOf?: never;
};

export type CxComponentPreviewCandidateEntry = CxComponentPreviewBaseEntry & {
	status: "candidate";
	candidateKind: CxComponentPreviewCandidateKind;
	sourceRequirementId?: string;
	reuseOf?: string;
};

export type CxComponentPreviewEntry =
	| CxComponentPreviewActiveEntry
	| CxComponentPreviewCandidateEntry;

export type CxComponentPreviewCase = {
	id: string;
	label: string;
	render: () => ReactNode;
};

export type CxComponentPreviewExample = {
	componentId: string;
	description: string;
	cases: readonly CxComponentPreviewCase[];
};

export type ComponentPreviewExample = CxComponentPreviewExample;
