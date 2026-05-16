# LEGACY-MBR-PG-004-0-CX - Withdrawal Impact Check Diagram

## Screen Contract

- screenId: `LEGACY-MBR-PG-004-0-CX`
- route: `/LEGACY-MBR-PG-004-0-CX`
- group: `legacy-converted-mbr`
- domain: `membership`
- source: `legacy-converted-screen-tsx-backfill`
- pattern: `form-entry`
- policyRefs: []
- ognIds: `ogn-mbr-withdraw-impact-app-bar`, `ogn-mbr-withdraw-impact-intro`, `ogn-mbr-withdraw-impact-list`, `ogn-mbr-withdraw-unpaid-callout`, `ogn-mbr-withdraw-impact-action`
- governanceRefs: []
- notApplicableReason: Legacy-converted screen metadata backfill. Current `Screen.tsx` is treated as the visual and structural truth; no policy-core source has been bound, so impact and unpaid rules remain structural-only/TBD.
- requiredDesignDocs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`
- mapSource: `Screen.map.md`
- configBuildSelections: selected strings in `Screen.config.ts` must appear verbatim in this diagram.
- AppScreen rails: `SystemHeader`, `Header`, `Content`, `Bottom`
- headerContract: step-navigation header with visible title `회원 탈퇴`.
- bottomContract: `Bottom(preset="primary-cta")`; blocked `다음으로` action remains fixed outside scroll content.
- wireReference:
  - source: `apps/mobile/src/app/(cx)/CX-EXAMPLE-PERSONAL-INFO-INPUT/Screen.diagram.md`
  - matchedParts: form-entry rail, app bar, leading intro title stack, 4px section divider, titled content section, and fixed primary CTA.
  - intentionalDifferences: current screen uses impact-status list rows with right badges and an unpaid blocking callout instead of text input fields.
  - limitation: reference-only visual structure; policy/copy/OGN ids come from `Screen.map.md` and current `Screen.tsx`.
- referenceSearch:
  - `apps/mobile/src/screen-diagrams/skt-genui-test-0512/list-text/usage-history-overview.diagram.md`: useful list-row evidence, but rejected as primary because this screen is a withdrawal step with fixed CTA.
  - `apps/mobile/src/app/(legacy-converted-mbr)/LEGACY-MBR-PG-003-0-CX/Screen.diagram.md`: useful sibling withdrawal flow evidence, but rejected as primary because it is a completion pattern.

## Screen Wire

```txt
┌─AppScreen(headerPreset="form-entry")────────────────────┐
├─Header──────────────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰   │
│ [appBar | step-navigation | title]                      │
│ ‹  회원 탈퇴                                             │
├─Content─────────────────────────────────────────────────┤
│ [impactIntro | step-intro | leading]                    │
│ 회원 탈퇴 3/6                                           │
│                                                        │
│ 탈퇴하면 아래 정보가                                    │
│ 사라지거나 제한돼요                                     │
│                                                        │
│ 탈퇴 후에는 같은 식별정보로 30일간 재가입이 제한될 수   │
│ 있어요.                                                │
│                                                        │
├══Divider 4px / section────────────────────────────────═┤
│ [impactList | status-list | content]                    │
│ 사라지거나 정리되는 항목                                │
│                                                        │
│ T 멤버십 포인트                                  [소멸] │
│ 발급 쿠폰 6개                                    [소멸] │
│ 자동 결제 2건                                    [해지] │
│ 본인인증 이력                                    [보관] │
│                                                        │
│ [unpaidCallout | blocking-callout | same-section]       │
│ ┌─미납 확인────────────────────────────────────────┐   │
│ │ 현재 미납 요금 8,900원이 확인됐어요. 미납 정산  │   │
│ │ 후 탈퇴를 진행할 수 있어요.                     │   │
│ └──────────────────────────────────────────────────┘   │
├─Bottom(preset="primary-cta")───────────────────────────┤
│ [actions | blocked-primary-action | bottom-fixed]       │
│ ┌──────────────────────────────────────────────────┐   │
│ │ 다음으로                              disabled   │   │
│ └──────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────┘
```

## Section Contracts

### [appBar]

- slot: `Header`
- OGN: `ogn-mbr-withdraw-impact-app-bar`
- policy: structural-only; withdrawal flow navigation policy source TBD
- appliedGovernanceRefs: none selected; legacy conversion backfill
- patternEvidence:
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography:
    - rowTitle: app bar title
    - rowCaption: none
    - emphasisRule: title only
    - controlLabelScale: `matches-reference`
- patternDecision:
  - pattern: step navigation app bar
  - patternFamily: `form-entry-header`
  - reason: Wire Semantic Tag `[appBar | step-navigation | title]` marks a mid-flow withdrawal step header, not a completion exit.
- layoutStrategy:
  - widthTier: `full-bleed`
  - stack: horizontal chrome
  - alignment: leading navigation affordance plus visible title
  - typography: app bar title
  - wrapping: title max 1 line
  - overflow: title truncates only if localized copy exceeds header width
- layoutContract:
  - role: provide withdrawal step navigation and title.
  - structure: one header rail with visible `회원 탈퇴` title.
  - alignment: navigation affordance and title remain stable in standard form-entry chrome.
  - density: no progress bar; step is carried by intro caption.
  - wrapping: title must remain one line.
  - distortionRisk: adding progress chrome or replacing the header with completion close semantics would misrepresent this as a terminal state.
- componentCandidates:
  - name: `` `AppBar(title="회원 탈퇴", showLeftItem, showTitle)` ``
    source: `@pxds/cx-components`
    fit: strong
    reason: Supports the current title and step-navigation chrome without route-level spacing.
    risk: confirm default left affordance remains appropriate for the flow.
  - name: close-enabled completion app bar
    source: existing composition
    fit: reject
    reason: Close semantics are for completion exits, not step 3 of 6.
    risk: user may leave the flow instead of navigating back.

### [impactIntro]

- slot: `Content`
- OGN: `ogn-mbr-withdraw-impact-intro`
- policy: structural-only; withdrawal impact and 30-day rejoin restriction policy source TBD
- appliedGovernanceRefs: none selected; legacy conversion backfill
- patternEvidence:
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography:
    - rowTitle: step intro display title
    - rowCaption: step caption and supporting body copy
    - emphasisRule: intro title only
    - controlLabelScale: `matches-reference`
- patternDecision:
  - pattern: leading form-entry intro
  - patternFamily: `form-entry-intro`
  - reason: Wire Semantic Tag `[impactIntro | step-intro | leading]` shows a step caption, leading title, and support sentence before the first section divider.
- layoutStrategy:
  - widthTier: `content-361`
  - stack: vertical title stack
  - alignment: leading
  - typography: step caption -> main title -> body copy
  - wrapping: title max 2 lines; subtitle may wrap naturally within the rail
  - overflow: no truncation for current support copy
- layoutContract:
  - role: introduce the withdrawal impact review step and the 30-day rejoin restriction message.
  - structure: one content stack with step caption, two-line title, and one support sentence.
  - alignment: leading, no card boundary.
  - density: form-entry intro spacing above a 4px section divider.
  - wrapping: title and support copy wrap naturally without overlapping the divider.
  - distortionRisk: downgrading to a section title or moving the step caption into header chrome would break the current hierarchy.
- componentCandidates:
  - name: `` `PageStackContents` title slot + `TitleMain` ``
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: strong
    reason: Owns the content rail and intro title hierarchy used by the current screen.
    risk: none for current copy.
  - name: `` `TitleSection` `` only
    source: `@pxds/cx-components`
    fit: reject
    reason: Does not support the step caption and large intro title hierarchy.
    risk: the step intro reads like a normal content section.

### [impactList]

- slot: `Content`
- OGN: `ogn-mbr-withdraw-impact-list`
- policy: structural-only; impact item statuses source TBD
- appliedGovernanceRefs: none selected; legacy conversion backfill
- patternEvidence:
  - sectionBoundary: `SectionDivider`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography:
    - rowTitle: section title and row label
    - rowCaption: right status badge text
    - emphasisRule: section title only; rows are peer impact facts
    - controlLabelScale: `matches-reference`
- patternDecision:
  - pattern: titled status list
  - patternFamily: `list-status-summary`
  - reason: Wire Semantic Tag `[impactList | status-list | content]` shows repeated left labels with short categorical right statuses, followed by a blocking callout inside the same content section.
- layoutStrategy:
  - widthTier: `content-361`
  - stack: section title -> list rows -> callout
  - alignment: left label flex, right badge auto
  - typography: `TitleSection` -> list row label/status badge
  - wrapping: row labels max 1 line in current fixture; badges max 1 line
  - overflow: if labels become long, label may wrap without pushing badge off the rail
- layoutContract:
  - role: summarize what disappears, is cancelled, or is retained after withdrawal.
  - structure: one titled section containing four status rows and then the unpaid blocking callout.
  - alignment: left impact item labels and right categorical badges stay vertically aligned and easy to scan.
  - density: compact list density inside `SectionItem`; no card boundary and no visible row dividers in the current screen.
  - wrapping: status badges remain short; do not place full policy sentences on the right side.
  - distortionRisk: treating right statuses as editable chips, long text values, or table columns would distort the current display-only status list.
- componentCandidates:
  - name: `` `PageStackContents` + `TitleSection` + `SectionItem` + `ListText(rightItem=badge)` ``
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: strong
    reason: Satisfies the titled status-list contract, keeps badge alignment component-owned, and matches the current display-only row structure.
    risk: verify row label wrapping if real item names exceed fixture length.
  - name: `` `ChipItem` `` status controls
    source: `@pxds/cx-components`
    fit: reject
    reason: Chip controls imply selection/filter state, while these statuses are display-only impact results.
    risk: user may interpret statuses as editable or selectable.

### [unpaidCallout]

- slot: `Content`
- OGN: `ogn-mbr-withdraw-unpaid-callout`
- policy: structural-only; unpaid blocking rule source TBD
- appliedGovernanceRefs: none selected; legacy conversion backfill
- patternEvidence:
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography:
    - rowTitle: callout title
    - rowCaption: callout body
    - emphasisRule: callout title only
    - controlLabelScale: `matches-reference`
- patternDecision:
  - pattern: blocking constraint callout inside impact section
  - patternFamily: `notice-callout`
  - reason: Wire Semantic Tag `[unpaidCallout | blocking-callout | same-section]` keeps unpaid guidance grouped with the impact list and explains why the fixed CTA is disabled.
- layoutStrategy:
  - widthTier: `content-361`
  - stack: callout title -> body copy
  - alignment: leading
  - typography: callout title and readable body
  - wrapping: body may wrap to multiple lines
  - overflow: callout remains visible above the fixed bottom action
- layoutContract:
  - role: explain the blocking unpaid amount state that prevents continuing.
  - structure: one titled callout after the impact rows, inside the same section item group.
  - alignment: leading callout text; no settlement action exists in the current screen.
  - density: component-owned callout spacing after the list rows.
  - wrapping: body wraps naturally; no truncation.
  - distortionRisk: separating the callout from the impact section or enabling the CTA while the callout is visible would split the blocking-state story.
- componentCandidates:
  - name: `` `Callout(title="미납 확인")` inside the impact `SectionItem` ``
    source: `@pxds/cx-components`
    fit: strong
    reason: Matches the current grouping and gives the callout component ownership of title/body spacing and notice treatment.
    risk: no payment entry slot is available if policy later requires immediate settlement.
  - name: inline warning text below list
    source: existing composition
    fit: reject
    reason: Does not preserve the visible callout affordance and title/body hierarchy.
    risk: blocking constraint becomes less discoverable.

### [actions]

- slot: `Bottom`
- OGN: `ogn-mbr-withdraw-impact-action`
- policy: structural-only; unpaid blocking and next-step enablement source TBD
- appliedGovernanceRefs: none selected; legacy conversion backfill
- patternEvidence:
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `Bottom(preset="primary-cta")`
  - typography:
    - rowTitle: primary CTA label
    - rowCaption: disabled state
    - emphasisRule: single primary action
    - controlLabelScale: `matches-reference`
- patternDecision:
  - pattern: fixed blocked primary CTA
  - patternFamily: `fixed-primary-cta`
  - reason: Wire Semantic Tag `[actions | blocked-primary-action | bottom-fixed]` marks the disabled `다음으로` as a fixed bottom action paired with the unpaid blocking callout.
- layoutStrategy:
  - widthTier: `content-361`
  - stack: single full-width button
  - alignment: stretch within bottom action rail
  - typography: CTA label scale
  - wrapping: label max 1 line
  - overflow: fixed and safe-area aware
- layoutContract:
  - role: block continuation while unpaid state is present.
  - structure: one full-width primary button with disabled state.
  - alignment: centered label in a stretched button.
  - density: standard `primary-cta` bottom spacing.
  - wrapping: `다음으로` stays one line.
  - distortionRisk: moving the disabled action into scroll content or rendering it enabled while the unpaid callout remains visible would break the current state contract.
- componentCandidates:
  - name: `` `Bottom(preset="primary-cta")` + `SinglePrimaryAction` + `Button(disabled, fullWidth, size="xlarge", variant="primary")` ``
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: strong
    reason: Satisfies fixed bottom placement, safe-area ownership, full-width primary CTA layout, and the disabled blocked state.
    risk: disabled state must derive from the same unpaid condition as the callout when real state is wired.
  - name: enabled primary `` `Button` ``
    source: `@pxds/cx-components`
    fit: reject
    reason: Violates the current fixture state where unpaid balance blocks continuation.
    risk: contradictory state between callout and action.

## Policy / OGN Matrix

| requirement | sourceRef | policy | OGN | section | appliedGovernanceRefs | layoutContract summary |
| --- | --- | --- | --- | --- | --- | --- |
| `WITHDRAW-IMPACT-HEADER` | current `Screen.tsx` | structural-only; TBD | `ogn-mbr-withdraw-impact-app-bar` | `appBar` | none | Step-navigation header with one-line title `회원 탈퇴`; no progress bar. |
| `WITHDRAW-IMPACT-INTRO` | current `Screen.tsx` | structural-only; TBD | `ogn-mbr-withdraw-impact-intro` | `impactIntro` | none | Step caption, leading title, and 30-day rejoin restriction support copy. |
| `WITHDRAW-IMPACT-LIST` | current `Screen.tsx` | structural-only; TBD | `ogn-mbr-withdraw-impact-list` | `impactList` | none | Titled list with four display-only impact rows and right status badges. |
| `WITHDRAW-UNPAID-CALLOUT` | current `Screen.tsx` | structural-only; TBD | `ogn-mbr-withdraw-unpaid-callout` | `unpaidCallout` | none | Blocking callout explains the unpaid amount and why withdrawal cannot continue. |
| `WITHDRAW-IMPACT-ACTION` | current `Screen.tsx` | structural-only; TBD | `ogn-mbr-withdraw-impact-action` | `actions` | none | Fixed bottom full-width primary CTA in disabled state. |

## Distortion Gates

- Preserve the current rail order: `SystemHeader`, `Header`, scroll `Content`, then `Bottom(preset="primary-cta")`.
- Treat current `Screen.tsx` as the structural truth. Do not invent policy IDs, settlement flows, API state models, or navigation destinations from the fixture copy.
- Keep progress as intro caption `회원 탈퇴 3/6`; do not restore visual progress chrome in the header.
- The 4px divider between intro and impact list is a section boundary, not generic whitespace.
- Impact statuses are short display-only badges. Do not convert them to selectable chips, long right-side policy sentences, or fixed table values.
- Keep unpaid callout grouped with the impact section and keep the fixed CTA disabled for the current fixture state.
- If real state later allows settlement or continuation, the callout visibility and CTA disabled state must be derived from one condition.
- Do not add route-level raw margin/padding/font-size fixes, deprecated component packages, or legacy organism imports.
