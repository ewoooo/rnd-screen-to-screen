# NOVA-MBR-FP-009-0 — 약관 재동의·휴면 해제

## Screen Contract

- screenId: `NOVA-MBR-FP-009-0`
- route: `/NOVA-MBR-FP-009-0`
- group: `nova-mbr-fp`
- domain: `mbr`
- pattern: `form`
- implementation source: `Screen.tsx` (Phase 4 Build assembles; this diagram is the structural contract)
- policyRefs: `POL-MBR-TERM-001-06`
- OGN refs: `ogn-mbr-term-list`, `ogn-mbr-term-agree`
- appliedGovernanceRefs: `UXPT_BTN`, `UXPT_ERR`, `UXPT_NAV`, `UXPT_LOD`, `VOT_RUL`
- AppScreen slots: `SystemHeader`, `Header`, `Content`, `Bottom`
- header: `AppBar(title="회원 가입")` with back affordance preserving the dormant-release flow context `로그인 > 휴면 여부 확인 > 본인인증 > 약관 동의` (`UXPT_NAV`(규칙 2))
- bottom: `Bottom(preset="primary-cta")` owning `MbrFpActionBar` primary CTA `다음으로 가기`
- visible content sections: `intro`, `terms`, `agreement`
- mounted hidden sections: none (this screen has no minor / guardian flow; guardian OGNs are out of scope per Screen.map.md)
- visible primary CTA: bottom `다음으로 가기`; blocked until required re-agreed terms are checked (`POL-MBR-TERM-001-06`)
- wireReference:
  - source: `apps/mobile/src/app/(nova-mbr-legacy)/NOVA-MBR-PG-001-0/Screen.diagram.md`
  - matchedParts: AppScreen rail order (`SystemHeader` → `Header` AppBar → scroll `Content` → fixed `Bottom(preset="primary-cta")`); intro page header before a terms card; consent card with all-agree row over individual rows; negative notice below the consent card; single disabled-by-policy bottom CTA
  - secondaryReference: `apps/mobile/src/screen-diagrams/skt-genui-test-0512/detail-form/personal-info-input.diagram.md` — only for the Header + scrollable Content + fixed Bottom CTA rhythm
  - intentionalDifferences: this screen reuses the same `ogn-mbr-term-list` + `ogn-mbr-term-agree` vocabulary as `NOVA-MBR-FP-001-0` but in the dormant-account re-agreement context; it has no guardian (minor) sections, so no mounted-hidden guardian OGN appears
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
│   휴면 해제를 위해 약관에 다시 동의해 주세요          │
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
- role: Introduce the dormant-account re-agreement step and explain that the listed terms must be re-agreed to release the dormant account.
- visibleContent: title `약관 동의`, subtitle `휴면 해제를 위해 약관에 다시 동의해 주세요`
- policy: supports `POL-MBR-TERM-001-06` by stating the re-agreement task before the blocking action; copy derived per `FP009-REAGREE-CONTEXT` / `FP009-TERM-LIST` (SB `SB-MBR-UC01_02-0513 / ogn-mbr-term-list`, screen path `로그인 > 휴면 여부 확인 > 본인인증 > 약관 동의`)
- appliedGovernanceRefs: `UXPT_NAV`, `VOT_RUL`
- patternEvidence:
  - sectionBoundary: none (first content section under `Header`)
  - fieldGrouping: none
  - rowSeparators: none
  - actionPlacement: none
  - typography: rowTitle `TitleMain` title; rowCaption `TitleMain` subTitle; emphasisRule none; controlLabelScale matches-reference
- patternDecision:
  - pattern: `PageStackContents + TitleMain` via chrome `FpPageHeader`
  - reason: single page-intro title/subtitle block carrying the dormant-release re-agreement context, no card surface
- ognBoundaryDecision:
  - boundary: `chrome-only`
  - configOgnId: none
  - owner: `FpPageHeader`; it may use `PageStackContents`, but this claim applies only to the page header chrome
  - decision: keep intro outside policy `ognIds`; it orients the dormant-release re-agreement task without owning term reading, consent, or validation
