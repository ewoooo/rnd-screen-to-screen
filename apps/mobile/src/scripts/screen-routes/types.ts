import type {
	ScreenRouteConfig,
	ScreenLifecycleStatus as SpecScreenLifecycleStatus,
} from "@pxds/cx-spec";

export type ScreenGroup = "nova-mbr-legacy" | "cx-example" | "wds-mbr-legacy";
export type ScreenLifecycleStatus = SpecScreenLifecycleStatus;

export type ScreenRoute = ScreenRouteConfig & {
	group: ScreenGroup;
};
