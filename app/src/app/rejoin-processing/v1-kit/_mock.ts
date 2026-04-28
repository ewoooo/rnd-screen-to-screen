import type { DetailGridItem } from "@/components/payment-kit";

export const rejoinProcessingV1KitMock = {
	header: "재가입 완료",
	resultGlyph: "✓",
	title: ["다시 만나서", "반가워요"],
	timestamp: "2026년 4월 28일 오후 2:55",
	detail: [
		{ key: "회원 상태", value: "정상 회원", tone: "violet" },
		{ key: "회원 ID", value: "u-1820-0042 (복원)" },
		{ key: "처리 결과", value: "정상" },
	] as readonly DetailGridItem[],
	statusTitle: "복원 결과",
	status: [
		{ id: "profile", label: "기본 프로필", value: "복원 완료", tone: "success" as const },
		{ id: "preference", label: "관심 카테고리", value: "복원 완료", tone: "success" as const },
		{ id: "coupon", label: "쿠폰·포인트", value: "복원 불가", tone: "warning" as const },
	],
	infoBullets: [
		"자동 로그인된 상태로 T우주 홈으로 이동해요.",
		"복원되지 않은 항목은 다시 사용할 수 없어요.",
		"이력 연계 결과는 마이페이지에서 확인할 수 있어요.",
	],
	cta: "T우주 시작하기",
} as const;
