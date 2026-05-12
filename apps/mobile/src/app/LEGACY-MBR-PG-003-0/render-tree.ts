import {
	createRenderTree,
	type ScreenRenderTreeDefinition,
} from "../../scripts/compile/render-tree";
import { RENDER_TREE as heroSectionTree } from "../../organisms/membership/hero-section/render-tree";
import { RENDER_TREE as noticeSectionTree } from "../../organisms/membership/notice-section/render-tree";
import { RENDER_TREE as summarySectionTree } from "../../organisms/membership/summary-section/render-tree";
import meta from "./meta.json";

const definition = {
	slots: {
		systemHeader: true,
		header: {
			component: "progress-top-bar",
			props: {
				title: "탈퇴 완료",
				leading: "close",
				progress: {
					label: "회원 탈퇴 6/6",
					percent: 100,
					showLabel: true,
				},
			},
		},
		content: [
			{
				component: "ogn-membership-hero-section",
				render: heroSectionTree,
				props: {
					titleLines: ["탈퇴 처리가", "완료되었습니다"],
					description:
						"30일 이내에 다시 가입하시면 일부 정보를 복원할 수 있어요. 그 이후엔 모두 파기됩니다.",
				},
			},
			{
				component: "ogn-membership-summary-section",
				render: summarySectionTree,
				props: {
					label: "처리 정보",
					title: "이 내용으로 처리됐어요",
					items: [
						{
							id: "leave-at",
							title: "탈퇴 처리 시각",
							sub: "2026년 4월 30일 (수) 19:24",
						},
						{
							id: "grace",
							title: "철회 가능 기간",
							sub: "5월 30일까지 (30일 유예)",
							trailingLabel: "철회 가능",
						},
						{
							id: "purge",
							title: "개인정보 파기",
							sub: "유예 종료 시 자동 파기",
						},
					],
				},
			},
			{
				component: "ogn-membership-notice-section",
				render: noticeSectionTree,
				props: {
					badge: "철회 안내",
					text: "유예 기간 내 철회를 원하시면 탈퇴 시 사용한 본인인증으로 마이페이지에서 진행할 수 있어요.",
				},
			},
		],
		bottom: [
			{
				component: "primary-cta-bar",
				props: {
					primaryLabel: "홈으로 가기",
					secondaryLabel: "철회하기",
				},
			},
		],
	},
} as const satisfies ScreenRenderTreeDefinition;

export const RENDER_TREE = createRenderTree(meta, definition);
