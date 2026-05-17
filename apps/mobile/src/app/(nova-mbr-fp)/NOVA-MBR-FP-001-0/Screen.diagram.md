# NOVA-MBR-FP-001-0 — 약관 동의

## Screen Contract

- screenId: `NOVA-MBR-FP-001-0`
- route: `/NOVA-MBR-FP-001-0`
- group: `nova-mbr-fp`
- domain: `mbr`
- pattern: `form`
- implementation source: `Screen.tsx` (Phase 4 Build assembles; this diagram is the structural contract)
- policyRefs: `POL-MBR-TERM-001-06`, `POL-MBR-TERM-002-01`, `POL-MBR-TERM-002-05`
- OGN refs: `ogn-mbr-term-list`, `ogn-mbr-term-agree`, `ogn-mbr-guardian-input`, `ogn-mbr-guardian-result`
- appliedGovernanceRefs: `UXPT_BTN`, `UXPT_ERR`, `UXPT_NAV`, `UXPT_LOD`, `VOT_RUL`
- AppScreen slots: `SystemHeader`, `Header`, `Content`, `Bottom`
- header: `AppBar(title="회원 가입")` with back affordance (`UXPT_NAV`(규칙 2))
- bottom: `Bottom(preset="primary-cta")` owning `MbrFpActionBar` primary CTA `다음으로 가기`
- visible content sections: `intro`, `terms`, `agreement`
- mounted hidden sections: `guardian` (`ogn-mbr-guardian-input` `visible=false`), `guardianResult` (`ogn-mbr-guardian-result` `visible=false`)
- visible primary CTA: bottom `다음으로 가기`; blocked until required terms are agreed (`POL-MBR-TERM-001-06`)
- wireReference:
  - source: `apps/mobile/src/app/(nova-mbr-legacy)/NOVA-MBR-PG-001-0/Screen.diagram.md`
  - matchedParts: AppScreen rail order (`SystemHeader` → `Header` AppBar `회원 가입` → scroll `Content` → fixed `Bottom(preset="primary-cta")`); intro page header before a terms card; terms card with all-agree row over individual rows; negative notice below the card; hidden guardian section kept in logical content order; single disabled-by-policy bottom CTA
  - secondaryReference: `apps/mobile/src/screen-diagrams/skt-genui-test-0512/detail-form/personal-info-input.diagram.md` — only for the Header + scrollable Content + fixed Bottom CTA rhythm
  - intentionalDifferences: this screen splits the legacy single `ogn-mbr-checkbox-terms` into two cards — a read-only term document list (`ogn-mbr-term-list`, accordion full-text) and a consent control card (`ogn-mbr-term-agree`) — and adds a mounted-hidden `ogn-mbr-guardian-result` alongside `ogn-mbr-guardian-input` for the minor flow
  - limitation: reference-only visual structure; policy/copy/OGN ids come from this screen's Screen.map.md and policy-core, not from the reference

## Screen Wire

```txt
┌─AppScreen 375×812─────────────────────────────────────┐
├─SystemHeader──────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│                                                        │
├─Header────────────────────────────────────────────────┤
│                                                        │
│   ‹   회원 가입                                       │
├─Content(scroll)───────────────────────────────────────┤
│                                                        │
│ [intro | page-header | section]                       │
│   약관 동의                                           │
│   회원 가입에 필요한 약관을 확인해 주세요             │
│                                                        │
│ [terms | choice-list | card]                          │
│   ┌────────────────────────────────────────────────┐   │
│   │ [필수] 서비스 이용약관                    ⌄    │   │
│   ├──────────────── contents row separator ──────── │   │
│   │ [필수] 개인정보 수집·이용                 ⌄    │   │
│   ├──────────────── contents row separator ──────── │   │
│   │ [선택] 마케팅 정보 수신                   ⌄    │   │
│   └─────────────── term document list ────────────┘   │
│                                                        │
│ [agreement | consent-control | card]                  │
│   ┌────────────────────────────────────────────────┐   │
│   │ ▢  전체 동의                                   │   │
│   │    필수·선택 약관에 모두 동의합니다            │   │
│   ├──────────────── contents row separator ──────── │   │
│   │ ▢  [필수] 서비스 이용약관 동의                 │   │
│   │    회원 가입 및 서비스 이용을 위해 필요합니다. │   │
│   ├──────────────── contents row separator ──────── │   │
│   │ ▢  [필수] 개인정보 수집·이용 동의              │   │
│   │    이름·연락처 등 회원 정보 처리에 필요합니다. │   │
│   ├──────────────── contents row separator ──────── │   │
│   │ ▢  [선택] 마케팅 정보 수신 동의                │   │
│   │    혜택·이벤트 안내를 받습니다.                │   │
│   └─────────────── consent control card ──────────┘   │
│   ┌────────────────────────────────────────────────┐   │
│   │ ⚠ 필수 약관에 동의해 주세요                    │   │
│   │   2개의 필수 약관 동의가 필요합니다.           │   │
│   └─────────────── negative notice ───────────────┘   │
│                                                        │
│ [guardian | guarded-input | hidden]                   │
│   mounted hidden section — GuardianInput visible=false │
│                                                        │
│ [guardianResult | guarded-result | hidden]            │
│   mounted hidden section — GuardianResult visible=false│
│                                                        │
├─Bottom(preset="primary-cta")──────────────────────────┤
│ [actions | bottom-primary-action | bottom-fixed]      │
│   ┌────────────────────────────────────────────────┐   │
│   │                 다음으로 가기                  │   │
│   └────────── disabled until required agreed ─────┘   │
└────────────────────────────────────────────────────────┘
```

