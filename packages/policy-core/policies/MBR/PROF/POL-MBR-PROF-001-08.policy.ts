import { definePolicy } from "../../../src/policy";

export default definePolicy({
	id: "POL-MBR-PROF-001-08",
	parent: "POL-MBR-PROF-001",
	domain: "MBR",
	group: "PROF",
	title: "초기 권한 상태",
	sourceText: "가입 직후 초기 권한 상태는 일반 회원이다.",
	sourceRef: {
		document: "NC 회원가입·탈퇴 정책서 Full v1.0 확정본",
		section: "POL-MBR-PROF-001",
	},
	copy: {
		requirement: "일반 회원으로 가입되었습니다",
		error: "권한 정보를 확인하지 못했습니다",
	},
});
