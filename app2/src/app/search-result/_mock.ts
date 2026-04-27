export const searchResultFixture = {
	query: "무선 이어버드",
	activeTab: "all",
	tabs: [
		{ id: "all", label: "전체" },
		{ id: "shop", label: "쇼핑" },
		{ id: "benefit", label: "혜택" },
		{ id: "service", label: "서비스" },
	],
	suggestions: {
		label: "추천 검색어",
		items: ["이어버드 Pro", "무료배송", "T 멤버십", "노이즈 캔슬링"],
	},
	promo: {
		badge: "AI 추천",
		text: "최근 본 상품과 비슷한 혜택을 모았어요",
		action: "추천 보기",
	},
	results: {
		label: "검색 결과",
		title: "무선 이어버드",
		countText: "24개",
		items: [
			{
				id: "buds-pro",
				title: "무선 이어버드 Pro",
				sub: "오늘 특가 · 무료배송",
				pill: "쇼핑",
			},
			{
				id: "buds-lite",
				title: "무선 이어버드 Lite",
				sub: "T 멤버십 3% 적립",
				pill: "혜택",
			},
			{
				id: "care-plan",
				title: "이어버드 파손 케어",
				sub: "월 2,900원부터",
				pill: "서비스",
			},
			{
				id: "coupon",
				title: "오디오 기기 쿠폰팩",
				sub: "이번 주까지 사용 가능",
				pill: "쿠폰",
			},
			{
				id: "charger",
				title: "고속 무선 충전 패드",
				sub: "이어버드와 함께 구매 시 할인",
				pill: "쇼핑",
			},
			{
				id: "trade-in",
				title: "오디오 기기 보상판매",
				sub: "사용하던 기기 반납하고 추가 혜택",
				pill: "혜택",
			},
			{
				id: "setup",
				title: "블루투스 연결 가이드",
				sub: "기기별 페어링 문제 해결",
				pill: "고객지원",
			},
		],
	},
} as const;
