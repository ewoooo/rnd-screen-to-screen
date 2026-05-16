# LEGACY-MBR-PG-002-0-CX — 가입 완료

## Screen Contract

- screenId: `LEGACY-MBR-PG-002-0-CX`
- route: `/LEGACY-MBR-PG-002-0-CX`
- group: `legacy-converted-mbr`
- domain: `membership`
- source: `legacy-conversion-current-screen`
- reverseEngineeringSource: current `Screen.tsx` is treated as the visual/structural truth.
- pattern: `complete`
- policyRefs: none verified; structural/TBD mapping only.
- ognIds: `ogn-mbr-complete-app-bar`, `ogn-mbr-complete-hero`, `ogn-mbr-signup-complete-summary`, `ogn-mbr-signup-benefit-notice`, `ogn-mbr-complete-actions`
- governanceRefs: `TBD`; legacy conversion metadata did not bind concrete governance IDs.
- AppScreen rails: `SystemHeader`, `Header`, `Content`, `Bottom`
- bottom: `Bottom(preset="primary-cta")`
- configBuildSelections: preserve selected candidate names from `Screen.config.ts` verbatim.
- wireReference:
  - source: `apps/mobile/src/app/(cx)/CX-EXAMPLE-COMPLETE-ACTIVATION/Screen.diagram.md`
  - matchedParts: complete-screen AppScreen rail, leading completion hero, result summary card, fixed bottom completion actions.
  - intentionalDifferences: current screen includes a header close icon, two 4px section dividers, an outer summary section title plus `RQRContentsDetail`, a benefit callout, and gift-style two-action CTA.
  - secondaryReference: `apps/mobile/src/app/(cx)/CX-EXAMPLE-COMPLETE-PLAN-CHANGE/Screen.diagram.md` for sibling complete proof density.
  - limitation: reference-only visual structure; policy/copy/OGN ids come from `Screen.map.md` and `Screen.config.ts`.

## Screen Wire

```txt
┌─AppScreen(headerPreset="form-entry")──────────────────────┐
├─SystemHeader──────────────────────────────────────────────┤
│ StatusBar                                                 │
├─Header────────────────────────────────────────────────────┤
│ [appBar | completion-exit | header]                       │
│ ✕  AppBar(title="가입 완료", leftLabel="닫기")             │
├─Content(scroll)───────────────────────────────────────────┤
│ [completionHero | completion-hero | content]              │
│ 회원 가입 5/5 · 가입 완료                                 │
│ 환영합니다,                                               │
│ 우주에 오신 걸                                            │
│ 가입이 완료되었어요. 자동 로그인 상태이며,                │
│ 첫 화면부터 모든 서비스를 이용할 수 있어요.               │
├══Divider 4px / SectionDivider(thickness="section")════════┤
│ [completionSummary | key-value-detail-card | section]     │
│ 이 정보로 가입이 완료됐어요                               │
│ ┌─RQRContentsDetail────────────────────────────────────┐   │
│ │ 가입 정보                                           │   │
│ │ 회원 ID                         wooseong****        │   │
│ │ 가입일                          2026년 4월 30일 (수)│   │
│ │ 자동 로그인                     이 기기에서 30일 유지│   │
│ └──────────────────────────────────────────────────────┘   │
├══Divider 4px / SectionDivider(thickness="section")════════┤
│ [benefitNotice | callout-notice | section]                │
│ ┌─Callout──────────────────────────────────────────────┐   │
│ │ 혜택                                                │   │
│ │ 신규 가입 첫 달 멤버십 무료 혜택이 자동 적용되었어요.│   │
│ │ 사용 내역은 내정보에서 확인할 수 있어요.             │   │
│ └──────────────────────────────────────────────────────┘   │
├─Bottom(preset="primary-cta")──────────────────────────────┤
│ [actions | bottom-two-action | bottom-fixed]              │
│ ┌──────────────────────────┐ ┌─────────────────────────┐  │
│ │ 내정보 확인              │ │ 홈으로 가기             │  │
│ └──── secondary CTA ───────┘ └──── primary CTA / gift ──┘  │
└────────────────────────────────────────────────────────────┘
```

