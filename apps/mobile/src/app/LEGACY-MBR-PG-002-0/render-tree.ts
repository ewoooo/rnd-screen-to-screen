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
				title: "가입 완료",
				leading: "back",
				progress: {
					label: "회원 가입 5/5",
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
					titleLines: ["환영합니다,", "우주에 오신 걸"],
					description:
						"가입이 완료되었어요. 자동 로그인 상태이며, 첫 화면부터 모든 서비스를 이용할 수 있어요.",
				},
			},
			{
				component: "ogn-membership-summary-section",
				render: summarySectionTree,
				props: {
					label: "가입 정보",
					title: "이 정보로 가입이 완료됐어요",
					items: [
						{
							id: "id",
							title: "회원 ID",
							sub: "wooseong****",
							trailingLabel: "본인",
						},
						{
							id: "joined-at",
							title: "가입일",
							sub: "2026년 4월 30일 (수)",
						},
						{
							id: "session",
							title: "자동 로그인",
							sub: "이 기기에서 30일 유지",
							trailingLabel: "활성",
						},
					],
				},
			},
			{
				component: "ogn-membership-notice-section",
				render: noticeSectionTree,
				props: {
					badge: "혜택",
					text: "신규 가입 첫 달 멤버십 무료 혜택이 자동 적용되었어요. 사용 내역은 내정보에서 확인할 수 있어요.",
				},
			},
		],
		bottom: [
			{
				component: "primary-cta-bar",
				props: {
					primaryLabel: "홈으로 가기",
					secondaryLabel: "내정보 확인",
				},
			},
		],
	},
} as const satisfies ScreenRenderTreeDefinition;

export const RENDER_TREE = createRenderTree(meta, definition);
