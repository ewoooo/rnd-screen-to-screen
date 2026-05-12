import { actionAreaTermsRegistryEntry } from "./action-area-terms/registry";
import { checkboxTermsRegistryEntry } from "./checkbox-terms/registry";
import { listCellAuthMethodRegistryEntry } from "./list-cell-auth-method/registry";
import { sectionHeaderPageRegistryEntry } from "./section-header-page/registry";
import { sectionMessageEntryBranchRegistryEntry } from "./section-message-entry-branch/registry";
import { sectionMessageJoinCompleteViewRegistryEntry } from "./section-message-join-complete-view/registry";
import { textFieldGuardianRequestRegistryEntry } from "./text-field-guardian-request/registry";
import { textFieldMemberInfoRegistryEntry } from "./text-field-member-info/registry";

export const mbrRegistryEntries = [
	sectionHeaderPageRegistryEntry,
	checkboxTermsRegistryEntry,
	actionAreaTermsRegistryEntry,
	textFieldGuardianRequestRegistryEntry,
	textFieldMemberInfoRegistryEntry,
	listCellAuthMethodRegistryEntry,
	sectionMessageEntryBranchRegistryEntry,
	sectionMessageJoinCompleteViewRegistryEntry,
] as const;