## Section Contracts

### [intro]

- slot: `Content`
- OGN: chrome `FpPageHeader` (non-OGN page header; not a policy OGN)
- role: Introduce the membership terms-agreement step and set the task before the term cards.
- visibleContent: title `약관 동의`, subtitle `회원 가입에 필요한 약관을 확인해 주세요`
- policy: supports `POL-MBR-TERM-001-06` by stating the agreement task before the blocking action; copy derived per `FP001-TERM-LIST` (SB `SB-MBR-UC01_02-0513 / ogn-mbr-term-list`)
- appliedGovernanceRefs: `UXPT_NAV`, `VOT_RUL`
- patternEvidence:
  - sectionBoundary: none (first content section under `Header`)
  - fieldGrouping: none
  - rowSeparators: none
  - actionPlacement: none
  - typography: rowTitle `TitleMain` title; rowCaption `TitleMain` subTitle; emphasisRule none; controlLabelScale matches-reference
- patternDecision:
  - pattern: `PageStackContents + TitleMain` via chrome `FpPageHeader`
  - reason: single page-intro title/subtitle block, no card surface, owned by chrome not a policy OGN
- ognBoundaryDecision:
  - boundary: `chrome-only`
  - configOgnId: none
  - owner: `FpPageHeader`; it may use `PageStackContents`, but this claim applies only to the page header chrome
  - decision: keep intro outside policy `ognIds`; it orients the agreement task without owning term reading, consent, or validation
- layoutStrategy: first content section directly below `Header`; no divider band before the opening page header; vertical title-over-subtitle stack at content width
- layoutContract:
  - role: orient the user to the terms-agreement task
  - structure: page title + supporting subtitle
  - alignment: leading text stack
  - density: comfortable page-header density, no card boundary
  - wrapping: subtitle may wrap within the content column; title stays compact
  - distortionRisk: collapsing the intro into the AppBar or expanding it with policy prose
- componentCandidates:
  - name: `SectionHeaderPage` (`ogn-mbr-section-header-page`)
    source: existing organism `apps/mobile/src/organisms/nova-mbr-legacy/section-header-page`
    fit: strong
    reason: same capability — wraps `PageStackContents` + `TitleMain(title, subTitle)` with no card surface and no route-level layout, structurally identical to the chrome header role
    risk: belongs to the `nova-mbr-legacy` group with a different organism id; reusing it directly would bind a legacy ogn id into the FP screen
  - name: `FpPageHeader` (chrome) wrapping `PageStackContents` + `TitleMain`
    source: existing screen chrome `apps/mobile/src/organisms/nova-mbr-fp/_chrome`
    fit: strong
    reason: directly owns the page title/subtitle slot without route-level layout; non-OGN chrome so it carries no policy ogn-id contract
    risk: none; pure chrome
  - name: `PageStackContents` + `TitleMain` direct composition
    source: cx-layout / cx-components
    fit: medium
    reason: the underlying primitives support the title/subtitle stack directly, but placing them at route level moves the header slot ownership out of an organism/chrome boundary
    risk: route-level layout ownership, no reusable header surface
- deviationReason: SectionHeaderPage (`fit: strong`) is functionally equivalent and is honestly the closest reuse; the chrome `FpPageHeader` was introduced only because it is a non-OGN page header (carries no policy ogn-id) and keeping it in the FP `_chrome` group avoids importing a `nova-mbr-legacy` organism boundary into this screen. SectionHeaderPage vs FpPageHeader is a near-duplicate — consolidation candidate: extract a single shared page-header primitive once the FP and legacy groups converge.
- distortionRisk: low

### [terms]

