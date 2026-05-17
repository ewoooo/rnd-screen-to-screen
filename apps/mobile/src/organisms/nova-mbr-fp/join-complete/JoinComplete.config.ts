import { defineComponentConfig } from "@pxds/cx-spec";

export type JoinCompleteProps = Record<string, never>;

export const joinCompleteConfig = defineComponentConfig<JoinCompleteProps>({
	id: "ogn-mbr-join-complete",
	name: "JoinComplete",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {},
	figma: {
		componentName: "OGN / MBR / Join Complete",
	},
});
