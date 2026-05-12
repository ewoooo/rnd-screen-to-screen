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
				title: "회원 탈퇴",
				leading: "back",
				progress: {
					label: "회원 탈퇴 3/6",
					percent: 50,
					showLabel: true,
				},
			},
		},
		content: [
			{
				component: "ogn-membership-hero-section",
				render: heroSectionTree,
				props: {
					titleLines: ["탈퇴하면 아래 정보가", "사라지거나 제한돼요"],
					description:
						"탈퇴 후에는 같은 식별정보로 30일간 재가입이 제한될 수 있어요.",
				},
			},
			{
				component: "ogn-membership-summary-section",
				render: summarySectionTree,
				props: {
					label: "사라지거나 정리되는 항목",
					title: "이 정보가 영향을 받아요",
					items: [
						{
							id: "points",
							title: "T 멤버십 포인트",
							sub: "잔여 12,420P",
							trailingLabel: "소멸",
						},
						{
							id: "coupons",
							title: "발급 쿠폰 6개",
							sub: "사용 기한 내 소멸",
							trailingLabel: "소멸",
						},
						{
							id: "auto-pay",
							title: "자동 결제 2건",
							sub: "구독 즉시 해지",
							trailingLabel: "해지",
						},
						{
							id: "cert",
							title: "본인인증 이력",
							sub: "법정 보관 기간 후 파기",
							trailingLabel: "보관",
						},
					],
				},
			},
			{
				component: "ogn-membership-notice-section",
				render: noticeSectionTree,
				props: {
					badge: "미납 확인",
					text: "현재 미납 요금 8,900원이 확인됐어요. 미납 정산 후 탈퇴를 진행할 수 있어요.",
				},
			},
		],
		bottom: [
			{
				component: "primary-cta-bar",
				props: {
					primaryLabel: "다음으로",
					disabled: true,
				},
			},
		],
	},
} as const satisfies ScreenRenderTreeDefinition;

export const RENDER_TREE = createRenderTree(meta, definition);
