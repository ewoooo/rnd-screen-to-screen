import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-MBR-FP-003-0",
	name: "Legacy · 본인인증 (가입 플로우)",
	label: "Legacy · 본인인증 (가입 플로우)",
	route: "/NOVA-MBR-FP-003-0",
	group: "nova-mbr-fp-legacy",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-17",
	domain: "mbr",
	node: {
		kind: "screen",
	},
	figma: {
		frameName: "NOVA-MBR-FP-003-0",
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
				section: "progress",
				selected: "ProgressAppBar (nova-mbr-fp pattern)",
				source: "new-component",
				reason:
					"FP 001/002/003 share the form-entry 가입 progress chrome. The progress header keeps step state in Header and avoids raw route-level chrome patches.",
			},
			{
				section: "authSelect",
				selected: "AuthSelect (ogn-mbr-auth-select)",
				source: "new-organism",
				reason:
					"TitleSection + 단일 card surface + 3행 ListSelected(type=radio), 행 사이 Divider(type=contents)로 layoutContract(compact list-row, selected-row-only emphasis, fixed order)와 Distortion Gate(카드 1면·contents divider·loading 동일 레이아웃 skeleton)를 충족. Component Spacing Review: AuthSelect 내부 card/list rhythm은 RQRCard, ListSelected, Divider(type=contents)가 소유하고 route는 SectionDivider만 배치.",
				rejected: [
					{
						candidate: "RadioButton hand-stacked",
						reason:
							"card surface/contents divider/label scale를 수동 wrapper로 재구성해야 하고 raw spacing 위험 — list-row 관례 손실로 fit weak.",
					},
				],
			},
			{
				section: "authRequest",
				selected: "AuthRequest (ogn-mbr-auth-request)",
				source: "new-organism",
				reason:
					"TextField(inputMode=numeric, maxLength=6, helperText, error, inline actionButton 재요청) + 상태 메시지 + 영역 내 secondary 인증 확인으로 layoutContract(단일 필드 + inline action + state message)와 Distortion Gate(C1 필드 에러 slot 소유, 재요청 inline, blocked 차단, 단일 Primary)를 충족. Component Spacing Review: FieldStack/TextField/Notice/ActionButton이 내부 spacing을 소유하고, route-level raw margin/padding 없음. Design Iteration 2026-05-18: shared AuthRequest internal VStack gap is gap-loose(16px), keeping the secondary 인증 확인 action inside Content and clear of Bottom rail when reused by FP-008 with intro.",
				rejected: [
					{
						candidate: "Callout (state message)",
						reason:
							"calloutVariants에 tone 분기가 없어 cautionary(만료, 복구가능) vs negative(실패/차단) 구분 불가 — Diagram 기록 fallback에 따라 rqr-notice(Notice) tone으로 대체.",
					},
					{
						candidate: "bare Button (sibling resend)",
						reason:
							"actionPlacement: inline field action 위반 — 재요청을 코드 필드에서 분리하고 raw layout 추가.",
					},
				],
				deviationReason:
					"componentCandidates의 Callout 대신 Notice(rqr-notice) tone 사용. Diagram이 'Callout tone 부족 시 rqr-notice 기록' 을 명시한 fallback이며 정책 의미·레이아웃 의도(상태 레벨 메시지, 만료=cautionary/실패=negative) 보존.",
			},
			{
				section: "actions",
				selected: "SinglePrimaryAction + ActionButton(primary)",
				source: "componentCandidates",
				reason:
					"AppScreen.Bottom(preset=primary-cta) 고정 rail + 단일 Primary solid '본인인증 완료하기', 본인인증 완료 전 disabled (POL-MBR-AUTH-001-01). route-level CSS 없이 rail 계약 충족.",
			},
		],
	},
} as const satisfies ScreenRouteConfig);
