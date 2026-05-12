import { definePolicy } from "../../../src/policy";

export default definePolicy({
	id: "POL-MBR-AUTH-005-01",
	parent: "POL-MBR-AUTH-005",
	domain: "MBR",
	group: "AUTH",
	title: "인증 실패 최대 횟수",
	sourceText: "본인인증 실패는 최대 5회까지 허용한다.",
	sourceRef: {
		document: "NC 회원가입·탈퇴 정책서 Full v1.0 확정본",
		section: "POL-MBR-AUTH-005",
	},
	copy: {
		requirement: "최대 5회까지 시도 가능",
		error: "인증 실패 한도(5회)를 초과했습니다",
	},
});
