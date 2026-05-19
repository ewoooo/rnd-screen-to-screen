# NOVA-MBR-PG-005-0 — MBR 가입 5·가입 완료

## Screen Contract

- screenId: `NOVA-MBR-PG-005-0`
- route: `/NOVA-MBR-PG-005-0`
- group: `nova-mbr-legacy`
- domain: `mbr`
- pattern: `complete`
- implementation source: `Screen.map.md` + `DESIGN_PATTERNS.md` Completion
- policyRefs: `POL-MBR-ACCT-001-09`, `POL-MBR-SESS-001-03`, `POL-MBR-SESS-001-07`, `POL-MBR-PROF-001-08`
- OGN refs: `ogn-mbr-join-complete-result`
- appliedGovernanceRefs: `UXPT_BTN`, `UXPT_NAV`, `VOT_RUL`, `VOT_DEF`
- AppScreen slots: `SystemHeader`, `Header`, `Content`, `Bottom`
- header: `AppBar(title="회원 가입", leftIcon="close")`
- bottom: `Bottom(preset="primary-cta")`
- visible primary CTA: `홈으로 이동`
- visible content sections: `completeHero`, `completionSummary`
- structural sections: `actions`
- wireReference:
  - source: `DESIGN_PATTERNS.md` → `섹션 패턴 — 완료 (Completion)` / `케이스 A — 단순 완료형`
  - matchedParts: `StatusBar + AppBar`; `Pagestack / ContentsTitle / TitleMain`; `ContentsSlot -> Card 0/PagestackItem`; fixed bottom `ActionButton`
  - intentionalDifferences: the pattern example is 393×852 and this legacy route is registered at 375×812; route copy and policy rows come from `Screen.map.md`
  - limitation: no dedicated `apps/mobile/src/screen-diagrams/` complete reference exists; `DESIGN_PATTERNS.md` owns the completion pattern contract

## Screen Wire

```txt
┌─AppScreen 375×812─────────────────────────────────────┐
├─SystemHeader──────────────────────────────────────────┤
│ 9:41                                      ▮▮▮  wifi ▰ │
├─Header────────────────────────────────────────────────┤
│   ×   회원 가입                                       │
├─Content(scroll)───────────────────────────────────────┤
│ [completeHero | completion-title | pagestack-title]   │
│   가입이 완료되었어요                                 │
│   잠시 후 홈으로 이동해요.                            │
│                                                        │
│ [completionSummary | key-value-summary | card]        │
│   가입 정보                                           │
│   회원 상태                         일반 회원         │
│   로그인                            자동 로그인       │
│   세션 유효시간                     24시간            │
│   이동 경로                         홈                │
├─Bottom(preset="primary-cta")──────────────────────────┤
│ [actions | bottom-primary-action | bottom-fixed]      │
│   홈으로 이동                                         │
└────────────────────────────────────────────────────────┘
```

## Section Contracts

### [completeHero]

- slot: `Content`
- OGN: `ogn-mbr-join-complete-result`
- role: Announce that signup is complete and set expectation that the user will move home.
- visibleContent: `가입이 완료되었어요`, `잠시 후 홈으로 이동해요.`
- policy: `POL-MBR-ACCT-001-09`, `POL-MBR-SESS-001-07`
- appliedGovernanceRefs: `UXPT_NAV`, `VOT_RUL`, `VOT_DEF`
- patternEvidence:
  - wireSemanticTag: `[completeHero | completion-title | pagestack-title]`
  - referencePatternFamily: `complete/simple-completion`
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `Bottom(preset="primary-cta")`
  - typography: `TitleMain(type="complete")`; completion title uses display role; subtitle uses body/subtle role
- patternDecision:
  - patternFamily: `complete-title-main`
  - pattern: existing pattern composition
  - reason: `DESIGN_PATTERNS.md` requires `TitleMain` as the completion heading inside `Pagestack / ContentsTitle`.
- ognBoundaryDecision:
  - boundary: `reuse-in-new-ogn`
  - configOgnId: `ogn-mbr-join-complete-result`
  - owner: `JoinCompleteResult`
  - referencePatternFamily: `complete/simple-completion`
  - policyMeaning: signup completion result and home transition cue
  - reuseDecision: `extend`
  - rationale: keep the completion title and summary card in one policy OGN while reusing the established `PageStackContents` + `TitleMain(type="complete")` pattern.
