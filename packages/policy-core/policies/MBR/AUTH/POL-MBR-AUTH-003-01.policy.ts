import { definePolicy } from "../../../src/policy";

export default definePolicy({
	id: "POL-MBR-AUTH-003-01",
	parent: "POL-MBR-AUTH-003",
	domain: "MBR",
	group: "AUTH",
	title: "인증번호 자리수",
	sourceText: "인증번호는 6자리이다.",
	sourceRef: {
		document: "SB-MBR-UC01_02-0513",
		section: "ogn-mbr-auth-request",
	},
	copy: {
		requirement: "인증번호 6자리 입력",
		error: "6자리 인증번호를 입력해 주세요",
	},
});
