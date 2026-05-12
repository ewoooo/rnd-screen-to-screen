import { definePolicy } from "../../../src/policy";

export default definePolicy({
	id: "POL-MBR-TERM-002-05",
	parent: "POL-MBR-TERM-002",
	domain: "MBR",
	group: "TERM",
	title: "법정대리인 동의 요청 유효시간",
	sourceText:
		"법정대리인 동의 요청의 유효시간은 24시간이다.",
	sourceRef: {
		document: "NC 회원가입·탈퇴 정책서 Full v1.0 확정본",
		section: "POL-MBR-TERM-002",
	},
	copy: {
		requirement: "동의 요청 유효시간 24시간",
		error: "동의 요청 유효시간이 만료되어 다시 요청해 주세요",
	},
});
