import { defineComponentConfig } from "@pxds/cx-spec";

export type TermAgreeProps = Record<string, never>;

export const termAgreeConfig = defineComponentConfig<TermAgreeProps>({
	id: "ogn-mbr-term-agree",
	name: "TermAgree",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {},
	figma: {
		componentName: "OGN / MBR / Term Agree",
	},
});
