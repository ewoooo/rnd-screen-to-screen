export type ScreenConfig = {
	id: string;
	name: string;
	label: string;
	route: `/${string}`;
	group: string;
	owner: string;
	node: {
		kind: "screen";
	};
	figma?: {
		frameName: string;
		width: number;
		height: number;
	};
};

export type ScreenLifecycleStatus = "active";

export type ScreenBuildSelectionSource =
	| "componentCandidates"
	| "existing-composition"
	| "new-organism"
	| "new-component";

export type ScreenBuildRejectedCandidate = {
	candidate: string;
	reason: string;
};

export type ScreenBuildSelection = {
	section: string;
	selected: string;
	source: ScreenBuildSelectionSource;
	reason: string;
	rejected?: readonly ScreenBuildRejectedCandidate[];
	deviationReason?: string;
};

export type ScreenRouteConfig = ScreenConfig & {
	status: ScreenLifecycleStatus;
	createdAt: `${number}-${number}-${number}`;
	domain: string;
	generation?: {
		source: string;
		pattern: string;
		policyRefs: readonly string[];
		ognIds: readonly string[];
		designDocsChecked: readonly string[];
		buildSelections?: readonly ScreenBuildSelection[];
	};
};

export type ScreenRouteLike = {
	id: string;
	route: `/${string}`;
};