- layoutStrategy: first content section directly below `Header`; no divider band before the page header; vertical title-over-subtitle stack at content width
- layoutContract:
  - role: orient the user to the dormant-release re-agreement task
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
- deviationReason: SectionHeaderPage (`fit: strong`) is functionally equivalent and is honestly the closest reuse; the chrome `FpPageHeader` is reused unchanged from `NOVA-MBR-FP-001-0` and was introduced only because it is a non-OGN page header (carries no policy ogn-id) and keeping it in the FP `_chrome` group avoids importing a `nova-mbr-legacy` organism boundary into this screen. SectionHeaderPage vs FpPageHeader is a near-duplicate — consolidation candidate: extract a single shared page-header primitive once the FP and legacy groups converge.
- distortionRisk: low

### [terms]

- slot: `Content`
- OGN: `ogn-mbr-term-list`
- role: Present the work-specific required and optional terms that must be re-agreed and let the user expand each full text before consenting.
- visibleContent: one card containing term rows; each row shows a required/optional badge + document title and expands to its full text via accordion; loading and error are state variants of the same OGN
- policy: SB-grounded for `FP009-TERM-LIST` / `FP009-TERM-LIST-LOADING` / `FP009-TERM-LIST-ERROR` / `FP009-TERM-DETAIL` (SB `SB-MBR-UC01_02-0513 / ogn-mbr-term-list`); precedes the `POL-MBR-TERM-001-06` re-agreement contract
- appliedGovernanceRefs: `UXPT_LOD` (loading skeleton state), `UXPT_ERR` (term-fetch failure inline), `VOT_RUL`
- patternEvidence:
  - sectionBoundary: cardBoundary (one card surface owns the list)
  - fieldGrouping: none (read documents, not input)
  - rowSeparators: `Divider(type="contents")` between term rows (1px contents divider, not card or section band)
  - actionPlacement: none in this section (expand is in-row accordion, not a content button)
  - typography: rowTitle `Text(listTitle)`; rowCaption `Text(helper)` (full text inside expanded accordion); emphasisRule none (no row is visually elevated); controlLabelScale matches-reference
- patternDecision:
  - pattern: existing-composition — card `Box` + per-row `Accordion` (`Badge` + `Text(listTitle)` title, `Text(helper)` body) + `Divider(type="contents")` between rows
  - reason: read-only re-agreement term documents with expandable full text; document reading must stay a separate card from consenting
- ognBoundaryDecision:
  - boundary: `policy-ogn-owned`
  - configOgnId: `ogn-mbr-term-list`
  - owner: `TermList`; owns read-only re-agreement term document rows, required/optional badges, accordion body, loading/error states, card surface, and contents dividers
  - decision: reuse the FP-001 reading boundary in the dormant-release context; do not merge into `ogn-mbr-term-agree` or claim `PageStackContents` for this OGN body
- layoutStrategy: card surface at content width below `intro`; loading shows skeleton rows, error shows an inline negative section message inside the same OGN; row separators stay 1px contents dividers, never section bands
- layoutContract:
  - role: let the user read the re-agreement terms before agreeing
  - structure: card with badge + title rows, each expandable to full text
  - alignment: leading badge + title; expand affordance trailing
  - density: matches wire reference card list density; no extra section band
  - wrapping: long term titles wrap inside the row; expanded body wraps freely below the title
  - distortionRisk: merging this list into the consent card would blur reading vs. consenting and double the row hierarchy
