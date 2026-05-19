import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-MBR-FP-008-0",
	name: "Legacy · 본인인증 (휴면 해제 플로우)",
	label: "Legacy · 본인인증 (휴면 해제 플로우)",
	route: "/NOVA-MBR-FP-008-0",
	group: "nova-mbr-fp-legacy",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-17",
	domain: "mbr",
	node: {
		kind: "screen",
	},
	figma: {
		frameName: "NOVA-MBR-FP-008-0",
		width: 375,
		height: 812,
	},
	generation: {
		source: "SB",
		pattern: "form",
		policyRefs: [
			"POL-MBR-AUTH-001-01",
			"POL-MBR-AUTH-002-01",
			"POL-MBR-AUTH-002-05",
			"POL-MBR-AUTH-002-09",
			"POL-MBR-AUTH-003-01",
			"POL-MBR-AUTH-003-03",
			"POL-MBR-AUTH-004-01",
			"POL-MBR-AUTH-004-02",
			"POL-MBR-AUTH-005-01",
			"POL-MBR-AUTH-005-03",
			"POL-MBR-AUTH-005-07",
		],
		ognIds: ["ogn-mbr-auth-select", "ogn-mbr-auth-request"],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
		buildSelections: [
			{
				section: "intro",
				selected: "PageStackContents title slot + Text(sectionTitle)",
				source: "componentCandidates",
				reason:
					"휴면 해제 문맥을 알리는 얇은 leading 텍스트 한 줄을 title-only PageStackContents에 둠 — route CSS 없이 callout/hero가 아닌 muted intro. POL-MBR-AUTH-001-01 의도를 휴면 해제 문맥으로 표현하고 새 정책을 발명하지 않음. Component Spacing Review: intro는 authSelect와 별도 section으로 분리하고 PageStackContents가 inset/padding을 소유.",
			},
			{
				section: "authSelect",
				selected: "AuthSelect (ogn-mbr-auth-select)",
				source: "new-organism",
				reason:
					"FP-003-0와 동일 NEW OGN의 OGN 레벨 재사용. intro와 같은 PageStackContents에 섞지 않고 별도 data-section-id=authSelect section으로 배치한다. TitleSection + 단일 card surface + 3행 ListSelected(radio) + contents divider로 layoutContract/Distortion Gate 충족. Component Spacing Review: AuthSelect 내부 spacing은 shared OGN 컴포넌트들이 소유.",
				rejected: [
					{
						candidate: "RadioButton hand-stacked",
						reason:
							"card surface/contents divider/label scale 수동 재구성 + raw spacing 위험 — fit weak.",
					},
				],
			},
			{
				section: "authRequest",
				selected: "AuthRequest (ogn-mbr-auth-request)",
				source: "new-organism",
				reason:
					"FP-003-0와 동일 NEW OGN의 OGN 레벨 재사용. TextField inline actionButton + helperText 타이머 + 상태 메시지 + secondary 인증 확인으로 layoutContract/Distortion Gate(C1/C6) 충족. Component Spacing Review: authSelect와 authRequest 사이의 4px SectionDivider만 route가 배치하고 field/notice/action spacing은 OGN 내부 컴포넌트가 소유. Design Iteration 2026-05-18: shared AuthRequest internal VStack gap is gap-loose(16px), so FP-008's extra intro preserves visible intro/authSelect separation while keeping the secondary 인증 확인 action clear of the fixed Bottom CTA.",
				rejected: [
					{
						candidate: "Callout (state message)",
						reason:
							"calloutVariants에 tone 분기 없음 — cautionary vs negative 구분 불가, Diagram fallback에 따라 rqr-notice(Notice) tone으로 대체.",
					},
					{
						candidate: "bare Button (sibling resend)",
						reason:
							"actionPlacement: inline field action 위반 — 재요청 분리 + raw layout.",
					},
				],
				deviationReason:
					"componentCandidates의 Callout 대신 Notice(rqr-notice) tone 사용. Diagram이 명시한 'Callout tone 부족 시 rqr-notice' fallback, 정책 의미·레이아웃 의도 보존.",
			},
			{
				section: "actions",
				selected: "SinglePrimaryAction + ActionButton(primary)",
				source: "componentCandidates",
				reason:
					"AppScreen.Bottom(preset=primary-cta) 고정 rail + 단일 Primary solid '본인 확인 완료하기', 본인 확인 완료 전 disabled (POL-MBR-AUTH-001-01). route-level CSS 없음.",
			},
		],
	},
} as const satisfies ScreenRouteConfig);
