import type { DetailGridItem } from "@/components/payment-kit";

export const dormancyRecoveryCompleteV1KitMock = {
	header: "휴면 해제 완료",
	resultGlyph: "✓",
	title: ["휴면이", "해제됐어요"],
	timestamp: "2026년 4월 28일 오후 2:47",
	detail: [
		{ key: "회원 상태", value: "정상 회원", tone: "violet" },
		{ key: "복원된 항목", value: "프로필, 약관 동의" },
		{ key: "재인증", value: "휴대폰 인증 완료" },
	] as readonly DetailGridItem[],
	statusTitle: "복원 결과",
	status: [
		{ id: "profile", label: "기본 프로필", value: "복원 완료", tone: "success" as const },
		{ id: "consent", label: "약관 동의 이력", value: "복원 완료", tone: "success" as const },
		{ id: "history", label: "이전 알림 설정", value: "재설정 필요", tone: "warning" as const },
	],
	infoBullets: [
		"휴면 해제 후 자동 로그인된 상태로 서비스를 이용할 수 있어요.",
		"이전 알림 설정은 마이페이지에서 다시 설정할 수 있어요.",
	],
	cta: "T우주 시작하기",
} as const;
