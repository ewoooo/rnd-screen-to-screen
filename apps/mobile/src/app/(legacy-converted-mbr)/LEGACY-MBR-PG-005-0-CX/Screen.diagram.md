# LEGACY-MBR-PG-005-0 — 탈퇴 사유 (CX 전환)

## Screen Contract

- legacy source: `apps/mobile/src/app/(legacy-mbr)/LEGACY-MBR-PG-005-0/Screen.tsx`
- target route: `/LEGACY-MBR-PG-005-0-CX`
- group: `legacy-converted-mbr`
- domain: `mbr`
- pattern: `form-entry` (DESIGN_PATTERNS.md `상세_정보 입력` — 다중 선택 + 자유 의견 입력 혼합)
- 단계: 회원 탈퇴 2/6 (legacy `ProgressTopBar.percent=33.33`)
- required design docs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`
- design SOT (참고): `apps/mobile/src/app/(legacy-converted-mbr)/LEGACY-MBR-PG-002-0-CX/Screen.diagram.md`, `apps/mobile/src/app/(legacy-converted-mbr)/LEGACY-MBR-PG-007-0-CX/Screen.diagram.md`, `apps/mobile/src/app/(cx)/CX-EXAMPLE-PERSONAL-INFO-INPUT/Screen.diagram.md`

## Conversion Intent (Legacy → CX)

| Legacy 어휘 | CX 대체 | 비고 |
| --- | --- | --- |
| `ProgressTopBar(title="탈퇴 사유", leading="back", progress)` | `AppBar(title="탈퇴 사유", showLeftItem, showTitle)` + `TitleMain.titleSubText="회원 탈퇴 2/6"` | CX `AppBar`에는 progress slot이 없다. 단계 정보는 제목 상단 eyebrow slot으로 흡수하고 progress bar는 폐기한다. |
| `MembershipHeroSection(titleLines, description)` | `Section(intro)` → `PageStackContents(title=TitleMain)` | 탈퇴 흐름의 첫 입력 화면이므로 hero/intro를 유지한다. |
| `MembershipSelectableSection(selectionMode="multi", items=6)` | `Section(reasons)` → `PageStackContents(title=TitleSection)` + `SectionItem` + `FieldStack` + `ListSelected` checkbox rows | 다중 선택 그룹 의미는 route state가 보유한다. 각 row는 `data-figma-property-type="checkbox"`로 표현한다. |
| `MembershipFormSection(fields=[free-text])` | `Section(freeText)` → `PageStackContents(title=TitleSection)` + `SectionItem` + `TextField` | CX `TextField`가 multiline을 지원하지 않으므로 500자 자유 의견은 단행 입력으로 임시 수용한다. Open Questions에 system gap으로 기록한다. |
| `MembershipPrimaryActionBar(primaryLabel="다음", disabled)` | `AppScreen.ActionBar(preset="primary-cta")` + `SinglePrimaryAction` + `Button` | CTA는 scroll content가 아니라 ActionBar 소유다. |

폐기 대상 import:
- `@pxds/pxds-components/shared/global` (`ProgressTopBar`)
- `@/organisms/legacy-mbr` (`MembershipHeroSection`, `MembershipSelectableSection`, `MembershipFormSection`, `MembershipPrimaryActionBar`)

## Slot Ownership Map

```txt
┌─────────────────────────────────────────┐
│ AppScreen(headerPreset="form-entry")    │
│ pattern: form-entry / withdraw reason   │
│ viewport: 393w                          │
├─────────────────────────────────────────┤
│ SystemHeader                            │
│  9:41                              ▮▮▮  │
├─────────────────────────────────────────┤
│ OGN: ogn-mbr-withdraw-reason-app-bar    │
│ role: step-navigation                   │
│ layoutStrategy                          │
│  widthTier : full-bleed                 │
│  stack     : horizontal chrome          │
│  alignment : leading title + back       │
│  wrapping  : title max 1 line           │
│ vocabularyDecision                      │
│  reuse: AppBar                          │
├─────────────────────────────────────────┤
│  ‹   탈퇴 사유                          │
├─────────────────────────────────────────┤
│ Content: only scroll owner              │
│                                         │
│  OGN: ogn-mbr-withdraw-reason-hero      │
│  role: intro                            │
│  layoutStrategy                         │
│   widthTier : content-361               │
│   stack     : vertical                  │
│   alignment : leading                   │
│   typography: step caption -> title -> body│
│   wrapping  : title max 2 / body max 2  │
│ vocabularyDecision                      │
│  reuse: PageStackContents + TitleMain   │
│                                         │
│  회원 탈퇴 2/6                          │
│                                         │
│  탈퇴하시는 이유가                      │
│  무엇인가요?                            │
│                                         │
│  더 나은 서비스를 위해 알려주세요.      │
│  (1개 이상 선택)                        │
│                                         │
│  ━━━━━━━ SectionDivider ━━━━━━━        │
│                                         │
│  OGN: ogn-mbr-withdraw-reason-options   │
│  role: required-choice                  │
│  layoutStrategy                         │
│   widthTier : content-361               │
│   stack     : section title + field rows│
│   alignment : row label leading         │
│   selection : multi checkbox            │
│   wrapping  : label max 1 line preferred│
│ vocabularyDecision                      │
│  reuse: PageStackContents + TitleSection│
│         + SectionItem + FieldStack      │
│         + ListSelected                  │
│                                         │
│  탈퇴 사유                              │
│  ┌───────────────────────────────────┐  │
│  │ □ 가격이 부담돼요                 │  │
│  │ □ 이용 빈도가 낮아요              │  │
│  │ □ 다른 서비스로 옮겨요            │  │
│  │ □ 사용이 불편해요                 │  │
│  │ □ 오류·결제 문제가 있었어요       │  │
│  │ □ 기타 (직접 입력)                │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ━━━━━━━ SectionDivider ━━━━━━━        │
│                                         │
│  OGN: ogn-mbr-withdraw-free-text        │
│  role: optional-comment                 │
│  layoutStrategy                         │
│   widthTier : content-361               │
│   stack     : section title + input     │
│   alignment : leading                   │
│   wrapping  : placeholder may wrap risk │
│ vocabularyDecision                      │
│  reuse: TextField                       │
│  hold: multiline TextArea vocabulary    │
│                                         │
│  자유 의견 (선택)                      │
│  ┌───────────────────────────────────┐  │
│  │ 자유 의견 (선택)                  │  │
│  │ 자세한 의견을 입력해주세요        │  │
│  │ 0/500자                           │  │
│  └───────────────────────────────────┘  │
├─────────────────────────────────────────┤
│ ActionBar(preset="primary-cta")         │
│ OGN: ogn-mbr-withdraw-reason-actions    │
│ layoutStrategy                          │
│  widthTier : content-361                │
│  stack     : single full-width button   │
│  wrapping  : button label max 1 line    │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 다음                              │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Content Flow

