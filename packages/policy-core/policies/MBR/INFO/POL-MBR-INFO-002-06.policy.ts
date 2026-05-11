import { definePolicy } from "../../../src/policy";

export default definePolicy({
	id: "POL-MBR-INFO-002-06",
	parent: "POL-MBR-INFO-002",
	domain: "MBR",
	group: "INFO",
	title: "비밀번호 문자 조합",
	sourceText:
		"비밀번호는 영문 대문자, 영문 소문자, 숫자, 특수문자 중 3종 이상을 조합한다.",
	sourceRef: {
		document: "NC 회원가입·탈퇴 정책서 Full v1.0 확정본",
		section: "POL-MBR-INFO-002",
	},
	copy: {
		requirement: "영문 대/소문자, 숫자, 특수문자 중 3종 이상 조합",
		error: "영문 대/소문자, 숫자, 특수문자 중 3종 이상 조합해 주세요",
	},
});
