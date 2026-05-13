export type ScreenGroup =
	| "membership";

export type ScreenLifecycleStatus = "active";

export type ScreenRoute = {
	id: string;
	route: `/${string}`;
	label: string;
	group: ScreenGroup;
	status: ScreenLifecycleStatus;
	createdAt: `${number}-${number}-${number}`;
};
