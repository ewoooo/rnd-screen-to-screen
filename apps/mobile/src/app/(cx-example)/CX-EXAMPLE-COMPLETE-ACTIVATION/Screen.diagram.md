# CX-EXAMPLE-COMPLETE-ACTIVATION — 완료_개통

## Screen Contract

- screenId: `CX-EXAMPLE-COMPLETE-ACTIVATION`
- route: `/CX-EXAMPLE-COMPLETE-ACTIVATION`
- group: `cx-example`
- domain: `mbr`
- source: `Figma`
- pattern: `complete`
- frame: `SKT GenUI Test 0512 / Text Section / 완료_개통` (`393x852`)
- policyRefs: []
- ognIds: []
- governanceRefs: []
- notApplicableReason: Figma component proof screen. It records layout and component contract only; no policy source has been bound yet.
- required design docs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`
- AppScreen rails: `SystemHeader`, `Header`, `Content`, `Bottom`
- header contract: visible title `개통 완료`; completion pattern must not imply a back-navigation requirement from this proof screen.
- bottom contract: `Bottom(preset="guided-action")`; guided prompt and two actions stay fixed outside scroll content.
- configBuildSelections: preserve selected candidate names from Screen.config.ts verbatim.
- referenceSearch:
  - checked: `apps/mobile/src/screen-diagrams/skt-genui-test-0512/list-text/*`, `apps/mobile/src/screen-diagrams/skt-genui-test-0512/detail-form/*`, nearby complete `Screen.diagram.md` files
  - result: no dedicated complete reference exists under `apps/mobile/src/screen-diagrams`; use the closest existing complete screen diagram plus the sibling CX complete proof screen for density comparison.
- wireReference:
  - source: `apps/mobile/src/app/(wds-mbr-legacy)/LEGACY-MBR-PG-002-0-CX/Screen.diagram.md`
  - matchedParts: complete-screen AppScreen rail, success hero before result summary, compact result summary card, fixed bottom action placement
  - intentionalDifferences: current proof screen has no progress/close affordance, no benefit notice, no section divider band, and uses a guided two-action bottom area instead of the legacy membership two-button exit area
  - secondaryReference: `apps/mobile/src/app/(cx-example)/CX-EXAMPLE-COMPLETE-PLAN-CHANGE/Screen.diagram.md` for sibling proof-screen density and structural-only treatment
  - limitation: reference-only visual structure; policy/copy/OGN ids come from `Screen.map.md` and `Screen.config.ts`

## Screen Wire

```txt
┌─AppScreen 393x852─────────────────────────────────────┐
├─Header────────────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
│ 개통 완료                                             │
├─Content───────────────────────────────────────────────┤
│                                                        │
│ [completionHero | completion-hero | leading]          │
│ 개통이 완료되었어요                                  │
│ 지금부터 새로운 휴대폰 사용이 가능해요.              │
│                                                        │
│ [completionSummary | key-value-summary | card]        │
│ ┌─Result Summary Card──────────────────────────────┐  │
│ │ 개통 정보  (authored card title)                │  │
│ │ 개통 휴대폰                         갤럭시 S25  │  │
│ │ 요금제                              5GX 프라임  │  │
│ │ 개통일                              2026.05.15  │  │
│ └──────────────────────────────────────────────────┘  │
│                                                        │
├─Bottom(preset="guided-action")────────────────────────┤
│ [actions | bottom-guided-action | bottom-fixed]       │
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
  - reason: Wire Semantic Tag `[completionHero | completion-hero | leading]` identifies a leading completion hero with no card boundary or divider. DESIGN_PATTERNS.md Completion case A places `TitleMain(type="complete")` before the summary card in one content flow; no visible divider or standalone card boundary separates the hero from the summary.
- layoutStrategy:
  - widthTier: `content-361`
  - padding: completion block follows DESIGN_PATTERNS.md Completion spacing through the parent page stack; no route-level padding patch
  - stack: vertical title/subtitle
  - alignment: leading
  - typography: display/headline completion title followed by body supporting copy
  - wrapping: title max 2 lines; subtitle max 2 lines
  - overflow: no truncation for the current copy; expanded proof copy must remain in the same hero stack
- layoutContract:
  - role: success-result hero
  - structure: title plus one supporting sentence above the result summary card
  - alignment: leading text inside the content rail; no independent hero surface
  - density: simple-completion density with title/subtitle spacing from DESIGN_PATTERNS.md Completion; no cross-sell gap
  - wrapping: title and subtitle may wrap naturally, but must not force the fixed bottom area into scroll content
  - distortionRisk: rendering the hero as a standalone card, inserting a section divider, or centering the text would break the reference complete pattern.
- componentCandidates:
  - name: `` `PageStackContents` title slot + `TitleMain(type="complete")` ``
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: strong
    reason: directly supports the completion-hero role and leading structure; `PageStackContents` owns the page-stack rail and content padding, `TitleMain(type="complete")` owns the completion title/subtitle hierarchy — no route-level spacing patch needed.
  - name: standalone `TitleMain(type="complete")`
    source: `@pxds/cx-components`
    fit: weak
    reason: renders the title hierarchy but does not own the page-stack rail or summary spacing contract by itself.
    risk: route-level wrappers would be needed to preserve the reference density, violating the no-route-padding rule.

### [completionSummary]

- slot: `Content`
- OGN: structural-only
- policy: none; component proof screen
- appliedGovernanceRefs: none; component proof screen
- patternEvidence:
  - sectionBoundary: `cardBoundary`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography:
    - cardHeader: authored card title "개통 정보" (structural proof, not policy copy)
    - rowTitle: key label text
    - rowCaption: none
    - emphasisRule: none; all rows are peer result facts
    - controlLabelScale: `matches-reference`
- patternDecision:
  - pattern: compact result summary card with authored card title header and label-value rows
  - reason: Wire Semantic Tag `[completionSummary | key-value-summary | card]` plus an AUTHORED card title drives this decision. The tag signals a card-boundary summary zone with repeating label-value pairs; Summary Card Decision Rule applies. Per user instruction, RQRContentsDetail is force-applied and its mandatory `title` prop is satisfied by the authored card title "개통 정보" (intentional structural-proof header, not policy copy). DESIGN_PATTERNS.md Completion case A recommends a summary card after the success heading.

#### Summary Card Decision Rule

- patternFamily: `card-key-value-summary`
- requiredCapability:
  1. section heading/header slot REQUIRED — an authored card title (`개통 정보`) is provided to satisfy RQRContentsDetail's mandatory `title` prop; intentional structural-proof header, not policy copy.
  2. card surface ownership (the candidate or composition must own padding, background, and radius — not the route)
  3. padding/radius ownership (card surface provides its own visual boundary; no route-level box-shadow or border patch)
  4. stable label-value relationship (label column must remain stable; values must not push labels off-axis)
  5. value wrapping without column squeeze (longer values must wrap within the value column only; label column must not compress)
  6. reference density preservation (compact three-row card; no extra row dividers, no stretched height)

Candidate evaluation against requiredCapability:

- `RQRContentsDetail`: with the authored card title "개통 정보" its mandatory `title` prop is satisfied (capability 1 ✓); natively owns card surface, background, 20px radius, 24px padding, header/16px spacing, 8px row gap (capability 2, 3 ✓); renders stable label/value rows via internal `ListText` rows (capability 4 ✓); value column wrapping contained within component contract (capability 5 ✓); three-row compact configuration (capability 6 ✓). → **fit: strong** ✓ SELECTED (force-applied per design decision)
- `` `SectionItem(type="card")` + `ListText(table)` ``: card surface owned by `SectionItem(type="card")` (capability 2, 3 ✓); `ListText(table)` renders label/value rows (capability 4 ✓); compact three-row configuration maps to the proof density (capability 6 ✓). Does not own a header slot (capability 1 — not selected because this screen authors a card title header that RQRContentsDetail owns natively). → **fit: medium** NOT selected
- domain key-value summary organism (`apps/mobile/src/organisms/nova-mbr-legacy` candidate): satisfies structural capabilities but adds domain ownership and semantic weight without any policy-bound activation facts to justify it. → **fit: reject** (no `Screen.map.md` policy binding present)

- layoutStrategy:
  - widthTier: `content-361` outer stack, `inner-329` row content
  - padding: card-owned result summary padding, aligned to DESIGN_PATTERNS.md Completion result summary card padding
  - stack: key-value rows
  - alignment: split label/value; labels stable on the left, values readable on the right
  - typography: body-level label/value rows; no emphasized total row
  - wrapping: labels max 1 line; values should remain 1 line for the proof data and may wrap to 2 lines only for real longer values
  - overflow: if wrapping destabilizes row rhythm, Build must choose a stronger key-value summary candidate or return to Diagram
- layoutContract:
  - role: completed activation facts summary
  - structure: one RQRContentsDetail card: authored card title header `개통 정보` + three label-value rows (activation device, plan, activation date)
  - alignment: stable split label/value rows with readable value column and no label/value collision
  - density: compact card; no internal row dividers and no outer section divider
  - wrapping: values should remain one line for current copy; future longer values must not squeeze labels into unreadable width
  - distortionRisk: patching the card with route CSS or losing the component-owned card surface/header/padding/radius would break the layout contract; do not bypass RQRContentsDetail's native card ownership.
- componentCandidates:
  - name: `RQRContentsDetail`
    source: `packages/cx-components/src/candidate/rqr-contents-detail/RQRContentsDetail.tsx` (exported from `@pxds/cx-components`)
    fit: strong
    reason: with the authored card title "개통 정보" its mandatory `title` prop is satisfied; natively owns card surface (section element), background, 20px radius, 24px padding, header 16px spacing, 8px row gap, and stable label/value rows — no route CSS needed. Force-applied per design decision.
  - name: `` `SectionItem(type="card")` + `ListText(table)` ``
    source: `@pxds/cx-components`
    fit: medium
    reason: valid no-header card composition; card surface owned by `SectionItem(type="card")`; `ListText(table)` maps three label-value rows to the compact proof density. NOT selected: this screen authors a card title header that RQRContentsDetail owns natively.
    risk: does not own a header slot; would require additional wrapper for the authored card title.
  - name: domain key-value summary organism
    source: `apps/mobile/src/organisms/nova-mbr-legacy` candidate
    fit: reject
    reason: no policy-bound activation facts are present in `Screen.map.md`; adds ownership and semantic weight the component proof screen does not justify.
    risk: adds domain coupling and reuse overhead incompatible with this structural-only proof context.

### [actions]

- slot: `Bottom`
- OGN: structural-only
- policy: none; component proof screen
- appliedGovernanceRefs: none; component proof screen
- patternEvidence:
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
  - reason: Wire Semantic Tag `[actions | bottom-guided-action | bottom-fixed]` identifies a bottom-fixed guided action zone. DESIGN_PATTERNS.md Completion copy guidance keeps two-button completion actions in the bottom action area, with the left action secondary and the right action primary; this proof screen adds an AI treatment to the recommended next-step action.
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
  - name: `` `AppScreen.Bottom(preset="guided-action")` + `SinglePrimaryAction` + `ActionButton(type="ai", buttonCount=2)` ``
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: strong
    reason: directly owns the guided-text slot, two-CTA row, right-primary ordering, AI treatment, and bottom safe-area behavior; no route-level spacing or CSS patch needed.
  - name: `` `AppScreen.Bottom(preset="primary-cta")` + `SinglePrimaryAction` + `ActionButton(type="default", buttonCount=2)` ``
    source: sibling complete proof screen pattern
    fit: reject
    reason: primary-cta/default action treatment lacks the guided prompt slot and AI-specific next-step affordance required by the wire tag `[actions | bottom-guided-action | bottom-fixed]`.
    risk: would either drop the guided copy or push it into scroll content, breaking the bottom-fixed contract.

## Policy / OGN Matrix

| requirement | sourceRef | policy | OGN | section | appliedGovernanceRefs | layoutContract summary |
| --- | --- | --- | --- | --- | --- | --- |
| `CX-COMPLETE-ACTIVATION-HERO` | Figma Text Section / 완료_개통 | structural-only | structural-only | `completionHero` | none; component proof screen | Success title and supporting sentence above summary card, leading alignment, no standalone hero surface. |
| `CX-COMPLETE-ACTIVATION-SUMMARY` | Figma Text Section / 완료_개통 | structural-only | structural-only | `completionSummary` | none; component proof screen | RQRContentsDetail card with authored card title header `개통 정보` (structural-proof, not policy copy) and three stable label-value rows; card surface, header, padding, and radius owned by RQRContentsDetail, no route CSS. |
| `CX-COMPLETE-ACTIVATION-ACTION` | Figma Text Section / 완료_개통 | structural-only | structural-only | `actions` | none; component proof screen | Fixed guided bottom area with left secondary and right primary AI action; prompt stays inside Bottom. |

## Distortion Gates

- Preserve the rail order: `Header`, then `Content`, then `Bottom(preset="guided-action")`; do not convert the bottom prompt/actions into scroll content.
- Keep `completionHero` and `completionSummary` in the same simple-completion content flow; no `SectionDivider`, extra cross-sell gap, standalone hero card, or inserted section wrapper.
- The card title `개통 정보` is an intentionally authored structural-proof header (not policy-bound, no policy ID); RQRContentsDetail owns card surface, header, padding, and radius — do not patch with route CSS or replace the component-owned card surface.
- The `[completionSummary | key-value-summary | card]` tag and its layoutContract override any component-name preference; candidate evaluation must satisfy the Summary Card Decision Rule's `requiredCapability` list.
- Preserve action hierarchy and order: `홈으로 이동` is secondary/left, `데이터 옮기기` is primary/right with AI treatment.
- The guided prompt may wrap inside `Bottom`, but button labels must remain one line and the bottom safe area must remain owned by the bottom pattern; only the `Bottom(preset="...")` contract is allowed and the deprecated action-bar alias must not be used in the diagram or implementation.
- Do not invent policy ids, OGN ids, activation business rules, data-transfer eligibility, or navigation behavior from the Figma proof screen.
- Do not use deprecated `@pxds/pxds-components`, deprecated `@pxds/pxds-icons`, raw route padding/margin/width/font-size patches, or hidden spacer nodes to match the wire.
