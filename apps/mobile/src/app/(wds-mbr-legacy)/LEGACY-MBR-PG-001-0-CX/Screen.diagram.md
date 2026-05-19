# LEGACY-MBR-PG-001-0-CX — 본인인증 수단 선택

## Screen Contract

- screenId: `LEGACY-MBR-PG-001-0-CX`
- route: `/LEGACY-MBR-PG-001-0-CX`
- group: `wds-mbr-legacy`
- domain: `membership`
- source: `legacy-conversion-current-screen`
- reverseEngineeringSource: current `Screen.tsx` is treated as the visual/structural truth.
- pattern: `form-entry`
- policyRefs: `POL-MBR-AUTH-001-01`, `POL-MBR-AUTH-002-01`, `POL-MBR-AUTH-002-05`, `POL-MBR-AUTH-002-09`, `POL-MBR-AUTH-005-01`, `POL-MBR-AUTH-005-03`
- ognIds: `ogn-mbr-auth-app-bar`, `ogn-mbr-auth-intro`, `ogn-mbr-auth-select`, `ogn-mbr-auth-policy-callout`, `ogn-mbr-auth-primary-action`
- governanceRefs: `TBD`; legacy conversion metadata did not bind concrete governance IDs.
- AppScreen rails: `SystemHeader`, `Header`, `Content`, `Bottom`
- bottom: `Bottom(preset="primary-cta")`
- configBuildSelections: preserve selected candidate names from `Screen.config.ts` verbatim.
- wireReference:
  - source: `apps/mobile/src/screen-diagrams/skt-genui-test-0512/detail-form/additional-info-check.diagram.md`
  - matchedParts: `AppScreen(headerPreset="form-entry")`, header app bar, content sections separated by 4px divider bands, radio choice section, inline notice, fixed primary CTA.
  - intentionalDifferences: current screen has a membership auth intro, one radio group plus policy callout, no field stack, and starts with disabled CTA until explicit selection.
  - secondaryReference: `apps/mobile/src/app/(cx-example)/CX-EXAMPLE-PERSONAL-INFO-INPUT/Screen.diagram.md` for latest section contract shape.
  - limitation: reference-only visual structure; policy/copy/OGN ids come from `Screen.map.md` and `Screen.config.ts`.

## Screen Wire

