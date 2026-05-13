import { defineComponentConfig } from "@pxds/pxds-spec";

export type TermsSectionProps = Record<string, never>;

export const termsSectionConfig = defineComponentConfig<TermsSectionProps>({
	id: "ogn-membership-terms-section",
	name: "MembershipTermsSection",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {},
	figma: {
		componentName: "OGN / Membership / Terms Section",
	},
});