```txt
AppScreen
  SystemHeader
    StatusBar
  Header
    OGN: ogn-mbr-withdraw-reason-app-bar
      role: step-navigation
      pattern: form-entry
      layoutStrategy:
        widthTier: full-bleed
        stack: horizontal chrome
        alignment: leading title + back
        typography: app-bar title
        wrapping: title max 1 line
      vocabularyDecision:
        reuse: AppBar
  Content
    OGN: ogn-mbr-withdraw-reason-hero
      role: intro
      pattern: form-entry
      layoutStrategy:
        widthTier: content-361
        stack: vertical
        alignment: leading
        typography: step caption -> display title -> body
        wrapping: title max 2 lines, body max 2 lines
      vocabularyDecision:
        reuse: PageStackContents + TitleMain
      content:
        titleSubText: "회원 탈퇴 2/6"
        title: "탈퇴하시는 이유가\n무엇인가요?"
        subTitle: "더 나은 서비스를 위해 알려주세요. (1개 이상 선택)"

    SectionDivider(thickness="section")

    OGN: ogn-mbr-withdraw-reason-options
      role: required-choice
      pattern: form-entry
      layoutStrategy:
        widthTier: content-361
        stack: section title + field rows
        alignment: row label leading, no right item
        selection: multi checkbox
        wrapping: labels max 1 line preferred; long labels must not collide with checkbox
      vocabularyDecision:
        reuse: PageStackContents + TitleSection + SectionItem + FieldStack + ListSelected
      content:
        sectionTitle: "탈퇴 사유"
        items:
          - id: "price"; label: "가격이 부담돼요"
          - id: "rare-use"; label: "이용 빈도가 낮아요"
          - id: "alt-service"; label: "다른 서비스로 옮겨요"
          - id: "ux"; label: "사용이 불편해요"
          - id: "error"; label: "오류·결제 문제가 있었어요"
          - id: "etc"; label: "기타 (직접 입력)"

    SectionDivider(thickness="section")

    OGN: ogn-mbr-withdraw-free-text
      role: optional-comment
      pattern: form-entry
      layoutStrategy:
        widthTier: content-361
        stack: section title + input
        alignment: leading
        typography: field label -> placeholder -> helper
        wrapping: placeholder may wrap; helper max 1 line
      vocabularyDecision:
        reuse: TextField
        hold: multiline TextArea because CX TextField is single-line
      content:
        sectionTitle: "자유 의견 (선택)"
        label: "자유 의견 (선택)"
        placeholder: "자세한 의견을 입력해주세요"
        helperText: "{freeText.length}/500자"
        maxLength: 500
  ActionBar
    OGN: ogn-mbr-withdraw-reason-actions
      role: primary-progress
      pattern: form-entry
      layoutStrategy:
        widthTier: content-361
        stack: single full-width button
        alignment: stretch
        wrapping: label max 1 line
      vocabularyDecision:
        reuse: SinglePrimaryAction + Button
      actions:
        - primary: "다음"
```

## Layout Distortion Gate

