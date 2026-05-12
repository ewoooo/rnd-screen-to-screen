import { definePolicy } from "../../../src/policy";

export default definePolicy({
	id: "POL-MBR-SESS-001-07",
	parent: "POL-MBR-SESS-001",
	domain: "MBR",
	group: "SESS",
	title: "가입 완료 후 이동 경로",
	sourceText:
		"가입 완료 후 이동 경로는 가입 완료 화면을 거친 뒤 홈으로 이동한다.",
	sourceRef: {
		document: "NC 회원가입·탈퇴 정책서 Full v1.0 확정본",
		section: "POL-MBR-SESS-001",
	},
	copy: {
		requirement: "가입 완료 후 홈으로 이동합니다",
		error: "이동 경로를 확인하지 못했습니다",
	},
});
