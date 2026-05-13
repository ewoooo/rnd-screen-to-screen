import { defineComponentConfig } from "@pxds/pxds-spec";
import type { FlowSummaryItem } from "@pxds/pxds-components/shared/global";

export type SummarySectionProps = {
	label: string;
	title: string;
	items: readonly FlowSummaryItem[];
};

export const summarySectionConfig = defineComponentConfig<SummarySectionProps>({
	id: "ogn-membership-summary-section",
	name: "MembershipSummarySection",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {
		label: {
			type: "string",
			editable: true,
			figmaProperty: "Label",
		},
		title: {
			type: "string",
			editable: true,
			figmaProperty: "Title",
		},
		items: {
			type: "object",
			editable: true,
			figmaProperty: "Items",
		},
	},
	figma: {
		componentName: "OGN / Membership / Summary Section",
	},
});
