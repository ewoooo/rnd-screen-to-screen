import { defineScreenConfig } from "@pxds/cx-spec";
import type { ScreenRouteConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-MBR-FP-001-0",
	name: "약관 동의",
	label: "약관 동의",
	route: "/NOVA-MBR-FP-001-0",
	group: "nova-mbr-fp",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-17",
	domain: "mbr",
	node: {
		kind: "screen",
	},
	figma: {
		frameName: "NOVA-MBR-FP-001-0",
		width: 375,
		height: 812,
	},
	generation: {
		source: "SB",
		pattern: "form",
		policyRefs: [
			"POL-MBR-TERM-001-06",
			"POL-MBR-TERM-002-01",
			"POL-MBR-TERM-002-05",
		],
		ognIds: [
			"ogn-mbr-term-list",
			"ogn-mbr-term-agree",
			"ogn-mbr-guardian-input",
			"ogn-mbr-guardian-result",
		],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
		buildSelections: [
			{
				section: "progress",
				selected: "ProgressAppBar (nova-mbr-fp pattern)",
				source: "new-component",
				reason:
					"FP 001/002/003 now share the form-entry 가입 progress chrome. The pattern composes cx-components AppBar with a token-styled progress track, keeping step state in Header instead of route-level layout.",
			},
			{
				section: "termList",
				selected: "TermList (Accordion + Divider contents)",
				source: "new-organism",
				reason:
					"choice-list 행 + 행 사이 contents Divider + 기본 접힘 약관 전문 Accordion으로 layoutContract를 보존한다. 약관 항목/전문은 SB-only 구조 표시만이며 정책 copy를 발명하지 않는다. loading=동일 레이아웃 skeleton(LOD_2), error=인접 Notice(ERR_1).",
				rejected: [
					{
						candidate: "ListSelected",
						reason:
							"약관 전문 펼침 동작 미소유. wrapper 추가 시 distortion 위험(weak).",
					},
				],
			},
			{
				section: "termAgree",
				selected: "TermAgree (Checkbox + Divider contents + Notice)",
				source: "new-organism",
				reason:
					"전체 동의 → contents Divider → 개별 필수/선택 Checkbox 순서 고정(C5). all-agree만 sectionTitle 강조(first-row-only), 개별 행 listTitle 균일. 필수 미동의 그룹 에러는 동의 그룹 인접 negative Notice(C1/ERR_1), 진행 Primary는 Bottom 단일(BTN_4).",
				rejected: [
					{
						candidate: "Callout(negative)",
						reason:
							"인라인 그룹 에러보다 강한 강조 surface로 ERR_1 인접 의도와 어긋남(weak).",
					},
				],
			},
			{
				section: "guardianInput",
				selected: "GuardianInput (Callout + FieldStack + ActionButton)",
				source: "new-organism",
				reason:
					"visible=false 시 hidden marker 렌더로 mounted-hidden 계약과 레이아웃 보존(divider/spacing 점유 0)을 함께 충족한다. info Callout(REQ-003 유효시간 원문) + 이름/연락처 FieldStack + 발송 ActionButton은 secondary 위계로 Bottom Primary와 분리(BTN_4). 인증수단(SB-only)은 단정하지 않고 필드 구조만 유지.",
			},
			{
				section: "guardianResult",
				selected: "GuardianResult (Callout / Notice + Button)",
				source: "new-organism",
				reason:
					"visible=false 기본으로 hidden marker를 렌더해 out-of-state mounted-hidden section id를 보존하고 초기 레이아웃 영향은 0으로 유지한다. 만료 시 negative Notice(REQ-003 error 원문) + 재요청 Button은 보조 위계로 Bottom Primary와 시각 경쟁 금지(BTN_4).",
			},
			{
				section: "actions",
				selected: 'AppScreen.Bottom(preset="primary-cta") + ActionButton primary',
				source: "componentCandidates",
				reason:
					"화면 진행 Primary 1개를 fixed Bottom rail이 소유(C6/BTN_4_RULE_2). 필수 약관 미동의 시 disabled, 진행 시도 시 term-agree 인접 안내. CTA를 Content 마지막에 두지 않는다. Component Spacing Review: 001 순서는 termList → SectionDivider → termAgree → guardianInput/guardianResult mounted-hidden marker → Bottom CTA로 Diagram과 일치하며, route-level raw margin/padding/font-size/color 보정 없이 PageStackContents, SectionDivider, RQRCard, Divider(contents), VStack gap이 spacing을 소유한다.",
			},
		],
	},
} as const satisfies ScreenRouteConfig);
