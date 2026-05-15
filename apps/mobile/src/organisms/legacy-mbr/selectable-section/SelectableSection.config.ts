import type { SelectableItem } from "@pxds/pxds-components/molecules";
import { defineComponentConfig } from "@pxds/pxds-spec";

export type SelectableSectionProps = {
	name: string;
	items: readonly SelectableItem[];
	value?: string;
	selectionMode?: "single" | "multi";
	selectedIds?: readonly string[];
};

export const selectableSectionConfig =
	defineComponentConfig<SelectableSectionProps>({
		id: "ogn-membership-selectable-section",
		name: "MembershipSelectableSection",
		layer: "organism",
		owner: "@screen/mobile",
		node: {
			kind: "component",
			selectable: true,
			exportable: true,
		},
		props: {
			name: {
				type: "string",
				editable: true,
				figmaProperty: "Name",
			},
			items: {
				type: "object",
				editable: true,
				figmaProperty: "Items",
			},
			value: {
				type: "string",
				editable: true,
				figmaProperty: "Value",
			},
			selectionMode: {
				type: "enum",
				editable: true,
				options: ["single", "multi"],
				figmaProperty: "Selection Mode",
			},
			selectedIds: {
				type: "object",
				editable: true,
				figmaProperty: "Selected IDs",
			},
		},
		figma: {
			componentName: "OGN / Membership / Selectable Section",
		},
	});
