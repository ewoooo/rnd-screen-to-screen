# LEGACY-MBR-PG-001-0 — 본인인증 수단 선택 (CX 전환)

## Screen Contract

- legacy source: `apps/mobile/src/app/(legacy-mbr)/LEGACY-MBR-PG-001-0/Screen.tsx`
- target route: `/LEGACY-MBR-PG-001-0-CX`
- group: `legacy-converted-mbr`
- domain: `mbr`
- pattern: `form-entry` / single-select 인증 수단 선택
- 단계: 회원 가입 3/5 (legacy `ProgressTopBar.percent=60`)
- policy map: `Screen.map.md`
- required design docs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`
- baseline standard: `apps/mobile/src/app/(legacy-converted-mbr)/LEGACY-MBR-PG-002-0-CX/Screen.diagram.md`

## Conversion Intent (Legacy → CX)

| Legacy 어휘 | CX 대체 | 비고 |
| --- | --- | --- |
| `ProgressTopBar(title="본인인증", leading="back", progress)` | `AppBar(title="본인인증", showLeftItem, showTitle)` + `TitleMain.titleSubText` | CX `AppBar`에는 progress slot이 없다. 진행률 bar는 폐기하고 `회원 가입 3단계 (3/5)`를 hero eyebrow로 흡수한다. |
| `MembershipHeroSection(titleLines, description)` | `Section(intro)` → `PageStackContents(title=TitleMain)` | 가입 흐름의 현재 과업과 30일 재인증 면제 조건을 먼저 설명한다. |
| `MembershipSelectableSection(name, value, items)` | `Section(method)` → `PageStackContents(title=TitleSection)` + `SectionItem` + `RQRListOption(type="radio")` | 실제 `Screen.tsx`는 `RQRListOption`을 사용한다. 각 인증 수단은 같은 radio group(`identity-method`) 안의 단일 선택지다. |
| `MembershipNoticeSection(badge="정책", text)` | method `SectionItem` 내부 `Callout(title="인증 정책 안내")` | 인증 실패 제한은 선택지와 같은 의미 단위다. 별도 section으로 떼면 선택 UI와 정책 제한 사이가 과하게 분리된다. |
| `MembershipPrimaryActionBar(primaryLabel="인증하기")` | `AppScreen.ActionBar` + `SinglePrimaryAction` + `Button` | CTA chrome은 route-level fixed/absolute가 아니라 `AppScreen.ActionBar`가 소유한다. |

폐기 대상 import:
- `@pxds/pxds-components/shared/global` (`ProgressTopBar`)
- `@/organisms/legacy-mbr` (`MembershipHeroSection`, `MembershipSelectableSection`, `MembershipNoticeSection`, `MembershipPrimaryActionBar`)

## Slot Ownership Map

```txt
┌─────────────────────────────────────────┐
│ AppScreen(headerPreset="form-entry")    │
│ pattern: form-entry / single-select     │
│ viewport: 393w                          │
├─────────────────────────────────────────┤
│ SystemHeader                            │
│  9:41                              ▮▮▮  │
├─────────────────────────────────────────┤
│ OGN: ogn-mbr-auth-app-bar               │
│ role: step-navigation                   │
│ layoutStrategy                          │
│  widthTier : full-bleed                 │
│  stack     : horizontal chrome          │
│  alignment : back + centered title      │
│  wrapping  : title max 1 line           │
│ vocabularyDecision                      │
│  reuse: AppBar                          │
├─────────────────────────────────────────┤
│  ‹   본인인증                           │
├─────────────────────────────────────────┤
│ Content: only scroll owner              │
│                                         │
│  OGN: ogn-mbr-auth-intro                │
│  role: task-intro                       │
│  layoutStrategy                         │
│   widthTier : content-361               │
│   stack     : vertical                  │
│   alignment : leading                   │
│   typography: step caption -> title -> body│
│   wrapping  : title max 2 / body max 2  │
│                                         │
│  회원 가입 3단계 (3/5)                  │
│                                         │
│  본인 확인을 위해                       │
│  인증 수단을 선택해주세요               │
│                                         │
│  한 번 인증하면 같은 단말에서 30일간    │
│  재인증이 면제돼요.                    │
│                                         │
│  ━━━━━━━ SectionDivider ━━━━━━━        │
│                                         │
│  OGN: ogn-mbr-auth-select               │
│  role: single-select                    │
│  layoutStrategy                         │
│   widthTier : content-361               │
│   stack     : section title + option list│
│   alignment : option left text             │
│   wrapping  : label max 1 / desc max 2  │
│                                         │
│  인증 수단 선택                         │
│                                         │
│  ○ 휴대폰 본인인증                       │
│    본인 명의 휴대폰으로 인증             │
│  ○ PASS 인증                             │
│    통신사 PASS로 인증                    │
│  ○ 공동인증서 인증                       │
│    공동인증서로 인증                     │
│                                         │
│  OGN: ogn-mbr-auth-policy-callout        │
│  role: constraint-notice                │
│  layoutStrategy                         │
│   widthTier : content-361               │
│   stack     : callout title + body      │
│   wrapping  : body max 3 lines          │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 인증 정책 안내                    │  │
│  │ 인증 5회 연속 실패 시 10분간 인증이│  │
│  │ 제한돼요. 인증기관 별 추가 약관에 │  │
│  │ 동의가 필요할 수 있어요.          │  │
│  └───────────────────────────────────┘  │
├─────────────────────────────────────────┤
│ ActionBar(preset="primary-cta")         │
│ OGN: ogn-mbr-auth-primary-action        │
│ layoutStrategy                          │
│  widthTier : content-361                │
│  stack     : single full-width button   │
│  wrapping  : label max 1 line           │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 인증하기                          │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Content Flow

