export const paymentAccountFormV1MockupMock = {
	stepIndex: 1,
	stepTotal: 3,
	header: "계좌 정보 입력",
	heroTitle: ["출금 계좌를", "등록해 주세요"],
	heroSub: "실시간 계좌이체로 정기 결제가 진행돼요",
	fields: {
		bank: { label: "은행 선택", value: "토스뱅크" },
		accountNumber: { label: "계좌번호", placeholder: "숫자만 입력해 주세요" },
		ownerName: { label: "예금주", value: "이우성" },
		ownerBirth: { label: "예금주 생년월일", placeholder: "YYYY.MM.DD" },
	},
	notice: {
		title: "이용 가능 계좌",
		bullets: [
			"국민·신한·하나·우리·농협·카카오뱅크·토스뱅크 등 실시간 이체 지원 은행",
			"일부 증권사 계좌·평생 계좌번호는 이용 불가",
			"2차 결제 수단으로는 계좌이체를 선택할 수 없어요",
		],
	},
	cta: "등록하기",
} as const;
