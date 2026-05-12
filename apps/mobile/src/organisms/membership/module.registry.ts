import type {
	OrganismRegistryEntry,
	OrganismRegistryMeta,
} from "../../type/organism-registry";
import type { ComponentRenderTree } from "@pxds/pxds-components/schema";
import type { OrganismDomainModuleId } from "../../type/organism-domain";

import formSectionMeta from "./form-section/meta.json";
import { RENDER_TREE as formSectionTree } from "./form-section/render-tree";
import heroSectionMeta from "./hero-section/meta.json";
import { RENDER_TREE as heroSectionTree } from "./hero-section/render-tree";
import noticeSectionMeta from "./notice-section/meta.json";
import { RENDER_TREE as noticeSectionTree } from "./notice-section/render-tree";
import selectableSectionMeta from "./selectable-section/meta.json";
import { RENDER_TREE as selectableSectionTree } from "./selectable-section/render-tree";
import summarySectionMeta from "./summary-section/meta.json";
import { RENDER_TREE as summarySectionTree } from "./summary-section/render-tree";

const ORGANISM_DOMAIN = "mbr" satisfies OrganismDomainModuleId;

function createMembershipRegistryEntry(
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

export const membershipRegistryEntries = [
	createMembershipRegistryEntry(
		heroSectionMeta as OrganismRegistryMeta,
		() => heroSectionTree,
	),
	createMembershipRegistryEntry(
		noticeSectionMeta as OrganismRegistryMeta,
		() => noticeSectionTree,
	),
	createMembershipRegistryEntry(
		summarySectionMeta as OrganismRegistryMeta,
		() => summarySectionTree,
	),
	createMembershipRegistryEntry(
		formSectionMeta as OrganismRegistryMeta,
		() => formSectionTree,
	),
	createMembershipRegistryEntry(
		selectableSectionMeta as OrganismRegistryMeta,
		() => selectableSectionTree,
	),
] as const satisfies readonly OrganismRegistryEntry[];
