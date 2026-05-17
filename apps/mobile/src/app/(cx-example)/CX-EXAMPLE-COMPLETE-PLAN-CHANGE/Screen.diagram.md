# CX-EXAMPLE-COMPLETE-PLAN-CHANGE - Complete plan change Diagram

## Screen Contract

- screenId: `CX-EXAMPLE-COMPLETE-PLAN-CHANGE`
- route: `/CX-EXAMPLE-COMPLETE-PLAN-CHANGE`
- group: `cx-example`
- domain: `mbr`
- source: `Figma`
- pattern: `complete`
- frame: `SKT GenUI Test 0512 / Text Section / 완료_요금제 변경` (`393x852`)
- policyRefs: []
- ognIds: []
- governanceRefs: []
- notApplicableReason: Figma component proof screen. It records layout and component contract only; no policy source has been bound yet.
- requiredDesignDocs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`
- mapSource: `Screen.map.md`
- configBuildSelections: preserve selected candidate names from `Screen.config.ts` verbatim.
- AppScreen rails: `SystemHeader`, `Header`, `Content`, `Bottom`
- headerContract: visible title `요금제 변경`; no back-navigation behavior is inferred from this structural proof screen.
- bottomContract: `Bottom(preset="primary-cta")`; the single confirmation action remains fixed outside scroll content.
- wireReference:
  - source: `apps/mobile/src/app/(cx-example)/CX-EXAMPLE-COMPLETE-ACTIVATION/Screen.diagram.md`
  - matchedParts: simple-completion AppScreen rail, completion hero above result summary, compact summary card with three label-value rows, fixed bottom action placement.
  - intentionalDifferences: current screen uses plan-change copy, plan/effective-date/price rows, no guided prompt, and one primary confirmation CTA instead of the activation screen's guided two-action bottom area.
  - limitation: reference-only visual structure; policy/copy/OGN ids come from `Screen.map.md` and `Screen.config.ts`.
- referenceSearch:
  - `apps/mobile/src/screen-diagrams/skt-genui-test-0512/detail-form/payment-checkout.diagram.md`: secondary evidence for `Bottom(preset="primary-cta")` and key-value rows, but rejected as the primary wire because it is a long checkout/payment pattern with many divider-separated sections.
  - `apps/mobile/src/screen-diagrams/skt-genui-test-0512/detail-form/personal-info-input.diagram.md`: secondary evidence for `PageStackContents` title plus card/list summary, but rejected as the primary wire because it is a form/detail state rather than a completion state.
  - `apps/mobile/src/app/(wds-mbr-legacy)/LEGACY-MBR-PG-002-0-CX/Screen.diagram.md`: nearby complete pattern evidence for hero/summary/action order; used as supporting evidence only because it has legacy conversion concerns and extra sections not present here.

## Screen Wire

```txt
┌─AppScreen 393x852─────────────────────────────────────┐
├─Header────────────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│ 요금제 변경                                           │
├─Content───────────────────────────────────────────────┤
│                                                        │
│ [completionHero | completion-hero | leading]           │
│ 요금제 변경이 완료되었어요                            │
│ 변경된 요금제는 다음 청구 주기부터 적용돼요.          │
│                                                        │
│ [completionSummary | key-value-summary | card]        │
│ ┌─Result Summary Card──────────────────────────────┐  │
│ │ 변경 정보                                        │  │
│ │ 변경한 요금제                       5GX 프라임   │  │
│ │ 적용일                              2026.05.16   │  │
│ │ 월정액                              89,000원     │  │
│ └──────────────────────────────────────────────────┘  │
│                                                        │
├─Bottom(preset="primary-cta")──────────────────────────┤
│ [actions | bottom-primary-action | bottom-fixed]      │
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
  - pattern: `PageStackContents` title slot + `TitleMain(type="complete")` composition inside the first content stack
  - reason: Wire Semantic Tag `[completionHero | completion-hero | leading]` confirms this section's role is a leading completion hero — no standalone card surface, no divider, no centering. DESIGN_PATTERNS.md Completion case A and Pattern G place the success heading before the summary card in one content flow with no visible divider or standalone hero boundary separating the two sections.
- ognBoundaryDecision: `structural-only` — no config OGN id is bound; the screen owns this proof hero slot and no organism-owned policy meaning is introduced.
- layoutStrategy:
  - widthTier: `content-361`
  - padding: parent page stack owns completion spacing; follows  Completion message block spacing.
  - stack: vertical title/subtitle
  - alignment: leading
  - typography: complete display/headline title, then body-level support copy
  - wrapping: title max 2 lines; subtitle max 2 lines
  - overflow: multiline copy remains inside the hero stack; no truncation for the configured title/supporting copy.
- layoutContract:
  - role: success-result hero
  - structure: one completion title plus one supporting sentence above the summary card.
  - alignment: leading text on the content rail; no independent card or centered splash treatment.
  - density: simple completion density with compact vertical rhythm; no section divider, icon-only hero, or cross-sell gap.
  - wrapping: title and subtitle may wrap naturally, but must not force the fixed bottom CTA into scroll content.
  - distortionRisk: converting the hero into a separate card, adding a divider, or using route-level spacing would break the simple completion pattern.
