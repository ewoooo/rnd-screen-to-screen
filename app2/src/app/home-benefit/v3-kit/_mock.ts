export type HomeBenefitPoints = {
	label: string;
	headline: string;
	availablePoints: number;
	ctaText: string;
};

export type HomeBenefitBarcode = {
	label: string;
	digits: string[];
	timerText: string;
};

export type HomeBenefitBrands = {
	label: string;
	countText: string;
};

export type HomeBenefitOfferingBanner = {
	text: string;
};

export type HomeBenefitMovie = {
	id: string;
	title: string;
	subText: string;
};

export type HomeBenefitCoupon = {
	id: string;
	title: string;
	subText: string;
	brand: string;
};

export type HomeBenefitHeaderBanner = {
	text: string;
};

export type HomeBenefitFixture = {
	headerBanner: HomeBenefitHeaderBanner;
	points: HomeBenefitPoints;
	barcode: HomeBenefitBarcode;
	brands: HomeBenefitBrands;
	offeringBanner: HomeBenefitOfferingBanner;
	movieSection: {
		label: string;
		items: HomeBenefitMovie[];
	};
	couponSection: {
		label: string;
		countText: string;
		items: HomeBenefitCoupon[];
	};
};

export const homeBenefitFixture: HomeBenefitFixture = {
	headerBanner: {
		text: "최대 50% 적립 T 멤버십 라이프 신한카드",
	},
	points: {
		label: "T멤버십 포인트",
		headline: "보유 포인트로 이번 달\n요금 줄일 수 있어요",
		availablePoints: 65300,
		ctaText: "3월 요금에 포인트 적용하기",
	},
	barcode: {
		label: "T멤버십",
		digits: ["1234", "4561", "1506", "4932"],
		timerText: "19:58",
	},
	brands: {
		label: "혜택 브랜드",
		countText: "5곳에서 사용가능",
	},
	offeringBanner: {
		text: "신혼부부 프랜차이즈 무조건 할인",
	},
	movieSection: {
		label: "영화예매",
		items: [
			{
				id: "m01",
				title: "왕과 사는 남자",
				subText: "VVIP CGV 1인 무료 이용",
			},
			{
				id: "m02",
				title: "만약에 우리",
				subText: "메가박스 본인 50%, 동반1인 20%할인",
			},
		],
	},
	couponSection: {
		label: "쿠폰함",
		countText: "7장 보유 중",
		items: [
			{
				id: "c01",
				title: "VIPS 50% 할인쿠폰",
				subText: "D-2",
				brand: "VIPS",
			},
			{
				id: "c02",
				title: "파리바게뜨 10% 할인 쿠폰",
				subText: "D-2",
				brand: "PARIS",
			},
		],
	},
};
