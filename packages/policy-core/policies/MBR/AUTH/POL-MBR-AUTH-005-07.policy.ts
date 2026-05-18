import { definePolicy } from "../../../src/policy";

export default definePolicy({
	id: "POL-MBR-AUTH-005-07",
	parent: "POL-MBR-AUTH-005",
	domain: "MBR",
	group: "AUTH",
	title: "인증 실패 안내 문구",
	sourceText: "인증 실패 시 재시도 또는 제한 처리 안내 문구를 노출한다.",
	sourceRef: {
		document: "SB-MBR-UC01_02-0513",
		section: "ogn-mbr-auth-request",
	},
	copy: {
		requirement: "실패 시 재시도 또는 제한 처리 안내",
		error: "인증번호를 확인하거나 잠시 후 다시 시도해 주세요",
	},
});
