# CX-EXAMPLE-TEXT-SECTION-PROOF — Text Section proof

## Screen Contract

- route: `/CX-EXAMPLE-TEXT-SECTION-PROOF`
- group: `cx-example`
- domain: `mbr`
- source: `SB`
- pattern: `form`
- frame: `SKT GenUI Test 0512 / Text Section` (`393x1186`)
- reverseEngineeringSource: current `Screen.tsx` is treated as the visual/structural truth for this proof screen.
- policy refs: `POL-MBR-INFO-002-08`, `POL-MBR-AUTH-002-01`
- governance refs: none selected; component proof screen.
- wireReference:
  - source: `apps/mobile/src/screen-diagrams/skt-genui-test-0512/detail-form/personal-info-input.diagram.md`
  - matchedParts: `AppScreen(headerPreset="form-entry")`, header app bar, section divider bands, sectioned text/field content, fixed primary CTA.
  - intentionalDifferences: current proof screen starts directly with the phone section and does not include the intro `TitleMain` section used by `CX-EXAMPLE-PERSONAL-INFO-INPUT`.
  - limitation: reference-only visual structure; policy/copy/OGN ids come from `Screen.map.md` and `Screen.config.ts`.

## Screen Wire

```txt
┌─AppScreen(headerPreset="form-entry")──────────────────────┐
├─SystemHeader──────────────────────────────────────────────┤
│ StatusBar                                                 │
├─Header────────────────────────────────────────────────────┤
│ AppBar(title="가입자 정보 입력", showLeftItem, showTitle)  │
├─Content(scroll)───────────────────────────────────────────┤
│ [phone | readonly-field-section | content-start]          │
│ 기기변경 휴대폰 번호                                      │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ 010-1234-5678                      disabled field   │   │
│ └──────────────────────────────────────────────────────┘   │
├══Divider 4px / SectionDivider(thickness="section")════════┤
│ [authComplete | read-only-text-section | section-divider] │
│ 본인인증 완료                                             │
│ 조현호 고객님의 본인인증이 완료되었습니다.                │
├══Divider 4px / SectionDivider(thickness="section")════════┤
│ [address | field-stack-section | section-divider]         │
│ 가입자 주소                                               │
│ ┌──────────────────────────────┐ ┌────────────┐            │
│ │ 01155        disabled field │ │ 주소 찾기  │            │
│ └──────────────────────────────┘ └────────────┘            │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ 서울 강북구 오현로 45,             disabled field   │   │
│ └──────────────────────────────────────────────────────┘   │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ 107동 203호(미아동, 꿈의숲해링턴플레이스) typed     │   │
│ └──────────────────────────────────────────────────────┘   │
├══Divider 4px / SectionDivider(thickness="section")════════┤
│ [homeArea | checkbox-field-stack-section | section-divider]│
│ 주 생활지역                                               │
│ ☑ 가입자 정보와 동일                                      │
│ ┌──────────────────────────────┐ ┌────────────┐            │
│ │ 01155        disabled field │ │ 주소 찾기  │            │
│ └──────────────────────────────┘ └────────────┘            │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ 서울 강북구 오현로 45,             disabled field   │   │
│ └──────────────────────────────────────────────────────┘   │
│ 5G 가용지역 확인 동의를 위한 정보                         │
├══Divider 4px / SectionDivider(thickness="section")════════┤
│ [email | typed-field-section | section-divider]           │
│ 이메일                                                    │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ example@plus-ex.com                    typed field  │   │
│ └──────────────────────────────────────────────────────┘   │
├─Bottom(preset="primary-cta")──────────────────────────────┤
│ [actions | bottom-primary-action | bottom-fixed]          │
│ ┌──────────────────────────────────────────────────────┐   │
│ │                         다음                         │   │
│ └──────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

## Section Contracts

### [phone]

- patternEvidence:
  - wireSemanticTag: `[phone | readonly-field-section | content-start]`
  - sectionBoundary: `none`
  - fieldGrouping: `single`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography: `TitleSection` for section title; disabled `TextField` value inside content.
- patternDecision:
  - patternFamily: `sectioned-single-field`
  - pattern: existing composition
  - reason: implemented as the first titled content section with one disabled field.
- ognBoundaryDecision: `structural-only` — no config OGN id is bound; the screen owns the proof field composition while phone policy meaning remains map-level evidence, not an organism boundary.
- layoutStrategy:
  - widthTier: `content`
  - padding: `PageStackContents` + `SectionItem`
  - stack: vertical
  - alignment: leading
  - wrapping: phone value stays one line
  - overflow: no horizontal overflow
- layoutContract:
  - role: read-only phone information
  - structure: section title + one disabled text field
  - alignment: leading field stack
  - density: first content section has no preceding divider in the implementation
  - wrapping: field value does not wrap in the proof state
  - distortionRisk: adding an intro title or preceding divider would change the proof screen.
- componentCandidates:
  - name: `PageStackContents + TitleSection + SectionItem + TextField(disabled)`
    source: `current Screen.tsx`
    fit: strong
    reason: directly preserves the implemented first section.
    risk: none for current proof copy.

### [authComplete]

- patternEvidence:
  - wireSemanticTag: `[authComplete | read-only-text-section | section-divider]`
  - sectionBoundary: `SectionDivider`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography: `TitleSection` + body/list text.
- patternDecision:
  - patternFamily: `sectioned-readonly-message`
  - pattern: existing composition
  - reason: implemented as titled section with one read-only message row.
- ognBoundaryDecision: `structural-only` — no config OGN id is bound; the screen owns the proof message composition while auth policy meaning remains map-level evidence, not an organism boundary.
- layoutStrategy:
  - widthTier: `content`
  - padding: `PageStackContents` + `SectionItem`
  - stack: vertical
  - alignment: leading
  - wrapping: message may wrap inside content width
  - overflow: section remains inside scroll content
- layoutContract:
  - role: identity verification completion state
  - structure: section title + single message row
  - alignment: leading
  - density: compact text section after divider
  - wrapping: message wraps as body text if needed
  - distortionRisk: turning it into a field or alert changes the proof screen's quiet read-only state.
- componentCandidates:
  - name: `PageStackContents + TitleSection + SectionItem + ListText(showRightItem=false)`
    source: `current Screen.tsx`
    fit: strong
    reason: directly preserves the implemented message row and no right item.
    risk: none for current proof copy.

### [address]

- patternEvidence:
  - wireSemanticTag: `[address | field-stack-section | section-divider]`
  - sectionBoundary: `SectionDivider`
  - fieldGrouping: `FieldStack`
  - rowSeparators: `none`
  - actionPlacement: `inline field action`
  - typography: `TitleSection` + text field values.
- patternDecision:
  - patternFamily: `sectioned-field-stack`
  - pattern: existing composition
  - reason: implemented as three text fields inside one `FieldStack`, with the postal-code action inside the first field.
- ognBoundaryDecision: `structural-only` — no config OGN id is bound; the screen owns this proof address field-stack slot and no organism-owned policy meaning is introduced.
- layoutStrategy:
  - widthTier: `content`
  - padding: `PageStackContents` + `SectionItem`
  - stack: vertical `FieldStack`
  - alignment: leading; first field owns inline action button
  - wrapping: address detail remains in typed field
  - overflow: long detail value stays inside field boundary
- layoutContract:
  - role: subscriber address capture
  - structure: title + field stack of postal code, base address, detail address
  - alignment: full-width field rhythm with inline action in postal-code field
  - density: field stack density owned by layout component
  - wrapping: field values must not collide with next section
  - distortionRisk: externalizing `주소 찾기` as a sibling button or adding route spacing breaks the implemented field rhythm.
- componentCandidates:
  - name: `PageStackContents + TitleSection + SectionItem + FieldStack + TextField(actionButton)`
    source: `current Screen.tsx`
    fit: strong
    reason: preserves field grouping, states, and inline action placement.
    risk: long address copy must remain inside field boundary.

### [homeArea]

- patternEvidence:
  - wireSemanticTag: `[homeArea | checkbox-field-stack-section | section-divider]`
  - sectionBoundary: `SectionDivider`
  - fieldGrouping: `FieldStack`
  - rowSeparators: `none`
  - actionPlacement: `inline field action`
  - typography: `TitleSection`; checkbox label scale matches field-stack control; helper text is owned by `TextField`.
- patternDecision:
  - patternFamily: `sectioned-checkbox-field-stack`
  - pattern: existing composition
  - reason: implemented as checked checkbox followed by mirrored disabled address fields inside one `FieldStack`.
- ognBoundaryDecision: `structural-only` — no config OGN id is bound; the screen owns this proof checkbox/address slot and no organism-owned policy meaning is introduced.
- layoutStrategy:
  - widthTier: `content`
  - padding: `PageStackContents` + `SectionItem`
  - stack: vertical `FieldStack`
  - alignment: leading
  - wrapping: helper text may wrap below its field
  - overflow: section scrolls with content
- layoutContract:
  - role: home area information tied to subscriber address
  - structure: title + checked checkbox + postal/base address fields
  - alignment: checkbox and fields share one vertical form rhythm
  - density: `FieldStack` owns internal spacing
  - wrapping: helper belongs to the final field, not a separate paragraph
  - distortionRisk: moving helper text outside the field or splitting checkbox into a separate section changes the implemented proof structure.
- componentCandidates:
  - name: `PageStackContents + TitleSection + SectionItem + FieldStack + Checkbox + TextField(actionButton, helperText)`
    source: `current Screen.tsx`
    fit: strong
    reason: preserves checkbox placement, mirrored disabled field states, inline action, and helper ownership.
    risk: none when helper remains in `TextField`.

### [email]

- patternEvidence:
  - wireSemanticTag: `[email | typed-field-section | section-divider]`
  - sectionBoundary: `SectionDivider`
  - fieldGrouping: `single`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography: `TitleSection` + typed `TextField`.
- patternDecision:
  - patternFamily: `sectioned-single-field`
  - pattern: existing composition
  - reason: implemented as titled section with one typed email field.
- ognBoundaryDecision: `structural-only` — no config OGN id is bound; the screen owns this proof email field slot and no organism-owned policy meaning is introduced.
- layoutStrategy:
  - widthTier: `content`
  - padding: `PageStackContents` + `SectionItem`
  - stack: vertical
  - alignment: leading
  - wrapping: email stays one line in proof state
  - overflow: no validation/error state is introduced
- layoutContract:
  - role: email capture
  - structure: section title + one typed field
  - alignment: leading
  - density: same section rhythm as phone
  - wrapping: field value stays inside field
  - distortionRisk: adding validation copy or helper text invents a state not present in the screen.
- componentCandidates:
  - name: `PageStackContents + TitleSection + SectionItem + TextField(typed)`
    source: `current Screen.tsx`
    fit: strong
    reason: directly preserves the implemented typed field.
    risk: none for current proof copy.

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
  - reason: implemented in `AppScreen.Bottom`, not as scroll content.
- ognBoundaryDecision: `structural-only` — no config OGN id is bound; `AppScreen.Bottom` owns the proof action slot and no organism-owned policy meaning is introduced.
- layoutStrategy:
  - widthTier: `content`
  - padding: bottom preset owns safe-area and horizontal CTA width
  - stack: single action
  - alignment: full-width
  - wrapping: button label one line
  - overflow: fixed bottom avoids content overlap
- layoutContract:
  - role: continue action
  - structure: fixed bottom primary CTA
  - alignment: full-width
  - density: `primary-cta` preset
  - wrapping: label stays one line
  - distortionRisk: putting the CTA at the end of scroll content breaks the screen's fixed action zone.
- componentCandidates:
  - name: `Bottom(preset="primary-cta") + SinglePrimaryAction + Button(fullWidth, size="xlarge", variant="primary")`
    source: `current Screen.tsx`
    fit: strong
    reason: exactly matches the implemented bottom action contract.
    risk: none.

## Policy / OGN Matrix

| requirement | sourceRef | policy | OGN | section | governance | layout decision |
| --- | --- | --- | --- | --- | --- | --- |
| `POL-MBR-INFO-002-08` | policy-core | `POL-MBR-INFO-002-08` | structural-only | `phone` | none; component proof screen | Preserve first section as disabled phone field without intro. |
| `POL-MBR-AUTH-002-01` | policy-core | `POL-MBR-AUTH-002-01` | structural-only | `authComplete` | none; component proof screen | Preserve quiet read-only completion message. |
| `CX-TEXT-ADDRESS` | Text Section proof | structural-only | structural-only | `address` | none; component proof screen | Preserve three-field address stack with inline address action. |
| `CX-TEXT-HOME-AREA` | Text Section proof | structural-only | structural-only | `homeArea` | none; component proof screen | Preserve checkbox + mirrored address fields in one stack. |
| `CX-TEXT-EMAIL` | Text Section proof | structural-only | structural-only | `email` | none; component proof screen | Preserve one typed email field. |
| `CX-TEXT-ACTION` | current `Screen.tsx` | structural-only | structural-only | `actions` | none; component proof screen | Preserve fixed bottom primary CTA. |

## Distortion Gates

- Treat current `Screen.tsx` as the truth; do not redesign the screen while updating diagram/config metadata.
- Keep `phone` as the first content section; do not add the intro title from the sibling proof screen.
- Keep `AppScreen.Content` as the only scroll owner and `AppScreen.Bottom(preset="primary-cta")` as the fixed action owner.
- Preserve `SectionDivider(thickness="section")` between content sections; do not replace divider bands with route margins.
- Preserve field state semantics: disabled phone/postal/base address, typed detail address, typed email.
- Preserve inline `TextField.actionButton` for `주소 찾기`; do not externalize it as a sibling content button.
- Preserve `TextField.helperText` ownership for `5G 가용지역 확인 동의를 위한 정보`.
- Do not add route-level raw margin, padding, width, fontSize, color, or deprecated imports to recreate this layout.
- Do not invent validation, error, loading, optional, or alternate auth states not present in the screen.
