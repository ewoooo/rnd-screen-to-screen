export const verificationIdentityV1KitMock = {
	header: "본인인증",
	stepIndex: 1,
	stepTotal: 3,
	heroTitle: ["본인인증을", "진행해 주세요"],
	heroSub: "안전한 가입을 위해 휴대폰 또는 이메일로 본인을 확인해요.",
	methods: [
		{ key: "phone", label: "휴대폰 인증", active: true },
		{ key: "email", label: "이메일 인증", active: false },
	],
	channel: { label: "휴대폰 번호", value: "010-1234-5678", trailing: "인증번호 받기" },
	code: { label: "인증번호", value: "428••", placeholder: "6자리 숫자", timer: "02:48" },
	infoBullets: [
		"인증번호 유효시간은 3분이에요.",
		"3회 실패 시 일정 시간 동안 인증이 제한될 수 있어요.",
		"인증번호가 오지 않으면 [재발송]을 눌러주세요.",
	],
	cta: "인증하고 계속하기",
} as const;
