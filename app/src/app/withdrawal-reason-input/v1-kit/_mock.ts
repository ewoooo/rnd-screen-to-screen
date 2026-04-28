export const withdrawalReasonInputV1KitMock = {
	header: "탈퇴 사유",
	stepIndex: 0,
	stepTotal: 3,
	heroTitle: ["탈퇴하시는 이유가", "무엇인가요?"],
	heroSub: "더 나은 서비스를 위해 알려주세요. (1개 이상 선택)",
	reasons: [
		{ key: "price", label: "가격이 부담돼요", checked: true },
		{ key: "use-low", label: "이용 빈도가 낮아요", checked: false },
		{ key: "alt-service", label: "다른 서비스로 옮겨요", checked: false },
		{ key: "ux", label: "사용이 불편해요", checked: false },
		{ key: "trouble", label: "오류·결제 문제가 있었어요", checked: false },
		{ key: "etc", label: "기타 (직접 입력)", checked: true },
	],
	textarea: {
		label: "자유 의견 (선택)",
		placeholder: "더 자세한 의견을 들려주세요. (최대 500자)",
		value: "구독료가 다른 서비스 대비 부담돼서요.",
		max: 500,
	},
	infoBullets: [
		"의견은 익명으로 분석에 활용돼요.",
		"부적절한 표현은 자동 필터링될 수 있어요.",
	],
	cta: "다음",
} as const;
