import { defineComponentConfig } from "@pxds/cx-spec";

export type TermListState = "ready" | "loading" | "error";

export type TermListProps = {
	/** 조회 상태. ready=항목 표시, loading=skeleton(LOD_2), error=인접 안내(ERR_1) */
	state?: TermListState;
};

export const termListConfig = defineComponentConfig<TermListProps>({
	id: "ogn-mbr-term-list",
	name: "TermList",
	layer: "organism",
	owner: "@screen/mobile",
	node: {
		kind: "component",
		selectable: true,
		exportable: true,
	},
	props: {},
	figma: {
		componentName: "Legacy OGN / MBR-FP / Term List",
	},
});
