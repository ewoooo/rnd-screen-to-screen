import type { ScreenConfig } from "@pxds/pxds-spec";

export type MobileScreenLifecycleStatus = "active";

export type MobileScreenConfig = ScreenConfig & {
	status: MobileScreenLifecycleStatus;
	createdAt: `${number}-${number}-${number}`;
	domain: string;
};
