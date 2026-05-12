import { defineComponentRender } from "../../../schema";

export const sectionMessageJoinCompleteViewRender = defineComponentRender({
	$schema: "pxds-render-contract-v1",
	componentId: "ogn-mbr-section-message-join-complete-view",
	layer: "organism",
	mode: "render-tree",
	layout: {
		slot: "content",
		section: { inset: "default", rail: "inset" },
		stack: { direction: "vertical", gap: "{spacing.16}" },
		sizing: { width: "fill", height: "hug" },
	},
	props: {
		slot: {
			type: "enum",
			values: ["content", "bottom"],
			defaultValue: "content",
		},
	},
	children: [
		{
			id: "section-message-complete",
			component: "wds-section-message",
			variant: "positive",
			props: {
				title: "가입이 완료되었습니다",
				description:
					"가입이 정상 처리되었습니다. 일반 회원으로 자동 로그인됩니다.",
			},
		},
		{
			id: "follow-up-guide-title",
			component: "text-block",
			variant: "bodySubtle",
			props: { text: "가입 후 이용 안내" },
		},
		{
			id: "follow-up-guide-session",
			component: "text-block",
			variant: "caption",
			props: { text: "· 세션 유효시간 24시간" },
		},
		{
			id: "follow-up-guide-action",
			component: "text-block",
			variant: "caption",
			props: { text: "· 가입 완료 후 홈으로 이동합니다" },
		},
		{
			id: "button-go-home",
			component: "wds-button",
			slot: "bottom",
			variant: "solid",
			props: { label: "홈으로 이동" },
		},
	],
} as const);
