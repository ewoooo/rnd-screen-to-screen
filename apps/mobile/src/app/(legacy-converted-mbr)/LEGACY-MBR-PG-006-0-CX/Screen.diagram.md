# LEGACY-MBR-PG-006-0-CX — 회원 가입 기본 정보

## Screen Contract

- route: `/LEGACY-MBR-PG-006-0-CX`
- group: `legacy-converted-mbr`
- domain: `membership`
- source: current `Screen.tsx`
- reverseEngineeringSource: current `Screen.tsx` is treated as the visual/structural truth for this legacy-converted screen.
- pattern: `form-entry`
- policy refs: `structural-only`
- governance refs: `TBD`; legacy conversion metadata does not establish policy-core governance mapping.
- wireReference:
  - source: `apps/mobile/src/app/(cx)/CX-EXAMPLE-PERSONAL-INFO-INPUT/Screen.diagram.md`
  - matchedParts: `AppScreen(headerPreset="form-entry")`, header app bar, `TitleMain` intro, section divider bands, field-stack sections, fixed primary CTA.
  - intentionalDifferences: signup profile screen uses three editable identity fields and a radio row stack for gender instead of read-only proof fields.
  - limitation: reference-only visual structure; policy/copy/OGN ids come from current `Screen.tsx`, `Screen.map.md`, and `Screen.config.ts`.

## Screen Wire