- slot: `Content`
- OGN: `ogn-mbr-term-list`
- role: Present the required and optional membership term documents and let the user expand each full text before consenting.
- visibleContent: one card containing term rows; each row shows a required/optional badge + document title and expands to its full text via accordion; loading and error are state variants of the same OGN
- policy: SB-grounded for `FP001-TERM-LIST` / `FP001-TERM-LIST-LOADING` / `FP001-TERM-LIST-ERROR` / `FP001-TERM-DETAIL` (SB `SB-MBR-UC01_02-0513 / ogn-mbr-term-list`); precedes the `POL-MBR-TERM-001-06` consent contract
- appliedGovernanceRefs: `UXPT_LOD` (loading skeleton / error state), `UXPT_ERR` (term-fetch failure inline), `VOT_RUL`
- patternEvidence:
  - sectionBoundary: cardBoundary (one card surface owns the list)
  - fieldGrouping: none (read documents, not input)
  - rowSeparators: `Divider(type="contents")` between term rows (1px contents divider, not card or section band)
  - actionPlacement: none in this section (expand is in-row accordion, not a content button)
  - typography: rowTitle `Text(listTitle)`; rowCaption `Text(helper)` (full text inside expanded accordion); emphasisRule none (no row is visually elevated); controlLabelScale matches-reference
- patternDecision:
  - pattern: existing-composition — card `Box` + per-row `Accordion` (`Badge` + `Text(listTitle)` title, `Text(helper)` body) + `Divider(type="contents")` between rows
  - reason: read-only term documents with expandable full text; the document list and the consent control must stay as separate cards so document reading is not confused with consenting
- ognBoundaryDecision:
  - boundary: `policy-ogn-owned`
  - configOgnId: `ogn-mbr-term-list`
  - owner: `TermList`; owns read-only term document rows, required/optional badges, accordion body, loading/error states, card surface, and contents dividers
  - decision: keep reading separate from consent; do not merge into `ogn-mbr-term-agree` or claim `PageStackContents` for this OGN body
- layoutStrategy: card surface at content width below `intro`; loading shows skeleton rows, error shows an inline negative section message inside the same OGN; row separators stay 1px contents dividers, never section bands
- layoutContract:
  - role: let the user read the terms before agreeing
  - structure: card with badge + title rows, each expandable to full text
  - alignment: leading badge + title; expand affordance trailing
  - density: matches wire reference card list density; no extra section band
  - wrapping: long term titles wrap inside the row; expanded body wraps freely below the title
  - distortionRisk: merging this list into the consent card would blur reading vs. consenting and double the row hierarchy
- componentCandidates:
  - name: `ConsentTermsAccordion` (`ogn-mbr-consent-terms-accordion`)
    source: existing organism `apps/mobile/src/organisms/nova-mbr-legacy/consent-terms-accordion`
    fit: weak
    reason: owns an accordion term list, but its `AccordionList` rows carry a `Checkbox` (consent control) and it renders inside a `FieldStack` with no card surface, no required/optional `Badge`, and no `Divider(type="contents")` between rows; it cannot express a read-only document card whose reading is separated from consenting without restructuring the organism
    risk: missing card surface + badge + contents divider, and the checkbox in each row would re-merge reading and consenting (the exact distortion this section separates out)
  - name: cx `Accordion` + `Badge` + `Divider(type="contents")` inside a card `Box` composition
    source: cx-components / cx-layout composition
    fit: medium
    reason: these primitives can express the badge + title accordion rows with contents dividers in a card, but the card surface, row insets, and badge/title slot ownership would have to be assembled and owned at route level
    risk: route-level card/divider ownership, no reusable read-only document organism boundary
  - name: `TermList` (`ogn-mbr-term-list`)
    source: existing organism `apps/mobile/src/organisms/nova-mbr-fp/term-list`
    fit: strong
    reason: owns the card surface, required/optional `Badge` + `Text(listTitle)` row, per-row `Accordion` full-text, and `Divider(type="contents")` between rows with no consent control mixed in; loading/error are OGN-internal states
    risk: none structural; loading/error visuals verified inside the OGN
- deviationReason: SB `SB-MBR-UC01_02-0513` defines this read-only document area as its own domain OGN id `ogn-mbr-term-list`, distinct from the legacy consent organism. The closest legacy vocabulary, `ConsentTermsAccordion` (`ogn-mbr-consent-terms-accordion`), is only `fit: weak` — it lacks the card surface, required/optional badge, and contents dividers, and embeds a consent checkbox in every accordion row, which would re-merge reading and consenting. This is a genuine vocabulary gap (not a duplicate): no existing organism owns a read-only badged term-document card with accordion full text, so a new FP-group `TermList` is required and the verifier matches `generation.ognIds` to this organism `id`.
- distortionRisk: medium — required/optional and reading vs. consenting hierarchy must stay inside the OGN

