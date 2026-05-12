import { definePolicy } from "../../../src/policy";

export default definePolicy({
	id: "POL-MBR-AUTH-002-01",
	parent: "POL-MBR-AUTH-002",
	domain: "MBR",
	group: "AUTH",
	title: "허용 인증수단",
	sourceText:
		"본인인증 수단은 휴대폰, PASS, 공동인증서 중 하나를 사용한다.",
	sourceRef: {
		document: "NC 회원가입·탈퇴 정책서 Full v1.0 확정본",
		section: "POL-MBR-AUTH-002",
	},
	copy: {
		requirement: "휴대폰, PASS, 공동인증서 중 선택",
		error: "허용된 인증수단을 선택해 주세요",
	},
});
