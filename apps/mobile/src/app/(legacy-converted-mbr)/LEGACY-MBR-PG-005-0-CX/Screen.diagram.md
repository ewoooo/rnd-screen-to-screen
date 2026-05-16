# LEGACY-MBR-PG-005-0-CX — 회원 탈퇴 사유

## Screen Contract

- route: `/LEGACY-MBR-PG-005-0-CX`
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
  - intentionalDifferences: withdrawal reason screen uses checkbox choice rows and an optional free-text field instead of personal-info text fields.
  - limitation: reference-only visual structure; policy/copy/OGN ids come from current `Screen.tsx`, `Screen.map.md`, and `Screen.config.ts`.

## Screen Wire

```txt
┌─AppScreen(headerPreset="form-entry")──────────────────────┐
├─SystemHeader──────────────────────────────────────────────┤
│ StatusBar                                                 │
├─Header────────────────────────────────────────────────────┤
│ AppBar(title="탈퇴 사유", showLeftItem, showTitle)          │
├─Content(scroll)───────────────────────────────────────────┤
│ [intro | form-intro-title | content]                      │
│ 회원 탈퇴 2/6                                             │
│ 탈퇴하시는 이유가                                         │
│ 무엇인가요?                                               │
│ 더 나은 서비스를 위해 알려주세요. (1개 이상 선택)          │
├══Divider 4px / SectionDivider(thickness="section")════════┤
│ [reasons | checkbox-field-stack-section | section-divider]│
│ 탈퇴 사유                                                 │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ □ 가격이 부담돼요                                    │   │
│ │ □ 이용 빈도가 낮아요                                 │   │
│ │ □ 다른 서비스로 옮겨요                               │   │
│ │ □ 사용이 불편해요                                    │   │
│ │ □ 오류·결제 문제가 있었어요                          │   │
│ │ □ 기타 (직접 입력)                                   │   │
│ └──────────────────────────────────────────────────────┘   │
├══Divider 4px / SectionDivider(thickness="section")════════┤
│ [freeText | optional-text-field-section | section-divider]│
│ 자유 의견 (선택)                                         │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ 자유 의견 (선택)                                     │   │
│ │ 자세한 의견을 입력해주세요                           │   │
│ │ 0/500자                                              │   │
│ └──────────────────────────────────────────────────────┘   │
├─Bottom(preset="primary-cta")──────────────────────────────┤
│ [actions | bottom-primary-action | bottom-fixed]          │
│ ┌──────────────────────────────────────────────────────┐   │
│ │                         다음                         │   │
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
  - typography: `TitleMain` with step caption, two-line title, and short subtitle.
- patternDecision:
  - patternFamily: `form-intro-title`
  - pattern: existing composition
  - reason: current screen uses `PageStackContents` with `TitleMain` before the first section divider.
- layoutStrategy:
  - widthTier: `content`
  - padding: `PageStackContents` owns horizontal content padding.
  - stack: vertical intro text.
  - alignment: leading
  - wrapping: title intentionally wraps at the newline; subtitle may wrap inside content width.
  - overflow: normal content scroll.
- layoutContract:
  - role: introduce the withdrawal-reason step and minimum selection requirement.
  - structure: `PageStackContents` title slot containing `TitleMain`.
  - alignment: leading text hierarchy.
  - density: intro spacing owned by page-stack layout.
  - wrapping: preserve explicit title line break and keep subtitle readable.
  - distortionRisk: adding a card, progress bar, or body wrapper would diverge from the implemented screen.
- componentCandidates:
  - name: `PageStackContents(title=TitleMain)`
    source: `current Screen.tsx`
    fit: strong
    reason: directly preserves the implemented intro hierarchy and copy slots.
    risk: none when the title remains in `TitleMain`.

### [reasons]

- patternEvidence:
  - wireSemanticTag: `[reasons | checkbox-field-stack-section | section-divider]`
  - sectionBoundary: `SectionDivider`
  - fieldGrouping: `FieldStack`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography: `TitleSection`; checkbox row labels use control label scale with no subText.
- patternDecision:
  - patternFamily: `sectioned-checkbox-field-stack`
  - pattern: existing composition
  - reason: current screen renders six `ListSelected` rows in one `FieldStack` and sets `data-figma-property-type="checkbox"`.
- layoutStrategy:
  - widthTier: `content`
  - padding: `PageStackContents` + `SectionItem`
  - stack: vertical field stack under a section title.
  - alignment: leading row labels; right item and subText slots are closed.
  - wrapping: labels should stay readable without colliding with checkbox affordance.
  - overflow: rows remain in the content scroll region.
- layoutContract:
  - role: collect one or more withdrawal reasons.
  - structure: titled section + `SectionItem` + multi-select row stack.
  - alignment: uniform leading checkbox rows.
  - density: `FieldStack` owns row rhythm; section divider separates it from intro and free text.
  - wrapping: long reason labels may wrap within row bounds but must not add route-level spacing.
  - distortionRisk: using standalone checkboxes, cards, or right-side adornments would change the implemented list-selection rhythm.
- componentCandidates:
  - name: `PageStackContents + TitleSection + SectionItem + FieldStack + ListSelected(checkbox)`
    source: `current Screen.tsx`
    fit: strong
    reason: preserves the implemented title, section padding, multi-select rows, and disabled right/subText slots.
    risk: long labels need the row component's own wrapping behavior.

### [freeText]

- patternEvidence:
  - wireSemanticTag: `[freeText | optional-text-field-section | section-divider]`
  - sectionBoundary: `SectionDivider`
  - fieldGrouping: `single`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography: `TitleSection` plus `TextField` label, placeholder, and helper text.
- patternDecision:
  - patternFamily: `sectioned-optional-text-field`
  - pattern: existing composition
  - reason: current screen renders an optional single `TextField` with a 500-character helper counter.
- layoutStrategy:
  - widthTier: `content`
  - padding: `PageStackContents` + `SectionItem`
  - stack: vertical section title and one text field.
  - alignment: leading
  - wrapping: placeholder and helper stay inside field contract.
  - overflow: typed text remains in field; section scrolls with content.
- layoutContract:
  - role: collect optional free-form withdrawal feedback.
  - structure: titled section + one text field with helper counter.
  - alignment: leading field label/value/helper.
  - density: single-field density owned by `SectionItem` and `TextField`.
  - wrapping: helper counter stays one line; placeholder must not overflow content width.
  - distortionRisk: replacing this with raw textarea or route-level styling would invent a component vocabulary not present in the current screen.
- componentCandidates:
  - name: `PageStackContents + TitleSection + SectionItem + TextField(helperText, maxLength=500)`
    source: `current Screen.tsx`
    fit: strong
    reason: preserves the implemented optional input, label, placeholder, counter helper, and max length.
    risk: multiline behavior is not represented by the current `TextField`; do not invent it in metadata.

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
  - role: progress to the next withdrawal step once at least one reason is selected.
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
| `LEGACY-MBR-WITHDRAW-REASON-INTRO` | current `Screen.tsx` | structural-only | `ogn-mbr-withdraw-reason-intro` | `intro` | TBD | Preserve the step caption, two-line question, and minimum-selection subtitle. |
| `LEGACY-MBR-WITHDRAW-REASON-OPTIONS` | current `Screen.tsx` | TBD; no policy-core source confirmed | `ogn-mbr-withdraw-reason-options` | `reasons` | TBD | Preserve six checkbox `ListSelected` rows and minimum-one-selection action dependency. |
| `LEGACY-MBR-WITHDRAW-REASON-FREE-TEXT` | current `Screen.tsx` | TBD; no policy-core source confirmed | `ogn-mbr-withdraw-reason-free-text` | `freeText` | TBD | Preserve optional text field, placeholder, `maxLength=500`, and helper counter. |
| `LEGACY-MBR-WITHDRAW-REASON-ACTIONS` | current `Screen.tsx` | structural-only | `ogn-mbr-withdraw-reason-actions` | `actions` | TBD | Preserve disabled primary CTA until `selected.size > 0`. |

## Distortion Gates

- Treat current `Screen.tsx` as the truth; do not redesign or reinterpret the legacy-converted screen while editing metadata.
- Keep `AppScreen.Content` as the only scroll owner and keep the primary CTA in `AppScreen.ActionBar preset="primary-cta"`.
- Preserve `SectionDivider(thickness="section")` between intro, reasons, and free-text sections.
- Preserve `ListSelected` checkbox rows with `showListSelectedRightItem={false}` and `showSubText={false}`.
- Preserve the CTA enablement rule: disabled when no reason is selected; free text does not participate in CTA activation.
- Preserve `TextField maxLength={500}` and helper counter ownership inside the field.
- Do not invent policy IDs, validation copy, required free-text behavior for "기타", or multiline textarea behavior without a policy/source update.
- Do not add route-level raw margin, padding, width, fontSize, color, or deprecated imports to recreate this layout.