### [agreement]

- slot: `Content`
- OGN: `ogn-mbr-term-agree`
- role: Own the all-agree affordance plus per-term consent and surface the required-agreement block until required terms are checked.
- visibleContent: card with an emphasized 전체 동의 row over individual required/optional consent rows (checkbox + title + caption); a negative notice appears below the card while required terms are unchecked
- policy: primary visible contract for `POL-MBR-TERM-001-06`; `FP001-TERM-AGREE-ALL` / `FP001-TERM-AGREE-EACH` / `FP001-TERM-REQUIRED-BLOCK` (SB `SB-MBR-UC01_02-0513 / ogn-mbr-term-agree` + `POL-MBR-TERM-001-06`)
- appliedGovernanceRefs: `UXPT_ERR` (required-block negative notice, inline on the failing state only), `VOT_RUL`
- patternEvidence:
  - sectionBoundary: cardBoundary (one consent card) + a separate notice below it
  - fieldGrouping: none (consent toggles, not text fields)
  - rowSeparators: `Divider(type="contents")` between the all-agree row and each consent row
  - actionPlacement: none here — the progression action is `Bottom(preset="primary-cta")`, not inside this card
  - typography: rowTitle `Text(sectionTitle)` for the 전체 동의 row only and `Text(listTitle)` for each individual consent row; rowCaption `Text(helper)`; emphasisRule first-row-only (only 전체 동의 carries the elevated title); controlLabelScale matches-reference
- patternDecision:
  - pattern: existing-composition — card `Box` + emphasized all-agree `ConsentRow` + `Divider(type="contents")` + per-term `ConsentRow` (`Checkbox` + `Text` title/caption) + below-card `Notice tone="negative"`
  - reason: all-agree must visually lead the individual consents; the required-block error is a notice tied to the failing state, not a permanent banner
- ognBoundaryDecision:
  - boundary: `policy-ogn-owned`
  - configOgnId: `ogn-mbr-term-agree`
  - owner: `TermAgree`; owns all-agree, per-term checkbox consent, required-block notice, and CTA enablement source state
  - decision: keep consent logic and required-block feedback inside this OGN; bottom CTA chrome reflects its state but is not part of this OGN body
- layoutStrategy: card directly after `terms`; negative notice rendered below the card only while required items are unchecked; never moves consent logic out of the OGN or the CTA into this section
- layoutContract:
  - role: capture required/optional consent and signal the progression block
  - structure: card with leading all-agree row then per-term rows, optional negative notice below
  - alignment: leading checkbox + title/caption stack; notice full content width
  - density: matches wire reference consent card density
  - wrapping: titles and captions wrap inside the row without squeezing the checkbox column
  - distortionRisk: all consent rows reading as section titles, or the required-block notice becoming a permanent banner, or the CTA being drawn inside this card
- componentCandidates:
  - name: `CheckboxTerms` (`ogn-mbr-checkbox-terms`)
    source: existing organism `apps/mobile/src/organisms/nova-mbr-legacy/checkbox-terms`
    fit: strong
    reason: structurally owns the exact same contract — a card `Box` with an emphasized all-agree `ConsentRow`, `Divider(type="contents")` between rows, per-term `Checkbox` + `Text` title/caption rows with emphasisRule first-row-only, and a conditional below-card `Notice tone="negative"` for the required-block; capability matches the layoutContract directly with no route-level CSS
    risk: belongs to the `nova-mbr-legacy` group with a different organism id (`ogn-mbr-checkbox-terms`); reusing it directly binds a legacy ogn id that breaks the SB ogn-id ↔ policy contract for this screen
  - name: cx `Checkbox` + `Divider(type="contents")` + `Notice` inside a card `Box` composition
    source: cx-components / cx-layout composition
    fit: medium
    reason: these primitives can express the all-agree + per-term rows and conditional notice, but the all-agree emphasis, card surface, and state-bound notice ownership would be assembled and owned at route level
    risk: route-level emphasis/notice ownership, no reusable consent organism boundary
  - name: `TermAgree` (`ogn-mbr-term-agree`)
    source: existing organism `apps/mobile/src/organisms/nova-mbr-fp/term-agree`
    fit: strong
    reason: owns the all-agree emphasis, per-term rows, contents dividers, and the conditional negative notice; emphasisRule first-row-only already enforced in code; carries the FP-group ogn id the verifier binds to `POL-MBR-TERM-001-06`
    risk: none structural
