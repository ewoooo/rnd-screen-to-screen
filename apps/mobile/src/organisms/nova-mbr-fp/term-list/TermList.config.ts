import { defineComponentConfig } from "@pxds/cx-spec";

export type TermListProps = Record<string, never>;

export const termListConfig = defineComponentConfig<TermListProps>({
	id: "ogn-mbr-term-list",
	name: "TermList",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {},
	figma: {
		componentName: "OGN / MBR / Term List",
	},
});
