import { definePolicy } from "../../../src/policy";

export default definePolicy({
	id: "POL-MBR-AUTH-002-09",
	parent: "POL-MBR-AUTH-002",
	domain: "MBR",
	group: "AUTH",
	title: "인증수단 노출 순서",
	sourceText: "인증수단은 휴대폰, PASS, 공동인증서 순서로 노출한다.",
	sourceRef: {
		document: "SB-MBR-UC01_02-0513",
		section: "ogn-mbr-auth-select",
	},
	copy: {
		requirement: "휴대폰, PASS, 공동인증서 순서",
		error: "인증수단 노출 순서를 확인해 주세요",
	},
});
