import { defineComponentConfig } from "@pxds/pxds-spec";

export type CheckboxTermsProps = Record<string, never>;

export const checkboxTermsConfig = defineComponentConfig<CheckboxTermsProps>({
	id: "ogn-mbr-checkbox-terms",
	name: "CheckboxTerms",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {},
	figma: {
		componentName: "OGN / MBR / Checkbox Terms",
	},
});
