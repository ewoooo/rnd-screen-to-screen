import type { DetailGridItem } from "@/components/payment-kit";

export const rejoinEligibilityV1KitMock = {
	header: "재가입 안내",
	resultGlyph: "✓",
	title: ["재가입이", "가능해요"],
	subtitle: "이전 계정의 일부 정보를 복원해서 시작할 수 있어요.",
	detail: [
		{ key: "재가입 가능 여부", value: "가능", tone: "violet" },
		{ key: "탈퇴일", value: "2025.10.20" },
		{ key: "제한 종료일", value: "해당 없음" },
	] as readonly DetailGridItem[],
	statusTitle: "복원 가능 항목",
	status: [
		{ id: "profile", label: "기본 프로필", value: "복원 가능", tone: "success" as const },
		{ id: "preference", label: "관심 카테고리", value: "복원 가능", tone: "success" as const },
		{ id: "coupon", label: "쿠폰·포인트", value: "복원 불가", tone: "warning" as const },
		{ id: "history", label: "결제 이력", value: "법정 보관분만 조회", tone: "warning" as const },
	],
	infoBullets: [
		"개인정보 처리방침에 따라 일부 정보는 복원할 수 없어요.",
		"복원 없이 신규 계정으로 시작할 수도 있어요.",
	],
	cta: "복원하고 재가입",
} as const;
