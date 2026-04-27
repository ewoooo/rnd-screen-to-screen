export type Version = {
	id: string;
	num: number;
	approach: string;
	label: string;
	route: string;
	path: string;
	files: string[];
};

export type Screen = {
	id: string;
	route: string;
	latest: string;
	versions: Version[];
};

export type Registry = {
	meta: Record<string, unknown>;
	screens: Screen[];
};
