import { screenConfig as cxExampleCompleteActivationRoute } from "../../app/(cx-example)/CX-EXAMPLE-COMPLETE-ACTIVATION/Screen.config";
import { screenConfig as cxExampleCompletePlanChangeRoute } from "../../app/(cx-example)/CX-EXAMPLE-COMPLETE-PLAN-CHANGE/Screen.config";
import { screenConfig as cxExamplePersonalInfoInputRoute } from "../../app/(cx-example)/CX-EXAMPLE-PERSONAL-INFO-INPUT/Screen.config";
import { screenConfig as cxExampleTextSectionProofRoute } from "../../app/(cx-example)/CX-EXAMPLE-TEXT-SECTION-PROOF/Screen.config";
import { screenConfig as novaChgFp0010Route } from "../../app/(chg)/NOVA-CHG-FP-001-0/Screen.config";
import { screenConfig as novaChgFp0020Route } from "../../app/(chg)/NOVA-CHG-FP-002-0/Screen.config";
import { screenConfig as novaChgFp0030Route } from "../../app/(chg)/NOVA-CHG-FP-003-0/Screen.config";
import { screenConfig as novaChgFp0040Route } from "../../app/(chg)/NOVA-CHG-FP-004-0/Screen.config";
import { screenConfig as wdsMbrLegacyPg0010CxRoute } from "../../app/(wds-mbr-legacy)/LEGACY-MBR-PG-001-0-CX/Screen.config";
import { screenConfig as wdsMbrLegacyPg0020CxRoute } from "../../app/(wds-mbr-legacy)/LEGACY-MBR-PG-002-0-CX/Screen.config";
import { screenConfig as wdsMbrLegacyPg0030CxRoute } from "../../app/(wds-mbr-legacy)/LEGACY-MBR-PG-003-0-CX/Screen.config";
import { screenConfig as wdsMbrLegacyPg0040CxRoute } from "../../app/(wds-mbr-legacy)/LEGACY-MBR-PG-004-0-CX/Screen.config";
import { screenConfig as wdsMbrLegacyPg0050CxRoute } from "../../app/(wds-mbr-legacy)/LEGACY-MBR-PG-005-0-CX/Screen.config";
import { screenConfig as wdsMbrLegacyPg0060CxRoute } from "../../app/(wds-mbr-legacy)/LEGACY-MBR-PG-006-0-CX/Screen.config";
import { screenConfig as wdsMbrLegacyPg0070CxRoute } from "../../app/(wds-mbr-legacy)/LEGACY-MBR-PG-007-0-CX/Screen.config";
import { screenConfig as novaMbrPg0010Route } from "../../app/(nova-mbr-legacy)/NOVA-MBR-PG-001-0/Screen.config";
import { screenConfig as novaMbrPg0020Route } from "../../app/(nova-mbr-legacy)/NOVA-MBR-PG-002-0/Screen.config";
import { screenConfig as novaMbrPg0030Route } from "../../app/(nova-mbr-legacy)/NOVA-MBR-PG-003-0/Screen.config";
import { screenConfig as novaMbrPg0050Route } from "../../app/(nova-mbr-legacy)/NOVA-MBR-PG-005-0/Screen.config";
import { screenConfig as novaMbrFp0030CxRoute } from "../../app/(nova-mbr-fp)/NOVA-MBR-FP-003-0-CX/Screen.config";
import { screenConfig as novaMbrFp0010Route } from "../../app/(nova-mbr-fp-legacy)/NOVA-MBR-FP-001-0/Screen.config";
import { screenConfig as novaMbrFp0020Route } from "../../app/(nova-mbr-fp-legacy)/NOVA-MBR-FP-002-0/Screen.config";
import { screenConfig as novaMbrFp0030Route } from "../../app/(nova-mbr-fp-legacy)/NOVA-MBR-FP-003-0/Screen.config";
import { screenConfig as novaMbrFp0050Route } from "../../app/(nova-mbr-fp-legacy)/NOVA-MBR-FP-005-0/Screen.config";
import { screenConfig as novaMbrFp0080Route } from "../../app/(nova-mbr-fp-legacy)/NOVA-MBR-FP-008-0/Screen.config";
import { screenConfig as novaMbrFp0090Route } from "../../app/(nova-mbr-fp-legacy)/NOVA-MBR-FP-009-0/Screen.config";
import type { ScreenRoute } from "./types";

export const screenRoutes = [
	wdsMbrLegacyPg0010CxRoute,
	wdsMbrLegacyPg0020CxRoute,
	wdsMbrLegacyPg0030CxRoute,
	wdsMbrLegacyPg0040CxRoute,
	wdsMbrLegacyPg0050CxRoute,
	wdsMbrLegacyPg0060CxRoute,
	wdsMbrLegacyPg0070CxRoute,
	novaMbrPg0010Route,
	novaMbrPg0020Route,
	novaMbrPg0030Route,
	novaMbrPg0050Route,
	novaMbrFp0030CxRoute,
	novaMbrFp0010Route,
	novaMbrFp0020Route,
	novaMbrFp0030Route,
	novaMbrFp0050Route,
	novaMbrFp0080Route,
	novaMbrFp0090Route,
	novaChgFp0010Route,
	novaChgFp0020Route,
	novaChgFp0030Route,
	novaChgFp0040Route,
	cxExampleCompleteActivationRoute,
	cxExampleCompletePlanChangeRoute,
	cxExamplePersonalInfoInputRoute,
	cxExampleTextSectionProofRoute,
] as const satisfies readonly ScreenRoute[];

export type ScreenId = (typeof screenRoutes)[number]["id"];
export type ScreenRoutePath = (typeof screenRoutes)[number]["route"];
export const screenCount = screenRoutes.length;
