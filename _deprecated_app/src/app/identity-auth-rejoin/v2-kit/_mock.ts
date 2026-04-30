export const identityAuthRejoinV2KitMock = {
	header: "본인인증",
	stepIndex: 0,
	stepTotal: 4,
	heroTitle: ["본인인증을", "진행해 주세요"],
	heroSub: "재가입 가능 여부를 확인하기 위해 본인을 인증해요.",
	methods: [
		{ key: "phone", label: "휴대폰 인증", active: true },
		{ key: "email", label: "이메일 인증", active: false },
	],
	channel: { label: "휴대폰 번호", value: "010-1234-5678", trailing: "인증번호 받기" },
	code: { label: "인증번호", value: "428••", timer: "02:48" },
	infoBullets: [
		"CI/DI를 통해 이전 가입 이력이 자동 조회돼요.",
		"3회 실패 시 일정 시간 동안 인증이 제한될 수 있어요.",
	],
	cta: "인증하고 계속하기",
} as const;
