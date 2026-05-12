import { definePolicy } from "../../../src/policy";

export default definePolicy({
	id: "POL-MBR-AUTH-004-02",
	parent: "POL-MBR-AUTH-004",
	domain: "MBR",
	group: "AUTH",
	title: "재요청 최대 횟수",
	sourceText: "인증번호 재요청은 최대 5회까지 허용한다.",
	sourceRef: {
		document: "NC 회원가입·탈퇴 정책서 Full v1.0 확정본",
		section: "POL-MBR-AUTH-004",
	},
	copy: {
		requirement: "재요청은 최대 5회",
		error: "재요청 한도(5회)를 초과했습니다",
	},
});
