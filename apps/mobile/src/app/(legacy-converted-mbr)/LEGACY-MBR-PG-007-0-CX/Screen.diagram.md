# LEGACY-MBR-PG-007-0 — 회원 가입 약관 동의 (CX 전환)

## Screen Contract

- legacy source: `apps/mobile/src/app/(legacy-mbr)/LEGACY-MBR-PG-007-0/Screen.tsx`
- target route: `/LEGACY-MBR-PG-007-0-CX`
- group: `legacy-converted-mbr`
- domain: `mbr`
- pattern: `form-entry` (DESIGN_PATTERNS.md `상세_정보 입력` / 확인·동의형)
- 단계: 회원 가입 1/5 (legacy `ProgressTopBar.percent=20`)
- required design docs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`
- design SOT (참고): `apps/mobile/src/app/(legacy-converted-mbr)/LEGACY-MBR-PG-002-0-CX/Screen.diagram.md`, Figma `SKT_GenUI_Test_0512` / `detail-information` (`14243:28433`)

## Conversion Intent (Legacy → CX)

| Legacy 어휘 | CX 대체 | 비고 |
| --- | --- | --- |
| `ProgressTopBar(title, leading, progress)` | `AppBar(title="회원 가입", showLeftItem, showTitle)` + `TitleMain.titleSubText="회원 가입 1단계 (1/5)"` | CX `AppBar`에는 progress slot이 없다. 단계 정보는 eyebrow로 흡수하고 progress bar는 폐기한다. |
| `MembershipHeroSection(titleLines, description)` | `Section(intro)` → `PageStackContents(title=TitleMain)` | 가입 흐름의 첫 진입 화면이므로 hero/intro를 유지한다. |
| `MembershipTermsSection` | `Section(terms)` → `PageStackContents(title=TitleSection("약관 동의"))` + `SectionItem` + `ConsentTermsAccordion` | 약관 묶음은 `apps/mobile/src/organisms/mbr/consent-terms-accordion`의 OGN으로 승격되어 있다. |
| `MembershipNoticeSection(badge, text)` | `Section(terms)` 내부 `SectionItem` 마지막 자식 `Callout(title, children)` | 별도 section으로 분리하면 두꺼운 divider가 Callout 위/아래에 생겨 안내와 입력의 연결성이 깨진다. |
| `MembershipPrimaryActionBar(primaryLabel)` | `AppScreen.ActionBar(preset="primary-cta")` + `SinglePrimaryAction` + `Button` | CTA는 필수 약관 동의 여부에 따라 활성화한다. |

폐기 대상 import:
- `@pxds/pxds-components/shared/global` (`ProgressTopBar`)
- `@/organisms/legacy-mbr` (`MembershipHeroSection`, `MembershipNoticeSection`, `MembershipPrimaryActionBar`, `MembershipTermsSection`)

## Slot Ownership Map

```txt
┌─────────────────────────────────────────┐
│ AppScreen(headerPreset="form-entry")    │
│ pattern: form-entry / consent           │
│ viewport: 393w                          │
├─────────────────────────────────────────┤
│ SystemHeader                            │
│  9:41                              ▮▮▮  │
├─────────────────────────────────────────┤
│ OGN: ogn-mbr-consent-app-bar            │
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
│  OGN: ogn-mbr-consent-hero              │
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
│  회원 가입 1단계 (1/5)                  │
│                                         │
│  약관에 동의하고                        │
│  가입을 시작하세요                      │
│                                         │
│  필수 약관에 동의하면 다음 단계로       │
│  진행할 수 있어요. 선택 약관은 나중에   │
│  변경할 수 있습니다.                   │
│                                         │
│  ━━━━━━━ SectionDivider ━━━━━━━        │
│                                         │
│  OGN: ogn-mbr-consent-terms-section     │
│  role: required-consent                 │
│  layoutStrategy                         │
│   widthTier : content-361               │
│   stack     : section title + organism  │
│               + callout                 │
│   alignment : leading                   │
│   wrapping  : terms title max 2 lines   │
│ vocabularyDecision                      │
│  reuse: PageStackContents + TitleSection│
│         + SectionItem + Callout         │
│  new: ConsentTermsAccordion             │
│                                         │
│  약관 동의                              │
│  ┌───────────────────────────────────┐  │
│  │ OGN: ogn-mbr-consent-terms-accordion│ │
│  │ layoutStrategy                    │  │
│  │  stack: all checkbox + accordion  │  │
│  │  selection: required/optional     │  │
│  │  overflow: accordion body expands │  │
│  │ vocabularyDecision                │  │
│  │  reuse: Checkbox + AccordionList  │  │
│  │                                   │  │
│  │ □ 전체 동의 (필수·선택 약관 모두) │  │
│  │                                   │  │
│  │ ▸ □ [필수] T 우주 서비스 이용약관 │  │
│  │ ▸ □ [필수] 개인정보 수집·이용 동의│  │
│  │ ▸ □ [선택] 혜택·이벤트 정보 수신  │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 법정대리인 동의 안내              │  │
│  │ 만 14세 미만 고객은 법정대리인    │  │
│  │ 동의 요청이 함께 진행됩니다.      │  │
│  └───────────────────────────────────┘  │
├─────────────────────────────────────────┤
│ ActionBar(preset="primary-cta")         │
│ OGN: ogn-mbr-consent-actions            │
│ layoutStrategy                          │
│  widthTier : content-361                │
│  stack     : single full-width button   │
│  wrapping  : button label max 1 line    │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 동의하고 계속하기                 │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Content Flow

