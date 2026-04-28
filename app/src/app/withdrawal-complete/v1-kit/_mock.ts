import type { DetailGridItem } from "@/components/payment-kit";

export const withdrawalCompleteV1KitMock = {
	header: "탈퇴 완료",
	resultGlyph: "👋",
	title: ["탈퇴가", "완료됐어요"],
	timestamp: "2026년 4월 28일 오후 2:30",
	detail: [
		{ key: "회원 상태", value: "탈퇴 유예", tone: "violet" },
		{ key: "철회 가능 기한", value: "2026.05.05 23:59", tone: "violet" },
		{ key: "탈퇴 요청ID", value: "w-20260428-0014" },
	] as readonly DetailGridItem[],
	statusTitle: "데이터 처리 결과",
	status: [
		{ id: "profile", label: "프로필·기기 정보", value: "즉시 파기", tone: "success" as const },
		{ id: "marketing", label: "마케팅 동의 이력", value: "즉시 파기", tone: "success" as const },
		{ id: "payment", label: "결제 내역", value: "법정 보관 5년", tone: "warning" as const },
		{ id: "dispute", label: "분쟁 처리 기록", value: "법정 보관 3년", tone: "warning" as const },
	],
	infoBullets: [
		"7일 안에 철회하면 모든 데이터가 원래대로 복원돼요.",
		"7일이 지나면 철회할 수 없으며 즉시 파기 대상은 영구 삭제돼요.",
		"문의는 고객센터 1588-0000으로 연락 주세요.",
	],
	cta: "앱 종료",
} as const;
