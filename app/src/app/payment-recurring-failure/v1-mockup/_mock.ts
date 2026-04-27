export const paymentRecurringFailureV1MockupMock = {
	header: "구독 관리",
	subscriptionCard: { name: "T우주 멤버십", priceLine: "13,900원/월" },
	resultGlyph: "⚠️",
	title: "정기 결제가 실패했어요",
	detail: [
		{ key: "결제 수단", value: "신한카드 ••3721" },
		{ key: "시도 횟수", value: "2/6회", tone: "violet" as const },
		{ key: "실패 사유", value: "잔액 부족" },
	],
	body: "D+2까지 최대 6회 자동 재시도해요.\n지금 바로 결제하거나 결제 수단을 변경할 수 있어요.",
	secondaryCta: "결제 수단 변경",
	primaryCta: "즉시 결제",
} as const;