```txt
AppScreen
  SystemHeader
    StatusBar
  Header
    OGN: ogn-mbr-consent-app-bar
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
    OGN: ogn-mbr-consent-hero
      role: intro
      pattern: form-entry
      layoutStrategy:
        widthTier: content-361
        stack: vertical
        alignment: leading
        typography: step caption -> display title -> body
        wrapping: title max 2 lines, body max 3 lines
      vocabularyDecision:
        reuse: PageStackContents + TitleMain
      content:
        titleSubText: "회원 가입 1단계 (1/5)"
        title: "약관에 동의하고\n가입을 시작하세요"
        subTitle: "필수 약관에 동의하면 다음 단계로 진행할 수 있어요. 선택 약관은 나중에 변경할 수 있습니다."

    SectionDivider(thickness="section")

    OGN: ogn-mbr-consent-terms-section
      role: required-consent
      pattern: form-entry
      layoutStrategy:
        widthTier: content-361
        stack: section title + consent organism + callout
        alignment: leading
        typography: section title -> checkbox rows -> callout title/body
        wrapping: accordion title max 2 lines; callout body max 2 lines preferred
      vocabularyDecision:
        reuse: PageStackContents + TitleSection + SectionItem + Callout
        new: ConsentTermsAccordion as domain OGN
      content:
        sectionTitle: "약관 동의"
        calloutTitle: "법정대리인 동의 안내"
        calloutBody: "만 14세 미만 고객은 법정대리인 동의 요청이 함께 진행됩니다."

      OGN: ogn-mbr-consent-terms-accordion
        role: consent-control-group
        source: apps/mobile/src/organisms/mbr/consent-terms-accordion/ConsentTermsAccordion.tsx
        layoutStrategy:
          widthTier: inherited content-361
          stack: FieldStack(all checkbox + AccordionList)
          alignment: checkbox leading + accordion title leading
          selection: required/optional checkbox state
          overflow: accordion content expands inside scroll content
        vocabularyDecision:
          reuse: Checkbox + AccordionList + Text
          new: OGN wrapper because terms state/copy is domain-specific
        content:
          allLabel: "전체 동의 (필수·선택 약관 모두)"
          items:
            - id: "service"; required: true; title: "[필수] T 우주 서비스 이용약관 (v3.2)"; caption: "회원 가입 및 서비스 이용을 위한 기본 약관입니다."
            - id: "privacy"; required: true; title: "[필수] 개인정보 수집·이용 동의 (v5.1)"; caption: "이름, 연락처 등 회원 식별·운영에 필요한 정보를 수집합니다."
            - id: "marketing"; required: false; title: "[선택] 혜택·이벤트 정보 수신 동의"; caption: "동의하지 않아도 가입할 수 있어요."
  ActionBar
    OGN: ogn-mbr-consent-actions
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
        - primary: "동의하고 계속하기"
```

## Layout Distortion Gate

- `AppScreen.Content`가 유일한 scroll owner여야 하며 CTA는 `AppScreen.ActionBar` 안에만 둔다.
- Header는 progress bar를 되살리지 않는다. 단계 정보는 `TitleMain.titleSubText`의 텍스트로만 유지한다.
- 법정대리인 `Callout`은 terms section 내부에 둔다. 별도 section으로 분리해 divider를 추가하면 안내가 약관 동의와 과도하게 분절된다.
- `ConsentTermsAccordion`은 `apps/mobile/src/organisms/mbr/` 아래 OGN이므로 route에서 약관 rows를 직접 반복하지 않는다.
- Accordion title이 361px 폭에서 2줄을 넘어가거나 checkbox와 충돌하면 title copy 또는 AccordionList contract를 조정한다. route-level raw padding/width 보정은 금지한다.
- Accordion content는 scroll content 안에서 확장되어야 하며 ActionBar에 가려지면 안 된다.
- 약관 전문 placeholder를 실제 약관처럼 보이게 장식하지 않는다. sourceRef가 없으면 placeholder 상태를 명시한다.
- Deprecated `@pxds/pxds-components`, `@pxds/pxds-icons`, `@/organisms/legacy-mbr` import는 금지한다.