- componentCandidates:
  - name: `` `PageStackContents` title slot + `TitleMain(type="complete")` ``
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: strong
    reason: Directly supports the `completion-hero / leading` layout contract — owns the page-stack rail, completion title/subtitle hierarchy, and content spacing without route-level patching. Matches the approved `Screen.config.ts` build selection verbatim. No known Distortion Gate risk for the configured copy hierarchy.
  - name: `` `PageStackContents` + `TitleSection` ``
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: reject
    reason: `TitleSection` targets ordinary detail/form section headings, not the completion display hierarchy required by Pattern G. Downgrades the success-state recognition and weakens the `completion-hero` role.
    risk: completion result title emphasis is lost; success state is indistinguishable from a mid-flow section heading.

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
    - cardHeader: authored card title "변경 정보" (structural proof, not policy copy)
    - rowTitle: key label text (peer label rows below the authored card header)
    - rowCaption: none
    - emphasisRule: none; all rows are peer result facts
    - controlLabelScale: `matches-reference`
- patternDecision:
  - pattern: compact completion result summary card with an authored card title header and label-value rows
  - reason: Wire Semantic Tag `[completionSummary | key-value-summary | card]` triggers the Summary Card Decision Rule. Three label-value rows appear inside a card-bounded surface with no internal dividers. Per user instruction, RQRContentsDetail is force-applied and its mandatory `title` prop is satisfied by the authored card title "변경 정보" — an intentional structural-proof header, not policy copy.
- ognBoundaryDecision: `structural-only` — no config OGN id is bound; the screen owns the authored summary-card slot and proof rows, with no organism-owned plan-change policy meaning.

#### Summary Card Decision Rule

- patternFamily: `card-key-value-summary`
- requiredCapability:
  - section heading/header slot REQUIRED — an authored card title (`변경 정보`) is provided to satisfy RQRContentsDetail's mandatory `title` prop; this is an intentional structural-proof header, not policy copy.
  - card surface ownership: the component or composition must own background color, border-radius, and outer padding; the route must not supply these via raw CSS.
  - padding/radius ownership: card padding and corner radius must be internal to the candidate, not applied at route level.
  - stable label-value relationship: labels must remain stable on the left column; values must remain readable on the right; neither column may steal width from the other.
  - value wrapping without column squeeze: longer future values must be able to wrap to two lines without compressing the label column into illegibility.
  - reference density preservation: the compact three-row card density from the Figma proof must be preserved; any outer section divider or extra spacing not present in the wire is a distortion.

- layoutStrategy:
  - widthTier: `content-361` outer card rail, `inner-329` row content
  - padding: card-owned result summary padding; aligns to  Completion result summary card padding.
  - stack: key-value rows
  - alignment: split label/value with stable left labels and readable right values
  - typography: body-level label/value rows; no emphasized total row
  - wrapping: labels max 1 line; proof values max 1 line; future longer values may wrap to 2 lines only if row rhythm remains readable.
  - overflow: if values squeeze or destabilize the row rhythm, Build must choose a stronger key-value candidate or return to Diagram.
- layoutContract:
  - role: completed plan-change facts summary
  - structure: one RQRContentsDetail card: authored card title header "변경 정보" + three label-value rows: changed plan, effective date, monthly price.
  - alignment: stable split label/value alignment; the value column must remain readable and must not steal label width.
  - density: compact card without inner row dividers; card background/radius/padding are owned by the component/composition.
  - wrapping: proof values should stay one line; future longer values must not create a narrow fixed-column squeeze.
  - distortionRisk: fixed-width table values or arbitrary route-level CSS would distort the summary card. The card title "변경 정보" is an intentionally authored structural-proof header — do not patch the component-owned card surface, header, padding, or radius with route CSS.
