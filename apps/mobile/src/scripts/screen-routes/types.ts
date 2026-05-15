import type {
	ScreenRouteConfig,
	ScreenLifecycleStatus as SpecScreenLifecycleStatus,
} from "@pxds/pxds-spec";

export type ScreenGroup = "membership" | "cx-example";
export type ScreenLifecycleStatus = SpecScreenLifecycleStatus;

export type ScreenRoute = ScreenRouteConfig & {
	group: ScreenGroup;
};