- deviationReason: SB `SB-MBR-UC01_02-0513 / ogn-mbr-term-agree` defines this consent area as its own domain OGN id `ogn-mbr-term-agree` bound to `POL-MBR-TERM-001-06`, and the verifier matches `generation.ognIds` to the organism config `id` exactly. The legacy `CheckboxTerms` (`ogn-mbr-checkbox-terms`) is honestly `fit: strong` — structurally near-identical (same ConsentRow, card Box, contents Divider, conditional negative Notice) — but it carries a different ogn id in the `nova-mbr-legacy` group, so reusing it directly would break the SB ogn-id ↔ `POL-MBR-TERM-001-06` binding. system-consistency note: `TermAgree` is essentially a clone of `CheckboxTerms`; this duplication is real and recorded as a future shared-consent-primitive consolidation candidate, not hidden.
- distortionRisk: medium — emphasis must stay first-row-only and the block notice must stay state-bound

### [guardian]

- slot: `Content`
- OGN: `ogn-mbr-guardian-input`
- role: Reserve the legal-guardian information input + consent-request send behavior for the minor (`[고객유형] = 미성년자`) state.
- visibleContent: none in the current state; mounted with `visible={false}` so it renders `null`
- policy: `POL-MBR-TERM-002-01` (guardian consent target), `POL-MBR-TERM-002-05` (24h validity); `FP001-GUARDIAN-INPUT` / `FP001-GUARDIAN-VALIDITY`
- appliedGovernanceRefs: `UXPT_BTN` (the send action is a separate action from the bottom CTA), `UXPT_ERR`, `VOT_RUL`
- patternEvidence:
  - sectionBoundary: none while hidden
  - fieldGrouping: `FieldStack` when visible (name + contact `TextField` group) — not drawn while hidden
  - rowSeparators: none
  - actionPlacement: `Content` (an in-section `동의 요청 발송` button, distinct from the bottom progression CTA) — not drawn while hidden
  - typography: rowTitle/rowCaption n/a while hidden; controlLabelScale unknown (no visible controls)
- patternDecision:
  - pattern: existing-composition — `Notice tone="info"` + name/contact `TextField` group + `Button` send action, all gated by `visible`
  - reason: minor-only flow; in the default screen state this OGN must not draw any field, notice, helper, or error copy
- ognBoundaryDecision:
  - boundary: `mounted-hidden-policy-ogn`
  - configOgnId: `ogn-mbr-guardian-input`
  - owner: `GuardianInput`; owns minor-only guardian input, send action, and input validation when `visible=true`
  - decision: keep mounted for policy coverage but render `null` in the default state; do not surface guardian UI or merge with `guardianResult`
- layoutStrategy: keep after `agreement` in logical content order but draw nothing while `visible={false}`; do not surface fields, validity copy, or send button in the default state
- layoutContract:
  - role: collect legal-guardian name/contact and send the consent request (minor state only)
  - structure: info notice + field stack + send button (when visible)
  - alignment: leading field stack; full-width send button
  - density: form density when visible
  - wrapping: notice copy may wrap; field values stay one line
  - distortionRisk: drawing this section in the default state would imply a different (minor) screen state
- componentCandidates:
  - name: `TextFieldGuardianRequest` (`ogn-mbr-text-field-guardian-request`)
    source: existing organism `apps/mobile/src/organisms/nova-mbr-legacy/text-field-guardian-request`
    fit: strong
    reason: owns the same visible-gated structure — `if (!visible) return null` then info `Notice` + guardian name/contact `TextField` group + send `Button`; the input half of this section's contract maps directly to it
    risk: it is a single merged organism that also carries the legacy ogn id (`ogn-mbr-text-field-guardian-request`, `nova-mbr-legacy` group); it has no separate result/wait/expiry state, so it cannot serve the `guardianResult` split, and its legacy ogn id breaks the SB ogn-id ↔ policy contract for this screen
  - name: cx `Notice` + `TextField` group + `Button` gated by `visible` composition
    source: cx-components / cx-layout composition
    fit: medium
    reason: the primitives express the gated notice + field stack + send button, but the visible-gating and field-group ownership would be assembled at route level
    risk: route-level gating ownership, no reusable guarded-input organism boundary
  - name: `GuardianInput` (`ogn-mbr-guardian-input`)
    source: existing organism `apps/mobile/src/organisms/nova-mbr-fp/guardian-input`
    fit: strong
    reason: owns the visible-gated notice + field stack + send button scoped to the input step only; default returns `null`; carries the FP-group ogn id the verifier binds to `POL-MBR-TERM-002-01`/`POL-MBR-TERM-002-05`
    risk: none while hidden; visible-state density verified at minor flow
