import type { DetailGridItem } from "@/components/payment-kit";

export const rejoinHistoryCheckV1KitMock = {
	header: "이력 확인",
	heroTitle: ["이전 가입 이력을", "확인했어요"],
	heroSub: "동일한 본인인증 정보로 가입한 계정 이력이에요.",
	detail: [
		{ key: "기존 회원 ID", value: "u-1820-0042" },
		{ key: "원 가입일", value: "2024.01.15" },
		{ key: "탈퇴일", value: "2025.10.20" },
		{ key: "철회 종료일", value: "2025.10.27" },
	] as readonly DetailGridItem[],
	timelineTitle: "이력 타임라인",
	timeline: [
		{ id: "join", label: "가입", value: "2024.01.15", tone: "success" as const },
		{ id: "dormant", label: "휴면 전환 (1년 미접속)", value: "2025.04.10", tone: "warning" as const },
		{ id: "recovered", label: "휴면 해제", value: "2025.06.02", tone: "success" as const },
		{ id: "leave", label: "탈퇴", value: "2025.10.20", tone: "warning" as const },
	],
	infoBullets: [
		"이력은 재가입 가능 여부 판정과 데이터 복원에 사용돼요.",
		"본인 명의가 아니라면 고객센터에 문의해 주세요.",
	],
	cta: "재가입 가능 여부 확인",
} as const;