```txt
┌─AppScreen(headerPreset="form-entry")──────────────────────┐
├─SystemHeader──────────────────────────────────────────────┤
│ StatusBar                                                 │
├─Header────────────────────────────────────────────────────┤
│ [appBar | navigation-bar | header]                        │
│ AppBar(title="본인인증", showLeftItem, showTitle)          │
├─Content(scroll)───────────────────────────────────────────┤
│ [intro | form-intro | content]                            │
│ 회원 가입 3단계 (3/5)                                     │
│ 본인 확인을 위해                                          │
│ 인증 수단을 선택해주세요                                  │
│ 한 번 인증하면 같은 단말에서 30일간 재인증이 면제돼요.    │
├══Divider 4px / SectionDivider(thickness="section")════════┤
│ [authMethod | radio-choice-section | section-divider]     │
│ 인증 수단 선택                                            │
│ ○ 휴대폰 본인인증                                         │
│   본인 명의 휴대폰으로 인증                               │
│ ○ PASS 인증                                               │
│   통신사 PASS로 인증                                      │
│ ○ 공동인증서 인증                                         │
│   공동인증서로 인증                                       │
│ ┌─Callout──────────────────────────────────────────────┐   │
│ │ 인증 정책 안내                                      │   │
│ │ 인증 5회 연속 실패 시 10분간 인증이 제한돼요.       │   │
│ │ 인증기관 별 추가 약관에 동의가 필요할 수 있어요.    │   │
│ └──────────────────────────────────────────────────────┘   │
├─Bottom(preset="primary-cta")──────────────────────────────┤
│ [actions | bottom-primary-action | bottom-fixed]          │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ 인증하기                         disabled until pick │   │
│ └──────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

## Section Contracts

### [appBar]

- slot: `Header`
- OGN: `ogn-mbr-auth-app-bar`
- policy: structural-only; no policy-core ref for navigation chrome.
- appliedGovernanceRefs: `TBD`
- patternEvidence:
  - wireSemanticTag: `[appBar | navigation-bar | header]`
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography:
    - rowTitle: app-bar title
    - rowCaption: none
    - emphasisRule: header title only
    - controlLabelScale: `matches-reference`
- patternDecision:
  - patternFamily: `form-entry-navigation`
  - pattern: existing composition
  - reason: current screen uses the form-entry header rail with a left navigation affordance and centered/visible title.
- layoutStrategy:
  - widthTier: `full-bleed`
  - padding: AppBar owns horizontal chrome padding.
  - stack: horizontal navigation chrome.
  - alignment: left affordance plus visible title.
  - wrapping: title max 1 line.
  - overflow: title truncates within AppBar rules.
- ognBoundaryDecision: `chrome-owned` — AppScreen/Header owns placement; the listed app-bar OGN/config id is treated as route chrome, not body policy content.
- layoutContract:
  - role: step navigation for the identity verification flow.
  - structure: one header bar with back affordance and `본인인증` title.
  - alignment: AppBar-owned header alignment; no route-level offset.
  - density: form-entry header density.
  - wrapping: title must remain one line.
  - distortionRisk: replacing the header with custom text or adding progress chrome would no longer match the current Screen truth.
- componentCandidates:
  - name: `AppBar(title="본인인증", showLeftItem, showTitle)`
    source: `@pxds/cx-components`
    fit: strong
    reason: directly owns the implemented header title and left affordance.
    risk: none for current title length.

### [intro]

- slot: `Content`
- OGN: `ogn-mbr-auth-intro`
- policy: `POL-MBR-AUTH-001-01`, `POL-MBR-AUTH-002-01`, plus `LEGACY-MBR-AUTH-INTRO` for the 30-day reauth copy.
- appliedGovernanceRefs: `TBD`
- patternEvidence:
  - wireSemanticTag: `[intro | form-intro | content]`
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography:
    - rowTitle: `TitleMain` main title
    - rowCaption: titleSubText and subTitle
    - emphasisRule: task title only
    - controlLabelScale: `matches-reference`
- patternDecision:
  - patternFamily: `form-intro-title`
  - pattern: existing composition
  - reason: current screen uses `PageStackContents` with `TitleMain` for step caption, task title, and supporting copy before the first divider.
- layoutStrategy:
  - widthTier: `content-361`
  - padding: `PageStackContents` owns content rail padding.
  - stack: vertical titleSubText -> title -> subTitle.
  - alignment: leading.
  - wrapping: title is intentionally two lines; subtitle may wrap.
  - overflow: normal content scroll.
- ognBoundaryDecision: `structural-or-policy-intro` — the intro section owns task framing copy inside Content; screen owns section placement and no new OGN id is introduced.
- layoutContract:
  - role: explain the identity-verification task and current signup step.
  - structure: leading form intro, no card, no inline controls.
  - alignment: leading text inside the content rail.
  - density: intro block followed by one section divider.
  - wrapping: title and subtitle wrap naturally without shrinking typography.
  - distortionRisk: adding a card, progress bar, or route-level spacing would distort the implemented intro hierarchy.
- componentCandidates:
  - name: `PageStackContents(title=TitleMain)`
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: strong
    reason: directly preserves the implemented intro hierarchy and content rail.
    risk: 30-day reauth copy remains missing policy-source in Map.

### [authMethod]

- slot: `Content`
- OGN: `ogn-mbr-auth-select`, `ogn-mbr-auth-policy-callout`
- policy: `POL-MBR-AUTH-002-01`, `POL-MBR-AUTH-002-05`, `POL-MBR-AUTH-002-09`, `POL-MBR-AUTH-005-01`, `POL-MBR-AUTH-005-03`, plus `LEGACY-MBR-AUTH-EXTERNAL-TERMS`.
- appliedGovernanceRefs: `TBD`
- patternEvidence:
  - wireSemanticTag: `[authMethod | radio-choice-section | section-divider]`
  - sectionBoundary: `SectionDivider`
  - fieldGrouping: `single`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography:
    - rowTitle: section title and radio row title
    - rowCaption: radio descriptions and callout body
    - emphasisRule: section title and callout title only
    - controlLabelScale: `matches-reference`
- patternDecision:
  - patternFamily: `sectioned-radio-list-with-callout`
  - pattern: existing composition
  - reason: the implemented section is one titled radio group followed by a policy callout inside the same `SectionItem`; the callout constrains the selected auth action rather than forming a separate section.
- layoutStrategy:
  - widthTier: `content-361`
  - padding: `PageStackContents` + `SectionItem`
  - stack: title -> radio list -> callout.
  - alignment: radio control + text body leading; callout leading.
  - wrapping: option labels max 1 line where possible; descriptions and callout body may wrap.
  - overflow: all content remains in scroll content above Bottom.
- ognBoundaryDecision: reuse `ogn-mbr-auth-select`; authentication method choice, ordering, and related callout behavior stay inside the section contract while the screen owns only Content placement.
- layoutContract:
  - role: choose exactly one authentication method and expose failure/terms constraints before proceeding.
  - structure: titled single-select radio group plus same-section notice callout.
  - alignment: radio controls share one group axis; callout uses the same content width.
  - density: comfortable list density, no manual row gaps and no extra divider before the callout.
  - wrapping: descriptions wrap inside row body; callout body wraps without overlapping Bottom.
  - distortionRisk: splitting choices into separate sections, moving the callout below another divider, or adding a default selected method would change the current task/state truth.
- componentCandidates:
  - name: `PageStackContents + TitleSection + SectionItem + RQRListOption(type="radio") + Callout`
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: strong
    reason: directly supports a titled radio list and same-section policy notice with component-owned row/control behavior.
    risk: long policy copy could exceed callout text budget; Map must resolve copy instead of shrinking type.
  - name: `ListSelected`
    source: `@pxds/cx-components`
    fit: reject
    reason: current Screen truth uses `RQRListOption` radio rows; changing to another choice vocabulary risks row scale and state drift.
    risk: may alter radio semantics and current disabled-CTA selection behavior.

### [actions]

- slot: `Bottom`
- OGN: `ogn-mbr-auth-primary-action`
- policy: `LEGACY-MBR-AUTH-CTA`; external auth trigger policy is not bound.
- appliedGovernanceRefs: `TBD`
- patternEvidence:
  - wireSemanticTag: `[actions | bottom-primary-action | bottom-fixed]`
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `Bottom(preset="primary-cta")`
  - typography:
    - rowTitle: CTA label
    - rowCaption: none
    - emphasisRule: primary action only
    - controlLabelScale: `matches-reference`
- patternDecision:
  - patternFamily: `fixed-primary-cta`
  - pattern: existing composition
  - reason: current screen fixes one full-width primary CTA in the bottom rail, disabled until a radio option is selected.
- layoutStrategy:
  - widthTier: `content-361`
  - padding: bottom rail owns safe-area and CTA padding.
  - stack: single full-width action.
  - alignment: stretch.
  - wrapping: button label max 1 line.
  - overflow: fixed bottom slot; never last scroll content.
- ognBoundaryDecision: `structural-bottom-action` — AppScreen.Bottom owns the fixed action rail; the action OGN/config id owns button state/labels when present, with no scroll-content CTA reconstruction.
- layoutContract:
  - role: proceed to the selected authentication method.
  - structure: one primary button inside `SinglePrimaryAction`.
  - alignment: full-width stretch within the bottom CTA rail.
  - density: primary-cta bottom density.
  - wrapping: label remains one line.
  - distortionRisk: enabling the CTA with no selection or moving it into `Content` would break the implemented state and rail contract.
- componentCandidates:
  - name: `Bottom(preset="primary-cta") + SinglePrimaryAction + Button(fullWidth, size="xlarge", variant="primary")`
    source: `@pxds/cx-layout` + `@pxds/cx-components`
    fit: strong
    reason: directly owns fixed bottom placement, full-width primary treatment, and disabled state.
    risk: external auth routing remains out of scope.

## Policy / OGN Matrix

| Section | OGN ID | Policy / Structural Source | UI Evidence | Decision |
| --- | --- | --- | --- | --- |
| `[appBar]` | `ogn-mbr-auth-app-bar` | structural-only | `AppBar` title `본인인증`, left affordance | Preserve current header chrome; do not invent progress UI. |
| `[intro]` | `ogn-mbr-auth-intro` | `POL-MBR-AUTH-001-01`, `POL-MBR-AUTH-002-01`, `LEGACY-MBR-AUTH-INTRO` | step caption, task title, 30-day reauth copy | Keep current intro; 30-day copy remains missing policy-source. |
| `[authMethod]` | `ogn-mbr-auth-select` | `POL-MBR-AUTH-002-01`, `POL-MBR-AUTH-002-05`, `POL-MBR-AUTH-002-09` | radio options: phone, PASS, certificate | Preserve single radio group and policy order. |
| `[authMethod]` | `ogn-mbr-auth-policy-callout` | `POL-MBR-AUTH-005-01`, `POL-MBR-AUTH-005-03`, `LEGACY-MBR-AUTH-EXTERNAL-TERMS` | callout title/body | Keep callout inside auth-method section; external terms copy remains missing policy-source. |
| `[actions]` | `ogn-mbr-auth-primary-action` | `LEGACY-MBR-AUTH-CTA` | disabled `인증하기` until selection | Preserve bottom CTA state; external SDK/route is TBD. |

## Distortion Gates

- Treat current `Screen.tsx` as perfect visual/structural truth; do not change implementation while updating metadata.
- Keep `AppScreen` rails explicit: `SystemHeader`, `Header`, scrollable `Content`, and fixed `Bottom(preset="primary-cta")`.
- Preserve the single 4px `SectionDivider(thickness="section")` between intro and auth-method section.
- Keep all three auth options in one radio group named `identity-method`; do not split rows into separate sections or cards.
- Initial selection remains `null`; the CTA stays disabled until the user selects a method.
- The policy callout stays inside the auth-method `SectionItem`; do not move it behind another section divider.
- Do not invent policy IDs for 30-day reauth exemption, external certification terms, or external auth SDK routing.
- Do not introduce route-level raw margin, padding, width, font-size, fixed/absolute CTA chrome, deprecated PXDS legacy imports, or legacy-mbr organisms.
