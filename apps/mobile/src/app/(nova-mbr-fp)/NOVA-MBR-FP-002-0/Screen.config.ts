import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-MBR-FP-002-0",
	name: "개인정보 입력",
	label: "개인정보 입력",
	route: "/NOVA-MBR-FP-002-0",
	group: "nova-mbr-fp",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-17",
	domain: "mbr",
	node: {
		kind: "screen",
	},
	figma: {
		frameName: "SB-MBR-UC01_02-0513 / NOVA-MBR-FP-002-0",
		width: 375,
		height: 812,
	},
	generation: {
		source: "SB",
		pattern: "form",
		policyRefs: [
			"POL-MBR-INFO-002-03",
			"POL-MBR-INFO-002-04",
			"POL-MBR-INFO-002-05",
			"POL-MBR-INFO-002-06",
			"POL-MBR-INFO-002-08",
		],
		ognIds: ["ogn-mbr-member-input", "ogn-mbr-entry-check"],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
		buildSelections: [
			{
				section: "progress",
				selected: "ProgressAppBar (NEW pattern: cx-components AppBar + token-styled progress track)",
				source: "new-component",
				reason:
					"cx-components app-bar has no progress slot; pat-mbr-fp-progress-app-bar composes AppBar (back+title chrome) with a semantic-token progress bar so the multi-step path stays in Header chrome without route-level CSS. FP 001/002/003 use the same progress header convention.",
				rejected: [
					{
						candidate: "app-bar (cx-components, title+back only)",
						reason:
							"Owns back+title but not step progress; attaching progress via wrapper/raw CSS would distort the chrome contract (Diagram componentCandidates fit=weak).",
					},
				],
			},
			{
				section: "memberInput",
				selected: "PageStackContents + TitleSection + ogn-mbr-member-input(FieldStack + TextField x5)",
				source: "new-organism",
				reason:
					"Single FieldStack semantic group under a TitleSection group title (C4). TextField owns label/helperText/error/actionButton/maxLength/inputMode/type natively; inline 중복확인 uses TextField.actionButton slot. Per-field INFO-002 validation errors live in each TextField error/help slot (C1). Component Spacing Review: PageStackContents and FieldStack own the section/field rhythm; no route-level spacing compensation.",
				rejected: [
					{
						candidate: "raw <input> / route-level field layout",
						reason:
							"Lacks TextField validation slots/states, forces route-level CSS, breaks the form-field-group semantic unit (Diagram fit=reject).",
					},
				],
			},
			{
				section: "inputError",
				selected: "ogn-mbr-member-input submit-level Notice(RQRNotice tone=negative)",
				source: "componentCandidates",
				reason:
					"Field-adjacent inline errors are first priority (UXPT_ERR_1). The single negative Notice is limited to the 필수값 누락 종합 (E1) that cannot bind to one field; duplicate (E3/E4/E5) copy is server-provided and not authored (SB-only). Component Spacing Review: data-section-id=inputError remains adjacent inside the memberInput OGN, hidden until the state is active, and Notice owns its own padding/radius.",
			},
			{
				section: "entryCheck",
				selected: "ogn-mbr-entry-check (reserved, visible=false → renders null)",
				source: "new-organism",
				reason:
					"INFO-003 absent (Screen.map.md B-2). Conditional/out-of-state OGN is not surfaced in the default wire and no SectionDivider is rendered before it. visible=false or missing server message returns null, so the default screen has zero spacing and no placeholder copy. blocked-from-config: excluded from policyRefs, included in ognIds.",
			},
			{
				section: "actions",
				selected: "AppScreen.Bottom(preset=\"primary-cta\") + SinglePrimaryAction + ActionButton",
				source: "componentCandidates",
				reason:
					"Single Solid Primary `다음` in the fixed bottom rail (UXPT_BTN_3/4, C6). CTA kept out of scroll content; no second Primary.",
			},
		],
	},
} as const satisfies ScreenRouteConfig);
