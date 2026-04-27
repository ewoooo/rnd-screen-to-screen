export const paymentTplusSettingV1MockupMock = {
	stepIndex: 1,
	stepTotal: 3,
	header: "T+포인트 설정",
	heroTitle: ["보유한 포인트를", "사용해 결제해요"],
	heroSub: "최초 결제와 정기 결제에 사용할 포인트를 따로 설정할 수 있어요",
	balance: {
		label: "보유 포인트",
		amount: "12,340P",
		conversion: "1P = 1원",
	},
	cardSelect: {
		label: "멤버십카드",
		value: "T 멤버십 (010-1234-5678)",
		hint: "이동전화번호 연결 카드를 우선 적용했어요",
	},
	firstUse: {
		label: "최초 결제에 사용할 포인트",
		value: "5,000",
		max: "최대 12,340P 사용 가능",
	},
	recurringUse: {
		label: "매 정기 결제에 사용할 포인트",
		value: "3,000",
		max: "최대 100,000P / 회 (1P 단위)",
	},
	notice: {
		title: "포인트 차감 원칙",
		bullets: [
			"쿠폰·이용권 차감 후 잔여 금액에 적용해요",
			"실제 차감액은 잔여 포인트·설정 금액·결제 금액 중 가장 작은 값",
			"이용 금액을 변경하면 다음 정기 결제부터 적용돼요",
		],
	},
	cta: "적용하기",
} as const;
