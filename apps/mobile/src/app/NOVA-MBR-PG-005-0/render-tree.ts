import { RENDER_TREE as sectionHeaderPageTree } from "../../organisms/mbr/section-header-page/render-tree";
import { RENDER_TREE as sectionMessageJoinCompleteViewTree } from "../../organisms/mbr/section-message-join-complete-view/render-tree";

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
					label: "5 / 5",
					percent: 100,
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
					title: "가입 완료",
				},
			},
			{
				component: "ogn-mbr-section-message-join-complete-view",
				render: sectionMessageJoinCompleteViewTree,
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
} as const satisfies ScreenRenderTreeDefinition;

export const RENDER_TREE = createRenderTree(meta, RENDER_TREE_DEFINITION);
