import { definePolicy } from "../../../src/policy";

export default definePolicy({
	id: "POL-MBR-TERM-001-06",
	parent: "POL-MBR-TERM-001",
	domain: "MBR",
	group: "TERM",
	title: "필수 약관 미동의 시 진행 차단",
	sourceText:
		"필수 약관에 미동의한 경우 다음 단계 진행을 차단한다.",
	sourceRef: {
		document: "NC 회원가입·탈퇴 정책서 Full v1.0 확정본",
		section: "POL-MBR-TERM-001",
	},
	copy: {
		requirement: "필수 약관 동의 후 다음 단계로 진행 가능",
		error: "필수 약관에 동의해 주세요",
	},
});
