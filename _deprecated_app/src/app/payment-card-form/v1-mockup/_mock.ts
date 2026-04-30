export type CardFormMock = {
	stepIndex: number;
	stepTotal: number;
	header: string;
	preview: {
		issuer: string;
		number: string;
		expiry: string;
		brand: string;
	};
	fields: {
		cardNumber: { label: string; value: string };
		expiry: { label: string; value: string };
		password: { label: string; value: string };
		birth: { label: string; placeholder: string };
	};
	notice: { title: string; bullets: readonly string[] };
	cta: string;
};

export const paymentCardFormV1MockupMock: CardFormMock = {
	stepIndex: 1,
	stepTotal: 3,
	header: "카드 정보 입력",
	preview: {
		issuer: "신한카드",
		number: "5413  ••••  ••••  3721",
		expiry: "12 / 26",
		brand: "CREDIT",
	},
	fields: {
		cardNumber: { label: "카드번호", value: "5413  ••••  ••••  3721" },
		expiry: { label: "유효기간", value: "12 / 26" },
		password: { label: "비밀번호 앞 2자리", value: "••" },
		birth: { label: "생년월일 (카드주)", placeholder: "YYYY.MM.DD" },
	},
	notice: {
		title: "카드 등록 안내",
		bullets: [
			"법인 명의 카드는 이용이 불가해요",
			"삼성/롯데/하나 등 일부 카드사는 유효기간 재입력이 필요해요",
			"정기 결제 진행 중인 1차 카드는 변경/삭제할 수 없어요",
		],
	},
	cta: "등록하기",
};
