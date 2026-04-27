export type HomeManageStat = {
	id: string;
	label: string;
	value: string;
	badge: string;
	graphic: "family" | "progress-large" | "bill" | "progress-small";
};

export type HomeManageMenu = {
	id: string;
	label: string;
};

export type HomeManageFixture = {
	headerBanner: { text: string };
	diagnosis: {
		label: string;
		headline: string;
		aiText: string;
		ctaText: string;
	};
	stats: HomeManageStat[];
	dualMenu: HomeManageMenu[];
	offeringBanner: { text: string };
	barcode: {
		label: string;
		digits: string[];
		timerText: string;
	};
};

export const homeManageFixture: HomeManageFixture = {
	headerBanner: {
		text: "올리브영 기프트카드 5,000원권 응모 이벤트",
	},
	diagnosis: {
		label: "결합 이용현황 진단",
		headline: "엄마의 사용패턴에\n더 적합한 요금제가 있어요",
		aiText: "5G시니어 A형 변경 시, 요금 부담없이 2GB 추가 이용",
		ctaText: "현재 엄마 요금제와 비교하기",
	},
	stats: [
		{
			id: "s01",
			label: "결합가족 보기",
			value: "4명",
			badge: "엄마 데이터 소진 예정 D-3",
			graphic: "family",
		},
		{
			id: "s02",
			label: "실시간 잔여량",
			value: "32GB",
			badge: "80GB",
			graphic: "progress-large",
		},
		{
			id: "s03",
			label: "요금안내서",
			value: "123,200원",
			badge: "3월 납부완료",
			graphic: "bill",
		},
		{
			id: "s04",
			label: "약정할인/기기 할부 정보",
			value: "84,000원/월",
			badge: "만료 D-218",
			graphic: "progress-small",
		},
	],
	dualMenu: [
		{ id: "m01", label: "T 가족모아데이터" },
		{ id: "m02", label: "데이터 함께 쓰기" },
	],
	offeringBanner: {
		text: "달마다 알아서 도착하는 생필품",
	},
	barcode: {
		label: "T멤버십",
		digits: ["1234", "4561", "1506", "4932"],
		timerText: "19:58",
	},
};
