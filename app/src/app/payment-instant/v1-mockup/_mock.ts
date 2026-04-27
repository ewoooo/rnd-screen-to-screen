export const paymentInstantV1MockupMock = {
	header: "즉시 결제",
	heroTitle: ["결제 수단을", "선택해 주세요"],
	heroSub: "즉시 결제 후 다음 정기결제일도 이 수단을 사용해요",
	registered: {
		label: "등록된 결제 수단",
		emoji: "💳",
		gradient: ["#1a1a2e", "#0f3460"] as const,
		name: "신한카드 ••3721",
		sub: "1차 결제 수단 · 비자",
	},
	newMethod: {
		label: "새 결제 수단 등록",
		title: "다른 카드 또는 계좌이체 추가",
		desc: "새 수단이 다음 정기결제에도 사용돼요",
	},
	supplementLabel: "보조 결제 수단 (변경 가능)",
	supplements: [
		{ id: "tplus", label: "T+ 포인트", desc: "현재 5,000P 설정됨", trailing: "변경 ›" },
		{ id: "coupon", label: "쿠폰", desc: "T우주 50% 할인쿠폰 적용 중", trailing: "변경 ›" },
	],
	summary: [
		{ label: "T우주 멤버십", value: "13,900원", tone: "default" as const },
		{ label: "쿠폰 할인", value: "-6,950원", tone: "discount" as const },
		{ label: "T+ 포인트", value: "-5,000P", tone: "discount" as const },
	],
	totalLabel: "즉시 결제 금액",
	totalValue: "1,950원",
	infoBullets: [
		"즉시 결제 성공 시 해당 일자 기준으로 정기결제일이 재설정돼요",
		"새 결제 수단 등록 시 다음 정기결제일에도 동일하게 적용돼요",
	],
	cta: "1,950원 즉시 결제",
} as const;
