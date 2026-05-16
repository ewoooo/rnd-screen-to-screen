import { defineComponentConfig } from "@pxds/cx-spec";

export type ListCellAuthMethodProps = Record<string, never>;

export const listCellAuthMethodConfig =
	defineComponentConfig<ListCellAuthMethodProps>({
		id: "ogn-mbr-list-cell-auth-method",
		name: "ListCellAuthMethod",
		layer: "organism",
		owner: "@screen/mobile",
		node: {
			kind: "component",
			selectable: true,
			exportable: true,
		},
		props: {},
		figma: {
			componentName: "OGN / MBR / List Cell Auth Method",
		},
	});
