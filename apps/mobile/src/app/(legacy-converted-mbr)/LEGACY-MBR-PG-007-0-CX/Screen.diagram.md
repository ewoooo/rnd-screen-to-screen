# LEGACY-MBR-PG-007-0 — 회원 가입 약관 동의 (CX 전환)

## Screen Contract

- legacy source: `apps/mobile/src/app/(legacy-mbr)/LEGACY-MBR-PG-007-0/Screen.tsx`
- target route: `/LEGACY-MBR-PG-007-0-CX`
- group: `legacy-converted-mbr`
- domain: `mbr`
- pattern: `form-entry` → 동의형 (DESIGN_PATTERNS.md `상세_정보 입력` / 확인·동의형). 가입 흐름의 **첫 진입 화면**이므로 hero(TitleMain) + 단계 안내를 유지한다.
- 단계: 회원 가입 1/5 (legacy `ProgressTopBar.percent=20`)
- required design docs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`
- design SOT (참고): Figma `SKT_GenUI_Test_0512` / `detail-information` (`14243:28433`) — form-entry 패턴 SOT. 단, SOT의 4개 예시는 모두 흐름 *중간 단계*이므로 첫 진입 화면 hero는 본 화면에서 명시적으로 유지함

## Pattern Decision

- Figma SOT(`detail-information`)는 흐름 *중간* form-entry 화면 4종(정보 입력_인풋 / 정보 체크 / 결제 / 카트)을 보여주며, 이들은 hero/intro section을 두지 않는다.
- 본 화면은 **회원가입 흐름의 첫 진입 화면**이므로 (1) 환영/유도 hero, (2) 진행 단계 안내가 사용자 경험에 필수다. 따라서 SOT의 *흐름 중간* 패턴을 그대로 따르지 않고 **`Section(intro) → TitleMain`을 유지**한다. 이는 SOT 위배가 아니라 SOT 예시 범위 밖의 *첫 진입* 케이스에 대한 결정이다.
- Callout 분리 구조(별도 `Section(notice)` + `SectionDivider`)는 시각적으로 Callout 위/아래에 두꺼운 4px 구분선이 끼어 의도와 다른 강한 분절감을 만든다. 법정대리인 안내 Callout은 약관 동의 다음 단계 진입과 직결된 안내이므로 **terms section의 `SectionItem` 마지막 자식**으로 흡수한다.

## Conversion Intent (Legacy → CX)

| Legacy 어휘 | CX 대체 | 비고 |
| --- | --- | --- |
| `ProgressTopBar(title, leading, progress)` | `AppBar(title="회원 가입", showLeftItem, showTitle)` + 단계 정보를 `TitleMain.titleSubText`(eyebrow)에 흡수 | CX `AppBar`에는 progress slot이 없음. `titleSubText`는 제목 상단의 eyebrow/메타 라벨 slot이라 단계 정보(1/5)와 의미 정합 |
| `MembershipHeroSection(titleLines, description)` | `Section(intro)` → `PageStackContents(title=TitleMain)` | 첫 진입 화면 hero. legacy titleLines는 `title`로(`\n` 보존), description은 `subTitle`로 분리 |
| `MembershipTermsSection`(legacy) | `Section(terms)` → `PageStackContents(title=TitleSection("약관 동의"))` + `Checkbox`(전체 동의) + `AccordionList`(개별 약관) | DESIGN_PATTERNS 동의형 권장 어휘 |
| `MembershipNoticeSection(badge, text)` | `Section(terms)` 내부 `SectionItem`의 마지막 자식 `Callout(title, children)` | Callout을 별도 PageStackContents + SectionDivider로 분리하면 두꺼운 4px 구분선이 Callout 위/아래에 끼어 시각적 분절감이 강하다. 약관 동의 다음 단계 진입과 직결된 안내이므로 terms section 안으로 흡수 |
| `MembershipPrimaryActionBar(primaryLabel)` | `AppScreen.ActionBar(preset="primary-cta")` + `SinglePrimaryAction` + `Button` | CX 표준 CTA 어휘 |

폐기 대상 import:
- `@pxds/pxds-components/shared/global` (ProgressTopBar)
- `@/organisms/legacy-mbr` (`MembershipHeroSection`, `MembershipNoticeSection`, `MembershipPrimaryActionBar`, `MembershipTermsSection`)

## Slot Ownership Map

```txt
┌─ AppScreen(headerPreset="form-entry") ────────────────────────────┐
│ [SystemHeader]                                                    │
│   StatusBar                                                       │
├───────────────────────────────────────────────────────────────────┤
│ [Header]                                                          │
│   AppBar(title="회원 가입", showLeftItem, showTitle)               │
├───────────────────────────────────────────────────────────────────┤
│ [Content: scroll owner]                                           │
│   Section(intro)                                                  │
│   SectionDivider(thickness="section")                             │
│   Section(terms)  ← Callout(법정대리인 안내) 포함                  │
├───────────────────────────────────────────────────────────────────┤
│ [ActionBar: primary screen action]                                │
│   SinglePrimaryAction                                             │
│     Button(text="동의하고 계속하기", fullWidth,                     │
│            size="xlarge", variant="primary")                      │
└───────────────────────────────────────────────────────────────────┘
```

## Content Flow

```txt
[Content: scroll owner]

