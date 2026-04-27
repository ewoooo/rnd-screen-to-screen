export const paymentMethodRegisterMock = {
	policyRefs: [
		"3.1.1",
		"3.1.1.1",
		"3.1.1.2",
		"ACT_결제_PTY_01_01",
		"ACT_결제_PTY_01_02",
	],
	methodTypes: [
		{
			id: "card",
			label: "신용/체크카드",
			sub: "1차·2차 주 결제 수단으로 등록 가능",
			status: "권장",
			thumb: "card",
		},
		{
			id: "bank",
			label: "계좌이체",
			sub: "1차 주 결제 수단으로만 등록 가능",
			status: "1차",
			thumb: "bank",
		},
		{
			id: "simple",
			label: "간편 결제",
			sub: "온라인/모바일 self 채널, 본인 명의 기준",
			status: "본인",
			thumb: "pay",
		},
	],
	payerTypes: [
		{
			id: "self",
			label: "가입자 본인 명의",
			sub: "전체 결제 수단 후보를 우선 노출",
			status: "기본",
		},
		{
			id: "other",
			label: "타인 명의",
			sub: "간편 결제 제외, 최대 5명까지 등록",
			status: "제한",
		},
	],
	detailFields: [
		{
			id: "card",
			label: "카드 정보",
			sub: "카드사 · 카드번호 · 유효기간 · 비밀번호 앞 2자리 · 카드주 · 생년월일",
		},
		{
			id: "bank",
			label: "계좌 정보",
			sub: "은행명 · 계좌번호 · 예금주 · 생년월일",
		},
		{
			id: "auth",
			label: "인증",
			sub: "선택한 결제 수단과 채널별 정책에 따라 인증 후 등록",
		},
	],
	rankOptions: [
		{
			id: "primary",
			label: "1차 주 결제 수단",
			sub: "정기 결제 신청 시 필수 등록, 삭제 불가",
			status: "필수",
		},
		{
			id: "secondary",
			label: "2차 주 결제 수단",
			sub: "선택 등록, 신용/체크카드만 허용",
			status: "선택",
		},
	],
	policyNotices: [
		{
			id: "other-simple-pay",
			label: "타인 명의 + 간편 결제",
			sub: "가입자와 결제자 명의가 다르면 간편 결제를 선택할 수 없음",
		},
		{
			id: "other-limit",
			label: "타인 명의 최대 초과",
			sub: "타인 명의 결제 수단은 최대 5명까지 등록 가능",
		},
		{
			id: "corporate",
			label: "법인 명의 결제 수단",
			sub: "법인 명의 카드 또는 계좌이체는 이용 불가 안내 처리",
		},
	],
} as const;