## Section Specs

| section | title | primary components | policy |
| --- | --- | --- | --- |
| `intro` | `약관에 동의하고 가입을 시작하세요` | `PageStackContents`, `TitleMain` | POL-MBR-CONSENT-INTRO (TBD) |
| `terms` | `약관 동의` | `PageStackContents`, `TitleSection`, `SectionItem`, `ConsentTermsAccordion`, `Callout` | POL-MBR-CONSENT-TERMS (TBD) + POL-MBR-MINOR-CONSENT (TBD) — 필수/선택 약관 분류, 마케팅 동의는 선택. 법정대리인 안내 Callout 포함 |

## Action Contract

| element | label | variant | role | policy |
| --- | --- | --- | --- | --- |
| Primary CTA | `동의하고 계속하기` | `primary` | 필수 약관 동의 후 다음 가입 단계 진입 | POL-MBR-CONSENT-TERMS — 필수 약관 미동의 시 진행 불가 |

- CTA 기본 상태는 `disabled`.
- `service`, `privacy` 필수 약관이 모두 checked일 때 활성화한다.
- `marketing` 선택 약관은 CTA 활성 조건에 포함하지 않는다.

## State Rules

- `checkedById: Record<string, boolean>` — `service`, `privacy`, `marketing` 체크 상태를 보유한다.
- `allChecked = CONSENT_ITEM_IDS.every((id) => checkedById[id])`.
- `requiredSatisfied = REQUIRED_CONSENT_IDS.every((id) => checkedById[id])`.
- CTA `disabled = !requiredSatisfied`.
- "전체 동의" Checkbox 체크 시 3개 약관을 모두 true로, 해제 시 모두 false로 set한다.
- 개별 약관 checkbox 변경은 `checkedById[id]`만 갱신한다.

## Implementation Contract

- Use `@pxds/cx-components` for `AppBar`, `Button`, `Callout`, `StatusBar`, `TitleMain`, `TitleSection`.
- Use `ConsentTermsAccordion`, `CONSENT_ITEM_IDS`, `REQUIRED_CONSENT_IDS` from `@/organisms/mbr`.
- `ConsentTermsAccordion` internally uses `Checkbox`, `AccordionList`, `Text` from `@pxds/cx-components` and `FieldStack` from `@pxds/pxds-layout/components/compositions`.
- Use `@pxds/pxds-layout/components` for `AppScreen`, `PageStackContents`, `SectionDivider`, `SinglePrimaryAction`.
- Do NOT import `@pxds/pxds-components/*` (deprecated legacy) or `@pxds/pxds-icons` (deprecated legacy).
- Do NOT reuse `@/organisms/legacy-mbr/*`.
- 본 화면은 가입 흐름의 첫 진입 화면이므로 `Section(intro) → TitleMain`을 유지한다.
- Progress 정보(1/5, 20%)는 시각 progress 컴포넌트로 표현하지 않고 `TitleMain.titleSubText`에 자연어로 흡수한다.
- Section 사이는 `SectionDivider(thickness="section")` 외 다른 wrapper로 구분하지 않는다.

## Open Questions

1. **약관 본문 콘텐츠 출처** — `ConsentTermsAccordion`의 `bodyPlaceholder`는 실제 약관 전문이 아니다. policy-core 또는 별도 약관 sourceRef에서 v3.2/v5.1 전문을 연결해야 한다.
2. **Accordion checkbox hit area** — `AccordionList.leftText`에 `Checkbox`를 넣는 구조가 row expand click과 checkbox click 이벤트를 충돌시키지 않는지 확인 필요.
3. **법정대리인 동의 flow trigger** — 본 변환은 Callout 안내까지만 보존한다. 실제 만 14세 미만 식별 후 별도 화면/trigger 진입은 별도 트랙이다.
4. **전체 동의 해제 semantics** — 현재 전체 동의 해제 시 선택 약관뿐 아니라 필수 약관도 모두 해제한다. 정책상 허용되는지 확인 필요.
5. **policy ref 채번** — legacy 화면이 정책 ref를 들고 있지 않다. POL-MBR-CONSENT-* ID 부여는 별도 트랙이다.
