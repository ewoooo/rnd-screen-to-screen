import { defineRegistry } from "@pxds/pxds-spec";
import { formSectionConfig } from "./form-section";
import { heroSectionConfig } from "./hero-section";
import { noticeSectionConfig } from "./notice-section";
import { primaryActionBarConfig } from "./primary-action-bar";
import { selectableSectionConfig } from "./selectable-section";
import { summarySectionConfig } from "./summary-section";
import { termsSectionConfig } from "./terms-section";

export const membershipOrganismRegistry = defineRegistry([
	heroSectionConfig,
	noticeSectionConfig,
	formSectionConfig,
	selectableSectionConfig,
	summarySectionConfig,
	termsSectionConfig,
	primaryActionBarConfig,
] as const);
