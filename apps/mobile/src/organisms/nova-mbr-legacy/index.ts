import { defineRegistry } from "@pxds/cx-spec";
import { actionAreaTermsConfig } from "./action-area-terms";
import { checkboxTermsConfig } from "./checkbox-terms";
import { consentTermsAccordionConfig } from "./consent-terms-accordion";
import { joinCompleteResultConfig } from "./join-complete-result";
import { listCellAuthMethodConfig } from "./list-cell-auth-method";
import { sectionHeaderPageConfig } from "./section-header-page";
import { sectionMessageEntryBranchConfig } from "./section-message-entry-branch";
import { sectionMessageJoinCompleteViewConfig } from "./section-message-join-complete-view";
import { textFieldGuardianRequestConfig } from "./text-field-guardian-request";
import { textFieldMemberInfoConfig } from "./text-field-member-info";

export { ActionAreaTerms } from "./action-area-terms";
export { CheckboxTerms } from "./checkbox-terms";
export {
	ConsentTermsAccordion,
	CONSENT_ITEM_IDS,
	REQUIRED_CONSENT_IDS,
} from "./consent-terms-accordion";
export { JoinCompleteResult } from "./join-complete-result";
export { ListCellAuthMethod } from "./list-cell-auth-method";
export { MbrPrimaryCTABar } from "./primary-cta-bar";
export { SectionHeaderPage } from "./section-header-page";
export { SectionMessageEntryBranch } from "./section-message-entry-branch";
export { SectionMessageJoinCompleteView } from "./section-message-join-complete-view";
export { TextFieldGuardianRequest } from "./text-field-guardian-request";
export { TextFieldMemberInfo } from "./text-field-member-info";

export const mbrOrganismRegistry = defineRegistry([
	actionAreaTermsConfig,
	sectionHeaderPageConfig,
	checkboxTermsConfig,
	consentTermsAccordionConfig,
	joinCompleteResultConfig,
	listCellAuthMethodConfig,
	sectionMessageEntryBranchConfig,
	sectionMessageJoinCompleteViewConfig,
	textFieldGuardianRequestConfig,
	textFieldMemberInfoConfig,
] as const);
