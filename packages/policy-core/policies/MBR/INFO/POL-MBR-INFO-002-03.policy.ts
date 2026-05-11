import { definePolicy } from "../../../src/policy";

export default definePolicy({
	id: "POL-MBR-INFO-002-03",
	parent: "POL-MBR-INFO-002",
	domain: "MBR",
	group: "INFO",
	title: "아이디 문자 종류",
	sourceText: "아이디는 영문과 숫자만 허용한다.",
	sourceRef: {
		document: "NC 회원가입·탈퇴 정책서 Full v1.0 확정본",
		section: "POL-MBR-INFO-002",
	},
	copy: {
		requirement: "영문, 숫자만 입력",
		error: "아이디는 영문과 숫자만 입력해 주세요",
	},
});
