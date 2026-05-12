import {
	sectionHeaderPageRender,
	sectionMessageJoinCompleteViewRender,
} from "@pxds/pxds-components/mbr";

import {
	createRenderTree,
	type ScreenRenderContract,
} from "../../screens/render-contract";

const RENDER_CONTRACT = {
	schemaVersion: "screen-render-contract-v1",
	screen: {
		id: "NOVA-MBR-PG-005-0",
		name: "가입 완료",
		route: "/NOVA-MBR-PG-005-0",
		type: "page",
	},
	source: {
		useCaseIds: ["UC-MBR-JOIN"],
		ognSpecIds: [
			"ogn-MBR-section-header-page",
			"ogn-MBR-section-message-join-complete-view",
		],
		policyRefs: ["PG-MBR-COMPLETE-001"],
	},
	slots: {
		systemHeader: true,
		header: {
			component: "progress-top-bar",
			props: {
				title: "회원 가입",
				leading: "back",
				progress: {
					label: "5 / 5",
					percent: 100,
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
					title: "가입 완료",
				},
			},
			{
				component: "ogn-mbr-section-message-join-complete-view",
				render: sectionMessageJoinCompleteViewRender,
				section: { inset: "inherit" },
				props: {
					slot: "content",
				},
			},
		],
		bottom: [
			{
				component: "primary-cta-bar",
				props: {
					primaryLabel: "홈으로 이동",
				},
			},
		],
	},
} as const satisfies ScreenRenderContract;

export const RENDER_SPEC = createRenderTree(RENDER_CONTRACT);
