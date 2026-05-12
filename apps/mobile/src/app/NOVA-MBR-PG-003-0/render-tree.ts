import { RENDER_TREE as listCellAuthMethodTree } from "../../organisms/mbr/list-cell-auth-method/render-tree";
import { RENDER_TREE as sectionHeaderPageTree } from "../../organisms/mbr/section-header-page/render-tree";

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
					label: "3 / 5",
					percent: 60,
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
					title: "본인인증",
				},
			},
			{
				component: "ogn-mbr-list-cell-auth-method",
				render: listCellAuthMethodTree,
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
} as const satisfies ScreenRenderTreeDefinition;

export const RENDER_TREE = createRenderTree(meta, RENDER_TREE_DEFINITION);
