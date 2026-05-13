import type {
	ScreenLifecycleStatus as SpecScreenLifecycleStatus,
	ScreenRouteConfig,
} from "@pxds/pxds-spec";

export type ScreenGroup = "membership";
export type ScreenLifecycleStatus = SpecScreenLifecycleStatus;

export type ScreenRoute = ScreenRouteConfig & {
	group: ScreenGroup;
};