- componentCandidates:
  - name: `ConsentTermsAccordion` (`ogn-mbr-consent-terms-accordion`)
    source: existing organism `apps/mobile/src/organisms/nova-mbr-legacy/consent-terms-accordion`
    fit: weak
    reason: owns an accordion term list, but its `AccordionList` rows carry a `Checkbox` (consent control) and it renders inside a `FieldStack` with no card surface, no required/optional `Badge`, and no `Divider(type="contents")` between rows; it cannot express a read-only re-agreement document card whose reading is separated from consenting without restructuring the organism
    risk: missing card surface + badge + contents divider, and the checkbox in each row would re-merge reading and consenting (the exact distortion this section separates out)
  - name: cx `Accordion` + `Badge` + `Divider(type="contents")` inside a card `Box` composition
    source: cx-components / cx-layout composition
    fit: medium
    reason: these primitives can express the badge + title accordion rows with contents dividers in a card, but the card surface, row insets, and badge/title slot ownership would have to be assembled and owned at route level
    risk: route-level card/divider ownership, no reusable read-only document organism boundary
  - name: `TermList` (`ogn-mbr-term-list`)
    source: existing organism `apps/mobile/src/organisms/nova-mbr-fp/term-list`
    fit: strong
    reason: owns the card surface, required/optional `Badge` + `Text(listTitle)` row, per-row `Accordion` full-text, and `Divider(type="contents")` between rows with no consent control mixed in; loading/error are OGN-internal states; reused unchanged from `NOVA-MBR-FP-001-0` to keep the pattern contract stable across screens
    risk: none structural
- deviationReason: SB `SB-MBR-UC01_02-0513` defines this read-only document area as its own domain OGN id `ogn-mbr-term-list`, distinct from the legacy consent organism, and the verifier matches `generation.ognIds` to the organism config `id`. The closest legacy vocabulary, `ConsentTermsAccordion` (`ogn-mbr-consent-terms-accordion`), is only `fit: weak` — it lacks the card surface, required/optional badge, and contents dividers, and embeds a consent checkbox in every accordion row, which would re-merge reading and consenting. This is a genuine vocabulary gap (not a duplicate): no existing organism owns a read-only badged term-document card with accordion full text. `TermList` is intentionally the same FP-group organism as `NOVA-MBR-FP-001-0` so the pattern contract stays identical across the registration and dormant-release screens.
- distortionRisk: medium — reading vs. consenting hierarchy must stay inside the OGN

### [agreement]

- slot: `Content`
- OGN: `ogn-mbr-term-agree`
- role: Own the all-agree affordance plus per-term re-consent and surface the required-agreement block until required terms are re-checked.
- visibleContent: card with an emphasized 전체 동의 row over individual required/optional consent rows (checkbox + title + caption); a negative notice appears below the card while required terms are unchecked
- policy: primary visible contract for `POL-MBR-TERM-001-06`; `FP009-TERM-AGREE-ALL` / `FP009-TERM-AGREE-EACH` / `FP009-TERM-REQUIRED-BLOCK` (SB `SB-MBR-UC01_02-0513 / ogn-mbr-term-agree` + `POL-MBR-TERM-001-06`)
- appliedGovernanceRefs: `UXPT_ERR` (required-block negative notice, inline on the failing state only), `VOT_RUL`
- patternEvidence:
  - sectionBoundary: cardBoundary (one consent card) + a separate notice below it
  - fieldGrouping: none (consent toggles, not text fields)
  - rowSeparators: `Divider(type="contents")` between the all-agree row and each consent row
  - actionPlacement: none here — the progression action is `Bottom(preset="primary-cta")`, not inside this card
  - typography: rowTitle `Text(sectionTitle)` for the 전체 동의 row only and `Text(listTitle)` for each individual consent row; rowCaption `Text(helper)`; emphasisRule first-row-only (only 전체 동의 carries the elevated title); controlLabelScale matches-reference
- patternDecision:
  - pattern: existing-composition — card `Box` + emphasized all-agree `ConsentRow` + `Divider(type="contents")` + per-term `ConsentRow` (`Checkbox` + `Text` title/caption) + below-card `Notice tone="negative"`
  - reason: all-agree must visually lead the individual re-consents; the required-block error is a notice tied to the failing state, not a permanent banner
- ognBoundaryDecision:
  - boundary: `policy-ogn-owned`
  - configOgnId: `ogn-mbr-term-agree`
  - owner: `TermAgree`; owns all-agree, per-term re-consent, required-block notice, and CTA enablement source state
  - decision: keep re-consent logic and required-block feedback inside this OGN; bottom CTA chrome reflects its state but is not part of this OGN body
