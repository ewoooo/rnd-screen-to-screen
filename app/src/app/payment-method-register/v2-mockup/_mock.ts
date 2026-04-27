export type PaymentMethodOption = {
	id: "card" | "bank" | "card-2nd" | "simple-pay";
	name: string;
	sub: string;
	emoji: string;
	gradient: [string, string];
	disabled?: boolean;
	disabledReason?: string;
};

export const paymentMethodRegisterV2MockupMock = {
	stepIndex: 0,
	stepTotal: 3,
	header: "결제 수단 설정",
	heroTitle: ["주 결제 수단을", "선택해 주세요"],
	heroSub: "정기 결제에 사용할 1차 수단을 선택해 주세요",
	primary: {
		label: "1차 결제 수단",
		mark: "필수",
		options: [
			{
				id: "card",
				name: "신용/체크카드",
				sub: "간편결제 또는 직접 입력",
				emoji: "💳",
				gradient: ["#1a1a2e", "#0f3460"],
			},
			{
				id: "bank",
				name: "계좌이체",
				sub: "실시간 계좌이체",
				emoji: "🏦",
				gradient: ["#005bac", "#0081cf"],
			},
		] satisfies PaymentMethodOption[],
		selectedId: "card" as const,
	},
	secondary: {
		label: "2차 결제 수단",
		mark: "선택",
		options: [
			{
				id: "card-2nd",
				name: "신용/체크카드 추가",
				sub: "1차 실패 시 자동 시도",
				emoji: "💳",
				gradient: ["#1a1a2e", "#0f3460"],
			},
			{
				id: "simple-pay",
				name: "간편 결제 (SK pay)",
				sub: "타인 명의에서는 이용 불가",
				emoji: "📱",
				gradient: ["#7C3AED", "#A78BFA"],
				disabled: true,
				disabledReason: "타인 명의 결제 시 비활성",
			},
		] satisfies PaymentMethodOption[],
		selectedId: null as string | null,
	},
	infoBox: {
		title: "결제 수단 안내",
		bullets: [
			"1차 수단은 등록 후 삭제할 수 없어요",
			"타인 명의 카드는 간편결제를 이용할 수 없어요 (최대 5명)",
			"법인 명의 카드는 이용이 불가해요",
		],
	},
	cta: "다음",
} as const;
