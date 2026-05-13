import { screenConfig as legacyMbrPg0010Route } from "../../app/(legacy-mbr)/LEGACY-MBR-PG-001-0/Screen.config";
import { screenConfig as legacyMbrPg0020Route } from "../../app/(legacy-mbr)/LEGACY-MBR-PG-002-0/Screen.config";
import { screenConfig as legacyMbrPg0030Route } from "../../app/(legacy-mbr)/LEGACY-MBR-PG-003-0/Screen.config";
import { screenConfig as legacyMbrPg0040Route } from "../../app/(legacy-mbr)/LEGACY-MBR-PG-004-0/Screen.config";
import { screenConfig as legacyMbrPg0050Route } from "../../app/(legacy-mbr)/LEGACY-MBR-PG-005-0/Screen.config";
import { screenConfig as legacyMbrPg0060Route } from "../../app/(legacy-mbr)/LEGACY-MBR-PG-006-0/Screen.config";
import { screenConfig as legacyMbrPg0070Route } from "../../app/(legacy-mbr)/LEGACY-MBR-PG-007-0/Screen.config";
import { screenConfig as novaMbrPg0010Route } from "../../app/(mbr)/NOVA-MBR-PG-001-0/Screen.config";
import { screenConfig as novaMbrPg0020Route } from "../../app/(mbr)/NOVA-MBR-PG-002-0/Screen.config";
import { screenConfig as novaMbrPg0030Route } from "../../app/(mbr)/NOVA-MBR-PG-003-0/Screen.config";
import { screenConfig as novaMbrPg0050Route } from "../../app/(mbr)/NOVA-MBR-PG-005-0/Screen.config";
import type { ScreenRoute } from "./types";

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
