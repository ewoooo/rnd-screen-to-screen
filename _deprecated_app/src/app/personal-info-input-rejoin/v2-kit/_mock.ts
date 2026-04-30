export const personalInfoInputRejoinV2KitMock = {
	header: "정보 입력 (재가입)",
	stepIndex: 2,
	stepTotal: 4,
	heroTitle: ["복원할 정보를", "확인해 주세요"],
	heroSub: "이전 계정에서 복원할 항목을 선택하고 변경된 약관에 다시 동의해요.",
	fields: {
		name: { label: "이름 (이전 정보)", value: "이정훈", trailing: "유지" },
		email: { label: "이메일", value: "junghoon99@example.com", trailing: "중복확인" },
		phone: { label: "휴대폰 번호", value: "010-1234-5678" },
	},
	consentLabel: "변경된 약관에 다시 동의해요",
	consentChecked: true,
	infoBullets: [
		"유지를 선택한 정보는 그대로 사용해요.",
		"변경된 약관에 동의하지 않으면 재가입을 진행할 수 없어요.",
	],
	cta: "재가입 진행",
} as const;
