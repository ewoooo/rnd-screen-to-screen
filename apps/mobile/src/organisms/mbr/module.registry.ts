import type {
	OrganismRegistryEntry,
	OrganismRegistryMeta,
} from "../../type/organism-registry";
import type { ComponentRenderTree } from "@pxds/pxds-components/schema";
import type { OrganismDomainModuleId } from "../../type/organism-domain";

import actionAreaTermsMeta from "./action-area-terms/meta.json";
import { RENDER_TREE as actionAreaTermsTree } from "./action-area-terms/render-tree";
import checkboxTermsMeta from "./checkbox-terms/meta.json";
import { RENDER_TREE as checkboxTermsTree } from "./checkbox-terms/render-tree";
import listCellAuthMethodMeta from "./list-cell-auth-method/meta.json";
import { RENDER_TREE as listCellAuthMethodTree } from "./list-cell-auth-method/render-tree";
import sectionHeaderPageMeta from "./section-header-page/meta.json";
import { RENDER_TREE as sectionHeaderPageTree } from "./section-header-page/render-tree";
import sectionMessageEntryBranchMeta from "./section-message-entry-branch/meta.json";
import { RENDER_TREE as sectionMessageEntryBranchTree } from "./section-message-entry-branch/render-tree";
import sectionMessageJoinCompleteViewMeta from "./section-message-join-complete-view/meta.json";
import { RENDER_TREE as sectionMessageJoinCompleteViewTree } from "./section-message-join-complete-view/render-tree";
import textFieldGuardianRequestMeta from "./text-field-guardian-request/meta.json";
import { RENDER_TREE as textFieldGuardianRequestTree } from "./text-field-guardian-request/render-tree";
import textFieldMemberInfoMeta from "./text-field-member-info/meta.json";
import { RENDER_TREE as textFieldMemberInfoTree } from "./text-field-member-info/render-tree";

const ORGANISM_DOMAIN = "mbr" satisfies OrganismDomainModuleId;

function createMbrRegistryEntry(
	meta: OrganismRegistryMeta,
	render: () => ComponentRenderTree,
): OrganismRegistryEntry {
	return {
		...meta,
		layer: "organism",
		owner: "@screen/mobile",
		group: ORGANISM_DOMAIN,
		render,
	};
}

export const mbrRegistryEntries = [
	createMbrRegistryEntry(
		sectionHeaderPageMeta as OrganismRegistryMeta,
		() => sectionHeaderPageTree,
	),
	createMbrRegistryEntry(
		checkboxTermsMeta as OrganismRegistryMeta,
		() => checkboxTermsTree,
	),
	createMbrRegistryEntry(
		actionAreaTermsMeta as OrganismRegistryMeta,
		() => actionAreaTermsTree,
	),
	createMbrRegistryEntry(
		textFieldGuardianRequestMeta as OrganismRegistryMeta,
		() => textFieldGuardianRequestTree,
	),
	createMbrRegistryEntry(
		textFieldMemberInfoMeta as OrganismRegistryMeta,
		() => textFieldMemberInfoTree,
	),
	createMbrRegistryEntry(
		listCellAuthMethodMeta as OrganismRegistryMeta,
		() => listCellAuthMethodTree,
	),
	createMbrRegistryEntry(
		sectionMessageEntryBranchMeta as OrganismRegistryMeta,
		() => sectionMessageEntryBranchTree,
	),
	createMbrRegistryEntry(
		sectionMessageJoinCompleteViewMeta as OrganismRegistryMeta,
		() => sectionMessageJoinCompleteViewTree,
	),
] as const satisfies readonly OrganismRegistryEntry[];
