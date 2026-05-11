import { defineOgnSpec } from "../../../ogn-spec";

export const sectionHeaderPageSpec = defineOgnSpec({
	id: "ogn-MBR-section-header-page",
	module: "MBR",
	composedOfRegistryId: "ogn-mbr-section-header-page",
	states: ["default"],
	serverControl: ["텍스트 내용"],
	policyRefs: [],
	parts: [
		{
			id: "section-header-title",
			component: "wds-typography",
			variant: "displayTitle",
			note: "서버 제어: 텍스트 내용",
		},
	],
	snapshots: {
		default: { visibleParts: ["section-header-title"] },
	},
	copyStatus: {
		status: "authored",
		author: "wooseong",
		updatedAt: "2026-05-11",
	},
});
