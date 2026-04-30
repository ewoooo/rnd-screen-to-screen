import type { DetailGridItem } from "@/components/payment-kit";

export const withdrawalPreNoticeV1KitMock = {
	header: "탈퇴 전 안내",
	stepIndex: 1,
	stepTotal: 3,
	heroTitle: ["탈퇴 전", "꼭 확인해 주세요"],
	asset: [
		{ key: "보유 T+ 포인트", value: "12,400P" },
		{ key: "보유 쿠폰", value: "2장" },
		{ key: "다음 정기결제일", value: "2026.05.10" },
	] as readonly DetailGridItem[],
	warningTitle: "탈퇴 시 처리 사항",
	warningBullets: [
		"보유 포인트(12,400P)는 탈퇴 즉시 소멸돼요.",
		"발급된 쿠폰 2장은 모두 회수돼요.",
		"미납 금액이 있으면 탈퇴를 진행할 수 없어요.",
		"탈퇴 후 7일 이내 철회할 수 있어요.",
	],
	linkedTitle: "연결 서비스 영향",
	linkedBullets: [
		"T우주 멤버십 자동결제가 즉시 해지돼요.",
		"OTT 등 제휴 서비스 혜택이 만료돼요.",
	],
	consentLabel: "위 내용을 모두 확인했어요",
	consentChecked: true,
	cta: "다음",
} as const;
