# LEGACY-MBR-PG-006-0 — 회원 가입 기본 정보 입력 (CX 전환)

## Screen Contract

- legacy source: `apps/mobile/src/app/(legacy-mbr)/LEGACY-MBR-PG-006-0/Screen.tsx`
- target route: `/LEGACY-MBR-PG-006-0-CX`
- group: `legacy-converted-mbr`
- domain: `mbr`
- pattern: `form-entry` (DESIGN_PATTERNS.md `상세_정보 입력` — TextField + 단일 선택 혼합)
- 단계: 회원 가입 2/5 (legacy `ProgressTopBar.percent=40`)
- required design docs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`
- design SOT (참고): `apps/mobile/src/app/(legacy-converted-mbr)/LEGACY-MBR-PG-002-0-CX/Screen.diagram.md`, `apps/mobile/src/app/(cx)/CX-EXAMPLE-PERSONAL-INFO-INPUT/Screen.diagram.md`

## Conversion Intent (Legacy → CX)

| Legacy 어휘 | CX 대체 | 비고 |
| --- | --- | --- |
| `ProgressTopBar(title, leading, progress)` | `AppBar(title="회원 가입", showLeftItem, showTitle)` + `TitleMain.titleSubText="회원 가입 2/5"` | CX `AppBar`에는 progress slot이 없다. 단계 정보는 eyebrow로 흡수하고 progress bar는 폐기한다. Header 표기는 spaced form인 `"회원 가입"`으로 통일한다. |
| `MembershipHeroSection(titleLines, description)` | `Section(intro)` → `PageStackContents(title=TitleMain)` | 가입 흐름 단계 안내와 입력 목적을 먼저 설명한다. |
| `MembershipFormSection(fields[])` | `Section(profile)` → `PageStackContents(title=TitleSection("기본 정보"))` + `SectionItem` + `FieldStack` + `TextField` × 3 | 이름/생년월일/휴대전화 입력. helperText는 TextField helper slot에 둔다. |
| `MembershipSelectableSection(name, items[])` | `Section(gender)` → `PageStackContents(title=TitleSection("성별"))` + `SectionItem` + `FieldStack` + `ListSelected` radio rows | 단일 선택 값은 route state가 보유한다. |
| `MembershipPrimaryActionBar(primaryLabel="다음으로", disabled)` | `AppScreen.ActionBar(preset="primary-cta")` + `SinglePrimaryAction` + `Button` | CTA는 scroll content가 아니라 ActionBar 소유다. |

폐기 대상 import:
- `@pxds/pxds-components/shared/global` (`ProgressTopBar`)
- `@/organisms/legacy-mbr` (`MembershipHeroSection`, `MembershipFormSection`, `MembershipSelectableSection`, `MembershipPrimaryActionBar`)

## Slot Ownership Map

```txt
┌─────────────────────────────────────────┐
│ AppScreen(headerPreset="form-entry")    │
│ pattern: form-entry / signup profile    │
│ viewport: 393w                          │
├─────────────────────────────────────────┤
│ SystemHeader                            │
│  9:41                              ▮▮▮  │
├─────────────────────────────────────────┤
│ OGN: ogn-mbr-signup-profile-app-bar     │
│ role: step-navigation                   │
│ layoutStrategy                          │
│  widthTier : full-bleed                 │
│  stack     : horizontal chrome          │
│  alignment : leading title + back       │
│  wrapping  : title max 1 line           │
│ vocabularyDecision                      │
│  reuse: AppBar                          │
├─────────────────────────────────────────┤
│  ‹   회원 가입                          │
├─────────────────────────────────────────┤
│ Content: only scroll owner              │
│                                         │
│  OGN: ogn-mbr-signup-profile-hero       │
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
│  회원 가입 2/5                          │
│                                         │
│  기본 정보를                            │
│  입력해주세요                           │
│                                         │
│  본인인증과 회원 식별에 사용해요.       │
│  입력값은 서비스 이용 외에 활용되지     │
│  않습니다.                              │
│                                         │
│  ━━━━━━━ SectionDivider ━━━━━━━        │
│                                         │
│  OGN: ogn-mbr-signup-basic-profile      │
│  role: required-fields                  │
│  layoutStrategy                         │
│   widthTier : content-361               │
│   stack     : section title + fields    │
│   alignment : leading                   │
│   wrapping  : helper max 2 lines        │
│ vocabularyDecision                      │
│  reuse: PageStackContents + TitleSection│
│         + SectionItem + FieldStack      │
│         + TextField                     │
│                                         │
│  기본 정보                              │
│  ┌───────────────────────────────────┐  │
│  │ 이름                              │  │
│  │ 실명을 입력해주세요               │  │
│  │                                   │  │
│  │ 생년월일                          │  │
│  │ YYYYMMDD                          │  │
│  │ 예: 19900101 (8자리 숫자)         │  │
│  │                                   │  │
│  │ 휴대전화                          │  │
│  │ 01012345678                       │  │
│  │ 본인인증과 알림 발송에 사용해요   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ━━━━━━━ SectionDivider ━━━━━━━        │
│                                         │
│  OGN: ogn-mbr-signup-gender-choice      │
│  role: required-single-choice           │
│  layoutStrategy                         │
│   widthTier : content-361               │
│   stack     : section title + radio rows│
│   alignment : row label leading         │
│   selection : single radio              │
│   wrapping  : label max 1 line          │
│ vocabularyDecision                      │
│  reuse: PageStackContents + TitleSection│
│         + SectionItem + FieldStack      │
│         + ListSelected                  │
│                                         │
│  성별                                  │
│  ┌───────────────────────────────────┐  │
│  │ ○ 남성                            │  │
│  │ ○ 여성                            │  │
│  │ ○ 선택 안 함                      │  │
│  └───────────────────────────────────┘  │
├─────────────────────────────────────────┤
│ ActionBar(preset="primary-cta")         │
│ OGN: ogn-mbr-signup-profile-actions     │
│ layoutStrategy                          │
│  widthTier : content-361                │
│  stack     : single full-width button   │
│  wrapping  : button label max 1 line    │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 다음으로                          │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Content Flow

