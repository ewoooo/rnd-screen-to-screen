import { defineRegistry } from "@pxds/pxds-spec";
import { actionAreaTermsConfig } from "./action-area-terms";
import { checkboxTermsConfig } from "./checkbox-terms";
import { listCellAuthMethodConfig } from "./list-cell-auth-method";
import { sectionHeaderPageConfig } from "./section-header-page";
import { sectionMessageEntryBranchConfig } from "./section-message-entry-branch";
import { sectionMessageJoinCompleteViewConfig } from "./section-message-join-complete-view";
import { textFieldGuardianRequestConfig } from "./text-field-guardian-request";
import { textFieldMemberInfoConfig } from "./text-field-member-info";

export const mbrOrganismRegistry = defineRegistry([
	actionAreaTermsConfig,
	sectionHeaderPageConfig,
	checkboxTermsConfig,
	listCellAuthMethodConfig,
	sectionMessageEntryBranchConfig,
	sectionMessageJoinCompleteViewConfig,
	textFieldGuardianRequestConfig,
	textFieldMemberInfoConfig,
] as const);
