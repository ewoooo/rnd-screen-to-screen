# NOVA-MBR-FP-002-0 — 개인정보 입력

## Screen Contract

- screenId: `NOVA-MBR-FP-002-0`
- route: `/NOVA-MBR-FP-002-0`
- group: `nova-mbr-fp`
- domain: `mbr`
- pattern: `form`
- implementation source: `Screen.tsx`
- policyRefs: `POL-MBR-INFO-002-03`, `POL-MBR-INFO-002-04`, `POL-MBR-INFO-002-05`, `POL-MBR-INFO-002-06`, `POL-MBR-INFO-002-08`
- OGN refs: `ogn-mbr-member-input`, `ogn-mbr-entry-check`
- appliedGovernanceRefs: `UXPT_BTN`, `UXPT_ERR`, `UXPT_NAV`, `UXPT_LOD`, `VOT_RUL`
- AppScreen slots: `SystemHeader`, `Header`, `Content`, `Bottom`
- header: `AppBar(title="회원 가입")` owned by `FpPageHeader` chrome under `Header`
- bottom: `Bottom(preset="primary-cta")`
- visible primary CTA: `다음` owned by `MbrFpActionBar`, blocked while required input is missing or invalid
- visible content sections: `intro`, `memberInput`
- mounted hidden sections: `entryCheck` (`EntryCheck visible={false}`, surfaces only on existing-member identification)
- wireReference:
  - source: `apps/mobile/src/screen-diagrams/skt-genui-test-0512/detail-form/personal-info-input.diagram.md`
  - matchedParts: AppScreen `Header` + scrollable `Content` + fixed `Bottom(preset="primary-cta")` rail; stacked editable form-field density readable for sequential text inputs; one full-width primary CTA in the bottom rail
  - intentionalDifferences: reference uses four 4px `bg-alt` divider bands between five mixed read-only/typed address sections; this screen is a single editable member-input field group with no divider bands and adds a policy-required inline error notice plus a hidden entry-check notice section that the reference does not contain
  - limitation: reference-only visual structure; policy-required field constraints, error copy, OGN ids, and route come from `Screen.map.md` and policy-core, not from the Figma reference