- layoutStrategy: card directly after `terms`; negative notice rendered below the card only while required items are unchecked; never moves consent logic out of the OGN or the CTA into this section
- layoutContract:
  - role: capture required/optional re-consent and signal the progression block
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
    reason: owns the all-agree emphasis, per-term rows, contents dividers, and the conditional negative notice; emphasisRule first-row-only already enforced in code; reused unchanged from `NOVA-MBR-FP-001-0`; carries the FP-group ogn id the verifier binds to `POL-MBR-TERM-001-06`
    risk: none structural
- deviationReason: SB `SB-MBR-UC01_02-0513 / ogn-mbr-term-agree` defines this consent area as its own domain OGN id `ogn-mbr-term-agree` bound to `POL-MBR-TERM-001-06`, and the verifier matches `generation.ognIds` to the organism config `id` exactly. The legacy `CheckboxTerms` (`ogn-mbr-checkbox-terms`) is honestly `fit: strong` — structurally near-identical (same ConsentRow, card Box, contents Divider, conditional negative Notice) — but it carries a different ogn id in the `nova-mbr-legacy` group, so reusing it directly would break the SB ogn-id ↔ `POL-MBR-TERM-001-06` binding. system-consistency note: `TermAgree` is essentially a clone of `CheckboxTerms` and is itself reused unchanged across FP-001 and FP-009; this duplication is real and recorded as a future shared-consent-primitive consolidation candidate, not hidden.
- distortionRisk: medium — emphasis must stay first-row-only and the block notice must stay state-bound

### [actions]

- slot: `Bottom`
- OGN: progression action sourced from `ogn-mbr-term-agree`'s navigate behavior; rendered via chrome `MbrFpActionBar` (non-OGN action bar)
- role: Own the bottom progression action and reflect the blocked state until required terms are re-agreed.
- visibleContent: single primary CTA `다음으로 가기`, disabled until required terms are re-checked
- policy: enforces `POL-MBR-TERM-001-06`; `FP009-NEXT-ACTION` (navigate to `NOVA-MBR-FP-010-0` carrying 동의이력ID·세션ID)
- appliedGovernanceRefs: `UXPT_BTN` (single verb-form primary action, state-driven enable/disable), `UXPT_NAV` (forward step in the dormant-release flow), `VOT_RUL`
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
  - decision: structural CTA chrome only; enablement is sourced from `ogn-mbr-term-agree` and the action bar is not registered as a policy OGN
- layoutStrategy: fixed `Bottom(preset="primary-cta")`; content never builds its own fixed CTA chrome; CTA stays a single primary action
- layoutContract:
  - role: progress to the next dormant-release step when required re-consent is satisfied
  - structure: bottom rail with one full-width primary button
  - alignment: centered CTA label
  - density: fixed action area, not scroll content
  - wrapping: label stays one line
  - distortionRisk: placing the CTA in content, enabling it before required re-consent, or adding secondary actions
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
    reason: owns the fixed bottom primary action with a disabled state, no route-level layout; reused unchanged from `NOVA-MBR-FP-001-0`; non-OGN chrome so it carries no policy ogn-id contract
    risk: none; enablement is driven by required-consent state from `ogn-mbr-term-agree`
- deviationReason: `MbrPrimaryCTABar` (`fit: strong`) is functionally equivalent and is honestly the closest reuse; the chrome `MbrFpActionBar` is reused unchanged from `NOVA-MBR-FP-001-0` and was introduced only because the bottom action is non-OGN chrome (no policy ogn-id) and keeping it in the FP `_chrome` group avoids importing a `nova-mbr-legacy` organism boundary. `MbrFpActionBar` is a near-line-for-line clone of `MbrPrimaryCTABar` — this duplication is real and recorded as a future shared-action-bar consolidation candidate, not hidden.
- distortionRisk: medium — risk if documented as always-enabled or if secondary actions are added

## Policy / OGN Matrix

