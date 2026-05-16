# LEGACY-MBR-PG-003-0-CX - Withdrawal Complete Diagram

## Screen Contract

- screenId: `LEGACY-MBR-PG-003-0-CX`
- route: `/LEGACY-MBR-PG-003-0-CX`
- group: `wds-mbr-legacy`
- domain: `membership`
- source: `legacy-converted-screen-tsx-backfill`
- pattern: `complete`
- policyRefs: []
- ognIds: `ogn-mbr-withdraw-complete-app-bar`, `ogn-mbr-withdraw-complete-hero`, `ogn-mbr-withdraw-complete-summary`, `ogn-mbr-withdraw-revoke-notice`, `ogn-mbr-withdraw-complete-actions`
- governanceRefs: []
- notApplicableReason: Legacy-converted screen metadata backfill. Current `Screen.tsx` is treated as the visual and structural truth; no policy-core source has been bound, so policy meaning remains structural-only/TBD.
- requiredDesignDocs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`
- mapSource: `Screen.map.md`
- configBuildSelections: selected strings in `Screen.config.ts` must appear verbatim in this diagram.
- AppScreen rails: `SystemHeader`, `Header`, `Content`, `Bottom`
- headerContract: close-style completion exit with visible title `탈퇴 완료`.
- bottomContract: `Bottom(preset="primary-cta")`; the two completion actions stay fixed outside scroll content.
- wireReference:
  - source: `apps/mobile/src/app/(wds-mbr-legacy)/LEGACY-MBR-PG-002-0-CX/Screen.diagram.md`
  - matchedParts: complete-screen rail, close app bar, leading completion hero, section divider bands, card-like result summary, callout notice, and fixed two-action completion exit.
  - intentionalDifferences: current screen uses withdrawal completion copy, processing/grace/disposal rows, revoke guidance, and actions `철회하기` plus `홈으로 가기`.
  - limitation: reference-only visual structure; policy/copy/OGN ids come from `Screen.map.md` and current `Screen.tsx`.
- referenceSearch:
  - `apps/mobile/src/app/(cx-example)/CX-EXAMPLE-COMPLETE-PLAN-CHANGE/Screen.diagram.md`: useful latest-spec complete diagram structure, but less exact because it has no section dividers or revoke notice.
  - `apps/mobile/src/app/(cx-example)/CX-EXAMPLE-COMPLETE-ACTIVATION/Screen.diagram.md`: useful complete hero and bottom-action evidence, but rejected as primary because its guided action treatment is different.

## Screen Wire

```txt
┌─AppScreen(headerPreset="form-entry")────────────────────┐
├─Header──────────────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰   │
│ [appBar | completion-exit | close-title]                │
│ ✕  탈퇴 완료                                             │
├─Content─────────────────────────────────────────────────┤
│ [completionHero | completion-hero | leading]            │
│ 회원 탈퇴 6/6                                           │
│                                                        │
│ 탈퇴 처리가                                             │
│ 완료되었습니다                                          │
│                                                        │
│ 30일 이내에 다시 가입하시면 일부 정보를 복원할 수       │
│ 있어요. 그 이후엔 모두 파기됩니다.                     │
│                                                        │
├══Divider 4px / section────────────────────────────────═┤
│ [completionSummary | titled-key-value-summary | card]   │
│ 이 내용으로 처리됐어요                                  │
│ ┌─처리 정보─────────────────────────────────────────┐   │
│ │ 탈퇴 처리 시각   2026년 4월 30일 (수) 19:24      │   │
│ │ 철회 가능 기간   5월 30일까지 (30일 유예)        │   │
│ │ 개인정보 파기    유예 종료 시 자동 파기          │   │
│ └──────────────────────────────────────────────────┘   │
│                                                        │
├══Divider 4px / section────────────────────────────────═┤
│ [revokeNotice | informational-callout | content]        │
│ ┌─철회 안내─────────────────────────────────────────┐   │
│ │ 유예 기간 내 철회를 원하시면 탈퇴 시 사용한      │   │
│ │ 본인인증으로 마이페이지에서 진행할 수 있어요.    │   │
│ └──────────────────────────────────────────────────┘   │
├─Bottom(preset="primary-cta")───────────────────────────┤
│ [actions | dual-completion-actions | bottom-fixed]      │
│ ┌────────────────────┐ ┌───────────────────────────┐   │
│ │ 철회하기           │ │ 홈으로 가기               │   │
│ └──── secondary ─────┘ └──────── primary ──────────┘   │
└────────────────────────────────────────────────────────┘
```

## Section Contracts

### [appBar]

- slot: `Header`
- OGN: `ogn-mbr-withdraw-complete-app-bar`
- policy: structural-only; withdrawal completion policy source TBD
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
  - pattern: close-enabled completion app bar
  - patternFamily: `completion-header`
  - reason: Wire Semantic Tag `[appBar | completion-exit | close-title]` marks this as the completion exit chrome. The implementation shows a close icon and title, not a back-step affordance.
- layoutStrategy:
  - widthTier: `full-bleed`
  - stack: horizontal chrome
  - alignment: leading close icon plus visible title
  - typography: app bar title
  - wrapping: title max 1 line
  - overflow: title truncates only if localized copy exceeds header width
- layoutContract:
  - role: completion exit and screen title.
  - structure: one close affordance and one title in the header rail.
  - alignment: close control remains leading; title remains readable and stable.
  - density: standard form-entry header chrome, no progress bar.
  - wrapping: title must stay one line.
  - distortionRisk: replacing close with a back step or restoring progress chrome would change the completion exit model.
- componentCandidates:
  - name: `` `AppBar` + `Icon(type="close")` ``
    source: `@pxds/cx-components`
    fit: strong
    reason: Supports the header role, close affordance, title slot, and one-line chrome density without route-level spacing.
    risk: none for current title length.
  - name: plain `` `AppBar` `` with default left item
    source: `@pxds/cx-components`
    fit: weak
    reason: Can render the title, but default navigation affordance may imply back-step behavior rather than completion exit.
    risk: completion exit semantics become ambiguous.

### [completionHero]

- slot: `Content`
- OGN: `ogn-mbr-withdraw-complete-hero`
- policy: structural-only; withdrawal completion/grace copy source TBD
- appliedGovernanceRefs: none selected; legacy conversion backfill
- patternEvidence:
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography:
    - rowTitle: complete hero display title
    - rowCaption: step caption and supporting body copy
    - emphasisRule: completion result title only
    - controlLabelScale: `matches-reference`
- patternDecision:
  - pattern: leading complete hero
  - patternFamily: `complete-hero`
  - reason: Wire Semantic Tag `[completionHero | completion-hero | leading]` shows a leading completion title, step caption, and supporting sentence before any divider or result section.
- layoutStrategy:
  - widthTier: `content-361`
  - stack: vertical title stack
  - alignment: leading
  - typography: step caption -> complete display title -> body copy
  - wrapping: title max 2 lines; subtitle may wrap naturally within the content rail
  - overflow: no truncation for the current support copy
- layoutContract:
  - role: communicate that withdrawal processing is complete and summarize the 30-day grace/disposal expectation.
  - structure: one content stack with step caption, two-line completion title, and one supporting paragraph.
  - alignment: leading on the content rail; no card or centered splash treatment.
  - density: complete hero spacing before a 4px section divider.
  - wrapping: title and support copy may wrap, but must not overlap the next divider.
  - distortionRisk: using an ordinary section heading, adding an icon-only success block, or centering the hero would weaken the completion state.
- componentCandidates:
  - name: `` `PageStackContents` title slot + `TitleMain(type="complete")` ``
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: strong
    reason: Directly owns the content rail and completion title hierarchy used by the current screen.
    risk: none for the current text.
  - name: `` `PageStackContents` + `TitleSection` ``
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: reject
    reason: A section title does not satisfy the completion hero typography and state-recognition contract.
    risk: completion result reads like a normal mid-flow section.

### [completionSummary]

- slot: `Content`
- OGN: `ogn-mbr-withdraw-complete-summary`
- policy: structural-only; processed-at, revocation-period, and privacy-disposal policy source TBD
- appliedGovernanceRefs: none selected; legacy conversion backfill
- patternEvidence:
  - sectionBoundary: `SectionDivider`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography:
    - rowTitle: section title plus card title and row labels
    - rowCaption: row values
    - emphasisRule: section title and card title only
    - controlLabelScale: `matches-reference`
- patternDecision:
  - pattern: titled result detail card with label-value rows
  - patternFamily: `card-key-value-summary`
  - reason: Wire Semantic Tag `[completionSummary | titled-key-value-summary | card]` shows a section title followed by a card-like detail block. The current implementation uses a dedicated detail summary component to avoid narrow value-column squeeze with long date/grace values.
- layoutStrategy:
  - widthTier: `content-361`
  - stack: section title -> detail card -> label-value rows
  - alignment: leading title; stable split label/value rows inside the card
  - typography: `TitleSection` -> card title -> row label/value
  - wrapping: labels max 1 line; values should remain readable and may wrap if real data is longer
  - overflow: long dates must not squeeze labels into an unreadable fixed column
- layoutContract:
  - role: summarize the withdrawal processing facts the user may need after completion.
  - structure: one titled content section containing one detail card titled `처리 정보` with three label-value rows.
  - alignment: labels align to the left, values align to a readable right-side area; card surface owns padding/radius/background.
  - density: separated from hero and notice by 4px section dividers; no internal row dividers in the current structure.
  - wrapping: current values are one line where possible; future values must wrap without fixed-column collision.
  - distortionRisk: a generic table row with a narrow fixed value column can collide with `2026년 4월 30일 (수) 19:24` or `5월 30일까지 (30일 유예)`.
- componentCandidates:
  - name: `` `PageStackContents` + `TitleSection` + `RQRContentsDetail` ``
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: strong
    reason: Satisfies the section-title plus detail-card contract, owns the card-like detail surface, and provides a stable label-value layout for longer date/grace values.
    risk: verify that the component's internal row rhythm remains compact when values wrap.
  - name: `` `SectionItem(type="card")` + `ListText(table)` ``
    source: `@pxds/cx-components`
    fit: reject
    reason: The table value column is a known distortion risk for the current long values.
    risk: fixed-column squeeze or label/value collision.

### [revokeNotice]

- slot: `Content`
- OGN: `ogn-mbr-withdraw-revoke-notice`
- policy: structural-only; withdrawal revocation guidance policy source TBD
- appliedGovernanceRefs: none selected; legacy conversion backfill
- patternEvidence:
  - sectionBoundary: `SectionDivider`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography:
    - rowTitle: callout title
    - rowCaption: callout body
    - emphasisRule: callout title only
    - controlLabelScale: `matches-reference`
- patternDecision:
  - pattern: informational callout
  - patternFamily: `notice-callout`
  - reason: Wire Semantic Tag `[revokeNotice | informational-callout | content]` shows one titled guidance block in scroll content, visually separated from the summary by a section divider.
- layoutStrategy:
  - widthTier: `content-361`
  - stack: callout title -> body copy
  - alignment: leading
  - typography: callout title and readable body
  - wrapping: body may wrap to multiple lines
  - overflow: must remain visible above the fixed bottom actions
- layoutContract:
  - role: explain how a user can revoke withdrawal during the grace period.
  - structure: one titled callout inside a content section.
  - alignment: leading callout text; no inline action is present in the current implementation.
  - density: callout section follows a 4px divider and uses component-owned spacing.
  - wrapping: body wraps naturally; no truncation.
  - distortionRisk: hiding the revocation guidance below the bottom actions or turning it into an inline CTA would change the current information hierarchy.
- componentCandidates:
  - name: `` `PageStackContents` + `SectionItem` + `Callout` ``
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: strong
    reason: Matches the current content composition and gives the callout component ownership of title/body spacing and surface treatment.
    risk: none for the current body length.
  - name: raw text block inside `` `PageStackContents` ``
    source: existing composition
    fit: reject
    reason: Does not provide the callout boundary and title/body hierarchy visible in the current screen.
    risk: guidance loses notice affordance.

### [actions]

- slot: `Bottom`
- OGN: `ogn-mbr-withdraw-complete-actions`
- policy: structural-only; revoke and home navigation policy source TBD
- appliedGovernanceRefs: none selected; legacy conversion backfill
- patternEvidence:
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `Bottom(preset="primary-cta")`
  - typography:
    - rowTitle: action labels
    - rowCaption: none
    - emphasisRule: primary action on the right; secondary revoke action on the left
    - controlLabelScale: `matches-reference`
- patternDecision:
  - pattern: fixed dual completion actions
  - patternFamily: `fixed-primary-cta`
  - reason: Wire Semantic Tag `[actions | dual-completion-actions | bottom-fixed]` marks both CTAs as fixed bottom actions, not scroll content. Current hierarchy keeps `홈으로 가기` primary and `철회하기` secondary.
- layoutStrategy:
  - widthTier: `content-361`
  - stack: horizontal two-button group
  - alignment: stretch within the bottom action rail
  - typography: CTA label scale
  - wrapping: labels max 1 line
  - overflow: action group remains fixed and safe-area aware
- layoutContract:
  - role: provide completion exit and optional revocation entry.
  - structure: two adjacent CTA buttons: secondary `철회하기`, primary `홈으로 가기`.
  - alignment: equal-height horizontal action group with primary action visually dominant.
  - density: standard `primary-cta` bottom spacing.
  - wrapping: button labels stay one line.
  - distortionRisk: moving these actions into scroll content, changing the primary order, or stacking them without an explicit responsive reason would distort the completion exit.
- componentCandidates:
  - name: `` `Bottom(preset="primary-cta")` + `SinglePrimaryAction` + `ActionButton(actions=[secondary, primary])` ``
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: strong
    reason: Satisfies fixed bottom placement, safe-area ownership, and two-action hierarchy without route-level button spacing.
    risk: wrapper must not impose single-button-only spacing on the two-button `ActionButton` child.
  - name: two raw `` `Button` `` siblings
    source: `@pxds/cx-components`
    fit: reject
    reason: Raw sibling buttons do not own the two-action bottom spacing and hierarchy contract.
    risk: inconsistent gutters, order, or safe-area behavior.

## Policy / OGN Matrix

| requirement | sourceRef | policy | OGN | section | appliedGovernanceRefs | layoutContract summary |
| --- | --- | --- | --- | --- | --- | --- |
| `WITHDRAW-COMPLETE-HEADER` | current `Screen.tsx` | structural-only; TBD | `ogn-mbr-withdraw-complete-app-bar` | `appBar` | none | Close completion header with one-line title `탈퇴 완료`; no progress bar. |
| `WITHDRAW-COMPLETE-HERO` | current `Screen.tsx` | structural-only; TBD | `ogn-mbr-withdraw-complete-hero` | `completionHero` | none | Step caption, complete title, and 30-day grace/disposal support copy in a leading hero stack. |
| `WITHDRAW-COMPLETE-SUMMARY` | current `Screen.tsx` | structural-only; TBD | `ogn-mbr-withdraw-complete-summary` | `completionSummary` | none | Titled detail card with three readable label-value rows for processing facts. |
| `WITHDRAW-REVOKE-NOTICE` | current `Screen.tsx` | structural-only; TBD | `ogn-mbr-withdraw-revoke-notice` | `revokeNotice` | none | Titled callout explaining revocation during the grace period. |
| `WITHDRAW-COMPLETE-ACTIONS` | current `Screen.tsx` | structural-only; TBD | `ogn-mbr-withdraw-complete-actions` | `actions` | none | Fixed bottom dual actions with secondary revoke and primary home exit. |

## Distortion Gates

- Preserve the current rail order: `SystemHeader`, `Header`, scroll `Content`, then `Bottom(preset="primary-cta")`.
- Treat current `Screen.tsx` as the structural truth. Do not invent policy IDs, backend state rules, or navigation destinations from the withdrawal copy.
- Keep the close completion header; do not restore progress chrome or back-step semantics on the completion screen.
- Section dividers are visible 4px section boundaries between hero/summary and summary/notice; do not replace them with generic vertical gaps.
- Summary acceptance is the layout contract, not the component name: readable label-value rows, card-owned surface/padding, and no fixed-column squeeze are mandatory.
- Keep revoke notice in scroll content above the fixed bottom actions; it must not be hidden behind the bottom rail.
- Preserve action hierarchy and order: `철회하기` is secondary, `홈으로 가기` is primary.
- Do not add route-level raw margin/padding/font-size fixes, deprecated component packages, or legacy organism imports.
