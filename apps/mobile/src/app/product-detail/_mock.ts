export const productDetailFixture = {
	topBanner: {
		text: "오늘 주문하면 내일 도착",
	},
	product: {
		label: "T 다이렉트샵",
		name: "무선 이어버드 Pro",
		brand: "T Edition",
		price: "129,000원",
		originalPrice: "159,000원",
		discount: "18%",
		rating: "4.8",
		reviewCount: "리뷰 1,284",
		imageLabel: "earbuds",
	},
	options: {
		label: "옵션",
		title: "색상과 보증을 선택하세요",
		items: [
			{ id: "white", title: "클라우드 화이트", sub: "기본 선택", pill: "선택됨" },
			{ id: "black", title: "미드나잇 블랙", sub: "동일 가격", pill: "변경" },
		],
	},
	benefits: {
		label: "구매 혜택",
		title: "T 멤버십으로 더 가볍게",
		items: [
			{ id: "ship", title: "무료배송", sub: "내일 도착 보장", pill: "배송" },
			{ id: "point", title: "포인트 3,870P", sub: "구매 확정 후 적립", pill: "적립" },
		],
	},
	purchase: {
		label: "결제",
		title: "총 129,000원",
		aiText: "오늘 특가와 무료배송이 적용됐어요",
		ctaText: "구매하기",
	},
	promo: {
		badge: "쿠폰",
		text: "T 멤버십 전용 쿠폰 적용 가능",
		action: "쿠폰 보기",
	},
	dualMenu: [
		{ label: "장바구니" },
		{ label: "찜하기" },
	],
} as const;
