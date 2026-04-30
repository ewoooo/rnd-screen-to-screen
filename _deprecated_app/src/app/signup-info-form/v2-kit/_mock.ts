export const signupInfoFormV2KitMock = {
	header: "회원 정보 입력",
	stepIndex: 0,
	stepTotal: 3,
	heroTitle: ["기본 정보를", "입력해 주세요"],
	heroSub: "다음 단계인 본인인증 후 가입이 완료돼요.",
	fields: {
		name: { label: "이름", value: "이정훈" },
		userId: { label: "아이디", value: "junghoon99", trailing: "중복확인" },
		password: { label: "비밀번호", value: "•••••••••••" },
		passwordConfirm: { label: "비밀번호 확인", value: "•••••••••••" },
		email: { label: "이메일", value: "junghoon99@example.com", trailing: "중복확인" },
		phone: { label: "휴대폰 번호", value: "010-1234-5678" },
	},
	infoBullets: [
		"비밀번호는 영문·숫자·특수문자를 모두 포함해야 해요.",
		"이미 가입된 정보는 사용할 수 없어요.",
	],
	cta: "본인인증 받기",
} as const;
