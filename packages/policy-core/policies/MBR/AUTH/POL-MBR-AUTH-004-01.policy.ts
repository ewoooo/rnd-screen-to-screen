import { definePolicy } from "../../../src/policy";

export default definePolicy({
	id: "POL-MBR-AUTH-004-01",
	parent: "POL-MBR-AUTH-004",
	domain: "MBR",
	group: "AUTH",
	title: "재요청 쿨다운",
	sourceText: "인증번호 재요청 쿨다운 시간은 60초이다.",
	sourceRef: {
		document: "NC 회원가입·탈퇴 정책서 Full v1.0 확정본",
		section: "POL-MBR-AUTH-004",
	},
	copy: {
		requirement: "재요청은 60초 후 가능",
		error: "60초 후 다시 요청해 주세요",
	},
});
