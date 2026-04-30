import type { DetailGridItem } from "@/components/payment-kit";

export const rejoinProcessingV2KitMock = {
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
		{ id: "coupon", label: "쿠폰·포인트", value: "복원 불가", tone: "default" as const },
	],
	infoBullets: ["자동 로그인된 상태로 T우주 홈으로 이동해요."],
	cta: "T우주 시작하기",
} as const;
