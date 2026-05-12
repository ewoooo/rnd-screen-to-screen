import { RENDER_TREE as sectionHeaderPageTree } from "../../organisms/mbr/section-header-page/render-tree";
import { RENDER_TREE as sectionMessageEntryBranchTree } from "../../organisms/mbr/section-message-entry-branch/render-tree";
import { RENDER_TREE as textFieldMemberInfoTree } from "../../organisms/mbr/text-field-member-info/render-tree";

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
					label: "2 / 5",
					percent: 40,
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
					title: "개인정보 입력",
				},
			},
			{
				component: "ogn-mbr-text-field-member-info",
				render: textFieldMemberInfoTree,
				section: { inset: "inherit" },
				props: {
					state: "default",
				},
			},
			{
				component: "ogn-mbr-section-message-entry-branch",
				render: sectionMessageEntryBranchTree,
				section: { inset: "inherit" },
				props: {
					visible: false,
				},
			},
		],
		bottom: false,
	},
} as const satisfies ScreenRenderTreeDefinition;

export const RENDER_TREE = createRenderTree(meta, RENDER_TREE_DEFINITION);