Section(intro)
└─ PageStackContents(
     title=TitleMain(
       titleSubText="회원 가입 1단계 (1/5)",          // eyebrow (제목 상단)
       title="약관에 동의하고\n가입을 시작하세요",
       subTitle="필수 약관에 동의하면 다음 단계로 진행할 수 있어요. 선택 약관은 나중에 변경할 수 있습니다."
     )
   )

SectionDivider(thickness="section")

Section(terms)
└─ PageStackContents(title=TitleSection(title="약관 동의"))
   └─ SectionItem
      ├─ FieldStack
      │   ├─ Checkbox(
      │   │    checked={allChecked},
      │   │    label="전체 동의 (필수·선택 약관 모두)"
      │   │  )
      │   └─ AccordionList(
      │        allowMultiple,
      │        defaultOpenIds=[],
      │        items=[
      │          {
      │            id: "service",
      │            leftText: <Checkbox checked={...} />,   // 필수
      │            title:    "[필수] T 우주 서비스 이용약관 (v3.2)",
      │            content:  <약관 본문 placeholder>
      │          },
      │          {
      │            id: "privacy",
      │            leftText: <Checkbox checked={...} />,   // 필수
      │            title:    "[필수] 개인정보 수집·이용 동의 (v5.1)",
      │            content:  <약관 본문 placeholder>
      │          },
      │          {
      │            id: "marketing",
      │            leftText: <Checkbox checked={...} />,   // 선택
      │            title:    "[선택] 혜택·이벤트 정보 수신 동의",
      │            content:  <약관 본문 placeholder>
      │          }
      │        ]
      │      )
      └─ Callout(
           title="법정대리인 동의 안내",
           children="만 14세 미만 고객은 법정대리인 동의 요청이 함께 진행됩니다."
         )
```

## Section Specs

| section | title | primary components | policy |
| --- | --- | --- | --- |
| `intro` | `약관에 동의하고 가입을 시작하세요` | `PageStackContents`, `TitleMain` | POL-MBR-CONSENT-INTRO (TBD) |
| `terms` | `약관 동의` | `PageStackContents`, `TitleSection`, `SectionItem`, `FieldStack`, `Checkbox`, `AccordionList`, `Callout` | POL-MBR-CONSENT-TERMS (TBD) + POL-MBR-MINOR-CONSENT (TBD) — 필수/선택 약관 분류, 마케팅 동의는 선택. 법정대리인 안내 Callout 포함 |

## Action Contract

| element | label | state | policy |
| --- | --- | --- | --- |
| Primary CTA | `동의하고 계속하기` | `disabled` 기본 — 필수 약관 전체 동의 시 `primary` 활성 | POL-MBR-CONSENT-TERMS — 필수 약관 미동의 시 진행 불가 |

## State Rules

- `allChecked` = 모든 약관 동의 여부에서 파생.
- `requiredUnchecked.length > 0` 일 때 CTA `disabled`.
- 마케팅 약관은 선택이며 미동의 상태에서도 CTA 활성 가능.
- "전체 동의" Checkbox 체크 시 3개 약관 동시 set, 해제 시 모두 unset.

## Implementation Contract

- Use `@pxds/cx-components` for `AppBar`, `Button`, `Callout`, `Checkbox`, `StatusBar`, `TitleMain`, `TitleSection`, `AccordionList`.
- Use `@pxds/pxds-layout/components` for `AppScreen`, `FieldStack`, `PageStackContents`, `SectionDivider`, `SinglePrimaryAction`, `SectionItem`.
- Do NOT import `@pxds/pxds-components/*` (deprecated legacy) and `@pxds/pxds-icons` (deprecated legacy).
- Do NOT reuse `@/organisms/legacy-mbr/*`.
- 본 화면은 가입 흐름의 **첫 진입 화면**이므로 `Section(intro) → TitleMain` 을 유지한다. Figma SOT(`detail-information`)는 흐름 중간 화면만 다루므로 본 화면에는 적용하지 않는다.
- Progress 정보(1/5, 20%)는 시각 컴포넌트로 표현하지 않고 `TitleMain.titleSubText`(eyebrow)에 자연어로 흡수한다. 본문 설명문은 `subTitle`로 분리한다.
- `AppScreen.Content`가 유일한 scroll owner.
- CTA는 반드시 `AppScreen.ActionBar` 안에 둔다.
- Section 사이는 `SectionDivider(thickness="section")` 외 다른 wrapper로 구분하지 않는다.

## Open Questions

1. **약관 본문 콘텐츠 출처** — Accordion `content`에 채울 약관 전문이 어디서 오는가? policy-core에 v3.2/v5.1 텍스트가 있는지 확인 필요. (현 단계는 placeholder)
2. **법정대리인 동의 flow trigger** — 본 변환에서는 Callout 안내까지만 보존. 실제 14세 미만 식별 후 별도 화면/trigger 진입은 별도 트랙.
3. **policy ref 채번** — legacy 화면이 정책 ref를 들고 있지 않음. POL-MBR-CONSENT-* ID 부여는 별도 트랙. 다이어그램에는 TBD.
