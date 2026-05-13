import { screenConfig as legacyMbrPg0010Route } from "../app/LEGACY-MBR-PG-001-0/Screen.config";
import { screenConfig as legacyMbrPg0020Route } from "../app/LEGACY-MBR-PG-002-0/Screen.config";
import { screenConfig as legacyMbrPg0030Route } from "../app/LEGACY-MBR-PG-003-0/Screen.config";
import { screenConfig as legacyMbrPg0040Route } from "../app/LEGACY-MBR-PG-004-0/Screen.config";
import { screenConfig as legacyMbrPg0050Route } from "../app/LEGACY-MBR-PG-005-0/Screen.config";
import { screenConfig as legacyMbrPg0060Route } from "../app/LEGACY-MBR-PG-006-0/Screen.config";
import { screenConfig as legacyMbrPg0070Route } from "../app/LEGACY-MBR-PG-007-0/Screen.config";
import { screenConfig as novaMbrPg0010Route } from "../app/NOVA-MBR-PG-001-0/Screen.config";
import { screenConfig as novaMbrPg0020Route } from "../app/NOVA-MBR-PG-002-0/Screen.config";
import { screenConfig as novaMbrPg0030Route } from "../app/NOVA-MBR-PG-003-0/Screen.config";
import { screenConfig as novaMbrPg0050Route } from "../app/NOVA-MBR-PG-005-0/Screen.config";

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

export const screenRoutes = [
	legacyMbrPg0010Route,
	legacyMbrPg0020Route,
	legacyMbrPg0030Route,
	legacyMbrPg0040Route,
	legacyMbrPg0050Route,
	legacyMbrPg0060Route,
	legacyMbrPg0070Route,
	novaMbrPg0010Route,
	novaMbrPg0020Route,
	novaMbrPg0030Route,
	novaMbrPg0050Route,
] as const satisfies readonly ScreenRoute[];

export type ScreenId = (typeof screenRoutes)[number]["id"];
export type ScreenRoutePath = (typeof screenRoutes)[number]["route"];
export const screenCount = screenRoutes.length;
const referenceScreenIdPrefix = "NOVA-MBR-PG-" as const;

export function isReferenceScreenId(id: ScreenId | string) {
	return id.startsWith(referenceScreenIdPrefix);
}

export function isLegacyScreenId(id: ScreenId | string) {
	return !isReferenceScreenId(id);
}

export const referenceScreenRoutes = screenRoutes.filter((screen) =>
	isReferenceScreenId(screen.id),
);
export const legacyScreenRoutes = screenRoutes.filter((screen) => isLegacyScreenId(screen.id));
export const referenceScreenCount = referenceScreenRoutes.length;
export const legacyScreenCount = legacyScreenRoutes.length;

import type { RenderScreenSpec } from "../scripts/render-spec";
import {
	createScreenRoute,
	deleteScreenRoute,
	findScreenRouteById,
	findScreenRouteByRoute,
	updateScreenRoute,
	upsertScreenRoute,
	type ScreenRoutePatch as GenericScreenRoutePatch,
	type ScreenRouteRegistry as GenericScreenRouteRegistry,
} from "../scripts/registry";

export type SDUIJsonValue =
	| string
	| number
	| boolean
	| null
	| readonly SDUIJsonValue[]
	| { readonly [key: string]: SDUIJsonValue };
