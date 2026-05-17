# NOVA-MBR-FP-005-0 — 가입 완료

## Screen Contract

- screenId: `NOVA-MBR-FP-005-0`
- route: `/NOVA-MBR-FP-005-0`
- group: `nova-mbr-fp`
- domain: `mbr`
- pattern: `complete`
- implementation source: `Screen.tsx`
- policyRefs: `none — 완료 안내, 정책 불요` (SB 화면·OGN `관련 정책서: -` / `관련 정책 그룹: -`)
- OGN refs: `ogn-mbr-join-complete`
- appliedGovernanceRefs: `UXPT_BTN`, `UXPT_NAV`, `UXPT_RCV`, `VOT_RUL`
- AppScreen slots: `SystemHeader`, `Header`, `Content`, `Bottom`
- header: `AppBar(title="회원 가입")` owned by `FpPageHeader` chrome under `Header`
- bottom: `Bottom(preset="primary-cta")`
- visible primary CTA: `홈으로 이동` owned by `MbrFpActionBar`
- visible content sections: `intro`, `result`
- structural sections: `actions`
- wireReference:
  - source: `apps/mobile/src/app/(nova-mbr-legacy)/NOVA-MBR-PG-005-0/Screen.diagram.md`
  - matchedParts: `complete` pattern result hierarchy — page header intro, then a positive completion notice plus a post-join guide, with one fixed `Bottom(preset="primary-cta")` action; AppScreen `SystemHeader`/`Header`/`Content(scroll)`/`Bottom` rail; plain `AppBar(title="회원 가입")`
  - intentionalDifferences: PG-005 uses a separate `SectionHeaderPage` + `SectionMessageJoinCompleteView` OGN split and a structural-only `MbrPrimaryCTABar`; FP-005 binds the completion notice + guide + session-error notice into a single `ogn-mbr-join-complete` (`JoinComplete`) and uses `MbrFpActionBar` for the `홈으로 이동` action
  - limitation: reference-only result hierarchy and bottom-action placement; PG-005 legacy account/session/profile policyRefs and legacy OGN names do not bind here — FP-005 is policy-unbound by SB definition (`정책 불요`); OGN id and copy come from `Screen.map.md` and SB

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
│ [intro | completion-page-header | content-top]        │
│   회원 가입이 완료됐어요                              │
│   잠시 후 홈으로 이동할 수 있어요                     │
│                                                        │
│ [result | status-message | section]                   │
│   ┌────────────────────────────────────────────────┐   │
│   │ 회원 가입이 완료됐어요                         │   │
│   │ 가입한 계정으로 서비스를 이용할 수 있어요      │   │
│   └──────────────────────── positive notice ───────┘   │
│   이용 안내                                           │
│   · 가입한 계정으로 로그인 상태가 유지돼요           │
│   · 가입 완료 후 홈에서 서비스를 이용해 주세요       │
│   ┌────────────────────────────────────────────────┐   │
│   │ 로그인 정보를 만들지 못했어요                  │   │
│   │ 다시 로그인해 주세요                           │   │
│   └─────── session-error cautionary notice ─────────┘   │
│                                                        │
├─Bottom(preset="primary-cta")──────────────────────────┤
│ [actions | bottom-primary-action | bottom-fixed]      │
│   ┌────────────────────────────────────────────────┐   │
│   │                  홈으로 이동                   │   │
│   └──────────────────── primary CTA ───────────────┘   │
└────────────────────────────────────────────────────────┘
```

### Pattern Analysis Gate

- `[intro]` tag `completion-page-header | content-top` is chrome-owned completion page-header text; no component OGN boundary, single result title + sub copy stack.
- `[result]` tag `status-message | section` reads as a positive completion notice + a short guide list, with a cautionary session-error notice only on the session-failure case. This is a status-message section, not a key-value summary card (no repeated label→value rows; the guide is a short informational bullet list, not a label/value table). Summary Card Decision Rule does not apply.
- `[actions]` tag `bottom-primary-action | bottom-fixed` is fixed bottom CTA chrome; it is not a scroll-content section and has no config OGN id.

```txt
patternEvidence:
  sectionBoundary: none
  fieldGrouping: none
  rowSeparators: none
  actionPlacement: Bottom(preset="primary-cta")
  typography:
    rowTitle: Text(sectionTitle) for the guide heading
    rowCaption: Text(bodySubtle) for guide rows
    emphasisRule: none
    controlLabelScale: matches-reference
