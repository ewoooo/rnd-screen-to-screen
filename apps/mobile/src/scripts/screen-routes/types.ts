import type {
	ScreenRouteConfig,
	ScreenLifecycleStatus as SpecScreenLifecycleStatus,
} from "@pxds/cx-spec";

export type ScreenGroup = "mbr" | "cx" | "legacy-converted-mbr";
export type ScreenLifecycleStatus = SpecScreenLifecycleStatus;

export type ScreenRoute = ScreenRouteConfig & {
	group: ScreenGroup;
};
