import { defineComponentConfig } from "@pxds/cx-spec";

export type SectionMessageJoinCompleteViewProps = Record<string, never>;

export const sectionMessageJoinCompleteViewConfig =
	defineComponentConfig<SectionMessageJoinCompleteViewProps>({
		id: "ogn-mbr-section-message-join-complete-view",
		name: "SectionMessageJoinCompleteView",
		layer: "organism",
		owner: "@screen/mobile",
		node: {
			kind: "component",
			selectable: true,
			exportable: true,
		},
		props: {},
		figma: {
			componentName: "OGN / MBR / Section Message Join Complete View",
		},
	});
