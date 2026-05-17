import { defineComponentConfig } from "@pxds/cx-spec";

export type GuardianInputProps = {
	visible?: boolean;
};

export const guardianInputConfig = defineComponentConfig<GuardianInputProps>({
	id: "ogn-mbr-guardian-input",
	name: "GuardianInput",
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
		componentName: "OGN / MBR / Guardian Input",
	},
});
