export const paymentSuccessV1MockupMock = {
	header: "결제 완료",
	resultGlyph: "✓",
	title: "결제가 완료됐어요",
	timestamp: "2024년 1월 1일 오전 9:41",
	detail: [
		{ key: "구독 상품", value: "T우주 멤버십 (월간)" },
		{ key: "구독 기간", value: "2024.01.01 ~ 2024.02.01" },
		{ key: "다음 결제일", value: "2024년 2월 1일", tone: "violet" as const },
	],
	methodSummary: {
		label: "결제 수단",
		items: [
			{ id: "coupon", label: "🎫 T우주 50% 할인쿠폰", value: "-6,950원", tone: "discount" as const },
			{ id: "tplus", label: "⭐ T+ 포인트", value: "-5,000P", tone: "discount" as const },
			{ id: "card", label: "💳 신한카드 ••3721", value: "1,950원", tone: "default" as const },
		],
	},
	totalLabel: "최종 결제 금액",
	totalValue: "1,950원",
	infoBullets: [
		"결제 안내 문자가 발송됐어요 (SMS)",
		"영수증은 마이페이지 → 결제 내역에서 확인할 수 있어요",
		"결제 내역은 5년간 보관돼요",
	],
	cta: "T우주 시작하기",
} as const;
