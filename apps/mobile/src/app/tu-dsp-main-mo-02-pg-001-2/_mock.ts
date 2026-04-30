// Spec: packages/screens/spec/active/tu-dsp-main-mo-02-pg-001-2.json
// 발견_case2_로그인 (case1_비로그인의 로그인 변형)
// SPEC-MAIN-10 바코드 / -11 개인화 인사 / -12 인기 베스트 / -13 빅배너 / -14 인기 OTT / -15 일반 배너

export type ProductCard = {
	id: string;
	title: string;
	sub: string;
	pill?: string;
};

export type Mo01Login = {
	user: { name: string };
	hasBarcodeBenefit: boolean; // SPEC-MAIN-10 조건
	greeting: { label: string; title: string }; // SPEC-MAIN-11
	hotBest: { label: string; title: string; items: ProductCard[] }; // SPEC-MAIN-12
	heroBanner: { text: string; href: string }; // SPEC-MAIN-13
	hotOtt: { label: string; title: string; items: ProductCard[] }; // SPEC-MAIN-14
	promoBanner: { text: string; href: string }; // SPEC-MAIN-15
};

export const mo01LoginFixture: Mo01Login = {
	user: { name: "최우성" },
	hasBarcodeBenefit: true,
	greeting: {
		label: "오늘의 발견",
		title: "최우성 님, 오늘은 어떤 구독을 만나볼까요?",
	},
	hotBest: {
		label: "실시간 인기",
		title: "지금 가장 많이 담은 구독",
		items: [
			{ id: "p1", title: "Netflix 프리미엄", sub: "월 17,000원", pill: "1위" },
			{ id: "p2", title: "쿠팡플레이 + 와우", sub: "월 7,890원", pill: "2위" },
			{ id: "p3", title: "디즈니+ 스탠다드", sub: "월 9,900원", pill: "3위" },
		],
	},
	heroBanner: {
		text: "신규 가입 첫 달 100원 — 무엇이든",
		href: "/promo/welcome",
	},
	hotOtt: {
		label: "OTT TOP",
		title: "이번 주 인기 OTT",
		items: [
			{ id: "ott1", title: "TVING 광고형 스탠다드", sub: "월 5,500원" },
			{ id: "ott2", title: "Wavve 베이직", sub: "월 7,900원" },
			{ id: "ott3", title: "Apple TV+", sub: "월 6,500원" },
		],
	},
	promoBanner: {
		text: "OTT 2개 이상 묶으면 추가 20%",
		href: "/promo/bundle",
	},
};