patternDecision:
  pattern: PageStackContents + Notice(positive) + guide list + conditional Notice(cautionary)
  reason: SB ogn-mbr-join-complete component detail lists a positive section-message, a cautionary session-error section-message, and a strong action-area; PG-005 complete-screen precedent shows the same positive-notice + post-join guide hierarchy. No card surface, no divider, no key-value rows in SB.
```

## Section Contracts

### [intro]

- slot: `Content`
- OGN: chrome `FpPageHeader` (not a config OGN id)
- role: Communicate signup completion and the immediate home-transition cue before the detailed result.
- visibleTitle: `회원 가입이 완료됐어요`
- visibleContent: `잠시 후 홈으로 이동할 수 있어요`
- policy: none — 완료 안내, 정책 불요
- appliedGovernanceRefs: `UXPT_NAV`, `VOT_RUL`
- patternEvidence:
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography: `rowTitle: Text(sectionTitle)` / `rowCaption: Text(bodySubtle)` / `emphasisRule: none` / `controlLabelScale: matches-reference`
- patternDecision:
  - pattern: `FpPageHeader title + sub copy`
  - reason: first content section below `Header`; mirrors PG-005 complete-screen intro hierarchy (result title + transition cue), no divider band
- ognBoundaryDecision:
  - owner: chrome `FpPageHeader`; not a config OGN id
  - boundary: structural completion page-header chrome inside `Content`, backed by `PageStackContents` + `TitleMain`
  - rationale: intro copy frames the complete state but is not the `ogn-mbr-join-complete` result body; keep it outside `generation.ognIds`
  - implementationConstraint: may mention `PageStackContents` only for this chrome header boundary and other implementations that actually use it
- layoutStrategy:
  - widthTier: `content-361`
  - padding: DESIGN_FOUNDATION content padding tier (no route-level raw spacing)
  - stack: `vertical`
  - alignment: `leading`
  - typography: title `sectionTitle`, sub copy `bodySubtle`
  - wrapping: sub copy may wrap to two lines; title stays one line
  - overflow: `multiline`
- layoutContract:
  - role: confirm completion and signal the home transition
  - structure: completion title + one supporting transition line
  - alignment: `leading`
  - density: comfortable header rhythm; no card boundary
  - wrapping: sub copy wraps, title stays one line
  - distortionRisk: backend status terminology replacing user-facing completion copy, or collapsing intro into the AppBar, breaks the result hierarchy
- componentCandidates:
  - name: `SectionHeaderPage` (`ogn-mbr-section-header-page`, `nova-mbr-legacy/section-header-page`)
    source: existing organism in another screen group
    fit: `strong`
    reason: capability identical — wraps `PageStackContents` with a `TitleMain(title, subTitle)` title slot, no route-level layout; same completion title + transition sub line role this section needs
    risk: lives in the `nova-mbr-legacy` group under id `ogn-mbr-section-header-page`; reusing it directly would not match the chrome-only header role this FP screen assigns (no config OGN id for `[intro]`)
  - name: `FpPageHeader` chrome (title + sub)
    source: chrome vocabulary for this batch (`nova-mbr-fp/_chrome`)
    fit: `strong`
    reason: same `PageStackContents` + `TitleMain(title, subTitle)` capability as `SectionHeaderPage`, kept as chrome (not a config OGN id) so the intro stays structural completion copy
    risk: none; structural completion copy only
- systemConsistencyNote: `FpPageHeader` and legacy `SectionHeaderPage` are byte-equivalent (`PageStackContents` + `TitleMain`); the only divergence is group placement and config-OGN status. Record as a consolidation candidate — one shared page-header organism could serve both groups.
- deviationReason: SB defines this screen's header as chrome only (no config OGN id); legacy `SectionHeaderPage` (`ogn-mbr-section-header-page`) is a different id in the `nova-mbr-legacy` group, and the generation verifier matches `generation.ognIds` against organism config `id` exactly, so reusing it would bind a legacy OGN id the FP screen contract does not declare. Re-expressed as FP-group chrome.
- distortionRisk: low; risk appears if backend status terms replace user-facing copy

### [result]

- slot: `Content`
- OGN: `ogn-mbr-join-complete`
- role: Hold the positive completion message, the post-join usage guide, and the conditional session-error recovery notice.
- visibleContent: positive completion `Notice` (`회원 가입이 완료됐어요` + usage line) and a short `이용 안내` guide list owned by `JoinComplete`; on session-create failure a cautionary `Notice` (`로그인 정보를 만들지 못했어요 / 다시 로그인해 주세요`) is surfaced as the recovery path
- policy: none — 완료 안내, 정책 불요 (SB 근거: `ogn-mbr-join-complete`)
- appliedGovernanceRefs: `UXPT_RCV`, `VOT_RUL`
- patternEvidence:
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `Bottom(preset="primary-cta")`
  - typography: `rowTitle: Text(sectionTitle)` for guide heading / `rowCaption: Text(bodySubtle)` for guide rows and notice body / `emphasisRule: none` / `controlLabelScale: matches-reference`
- patternDecision:
  - pattern: `PageStackContents + Notice(positive) + guide list + conditional Notice(cautionary)`
  - reason: SB component detail = positive section-message + cautionary session-error section-message + strong action-area; PG-005 precedent shows the same positive-notice + post-join guide. No card surface, no divider, no key-value rows → status-message section, not summary card
- ognBoundaryDecision:
  - owner: `ogn-mbr-join-complete`
  - boundary: body OGN owns the complete-state message, guide list, and session-error recovery notice
  - rationale: completion success and recovery copy are one result-body responsibility; route should not split the positive notice, guide, or recovery notice into independent chrome sections
  - implementationConstraint: actual `JoinComplete` body uses `PageStackContents showTitle={false}` around `VStack` + `Notice` + `TitleContents`/`ListText`, so PageStackContents is accurate here
- layoutStrategy:
  - widthTier: `content-361`
  - padding: DESIGN_FOUNDATION notice + list spacing tier (no route-level raw spacing)
  - stack: `vertical`
  - alignment: `leading`
  - typography: notice title/body hierarchy; guide heading `sectionTitle`; guide rows `bodySubtle`
  - wrapping: notice and guide rows may wrap to multiple lines
  - overflow: `multiline`
- layoutContract:
  - role: communicate completion success and provide the session-failure recovery path
  - structure: positive notice block + short guide list, with a conditional cautionary notice on session error
  - alignment: `leading`
  - density: comfortable notice + list density (PG-005 complete precedent); no card boundary, no key-value table
  - wrapping: notice/guide copy wraps inside the content column without overlapping the bottom CTA
  - distortionRisk: turning the guide list into a key-value summary card, or rendering the session-error notice as a competing primary block, distorts the completion hierarchy
- componentCandidates:
  - name: `SectionMessageJoinCompleteView` (`ogn-mbr-section-message-join-complete-view`, `nova-mbr-legacy/section-message-join-complete-view`)
    source: existing organism in another screen group
    fit: `strong`
    reason: capability nearly identical — wraps `PageStackContents` with a positive `Notice` plus a `TitleContents` + `ListText` post-join guide list, no route-level layout; covers the completion message + usage guide this section requires
    risk: it has no conditional cautionary session-error recovery notice, so it cannot carry the UXPT_RCV recovery path on its own; also a different id in the `nova-mbr-legacy` group
  - name: `JoinComplete` (`ogn-mbr-join-complete`, `nova-mbr-fp/join-complete`)
    source: OGN vocabulary for this batch
    fit: `strong`
    reason: owns the same positive `Notice` + guide-list capability as `SectionMessageJoinCompleteView` and adds the conditional cautionary session-error recovery `Notice`, all within one organism without route-level layout
    risk: none structural; session-error notice must stay subordinate to the completion message and not compete with the bottom CTA
  - name: cx `Notice` + `TitleContents` + `ListText` composition
    source: `@pxds/cx-components` capability comparison
    fit: `medium`
    reason: supplies the positive notice, guide heading, and guide rows as primitives, but carries no domain OGN identity and no built-in conditional recovery-notice contract; usable only inside an organism boundary
    risk: without an organism owner the conditional session-error branch and SB binding leak to the route
  - name: generic card key-value summary
    source: layout capability comparison
    fit: `reject`
    reason: SB shows a status-message + guide list, not repeated label→value rows; a summary card would invent a structure absent from the source and Distortion Gate
    risk: introduces a card/key-value treatment not present in SB or the PG-005 precedent
- systemConsistencyNote: `JoinComplete` reproduces the `SectionMessageJoinCompleteView` structure (`PageStackContents` → positive `Notice` → `TitleContents` + `ListText` guide) almost verbatim; the only functional addition is the conditional cautionary session-error recovery `Notice`. Record as a consolidation candidate — the shared complete-view body could become one organism with an optional recovery-notice slot.
- deviationReason: SB binds this section to the domain OGN id `ogn-mbr-join-complete`, and the generation verifier matches `generation.ognIds` against organism config `id` exactly. Legacy `SectionMessageJoinCompleteView` (`ogn-mbr-section-message-join-complete-view`, `nova-mbr-legacy` group) is a different id and has no conditional session-error recovery notice (UXPT_RCV), so reusing it directly breaks the SB ogn-id ↔ contract and drops the recovery path. Re-expressed as FP-group `JoinComplete` with the added recovery notice.
- distortionRisk: medium; copy must stay user-facing and the session-error notice must remain a recovery aid, not a competing block

### [actions]

- slot: `Bottom`
- OGN: chrome `MbrFpActionBar`; not a config OGN id (structural-only, like PG-005 `MbrPrimaryCTABar`)
- role: Provide the explicit single action to move home from the completion screen, and serve as the recovery primary on session failure.
- visibleContent: primary CTA `홈으로 이동`
- policy: none — 완료 안내, 정책 불요
- appliedGovernanceRefs: `UXPT_BTN`, `UXPT_NAV`, `UXPT_RCV`, `VOT_RUL`
- patternEvidence:
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `Bottom(preset="primary-cta")`
  - typography: button label only / `emphasisRule: none` / `controlLabelScale: matches-reference`
- patternDecision:
  - pattern: `Bottom(preset="primary-cta") + single primary button`
  - reason: SB shows one strong `action-area` (`홈으로 이동`); UXPT_BTN keeps a single primary, UXPT_RCV keeps the recovery path as the primary action rather than a bare 확인
- ognBoundaryDecision:
  - owner: chrome `MbrFpActionBar`; not a config OGN id
  - boundary: fixed bottom action chrome, outside scroll content and outside the `JoinComplete` result body OGN
  - rationale: action placement is AppScreen bottom-slot structure; `JoinComplete` owns result/recovery messaging while the chrome bar owns the home navigation action
  - implementationConstraint: may mention `Bottom(preset="primary-cta")`; no `PageStackContents` claim applies to the action bar
- layoutStrategy:
  - widthTier: `full-bleed` bottom rail
  - padding: `Bottom(preset="primary-cta")` preset spacing (no route-level raw spacing)
  - stack: `vertical` single action
  - alignment: `center` label
  - typography: primary button label
  - wrapping: label stays one line
  - overflow: `truncate`
- layoutContract:
  - role: move to home / recover after completion
  - structure: fixed bottom rail with one full-width primary button
  - alignment: centered CTA label
  - density: fixed action area, not scroll content
  - wrapping: label stays one line
  - distortionRisk: moving the CTA into scroll content, or adding a competing secondary action, changes the rail contract
- componentCandidates:
  - name: `MbrPrimaryCTABar` (`nova-mbr-legacy/primary-cta-bar`, structural-only, no config OGN id)
    source: existing structural organism in another screen group
    fit: `strong`
    reason: capability identical — renders an `ActionButton` with a single primary action (and an optional secondary), structural-only with no config OGN id; same fixed bottom single-primary placement this section needs
    risk: lives in the `nova-mbr-legacy` group; reusing it directly keeps a legacy-group component as the FP screen's bottom action owner
  - name: `MbrFpActionBar` (`nova-mbr-fp/_chrome`, structural-only, no config OGN id)
    source: chrome vocabulary for this batch
    fit: `strong`
    reason: byte-equivalent `ActionButton` single/secondary-primary capability as `MbrPrimaryCTABar`, kept as FP-group chrome and structural-only (out of config `ognIds`)
    risk: none for reference; keep structural-only in config until a component config id exists
- systemConsistencyNote: `MbrFpActionBar` and legacy `MbrPrimaryCTABar` are byte-equivalent `ActionButton` wrappers; the only divergence is group placement. Record as a consolidation candidate — one shared structural CTA-bar component could serve both groups.
- deviationReason: this section is structural-only with no config OGN id, so the generation verifier does not bind it; legacy `MbrPrimaryCTABar` lives in the `nova-mbr-legacy` group, so it is re-expressed as FP-group chrome to keep the FP screen's bottom action owner inside its own group rather than reaching back into the legacy group.
- distortionRisk: low; risk appears if a secondary action competes with `홈으로 이동`

## Policy / OGN Matrix

### [intro]

- visibleEvidence: `회원 가입이 완료됐어요`, `잠시 후 홈으로 이동할 수 있어요`
- policyInterpretation: 정책 불요 — 완료 안내 화면 (SB 화면·OGN `관련 정책서: -`); no policyRef binds
- OGNInterpretation: chrome `FpPageHeader`; not a config OGN id
- decision: preserve as the first content section below `Header`

### [result]

- visibleEvidence: positive notice `회원 가입이 완료됐어요`, usage guide list, conditional session-error notice `로그인 정보를 만들지 못했어요`
- policyInterpretation: 정책 불요 — SB `ogn-mbr-join-complete` `관련 정책서: -` / `관련 정책 그룹: -`; completion and recovery copy are SB-bound, not policy-bound
- OGNInterpretation: `ogn-mbr-join-complete` owns the positive notice, guide list, and conditional cautionary recovery notice
- decision: keep the completion message, guide, and session-error recovery inside `ogn-mbr-join-complete`; do not introduce a summary card or key-value table

### [actions]

- visibleEvidence: bottom CTA `홈으로 이동`
- policyInterpretation: 정책 불요; UXPT_BTN/UXPT_NAV/UXPT_RCV keep a single primary fixed to home as the post-completion and recovery path
- OGNInterpretation: chrome `MbrFpActionBar`; structural-only, out of config `ognIds`
- decision: keep in `Bottom(preset="primary-cta")` and out of scroll content; structural-only until a config OGN id exists

## Distortion Gates

Layout Distortion Gate — 8-signal check, passed:

1. Repeated `label → value/state` rows ≥ 2 → none; the guide is a short informational bullet list, not a label/value table. No key-value group → no summary card forced. Pass.
2. Title/subtitle/body hierarchy mixing → `intro` uses `sectionTitle` + `bodySubtle`; `result` uses notice title/body + guide heading `sectionTitle` + guide rows `bodySubtle`. Hierarchy stays distinct. Pass.
3. Label/value column collision → no two-column or table layout in this screen. Pass.
4. Long policy copy hides CTA/next section → no policy copy (정책 불요); completion notice + short guide + conditional session-error notice wrap within `Content` and do not overlap the fixed `홈으로 이동` CTA. Pass.
5. Important value over-wraps and breaks row structure → no comparison rows; notice and guide copy wrap as single blocks. Pass.
6. Two-column/split height-rhythm break → no split layout; single vertical stack. Pass.
7. Fixed bottom action overlaps scroll content / last section clipped → `홈으로 이동` is isolated in `Bottom(preset="primary-cta")`; the `result` section (last content section, including the conditional session-error notice) scrolls above the fixed bottom rail without clipping. Pass.
8. Route-level padding/negative margin/raw width/arbitrary fontSize needed → layout uses `PageStackContents` + `Notice` + guide list + `Bottom` preset and DESIGN_FOUNDATION spacing tiers only; no route-level raw spacing. Pass.
9. Missing slot forces meaningless wrapper/spacer → `JoinComplete` owns the positive notice, guide, and conditional cautionary notice slots; `MbrFpActionBar` owns the bottom action; no empty spacers. Pass.

Preservation decisions:

- Keep section order `[intro]`, `[result]`, then bottom `[actions]`.
- Preserve explicit AppScreen rails: `SystemHeader`, `Header`, `Content(scroll)`, `Bottom(preset="primary-cta")`.
- Use only the standard bottom slot name; no legacy bottom-action alias appears in this diagram.
- No section divider band: SB `ogn-mbr-join-complete` and the PG-005 precedent show no divider band, so no `├══Divider══┤` is drawn.
- Keep the result content as a status-message section (positive notice + guide + conditional cautionary notice); do not convert it into a key-value summary card.
- The session-error notice stays subordinate inside the result section; the recovery primary remains the single bottom `홈으로 이동` action (UXPT_RCV), never a competing bare 확인.
- Preserve `Header` title `회원 가입`; do not convert the completion route into a marketing or home screen.
- Keep `홈으로 이동` in the bottom slot; never move it into scroll content and never add a competing secondary action.
