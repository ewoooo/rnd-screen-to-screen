import type { DetailGridItem } from "@/components/payment-kit";

export const withdrawalCompleteV2KitMock = {
	header: "탈퇴 완료",
	resultGlyph: "👋",
	title: ["탈퇴가", "완료됐어요"],
	timestamp: "2026년 4월 28일 오후 2:30",
	detail: [
		{ key: "회원 상태", value: "탈퇴 유예", tone: "violet" },
		{ key: "철회 가능 기한", value: "2026.05.05 23:59", tone: "violet" },
	] as readonly DetailGridItem[],
	statusTitle: "데이터 처리 결과",
	status: [
		{ id: "profile", label: "프로필·기기 정보", value: "즉시 파기", tone: "success" as const },
		{ id: "payment", label: "결제 내역", value: "법정 보관 5년", tone: "default" as const },
	],
	infoBullets: [
		"7일 안에 철회하면 모든 데이터가 원래대로 복원돼요.",
		"7일이 지나면 철회할 수 없어요.",
	],
	cta: "앱 종료",
} as const;
