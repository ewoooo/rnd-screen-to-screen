import { defineComponentConfig } from "@pxds/pxds-spec";

export type SectionHeaderPageProps = {
	title: string;
};

export const sectionHeaderPageConfig = defineComponentConfig<SectionHeaderPageProps>({
	id: "ogn-mbr-section-header-page",
	name: "SectionHeaderPage",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {
		title: {
			type: "string",
			editable: true,
			figmaProperty: "Title",
		},
	},
	figma: {
		componentName: "OGN / MBR / Section Header Page",
	},
});
