import { definePolicy } from "../../../src/policy";

export default definePolicy({
	id: "POL-MBR-INFO-002-05",
	parent: "POL-MBR-INFO-002",
	domain: "MBR",
	group: "INFO",
	title: "비밀번호 길이",
	sourceText: "비밀번호는 10자 이상 20자 이하로 입력한다.",
	sourceRef: {
		document: "NC 회원가입·탈퇴 정책서 Full v1.0 확정본",
		section: "POL-MBR-INFO-002",
	},
	copy: {
		requirement: "10~20자",
		error: "비밀번호는 10~20자로 입력해 주세요",
	},
});
