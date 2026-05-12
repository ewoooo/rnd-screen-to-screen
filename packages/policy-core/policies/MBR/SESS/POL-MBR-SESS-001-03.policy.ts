import { definePolicy } from "../../../src/policy";

export default definePolicy({
	id: "POL-MBR-SESS-001-03",
	parent: "POL-MBR-SESS-001",
	domain: "MBR",
	group: "SESS",
	title: "가입 완료 후 자동 로그인",
	sourceText: "가입 완료 후 자동 로그인 처리한다.",
	sourceRef: {
		document: "NC 회원가입·탈퇴 정책서 Full v1.0 확정본",
		section: "POL-MBR-SESS-001",
	},
	copy: {
		requirement: "가입 완료 후 자동 로그인됩니다",
		error: "자동 로그인에 실패했습니다",
	},
});
