import { defineComponentConfig } from "@pxds/cx-spec";

export type EntryCheckProps = {
	visible?: boolean;
};

export const entryCheckConfig = defineComponentConfig<EntryCheckProps>({
	id: "ogn-mbr-entry-check",
	name: "EntryCheck",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {
		visible: {
			type: "boolean",
			editable: true,
			figmaProperty: "Visible",
		},
	},
	figma: {
		componentName: "OGN / MBR / Entry Check",
	},
});
