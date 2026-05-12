import {
	sectionHeaderPageRender,
	sectionMessageEntryBranchRender,
	textFieldMemberInfoRender,
} from "@pxds/pxds-components/mbr";

import {
	createRenderTree,
	type ScreenRenderContract,
} from "../../screens/render-contract";

const RENDER_CONTRACT = {
	schemaVersion: "screen-render-contract-v1",
	screen: {
		id: "NOVA-MBR-PG-002-0",
		name: "개인정보 입력",
		route: "/NOVA-MBR-PG-002-0",
		type: "page",
	},
	source: {
		useCaseIds: ["UC-MBR-JOIN"],
		ognSpecIds: [
			"ogn-MBR-section-header-page",
			"ogn-MBR-text-field-member-info",
			"ogn-MBR-section-message-entry-branch",
		],
		policyRefs: ["PG-MBR-INFO-001", "PG-MBR-INFO-002"],
	},
	slots: {
		systemHeader: true,
		header: {
			component: "progress-top-bar",
			props: {
				title: "회원 가입",
				leading: "back",
				progress: {
					label: "2 / 5",
					percent: 40,
					showLabel: true,
				},
			},
		},
		content: [
			{
				component: "ogn-mbr-section-header-page",
				render: sectionHeaderPageRender,
				section: { inset: "inherit" },
				props: {
					title: "개인정보 입력",
				},
			},
			{
				component: "ogn-mbr-text-field-member-info",
				render: textFieldMemberInfoRender,
				section: { inset: "inherit" },
				props: {
					state: "default",
				},
			},
			{
				component: "ogn-mbr-section-message-entry-branch",
				render: sectionMessageEntryBranchRender,
				section: { inset: "inherit" },
				props: {
					visible: false,
				},
			},
		],
		bottom: false,
	},
} as const satisfies ScreenRenderContract;

export const RENDER_SPEC = createRenderTree(RENDER_CONTRACT);