## Section Contracts

### [appBar]

- slot: `Header`
- OGN: `ogn-mbr-complete-app-bar`
- policy: structural-only; no policy-core ref verified.
- appliedGovernanceRefs: `TBD`
- patternEvidence:
  - wireSemanticTag: `[appBar | completion-exit | header]`
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography:
    - rowTitle: app-bar title
    - rowCaption: close label for accessibility
    - emphasisRule: header title only
    - controlLabelScale: `matches-reference`
- patternDecision:
  - patternFamily: `completion-exit-navigation`
  - pattern: existing composition
  - reason: current screen uses a completion header with close icon, close label, and visible title.
- layoutStrategy:
  - widthTier: `full-bleed`
  - padding: AppBar owns horizontal chrome padding.
  - stack: horizontal header chrome.
  - alignment: left close affordance plus title.
  - wrapping: title max 1 line.
  - overflow: title truncates within AppBar rules.
- layoutContract:
  - role: provide completion exit chrome and screen title.
  - structure: one AppBar with close leading icon and `가입 완료` title.
  - alignment: AppBar-owned header alignment.
  - density: form-entry header density retained by current implementation.
  - wrapping: title remains one line.
  - distortionRisk: replacing close with back navigation or adding progress chrome would change the completion-exit contract in the current Screen truth.
- componentCandidates:
  - name: `AppBar(title="가입 완료", showLeftItem, showTitle, leftIcon=Icon(type="close"), leftLabel="닫기")`
    source: `@pxds/cx-components`
    fit: strong
    reason: directly supports the implemented close affordance, accessible label, and visible title.
    risk: click destination remains TBD in Map.

### [completionHero]

- slot: `Content`
- OGN: `ogn-mbr-complete-hero`
- policy: `TBD-MBR-SIGNUP-COMPLETE-HERO`
- appliedGovernanceRefs: `TBD`
- patternEvidence:
  - wireSemanticTag: `[completionHero | completion-hero | content]`
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
  - patternFamily: `completion-hero`
  - pattern: existing composition
  - reason: current screen uses `TitleMain(type="complete")` inside `PageStackContents` before the first divider.
- layoutStrategy:
  - widthTier: `content-361`
  - padding: `PageStackContents` owns content rail padding.
  - stack: titleSubText -> complete title -> supporting subtitle.
  - alignment: leading.
  - wrapping: title intentionally breaks into two lines; subtitle may wrap.
  - overflow: normal content scroll.
- layoutContract:
  - role: confirm successful signup and announce service availability.
  - structure: leading completion hero with no card surface.
  - alignment: leading text inside content rail.
  - density: complete hero density followed by a section divider.
  - wrapping: title/subtitle wrap naturally without moving Bottom into Content.
  - distortionRisk: centering text, removing `type="complete"`, or adding a card would break the implemented completion hierarchy.
- componentCandidates:
  - name: `PageStackContents(title=TitleMain(type="complete"))`
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: strong
    reason: directly preserves the completion hero role, content rail, and title/subtitle hierarchy.
    risk: hero policy source remains TBD.

### [completionSummary]

- slot: `Content`
- OGN: `ogn-mbr-signup-complete-summary`
- policy: `TBD-MBR-SIGNUP-COMPLETE-SUMMARY`
- appliedGovernanceRefs: `TBD`
- patternEvidence:
  - wireSemanticTag: `[completionSummary | key-value-detail-card | section]`
  - sectionBoundary: `SectionDivider`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography:
    - rowTitle: outer `TitleSection`, card title, and row labels
    - rowCaption: row values
    - emphasisRule: card title only; rows are peer facts
    - controlLabelScale: `matches-reference`
