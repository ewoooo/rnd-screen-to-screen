export const loginV2KitMock = {
	header: "로그인",
	heroTitle: ["T우주에", "로그인해 주세요"],
	fields: {
		userId: { label: "아이디", value: "junghoon99" },
		password: { label: "비밀번호", value: "•••••••••••" },
	},
	links: ["아이디 찾기", "비밀번호 찾기", "회원가입"],
	infoBullets: ["1년 이상 미접속 계정은 휴면 상태로 전환돼요."],
	cta: "로그인",
} as const;
