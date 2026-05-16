import { screenConfig as cxExampleCompleteActivationRoute } from "../../app/(cx)/CX-EXAMPLE-COMPLETE-ACTIVATION/Screen.config";
import { screenConfig as cxExampleCompletePlanChangeRoute } from "../../app/(cx)/CX-EXAMPLE-COMPLETE-PLAN-CHANGE/Screen.config";
import { screenConfig as cxExamplePersonalInfoInputRoute } from "../../app/(cx)/CX-EXAMPLE-PERSONAL-INFO-INPUT/Screen.config";
import { screenConfig as cxExampleTextSectionProofRoute } from "../../app/(cx)/CX-EXAMPLE-TEXT-SECTION-PROOF/Screen.config";
import { screenConfig as legacyConvertedMbrPg0010CxRoute } from "../../app/(legacy-converted-mbr)/LEGACY-MBR-PG-001-0-CX/Screen.config";
import { screenConfig as legacyConvertedMbrPg0020CxRoute } from "../../app/(legacy-converted-mbr)/LEGACY-MBR-PG-002-0-CX/Screen.config";
import { screenConfig as legacyConvertedMbrPg0030CxRoute } from "../../app/(legacy-converted-mbr)/LEGACY-MBR-PG-003-0-CX/Screen.config";
import { screenConfig as legacyConvertedMbrPg0040CxRoute } from "../../app/(legacy-converted-mbr)/LEGACY-MBR-PG-004-0-CX/Screen.config";
import { screenConfig as legacyConvertedMbrPg0050CxRoute } from "../../app/(legacy-converted-mbr)/LEGACY-MBR-PG-005-0-CX/Screen.config";
import { screenConfig as legacyConvertedMbrPg0060CxRoute } from "../../app/(legacy-converted-mbr)/LEGACY-MBR-PG-006-0-CX/Screen.config";
import { screenConfig as legacyConvertedMbrPg0070CxRoute } from "../../app/(legacy-converted-mbr)/LEGACY-MBR-PG-007-0-CX/Screen.config";
import { screenConfig as novaMbrPg0010Route } from "../../app/(mbr)/NOVA-MBR-PG-001-0/Screen.config";
import { screenConfig as novaMbrPg0020Route } from "../../app/(mbr)/NOVA-MBR-PG-002-0/Screen.config";
import { screenConfig as novaMbrPg0030Route } from "../../app/(mbr)/NOVA-MBR-PG-003-0/Screen.config";
import { screenConfig as novaMbrPg0050Route } from "../../app/(mbr)/NOVA-MBR-PG-005-0/Screen.config";
import type { ScreenRoute } from "./types";

export const screenRoutes = [
	legacyConvertedMbrPg0010CxRoute,
	legacyConvertedMbrPg0020CxRoute,
	legacyConvertedMbrPg0030CxRoute,
	legacyConvertedMbrPg0040CxRoute,
	legacyConvertedMbrPg0050CxRoute,
	legacyConvertedMbrPg0060CxRoute,
	legacyConvertedMbrPg0070CxRoute,
	novaMbrPg0010Route,
	novaMbrPg0020Route,
	novaMbrPg0030Route,
	novaMbrPg0050Route,
	cxExampleCompleteActivationRoute,
	cxExampleCompletePlanChangeRoute,
	cxExamplePersonalInfoInputRoute,
	cxExampleTextSectionProofRoute,
] as const satisfies readonly ScreenRoute[];

export type ScreenId = (typeof screenRoutes)[number]["id"];
export type ScreenRoutePath = (typeof screenRoutes)[number]["route"];
export const screenCount = screenRoutes.length;