- patternDecision:
  - patternFamily: `card-key-value-summary`
  - pattern: existing composition
  - reason: current screen displays an outer section title and a summary detail card containing three label-value result rows.
- layoutStrategy:
  - widthTier: `content-361`
  - padding: `PageStackContents` owns section rail; `RQRContentsDetail` owns card surface/padding.
  - stack: section title -> card title -> label-value rows.
  - alignment: stable split label/value rows.
  - wrapping: labels max 1 line; values may wrap only if the card preserves readable value column.
  - overflow: card remains in scroll content and must not collide with the next divider.
- layoutContract:
  - role: summarize completed signup facts.
  - structure: section title plus one card with `가입 정보` title and exactly three label-value rows.
  - alignment: stable labels on the left and readable values on the right.
  - density: detail-card density owned by the component; no route-level surface or padding patch.
  - wrapping: long values must not squeeze labels into unreadable width.
  - distortionRisk: using a fixed narrow value column, dropping the card title, or rendering rows as plain body text would break the summary contract.
- componentCandidates:
  - name: `PageStackContents(title=TitleSection) + RQRContentsDetail(title, rows)`
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: strong
    reason: directly supports the current section title, card title, component-owned surface, and stable label-value row contract.
    risk: real joined-at or auto-login values require wrapping verification.
  - name: `SectionItem(type="card") + ListText(table)`
    source: `@pxds/cx-components`
    fit: reject
    reason: does not match current Screen truth because the implemented detail card has an explicit card title and dedicated detail rows.
    risk: fixed table columns can squeeze long Korean date/session values.

### [benefitNotice]

- slot: `Content`
- OGN: `ogn-mbr-signup-benefit-notice`
- policy: `TBD-MBR-SIGNUP-BENEFIT-NOTICE`
- appliedGovernanceRefs: `TBD`
- patternEvidence:
  - wireSemanticTag: `[benefitNotice | callout-notice | section]`
  - sectionBoundary: `SectionDivider`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography:
    - rowTitle: callout title
    - rowCaption: callout body
    - emphasisRule: notice title only
    - controlLabelScale: `matches-reference`
- patternDecision:
  - patternFamily: `sectioned-callout-notice`
  - pattern: existing composition
  - reason: current screen uses an untitled `PageStackContents` containing `SectionItem` and one `Callout` after the second divider.
- layoutStrategy:
  - widthTier: `content-361`
  - padding: `PageStackContents` + `SectionItem`
  - stack: callout title + body.
  - alignment: leading.
  - wrapping: body may wrap to multiple lines.
  - overflow: notice stays visible in scroll content above Bottom.
- layoutContract:
  - role: notify the user that a signup benefit has been applied.
  - structure: one callout block, no outer section title.
  - alignment: callout content follows the same content rail.
  - density: separated from summary by a 4px divider; no extra card nesting.
  - wrapping: body wraps without hiding behind fixed Bottom.
  - distortionRisk: adding an outer title, moving the notice into Bottom, or creating nested cards would diverge from current Screen truth.
- componentCandidates:
  - name: `PageStackContents + SectionItem + Callout(title="혜택")`
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: strong
    reason: directly preserves the implemented notice structure and component-owned callout treatment.
    risk: benefit policy and tone variant remain TBD.

### [actions]

- slot: `Bottom`
- OGN: `ogn-mbr-complete-actions`
- policy: `TBD-MBR-SIGNUP-COMPLETE-ACTIONS`
- appliedGovernanceRefs: `TBD`
- patternEvidence:
  - wireSemanticTag: `[actions | bottom-two-action | bottom-fixed]`
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `Bottom(preset="primary-cta")`
  - typography:
    - rowTitle: CTA labels
    - rowCaption: none
    - emphasisRule: right primary action only
    - controlLabelScale: `matches-reference`
- patternDecision:
  - patternFamily: `fixed-two-action-completion-cta`
  - pattern: existing composition
  - reason: current screen uses `ActionButton(type="gift")` with secondary left and primary right actions inside the fixed bottom CTA rail.
