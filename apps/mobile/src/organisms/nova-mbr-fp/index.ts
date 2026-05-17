import { defineRegistry } from "@pxds/cx-spec";
import { authRequestConfig } from "./auth-request";
import { authSelectConfig } from "./auth-select";
import { entryCheckConfig } from "./entry-check";
import { guardianInputConfig } from "./guardian-input";
import { guardianResultConfig } from "./guardian-result";
import { joinCompleteConfig } from "./join-complete";
import { memberInputConfig } from "./member-input";
import { termAgreeConfig } from "./term-agree";
import { termListConfig } from "./term-list";

export { FpPageHeader, MbrFpActionBar } from "./_chrome";
export { AuthRequest } from "./auth-request";
export { AuthSelect } from "./auth-select";
export { EntryCheck } from "./entry-check";
export { GuardianInput } from "./guardian-input";
export { GuardianResult } from "./guardian-result";
export { JoinComplete } from "./join-complete";
export { MemberInput } from "./member-input";
export { TermAgree } from "./term-agree";
export { TermList } from "./term-list";

export const mbrFpOrganismRegistry = defineRegistry([
	termListConfig,
	termAgreeConfig,
	guardianInputConfig,
	guardianResultConfig,
	memberInputConfig,
	entryCheckConfig,
	authSelectConfig,
	authRequestConfig,
	joinCompleteConfig,
] as const);