- wireReferenceSecondary:
  - source: `apps/mobile/src/app/(nova-mbr-legacy)/NOVA-MBR-PG-002-0/Screen.diagram.md`
  - matchedParts: same `member-input` policy-family (`POL-MBR-INFO-002-03/04/05/06/08`) expressed as one stacked field organism with a hidden mounted entry/branch section; field constraints and errors owned inside the field organism, not by the route
  - intentionalDifferences: PG-002 has no bottom slot and uses `ProgressAppBar`; FP-002 keeps a plain `AppBar` and adds a fixed `Bottom(preset="primary-cta")` for the `다음` progression action
  - limitation: legacy OGN names (`ogn-mbr-text-field-member-info`, `ogn-mbr-section-message-entry-branch`) do not override the FP route OGN vocabulary (`ogn-mbr-member-input`, `ogn-mbr-entry-check`)

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
│ [intro | task-page-header | content-top]              │
│   개인정보 입력                                       │
│   가입에 필요한 기본 정보를 입력해 주세요             │
│                                                        │
│ [memberInput | form-field-group | section]            │
│   아이디                                              │
│   ┌────────────────────────────────────────────────┐   │
│   │ 영문과 숫자 6~20자                             │   │
│   └──────────────────── text field ────────────────┘   │
│   비밀번호                                            │
│   ┌────────────────────────────────────────────────┐   │
│   │ 10~20자, 영문 대/소문자·숫자·특수문자 3종 조합 │   │
│   └──────────────────── secure field ──────────────┘   │
│   비밀번호 확인                                       │
│   ┌────────────────────────────────────────────────┐   │
│   │ 비밀번호를 다시 입력해 주세요                  │   │
│   └──────────────────── secure field ──────────────┘   │
│   이메일                                              │
│   ┌────────────────────────────────────────────────┐   │
│   │ example@domain.com                             │   │
│   └──────────────────── text field ────────────────┘   │
│   연락처                                              │
│   ┌────────────────────────────────────────────────┐   │
│   │ 숫자 11자리                                    │   │
│   └──────────────────── numeric field ─────────────┘   │
│   ┌────────────────────────────────────────────────┐   │
│   │ 아이디는 영문과 숫자만 6~20자로 입력해 주세요  │   │
│   └──────────────────── negative notice ───────────┘   │
│                                                        │
│ [entryCheck | notice | hidden]                        │
│   hidden mounted section                              │
│   EntryCheck visible=false                            │
│                                                        │
├─Bottom(preset="primary-cta")──────────────────────────┤
│ [actions | bottom-primary-action | bottom-fixed]      │
│   ┌────────────────────────────────────────────────┐   │
│   │                      다음                      │   │
│   └──────────────────── primary CTA ───────────────┘   │
└────────────────────────────────────────────────────────┘
```

### Pattern Analysis Gate

- `[intro]` tag `task-page-header | content-top` is chrome-owned page-header text; no component OGN boundary, single page title + sub copy stack.
- `[memberInput]` tag `form-field-group | section` reads as a stacked editable field group with one adjacent negative notice. Apply field-stack pattern, not key-value summary.
- `[actions]` tag `bottom-primary-action | bottom-fixed` is fixed bottom CTA chrome; it is not a scroll-content section and has no config OGN id.

```txt
patternEvidence:
  sectionBoundary: none
  fieldGrouping: FieldStack
  rowSeparators: none
  actionPlacement: Bottom(preset="primary-cta")
  typography:
    rowTitle: Text(sectionTitle) per field label
    rowCaption: Text(helper) for placeholder/format hint
    emphasisRule: none
    controlLabelScale: matches-reference
patternDecision:
  pattern: FieldStack + adjacent Notice(negative) inside MemberInput OGN
  reason: SB ogn-mbr-member-input shows five sequential text-field inputs with one negative section-message on validation failure; actual FP implementation uses `MemberInput` as a `VStack` containing `FieldStack` plus adjacent `Notice`, with no PageStackContents, contents divider, row separators, or card surface. Five label+field rows form one semantic input group, so FieldStack owns the grouping. The negative notice is field-adjacent inline error (UXPT_ERR), not a standalone section.