```txt
AppScreen
  SystemHeader
    StatusBar
  Header
    OGN: ogn-mbr-auth-app-bar
      role: step-navigation
      pattern: form-entry
      layoutStrategy:
        widthTier: full-bleed
        stack: horizontal chrome
        alignment: back + centered title
        typography: app-bar title
        wrapping: title max 1 line
      vocabularyDecision:
        reuse: AppBar
  Content
    OGN: ogn-mbr-auth-intro
      role: task-intro
      pattern: form-entry
      layoutStrategy:
        widthTier: content-361
        stack: vertical
        alignment: leading
        typography: step caption -> display title -> body
        wrapping: title max 2 lines, body max 2 lines
        overflow: body multiline only
      vocabularyDecision:
        reuse: PageStackContents + TitleMain
      content:
        titleSubText: "회원 가입 3단계 (3/5)"
        title: "본인 확인을 위해\n인증 수단을 선택해주세요"
        subTitle: "한 번 인증하면 같은 단말에서 30일간 재인증이 면제돼요."

    SectionDivider(thickness="section")

    OGN: ogn-mbr-auth-select
      role: single-select
      pattern: form-entry
      layoutStrategy:
        widthTier: content-361
        stack: section title + radio option list
        alignment: option control + label/description + optional badge
        typography: section title -> option title -> option description
        wrapping: title max 1 line, description max 2 lines, badge max 1 line
        overflow: long option copy wraps inside option body; badge never creates route-level spacing
      vocabularyDecision:
        reuse: PageStackContents + TitleSection + SectionItem + RQRListOption(type="radio")
        hold: ListSelected because current implementation has moved to RQRListOption
      content:
        groupName: "identity-method"
        defaultValue: null
        options:
          - id: "phone"
            title: "휴대폰 본인인증"
            description: "본인 명의 휴대폰으로 인증"
          - id: "pass"
            title: "PASS 인증"
            description: "통신사 PASS로 인증"
          - id: "certificate"
            title: "공동인증서 인증"
            description: "공동인증서로 인증"

    OGN: ogn-mbr-auth-policy-callout
      role: constraint-notice
      pattern: form-entry
      layoutStrategy:
        widthTier: content-361
        stack: callout title + body
        alignment: leading
        typography: callout title -> body
        wrapping: body max 3 lines
        overflow: keep visible in scroll content; never hidden by ActionBar
      vocabularyDecision:
        reuse: Callout inside the method SectionItem
      content:
        title: "인증 정책 안내"
        body: "인증 5회 연속 실패 시 10분간 인증이 제한돼요. 인증기관 별 추가 약관에 동의가 필요할 수 있어요."
  ActionBar
    OGN: ogn-mbr-auth-primary-action
      role: continue-action
      pattern: form-entry
      layoutStrategy:
        widthTier: content-361
        stack: single full-width button
        alignment: stretch
        wrapping: button label max 1 line
      vocabularyDecision:
        reuse: SinglePrimaryAction + Button
      actions:
        - primary: "인증하기"
```

