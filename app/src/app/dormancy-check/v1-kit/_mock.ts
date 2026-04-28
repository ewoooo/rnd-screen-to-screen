import type { DetailGridItem } from "@/components/payment-kit";

export const dormancyCheckV1KitMock = {
	header: "휴면 계정 안내",
	resultGlyph: "💤",
	title: ["휴면 상태", "계정이에요"],
	subtitle: "1년 이상 미접속으로 휴면 처리된 계정이에요. 본인확인 후 다시 사용할 수 있어요.",
	detail: [
		{ key: "회원 상태", value: "휴면", tone: "violet" },
		{ key: "휴면 전환일", value: "2025.04.10" },
		{ key: "마지막 접속", value: "2024.04.09" },
	] as readonly DetailGridItem[],
	infoTitle: "휴면 해제 조건",
	infoBullets: [
		"본인인증을 진행해요.",
		"이용약관·개인정보 처리방침에 다시 동의해요.",
		"분리 보관된 개인정보는 해제와 함께 복원돼요.",
	],
	cta: "휴면 해제 진행하기",
} as const;