```

- `[entryCheck]` is mounted hidden; no `patternEvidence` rendered while `visible={false}`. When surfaced it is a single `Notice` (cautionary for 정상/휴면, info for 탈퇴) with a skeleton loading state; it is not a divider, card, or field group.

## Section Contracts

### [intro]

- slot: `Content`
- OGN: chrome `FpPageHeader` (not a config OGN id)
- role: Introduce the 개인정보 입력 task and set the input expectation before the field group.
- visibleTitle: `개인정보 입력`
- visibleContent: `가입에 필요한 기본 정보를 입력해 주세요`
- policy: structural page-header copy; field-validation policy is owned by `memberInput`
- appliedGovernanceRefs: `UXPT_NAV`, `VOT_RUL`
- patternEvidence:
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography: `rowTitle: Text(sectionTitle)` / `rowCaption: Text(bodySubtle)` / `emphasisRule: none` / `controlLabelScale: matches-reference`
- patternDecision:
  - pattern: `FpPageHeader title + sub copy`
  - reason: first content section directly below `Header`; no divider band before the page header, matching PG-002 intro convention
- ognBoundaryDecision:
  - owner: chrome `FpPageHeader`; not a config OGN id
  - boundary: structural page-header chrome inside `Content`, backed by `PageStackContents` + `TitleMain`
  - rationale: intro copy orients the screen but is not a policy/data OGN; keep it outside `generation.ognIds`
  - implementationConstraint: may mention `PageStackContents` only for this chrome header boundary, not for FP-002 body OGNs
- layoutStrategy:
  - widthTier: `content-361`
  - padding: DESIGN_FOUNDATION content padding tier (no route-level raw spacing)
  - stack: `vertical`
  - alignment: `leading`
  - typography: title `sectionTitle`, sub copy `bodySubtle`
  - wrapping: sub copy may wrap to two lines; no truncation
  - overflow: `multiline`
- layoutContract:
  - role: orient the user to the input task before the fields
  - structure: page title + one supporting sub line
  - alignment: `leading`
  - density: comfortable header rhythm; no card boundary
  - wrapping: sub copy wraps, title stays one line
  - distortionRisk: collapsing the intro into the AppBar, or expanding it with policy prose, breaks header rhythm
- componentCandidates:
  - name: `SectionHeaderPage` (`ogn-mbr-section-header-page`, `nova-mbr-legacy/section-header-page`)
    source: existing organism in another screen group
    fit: `strong`
    reason: capability identical — wraps `PageStackContents` with a `TitleMain(title, subTitle)` title slot, no route-level layout; same title + sub header role this section needs
    risk: lives in the `nova-mbr-legacy` group under id `ogn-mbr-section-header-page`; reusing it directly would not match the chrome-only header role this FP screen assigns (no config OGN id for `[intro]`)
  - name: `FpPageHeader` chrome (title + sub)
    source: chrome vocabulary for this batch (`nova-mbr-fp/_chrome`)
    fit: `strong`
    reason: same `PageStackContents` + `TitleMain(title, subTitle)` capability as `SectionHeaderPage`, kept as chrome (not a config OGN id) so the intro stays structural header copy
    risk: none; structural header copy only
- systemConsistencyNote: `FpPageHeader` and legacy `SectionHeaderPage` are byte-equivalent (`PageStackContents` + `TitleMain`); the only divergence is group placement and config-OGN status. Record as a consolidation candidate — one shared page-header organism could serve both groups.
- deviationReason: SB defines this screen's header as chrome only (no config OGN id); legacy `SectionHeaderPage` (`ogn-mbr-section-header-page`) is a different id in the `nova-mbr-legacy` group, and the generation verifier matches `generation.ognIds` against organism config `id` exactly, so reusing it would bind a legacy OGN id the FP screen contract does not declare. Re-expressed as FP-group chrome.
- distortionRisk: low; risk appears if format/validation copy is moved up into the intro instead of staying on fields

### [memberInput]

- slot: `Content`
- OGN: `ogn-mbr-member-input`
- role: Capture id, password, password confirmation, email, and contact, and own field-level format and duplicate validation plus the adjacent negative error notice.
- visibleContent: stacked `TextField` group — 아이디, 비밀번호, 비밀번호 확인, 이메일, 연락처 — with format placeholders; on validation failure the field shows invalid state and a field-adjacent `Notice negative` carries the policy error copy
- policy: `POL-MBR-INFO-002-03`, `POL-MBR-INFO-002-04`, `POL-MBR-INFO-002-05`, `POL-MBR-INFO-002-06`, `POL-MBR-INFO-002-08`
- appliedGovernanceRefs: `UXPT_ERR`, `VOT_RUL`
- fieldGrouping: `FieldStack` (five fields as one semantic input group; per-field validation owned inside the OGN, not the route)
- patternEvidence:
  - sectionBoundary: `none`
  - fieldGrouping: `FieldStack`
  - rowSeparators: `none`
  - actionPlacement: `Bottom(preset="primary-cta")`
  - typography: `rowTitle: Text(sectionTitle)` per field label / `rowCaption: Text(helper)` for format placeholder / `emphasisRule: none` / `controlLabelScale: matches-reference`
- patternDecision:
  - pattern: `FieldStack + adjacent Notice(negative)` inside `MemberInput`
  - reason: SB `ogn-mbr-member-input` component detail lists five text fields plus one `section-message negative` on failure; actual FP implementation uses a `VStack` containing `FieldStack` plus adjacent `Notice`, not `PageStackContents`. No divider, no row separator, no card surface. Label+field rows repeated five times form a single input group → FieldStack. Error notice is field-adjacent inline (UXPT_ERR), not top-of-screen aggregate.
- ognBoundaryDecision:
  - owner: `ogn-mbr-member-input`
  - boundary: body OGN owns the full five-field input group plus its adjacent validation notice
  - rationale: field labels, constraints, invalid state, and error copy all come from member-input policy; route should not split fields into separate sections or lift validation notices out of the OGN
  - implementationConstraint: actual body composition is `VStack` + `FieldStack` + `Notice`; do not describe it as `PageStackContents`
- layoutStrategy:
  - widthTier: `content-361`
  - padding: DESIGN_FOUNDATION form field-stack spacing tier (DESIGN_PATTERNS field rhythm; no route-level raw spacing)
  - stack: `vertical` field stack
  - alignment: `leading` labels, full-width fields
  - typography: field label `sectionTitle`, placeholder/helper `helper`, error copy `negative notice`
  - wrapping: error notice copy may wrap to two lines below the failing field; field values stay one line
  - overflow: `multiline` for error notice; fields do not horizontally scroll
- layoutContract:
  - role: collect all required member information and surface field-level validation outcomes
  - structure: five label + full-width field rows in one stack, with one adjacent negative notice on failure
  - alignment: `leading`; labels and field surfaces share a stable content column
  - density: comfortable stacked form density (PG-002 member-info precedent); no card boundary
  - wrapping: error notice wraps below the relevant field without overlapping the next field or the bottom CTA
  - distortionRisk: rendering field constraints/errors as route-level notices outside the OGN, or splitting the five fields into separate carded sections, breaks the single input-group hierarchy
- componentCandidates:
  - name: `TextFieldMemberInfo` (`ogn-mbr-text-field-member-info`, `nova-mbr-legacy/text-field-member-info`)
    source: existing organism in another screen group
    fit: `strong`
    reason: capability nearly identical — already owns a `FieldStack` of five `TextField` (id / password / password-confirm / email / contact) with placeholder + helper text, no route-level layout; covers the five-field input grouping this section requires
    risk: has no field-adjacent `Notice negative` slot, so it cannot carry the policy-required inline error copy (UXPT_ERR) on its own; also a different id in the `nova-mbr-legacy` group
  - name: `MemberInput` (`ogn-mbr-member-input`, `nova-mbr-fp/member-input`)
    source: OGN vocabulary for this batch
    fit: `strong`
    reason: owns the same five-field `FieldStack` capability as `TextFieldMemberInfo` and adds the field-adjacent `Notice negative` slot for the policy error copy, all inside the body OGN
    risk: none structural; ensure `Notice negative` renders adjacent to the failing field, not as a top aggregate
  - name: cx `FieldStack` + `TextField` + `Notice` composition
    source: `@pxds/cx-layout` / `@pxds/cx-components` capability comparison
    fit: `medium`
    reason: supplies field grouping, per-field invalid state, and a negative notice, but as raw primitives it carries no domain OGN identity or policy binding; usable only inside an organism boundary, not on the route
    risk: without an organism owner it pushes notice placement and policy-binding decisions to the route
- systemConsistencyNote: `MemberInput` reproduces the `TextFieldMemberInfo` five-`TextField` `FieldStack` almost verbatim; the only functional addition is the policy-required adjacent `Notice negative`. Record as a consolidation candidate — the shared field stack could become one organism with an optional error-notice slot.
- deviationReason: SB binds this section to the domain OGN id `ogn-mbr-member-input`, and the generation verifier matches `generation.ognIds` against organism config `id` exactly. Legacy `TextFieldMemberInfo` (`ogn-mbr-text-field-member-info`, `nova-mbr-legacy` group) is a different id and has no field-adjacent negative-notice slot, so reusing it directly breaks the SB ogn-id ↔ policy contract and drops the UXPT_ERR inline error. Re-expressed as FP-group `MemberInput` with the required negative notice.
- distortionRisk: medium; risk appears if validation policy is duplicated as route-level notices or if duplicate-info errors are rendered away from their fields

### [entryCheck]

- slot: `Content`
- OGN: `ogn-mbr-entry-check`
- role: Reserve the existing-member entry-condition messaging and its loading state; surface a cautionary/info notice only when an existing member is identified.
- visibleContent: none in the current state; section is mounted with `EntryCheck visible={false}`. When surfaced: `Notice cautionary` for 정상(이미 가입 — 로그인/내정보 안내) and 휴면(휴면 해제 안내), `Notice info` for 탈퇴(재가입 제한 안내); during the entry-condition API call a skeleton mirrors the notice layout
- policy: no policy-core policyRef binds here (SB-bound `POL-MBR-INFO-003-*` recorded as System-Break gap in `Screen.map.md`)
- appliedGovernanceRefs: `UXPT_LOD`, `VOT_RUL`
- patternEvidence:
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography: hidden in current state; surfaced notice uses notice title/body hierarchy / `emphasisRule: none` / `controlLabelScale: unknown`
- patternDecision:
  - pattern: `Notice (cautionary | info) with skeleton loading state`
  - reason: SB `ogn-mbr-entry-check` exposes only `section-message` variants and a skeleton loading state; no fields, no card, no divider. Keep hidden until existing-member identification.
- ognBoundaryDecision:
  - owner: `ogn-mbr-entry-check`
  - boundary: hidden/default-null body OGN that owns existing-member notice variants and loading placeholder when surfaced
  - rationale: entry-condition messaging is a separate state branch from the editable member-input fields; keeping it in its own OGN prevents default input state from implying an existing-member result
  - implementationConstraint: actual surfaced composition is primitive `VStack` + `Notice`; do not describe it as `PageStackContents`
- layoutStrategy:
  - widthTier: `content-361`
  - padding: DESIGN_FOUNDATION notice spacing tier
  - stack: `vertical`
  - alignment: `leading`
  - typography: notice title + body hierarchy
  - wrapping: notice copy may wrap; layout matches the skeleton to avoid layout jump (UXPT_LOD)
  - overflow: `multiline`
- layoutContract:
  - role: communicate existing-member entry condition (already joined / dormant / withdrawn) and its loading state
  - structure: single notice block; skeleton placeholder during the API call
  - alignment: `leading`
  - density: same notice density as the surfaced state; skeleton must not shift surrounding layout
  - wrapping: notice copy wraps inside the content column
  - distortionRisk: rendering this section visible (or with a layout-shifting skeleton) implies a different screen state
- componentCandidates:
  - name: `SectionMessageEntryBranch` (`ogn-mbr-section-message-entry-branch`, `nova-mbr-legacy/section-message-entry-branch`)
    source: existing organism in another screen group
    fit: `medium`
    reason: shares the core capability — a `visible`-gated section that returns `null` when hidden and renders a `Notice cautionary` for an existing-member branch when surfaced; same default-hidden mount contract this section needs
    risk: it pairs the notice with a fixed `Button` and exposes only one cautionary branch, while SB requires 정상 / 휴면 / 탈퇴 variants and a skeleton loading state; it is also a different id in the `nova-mbr-legacy` group
  - name: `EntryCheck` (`ogn-mbr-entry-check`, `nova-mbr-fp/entry-check`)
    source: OGN vocabulary for this batch
    fit: `strong`
    reason: owns the same `visible`-gated default-hidden contract as `SectionMessageEntryBranch` and is scoped to carry the SB-required cautionary/info notice variants plus a layout-matching skeleton, without route-level layout
    risk: skeleton must match the surfaced notice layout to satisfy UXPT_LOD no-jump rule
  - name: cx `Notice` (visible-gated, cautionary/info)
    source: `@pxds/cx-components` capability comparison
    fit: `medium`
    reason: provides the cautionary/info notice surface but no default-hidden mount contract or skeleton state; needs an organism owner to gate visibility and bind the entry-condition meaning
    risk: without an organism boundary the visibility gate and loading state leak to the route
- deviationReason: SB binds this section to the domain OGN id `ogn-mbr-entry-check`, and the generation verifier matches `generation.ognIds` against organism config `id` exactly. Legacy `SectionMessageEntryBranch` (`ogn-mbr-section-message-entry-branch`, `nova-mbr-legacy` group) is a different id and exposes only a single cautionary branch with a fixed button, whereas SB requires 정상 / 휴면 / 탈퇴 variants with a skeleton state; reusing it directly breaks the SB ogn-id ↔ contract. Re-expressed as FP-group `EntryCheck`.
- distortionRisk: high; surfacing this section in the diagram would imply an existing-member state instead of the default input state

### [actions]

- slot: `Bottom`
- OGN: chrome `MbrFpActionBar`; not a config OGN id (structural-only)
- role: Provide the single progression action for the personal-info input step.
- visibleContent: primary CTA `다음`, disabled while required input is missing or invalid
- policy: CTA enablement follows required field validity from `memberInput`; no separate policyRef binds this chrome section
- appliedGovernanceRefs: `UXPT_BTN`, `UXPT_NAV`, `UXPT_ERR`, `VOT_RUL`
- patternEvidence:
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `Bottom(preset="primary-cta")`
  - typography: button label only / `emphasisRule: none` / `controlLabelScale: matches-reference`
- patternDecision:
  - pattern: `Bottom(preset="primary-cta") + single primary button`
  - reason: Screen Wire has one bottom-fixed `다음` CTA; UXPT_BTN keeps progression as a single primary and keeps disabled state tied to field validity rather than adding secondary actions
- ognBoundaryDecision:
  - owner: chrome `MbrFpActionBar`; not a config OGN id
  - boundary: fixed bottom action chrome, outside scroll content and outside the member-input body OGN
  - rationale: CTA placement is AppScreen bottom-slot structure; the member-input OGN owns validation meaning while the chrome bar owns action rendering/state
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
  - role: advance after valid member information
  - structure: fixed bottom rail with one full-width primary button
  - alignment: centered CTA label
  - density: fixed action area, not scroll content
  - wrapping: label stays one line
  - distortionRisk: moving the CTA into scroll content, or adding a competing secondary action, changes the rail contract
- componentCandidates:
  - name: `MbrFpActionBar` (`nova-mbr-fp/_chrome`, structural-only, no config OGN id)
    source: chrome vocabulary for this batch
    fit: `strong`
    reason: renders the single `ActionButton` primary state used by FP screens and keeps the bottom action structural-only
    risk: none for reference; keep structural-only in config until a component config id exists
- distortionRisk: low; risk appears if CTA enablement is detached from member-input validity or moved into scroll content

## Policy / OGN Matrix

### [intro]

- visibleEvidence: `개인정보 입력`, `가입에 필요한 기본 정보를 입력해 주세요`
- policyInterpretation: structural task label; no policyRef binds here (validation policy expressed in `memberInput`)
- OGNInterpretation: chrome `FpPageHeader`; not a config OGN id
- decision: preserve as the first content section directly below `Header`

### [memberInput]

- visibleEvidence: 아이디/비밀번호/비밀번호 확인/이메일/연락처 field stack with format placeholders and an adjacent negative error notice
- policyInterpretation: `POL-MBR-INFO-002-03` (아이디 영문·숫자), `POL-MBR-INFO-002-04` (아이디 6~20자), `POL-MBR-INFO-002-05` (비밀번호 10~20자), `POL-MBR-INFO-002-06` (비밀번호 3종 조합), `POL-MBR-INFO-002-08` (연락처 숫자 11자리) define field constraints and the inline error conditions
- OGNInterpretation: `ogn-mbr-member-input` owns all five fields and the field-adjacent negative notice
- decision: keep every field constraint and error inside the member-input organism; do not lift validation to route-level notices

### [entryCheck]

- visibleEvidence: none; mounted hidden section only
- policyInterpretation: SB-bound entry-condition handling (`POL-MBR-INFO-003-07/08/09`) is a recorded System-Break gap in `Screen.map.md`; no policy-core policyRef binds in this diagram
- OGNInterpretation: `ogn-mbr-entry-check`
- decision: preserve as hidden state; surface cautionary/info notice + skeleton only on existing-member identification

### [actions]

- visibleEvidence: bottom CTA `다음` disabled in the default invalid/incomplete state
- policyInterpretation: CTA enablement follows `memberInput` validity and UXPT_BTN/UXPT_NAV; no independent policyRef binds
- OGNInterpretation: chrome `MbrFpActionBar`; structural-only, out of config `ognIds`
- decision: keep in `Bottom(preset="primary-cta")` and out of scroll content; disabled until required input is valid

## Distortion Gates

Layout Distortion Gate — 8-signal check, passed:

1. Repeated `label → value/state` rows ≥ 2 → the five field rows are a single editable input group, owned by `FieldStack` inside `ogn-mbr-member-input`; not split into per-field carded sections. Pass.
2. Title/subtitle/body hierarchy mixing → `intro` uses `sectionTitle` + `bodySubtle`; each field uses `sectionTitle` label + `helper` placeholder; error uses negative notice. Hierarchy stays distinct. Pass.
3. Label/value column collision → fields are full-width with leading labels in a stable content column; no two-column squeeze. Pass.
4. Long policy copy hides CTA/next section → field constraints stay as short placeholders; the policy error copy is a field-adjacent notice that wraps below the failing field and does not overlap `entryCheck` or the bottom `다음` CTA. Pass.
5. Important value over-wraps and breaks row structure → field values stay one line; only the negative notice wraps, and it is a single block, not a comparison row. Pass.
6. Two-column/split height-rhythm break → no split layout in this screen; single vertical field stack. Pass.
7. Fixed bottom action overlaps scroll content / last section clipped → `다음` is isolated in `Bottom(preset="primary-cta")`; `entryCheck` (last content section) is hidden and does not collide with the fixed bottom rail. Pass.
8. Route-level padding/negative margin/raw width/arbitrary fontSize needed → layout uses `FpPageHeader` chrome, body `VStack`/`FieldStack` composition, and `Bottom` preset with DESIGN_FOUNDATION spacing tiers only; no route-level raw spacing. Pass.
9. Missing slot forces meaningless wrapper/spacer → `MemberInput` owns a field-adjacent negative-notice slot; `EntryCheck` owns its hidden/skeleton contract; no empty spacers. Pass.

Preservation decisions:

- Keep section order `[intro]`, `[memberInput]`, hidden `[entryCheck]`, then bottom `[actions]`.
- Preserve explicit AppScreen rails: `SystemHeader`, `Header`, `Content(scroll)`, `Bottom(preset="primary-cta")`.
- Use only the standard bottom slot name; no legacy bottom-action alias appears in this diagram.
- No section divider band: SB `ogn-mbr-member-input` shows a single field group, so no `├══Divider══┤` is drawn (intentional difference from the address-stack reference).
- Five fields stay one `FieldStack`; do not split into separate carded sections.
- The negative error notice stays field-adjacent inside the OGN; it is not promoted to a top-of-screen aggregate.
- Keep `entryCheck` hidden while `EntryCheck visible={false}`; do not surface notice or skeleton copy in the default input state.
- The `다음` CTA stays disabled while required input is missing or invalid; it is never moved into scroll content and never gains a competing secondary action.
