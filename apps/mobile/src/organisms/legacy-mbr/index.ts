import { defineRegistry } from "@pxds/pxds-spec";
import { formSectionConfig } from "./form-section";
import { heroSectionConfig } from "./hero-section";
import { noticeSectionConfig } from "./notice-section";
import { primaryActionBarConfig } from "./primary-action-bar";
import { selectableSectionConfig } from "./selectable-section";
import { summarySectionConfig } from "./summary-section";
import { termsSectionConfig } from "./terms-section";

export { MembershipFormSection } from "./form-section";
export { MembershipHeroSection } from "./hero-section";
export { MembershipNoticeSection } from "./notice-section";
export { MembershipPrimaryActionBar } from "./primary-action-bar";
export { MembershipSelectableSection } from "./selectable-section";
export { MembershipSummarySection } from "./summary-section";
export { MembershipTermsSection } from "./terms-section";

export const legacyMbrOrganismRegistry = defineRegistry([
	heroSectionConfig,
	noticeSectionConfig,
	formSectionConfig,
	selectableSectionConfig,
	summarySectionConfig,
	termsSectionConfig,
	primaryActionBarConfig,
] as const);
