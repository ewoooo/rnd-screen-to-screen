export const signupTermsV1KitMock = {
	header: "약관 동의",
	heroTitle: ["T우주 시작을 위해", "약관에 동의해 주세요"],
	heroSub: "필수 약관에 동의해야 가입을 진행할 수 있어요.",
	agreeAll: { label: "전체 동의 (선택 항목 포함)", checked: true },
	required: {
		label: "필수 약관",
		items: [
			{ key: "service", label: "서비스 이용약관", required: true, checked: true },
			{ key: "privacy", label: "개인정보 수집·이용 동의", required: true, checked: true },
		],
	},
	optional: {
		label: "선택 약관",
		items: [
			{ key: "marketing", label: "마케팅 정보 수신 동의", required: false, checked: true },
			{ key: "personalized", label: "맞춤형 혜택 제공 동의", required: false, checked: false },
		],
	},
	infoBullets: [
		"만 14세 미만 고객은 법정대리인 동의가 필요해요.",
		"동의한 약관 버전은 동의이력에 안전하게 저장돼요.",
	],
	cta: "동의하고 계속하기",
} as const;
