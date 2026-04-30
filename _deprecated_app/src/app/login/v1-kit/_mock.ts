export const loginV1KitMock = {
	header: "로그인",
	heroTitle: ["T우주에", "로그인해 주세요"],
	fields: {
		userId: { label: "아이디", value: "junghoon99", placeholder: "아이디 또는 이메일" },
		password: { label: "비밀번호", value: "•••••••••••", placeholder: "비밀번호" },
	},
	links: ["아이디 찾기", "비밀번호 찾기", "회원가입"],
	infoBullets: [
		"5회 이상 비밀번호 오류 시 일정 시간 로그인이 제한돼요.",
		"1년 이상 미접속 계정은 휴면 상태로 전환돼요.",
	],
	cta: "로그인",
} as const;
