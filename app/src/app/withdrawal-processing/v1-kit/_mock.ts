export const withdrawalProcessingV1KitMock = {
	header: "탈퇴 처리 중",
	resultGlyph: "⟳",
	title: ["탈퇴를", "처리하고 있어요"],
	subtitle: "잠시만 기다려 주세요. 화면을 닫지 마세요.",
	progressTitle: "처리 단계",
	progress: [
		{ id: "state", label: "회원 상태 전환", value: "완료", tone: "success" as const },
		{ id: "session", label: "로그인 세션 종료", value: "완료", tone: "success" as const },
		{ id: "classify", label: "데이터 분류(파기/보관)", value: "진행 중", tone: "default" as const },
		{ id: "queue", label: "후속 처리 큐 등록", value: "대기 중", tone: "default" as const },
	],
	infoBullets: [
		"법정 보관 대상 데이터는 보관 기간이 지나면 자동 파기돼요.",
		"처리 중 오류가 발생하면 자동으로 재시도해요.",
	],
} as const;
