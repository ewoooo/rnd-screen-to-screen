import { defineRegistry } from "@pxds/cx-spec";
import { authRequestConfig } from "./ogn-mbr-auth-request";
import { authSelectConfig } from "./ogn-mbr-auth-select";
import { entryCheckConfig } from "./ogn-mbr-entry-check";
import { guardianInputConfig } from "./ogn-mbr-guardian-input";
import { guardianResultConfig } from "./ogn-mbr-guardian-result";
import { joinCompleteConfig } from "./ogn-mbr-join-complete";
import { memberInputConfig } from "./ogn-mbr-member-input";
import { termAgreeConfig } from "./ogn-mbr-term-agree";
import { termListConfig } from "./ogn-mbr-term-list";

export { AuthSelect } from "./ogn-mbr-auth-select";
export { AuthRequest } from "./ogn-mbr-auth-request";
export { TermList } from "./ogn-mbr-term-list";
export { TermAgree } from "./ogn-mbr-term-agree";
export { GuardianInput } from "./ogn-mbr-guardian-input";
export { GuardianResult } from "./ogn-mbr-guardian-result";
export { MemberInput } from "./ogn-mbr-member-input";
export { EntryCheck } from "./ogn-mbr-entry-check";
export { JoinComplete } from "./ogn-mbr-join-complete";

export const mbrFpOrganismRegistry = defineRegistry([
	authSelectConfig,
	authRequestConfig,
	termListConfig,
	termAgreeConfig,
	guardianInputConfig,
	guardianResultConfig,
	memberInputConfig,
	entryCheckConfig,
	joinCompleteConfig,
] as const);