export type SduiPrimitiveValue = string | number | boolean | null;
export type SduiPropValue = SDUIJsonValue;
export type SduiComponentId = string;
export type SDUINode = { readonly [key: string]: SDUIJsonValue };
export type SduiNode = SDUINode;
export type ScreenSpecIssueSeverity = "error" | "warning";
export type SduiScreenIssueSeverity = ScreenSpecIssueSeverity;
export type ScreenSpecIssue = {
	readonly severity: ScreenSpecIssueSeverity;
	readonly message: string;
};
export type SduiScreenIssue = ScreenSpecIssue;
export type DesignException = { readonly [key: string]: SDUIJsonValue };
export type DesignSystemContract = { readonly [key: string]: SDUIJsonValue };
export type PolicyExtract = { readonly [key: string]: SDUIJsonValue };
export type ScreenAreaContract = { readonly [key: string]: SDUIJsonValue };
export type ScreenBenchmarkTrace = { readonly [key: string]: SDUIJsonValue };
export type ScreenLayoutContract = { readonly [key: string]: SDUIJsonValue };
export type ScreenSlotContract = { readonly [key: string]: SDUIJsonValue };
export type ScreenSpecV2 = {
	readonly meta: { readonly [key: string]: SDUIJsonValue };
	readonly screen: { readonly domain: string; readonly [key: string]: SDUIJsonValue };
	readonly screen_contract: ScreenAreaContract;
	readonly design_system?: DesignSystemContract;
	readonly render_tree?: readonly SDUINode[];
	readonly [key: string]: SDUIJsonValue | undefined;
};
export type RenderableScreenSpecV1 = {
	readonly meta?: { readonly [key: string]: SDUIJsonValue };
	readonly screen_id?: string;
	readonly data?: { readonly [key: string]: SDUIJsonValue };
	readonly x_screenContract?: ScreenAreaContract;
	readonly [key: string]: SDUIJsonValue | undefined;
};
export type SduiScreenShell = "app-screen";
export type SduiScreenSlots = { readonly [key: string]: SDUIJsonValue };
export type SduiScreen = {
	readonly schemaVersion: "sdui-v1";
	readonly screen_id: string;
	readonly shell: SduiScreenShell;
	readonly slots: SduiScreenSlots;
};

export const activeScreenSpecs = {
} as const satisfies Partial<Record<ScreenId, ScreenSpecV2>>;

export const activeRenderableScreenSpecs = {
} as const satisfies Partial<Record<ScreenId, RenderableScreenSpecV1>>;

export const activeSduiScreenSpecs = {
} as const satisfies Partial<Record<ScreenId, SduiScreen>>;

export const activeRenderScreenSpecs = {

} as const satisfies Partial<Record<ScreenId, RenderScreenSpec>>;

export const screenRenderRegistry = [
] as const;

export type ActiveScreenSpecId = keyof typeof activeScreenSpecs;
export type ActiveRenderableScreenSpecId = keyof typeof activeRenderableScreenSpecs;
export type ActiveRenderScreenSpecId = keyof typeof activeRenderScreenSpecs;

export type {
	RenderComponentId,
	RenderPropValue,
	RenderScreenSpec,
	RenderScreenSpecIssue,
	RenderSpecNode,
} from "../scripts/render-spec";
export {
	collectRenderSpecNodes,
	isRenderScreenSpec,
	validateRenderScreenSpec,
} from "../scripts/render-spec";

export type ScreenRouteRegistry = GenericScreenRouteRegistry<ScreenRoute>;
export type ScreenRoutePatch = GenericScreenRoutePatch<ScreenRoute>;

export {
	createScreenRoute,
	deleteScreenRoute,
	findScreenRouteById,
	findScreenRouteByRoute,
	updateScreenRoute,
	upsertScreenRoute,
};

export function getScreenRouteById(id: ScreenId | string) {
	return findScreenRouteById(screenRoutes, id);
}

export function getScreenRouteByRoute(route: ScreenRoutePath | `/${string}`) {
	return findScreenRouteByRoute(screenRoutes, route);
}

export function getScreenSpecIssues(_spec: ScreenSpecV2): ScreenSpecIssue[] {
	return [];
}

export function getRenderableScreenSpecIssues(
	_spec: RenderableScreenSpecV1,
): ScreenSpecIssue[] {
	return [];
}

export function getSduiScreenIssues(_spec: SduiScreen): SduiScreenIssue[] {
	return [];
}

export function isSduiScreen(_value: unknown): _value is SduiScreen {
	return false;
}
