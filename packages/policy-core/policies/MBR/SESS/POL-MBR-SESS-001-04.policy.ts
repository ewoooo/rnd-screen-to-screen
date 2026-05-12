import { definePolicy } from "../../../src/policy";

export default definePolicy({
	id: "POL-MBR-SESS-001-04",
	parent: "POL-MBR-SESS-001",
	domain: "MBR",
	group: "SESS",
	title: "세션 유효시간",
	sourceText: "가입 후 발급되는 세션의 유효시간은 24시간이다.",
	sourceRef: {
		document: "NC 회원가입·탈퇴 정책서 Full v1.0 확정본",
		section: "POL-MBR-SESS-001",
	},
	copy: {
		requirement: "세션 유효시간 24시간",
		error: "세션이 만료되어 다시 로그인해 주세요",
	},
});
