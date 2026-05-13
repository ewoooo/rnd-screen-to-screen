import { defineComponentConfig } from "@pxds/pxds-spec";

export type TextFieldGuardianRequestProps = {
	visible?: boolean;
};

export const textFieldGuardianRequestConfig =
	defineComponentConfig<TextFieldGuardianRequestProps>({
		id: "ogn-mbr-text-field-guardian-request",
		name: "TextFieldGuardianRequest",
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
			componentName: "OGN / MBR / Text Field Guardian Request",
		},
	});