## Layout Distortion Gate

- `RQRListOption` rows must remain one radio group. Do not split options into separate `SectionItem` blocks or add custom margins between rows.
- The auth method list follows policy-core (`휴대폰`, `PASS`, `공동인증서`) and latest SB order (`휴대폰 본인인증`, `PASS 인증`, `공동인증서 인증`). Do not restore legacy-only options without updating policy-core first.
- Option descriptions have a 2-line budget. If policy copy grows beyond that, promote the extra constraint to the Callout rather than shrinking typography.
- The policy Callout stays inside the method section because it constrains the selected authentication action. If visual separation becomes too heavy inside `SectionItem`, record a CX component gap instead of adding raw padding.
- `selected == null` is now reachable because the screen starts with no selected method. This keeps the CTA disabled until the user explicitly chooses an authentication method.
- `회원 가입 3단계 (3/5)` duplicates step wording. It is preserved from the current screen, but should be copy-reviewed against policy-core before finalization.
- Route-level `margin`, `padding`, `width`, `fontSize`, fixed/absolute CTA chrome, deprecated `@pxds/pxds-components`, deprecated `@pxds/pxds-icons`, and `@/organisms/legacy-mbr/*` are forbidden.

## Section Specs

Policy requirement details live in `Screen.map.md`. This section records only the structural owner for each mapped OGN.

| section | title | primary components | map source |
| --- | --- | --- | --- |
| `intro` | `본인 확인을 위해 인증 수단을 선택해주세요` | `PageStackContents`, `TitleMain` | `ogn-mbr-auth-intro` in `Screen.map.md` |
| `method` | `인증 수단 선택` | `PageStackContents`, `TitleSection`, `SectionItem`, `RQRListOption`, `Callout` | `ogn-mbr-auth-select` in `Screen.map.md` |
| `method.policy` | `인증 정책 안내` | `Callout` | `ogn-mbr-auth-policy-callout` in `Screen.map.md` |

## Action Contract

| element | label | variant | role | map source |
| --- | --- | --- | --- | --- |
| Primary CTA | `인증하기` | `primary` | 선택한 외부 인증 수단으로 진행 | `ogn-mbr-auth-primary-action` in `Screen.map.md` |

- Initial selected method is `null`, so the CTA is disabled until selection.
- No option is visually recommended because policy-core does not define a recommended authentication method.

## State Rules

- `selected: null | "phone" | "pass" | "certificate"` is the single source of truth.
- `RQRListOption.checked` is derived from `selected === method.id`.
- `onCheckedChange(next)` updates selection only when `next` is truthy, preserving radio behavior.
- 인증 실패 누적, 인증기관 약관 동의, and external auth result handling are outside this screen.

## Implementation Contract

- Use `@pxds/cx-components` for `AppBar`, `Button`, `Callout`, `RQRListOption`, `SectionItem`, `StatusBar`, `TitleMain`, `TitleSection`.
- Use `@pxds/pxds-layout/components` for `AppScreen`, `PageStackContents`, `SectionDivider`, `SinglePrimaryAction`.
- Do NOT import `@pxds/pxds-components/*` or `@pxds/pxds-icons`.
- Do NOT reuse `@/organisms/legacy-mbr/*`. If this selector grows beyond route assembly, create a CX organism under `@/organisms/mbr/`.
- `AppScreen.Content` is the only scroll owner.
- CTA must live in `AppScreen.ActionBar`; never place it as the final content section.
- Section boundaries use `SectionDivider(thickness="section")` only.
- No route-level raw spacing/font/width corrections.

## Open Questions

1. **policy conflict 해소** — 상세 정책 불일치와 누락 근거는 `Screen.map.md` 의 `Open Questions / Missing Evidence`가 소유한다.
2. **default selection 정책** — policy-core는 기본 선택값을 정의하지 않는다. 현재 화면은 명시 선택 전 CTA disabled 상태를 유지한다.
3. **외부 인증 flow trigger** — "인증하기"가 휴대폰/PASS/공동인증서 중 어떤 SDK 또는 route를 호출하는지 본 변환 범위 밖이다.
4. **카피 원문 확정** — 30일 재인증 면제와 인증기관 추가 약관 copy는 `Screen.map.md`의 missing evidence로 남아 있다.
