export const subscriptionCanceledV1MockupMock = {
	header: "구독 해지",
	subscriptionCard: { name: "T우주 멤버십", priceLine: "13,900원/월" },
	resultGlyph: "✕",
	title: "구독이 해지됐어요",
	subtitle: "2024년 2월 1일 (다음 정기결제일 도래)",
	detail: [
		{ key: "해지 사유", value: "정기결제 보류 후 미결제" },
		{ key: "마지막 이용일", value: "2024년 1월 31일" },
		{ key: "환불 금액", value: "0원 (사용 완료)", tone: "discount" as const },
	],
	warning: "해지일(M+1D) 당일에는 즉시 결제·결제 취소·결제 수단 변경 등 모든 업무가 불가해요.",
	body: "T우주 서비스를 다시 이용하려면 새로 가입해 주세요.",
	cta: "T우주 다시 가입하기",
} as const;
