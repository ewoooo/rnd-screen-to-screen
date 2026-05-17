# NOVA-MBR-FP-008-0 — 본인인증

## Screen Contract

- screenId: `NOVA-MBR-FP-008-0`
- route: `/NOVA-MBR-FP-008-0`
- group: `nova-mbr-fp`
- domain: `mbr`
- pattern: `form`
- policyRefs: `POL-MBR-AUTH-001-01`, `POL-MBR-AUTH-002-01`, `POL-MBR-AUTH-002-05`, `POL-MBR-AUTH-002-09`, `POL-MBR-AUTH-003-01`, `POL-MBR-AUTH-003-03`, `POL-MBR-AUTH-004-01`, `POL-MBR-AUTH-004-02`, `POL-MBR-AUTH-005-01`, `POL-MBR-AUTH-005-03`, `POL-MBR-AUTH-005-07`
- OGN refs: `ogn-mbr-auth-select`, `ogn-mbr-auth-request`
- appliedGovernanceRefs: `UXPT_BTN`, `UXPT_ERR`, `UXPT_NAV`, `UXPT_LOD`, `VOT_RUL`
- AppScreen slots: `SystemHeader`, `Header`, `Content`, `Bottom`
- header: `AppBar(title="본인인증")` (휴면 해제 전 본인확인 context — not a 회원 가입 step)
- bottom: `Bottom(preset="primary-cta")`
- visible primary CTA: `인증 완료`, disabled until verification succeeds, owned by `MbrFpActionBar`
- visible content sections: `intro`, `authMethod`, `authRequest`
- chrome organisms: `FpPageHeader` (intro), `MbrFpActionBar` (bottom CTA)
- contextNote: shares the auth select/request OGNs and the full 11-policy contract with NOVA-MBR-FP-003-0. Only the entry context (휴면 해제 전 본인확인 vs 회원 가입), the Header context, the intro copy, and the downstream transition (NOVA-MBR-FP-009-0) differ.
- wireReference:
  - source: `apps/mobile/src/app/(nova-mbr-legacy)/NOVA-MBR-PG-003-0/Screen.diagram.md`
  - matchedParts: AppScreen rail (`SystemHeader` / `Header` / `Content(scroll)` / `Bottom(preset="primary-cta")`); intro title+subtitle section; auth-method radio choice list inside one card; 인증번호 numeric field with 유효시간 타이머 and secondary 재요청 / primary 인증번호 요청 controls; fixed bottom disabled `인증 완료` CTA
  - intentionalDifferences: legacy PG-003-0 is a 회원 가입 step folding method list, code field, timer, and request controls into one `ogn-mbr-list-cell-auth-method`; this screen separates policy ownership into `ogn-mbr-auth-select` and `ogn-mbr-auth-request`, adds policy-bound expiry/limit/block notice states, and reframes the entry context as 휴면 해제 전 본인확인 (intro copy `휴면 상태를 해제하려면…`, Header title `본인인증`).
  - limitation: reference-only visual structure; policy refs, OGN ids, route, copy, and error states come from `Screen.map.md` and SB. Legacy reference omits the resend cooldown/limit and fail-limit/block notice states that policy requires here; legacy 회원 가입 framing does not apply to this dormancy-release context.

## Screen Wire