- deviationReason: SB `SB-MBR-UC01_02-0513` splits the minor flow into two domain OGN ids — `ogn-mbr-guardian-input` (collect + send) and `ogn-mbr-guardian-result` (wait/expiry) — each with its own policy binding, and the verifier matches `generation.ognIds` to the organism config `id`. The legacy `TextFieldGuardianRequest` is honestly `fit: strong` for the input half but is a single merged organism with no result/wait/expiry state and carries a `nova-mbr-legacy` ogn id; it cannot represent the SB 2-OGN split 1:1. This is a genuine separation (not a duplicate-hiding decision): a dedicated FP `GuardianInput` is required so the input step and the result step bind to their own SB ogn ids and policies.
- distortionRisk: high if surfaced in the default wire

### [guardianResult]

- slot: `Content`
- OGN: `ogn-mbr-guardian-result`
- role: Reserve guardian consent wait / expiry result behavior for the minor state after a request is sent.
- visibleContent: none in the current state; mounted with `visible={false}` so it renders `null`
- policy: `POL-MBR-TERM-002-05` (24h validity); `FP001-GUARDIAN-RESULT` / `FP001-GUARDIAN-EXPIRE` (SB `SB-MBR-UC01_02-0513 / ogn-mbr-guardian-result` + `POL-MBR-TERM-002-05`)
- appliedGovernanceRefs: `UXPT_LOD` (consent-result polling wait state), `UXPT_ERR` (expiry negative notice), `UXPT_BTN` (re-request action), `VOT_RUL`
- patternEvidence:
  - sectionBoundary: none while hidden
  - fieldGrouping: none
  - rowSeparators: none
  - actionPlacement: `Content` re-request button on the expiry state only — not drawn while hidden
  - typography: n/a while hidden; controlLabelScale unknown (no visible controls)
- patternDecision:
  - pattern: existing-composition — wait = `Notice tone="info"`; expired = `Notice tone="negative"` + re-request `Button`, gated by `visible`
  - reason: minor-only post-send state; default screen state must not draw wait or expiry copy
- ognBoundaryDecision:
  - boundary: `mounted-hidden-policy-ogn`
  - configOgnId: `ogn-mbr-guardian-result`
  - owner: `GuardianResult`; owns minor-only wait/expiry result and re-request action when `visible=true`
  - decision: keep as a separate hidden OGN from `GuardianInput`; no wait/expiry copy appears in the default wire
- layoutStrategy: keep after `guardian` in logical content order but draw nothing while `visible={false}`; expiry error copy stays hidden until the validity window actually expires
- layoutContract:
  - role: communicate consent wait vs. expiry and offer re-request (minor state only)
  - structure: info notice (wait) or negative notice + re-request button (expired)
  - alignment: leading notice; full-width re-request button
  - density: notice density when visible
  - wrapping: notice copy may wrap
  - distortionRisk: drawing wait or expiry in the default state would imply a minor post-send screen
- componentCandidates:
  - name: `TextFieldGuardianRequest` (`ogn-mbr-text-field-guardian-request`)
    source: existing organism `apps/mobile/src/organisms/nova-mbr-legacy/text-field-guardian-request`
    fit: reject
    reason: it is a single merged input organism (info notice + field group + send button) with no wait state, no expiry `Notice tone="negative"`, and no re-request button; it structurally cannot express the post-send wait/expiry result contract
    risk: would force the result states to be faked outside any organism; also carries a legacy ogn id that breaks the SB ogn-id ↔ policy contract
  - name: cx `Notice` (info / negative) + re-request `Button` gated by `visible`/`expired` composition
    source: cx-components / cx-layout composition
    fit: medium
    reason: the primitives express the wait vs. expiry notice and re-request button, but the visible/expired gating and state ownership would be assembled at route level
    risk: route-level state gating ownership, no reusable guarded-result organism boundary
  - name: `GuardianResult` (`ogn-mbr-guardian-result`)
    source: existing organism `apps/mobile/src/organisms/nova-mbr-fp/guardian-result`
    fit: strong
    reason: owns the visible/expired-gated wait notice and expiry notice + re-request button; default returns `null`; carries the FP-group ogn id the verifier binds to `POL-MBR-TERM-002-05`
    risk: none while hidden