- layoutStrategy:
  - widthTier: `pagestack`
  - padding: `PageStackContents` owns horizontal and vertical rails; no route-level spacing patch
  - stack: TitleMain in title slot, then summary card in content slot
  - alignment: leading
  - wrapping: title and subtitle may wrap within the title rail
  - overflow: `AppScreen.Content` owns scroll if viewport height becomes constrained
- layoutContract:
  - role: complete-screen hero message
  - structure: `PageStackContents` title slot with one `TitleMain(type="complete")`
  - alignment: leading title/subtitle in the content rail
  - density: use component-owned completion title spacing; do not insert arbitrary breathing-room CSS
  - wrapping: title/subtitle wrap without overlapping the summary card or bottom CTA
  - distortionRisk: using a separate header organism or raw vertical padding detaches the hero from the summary card and recreates the distorted result
- componentCandidates:
  - name: `PageStackContents(title=TitleMain(type="complete"))`
    source: `DESIGN_PATTERNS.md` Completion; `cx-example` complete screens
    fit: strong
    reason: directly provides the required Pagestack ContentsTitle and completion display typography without route-level spacing
    risk: none structural
  - name: `SectionHeaderPage`
    source: existing `nova-mbr-legacy` organism
    fit: reject
    reason: generic page header does not enforce completion copy/type or own the summary card relationship
    risk: split OGN rhythm and formal copy drift

### [completionSummary]

- slot: `Content`
- OGN: `ogn-mbr-join-complete-result`
- role: Summarize the completed account, login, session, and home destination facts after signup.
- visibleContent: card title `가입 정보`; rows `회원 상태 / 일반 회원`, `로그인 / 자동 로그인`, `세션 유효시간 / 24시간`, `이동 경로 / 홈`
- policy: `POL-MBR-ACCT-001-09`, `POL-MBR-SESS-001-03`, `POL-MBR-SESS-001-07`, `POL-MBR-PROF-001-08`
- appliedGovernanceRefs: `VOT_RUL`, `VOT_DEF`
- patternEvidence:
  - wireSemanticTag: `[completionSummary | key-value-summary | card]`
  - referencePatternFamily: `complete/simple-completion`
  - patternFamily: `card-key-value-summary`
  - requiredCapabilities: card surface ownership, padding/radius ownership, title/header slot, stable label-value rows, readable value column, value wrapping without column squeeze, component-owned density
  - sourceCompleteness: `complete-pattern-explicit-summary-card`
  - establishedConvention: `RQRContentsDetail` used by `cx-example` completion screens for authored summary cards
  - sectionBoundary: `cardBoundary`
  - fieldGrouping: `single`
  - rowSeparators: `none`
  - actionPlacement: `Bottom(preset="primary-cta")`
  - typography: card title uses title-medium; labels/values use ListText body scale
- patternDecision:
  - patternFamily: `card-key-value-summary`
  - pattern: existing component composition
  - reason: `DESIGN_PATTERNS.md` recommends a summary card for simple completion; `RQRContentsDetail` owns card surface and key-value rows natively.
- ognBoundaryDecision:
  - boundary: `reuse-in-new-ogn`
  - configOgnId: `ogn-mbr-join-complete-result`
  - owner: `JoinCompleteResult`
  - referencePatternFamily: `complete/simple-completion`
  - policyMeaning: completed signup state, automatic login, valid session window, and home destination
  - reuseDecision: `extend`
  - rationale: the policy facts belong to one completion result OGN; the visual vocabulary should be an existing summary card, not a custom success notice.
- layoutStrategy:
  - widthTier: `pagestack-card`
  - padding: card component owns internal padding/radius; `PageStackContents` owns outer rail
  - stack: title/header above key-value rows
  - alignment: stable label/value row relationship
  - wrapping: labels and values wrap inside the card without fixed-width CSS
  - overflow: card remains in scroll content above fixed bottom CTA
- layoutContract:
  - role: completion summary card
  - structure: one component-owned card with title/header and key-value rows
  - alignment: labels left, values right; relationship stays readable under wrapping
  - density: compact summary card consistent with simple completion, not a large notice block
  - wrapping: long values wrap in their value area without squeezing labels into unreadability
  - distortionRisk: custom green card, raw spacing, or bullet lists breaks Foundation color/spacing and weakens the required key-value summary behavior
