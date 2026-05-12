import { RENDER_TREE as actionAreaTermsTree } from "../../organisms/mbr/action-area-terms/render-tree";
import { RENDER_TREE as checkboxTermsTree } from "../../organisms/mbr/checkbox-terms/render-tree";
import { RENDER_TREE as sectionHeaderPageTree } from "../../organisms/mbr/section-header-page/render-tree";
import { RENDER_TREE as textFieldGuardianRequestTree } from "../../organisms/mbr/text-field-guardian-request/render-tree";

import meta from "./meta.json";
import {
	createRenderTree,
	type ScreenRenderTreeDefinition,
} from "../../scripts/compile/render-tree";

const RENDER_TREE_DEFINITION = {
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
				render: sectionHeaderPageTree,
				section: { inset: "inherit" },
				props: {
					title: "약관 동의",
				},
			},
			{
				component: "ogn-mbr-checkbox-terms",
				render: checkboxTermsTree,
				section: { inset: "inherit" },
			},
			{
				component: "ogn-mbr-text-field-guardian-request",
				render: textFieldGuardianRequestTree,
				section: { inset: "inherit" },
				props: {
					visible: false,
				},
			},
		],
		bottom: [
			{
				component: "ogn-mbr-action-area-terms",
				render: actionAreaTermsTree,
				props: {
					disabled: true,
				},
			},
		],
	},
} as const satisfies ScreenRenderTreeDefinition;

export const RENDER_TREE = createRenderTree(meta, RENDER_TREE_DEFINITION);
