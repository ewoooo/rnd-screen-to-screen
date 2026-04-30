export type HomeGuestSubscription = {
	id: string;
	title: string;
	sub: string;
};

export type HomeGuestFixture = {
	hero: {
		headlineLines: readonly string[];
		ctaText: string;
	};
	plan: {
		label: string;
		title: string;
		aiText: string;
	};
	dualMenu: { id: string; label: string }[];
	galaxyBanner: { text: string };
	usim: {
		label: string;
		title: string;
		sub: string;
	};
	subscriptions: {
		label: string;
		title: string;
		items: HomeGuestSubscription[];
	};
};

export const homeGuestFixture: HomeGuestFixture = {
	hero: {
		headlineLines: [
			"내 번호는 그대로,",
			"iPhone 17 42만원",
			"혜택으로 이용해보세요",
		],
		ctaText: "지원금 적용 가격 확인하기",
	},
	plan: {
		label: "모바일 요금제",
		title: "신규가입은 더 큰 혜택으로 \n시작해요",
		aiText:
			"다이렉트 5G 62(넷플릭스)\n62,000원 · 넷플릭스 광고형 스탠다드 제공 +3",
	},
	dualMenu: [
		{ id: "m01", label: "요금납부" },
		{ id: "m02", label: "청구서 일정변경" },
	],
	galaxyBanner: { text: "Galaxy S26 추가지원금 찬스" },
	usim: {
		label: "USIM/eSIM",
		title: "USIM/eSIM으로 가입",
		sub: "내 폰 그대로, 요금제만",
	},
	subscriptions: {
		label: "구독상품",
		title: "통신사 상관없이 누리는 혜택",
		items: [
			{
				id: "sub01",
				title: "TVING 스탠다드, Wavve 콘텐츠 팩 플러스",
				sub: "13,900원 · 1개월",
			},
			{
				id: "sub02",
				title: "NETFLIX 스탠다드, 스타벅스 쿠폰팩",
				sub: "13,900원 · 1개월",
			},
		],
	},
};
