export const searchEntryFixture = {
	title: "득템 찬스 T우주\n클럽클리오 쿠폰팩",
	pageCount: 6,
	pageIndex: 0,
	prompts: [
		"갤럭시 S30 울트라",
		"아이폰 20 사전예약",
		"갤럭시 S30 울트라",
		"이번달 요금이 많이 나온 이유가 뭐야?",
		"지금 쓸 수 있는 혜택 알려줘",
	],
};

export const recentQueries = ["영화예매", "아이폰 20", "요금제 변경", "갤럭시 S30 울트라", "강남 대리점"];

export const step04Suggestions: { label: string; kind: "ai" | "search" }[] = [
	{ label: "이번달 요금 오른 이유가 뭐야?", kind: "ai" },
	{ label: "내 사용 패턴에 맞는 요금제 찾아줘", kind: "ai" },
	{ label: "요금 변동 안내 서비스", kind: "search" },
	{ label: "요금안내서", kind: "search" },
	{ label: "요금제", kind: "search" },
];

export const step07Suggestions: { label: string; kind: "ai" | "search" }[] = [
	{ label: "아이폰 21 사전예약", kind: "search" },
	{ label: "아이폰 21", kind: "search" },
	{ label: "아이폰 20", kind: "search" },
];

export const categoryTabs = [
	{ id: "all", label: "전체" },
	{ id: "device", label: "단말기" },
	{ id: "event", label: "기획전" },
	{ id: "extra", label: "부가서비스" },
];

export const eventCards = [
	{
		id: "e01",
		title: "iPhone 20 Pro & iPhone 20",
		sub: "기다림은 짧게, 혜택은 특별하게",
	},
	{
		id: "e02",
		title: "iPhone 20 Air",
		sub: "실속 가득한 T 다이렉트샵 혜택",
	},
];

export const deviceCards = [
	{
		id: "d01",
		title: "iPhone 20",
		originalPrice: "136,940원",
		monthlyPrice: "월116,850원",
		tags: ["최근본", "256G"],
		primaryTag: true,
	},
	{
		id: "d02",
		title: "iPhone 20 Air",
		originalPrice: "124,410원",
		monthlyPrice: "월100,740원",
		tags: ["256G", "다이렉트5G"],
	},
];

export const infoCard = {
	title: "T 즉시보상 아이폰 20",
	description:
		"상품에 2년간 가입하고 25-26개월차에 기기변경&단말 반납 시 출고가의 최대 70% 보상혜택을 제공합니다.",
};

export const aiFollowups = ["아이폰 21 사전예약", "아이폰 21", "아이폰 20 Pro"];

export const chatFlow = {
	userQuestion: "지금 휴대폰 반납하면 최대 얼마 받을 수 있어?",
	aiAnswer:
		"민수님, 벌써 SKT와 30년이나 함께해주셨어요. 진정한 동반자이신 우수 고객 민수님을 위해 최대 55만원의 특별 보상금을 준비했어요.",
	afterCard:
		"방금 말씀드린 보상금을 보태면, 새 휴대폰 가격 부담이 확 줄어들 거예요. 혹시 다른 기기나 요금제에 대해서도 더 알고 싶으신가요?",
	device: { title: "iPhone 17 128GB", sub: "약정 종료까지 7일 (3/22)" },
	compensation: {
		label: "T 안심 보상가",
		total: "550,000원",
		rows: [
			{ label: "기본 보상 (A급 기준)", value: "350,000원" },
			{ label: "아이폰 17 특별 보상", value: "150,000원" },
			{ label: "SKT 추가 혜택 (장기 고객 30년)", value: "50,000원" },
		],
		footerLink: "나의 가입 정보 ›",
	},
	compareCtaText: "휴대폰 납부액 비교",
};