```txt
┌─AppScreen 375×812─────────────────────────────────────┐
├─SystemHeader──────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│                                                        │
├─Header────────────────────────────────────────────────┤
│                                                        │
│   ‹   본인인증                                        │
├─Content(scroll)───────────────────────────────────────┤
│                                                        │
│ [intro | page-header | section]                       │
│   본인인증                                            │
│   휴면 상태를 해제하려면 본인인증을 완료해 주세요     │
│                                                        │
│ [authMethod | choice-list | card]                     │
│   ┌────────────────────────────────────────────────┐   │
│   │ ● 휴대폰                                       │   │
│   │ ────────────────────────────────────────────── │   │
│   │ ○ PASS                                         │   │
│   │ ────────────────────────────────────────────── │   │
│   │ ○ 공동인증서                                   │   │
│   └──────────────────────── auth method list ──────┘   │
│   휴대폰, PASS, 공동인증서로 인증할 수 있어요         │
│                                                        │
│ [authRequest | form-verify | section]                 │
│   6자리 인증번호를 입력해 주세요                      │
│   ┌────────────────────────────────────────────────┐   │
│   │ 인증번호 6자리                       유효 02:48 │   │
│   └──────────────── numeric field + timer ──────────┘   │
│   인증번호는 3분 동안 유효해요                        │
│   ┌──────────────────────┐ ┌───────────────────────┐  │
│   │     인증번호 재요청   │ │       인증 확인       │  │
│   └── secondary button ──┘ └──── primary button ───┘  │
│   ┌────────────────────────────────────────────────┐   │
│   │ ⚠ 유효시간이 만료되어 다시 요청해 주세요       │   │
│   └──────────── cautionary notice (expired) ───────┘   │
│   ┌────────────────────────────────────────────────┐   │
│   │ ⊘ 인증 실패 한도(5회)를 초과했어요             │   │
│   │   10분 후 다시 시도해 주세요                   │   │
│   └──────────── negative notice (blocked) ──────────┘   │
│                                                        │
├─Bottom(preset="primary-cta")──────────────────────────┤
│ [actions | bottom-primary-action | bottom-fixed]      │
│   ┌────────────────────────────────────────────────┐   │
│   │                    인증 완료                   │   │
│   └──────────────────── disabled primary CTA ──────┘   │
└────────────────────────────────────────────────────────┘
```

## Section Contracts

### [intro]

- slot: `Content`
- OGN: chrome `FpPageHeader` (no policy OGN id; supports the auth-request task)
- role: Introduce the dormancy-release identity verification step and set the task before the method choice list.
- visibleTitle: `본인인증`
- visibleContent: `휴면 상태를 해제하려면 본인인증을 완료해 주세요`
- policy: surfaces `POL-MBR-AUTH-001-01` (본인인증 적용) applied in the 휴면 해제 전 본인확인 context per `Screen.map.md`
- appliedGovernanceRefs: `UXPT_NAV`, `VOT_RUL`
- patternEvidence:
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography:
    - rowTitle: `Text(sectionTitle)`
    - rowCaption: `Text(bodySubtle)`
    - emphasisRule: `first-row-only`
    - controlLabelScale: `matches-reference`
- patternDecision:
  - pattern: `PageStackContents` page header (title + subtitle)
  - reason: single title plus one subtitle line below `Header`; no card, divider, or field; identical structure to FP-003-0 with dormancy-release-framed copy.
- ognBoundaryDecision:
  - boundary: `chrome-only`
  - configOgnId: none
  - owner: `FpPageHeader` in FP chrome; it may use `PageStackContents`, but this claim applies only to the page header chrome
  - decision: keep intro outside policy `ognIds`; it frames the dormancy-release auth task without owning auth state or validation
- layoutStrategy:
  - widthTier: `content-361`
  - padding: DESIGN_FOUNDATION page-header spacing tier; no route-level margin
  - stack: `vertical`
  - alignment: `leading`
  - typography: section title precedes muted subtitle
  - wrapping: subtitle may wrap to 2 lines; title stays one line
  - overflow: `multiline`
- layoutContract:
  - role: open the verification step and frame the task as a dormancy-release requirement
  - structure: section title + one muted subtitle line
  - alignment: `leading`
  - density: comfortable page-header density, no card boundary
  - wrapping: subtitle may wrap, title column stable
  - distortionRisk: collapsing the intro into the AppBar, expanding it with policy prose, or reverting to 회원 가입 framing breaks the dormancy-release context