| section | visibleEvidence | policyInterpretation | OGNInterpretation | decision |
| --- | --- | --- | --- | --- |
| `intro` | `약관 동의`, `휴면 해제를 위해 약관에 다시 동의해 주세요` | introduces the re-agreement task before the blocking consent; aligns to `POL-MBR-TERM-001-06` framing in the dormant-release flow | chrome `FpPageHeader` (non-OGN page header) | keep as the first content section, no card, no divider band |
| `terms` | required/optional badged term rows, accordion full text, loading/error states | SB-grounded `FP009-TERM-LIST` family; reading must precede the `POL-MBR-TERM-001-06` re-agreement | `ogn-mbr-term-list` (`TermList`) owns card + accordion + contents dividers | keep document reading separate from consent; states stay OGN-internal |
| `agreement` | all-agree row, per-term consent rows, negative notice `필수 약관에 동의해 주세요` | visible source for `POL-MBR-TERM-001-06`; required re-consent gates progression | `ogn-mbr-term-agree` (`TermAgree`) owns all-agree emphasis + rows + conditional notice | keep consent hierarchy and required-block notice inside the OGN |
| `actions` | disabled bottom CTA `다음으로 가기` | progression blocked until required re-agreement satisfied (`POL-MBR-TERM-001-06`) | progression sourced from `ogn-mbr-term-agree`; rendered via chrome `MbrFpActionBar` | keep the action in `Bottom(preset="primary-cta")` as a single primary CTA |

## Distortion Gates

Layout Distortion Gate — 8-signal review:

1. Repeated `항목명 → 값/상태` rows forming an unintended key-value group: not present. `terms` is a read-only document list and `agreement` is a consent-control list; neither is a label/value summary, and they are separated into two distinct cards so the row meaning never collapses into a key-value table.
2. Mixed title/subtitle/body hierarchy within a section: not present. `terms` rows use `Text(listTitle)` with no elevated row; `agreement` uses `Text(sectionTitle)` for the 전체 동의 row only (emphasisRule first-row-only) and `Text(listTitle)` for individual rows — the two cards do not duplicate or invert hierarchy.
3. Label/value column collision or baseline drift: not applicable; there is no two-column label/value layout. Checkbox column stays stable with `minWidth:0` text stacks.
4. Long policy sentence hiding the CTA, cards, or next section: not present. The required-block message is a bounded `Notice` below the consent card; the CTA stays in the fixed `Bottom` rail and is never overlapped by content.
5. Important values over-wrapping and breaking row structure: not present; term titles and consent captions wrap within their own rows without squeezing controls.
6. Two-column / split row height-rhythm break: not applicable; no split layout is used.
7. Fixed bottom action overlapping scroll content or clipping the last section: not present. `Bottom(preset="primary-cta")` is a separate fixed rail; the last content section (`agreement`) is not clipped by the action.
8. Route-level padding / negative margin / raw width / arbitrary fontSize needed to align: not needed. Card surface, dividers, and spacing are owned by the OGNs and `@pxds/cx-layout` primitives; no route-level layout correction is required.
9. Missing slot forcing meaningless wrappers/spacers: not present; every section maps to an existing OGN or chrome that already owns its surface and slots.

Role-separation declaration:

- `terms` (`ogn-mbr-term-list`) and `agreement` (`ogn-mbr-term-agree`) are deliberately two separate cards. The first owns reading the re-agreement term documents (badge + title + accordion full text), the second owns consenting (all-agree + per-term checkboxes + required-block notice). This separation removes duplicate-hierarchy and reading-vs-consenting distortion that a single merged card would introduce.
- This screen has no minor / guardian flow; the guardian OGNs are out of scope per Screen.map.md, so no guardian section (visible or hidden) appears in the Screen Wire.
- The bottom progression action stays a single primary CTA in `Bottom(preset="primary-cta")` (`UXPT_BTN`); no secondary action is added.

Gate result: PASS — no Layout Distortion Gate signal triggers; existing OGN + chrome vocabulary (identical to `NOVA-MBR-FP-001-0` term-list/term-agree) preserves the reference's Header / scroll Content / fixed Bottom CTA layout, section order, and the term-list / term-agree / CTA position relationship in the dormant-release context.