- deviationReason: SB `SB-MBR-UC01_02-0513 / ogn-mbr-guardian-result` defines the post-send wait/expiry behavior as a separate domain OGN id from the input step, bound to `POL-MBR-TERM-002-05`, and the verifier matches `generation.ognIds` to the organism config `id`. No legacy organism owns a guardian wait/expiry result with a re-request action — the closest, `TextFieldGuardianRequest`, is a single merged input organism (`fit: reject` here). This is a genuine SB-driven separation: the input step and the result step are two distinct OGN ids with distinct policy bindings, so a dedicated FP `GuardianResult` is required and is not a duplicate of any existing organism.
- distortionRisk: high if surfaced in the default wire

### [actions]

- slot: `Bottom`
- OGN: progression action sourced from `ogn-mbr-term-agree`'s navigate behavior; rendered via chrome `MbrFpActionBar` (non-OGN action bar)
- role: Own the bottom progression action and reflect the blocked state until required terms are agreed.
- visibleContent: single primary CTA `다음으로 가기`, disabled until required terms are checked
- policy: enforces `POL-MBR-TERM-001-06`; `FP001-NEXT-ACTION` (navigate to `NOVA-MBR-FP-002-0` carrying 동의이력ID·세션ID)
- appliedGovernanceRefs: `UXPT_BTN` (single verb-form primary action, state-driven enable/disable), `UXPT_NAV` (forward step in the multi-step flow), `VOT_RUL`
- patternEvidence:
  - sectionBoundary: none (fixed bottom rail, outside scroll content)
  - fieldGrouping: none
  - rowSeparators: none
  - actionPlacement: `Bottom(preset="primary-cta")`
  - typography: rowTitle button label `다음으로 가기`; rowCaption none; emphasisRule none; controlLabelScale matches-reference
- patternDecision:
  - pattern: `Bottom(preset="primary-cta")` + chrome `MbrFpActionBar` (`ActionButton` primary action)
  - reason: one fixed bottom progression CTA, state-driven disabled, never inside scroll content
- ognBoundaryDecision:
  - boundary: `bottom-chrome`
  - configOgnId: none
  - owner: `MbrFpActionBar` inside `Bottom(preset="primary-cta")`
  - decision: structural CTA chrome only; enablement is sourced from `ogn-mbr-term-agree`, while guardian send/re-request remain in-section actions
- layoutStrategy: fixed `Bottom(preset="primary-cta")`; content never builds its own fixed CTA chrome; CTA stays a single primary action (the guardian send/re-request are separate in-section actions)
- layoutContract:
  - role: progress to the next membership step when required consent is satisfied
  - structure: bottom rail with one full-width primary button
  - alignment: centered CTA label
  - density: fixed action area, not scroll content
  - wrapping: label stays one line
  - distortionRisk: placing the CTA in content, enabling it before required consent, or adding secondary actions
- componentCandidates:
  - name: `MbrPrimaryCTABar`
    source: existing organism `apps/mobile/src/organisms/nova-mbr-legacy/primary-cta-bar`
    fit: strong
    reason: same capability — renders an `ActionButton` with a single primary action (label + disabled + onClick) and optional secondary, exactly the fixed bottom CTA contract here
    risk: belongs to the `nova-mbr-legacy` group; reusing it directly imports a legacy organism boundary into the FP screen chrome
  - name: `ActionButton` direct composition in `Bottom(preset="primary-cta")`
    source: cx-components / cx-layout
    fit: medium
    reason: `ActionButton` supports the single disabled primary action directly, but wiring it without a chrome wrapper spreads the bottom-action ownership to the route
    risk: route-level bottom-action ownership, no reusable action-bar boundary
  - name: `MbrFpActionBar` (chrome) over `Bottom(preset="primary-cta")`
    source: existing screen chrome `apps/mobile/src/organisms/nova-mbr-fp/_chrome`
    fit: strong
    reason: owns the fixed bottom primary action with a disabled state, no route-level layout; non-OGN chrome so it carries no policy ogn-id contract
    risk: none; enablement is driven by required-consent state from `ogn-mbr-term-agree`
- deviationReason: `MbrPrimaryCTABar` (`fit: strong`) is functionally equivalent and is honestly the closest reuse; the chrome `MbrFpActionBar` was introduced only because the bottom action is non-OGN chrome (no policy ogn-id) and keeping it in the FP `_chrome` group avoids importing a `nova-mbr-legacy` organism boundary. `MbrFpActionBar` is a near-line-for-line clone of `MbrPrimaryCTABar` — this duplication is real and recorded as a future shared-action-bar consolidation candidate, not hidden.
- distortionRisk: medium — risk if documented as always-enabled or if secondary actions are added

## Policy / OGN Matrix

