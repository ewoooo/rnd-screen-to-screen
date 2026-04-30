export const termsReconsentDormancyV2KitMock = {
	header: "약관 재동의",
	heroTitle: ["휴면 해제를 위해", "약관에 다시 동의해 주세요"],
	heroSub: "휴면 기간 중 변경된 약관에 다시 동의해야 해제가 진행돼요.",
	agreeAll: { label: "전체 동의 (선택 항목 포함)", checked: true },
	required: {
		label: "필수 약관 (변경)",
		items: [
			{ key: "service", label: "서비스 이용약관 v2.4", required: true, checked: true },
			{ key: "privacy", label: "개인정보 처리방침 v3.1", required: true, checked: true },
		],
	},
	optional: {
		label: "선택 약관",
		items: [
			{ key: "marketing", label: "마케팅 정보 수신 동의", required: false, checked: false },
		],
	},
	infoBullets: [
		"휴면 기간 중 변경된 항목만 재동의 대상이에요.",
		"동의 이력은 갱신되어 저장돼요.",
	],
	cta: "동의하고 해제하기",
} as const;