- `AppScreen.Content`가 유일한 scroll owner여야 하며 CTA는 `AppScreen.ActionBar` 밖으로 내려오면 안 된다.
- Header는 progress bar를 되살리지 않는다. 단계 정보는 `TitleMain.titleSubText`의 텍스트로만 유지한다.
- `ListSelected` rows는 right item과 subText slot을 닫는다. 우측 장식이나 임의 badge로 선택지를 보강하지 않는다.
- `오류·결제 문제가 있었어요` 같은 긴 label은 checkbox와 충돌하지 않아야 한다. 필요 시 row 내부의 표준 wrapping/ellipsis contract를 따른다.
- 자유 의견은 현 구현상 단행 `TextField`다. 500자 장문 입력을 raw `<textarea>`나 route-level style로 임시 구현하지 않는다.
- `TextField` placeholder가 361px content 폭에서 과하게 길어 보이면 copy를 줄이거나 CX multiline vocabulary를 보강한다. route-level width/padding 보정은 금지한다.
- Section 사이는 `SectionDivider(thickness="section")`만 사용한다. 임의 margin/padding wrapper를 추가하지 않는다.
- Deprecated `@pxds/pxds-components`, `@pxds/pxds-icons`, `@/organisms/legacy-mbr` import는 금지한다.

## Section Specs

| section | title | primary components | policy |
| --- | --- | --- | --- |
| `intro` | `탈퇴하시는 이유가 무엇인가요?` | `PageStackContents`, `TitleMain` | POL-MBR-WITHDRAW-REASON-INTRO (TBD) |
| `reasons` | `탈퇴 사유` | `PageStackContents`, `TitleSection`, `SectionItem`, `FieldStack`, `ListSelected` | TBD — 다중 선택, 최소 1개 |
| `freeText` | `자유 의견 (선택)` | `PageStackContents`, `TitleSection`, `SectionItem`, `TextField` | TBD — 자유 의견 최대 500자, 선택 입력 |

## Action Contract

| element | label | variant | role | policy |
| --- | --- | --- | --- | --- |
| Primary CTA | `다음` | `primary` | 탈퇴 사유 제출 후 다음 단계 진입 | TBD — 사유 미선택 시 진행 불가 |

- CTA 기본 상태는 `disabled`.
- `selected.size >= 1`일 때만 CTA를 활성화한다.
- 자유 의견은 선택 입력이므로 CTA 활성 조건에 포함하지 않는다.

## State Rules

- `selected: Set<string>` — 6개 사유 ID 중 선택된 집합. `ListSelected.onChange`가 `toggle(id, checked)`를 호출한다.
- `freeText: string` — `TextField.value`. `maxLength=500`으로 입력 상한을 보장한다.
- `helperText`는 `${freeText.length}/500자` 형태로 표시한다.
- CTA `disabled = selected.size === 0`.
- "기타 (직접 입력)" 선택 시 자유 의견 필수 여부는 아직 정책 확정 전이다. 현 화면은 단순 선택 토글과 선택 자유 의견으로만 표현한다.

## Implementation Contract

- Use `@pxds/cx-components` for `AppBar`, `Button`, `ListSelected`, `SectionItem`, `StatusBar`, `TextField`, `TitleMain`, `TitleSection`.
- Use `@pxds/pxds-layout/components` for `AppScreen`, `FieldStack`, `PageStackContents`, `SectionDivider`, `SinglePrimaryAction`.
- Do NOT import `@pxds/pxds-components/*` (deprecated legacy) or `@pxds/pxds-icons` (deprecated legacy).
- Do NOT reuse `@/organisms/legacy-mbr/*`.
- 본 화면은 탈퇴 흐름의 첫 입력 화면이므로 `Section(intro) → TitleMain`을 유지한다.
- Progress 정보(2/6, 33.33%)는 시각 progress 컴포넌트로 표현하지 않고 `TitleMain.titleSubText`에 자연어로 흡수한다.
- 단순 route composition으로 충분하므로 현재는 Screen.tsx에서 직접 조립한다. 사유 목록/자유 의견이 정책 데이터와 결합되면 `apps/mobile/src/organisms/mbr/` 아래 OGN으로 승격한다.
- Section 사이는 `SectionDivider(thickness="section")` 외 다른 wrapper로 구분하지 않는다.

## Open Questions

1. **TextField multiline 부재** — CX `TextField`는 단행 입력이다. 500자 자유 의견 UX가 실제로 장문 입력을 요구하면 `@pxds/cx-components`에 multiline TextField variant 또는 TextArea vocabulary를 보강해야 한다.
2. **"기타" 선택 시 자유 의견 필수 여부** — 현재는 `etc` 선택만으로 진행 가능하다. 정책상 직접 입력이 필수라면 CTA 조건과 error copy가 추가되어야 한다.
3. **사유 코드 정합** — 6개 사유 ID는 화면 내부 값이다. policy-core 사유 코드 체계와 매핑 필요.
4. **다음 단계 trigger** — "다음" CTA가 탈퇴 확인/검증 중 어느 단계로 이동하는지 정책 ref와 함께 확정 필요.
5. **policy ref 채번** — legacy 화면이 정책 ref를 들고 있지 않다. 다이어그램에는 TBD로 표기한다.
