import {
	createRenderTree,
	type ScreenRenderTreeDefinition,
} from "../../scripts/compile/render-tree";
import { RENDER_TREE as heroSectionTree } from "../../organisms/membership/hero-section/render-tree";
import { RENDER_TREE as noticeSectionTree } from "../../organisms/membership/notice-section/render-tree";
import meta from "./meta.json";

const definition = {
	slots: {
		systemHeader: true,
		header: {
			component: "progress-top-bar",
			props: {
				title: "회원 가입",
				leading: "back",
				progress: {
					label: "회원 가입 1/5",
					percent: 20,
					showLabel: true,
				},
			},
		},
		content: [
			{
				component: "ogn-membership-hero-section",
				render: heroSectionTree,
				props: {
					titleLines: ["약관에 동의하고", "가입을 시작하세요"],
					description:
						"필수 약관에 동의하면 다음 단계로 진행할 수 있어요. 선택 약관은 나중에 변경할 수 있습니다.",
				},
			},
			{
				component: "content-section",
				section: { inset: "inherit" },
				children: [
					{
						component: "text-block",
						props: {
							variant: "sectionTitle",
							text: "필수 약관",
						},
					},
					{
						component: "consent-list",
						props: {
							allLabel: "전체 동의",
							allCaption: "선택 약관까지 한 번에 동의",
							items: [
								{
									id: "service",
									title: "T 우주 서비스 이용약관",
									caption: "v3.2",
									required: true,
									defaultChecked: true,
								},
								{
									id: "privacy",
									title: "개인정보 수집 및 이용 동의",
									caption: "v5.1",
									required: true,
									defaultChecked: true,
								},
								{
									id: "marketing",
									title: "혜택·이벤트 정보 수신 동의",
									caption: "동의하지 않아도 가입 가능",
									required: false,
									defaultChecked: false,
								},
							],
						},
					},
				],
			},
			{
				component: "ogn-membership-notice-section",
				render: noticeSectionTree,
				props: {
					badge: "안내",
					text: "만 14세 미만 고객은 법정대리인 동의 요청이 함께 진행됩니다.",
				},
			},
		],
		bottom: [
			{
				component: "primary-cta-bar",
				props: {
					primaryLabel: "동의하고 계속하기",
				},
			},
		],
	},
} as const satisfies ScreenRenderTreeDefinition;

export const RENDER_TREE = createRenderTree(meta, definition);