| section | visibleEvidence | policyInterpretation | OGNInterpretation | decision |
| --- | --- | --- | --- | --- |
| `intro` | `약관 동의`, `회원 가입에 필요한 약관을 확인해 주세요` | introduces the agreement task before the blocking consent; aligns to `POL-MBR-TERM-001-06` framing | chrome `FpPageHeader` (non-OGN page header) | keep as the first content section, no card, no divider band |
| `terms` | required/optional badged term rows, accordion full text, loading/error states | SB-grounded `FP001-TERM-LIST` family; reading must precede the `POL-MBR-TERM-001-06` consent | `ogn-mbr-term-list` (`TermList`) owns card + accordion + contents dividers | keep document reading separate from consent; states stay OGN-internal |
| `agreement` | all-agree row, per-term consent rows, negative notice `필수 약관에 동의해 주세요` | visible source for `POL-MBR-TERM-001-06`; required consent gates progression | `ogn-mbr-term-agree` (`TermAgree`) owns all-agree emphasis + rows + conditional notice | keep consent hierarchy and required-block notice inside the OGN |
| `guardian` | none; mounted hidden | `POL-MBR-TERM-002-01` / `POL-MBR-TERM-002-05` reserved for `[고객유형] = 미성년자` | `ogn-mbr-guardian-input` mounted with `visible=false` | preserve hidden; do not surface guardian input UI in the default state |
| `guardianResult` | none; mounted hidden | `POL-MBR-TERM-002-05` reserved for minor post-send wait/expiry | `ogn-mbr-guardian-result` mounted with `visible=false` | preserve hidden; do not surface wait/expiry UI in the default state |
| `actions` | disabled bottom CTA `다음으로 가기` | progression blocked until required agreement satisfied (`POL-MBR-TERM-001-06`) | progression sourced from `ogn-mbr-term-agree`; rendered via chrome `MbrFpActionBar` | keep the action in `Bottom(preset="primary-cta")` as a single primary CTA |

## Distortion Gates

Layout Distortion Gate — 8-signal review:

1. Repeated `항목명 → 값/상태` rows forming an unintended key-value group: not present. `terms` is a read-only document list and `agreement` is a consent-control list; neither is a label/value summary, and they are separated into two distinct cards so the row meaning never collapses into a key-value table.
2. Mixed title/subtitle/body hierarchy within a section: not present. `terms` rows use `Text(listTitle)` with no elevated row; `agreement` uses `Text(sectionTitle)` for the 전체 동의 row only (emphasisRule first-row-only) and `Text(listTitle)` for individual rows — the two cards do not duplicate or invert hierarchy.
3. Label/value column collision or baseline drift: not applicable; there is no two-column label/value layout. Checkbox column stays stable with `minWidth:0` text stacks.
4. Long policy sentence hiding the CTA, cards, or next section: not present. The required-block message is a bounded `Notice` below the consent card; the CTA stays in the fixed `Bottom` rail and is never overlapped by content.
5. Important values over-wrapping and breaking row structure: not present; term titles and consent captions wrap within their own rows without squeezing controls.
6. Two-column / split row height-rhythm break: not applicable; no split layout is used.
7. Fixed bottom action overlapping scroll content or clipping the last section: not present. `Bottom(preset="primary-cta")` is a separate fixed rail; the last content section (`agreement`, or hidden guardian sections) is not clipped by the action.
8. Route-level padding / negative margin / raw width / arbitrary fontSize needed to align: not needed. Card surface, dividers, and spacing are owned by the OGNs and `@pxds/cx-layout` primitives; no route-level layout correction is required.
9. Missing slot forcing meaningless wrappers/spacers: not present; every section maps to an existing OGN or chrome that already owns its surface and slots.

Role-separation declaration:

- `terms` (`ogn-mbr-term-list`) and `agreement` (`ogn-mbr-term-agree`) are deliberately two separate cards. The first owns reading the term documents (badge + title + accordion full text), the second owns consenting (all-agree + per-term checkboxes + required-block notice). This separation removes duplicate-hierarchy and reading-vs-consenting distortion that a single merged card would introduce.
- `guardian` (`ogn-mbr-guardian-input`) and `guardianResult` (`ogn-mbr-guardian-result`) are mounted hidden (`visible=false`) for the default (non-minor) state and are not drawn in the Screen Wire body; surfacing them would imply a different screen state.
- The bottom progression action stays a single primary CTA in `Bottom(preset="primary-cta")`; the guardian send and re-request buttons (when the minor flow is active) are separate in-section actions and never merge with the bottom CTA (`UXPT_BTN`).

Gate result: PASS — no Layout Distortion Gate signal triggers; existing OGN + chrome vocabulary preserves the reference's Header / scroll Content / fixed Bottom CTA layout, section order, and the term-list / term-agree / CTA position relationship.
