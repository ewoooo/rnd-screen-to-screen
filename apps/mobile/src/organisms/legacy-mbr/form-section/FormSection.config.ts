import type { TextFieldListField } from "@pxds/pxds-components/molecules";
import { defineComponentConfig } from "@pxds/pxds-spec";

export type FormSectionProps = {
	fields: readonly TextFieldListField[];
};

export const formSectionConfig = defineComponentConfig<FormSectionProps>({
	id: "ogn-membership-form-section",
	name: "MembershipFormSection",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {
		fields: {
			type: "object",
			editable: true,
			figmaProperty: "Fields",
		},
	},
	figma: {
		componentName: "OGN / Membership / Form Section",
	},
});