```txt
AppScreen
  SystemHeader
    StatusBar
  Header
    OGN: ogn-mbr-signup-profile-app-bar
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
      content:
        title: "회원 가입"
  Content
    OGN: ogn-mbr-signup-profile-hero
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
        titleSubText: "회원 가입 2/5"
        title: "기본 정보를\n입력해주세요"
        subTitle: "본인인증과 회원 식별에 사용해요. 입력값은 서비스 이용 외에 활용되지 않습니다."

    SectionDivider(thickness="section")

    OGN: ogn-mbr-signup-basic-profile
      role: required-fields
      pattern: form-entry
      layoutStrategy:
        widthTier: content-361
        stack: section title + field stack
        alignment: leading
        typography: field label -> input text -> helper
        wrapping: helper max 2 lines
      vocabularyDecision:
        reuse: PageStackContents + TitleSection + SectionItem + FieldStack + TextField
      content:
        sectionTitle: "기본 정보"
        fields:
          - label: "이름"; placeholder: "실명을 입력해주세요"; required: true
          - label: "생년월일"; placeholder: "YYYYMMDD"; helperText: "예: 19900101 (8자리 숫자)"; inputMode: numeric; maxLength: 8; required: true
          - label: "휴대전화"; placeholder: "01012345678"; helperText: "본인인증과 알림 발송에 사용해요"; inputMode: tel; maxLength: 11; required: true

    SectionDivider(thickness="section")

    OGN: ogn-mbr-signup-gender-choice
      role: required-single-choice
      pattern: form-entry
      layoutStrategy:
        widthTier: content-361
        stack: section title + radio rows
        alignment: row label leading, no right item
        selection: single radio
        wrapping: label max 1 line
      vocabularyDecision:
        reuse: PageStackContents + TitleSection + SectionItem + FieldStack + ListSelected
      content:
        sectionTitle: "성별"
        items:
          - id: "male"; label: "남성"
          - id: "female"; label: "여성"
          - id: "none"; label: "선택 안 함"
  ActionBar
    OGN: ogn-mbr-signup-profile-actions
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
        - primary: "다음으로"
```

## Layout Distortion Gate

- `AppScreen.Content`가 유일한 scroll owner여야 하며 CTA는 `AppScreen.ActionBar` 안에만 둔다.
- Header는 progress bar를 되살리지 않는다. 단계 정보는 `TitleMain.titleSubText`의 텍스트로만 유지한다.
- Screen.tsx의 header copy는 `"회원 가입"`으로 통일한다. 같은 flow의 AppBar/TitleMain 표기가 갈라지지 않아야 한다.
- `TextField` 세 개는 `FieldStack` 안에서만 간격을 가진다. route-level margin/padding/raw width로 field 간격을 보정하지 않는다.
- `birth`는 `maxLength=8`과 `inputMode="numeric"`을 유지한다. 날짜 picker가 필요하면 bottom sheet/picker vocabulary로 별도 설계한다.
- `phone` placeholder는 실제 저장값과 같은 숫자형 예시(`01012345678`)를 쓴다. 입력은 숫자만 남기고 11자리까지 허용한다.
- `ListSelected` radio rows는 right item과 subText slot을 닫는다. 성별 선택에 별도 설명/상태 badge를 추가하지 않는다.
- Deprecated `@pxds/pxds-components`, `@pxds/pxds-icons`, `@/organisms/legacy-mbr` import는 금지한다.

