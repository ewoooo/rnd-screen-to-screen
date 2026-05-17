import { defineComponentConfig } from "@pxds/cx-spec";

export type MemberInputProps = Record<string, never>;

export const memberInputConfig = defineComponentConfig<MemberInputProps>({
	id: "ogn-mbr-member-input",
	name: "MemberInput",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {},
	figma: {
		componentName: "OGN / MBR / Member Input",
	},
});
