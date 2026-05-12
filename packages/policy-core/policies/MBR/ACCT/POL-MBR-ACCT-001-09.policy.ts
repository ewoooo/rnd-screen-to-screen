import { definePolicy } from "../../../src/policy";

export default definePolicy({
	id: "POL-MBR-ACCT-001-09",
	parent: "POL-MBR-ACCT-001",
	domain: "MBR",
	group: "ACCT",
	title: "가입 완료 계정 상태",
	sourceText: "가입 완료 시 계정 상태 코드는 NORMAL로 설정한다.",
	sourceRef: {
		document: "NC 회원가입·탈퇴 정책서 Full v1.0 확정본",
		section: "POL-MBR-ACCT-001",
	},
	copy: {
		requirement: "가입이 정상 처리되었습니다",
		error: "계정 상태를 확인하지 못했습니다",
	},
});
