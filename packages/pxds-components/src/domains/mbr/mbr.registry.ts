import { sectionHeaderPageRegistryEntry } from "./section-header-page/registry";
import { sectionMessageEntryBranchRegistryEntry } from "./section-message-entry-branch/registry";
import { textFieldMemberInfoRegistryEntry } from "./text-field-member-info/registry";

export const mbrRegistryEntries = [
	sectionHeaderPageRegistryEntry,
	textFieldMemberInfoRegistryEntry,
	sectionMessageEntryBranchRegistryEntry,
] as const;
