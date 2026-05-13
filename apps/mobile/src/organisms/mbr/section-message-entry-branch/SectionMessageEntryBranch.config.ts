import { defineComponentConfig } from "@pxds/pxds-spec";

export type SectionMessageEntryBranchProps = {
	visible?: boolean;
};

export const sectionMessageEntryBranchConfig =
	defineComponentConfig<SectionMessageEntryBranchProps>({
		id: "ogn-mbr-section-message-entry-branch",
		name: "SectionMessageEntryBranch",
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
			componentName: "OGN / MBR / Section Message Entry Branch",
		},
	});
