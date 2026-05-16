# CX-EXAMPLE-COMPLETE-ACTIVATION — 완료_개통

## Screen Contract

- screenId: `CX-EXAMPLE-COMPLETE-ACTIVATION`
- route: `/CX-EXAMPLE-COMPLETE-ACTIVATION`
- group: `cx`
- domain: `mbr`
- source: `Figma`
- pattern: `complete`
- frame: `SKT GenUI Test 0512 / Text Section / 완료_개통` (`393x852`)
- policyRefs: []
- ognIds: []
- governanceRefs: []
- notApplicableReason: Figma component proof screen. It records layout and component contract only; no policy source has been bound yet.
- required design docs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`
- AppScreen rails: `SystemHeader`, `Header`, `Content`, `Bottom`
- header contract: visible title `개통 완료`; completion pattern must not imply a back-navigation requirement from this proof screen.
- bottom contract: `Bottom(preset="guided-action")`; guided prompt and two actions stay fixed outside scroll content.
- referenceSearch:
  - checked: `apps/mobile/src/screen-diagrams/skt-genui-test-0512/list-text/*`, `apps/mobile/src/screen-diagrams/skt-genui-test-0512/detail-form/*`, nearby complete `Screen.diagram.md` files
  - result: no dedicated complete reference exists under `apps/mobile/src/screen-diagrams`; use the closest existing complete screen diagram plus the sibling CX complete proof screen for density comparison.
- wireReference:
  - source: `apps/mobile/src/app/(legacy-converted-mbr)/LEGACY-MBR-PG-002-0-CX/Screen.diagram.md`
  - matchedParts: complete-screen AppScreen rail, success hero before result summary, compact result summary card, fixed bottom action placement
  - intentionalDifferences: current proof screen has no progress/close affordance, no benefit notice, no section divider band, and uses a guided two-action bottom area instead of the legacy membership two-button exit area
  - secondaryReference: `apps/mobile/src/app/(cx)/CX-EXAMPLE-COMPLETE-PLAN-CHANGE/Screen.diagram.md` for sibling proof-screen density and structural-only treatment
  - limitation: reference-only visual structure; policy/copy/OGN ids come from `Screen.map.md` and `Screen.config.ts`

## Screen Wire

```txt
┌─AppScreen 393x852─────────────────────────────────────┐
├─Header────────────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│ 개통 완료                                             │
├─Content───────────────────────────────────────────────┤
│                                                        │
│ [completionHero]                                      │
│ 개통이 완료되었어요                                  │
│ 지금부터 새로운 휴대폰 사용이 가능해요.              │
│                                                        │
│ [completionSummary]                                   │
│ ┌─Result Summary Card──────────────────────────────┐  │
│ │ 개통 휴대폰                         갤럭시 S25  │  │
│ │ 요금제                              5GX 프라임  │  │
│ │ 개통일                              2026.05.15  │  │
│ └──────────────────────────────────────────────────┘  │
│                                                        │
├─Bottom(preset="guided-action")────────────────────────┤
│ [actions]                                             │
│ 사진이나 연락처, 앱도 새 휴대폰으로 한 번에 옮겨볼까요? │
│ ┌──────────────────────┐ ┌─────────────────────────┐ │
│ │ 홈으로 이동          │ │ 데이터 옮기기           │ │
│ └──── secondary CTA ───┘ └──── primary CTA + AI ───┘ │
└───────────────────────────────────────────────────────┘
```

## Section Contracts

### [completionHero]

- slot: `Content`
- OGN: structural-only
- policy: none; component proof screen
- appliedGovernanceRefs: none; component proof screen
- patternEvidence:
  - Pattern Analysis Gate evidence: hero has no divider, no field/list grouping, and no action surface; it is the first content stack in a simple complete screen.
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography:
    - rowTitle: complete hero display title
    - rowCaption: supporting body copy
    - emphasisRule: completion result title only
    - controlLabelScale: `matches-reference`
- patternDecision:
  - pattern: `PageStackContents` complete-title composition
  - reason: DESIGN_PATTERNS.md Completion case A and Pattern G place `TitleMain(type="complete")` before the summary card in one content flow; no visible divider or standalone card boundary separates the hero.
- layoutStrategy:
  - widthTier: `content-361`
  - padding: completion block follows SPACING_PATTERNS.md Completion spacing through the parent page stack; no route-level padding patch
  - stack: vertical title/subtitle
  - alignment: leading
  - typography: display/headline completion title followed by body supporting copy
  - wrapping: title max 2 lines; subtitle max 2 lines
  - overflow: no truncation for the current copy; expanded proof copy must remain in the same hero stack
- layoutContract:
  - role: success-result hero
  - structure: title plus one supporting sentence above the result summary card
  - alignment: leading text inside the content rail; no independent hero surface
  - density: simple-completion density with title/subtitle spacing from SPACING_PATTERNS.md Completion; no cross-sell gap
  - wrapping: title and subtitle may wrap naturally, but must not force the fixed bottom area into scroll content
  - distortionRisk: rendering the hero as a standalone card, inserting a section divider, or centering the text would break the reference complete pattern.
- componentCandidates:
  - name: `PageStackContents` title slot + `TitleMain(type="complete")`
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: strong
    reason: matches the selected `Screen.config.ts` build selection and directly supports the complete hero title/subtitle without route-level spacing.
    risk: none for the current copy.
  - name: standalone `TitleMain(type="complete")`
    source: `@pxds/cx-components`
    fit: weak
    reason: the title component can render the text hierarchy, but does not own the page-stack rail or summary spacing contract by itself.
    risk: route-level wrappers would be needed to preserve the reference density.

### [completionSummary]

- slot: `Content`
- OGN: structural-only
- policy: none; component proof screen
- appliedGovernanceRefs: none; component proof screen
- patternEvidence:
  - Pattern Analysis Gate evidence: the summary is a single card boundary with three peer key-value rows; no visible 1px contents dividers or section divider band appear in the proof wire.
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
  - pattern: compact result summary card with label-value rows
  - reason: DESIGN_PATTERNS.md Completion case A recommends a summary card after the success heading; the current Figma proof contains only short activation facts and does not show a card title, contents divider, total row, or richer detail header.
- layoutStrategy:
  - widthTier: `content-361` outer stack, `inner-329` row content
  - padding: card-owned result summary padding, aligned to SPACING_PATTERNS.md Completion result summary card padding
  - stack: key-value rows
  - alignment: split label/value; labels stable on the left, values readable on the right
  - typography: body-level label/value rows; no emphasized total row
  - wrapping: labels max 1 line; values should remain 1 line for the proof data and may wrap to 2 lines only for real longer values
  - overflow: if wrapping destabilizes row rhythm, Build must choose a stronger key-value summary candidate or return to Diagram
- layoutContract:
  - role: completed activation facts summary
  - structure: one card surface containing exactly three label-value rows: activation device, plan, activation date
  - alignment: stable split label/value rows with readable value column and no label/value collision
  - density: compact card; no internal row dividers and no outer section divider
  - wrapping: values should remain one line for current copy; future longer values must not squeeze labels into unreadable width
  - distortionRisk: a narrow fixed value column, missing card surface, or arbitrary route CSS would make key-value alignment drift.
- componentCandidates:
  - name: `SectionItem(type="card")` + `ListText(table)`
    source: `@pxds/cx-components`
    fit: medium
    reason: matches the selected `Screen.config.ts` build selection and fits the visible compact card/table rows for this proof screen.
    risk: longer values may reveal fixed-column squeeze; Build must verify the layout contract rather than rely on the candidate name.
  - name: `RQRContentsDetail`
    source: existing complete/reference summary candidate
    fit: reject
    reason: rejected for this structural-only proof screen because the stronger detail contract is unnecessary without a card title or detail header.
    risk: over-specifies the compact proof summary and may introduce visual parts not present in the wire.
  - name: domain key-value summary organism
    source: `apps/mobile/src/organisms/mbr` candidate
    fit: reject
    reason: rejected because no policy-bound activation facts or reusable domain behavior are present in `Screen.map.md`.
    risk: adds ownership and semantic weight that the component proof screen does not justify.

### [actions]

- slot: `Bottom`
- OGN: structural-only
- policy: none; component proof screen
- appliedGovernanceRefs: none; component proof screen
- patternEvidence:
  - Pattern Analysis Gate evidence: the action prompt and CTA row are in the physical Bottom rail; there is no content-section action and no inline field action.
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `Bottom(preset="guided-action")`
  - typography:
    - rowTitle: guided action prompt text
    - rowCaption: none
    - emphasisRule: right primary action only
    - controlLabelScale: `matches-reference`
- patternDecision:
  - pattern: fixed guided action area with prompt text and two CTAs
  - reason: DESIGN_PATTERNS.md Completion copy guidance keeps two-button completion actions in the bottom action area, with the left action secondary and the right action primary; this proof screen adds an AI treatment to the recommended next-step action.
- layoutStrategy:
  - widthTier: `content-361`
  - padding: bottom action area owns safe-area and CTA spacing
  - stack: prompt above horizontal two-button row
  - alignment: prompt leading; buttons equal-width stretch
  - typography: body prompt and xlarge CTA labels
  - wrapping: prompt may wrap; button labels max 1 line
  - overflow: fixed bottom slot; never converted to the last scroll section
- layoutContract:
  - role: exit plus recommended post-activation transfer action
  - structure: guidance text followed by secondary left CTA and primary right AI CTA
  - alignment: fixed bottom action area, equal button widths, primary action on the right
  - density: guided-action bottom height may exceed primary-only CTA; content must remain above it and not be hidden
  - wrapping: prompt can wrap within the bottom area; button labels must not wrap
  - distortionRisk: moving the prompt or CTAs into `Content`, reversing action hierarchy, or dropping AI treatment would break the completion action model.
- componentCandidates:
  - name: `AppScreen.Bottom(preset="guided-action")` + `SinglePrimaryAction` + `ActionButton(type="ai", buttonCount=2)`
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: strong
    reason: matches the selected `Screen.config.ts` build selection and supports guided text, two CTAs, right-primary ordering, AI treatment, and bottom safe-area behavior.
    risk: none for the current action count/copy.
  - name: `AppScreen.Bottom(preset="primary-cta")` + `SinglePrimaryAction` + `ActionButton(type="default", buttonCount=2)`
    source: sibling complete proof screen pattern
    fit: reject
    reason: primary-cta/default action treatment lacks the guided prompt and AI-specific next-step affordance required by this wire.
    risk: would either drop the guide copy or push it into scroll content.

## Policy / OGN Matrix

| requirement | sourceRef | policy | OGN | section | appliedGovernanceRefs | layoutContract summary |
| --- | --- | --- | --- | --- | --- | --- |
| `CX-COMPLETE-ACTIVATION-HERO` | Figma Text Section / 완료_개통 | structural-only | structural-only | `completionHero` | none; component proof screen | Success title and supporting sentence above summary card. |
| `CX-COMPLETE-ACTIVATION-SUMMARY` | Figma Text Section / 완료_개통 | structural-only | structural-only | `completionSummary` | none; component proof screen | Compact card with three stable label-value rows. |
| `CX-COMPLETE-ACTIVATION-ACTION` | Figma Text Section / 완료_개통 | structural-only | structural-only | `actions` | none; component proof screen | Fixed guided bottom area with left secondary and right primary AI action. |

## Distortion Gates

- Preserve the rail order: `Header`, then `Content`, then `Bottom(preset="guided-action")`; do not convert the bottom prompt/actions into scroll content.
- Keep `completionHero` and `completionSummary` in the same simple-completion content flow; no `SectionDivider`, extra cross-sell gap, standalone hero card, or inserted section wrapper.
- Summary acceptance is the layout contract, not the candidate component name: card surface, compact density, stable label/value rows, and readable values are mandatory.
- If `SectionItem(type="card")` + `ListText(table)` causes fixed-column squeeze, missing card padding, or label/value collision, Build must choose a stronger key-value candidate or return to Diagram; route-level CSS patching is not allowed.
- Preserve action hierarchy and order: `홈으로 이동` is secondary/left, `데이터 옮기기` is primary/right with AI treatment.
- The guided prompt may wrap inside `Bottom`, but button labels must remain one line and the bottom safe area must remain owned by the bottom pattern.
- Do not invent policy ids, OGN ids, activation business rules, data-transfer eligibility, or navigation behavior from the Figma proof screen.
- Do not use deprecated `@pxds/pxds-components`, deprecated `@pxds/pxds-icons`, raw route padding/margin/width/font-size patches, or hidden spacer nodes to match the wire.
