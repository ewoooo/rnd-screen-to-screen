export type CouponItem = {
	id: string;
	name: string;
	discount: string;
	condition: string;
	expiry: string;
	selected?: boolean;
};

export type UnavailableCoupon = {
	id: string;
	name: string;
	reason: string;
};

export const paymentCouponSelectV1MockupMock = {
	stepIndex: 1,
	stepTotal: 3,
	header: "쿠폰 선택",
	heroTitle: ["사용할 쿠폰을", "선택해 주세요"],
	heroSub: "한 번에 한 장만 사용할 수 있어요",
	available: [
		{
			id: "c1",
			name: "T우주 3개월 50% 할인쿠폰",
			discount: "50% 할인",
			condition: "최소 결제 5,000원 · 최대 7,000원 할인",
			expiry: "2026-06-30 까지",
			selected: true,
		},
		{
			id: "c2",
			name: "신규 가입 5,000원 쿠폰",
			discount: "5,000원 할인",
			condition: "최소 결제 10,000원",
			expiry: "2026-05-15 까지",
		},
		{
			id: "c3",
			name: "친구 추천 쿠폰",
			discount: "3,000원 할인",
			condition: "최소 결제 5,000원",
			expiry: "2026-05-31 까지",
		},
	] satisfies CouponItem[],
	unavailable: [
		{
			id: "u1",
			name: "선물하기 전용 쿠폰",
			reason: "현재 상품 유형(정기구독)에서 사용 불가",
		},
		{
			id: "u2",
			name: "20,000원 이상 결제 쿠폰",
			reason: "최소 결제 금액 미달",
		},
	] satisfies UnavailableCoupon[],
	exclusiveNotice: {
		title: "이용권과 함께 사용 불가",
		bullets: [
			"쿠폰과 이용권은 동시에 사용할 수 없어요",
			"이용권을 적용하려면 쿠폰을 해제해 주세요",
			"이용 중인 쿠폰은 변경·삭제할 수 없어요",
		],
	},
	cta: "1장 적용하기",
} as const;
