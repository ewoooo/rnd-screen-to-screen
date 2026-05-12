import { definePolicy } from "../../../src/policy";

export default definePolicy({
	id: "POL-MBR-AUTH-005-03",
	parent: "POL-MBR-AUTH-005",
	domain: "MBR",
	group: "AUTH",
	title: "인증 제한 시간",
	sourceText: "인증 실패 한도 초과 시 10분 동안 인증을 제한한다.",
	sourceRef: {
		document: "NC 회원가입·탈퇴 정책서 Full v1.0 확정본",
		section: "POL-MBR-AUTH-005",
	},
	copy: {
		requirement: "한도 초과 시 10분 인증 제한",
		error: "10분 후 다시 시도해 주세요",
	},
});