- componentCandidates:
  - name: `RQRContentsDetail`
    source: `@pxds/cx-components` candidate; `cx-example` complete screens
    fit: strong
    reason: owns card surface, title slot, native key-value rows, padding/radius, and row density without custom CSS
    risk: candidate component uses current token aliases internally; acceptable because the route does not invent raw colors or spacing
  - name: `SectionItem(type="card") + ListText(table)`
    source: `DESIGN_PATTERNS.md` summary card vocabulary
    fit: medium
    reason: can express card + ListText summary, but needs an additional title/header composition that `RQRContentsDetail` already owns
    risk: more wrapper responsibility inside the OGN
  - name: `Notice(tone="positive") + custom guide list`
    source: existing old organism pattern
    fit: reject
    reason: notice/bullet structure is not the simple completion summary card contract and encourages unapproved success color treatment
    risk: repeats the distorted result and Foundation violations

### [actions]

- slot: `Bottom`
- OGN: structural-only; current `MbrPrimaryCTABar` has no config OGN ID
- role: Provide the explicit action to move home from the completion screen.
- visibleContent: primary CTA `홈으로 이동`
- policy: `POL-MBR-SESS-001-07`
- appliedGovernanceRefs: `UXPT_BTN`, `UXPT_NAV`, `VOT_RUL`
- patternEvidence:
  - wireSemanticTag: `[actions | bottom-primary-action | bottom-fixed]`
  - referencePatternFamily: `complete/simple-completion`
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `Bottom(preset="primary-cta")`
  - typography: single primary button label
- patternDecision:
  - patternFamily: `bottom-primary-action`
  - pattern: existing composition
  - reason: simple completion has one fixed bottom confirmation/home action.
- ognBoundaryDecision:
  - boundary: `structural-only`
  - owner: `MbrPrimaryCTABar`
  - reuseDecision: `reuse`
  - rationale: CTA placement is screen chrome; it should not be absorbed into `ogn-mbr-join-complete-result`.
- layoutStrategy: fixed `Bottom(preset="primary-cta")`; do not move the CTA into scroll content
- layoutContract:
  - role: advance to home after the complete state
  - structure: fixed bottom action bar with one full-width primary button
  - alignment: centered label
  - density: standard primary CTA rail
  - wrapping: label remains one line
  - distortionRisk: moving the button into content or adding secondary actions breaks completion action hierarchy
- componentCandidates:
  - name: `MbrPrimaryCTABar`
    source: existing `nova-mbr-legacy` chrome composition
    fit: strong
    reason: renders the one-button `ActionButton` in the bottom slot and matches the route's existing action chrome
    risk: none structural

## Policy / OGN Matrix

| section | visibleEvidence | policyRef | OGN | decision |
| --- | --- | --- | --- | --- |
| `completeHero` | `가입이 완료되었어요`, `잠시 후 홈으로 이동해요.` | `POL-MBR-ACCT-001-09`, `POL-MBR-SESS-001-07` | `ogn-mbr-join-complete-result` | use `TitleMain(type="complete")` in the OGN's PageStackContents title slot |
| `completionSummary` | `가입 정보` card with member/login/session/destination rows | `POL-MBR-ACCT-001-09`, `POL-MBR-SESS-001-03`, `POL-MBR-SESS-001-07`, `POL-MBR-PROF-001-08` | `ogn-mbr-join-complete-result` | use existing key-value summary card vocabulary instead of custom success card |
| `actions` | bottom CTA `홈으로 이동` | `POL-MBR-SESS-001-07` | structural-only `MbrPrimaryCTABar` | keep fixed in `Bottom(preset="primary-cta")` |

## Distortion Gates

- Do not use the user-provided screenshot as visual reference; it is the rejected distorted result.
- Preserve `Header` title `회원 가입` with close/home completion affordance; do not use back navigation.
- Preserve simple completion structure: `TitleMain(type="complete")` → summary card → fixed bottom CTA.
- Keep the summary as a card/key-value structure; do not replace it with a custom green notice or bullet list.
- Do not add route-level raw spacing or raw color CSS to simulate success state.
- Preserve explicit AppScreen rails: `SystemHeader`, `Header`, `Content(scroll)`, and `Bottom(preset="primary-cta")`.
- Keep the primary action in the bottom slot; do not move `홈으로 이동` into scroll content.
- Do not introduce additional completion destinations, recovery actions, or secondary CTAs beyond the mapped policy contract.
