import { defineScreenConfig } from "@pxds/cx-spec";
import type { ScreenRouteConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-MBR-FP-009-0",
	name: "Legacy · 약관 동의",
	label: "Legacy · 약관 동의 (휴면 재동의)",
	route: "/NOVA-MBR-FP-009-0",
	group: "nova-mbr-fp-legacy",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-17",
	domain: "mbr",
	node: {
		kind: "screen",
	},
	figma: {
		frameName: "NOVA-MBR-FP-009-0",
		width: 375,
		height: 812,
	},
	generation: {
		source: "SB",
		pattern: "form",
		policyRefs: ["POL-MBR-TERM-001-06"],
		ognIds: ["ogn-mbr-term-list", "ogn-mbr-term-agree"],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
		buildSelections: [
			{
				section: "intro",
				selected: "PageStackContents title + Text(bodySubtle)",
				source: "existing-composition",
				reason:
					"재동의 컨텍스트 안내는 structural-only(OGN 아님). 제목 + muted 본문 status-message density로 유지하고 callout surface를 쓰지 않아 상태 과장을 막는다(VOT_RUL 해요체, 정책 copy 발명 금지).",
				rejected: [
					{
						candidate: "Callout",
						reason:
							"authComplete reference는 callout surface 없음 — 강조 과다로 상태 과장 distortion(weak).",
					},
				],
			},
			{
				section: "termList",
				selected: "TermList (Accordion + Divider contents)",
				source: "new-organism",
				reason:
					"재동의 노출 1..N 약관 항목 + 행 사이 contents Divider + 기본 접힘 약관 전문 Accordion으로 layoutContract 보존. SB-only 구조 표시만, 정책 copy 발명 금지. loading=동일 레이아웃 skeleton(LOD_2), error=인접 Notice(ERR_1).",
			},
			{
				section: "termAgree",
				selected: "TermAgree (Checkbox + Divider contents + Notice)",
				source: "new-organism",
				reason:
					"전체 동의 → contents Divider → 개별 항목 순서 고정(C5). all-agree만 강조(first-row-only), 개별 행 listTitle 균일. TermAgree root sectionId는 Diagram의 termAgreeSection으로 노출하고, 필수 미동의 그룹 에러는 인접 negative Notice(C1/ERR_1)와 termAgreeError DOM anchor를 소유한다. 진행 Primary는 Bottom 단일(BTN_4). 뒤로 시 동의 입력 보존(NAV_2).",
			},
			{
				section: "actions",
				selected: 'AppScreen.Bottom(preset="primary-cta") + ActionButton primary',
				source: "componentCandidates",
				reason:
					"화면 진행 Primary 1개를 fixed Bottom rail이 소유(C6/BTN_4_RULE_2) → FP-010. 필수 약관 미동의 상태에서는 Screen이 진행을 차단하고 term-agree 인접 negative Notice를 노출한 뒤 해당 오류 위치로 scrollIntoView 한다(REQ-001/ERR_1). CTA를 Content 마지막에 두지 않고 route-level spacing 보정도 쓰지 않는다. Component Spacing Review: 009 순서는 intro → SectionDivider → termList → SectionDivider → termAgreeSection/termAgreeError → Bottom CTA로 Diagram과 일치하며, route-level raw margin/padding/font-size/color 보정 없이 PageStackContents, SectionDivider, RQRCard, Divider(contents), VStack gap이 spacing을 소유하고 guardian OGN은 추가하지 않았다.",
			},
		],
	},
} as const satisfies ScreenRouteConfig);
