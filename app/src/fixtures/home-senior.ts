import type { HomeDeviceStat } from "./home-device-change";

export type HomeSeniorFixture = {
	topBanner: { text: string };
	hero: {
		label: string;
		headline: string;
		aiText: string;
		ctaText: string;
	};
	stats: HomeDeviceStat[];
	dualMenu: { id: string; label: string }[];
	galaxyBanner: { text: string };
	barcode: { label: string; digits: string[]; timerText: string };
};

export const homeSeniorFixture: HomeSeniorFixture = {
	topBanner: { text: "환절기 컨디션 챙기는 구독템 모음" },
	hero: {
		label: "요금안내서",
		headline: "3월 요금\n64,000원",
		aiText: "콘텐츠 이용료가 지난달보다 늘었어요",
		ctaText: "상세내역 살펴보기",
	},
	stats: [
		{
			id: "s01",
			label: "실시간 잔여량",
			value: "32GB",
			badge: "40GB 제공",
		},
		{
			id: "s02",
			label: "약정할인/기기 할부 정보",
			value: "31,419원/월",
			badge: "만료까지 84일",
		},
		{
			id: "s03",
			label: "T멤버십 사용가능 포인트",
			value: "19,400원",
			badge: "3월 누적할인 87,600원",
		},
		{
			id: "s04",
			label: "결합가족 보기",
			value: "2명",
			badge: "총 결합할인 8,450원",
		},
	],
	dualMenu: [
		{ id: "m01", label: "요금납부" },
		{ id: "m02", label: "청구 일정 변경" },
	],
	galaxyBanner: { text: "Galaxy S26 추가지원금 찬스" },
	barcode: {
		label: "T멤버십",
		digits: ["1234", "4561", "1506", "4932"],
		timerText: "19:58",
	},
};
