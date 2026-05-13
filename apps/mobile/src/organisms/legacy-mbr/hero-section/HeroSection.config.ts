import { defineComponentConfig } from "@pxds/pxds-spec";

export type HeroSectionProps = {
	titleLines: readonly string[];
	description: string;
};

export const heroSectionConfig = defineComponentConfig<HeroSectionProps>({
	id: "ogn-membership-hero-section",
	name: "MembershipHeroSection",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {
		titleLines: {
			type: "object",
			editable: true,
			figmaProperty: "Title Lines",
		},
		description: {
			type: "string",
			editable: true,
			figmaProperty: "Description",
		},
	},
	figma: {
		componentName: "OGN / Membership / Hero Section",
	},
});
