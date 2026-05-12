import {
	actionAreaTermsRender,
	checkboxTermsRender,
	sectionHeaderPageRender,
	textFieldGuardianRequestRender,
} from "@pxds/pxds-components/mbr";

import {
	collectScreenRenderContracts,
	createRenderScreenSpec,
	defineScreenRenderContract,
} from "../../screens/render-contract";

export const novaMbrPg0010RenderContract = defineScreenRenderContract({
	schemaVersion: "screen-render-contract-v1",
	screen: {
		id: "NOVA-MBR-PG-001-0",
		name: "약관 동의",
		route: "/NOVA-MBR-PG-001-0",
		type: "page",
	},
	source: {
		useCaseIds: ["UC-MBR-JOIN"],
		ognSpecIds: [
			"ogn-MBR-section-header-page",
			"ogn-MBR-checkbox-terms",
			"ogn-MBR-text-field-guardian-request",
			"ogn-MBR-action-area-terms",
		],
		policyRefs: ["PG-MBR-TERM-001", "PG-MBR-TERM-002"],
	},
	slots: {
		systemHeader: true,
		header: {
			component: "progress-top-bar",
			props: {
				title: "회원 가입",
				leading: "back",
				progress: {
					label: "1 / 5",
					percent: 20,
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
					title: "약관 동의",
				},
			},
			{
				component: "ogn-mbr-checkbox-terms",
				render: checkboxTermsRender,
				section: { inset: "inherit" },
			},
			{
				component: "ogn-mbr-text-field-guardian-request",
				render: textFieldGuardianRequestRender,
				section: { inset: "inherit" },
				props: {
					visible: false,
				},
			},
		],
		bottom: [
			{
				component: "ogn-mbr-action-area-terms",
				render: actionAreaTermsRender,
				props: {
					disabled: true,
				},
			},
		],
	},
} as const);

export const novaMbrPg0010ComponentRenderContracts =
	collectScreenRenderContracts(novaMbrPg0010RenderContract);

export const novaMbrPg0010RenderSpec = createRenderScreenSpec(
	novaMbrPg0010RenderContract,
);
