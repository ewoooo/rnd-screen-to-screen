import { defineComponentConfig } from "@pxds/pxds-spec";

export type NoticeSectionProps = {
	badge: string;
	text: string;
	action?: string;
	tone?: "info" | "warning" | "critical";
};

export const noticeSectionConfig = defineComponentConfig<NoticeSectionProps>({
	id: "ogn-membership-notice-section",
	name: "MembershipNoticeSection",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {
		badge: {
			type: "string",
			editable: true,
			figmaProperty: "Badge",
		},
		text: {
			type: "string",
			editable: true,
			figmaProperty: "Text",
		},
		action: {
			type: "string",
			editable: true,
			figmaProperty: "Action",
		},
		tone: {
			type: "enum",
			editable: true,
			options: ["info", "warning", "critical"],
			figmaProperty: "Tone",
		},
	},
	figma: {
		componentName: "OGN / Membership / Notice Section",
	},
});