## Section Specs

| section | title | primary components | policy |
| --- | --- | --- | --- |
| `intro` | `기본 정보를 입력해주세요` | `PageStackContents`, `TitleMain` | POL-MBR-INFO-INTRO (TBD) |
| `profile` | `기본 정보` | `PageStackContents`, `TitleSection`, `SectionItem`, `FieldStack`, `TextField` | POL-MBR-PROFILE-BASIC (TBD) — 이름/생년월일/휴대전화 필수 |
| `gender` | `성별` | `PageStackContents`, `TitleSection`, `SectionItem`, `FieldStack`, `ListSelected` | POL-MBR-PROFILE-GENDER (TBD) — 단일 선택, "선택 안 함" 옵션 허용 |

## Action Contract

| element | label | variant | role | policy |
| --- | --- | --- | --- | --- |
| Primary CTA | `다음으로` | `primary` | 기본 정보 제출 후 다음 가입 단계 진입 | POL-MBR-PROFILE-BASIC, POL-MBR-PROFILE-GENDER — 필수값 누락 시 진행 불가 |

- CTA 기본 상태는 `disabled`.
- 이름/생년월일/휴대전화가 모두 non-empty이고 성별이 선택되면 활성화한다.
- 현재 구현은 포맷 유효성까지 검사하지 않는다.

## State Rules

- `name`, `birth`, `phone` 세 값 모두 non-empty일 때 텍스트 입력 요구를 충족한다.
- `gender ∈ {"male", "female", "none"}` 중 하나가 선택되어야 한다.
- CTA `disabled = !name || !birth || !phone || !gender`.
- 성별 그룹은 단일 선택이다. parent state가 단일 string/null이므로 한 row 선택 시 나머지는 false가 된다.
- 생년월일 8자리 숫자 검증, 휴대전화 포맷 검증, 자동 하이픈은 정책/organism 단계에서 확정한다.

## Implementation Contract

- Use `@pxds/cx-components` for `AppBar`, `Button`, `ListSelected`, `SectionItem`, `StatusBar`, `TextField`, `TitleMain`, `TitleSection`.
- Use `@pxds/pxds-layout/components` for `AppScreen`, `FieldStack`, `PageStackContents`, `SectionDivider`, `SinglePrimaryAction`.
- Do NOT import `@pxds/pxds-components/*` (deprecated legacy) or `@pxds/pxds-icons` (deprecated legacy).
- Do NOT reuse `@/organisms/legacy-mbr/*`.
- 본 화면은 가입 흐름 단계이므로 `Section(intro) → TitleMain`을 유지한다.
- Progress 정보(2/5, 40%)는 시각 progress 컴포넌트로 표현하지 않고 `TitleMain.titleSubText`에 자연어로 흡수한다.
- 단순 route composition으로 충분하므로 현재는 Screen.tsx에서 직접 조립한다. profile/gender 정책 데이터와 검증이 커지면 `apps/mobile/src/organisms/mbr/` 아래 OGN으로 승격한다.
- Section 사이는 `SectionDivider(thickness="section")` 외 다른 wrapper로 구분하지 않는다.
- TextField `helperText`는 TextField helper slot으로 전달하며, FieldStack 바깥에 별도 caption을 두지 않는다.

## Open Questions

1. **Header 표기 차이** — `"회원 가입"`으로 통일했지만, 서비스 copy SOT가 붙은 표기 `"회원가입"`을 요구하면 AppBar와 다이어그램을 함께 되돌려야 한다.
2. **생년월일 입력 UX** — 8자리 숫자 직접 입력인지, date picker bottom sheet인지 확정 필요. 현 변환은 legacy 직접 입력을 유지한다.
3. **휴대전화 자동 하이픈** — 현재 입력은 숫자만 허용한다. 하이픈 자동 포맷팅이 정책상 필요하면 TextField masking/formatting vocabulary가 필요하다.
4. **포맷 검증 부재** — 현재 CTA 활성은 non-empty 기준뿐이다. 생년월일 8자리 숫자, 전화번호 포맷, 실명 입력 규칙은 별도 정책 ref로 보강해야 한다.
5. **policy ref 채번** — legacy 화면이 정책 ref를 들고 있지 않다. 기본 정보/성별 정책 ID는 policy-core 별도 트랙이다.
