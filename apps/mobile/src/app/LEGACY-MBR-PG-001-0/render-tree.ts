import {
	createRenderTree,
	type ScreenRenderTreeDefinition,
} from "../../scripts/compile/render-tree";
import { RENDER_TREE as heroSectionTree } from "../../organisms/membership/hero-section/render-tree";
import { RENDER_TREE as noticeSectionTree } from "../../organisms/membership/notice-section/render-tree";
import { RENDER_TREE as selectableSectionTree } from "../../organisms/membership/selectable-section/render-tree";
import meta from "./meta.json";

const definition = {
	slots: {
		systemHeader: true,
		header: {
			component: "progress-top-bar",
			props: {
				title: "본인인증",
				leading: "back",
				progress: {
					label: "회원 가입 3/5",
					percent: 60,
					showLabel: true,
				},
			},
		},
		content: [
			{
				component: "ogn-membership-hero-section",
				render: heroSectionTree,
				props: {
					titleLines: ["본인 확인을 위해", "인증 수단을 선택해주세요"],
					description: "한 번 인증하면 같은 단말에서 30일간 재인증이 면제돼요.",
				},
			},
			{
				component: "ogn-membership-selectable-section",
				render: selectableSectionTree,
				props: {
					name: "identity-method",
					value: "kakao",
					items: [
						{
							id: "kakao",
							title: "카카오톡",
							sub: "가장 빠르고 간편하게 인증할 수 있어요",
							trailingLabel: "추천",
						},
						{
							id: "pass",
							title: "통신사 PASS",
							sub: "통신 3사 명의 휴대전화로 인증",
						},
						{
							id: "sms",
							title: "휴대전화 문자",
							sub: "문자로 받은 인증번호 입력",
						},
						{
							id: "ipin",
							title: "아이핀(IPIN)",
							sub: "주민번호 대체 인증 수단",
						},
					],
				},
			},
			{
				component: "ogn-membership-notice-section",
				render: noticeSectionTree,
				props: {
					badge: "정책",
					text: "인증 5회 연속 실패 시 30분간 인증이 제한돼요. 인증기관 별 추가 약관에 동의가 필요할 수 있어요.",
				},
			},
		],
		bottom: [
			{
				component: "primary-cta-bar",
				props: {
					primaryLabel: "인증하기",
				},
			},
		],
	},
} as const satisfies ScreenRenderTreeDefinition;

export const RENDER_TREE = createRenderTree(meta, definition);
