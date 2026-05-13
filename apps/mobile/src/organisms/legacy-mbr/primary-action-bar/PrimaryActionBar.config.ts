import { defineComponentConfig } from "@pxds/pxds-spec";

export type PrimaryActionBarProps = {
	primaryLabel: string;
	secondaryLabel?: string;
	disabled?: boolean;
};

export const primaryActionBarConfig =
	defineComponentConfig<PrimaryActionBarProps>({
		id: "ogn-membership-primary-action-bar",
		name: "MembershipPrimaryActionBar",
		layer: "organism",
		owner: "@screen/mobile",
		node: {
			kind: "component",
			selectable: true,
			exportable: true,
		},
		props: {
			primaryLabel: {
				type: "string",
				editable: true,
				figmaProperty: "Primary Label",
			},
			secondaryLabel: {
				type: "string",
				editable: true,
				figmaProperty: "Secondary Label",
			},
			disabled: {
				type: "boolean",
				editable: true,
				figmaProperty: "Disabled",
			},
		},
		figma: {
			componentName: "OGN / Membership / Primary Action Bar",
		},
	});
