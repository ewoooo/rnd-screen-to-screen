import { defineComponentConfig } from "@pxds/cx-spec";

export type ActionAreaTermsProps = {
	disabled?: boolean;
};

export const actionAreaTermsConfig =
	defineComponentConfig<ActionAreaTermsProps>({
		id: "ogn-mbr-action-area-terms",
		name: "ActionAreaTerms",
		layer: "organism",
		owner: "@screen/mobile",
		node: {
			kind: "component",
			selectable: true,
			exportable: true,
		},
		props: {
			disabled: {
				type: "boolean",
				editable: true,
				figmaProperty: "Disabled",
			},
		},
		figma: {
			componentName: "OGN / MBR / Action Area Terms",
		},
	});
