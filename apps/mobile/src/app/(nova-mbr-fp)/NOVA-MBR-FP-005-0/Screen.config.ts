import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-MBR-FP-005-0",
	name: "가입 완료",
	label: "가입 완료",
	route: "/NOVA-MBR-FP-005-0",
	group: "nova-mbr-fp",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-17",
	domain: "mbr",
	node: {
		kind: "screen",
	},
	figma: {
		frameName: "NOVA-MBR-FP-005-0",
		width: 375,
		height: 812,
	},
	generation: {
		source: "SB",
		pattern: "complete",
		policyRefs: [],
		ognIds: ["ogn-mbr-join-complete"],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
		buildSelections: [
			{
				section: "completeHero",
				selected: "PageStackContents + TitleMain(type=\"complete\")",
				source: "componentCandidates",
				reason:
					"DESIGN_PATTERNS Completion A의 Pagestack→TitleMain(Type=Complete) 구조와 1:1. TitleMain이 완료 메시지 displayTitle/subTitle rhythm을 component-owned로 소유해 route-level margin 보정 없이 layoutContract(result-hero, emphasisRule first-row-only)를 충족.",
			},
			{
				section: "joinSuccessNotice",
				selected: "RQRNotice(tone=\"positive\")",
				source: "componentCandidates",
				reason:
					"SB section-message-join-success positive와 1:1. component-owned surface/padding으로 hero보다 약한 보조 위계를 유지(Distortion Gate 2).",
			},
			{
				section: "completionSummary",
				selected: "RQRContentsDetail (conditional)",
				source: "componentCandidates",
				reason:
					"Summary Card Decision Rule: SB가 결과 key-value를 제공하지 않음(서버 제어 항목 -). card-key-value-summary capability(card surface/title slot/label-value rows/value wrap)를 component-owned로 보장하나, summaryRows 미제공 시 OGN 내부에서 미렌더(structural conditional). 임의 요금제/금액/적용일 발명 금지(Distortion Gate 8).",
				rejected: [
					{
						candidate: "RQRNotice + 수동 row 조합",
						reason:
							"Notice는 key-value label/value column stability를 보장하지 않아 Summary Card Decision Rule 위반.",
					},
				],
			},
			{
				section: "sessionErrorNotice",
				selected: "RQRNotice(tone=\"cautionary\")",
				source: "componentCandidates",
				reason:
					"SB section-message-session-error cautionary와 1:1. sessionError state에서만 렌더해 default success 안내와 배타(Distortion Gate 7). 별도 복구 UI 신설 없음(UXPT_RCV 비선정).",
			},
			{
				section: "homeAction",
				selected: "ActionButton (single) in AppScreen.Bottom(preset=\"primary-cta\")",
				source: "componentCandidates",
				reason:
					"단일 Solid Primary 홈 이동. Bottom physical rail은 Screen.tsx 소유, action 의미는 OGN. UXPT_BTN 화면당 Primary 1개·동사형 라벨('홈으로 이동하기'). DESIGN_PATTERNS Completion A Bottom ActionButton 393×102 component-owned, route-level spacing 없음.",
			},
		],
	},
} as const satisfies ScreenRouteConfig);
