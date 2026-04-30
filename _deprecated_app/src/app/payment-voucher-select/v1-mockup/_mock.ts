export type VoucherItem = {
	id: string;
	name: string;
	purchaseAmount: string;
	expiry: string;
	condition: string;
	selected?: boolean;
};

export const paymentVoucherSelectV1MockupMock = {
	stepIndex: 1,
	stepTotal: 3,
	header: "이용권 선택",
	heroTitle: ["보유한 이용권을", "사용해 결제해요"],
	heroSub: "한 번에 한 장만 사용할 수 있어요",
	items: [
		{
			id: "v1",
			name: "T우주 멤버십 1개월 이용권",
			purchaseAmount: "13,900원",
			expiry: "2026-12-31 까지",
			condition: "T우주 멤버십 정기구독에서 사용 가능",
			selected: true,
		},
		{
			id: "v2",
			name: "T우주 멤버십 3개월 이용권",
			purchaseAmount: "39,000원",
			expiry: "2026-09-30 까지",
			condition: "T우주 멤버십 정기구독에서 사용 가능",
		},
	] satisfies VoucherItem[],
	cashReceiptNotice: {
		title: "현금영수증 안내",
		bullets: [
			"이용권 사용 시점에 구매 금액 기준으로 현금영수증이 발급돼요",
			"발행 정보 미입력 시 자진 발급으로 처리돼요",
		],
	},
	exclusiveNotice: {
		title: "쿠폰과 함께 사용 불가",
		bullets: [
			"쿠폰과 이용권은 동시에 사용할 수 없어요",
			"쿠폰을 적용하려면 이용권을 해제해 주세요",
			"이용 중인 이용권은 변경·삭제할 수 없어요",
		],
	},
	cta: "1장 적용하기",
} as const;
