export type SupplementOption = {
	id: "tplus" | "coupon" | "voucher";
	emoji: string;
	gradient: readonly [string, string];
	name: string;
	sub: string;
	badge?: { text: string; tone: "violet" | "neutral" };
	disabled?: boolean;
};

export const paymentSupplementAddV1MockupMock = {
	stepIndex: 1,
	stepTotal: 3,
	header: "결제 수단 설정",
	heroTitle: ["보조 결제 수단을", "추가할 수 있어요"],
	heroSub: "T+포인트, 쿠폰, 이용권을 함께 사용할 수 있어요",
	primaryPill: "💳 신한카드 ••3721 (1차)",
	options: [
		{
			id: "tplus",
			emoji: "✨",
			gradient: ["#3617ce", "#5b3df0"],
			name: "T+포인트",
			sub: "잔여 12,340P · 1P = 1원",
			badge: { text: "사용 가능", tone: "violet" },
		},
		{
			id: "coupon",
			emoji: "🎫",
			gradient: ["#7C3AED", "#A78BFA"],
			name: "보유 쿠폰",
			sub: "T우주 3개월 50% 할인쿠폰",
			badge: { text: "3장", tone: "violet" },
		},
		{
			id: "voucher",
			emoji: "🎟",
			gradient: ["#059669", "#34D399"],
			name: "이용권",
			sub: "보유 이용권 없음",
			disabled: true,
		},
	] satisfies SupplementOption[],
	exclusiveNotice: {
		title: "함께 사용 제한",
		bullets: [
			"쿠폰과 이용권은 동시에 사용할 수 없어요",
			"선물하기 상품은 쿠폰·이용권 사용이 불가해요",
			"한 번 사용한 쿠폰/이용권은 변경·삭제할 수 없어요",
		],
	},
	summary: {
		productLabel: "T우주 멤버십 (월간)",
		productAmount: "13,900원",
		discountLabel: "T+ 포인트 할인",
		discountAmount: "-5,000P",
		totalLabel: "최초 결제 금액",
		totalAmount: "8,900원",
	},
	cta: "다음",
} as const;
