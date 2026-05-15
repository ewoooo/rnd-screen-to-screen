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
	};
};

export type ScreenRouteLike = {
	id: string;
	route: `/${string}`;
};
