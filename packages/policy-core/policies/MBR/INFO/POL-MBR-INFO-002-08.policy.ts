import { definePolicy } from "../../../src/policy";

export default definePolicy({
	id: "POL-MBR-INFO-002-08",
	parent: "POL-MBR-INFO-002",
	domain: "MBR",
	group: "INFO",
	title: "휴대폰번호 형식",
	sourceText: "휴대폰번호는 숫자만 11자리로 입력한다.",
	sourceRef: {
		document: "NC 회원가입·탈퇴 정책서 Full v1.0 확정본",
		section: "POL-MBR-INFO-002",
	},
	copy: {
		requirement: "숫자 11자리",
		error: "휴대폰번호는 숫자 11자리로 입력해 주세요",
	},
});
