import {
	listCellAuthMethodRender,
	sectionHeaderPageRender,
} from "@pxds/pxds-components/mbr";

import {
	createRenderTree,
	type ScreenRenderContract,
} from "../../screens/render-contract";

const RENDER_CONTRACT = {
	schemaVersion: "screen-render-contract-v1",
	screen: {
		id: "NOVA-MBR-PG-003-0",
		name: "본인인증",
		route: "/NOVA-MBR-PG-003-0",
		type: "page",
	},
	source: {
		useCaseIds: ["UC-MBR-JOIN"],
		ognSpecIds: [
			"ogn-MBR-section-header-page",
			"ogn-MBR-list-cell-auth-method",
		],
		policyRefs: ["PG-MBR-AUTH-001"],
	},
	slots: {
		systemHeader: true,
		header: {
			component: "progress-top-bar",
			props: {
				title: "회원 가입",
				leading: "back",
				progress: {
					label: "3 / 5",
					percent: 60,
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
					title: "본인인증",
				},
			},
			{
				component: "ogn-mbr-list-cell-auth-method",
				render: listCellAuthMethodRender,
				section: {
					inset: "bleed",
					rail: "inset",
				},
				props: {
					state: "default",
					slot: "content",
				},
			},
		],
		bottom: [
			{
				component: "primary-cta-bar",
				props: {
					primaryLabel: "인증 완료",
					disabled: true,
				},
			},
		],
	},
} as const satisfies ScreenRenderContract;

export const RENDER_SPEC = createRenderTree(RENDER_CONTRACT);
