import { defineComponentConfig } from "@pxds/cx-spec";

export type JoinCompleteResultProps = Record<string, never>;

export const joinCompleteResultConfig =
	defineComponentConfig<JoinCompleteResultProps>({
		id: "ogn-mbr-join-complete-result",
		name: "JoinCompleteResult",
		layer: "organism",
		owner: "@screen/mobile",
		node: {
			kind: "component",
			selectable: true,
			exportable: true,
		},
		props: {},
		figma: {
			componentName: "OGN / MBR / Join Complete Result",
		},
	});
