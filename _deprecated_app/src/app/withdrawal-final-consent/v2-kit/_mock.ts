export const withdrawalFinalConsentV2KitMock = {
	header: "탈퇴 최종 동의",
	stepIndex: 3,
	stepTotal: 4,
	heroTitle: ["정말로", "탈퇴하시겠어요?"],
	graceTitle: "철회 가능 기간",
	graceBullets: [
		"탈퇴 후 7일 이내(2026-05-05 23:59까지) 철회 가능해요.",
		"철회 시 모든 데이터가 원래대로 복원돼요.",
		"7일이 지나면 철회할 수 없어요.",
	],
	dataTitle: "개인정보 처리",
	dataBullets: [
		"즉시 파기: 프로필, 마케팅 동의 이력",
		"법정 보관: 결제 내역(5년), 분쟁 처리 기록(3년)",
	],
	consents: [
		{ key: "c1", label: "탈퇴 및 개인정보 처리에 동의해요", required: true, checked: true },
		{ key: "c2", label: "철회 가능 기간(7일)을 확인했어요", required: true, checked: true },
	],
	cta: "최종 동의하고 탈퇴",
} as const;
