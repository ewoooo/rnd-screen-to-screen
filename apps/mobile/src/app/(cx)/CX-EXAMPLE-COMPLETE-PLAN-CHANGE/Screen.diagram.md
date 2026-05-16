# CX-EXAMPLE-COMPLETE-PLAN-CHANGE - Complete plan change Diagram

## Screen Contract

- screenId: `CX-EXAMPLE-COMPLETE-PLAN-CHANGE`
- route: `/CX-EXAMPLE-COMPLETE-PLAN-CHANGE`
- group: `cx`
- domain: `mbr`
- source: `Figma`
- pattern: `complete`
- frame: `SKT GenUI Test 0512 / Text Section / 완료_요금제 변경` (`393x852`)
- policyRefs: []
- ognIds: []
- governanceRefs: []
- notApplicableReason: Figma component proof screen. It records layout and component contract only; no policy source has been bound yet.
- requiredDesignDocs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`
- mapSource: `Screen.map.md`
- configBuildSelections: preserve selected candidate names from `Screen.config.ts` verbatim.
- AppScreen rails: `SystemHeader`, `Header`, `Content`, `Bottom`
- headerContract: visible title `요금제 변경`; no back-navigation behavior is inferred from this structural proof screen.
- bottomContract: `Bottom(preset="primary-cta")`; the single confirmation action remains fixed outside scroll content.
- wireReference:
  - source: `apps/mobile/src/app/(cx)/CX-EXAMPLE-COMPLETE-ACTIVATION/Screen.diagram.md`
  - matchedParts: simple-completion AppScreen rail, completion hero above result summary, compact summary card with three label-value rows, fixed bottom action placement.
  - intentionalDifferences: current screen uses plan-change copy, plan/effective-date/price rows, no guided prompt, and one primary confirmation CTA instead of the activation screen's guided two-action bottom area.
  - limitation: reference-only visual structure; policy/copy/OGN ids come from `Screen.map.md` and `Screen.config.ts`.
- referenceSearch:
  - `apps/mobile/src/screen-diagrams/skt-genui-test-0512/detail-form/payment-checkout.diagram.md`: secondary evidence for `Bottom(preset="primary-cta")` and key-value rows, but rejected as the primary wire because it is a long checkout/payment pattern with many divider-separated sections.
  - `apps/mobile/src/screen-diagrams/skt-genui-test-0512/detail-form/personal-info-input.diagram.md`: secondary evidence for `PageStackContents` title plus card/list summary, but rejected as the primary wire because it is a form/detail state rather than a completion state.
  - `apps/mobile/src/app/(legacy-converted-mbr)/LEGACY-MBR-PG-002-0-CX/Screen.diagram.md`: nearby complete pattern evidence for hero/summary/action order; used as supporting evidence only because it has legacy conversion concerns and extra sections not present here.
- Pattern Analysis Gate evidence:
  - screenPattern: `DESIGN_PATTERNS.md` Completion case A / Pattern G simple completion.
  - sectionBoundary: no 4px `SectionDivider` is present between hero and summary; summary uses only a card boundary.
  - fieldGrouping: none; this screen has no form fields.
  - rowSeparators: none; the summary rows are compact label-value rows without visible internal dividers.
  - actionPlacement: `Bottom(preset="primary-cta")`.
  - typography: completion hero title is the only display/headline emphasis; summary rows remain peer body-level facts; CTA is the only primary action label.

## Screen Wire

```txt
┌─AppScreen 393x852─────────────────────────────────────┐
├─Header────────────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│ 요금제 변경                                           │
├─Content───────────────────────────────────────────────┤
│                                                        │
│ [completionHero]                                      │
│ 요금제 변경이 완료되었어요                            │
│ 변경된 요금제는 다음 청구 주기부터 적용돼요.          │
│                                                        │
│ [completionSummary]                                   │
│ ┌─Result Summary Card──────────────────────────────┐  │
│ │ 변경한 요금제                       5GX 프라임   │  │
│ │ 적용일                              2026.05.16   │  │
│ │ 월정액                              89,000원     │  │
│ └──────────────────────────────────────────────────┘  │
│                                                        │
├─Bottom(preset="primary-cta")──────────────────────────┤
│ [actions]                                             │
│ ┌──────────────────────────────────────────────────┐  │
│ │                       확인                       │  │
│ └──────────────────── full-width primary CTA ──────┘  │
└───────────────────────────────────────────────────────┘
```

## Section Contracts

### [completionHero]

- slot: `Content`
- OGN: `structural-only`
- policy: none; component proof screen
- appliedGovernanceRefs: none; component proof screen
- patternEvidence:
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography:
    - rowTitle: complete hero display/headline title
    - rowCaption: supporting body copy
    - emphasisRule: completion result title only
    - controlLabelScale: `matches-reference`
- patternDecision:
  - pattern: `PageStackContents` completion hero inside the first content stack
  - reason: Completion case A places the success heading before the summary card; no visible divider or standalone hero surface separates the two sections.
- layoutStrategy:
  - widthTier: `content-361`
  - padding: parent page stack owns completion spacing; follows `SPACING_PATTERNS.md` Completion message block spacing.
  - stack: vertical title/subtitle
  - alignment: leading
  - typography: complete display/headline title, then body-level support copy
  - wrapping: title max 2 lines; subtitle max 2 lines
  - overflow: multiline copy remains inside the hero stack; no truncation for current copy.
- layoutContract:
  - role: success-result hero
  - structure: one completion title plus one supporting sentence above the summary card.
  - alignment: leading text on the content rail; no independent card or centered splash treatment.
  - density: simple completion density with compact vertical rhythm; no section divider, icon-only hero, or cross-sell gap.
  - wrapping: title and subtitle may wrap naturally, but must not force the fixed bottom CTA into scroll content.
  - distortionRisk: converting the hero into a separate card, adding a divider, or using route-level spacing would break the simple completion pattern.
- componentCandidates:
  - name: `PageStackContents` title slot + `TitleMain(type="complete")`
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: strong
    reason: Matches the config-selected build composition and directly supports a completion title/subtitle in the content rail without route-level spacing patches.
    risk: none for current copy; verify future longer copy against the 1-viewport simple-completion budget.
  - name: `PageStackContents` + `TitleSection`
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: reject
    reason: `TitleSection` is suitable for ordinary detail/form sections, not the completion display hierarchy required by Pattern G.
    risk: downgrades the completion result title and weakens success-state recognition.

### [completionSummary]

- slot: `Content`
- OGN: `structural-only`
- policy: none; component proof screen
- appliedGovernanceRefs: none; component proof screen
- patternEvidence:
  - sectionBoundary: `cardBoundary`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography:
    - rowTitle: key label text
    - rowCaption: none
    - emphasisRule: none; all rows are peer result facts
    - controlLabelScale: `matches-reference`
- patternDecision:
  - pattern: compact completion result summary card with label-value rows
  - reason: Completion case A recommends a summary card after the success message; the current Figma proof has exactly three short plan-change facts and no card header or internal dividers.
- layoutStrategy:
  - widthTier: `content-361` outer card rail, `inner-329` row content
  - padding: card-owned result summary padding; aligns to `SPACING_PATTERNS.md` Completion result summary card padding.
  - stack: key-value rows
  - alignment: split label/value with stable left labels and readable right values
  - typography: body-level label/value rows; no emphasized total row
  - wrapping: labels max 1 line; current values max 1 line; future longer values may wrap to 2 lines only if row rhythm remains readable.
  - overflow: if values squeeze or destabilize the row rhythm, Build must choose a stronger key-value candidate or return to Diagram.
- layoutContract:
  - role: completed plan-change facts summary
  - structure: one card surface containing exactly three label-value rows: changed plan, effective date, monthly price.
  - alignment: stable split label/value alignment; the value column must remain readable and must not steal label width.
  - density: compact card without inner row dividers; card background/radius/padding are owned by the component/composition.
  - wrapping: current proof values should stay one line; future longer values must not create a narrow fixed-column squeeze.
  - distortionRisk: fixed-width table values, arbitrary route CSS, or adding a title/header not present in the proof would distort the summary card.
- componentCandidates:
  - name: `SectionItem(type="card")` + `ListText(table)`
    source: `@pxds/cx-components`
    fit: medium
    reason: Matches the config-selected build composition and the visible compact card/table rows for the current short Figma proof values.
    risk: `ListText(table)` may expose fixed-column squeeze with longer values; Build must verify against the layout contract rather than treating the candidate name as sufficient.
  - name: `RQRContentsDetail`
    source: nearby complete/reference summary candidate
    fit: medium
    reason: Stronger fallback when a dedicated card + key-value summary contract is needed.
    risk: May over-specify this structural proof screen because there is no visible card title/detail header.
  - name: domain key-value summary organism
    source: `apps/mobile/src/organisms/mbr` candidate
    fit: weak
    reason: Useful only if plan-change facts become policy-bound and reusable across screens.
    risk: Unnecessary organism ownership for a structural-only component proof screen.
  - name: plain `ListText(table)` without card surface
    source: `@pxds/cx-components`
    fit: reject
    reason: Omits the required summary card boundary and card-owned padding/radius.
    risk: collapses completion summary into unframed content and breaks the reference density.

### [actions]

- slot: `Bottom`
- OGN: `structural-only`
- policy: none; component proof screen
- appliedGovernanceRefs: none; component proof screen
- patternEvidence:
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `Bottom(preset="primary-cta")`
  - typography:
    - rowTitle: primary CTA label
    - rowCaption: none
    - emphasisRule: single primary action
    - controlLabelScale: `matches-reference`
- patternDecision:
  - pattern: fixed simple-completion primary CTA area
  - reason: Completion case A and Pattern G place the completion confirmation action in the fixed bottom action zone, not as the final scroll section.
- layoutStrategy:
  - widthTier: `content-361`
  - padding: bottom action area owns safe-area and CTA spacing.
  - stack: single full-width CTA
  - alignment: centered label, stretch button width
  - typography: large/xlarge CTA label
  - wrapping: button label max 1 line
  - overflow: fixed bottom slot; never converted to content flow.
- layoutContract:
  - role: completion confirmation action
  - structure: one full-width primary CTA in `Bottom(preset="primary-cta")`.
  - alignment: fixed bottom action area; centered label inside a stretched button.
  - density: standard primary-cta bottom height; scroll content remains visible above it.
  - wrapping: `확인` must remain one line.
  - distortionRisk: moving the CTA into `Content`, adding a second action, or losing safe-area behavior makes the completion exit ambiguous.
- componentCandidates:
  - name: `AppScreen.Bottom(preset="primary-cta")` + `SinglePrimaryAction` + `ActionButton(type="default", buttonCount=1)`
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: strong
    reason: Matches the config-selected build composition and directly supports one full-width confirmation CTA in the bottom slot.
    risk: none for the current action count/copy.
  - name: `ActionButton(type="default", buttonCount=1)` in `Content`
    source: `@pxds/cx-components`
    fit: reject
    reason: Button capability is valid, but placement in content violates the fixed bottom completion action contract.
    risk: bottom safe-area behavior and exit hierarchy are lost.

## Policy / OGN Matrix

| requirement | sourceRef | policy | OGN | section | appliedGovernanceRefs | layoutContract summary |
| --- | --- | --- | --- | --- | --- | --- |
| `CX-COMPLETE-PLAN-HERO` | Figma Text Section / 완료_요금제 변경 | structural-only | structural-only | `completionHero` | none; component proof screen | Completion title and supporting sentence above the summary card. |
| `CX-COMPLETE-PLAN-SUMMARY` | Figma Text Section / 완료_요금제 변경 | structural-only | structural-only | `completionSummary` | none; component proof screen | One compact card with three stable label-value rows. |
| `CX-COMPLETE-PLAN-ACTION` | Figma Text Section / 완료_요금제 변경 | structural-only | structural-only | `actions` | none; component proof screen | Fixed bottom area with one full-width primary confirmation CTA. |

## Distortion Gates

- Preserve rail order: `SystemHeader` / `Header`, then scroll `Content`, then `Bottom(preset="primary-cta")`.
- Use the nearby complete wire only for visual structure; do not import activation, signup, checkout, or payment business rules.
- Keep `[completionHero]` and `[completionSummary]` in the same simple completion content flow; do not insert a `SectionDivider`, standalone hero card, or cross-sell section.
- Summary acceptance is the layout contract, not the component name: card surface, card-owned padding/radius, stable label/value alignment, and readable values are mandatory.
- If `SectionItem(type="card")` + `ListText(table)` causes fixed-column squeeze, Build must choose a stronger key-value candidate or return to Diagram; route-level raw CSS is not allowed.
- Keep `[actions]` in `Bottom(preset="primary-cta")`; never render the confirmation CTA as the last scroll content section.
- Preserve action hierarchy: `확인` is the only primary action and remains full width.
- Do not invent policy IDs, OGN IDs, billing-cycle rules, price calculation rules, eligibility states, or navigation destinations from this Figma component proof.
- Do not add deprecated `@pxds/pxds-components` or `@pxds/pxds-icons` imports.
