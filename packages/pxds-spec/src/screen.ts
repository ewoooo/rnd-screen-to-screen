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

export type ScreenRouteLike = {
	id: string;
	route: `/${string}`;
};
