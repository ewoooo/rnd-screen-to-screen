import type { DetailGridItem } from "@/components/payment-kit";

export const membershipValidationV2KitMock = {
	header: "회원 검증",
	resultGlyph: "ⓘ",
	title: ["이미 가입한", "계정이 있어요"],
	subtitle: "you@example.com 으로 가입된 정상 회원이에요.",
	detail: [
		{ key: "회원 상태", value: "정상 회원" },
		{ key: "가입일", value: "2023.04.18" },
		{ key: "판정 코드", value: "DUPLICATE_CI", tone: "violet" },
	] as readonly DetailGridItem[],
	infoTitle: "다음 단계 안내",
	infoBullets: [
		"이미 가입된 계정으로 로그인해 주세요.",
		"비밀번호가 기억나지 않으면 비밀번호 찾기를 이용하세요.",
	],
	cta: "로그인 페이지로 이동",
} as const;
