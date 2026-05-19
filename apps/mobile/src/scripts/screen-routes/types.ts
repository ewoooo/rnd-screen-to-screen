import type {
	ScreenRouteConfig,
	ScreenLifecycleStatus as SpecScreenLifecycleStatus,
} from "@pxds/cx-spec";

export type ScreenGroup =
	| "nova-mbr-legacy"
	| "nova-mbr-fp"
	| "nova-mbr-fp-legacy"
	| "chg"
	| "cx-example"
	| "wds-mbr-legacy";
export type ScreenLifecycleStatus = SpecScreenLifecycleStatus;

export type ScreenRoute = ScreenRouteConfig & {
	group: ScreenGroup;
};
