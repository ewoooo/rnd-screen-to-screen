import { defineComponentConfig } from "@pxds/cx-spec";

export type GuardianResultProps = {
	visible?: boolean;
	expired?: boolean;
};

export const guardianResultConfig = defineComponentConfig<GuardianResultProps>({
	id: "ogn-mbr-guardian-result",
	name: "GuardianResult",
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
		expired: {
			type: "boolean",
			editable: true,
			figmaProperty: "Expired",
		},
	},
	figma: {
		componentName: "OGN / MBR / Guardian Result",
	},
});