- componentCandidates:
  - name: `RQRContentsDetail`
    source: `packages/cx-components/src/candidate/rqr-contents-detail/RQRContentsDetail.tsx` (exported from `@pxds/cx-components`)
    fit: strong
    selected: true
    reason: With the authored card title "변경 정보" satisfying its mandatory `title` prop, RQRContentsDetail is force-applied per user instruction. It natively owns the card surface, authored header, internal header-to-rows spacing (16px), card padding (24px), border-radius (20px), and stable label/value rows without route-level CSS. The authored header is structural-proof copy, not policy copy. Mirrors the LEGACY-MBR-PG-002-0-CX consumer pattern with a `rows` constant of `{ id, label, value }` items passed to `rows={...}`.
  - name: `` `SectionItem(type="card")` + `ListText(table)` ``
    source: `@pxds/cx-components`
    fit: medium
    selected: false
    reason: A valid no-header card composition: `SectionItem(type="card")` owns the card surface, background, radius, and padding, and `ListText(table)` renders peer label-value rows. However, this screen now authors a card title header ("변경 정보") that RQRContentsDetail owns natively, making RQRContentsDetail the correct selection. Not selected.
    risk: `ListText(table)` uses a fixed column layout that may squeeze value cells when future plan names or amounts are longer than proof values.
  - name: domain key-value summary organism
    source: `apps/mobile/src/organisms/nova-mbr-legacy` candidate
    fit: reject
    reason: No policy-bound plan-change facts exist in `Screen.map.md`; a reusable domain organism adds unjustified ownership and semantic weight for a structural-only component proof screen. Consistent with the sibling `CX-EXAMPLE-COMPLETE-ACTIVATION` diagram reject decision for cross-screen consistency.
    risk: N/A — rejected; premature domain organism extraction not warranted by this structural-only proof screen.
  - name: plain `` `ListText(table)` `` without card surface
    source: `@pxds/cx-components`
    fit: reject
    reason: Does not satisfy the `card surface ownership` and `padding/radius ownership` required capabilities. Omits the required summary card boundary and card-owned padding/radius.
    risk: Collapses the completion summary into unframed content and breaks the reference density. Fails the Summary Card Decision Rule at the `card surface ownership` capability check.

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
  - reason: Wire Semantic Tag `[actions | bottom-primary-action | bottom-fixed]` confirms the section is a fixed bottom primary action zone — not scroll content. Completion case A and Pattern G place the completion confirmation action in the fixed bottom action zone. `bottom-fixed` boundary prevents treating the CTA as the last scroll section.
- ognBoundaryDecision: `structural-only` — no config OGN id is bound; `AppScreen.Bottom` owns the proof action slot and no organism-owned navigation or policy meaning is introduced.
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
  - name: `` `AppScreen.Bottom(preset="primary-cta")` + `SinglePrimaryAction` + `ActionButton(type="default", buttonCount=1)` ``
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: strong
    reason: Directly satisfies the `bottom-primary-action / bottom-fixed` layout contract. Owns the physical Bottom rail, safe-area behavior, and single full-width CTA without route-level width or spacing patches. Matches the approved `Screen.config.ts` build selection verbatim. No known Distortion Gate risk for the configured action count and CTA text.
  - name: `` `ActionButton(type="default", buttonCount=1)` `` in `Content`
    source: `@pxds/cx-components`
    fit: reject
    reason: Button capability is valid, but `Content` placement violates the `bottom-fixed` boundary from the Wire Semantic Tag and the fixed bottom completion action contract.
    risk: Bottom safe-area behavior and completion exit hierarchy are lost; the CTA becomes ambiguous relative to scroll content.

## Policy / OGN Matrix

| requirement | sourceRef | policy | OGN | section | appliedGovernanceRefs | layoutContract summary |
| --- | --- | --- | --- | --- | --- | --- |
| `CX-COMPLETE-PLAN-HERO` | Figma Text Section / 완료_요금제 변경 | structural-only | structural-only | `completionHero` | none; component proof screen | Completion title and supporting sentence above the summary card; leading alignment, no card boundary, no divider. |
| `CX-COMPLETE-PLAN-SUMMARY` | Figma Text Section / 완료_요금제 변경 | structural-only | structural-only | `completionSummary` | none; component proof screen | One RQRContentsDetail card: authored card title header "변경 정보" (structural-proof, not policy copy) + three stable label-value rows; card surface, header, padding (24px), and radius (20px) are RQRContentsDetail-owned. |
| `CX-COMPLETE-PLAN-ACTION` | Figma Text Section / 완료_요금제 변경 | structural-only | structural-only | `actions` | none; component proof screen | Fixed bottom area with one full-width primary confirmation CTA; `Bottom(preset="primary-cta")` owns safe-area. |

## Distortion Gates

- Preserve rail order: `SystemHeader` / `Header`, then scroll `Content`, then `Bottom(preset="primary-cta")`. Do not reorder or collapse any rail.
- Use the nearby complete wire reference only for visual structure; do not import activation, signup, checkout, or payment business rules.
- Keep `[completionHero | completion-hero | leading]` and `[completionSummary | key-value-summary | card]` in the same simple-completion content flow; do not insert a `SectionDivider`, standalone hero card, extra cross-sell section, or route-level gap between the two sections.
- Summary acceptance is the layout contract, not the component name: card surface ownership, card-owned header/padding/radius, stable split label/value alignment, and readable values are mandatory. A candidate that fails the Summary Card Decision Rule `requiredCapability` check must not be accepted.
- The card title "변경 정보" is an intentionally authored structural-proof header (not policy-bound, no policy ID); RQRContentsDetail owns the card surface, header, padding (24px), and radius (20px) — do not patch with route-level CSS or strip the component-owned card header.
- Keep `[actions | bottom-primary-action | bottom-fixed]` in `Bottom(preset="primary-cta")`; never render the confirmation CTA as the last scroll content section.
- Preserve action hierarchy: `확인` is the only primary action and must remain full width inside the fixed bottom area.
- Do not invent policy IDs, OGN IDs, billing-cycle rules, price calculation rules, eligibility states, or navigation destinations from this Figma component proof screen.
- Do not add deprecated `@pxds/pxds-components` or `@pxds/pxds-icons` imports.
