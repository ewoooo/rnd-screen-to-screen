import type { DetailGridItem } from "@/components/payment-kit";

export const signupProcessingV2KitMock = {
	header: "가입 완료",
	resultGlyph: "✓",
	title: ["회원가입이", "완료됐어요"],
	timestamp: "2026년 4월 28일 오후 2:14",
	detail: [
		{ key: "회원 ID", value: "u-2826-9410" },
		{ key: "가입 채널", value: "앱" },
		{ key: "처리 결과", value: "정상", tone: "violet" },
	] as readonly DetailGridItem[],
	notify: {
		title: "가입 안내 발송",
		items: [
			{ id: "email", label: "📩 가입 안내 이메일", value: "발송 완료", tone: "success" as const },
			{ id: "sms", label: "💬 가입 안내 SMS", value: "발송 완료", tone: "success" as const },
		],
	},
	infoBullets: ["자동 로그인된 상태로 T우주 홈으로 이동해요."],
	cta: "T우주 시작하기",
} as const;
