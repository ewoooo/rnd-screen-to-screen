import { definePolicy } from "../../../src/policy";

export default definePolicy({
	id: "POL-MBR-AUTH-002-05",
	parent: "POL-MBR-AUTH-002",
	domain: "MBR",
	group: "AUTH",
	title: "기본 노출 인증수단",
	sourceText:
		"회원 가입 본인인증 화면의 기본 노출 인증수단은 휴대폰, PASS, 공동인증서이다.",
	sourceRef: {
		document: "SB-MBR-UC01_02-0513",
		section: "ogn-mbr-auth-select",
	},
	copy: {
		requirement: "휴대폰, PASS, 공동인증서를 기본 노출",
		error: "사용 가능한 인증수단을 불러오지 못했습니다",
	},
});
