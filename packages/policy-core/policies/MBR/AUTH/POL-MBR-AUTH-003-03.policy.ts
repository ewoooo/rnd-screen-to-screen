import { definePolicy } from "../../../src/policy";

export default definePolicy({
	id: "POL-MBR-AUTH-003-03",
	parent: "POL-MBR-AUTH-003",
	domain: "MBR",
	group: "AUTH",
	title: "인증번호 유효시간",
	sourceText: "인증번호의 유효시간은 3분이다.",
	sourceRef: {
		document: "NC 회원가입·탈퇴 정책서 Full v1.0 확정본",
		section: "POL-MBR-AUTH-003",
	},
	copy: {
		requirement: "유효시간 3분",
		error: "유효시간이 만료되어 다시 요청해 주세요",
	},
});
