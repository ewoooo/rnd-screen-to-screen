import { definePolicy } from "../../../src/policy";

export default definePolicy({
	id: "POL-MBR-AUTH-001-01",
	parent: "POL-MBR-AUTH-001",
	domain: "MBR",
	group: "AUTH",
	title: "회원 가입 본인인증 적용",
	sourceText: "회원 가입 시 본인인증을 적용한다.",
	sourceRef: {
		document: "SB-MBR-UC01_02-0513",
		section: "ogn-mbr-auth-request",
	},
	copy: {
		requirement: "회원 가입 시 본인인증 필요",
		error: "본인인증을 완료해 주세요",
	},
});
