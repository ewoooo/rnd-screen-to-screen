import { definePolicy } from "../../../src/policy";

export default definePolicy({
	id: "POL-MBR-TERM-002-01",
	parent: "POL-MBR-TERM-002",
	domain: "MBR",
	group: "TERM",
	title: "법정대리인 동의 대상",
	sourceText:
		"만 14세 미만 고객은 법정대리인의 동의를 받아야 한다.",
	sourceRef: {
		document: "NC 회원가입·탈퇴 정책서 Full v1.0 확정본",
		section: "POL-MBR-TERM-002",
	},
	copy: {
		requirement: "만 14세 미만 고객은 법정대리인 동의가 필요합니다",
		error: "법정대리인 동의를 완료해 주세요",
	},
});