- componentCandidates:
  - name: `SectionHeaderPage` (`ogn-mbr-section-header-page`)
    source: existing organism — `apps/mobile/src/organisms/nova-mbr-legacy/section-header-page`
    fit: `strong`
    reason: existing organism already owns exactly this surface — a `title` + optional `subTitle` page header with no route-level layout; capability is functionally equivalent to the intro contract (page-header role, leading stack, title-then-muted-subtitle hierarchy, subtitle-may-wrap). This is the established precedent for the page-intro pattern family.
    risk: registered under the `nova-mbr-legacy` group with id `ogn-mbr-section-header-page`; the FP route-group expresses this as non-policy chrome, so reuse here is structural-equivalent rather than the same registered organism
  - name: `FpPageHeader` (chrome page-header organism)
    source: chrome organism vocabulary (this screen's OGN model)
    fit: `strong`
    reason: same title + subtitle page-intro capability as `SectionHeaderPage`, expressed as FP route-group chrome with no policy OGN id; chosen implementation because it is the FP-group chrome surface this screen already declares
    risk: title/subtitle typography hierarchy must stay page-header scale, not section-list scale; it duplicates `SectionHeaderPage` capability under a different group identifier
  - name: generic stacked `Text` pair in route
    source: layout capability comparison
    fit: `reject`
    risk: scatters basic components into the route and loses the named page-header slot
- deviationReason: `FpPageHeader` is functionally equivalent to the existing `SectionHeaderPage` (`ogn-mbr-section-header-page`); it is re-expressed as FP route-group non-policy chrome only because this screen belongs to a different route-group with separate chrome identifiers — a recognized reuse-equivalent duplication, not a new capability. FP-008-0 shares this OGN/policy contract with FP-003-0 and differs only in the 휴면 해제 전 본인확인 entry context.
- distortionRisk: low; risk appears only if dormancy-release intro copy is swapped for signup/legacy step copy or policy prose

### [authMethod]

- slot: `Content`
- OGN: `ogn-mbr-auth-select`
- role: Present the policy-allowed identity verification methods (휴대폰, PASS, 공동인증서) in fixed order and capture the single selected method.
- visibleContent: radio choice list with three rows in fixed policy order separated by row dividers, plus a supporting caption that the three methods are available
- policy: `POL-MBR-AUTH-002-01` (allowed methods), `POL-MBR-AUTH-002-05` (default 3 methods), `POL-MBR-AUTH-002-09` (fixed order)
- appliedGovernanceRefs: `UXPT_LOD`, `VOT_RUL`
- patternEvidence:
  - sectionBoundary: `cardBoundary`
  - fieldGrouping: `single`
  - rowSeparators: `Divider(type="contents")`
  - actionPlacement: `none`
  - typography:
    - rowTitle: `Text(listTitle)`
    - rowCaption: `Text(helper)`
    - emphasisRule: `selected-row-only`
    - controlLabelScale: `matches-reference`
- patternDecision:
  - pattern: choice-list card — `ogn-mbr-auth-select` owns radio rows + contents dividers (cx `RadioButton/Divider/Text` inside `Box/HStack/VStack`)
  - reason: 3 mutually exclusive method rows inside one card surface with 1px row separators; selection state is single-choice. Loading state replaces rows with skeleton (`UXPT_LOD`). Identical contract to FP-003-0 (shared OGN).
- ognBoundaryDecision:
  - boundary: `policy-ogn-owned`
  - configOgnId: `ogn-mbr-auth-select`
  - owner: `AuthSelect`; owns only method selection, fixed policy order, selection state, card surface, and skeleton loading
  - decision: shared with FP-003-0; do not merge with `ogn-mbr-auth-request` or move rows into the route because this boundary preserves `POL-MBR-AUTH-002-*`
- layoutStrategy:
  - widthTier: `content-361`
  - padding: card inner padding tier from DESIGN_PATTERNS; row separators are contents dividers, not card padding
  - stack: `vertical` (radio rows), each row `horizontal` (control + label)
  - alignment: `leading`
  - typography: each row title at list-title scale; only the selected row carries selected emphasis
  - wrapping: method labels stay one line (fixed policy terms)
  - overflow: `truncate` is not expected; labels are fixed policy terms
- layoutContract:
  - role: let the user pick exactly one allowed verification method in fixed policy order
  - structure: card + 3 radio rows + contents dividers + supporting caption
  - alignment: leading control then label; radio column stays stable
  - density: matches the legacy auth-method list density (one card, 1px row separators)
  - wrapping: row labels do not wrap; caption may wrap below the card
  - distortionRisk: reordering rows, dropping the fixed order, replacing the card surface with bare rows, or letting any non-selected row read as a section title
- componentCandidates:
  - name: `ListCellAuthMethod` (`ogn-mbr-list-cell-auth-method`)
    source: existing organism — `apps/mobile/src/organisms/nova-mbr-legacy/list-cell-auth-method`
    fit: `reject`
    reason: strong vocabulary precedent — this organism already implements the verified visual pattern this section needs: a single bordered card holding radio-button method rows separated by `Divider(type="contents")`, with `Text(listTitle)` row titles and single-choice selection. The choice-list card structure, alignment, density, and 1px row separators are exactly the established convention.
    risk: rejected for full reuse on a capability boundary, not on layout: this one organism merges method selection AND the code field / resend / request controls into a single contract (`RadioButton` card plus `TextField` plus secondary/primary button grid in one component). SB requires method choice and code request as two separately policy-owned OGNs (`ogn-mbr-auth-select` ↔ `POL-MBR-AUTH-002-*` vs `ogn-mbr-auth-request` ↔ `POL-MBR-AUTH-001/003/004/005-*`); one merged organism cannot satisfy a two-OGN policy contract that the verifier enforces by exact `generation.ognIds` ↔ organism config `id` match. Its radio-card sub-pattern is a strong precedent for the new `AuthSelect`.
  - name: cx `RadioButton` + `Divider(type="contents")` + `Text` inside `Box`/`HStack`/`VStack`
    source: `@pxds/cx-components` + `@pxds/cx-layout/primitives`
    fit: `medium`
    reason: these are the exact base components the precedent `ListCellAuthMethod` already composes for the radio-card structure; they directly support the card surface, contents-divider rows, radio control + list-title label, and single-choice selection
    risk: composed directly in the route they scatter basic controls and lose fixed-policy-order ownership and the skeleton-loading contract; they must be encapsulated inside the `ogn-mbr-auth-select` organism, not the route
  - name: `AuthSelect` (`ogn-mbr-auth-select`, this screen's OGN model)
    source: this screen's OGN model (Phase 4 build target)
    fit: `strong`
    reason: organism owns the policy-ordered radio list, card surface, contents dividers, single-choice selected state, and skeleton loading as one contract scoped to the `POL-MBR-AUTH-002-*` policy set only; it carries forward the proven `ListCellAuthMethod` radio-card sub-pattern while satisfying the SB single-policy-OGN boundary
    risk: row title typography must stay list-title scale; skeleton must preserve row count/order; the radio-card structure must match the `ListCellAuthMethod` precedent rather than diverge
- deviationReason: SB-MBR-UC01_02-0513 defines identity-method selection and verification-code request as two separate domain OGN ids (`ogn-mbr-auth-select` ↔ `POL-MBR-AUTH-002-*`, `ogn-mbr-auth-request` ↔ `POL-MBR-AUTH-001/003/004/005-*`); the existing `ListCellAuthMethod` (`ogn-mbr-list-cell-auth-method`) merges both into one organism and cannot satisfy a two-OGN policy contract the verifier enforces by exact `generation.ognIds` ↔ organism config `id` match, so a split `AuthSelect` is newly built in the FP group while reusing the proven radio-card sub-pattern. FP-008-0 shares this OGN/policy contract with FP-003-0 and differs only in the 휴면 해제 전 본인확인 entry context. (genuine policy-boundary separation)
- distortionRisk: medium; policy order and single-card boundary are easy to distort if rows are built outside the OGN

### [authRequest]

- slot: `Content`
- OGN: `ogn-mbr-auth-request`
- role: Send/verify the 6-digit code: prompt copy, numeric code field with a 3-minute validity timer, resend (60s cooldown, max 5) secondary action, confirm primary action, and policy-bound expiry/limit/block notice states.
- visibleContent: prompt copy, 6-digit numeric `TextField` with inline 유효시간 타이머, validity caption, `인증번호 재요청` secondary button + `인증 확인` primary button, and conditional notices — cautionary on expiry, negative on resend-limit / fail-limit / 10-minute block
- policy: `POL-MBR-AUTH-001-01`, `POL-MBR-AUTH-003-01`, `POL-MBR-AUTH-003-03`, `POL-MBR-AUTH-004-01`, `POL-MBR-AUTH-004-02`, `POL-MBR-AUTH-005-01`, `POL-MBR-AUTH-005-03`, `POL-MBR-AUTH-005-07`
- appliedGovernanceRefs: `UXPT_BTN`, `UXPT_ERR`, `UXPT_LOD`, `VOT_RUL`
- patternEvidence:
  - sectionBoundary: `none`
  - fieldGrouping: `single`
  - rowSeparators: `none`
  - actionPlacement: `Content` (in-section verify controls) — `inline field action` for the validity timer rendered inside the code field
  - typography:
    - rowTitle: `Text(sectionTitle)`
    - rowCaption: `Text(helper)`
    - emphasisRule: `none`
    - controlLabelScale: `matches-reference`
- patternDecision:
  - pattern: form-verify section — `ogn-mbr-auth-request` owns prompt + `TextField` (with inline timer) + secondary/primary buttons + `Notice` states (cx `TextField/Button/Notice/Text`)
  - reason: a single verification field group with two action buttons and conditional notices that must not displace the bottom CTA. Timer lives inside the field (inline field action), not as a separate row, so it cannot be confused with a contents divider. Resend cooldown/limit and fail-limit/block are notice states bound to policy, shown only in their state. Shared OGN with FP-003-0; only the entry context differs.
  - sourceCompleteness: `under-specified-proof`
  - establishedConvention:
    - patternFamily: `form-verify-section`
    - primaryCandidate: `AuthRequest` (`ogn-mbr-auth-request`)
    - evidence: legacy NOVA-MBR-PG-003-0 auth-method section (code field + timer + resend/request controls)
    - confidence: medium
  - decisionRequired:
    - question: does the legacy proof's lack of explicit resend-cooldown/fail-block notices mean those states are out of scope?
    - defaultAssumption: no — `Screen.map.md` policy refs (`POL-MBR-AUTH-004-01/02`, `POL-MBR-AUTH-005-01/03/07`) require these notice states; the legacy proof is under-specified, so the OGN owns them as conditional notices.
- ognBoundaryDecision:
  - boundary: `policy-ogn-owned`
  - configOgnId: `ogn-mbr-auth-request`
  - owner: `AuthRequest`; owns code request/verify state, inline timer, resend/confirm actions, expiry/limit/block notices
  - decision: shared with FP-003-0 but dormancy-context framed; keep verification feedback inside this OGN and do not claim `PageStackContents` for this body section
- layoutStrategy:
  - widthTier: `content-361`
  - padding: form section spacing tier from DESIGN_PATTERNS; notices sit below the action row, never overlapping it
  - stack: `vertical` — prompt → field(+inline timer) → caption → button row → conditional notice
  - alignment: `leading`; button row `split` (secondary | primary)
  - typography: prompt at section-title scale, caption at helper scale, notice copy at notice scale
  - wrapping: notice copy may wrap to 2 lines; field value (6 digits) stays one line; timer stays inline-right
  - overflow: `multiline` for notices; notices push subsequent flow downward inside scroll Content, never over the fixed Bottom CTA
- layoutContract:
  - role: capture and verify the 6-digit code with timer, resend, confirm, and policy error/limit/block feedback
  - structure: prompt + numeric field with inline timer + validity caption + secondary/primary button row + conditional notice band
  - alignment: leading stack; action row split into secondary then primary
  - density: matches legacy auth code+timer+controls density; one field group, no card boundary
  - wrapping: notices wrap below the action row; timer stays inline within the field
  - distortionRisk: an expiry/limit/block notice growing tall enough to push the verify controls under the fixed Bottom CTA, or the timer being split out as a separate divided row that reads like a section separator
- componentCandidates:
  - name: `ListCellAuthMethod` (`ogn-mbr-list-cell-auth-method`)
    source: existing organism — `apps/mobile/src/organisms/nova-mbr-legacy/list-cell-auth-method`
    fit: `reject`
    reason: strong vocabulary precedent for the code-request controls — this organism already composes a numeric `TextField(maxLength=6, inputMode="numeric")` with an inline 유효시간 helper and a two-button grid (secondary 재요청 | primary request) in a verified split row. The field-group structure, timer-in-field treatment, and split button row are exactly the established convention for this section.
    risk: rejected for full reuse on a capability boundary: the same organism also owns the method-selection radio card, so it cannot be the `ogn-mbr-auth-request` organism without also pulling in `ogn-mbr-auth-select` responsibilities; SB requires these as two separately policy-owned OGNs and the verifier enforces exact `generation.ognIds` ↔ organism config `id` match. It also lacks the policy-bound expiry / resend-limit / fail-limit / 10-minute-block `Notice` states (`POL-MBR-AUTH-004-01/02`, `POL-MBR-AUTH-005-01/03/07`), which the legacy proof is under-specified for. Its code-field + timer + dual-button sub-pattern is a strong precedent for the new `AuthRequest`.
  - name: cx `TextField` + `Button` + `Notice` + `Text` inside layout primitives
    source: `@pxds/cx-components` + `@pxds/cx-layout/primitives`
    fit: `medium`
    reason: these are the exact base components the precedent `ListCellAuthMethod` already composes for the code field + split button row, plus `Notice` for the policy state band the precedent lacks; they directly support the prompt, numeric field with inline timer, validity caption, secondary/primary split row, and conditional notices
    risk: composed directly in the route they spread the verification state machine and notice rules across the route, risking timer/divider confusion and CTA overlap; they must be encapsulated inside the `ogn-mbr-auth-request` organism, not the route
  - name: `AuthRequest` (`ogn-mbr-auth-request`, this screen's OGN model)
    source: this screen's OGN model (Phase 4 build target)
    fit: `strong`
    reason: organism owns the field + inline timer + dual buttons + state-bound cautionary/negative notices and the default/loading/error/blocked state machine as one contract scoped to the `POL-MBR-AUTH-001/003/004/005-*` policy set only; it carries forward the proven `ListCellAuthMethod` code-field + timer + dual-button sub-pattern while adding the policy-required notice states and honoring the SB single-policy-OGN boundary
    risk: notice height must stay within scroll Content and never overlay the fixed Bottom CTA; timer must remain inline field action
- deviationReason: SB-MBR-UC01_02-0513 defines verification-code request as a domain OGN (`ogn-mbr-auth-request` ↔ `POL-MBR-AUTH-001/003/004/005-*`) separate from method selection (`ogn-mbr-auth-select` ↔ `POL-MBR-AUTH-002-*`); the existing `ListCellAuthMethod` (`ogn-mbr-list-cell-auth-method`) merges both into one organism and omits the policy-required expiry/resend-limit/fail-block notice states, so a split `AuthRequest` is newly built in the FP group while reusing the proven code-field + timer + dual-button sub-pattern. FP-008-0 shares this OGN/policy contract with FP-003-0 and differs only in the 휴면 해제 전 본인확인 entry context. (genuine policy-boundary separation)
- distortionRisk: high; error/expiry/block notices and the dual action row are the most likely place for layout collision with the fixed bottom CTA

### [actions]

- slot: `Bottom`
- OGN: chrome `MbrFpActionBar` (bottom primary CTA; no policy OGN id)
- role: Own the fixed verification-complete action; disabled until `ogn-mbr-auth-request` reports a successful verification, then hands off to NOVA-MBR-FP-009-0 (dormancy-release next step).
- visibleContent: disabled primary CTA `인증 완료`
- policy: progression gated by the auth-request verification result; completion handoff is SB-defined (NOVA-MBR-FP-009-0)
- appliedGovernanceRefs: `UXPT_BTN`, `UXPT_NAV`
- patternEvidence:
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `Bottom(preset="primary-cta")`
  - typography:
    - rowTitle: `custom`
    - rowCaption: `none`
    - emphasisRule: `none`
    - controlLabelScale: `matches-reference`
- patternDecision:
  - pattern: `Bottom(preset="primary-cta")` single fixed primary action
  - reason: one full-width primary CTA outside scroll Content; no secondary bottom action.
- ognBoundaryDecision:
  - boundary: `bottom-chrome`
  - configOgnId: none
  - owner: `MbrFpActionBar` inside `Bottom(preset="primary-cta")`
  - decision: structural CTA chrome only; enablement is driven by `ogn-mbr-auth-request` success, but the action bar is not registered as a policy OGN
- layoutStrategy:
  - widthTier: `full-bleed` bottom rail with inner content width button
  - padding: bottom action preset spacing; no route-level CTA chrome
  - stack: `vertical` (single button)
  - alignment: `center` label
  - typography: button label only
  - wrapping: label stays one line
  - overflow: none
- layoutContract:
  - role: proceed to the next dormancy-release step once verification succeeds
  - structure: fixed bottom rail with one full-width primary button
  - alignment: centered CTA label
  - density: fixed action area, separate from scroll content
  - wrapping: label one line
  - distortionRisk: documenting the CTA as enabled, adding a secondary bottom action, or letting content render its own fixed CTA chrome
- componentCandidates:
  - name: `MbrPrimaryCTABar` (nova-mbr-legacy primary-cta-bar)
    source: existing organism — `apps/mobile/src/organisms/nova-mbr-legacy/primary-cta-bar`
    fit: `strong`
    reason: existing organism already owns exactly this surface — a fixed bottom `ActionButton` with a single full-width primary action plus `disabled` state (and an optional secondary). Capability is functionally equivalent to the actions contract (single fixed primary CTA, disabled-until-success, no route-level CTA chrome). This is the established precedent for the bottom-primary-action pattern family.
    risk: registered under the `nova-mbr-legacy` group; the FP route-group expresses this as non-policy chrome, so reuse here is structural-equivalent rather than the same registered organism
  - name: `MbrFpActionBar` (chrome bottom CTA organism)
    source: this screen's chrome OGN model
    fit: `strong`
    reason: same single fixed primary-CTA capability with disabled/enabled state as `MbrPrimaryCTABar`, expressed as FP route-group chrome with no policy OGN id; chosen implementation because it is the FP-group bottom chrome surface this screen already declares
    risk: must not be registered as a policy OGN id; enablement is driven by auth-request result; it duplicates `MbrPrimaryCTABar` capability under a different group identifier
  - name: route-level fixed button
    source: layout capability comparison
    fit: `reject`
    risk: creates CTA chrome in content and breaks the AppScreen Bottom rail contract
- deviationReason: `MbrFpActionBar` is functionally equivalent to the existing `MbrPrimaryCTABar`; it is re-expressed as FP route-group non-policy chrome only because this screen belongs to a different route-group with separate chrome identifiers — a recognized reuse-equivalent duplication, not a new capability. FP-008-0 shares this bottom-CTA contract with FP-003-0 and differs only in the downstream transition (NOVA-MBR-FP-009-0).
- distortionRisk: medium; risk appears if the CTA is described as enabled or duplicated as a content action

## Policy / OGN Matrix

### [intro]

- visibleEvidence: `본인인증`, `휴면 상태를 해제하려면 본인인증을 완료해 주세요`
- policyInterpretation: `POL-MBR-AUTH-001-01` establishes identity verification as the step task, applied in the 휴면 해제 전 본인확인 context per `Screen.map.md` context note
- OGNInterpretation: chrome `FpPageHeader`; no policy OGN id registered for the intro
- decision: keep as the first content section with dormancy-release-framed copy

### [authMethod]

- visibleEvidence: radio rows `휴대폰` / `PASS` / `공동인증서` in fixed order, supporting caption `휴대폰, PASS, 공동인증서로 인증할 수 있어요`
- policyInterpretation: `POL-MBR-AUTH-002-01` (allowed methods), `POL-MBR-AUTH-002-05` (default 3-method exposure), `POL-MBR-AUTH-002-09` (fixed exposure order) define the choice list
- OGNInterpretation: `ogn-mbr-auth-select` owns the policy-ordered radio list, card surface, and skeleton loading
- decision: keep all three method rows in fixed policy order inside `ogn-mbr-auth-select`; do not reorder or move rows into the route

### [authRequest]

- visibleEvidence: `6자리 인증번호를 입력해 주세요`, numeric field with `유효 02:48` inline timer, `인증번호는 3분 동안 유효해요`, `인증번호 재요청` / `인증 확인` buttons, expiry cautionary notice, fail-limit/block negative notice
- policyInterpretation: `POL-MBR-AUTH-001-01` (apply auth), `POL-MBR-AUTH-003-01` (6-digit), `POL-MBR-AUTH-003-03` (3-min validity), `POL-MBR-AUTH-004-01` (60s resend cooldown), `POL-MBR-AUTH-004-02` (max 5 resends), `POL-MBR-AUTH-005-01` (max 5 fails), `POL-MBR-AUTH-005-03` (10-min block on limit), `POL-MBR-AUTH-005-07` (fail guidance copy)
- OGNInterpretation: `ogn-mbr-auth-request` owns the field, inline timer, dual actions, and the state-bound cautionary/negative notice set
- decision: keep code field, timer, resend, confirm, and all conditional notices inside `ogn-mbr-auth-request`; notices appear only in their policy state and never overlay the bottom CTA

### [actions]

- visibleEvidence: disabled bottom CTA `인증 완료`
- policyInterpretation: progression is unavailable until `ogn-mbr-auth-request` reports verification success; completion transition to NOVA-MBR-FP-009-0 is SB-defined
- OGNInterpretation: chrome `MbrFpActionBar`; structural-only, not a policy OGN id
- decision: keep in `Bottom(preset="primary-cta")` and out of config `ognIds`

## Distortion Gates

Layout Distortion Gate — 8-signal check (all must pass before Build):

1. Repeated `항목명 → 값/상태` rows ≥2 as key-value group: the `authMethod` rows are single-choice radio labels in a card, not label/value pairs; `authRequest` is a field group, not a key-value table. No key-value distortion. PASS.
2. Title/subtitle/body hierarchy mixing: `intro` title/subtitle stays page-header scale; `authMethod` row titles stay list-title scale (only selected row emphasized, `emphasisRule: selected-row-only`); `authRequest` prompt stays section-title scale. No hierarchy bleed. PASS.
3. key-value/table/summary column collision: not applicable; no two-column label/value table on this screen. PASS.
4. Long policy sentence covering CTA/card/next section: policy prose is reduced to short 해요체 copy in `Screen.map.md`; expiry/limit/block notices are short and rendered inside scroll Content above the fixed Bottom, never over it. PASS.
5. Critical value over-wrapping breaking row structure: 6-digit code value stays one line; method labels (fixed policy terms) stay one line; only notice/caption copy may wrap, below their controls. PASS.
6. 2-column / split row height-rhythm break: the only split row is the secondary/primary button row; both buttons are single-line labels of equal height, no 2-line stretch. PASS.
7. Fixed bottom action overlapping scroll content / last section clipped: `actions` is isolated in `Bottom(preset="primary-cta")`; `authRequest` notices push flow downward inside `Content(scroll)` and are explicitly contracted never to overlay or be clipped by the fixed CTA. PASS.
8. route-level padding / negative margin / raw width / arbitrary fontSize to fix alignment: no route-level layout; all spacing owned by `FpPageHeader`, the two OGNs, and `Bottom` preset. PASS.

Additional structural preservation decisions:

- Preserve explicit AppScreen rails: `SystemHeader`, `Header` (`‹ 본인인증`, 휴면 해제 전 본인확인 context), `Content(scroll)`, and `Bottom(preset="primary-cta")`.
- Keep section order exactly `[intro]`, `[authMethod]`, `[authRequest]`, then bottom `[actions]`. Method selection must visually and logically precede the code-request section.
- Use only the standard bottom slot name; no legacy bottom-action alias appears in this diagram.
- The auth-method radio list keeps a clear row hierarchy: each row is a single selectable list item in fixed policy order (휴대폰 → PASS → 공동인증서); no row outranks another as a section title.
- The 인증번호 input field, validity timer, 재요청, and 인증 확인 controls coexist in `[authRequest]` without overlapping: the timer is an inline field action inside the code field, the validity caption sits below the field, and the resend/confirm buttons form one split row below the caption — none of these is rendered as a section divider band.
- Expiry (cautionary) and fail-limit/block (negative) notices render below the action row inside scroll Content; they push subsequent flow downward and never cover or clip the fixed Bottom CTA.
- Register only `ogn-mbr-auth-select` and `ogn-mbr-auth-request` in config `ognIds`; `FpPageHeader` and `MbrFpActionBar` are chrome, not policy OGNs.
- Do not describe the bottom CTA as enabled; enablement is driven by the auth-request verification result.
- Preserve the 휴면 해제 전 본인확인 entry context: do not revert intro copy or Header framing to 회원 가입; the policy contract is shared with NOVA-MBR-FP-003-0 but the entry context and downstream transition (NOVA-MBR-FP-009-0) differ.
- Use the wire reference only for AppScreen rails, intro structure, choice-list card, and code+timer+controls layout; the resend-cooldown/limit and fail-limit/block notice states come from policy, not the legacy reference.