- layoutStrategy:
  - widthTier: `content-361`
  - padding: bottom rail owns safe-area and action spacing.
  - stack: two horizontal actions.
  - alignment: secondary action left, primary action right.
  - wrapping: button labels max 1 line.
  - overflow: fixed bottom slot; never converted to scroll content.
- layoutContract:
  - role: offer completion exit choices with home as primary.
  - structure: two CTA labels in one action component inside `SinglePrimaryAction`.
  - alignment: right action is primary; both actions remain in Bottom.
  - density: primary-cta bottom rail with two-action component.
  - wrapping: labels remain one line at mobile width.
  - distortionRisk: reversing action hierarchy, replacing with two loose buttons, or moving actions into Content would break the implemented bottom contract.
- componentCandidates:
  - name: `Bottom(preset="primary-cta") + SinglePrimaryAction + ActionButton(type="gift", actions=[secondary, primary])`
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: strong
    reason: directly owns fixed bottom placement, two-action ordering, gift treatment, and primary/secondary variants.
    risk: action destinations remain TBD.
  - name: `SinglePrimaryAction + two Button children`
    source: `existing-composition`
    fit: reject
    reason: would require manual two-button spacing and hierarchy management instead of using the implemented action component.
    risk: route-level spacing or variant drift.

## Policy / OGN Matrix

| Section | OGN ID | Policy / Structural Source | UI Evidence | Decision |
| --- | --- | --- | --- | --- |
| `[appBar]` | `ogn-mbr-complete-app-bar` | `STRUCTURAL-MBR-COMPLETE-APP-BAR` | close icon, `닫기`, title `가입 완료` | Preserve current completion-exit header; destination TBD. |
| `[completionHero]` | `ogn-mbr-complete-hero` | `TBD-MBR-SIGNUP-COMPLETE-HERO` | `TitleMain(type="complete")`, completion copy | Preserve copy and structure; do not invent policy ID. |
| `[completionSummary]` | `ogn-mbr-signup-complete-summary` | `TBD-MBR-SIGNUP-COMPLETE-SUMMARY` | `RQRContentsDetail` rows for member ID, joined date, auto-login | Preserve rows and card contract; data source TBD. |
| `[benefitNotice]` | `ogn-mbr-signup-benefit-notice` | `TBD-MBR-SIGNUP-BENEFIT-NOTICE` | benefit callout | Preserve current notice; benefit eligibility/source TBD. |
| `[actions]` | `ogn-mbr-complete-actions` | `TBD-MBR-SIGNUP-COMPLETE-ACTIONS` | secondary `내정보 확인`, primary `홈으로 가기` | Preserve fixed bottom action order and hierarchy; destinations TBD. |

## Distortion Gates

- Treat current `Screen.tsx` as perfect visual/structural truth; do not change implementation while updating metadata.
- Keep `AppScreen` rails explicit: `SystemHeader`, `Header`, scrollable `Content`, and fixed `Bottom(preset="primary-cta")`.
- Preserve the close icon/label on the completion AppBar; do not restore a progress bar or ordinary back-navigation requirement.
- Preserve both 4px `SectionDivider(thickness="section")` bands: one before summary and one before benefit notice.
- Summary must remain `TitleSection` plus `RQRContentsDetail(title="가입 정보", rows=...)`; do not collapse rows into plain text or a fixed-width table candidate.
- Benefit notice remains a single callout inside `PageStackContents + SectionItem`; do not add an outer title or nested card.
- Bottom actions remain fixed and ordered `[secondary "내정보 확인", primary "홈으로 가기"]` inside `ActionButton(type="gift")`.
- Do not invent policy IDs, governance refs, data source rules, benefit eligibility, or action destinations.
- Do not introduce route-level raw margin, padding, width, font-size, fixed/absolute CTA chrome, deprecated PXDS legacy imports, or legacy-mbr organisms.