```txt
┌─AppScreen(headerPreset="form-entry")──────────────────────┐
├─SystemHeader──────────────────────────────────────────────┤
│ StatusBar                                                 │
├─Header────────────────────────────────────────────────────┤
│ AppBar(title="회원 가입", showLeftItem, showTitle)          │
├─Content(scroll)───────────────────────────────────────────┤
│ [intro | form-intro-title | content]                      │
│ 회원 가입 2/5                                             │
│ 기본 정보를                                               │
│ 입력해주세요                                              │
│ 본인인증과 회원 식별에 사용해요. 입력값은 서비스 이용 외에 │
│ 활용되지 않습니다.                                       │
├══Divider 4px / SectionDivider(thickness="section")════════┤
│ [profile | text-field-stack-section | section-divider]    │
│ 기본 정보                                                 │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ 이름                                                 │   │
│ │ 실명을 입력해주세요                                  │   │
│ │ 생년월일                                             │   │
│ │ YYYYMMDD                                             │   │
│ │ 예: 19900101 (8자리 숫자)                            │   │
│ │ 휴대전화                                             │   │
│ │ 01012345678                                          │   │
│ │ 본인인증과 알림 발송에 사용해요                      │   │
│ └──────────────────────────────────────────────────────┘   │
├══Divider 4px / SectionDivider(thickness="section")════════┤
│ [gender | radio-field-stack-section | section-divider]    │
│ 성별                                                      │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ ○ 남성                                               │   │
│ │ ○ 여성                                               │   │
│ │ ○ 선택 안 함                                         │   │
│ └──────────────────────────────────────────────────────┘   │
├─Bottom(preset="primary-cta")──────────────────────────────┤
│ [actions | bottom-primary-action | bottom-fixed]          │
│ ┌──────────────────────────────────────────────────────┐   │
│ │                        다음으로                      │   │
│ └──────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

## Section Contracts

### [intro]

- patternEvidence:
  - wireSemanticTag: `[intro | form-intro-title | content]`
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography: `TitleMain` with step caption, two-line title, and explanatory subtitle.
- patternDecision:
  - patternFamily: `form-intro-title`
  - pattern: existing composition
  - reason: current screen uses `PageStackContents` with `TitleMain` before the first divider.
- layoutStrategy:
  - widthTier: `content`
  - padding: `PageStackContents` owns horizontal content padding.
  - stack: vertical intro text.
  - alignment: leading
  - wrapping: title intentionally wraps at the newline; subtitle may wrap to multiple lines.
  - overflow: normal content scroll.
- layoutContract:
  - role: introduce the signup basic-info step and explain data use at a high level.
  - structure: `PageStackContents` title slot containing `TitleMain`.
  - alignment: leading text hierarchy.
  - density: intro spacing owned by page-stack layout.
  - wrapping: preserve explicit title line break and keep subtitle within content width.
  - distortionRisk: adding a card, progress bar, or extra notice would diverge from the implemented screen.
- componentCandidates:
  - name: `PageStackContents(title=TitleMain)`
    source: `current Screen.tsx`
    fit: strong
    reason: directly preserves the implemented step caption, title, and subtitle slots.
    risk: none when subtitle remains in `TitleMain`.

### [profile]

- patternEvidence:
  - wireSemanticTag: `[profile | text-field-stack-section | section-divider]`
  - sectionBoundary: `SectionDivider`
  - fieldGrouping: `FieldStack`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography: `TitleSection`; field label, placeholder/value, and helper text are owned by `TextField`.
- patternDecision:
  - patternFamily: `sectioned-text-field-stack`
  - pattern: existing composition
  - reason: current screen renders three editable `TextField` controls in one `FieldStack`.
- layoutStrategy:
  - widthTier: `content`
  - padding: `PageStackContents` + `SectionItem`
  - stack: vertical field stack.
  - alignment: leading field labels and values.
  - wrapping: helper text may wrap inside field bounds; numeric examples stay readable.
  - overflow: no horizontal overflow for placeholders or helpers.
- layoutContract:
  - role: collect basic identity/contact fields needed by the implemented step.
  - structure: titled section + `SectionItem` + three text fields in one stack.
  - alignment: full-width field rhythm with leading labels.
  - density: `FieldStack` owns vertical spacing between fields.
  - wrapping: helper text belongs to its field and must not become separate body copy.
  - distortionRisk: splitting fields into separate sections or adding route-level spacing would break the implemented form rhythm.
- componentCandidates:
  - name: `PageStackContents + TitleSection + SectionItem + FieldStack + TextField`
    source: `current Screen.tsx`
    fit: strong
    reason: preserves section title, field grouping, helper ownership, numeric input hints, and max-length contracts.
    risk: none for current placeholders and helper copy.

### [gender]

- patternEvidence:
  - wireSemanticTag: `[gender | radio-field-stack-section | section-divider]`
  - sectionBoundary: `SectionDivider`
  - fieldGrouping: `FieldStack`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography: `TitleSection`; radio row labels use control label scale with no subText.
- patternDecision:
  - patternFamily: `sectioned-radio-field-stack`
  - pattern: existing composition
  - reason: current screen renders three `ListSelected` rows in one `FieldStack` and sets `data-figma-property-type="radio"`.
- layoutStrategy:
  - widthTier: `content`
  - padding: `PageStackContents` + `SectionItem`
  - stack: vertical radio row stack.
  - alignment: leading row labels; right item and subText slots are closed.
  - wrapping: labels stay one line in current copy.
  - overflow: rows remain in scroll content above the fixed action.
- layoutContract:
  - role: collect one gender option, including the visible "선택 안 함" option.
  - structure: titled section + `SectionItem` + single-select row stack.
  - alignment: uniform leading radio rows.
  - density: `FieldStack` owns row rhythm.
  - wrapping: labels must not collide with radio affordance.
  - distortionRisk: replacing rows with chips, segmented controls, or text-only buttons would change the implemented selection pattern.
- componentCandidates:
  - name: `PageStackContents + TitleSection + SectionItem + FieldStack + ListSelected(radio)`
    source: `current Screen.tsx`
    fit: strong
    reason: preserves the implemented radio semantics, section padding, and closed right/subText slots.
    risk: none for current option labels.

### [actions]

- patternEvidence:
  - wireSemanticTag: `[actions | bottom-primary-action | bottom-fixed]`
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `Bottom(preset="primary-cta")`
  - typography: xlarge primary button label.
- patternDecision:
  - patternFamily: `fixed-primary-cta`
  - pattern: existing bottom composition
  - reason: current screen uses `AppScreen.ActionBar preset="primary-cta"` with one full-width primary button.
- layoutStrategy:
  - widthTier: `content`
  - padding: action-bar preset owns safe-area and CTA width.
  - stack: single action.
  - alignment: full-width
  - wrapping: button label one line.
  - overflow: fixed bottom action stays outside scroll content.
- layoutContract:
  - role: progress to the next signup step when required implemented inputs are present.
  - structure: fixed bottom primary CTA.
  - alignment: full-width button inside primary action bar.
  - density: `primary-cta` preset.
  - wrapping: label remains one line.
  - distortionRisk: placing the button in scroll content or adding secondary actions would change the implemented action model.
- componentCandidates:
  - name: `ActionBar(preset="primary-cta") + SinglePrimaryAction + Button(fullWidth, size="xlarge", variant="primary")`
    source: `current Screen.tsx`
    fit: strong
    reason: exactly preserves the implemented action bar and disabled/enabled button surface.
    risk: none.

## Policy / OGN Matrix

| requirement | sourceRef | policy | OGN | section | governance | layout decision |
| --- | --- | --- | --- | --- | --- | --- |
| `LEGACY-MBR-SIGNUP-PROFILE-INTRO` | current `Screen.tsx` | structural-only | `ogn-mbr-signup-profile-intro` | `intro` | TBD | Preserve step caption, two-line title, and data-use subtitle. |
| `LEGACY-MBR-SIGNUP-BASIC-PROFILE` | current `Screen.tsx` | TBD; no policy-core source confirmed | `ogn-mbr-signup-basic-profile` | `profile` | TBD | Preserve name, birth, and phone fields in one `FieldStack`. |
| `LEGACY-MBR-SIGNUP-GENDER-CHOICE` | current `Screen.tsx` | TBD; no policy-core source confirmed | `ogn-mbr-signup-gender-choice` | `gender` | TBD | Preserve three radio `ListSelected` rows including "선택 안 함". |
| `LEGACY-MBR-SIGNUP-PROFILE-ACTIONS` | current `Screen.tsx` | structural-only | `ogn-mbr-signup-profile-actions` | `actions` | TBD | Preserve disabled primary CTA until implemented field conditions are satisfied. |

## Distortion Gates

- Treat current `Screen.tsx` as the truth; do not redesign or reinterpret the legacy-converted screen while editing metadata.
- Keep `AppScreen.Content` as the only scroll owner and keep the primary CTA in `AppScreen.ActionBar preset="primary-cta"`.
- Preserve `SectionDivider(thickness="section")` between intro, profile, and gender sections.
- Preserve the three basic-info fields in one `FieldStack`; helper text remains owned by the relevant `TextField`.
- Preserve `birth` as `inputMode="numeric"` with `maxLength={8}` and `phone` as digit-filtered input with `maxLength={11}`.
- Preserve `ListSelected` radio rows with `showListSelectedRightItem={false}` and `showSubText={false}`.
- Preserve the current CTA disabled rule: name must be non-empty, birth length must be 8, phone length must be 10 or 11, and gender must be selected.
- Do not invent policy IDs, validation error copy, date picker behavior, certification flow, or alternate gender semantics without a policy/source update.
- Do not add route-level raw margin, padding, width, fontSize, color, or deprecated imports to recreate this layout.
