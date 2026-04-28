export const dormancyRecoveryV1KitMock = {
	header: "휴면 해제 중",
	resultGlyph: "⟳",
	title: ["휴면 해제를", "처리하고 있어요"],
	subtitle: "잠시만 기다려 주세요. 화면을 닫지 마세요.",
	progressTitle: "처리 단계",
	progress: [
		{ id: "auth", label: "본인 확인", value: "완료", tone: "success" as const },
		{ id: "agree", label: "약관 재동의 반영", value: "완료", tone: "success" as const },
		{ id: "state", label: "회원 상태 전환", value: "진행 중", tone: "default" as const },
		{ id: "restore", label: "분리 보관 데이터 복원", value: "대기 중", tone: "default" as const },
	],
	infoBullets: [
		"분리 보관된 일부 데이터는 복원에 시간이 걸릴 수 있어요.",
		"처리 중 오류 발생 시 자동으로 재시도해요.",
	],
} as const;
