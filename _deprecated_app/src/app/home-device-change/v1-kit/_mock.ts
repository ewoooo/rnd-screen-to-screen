export type HomeDeviceStat = {
	id: string;
	label: string;
	value: string;
	badge?: string;
	graphic?: { w: number; h: number; label: string };
};

export type HomeDeviceFixture = {
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

export const homeDeviceChangeFixture: HomeDeviceFixture = {
	topBanner: { text: "더 가볍게 만나보는 iPhone 20 Air" },
	hero: {
		label: "단말기",
		headline: "매장에서 보신 갤럭시 S26\n다시 확인해보세요",
		aiText: "SK텔레콤 논현대리점에서 상담완료",
		ctaText: "갤럭시 S26 상세보기",
	},
	stats: [
		{
			id: "d01",
			label: "요금안내서",
			value: "123,200원",
			badge: "3월 납부완료",
			graphic: { w: 48, h: 48, label: "bill" },
		},
		{
			id: "d02",
			label: "휴대폰 결제/콘텐츠 이용료",
			value: "23,800원",
			badge: "80,000원 한도",
			graphic: { w: 50, h: 50, label: "32%" },
		},
		{
			id: "d03",
			label: "T멤버십 포인트",
			value: "19,400원",
			badge: "3월 누적할인 1,700원",
			graphic: { w: 48, h: 48, label: "wave" },
		},
		{
			id: "d04",
			label: "혜택 브랜드",
			value: "5곳에서 사용가능",
			graphic: { w: 40, h: 40, label: "icons" },
		},
	],
	dualMenu: [
		{ id: "m01", label: "요금납부" },
		{ id: "m02", label: "청구서 일정변경" },
	],
	galaxyBanner: { text: "Galaxy S26 추가지원금 찬스" },
	barcode: {
		label: "T멤버십",
		digits: ["1234", "4561", "1506", "4932"],
		timerText: "19:58",
	},
};
