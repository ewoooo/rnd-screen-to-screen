import { defineComponentConfig } from "@pxds/cx-spec";
import type { JoinCompleteProps } from "./JoinComplete";

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
		componentName: "Legacy OGN / MBR-FP / Join Complete",
	},
});
