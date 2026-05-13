import { defineComponentConfig } from "@pxds/pxds-spec";

export type TextFieldMemberInfoProps = Record<string, never>;

export const textFieldMemberInfoConfig =
	defineComponentConfig<TextFieldMemberInfoProps>({
		id: "ogn-mbr-text-field-member-info",
		name: "TextFieldMemberInfo",
		layer: "organism",
		owner: "@screen/mobile",
		node: {
			kind: "component",
			selectable: true,
			exportable: true,
		},
		props: {},
		figma: {
			componentName: "OGN / MBR / Text Field Member Info",
		},
	});
