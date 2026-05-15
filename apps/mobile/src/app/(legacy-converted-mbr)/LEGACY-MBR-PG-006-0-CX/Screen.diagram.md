# LEGACY-MBR-PG-006-0 — 회원 가입 기본 정보 입력 (CX 전환)

## Screen Contract

- legacy source: `apps/mobile/src/app/(legacy-mbr)/LEGACY-MBR-PG-006-0/Screen.tsx`
- target route: `/LEGACY-MBR-PG-006-0-CX`
- group: `legacy-converted-mbr`
- domain: `mbr`
- pattern: `form-entry` → 입력형 (DESIGN_PATTERNS.md `상세_정보 입력` — TextField + 단일 선택 혼합)
- 단계: 회원 가입 2/5 (legacy `ProgressTopBar.percent=40`)
- required design docs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`
- design SOT (참고): `apps/mobile/src/app/(cx)/CX-EXAMPLE-PERSONAL-INFO-INPUT/Screen.diagram.md`

## Conversion Intent (Legacy → CX)

| Legacy 어휘 | CX 대체 | 비고 |
| --- | --- | --- |
| `ProgressTopBar(title, leading, progress)` | `AppBar(title, showLeftItem, showTitle)` | CX `AppBar`는 progress slot이 없음. 단계(2/5, 40%) 시각 표현은 form-entry 화면에서 제거하고, 필요 시 AppBar title 또는 첫 TitleSection title의 자연어로 흡수하거나 생략 |
| `MembershipHeroSection(titleLines, description)` | 별도 hero section 미생성 | legacy hero ("기본 정보를\n입력해주세요" + description) 의미는 첫 TitleSection title("기본 정보")로 흡수하고 상세 카피는 organism 단계에서 결정. Figma SOT는 form-entry 화면에 hero를 두지 않음 |
| `MembershipFormSection(fields[])` | `Section(profile)` → `PageStackContents(title=TitleSection("기본 정보"))` + `SectionItem` + `FieldStack` + `TextField` × 3 | CX-EXAMPLE `address` 섹션과 동일 패턴. helperText는 TextField helper slot |
| `MembershipSelectableSection(name, items[])` | `Section(gender)` → `PageStackContents(title=TitleSection("성별"))` + `SectionItem` + `ListSelected`(type="radio") × 3 | 행 수 적고 단일 선택 — ListSelected의 radio 어휘 사용 |
| `MembershipPrimaryActionBar(primaryLabel, disabled)` | `AppScreen.ActionBar` + `SinglePrimaryAction` + `Button(disabled until valid)` | CX 표준 CTA 어휘 |

폐기 대상 import:
- `@pxds/pxds-components/shared/global` (ProgressTopBar)
- `@/organisms/legacy-mbr` (`MembershipHeroSection`, `MembershipFormSection`, `MembershipSelectableSection`, `MembershipPrimaryActionBar`)

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
│   Section(profile)                                                │
│   SectionDivider(thickness="section")                             │
│   Section(gender)                                                 │
├───────────────────────────────────────────────────────────────────┤
│ [ActionBar: primary screen action]                                │
│   SinglePrimaryAction                                             │
│     Button(text="다음으로", fullWidth,                              │
│            size="xlarge", variant="primary",                      │
│            disabled until form valid)                             │
└───────────────────────────────────────────────────────────────────┘
```

## Content Flow

```txt
[Content: scroll owner]

Section(profile)
└─ PageStackContents(title=TitleSection(title="기본 정보"))
   └─ SectionItem
      └─ FieldStack
         ├─ TextField(
         │    label="이름",
         │    placeholder="실명을 입력해주세요",
         │    value={name},
         │    onChange,
         │    required
         │  )
         ├─ TextField(
         │    label="생년월일",
         │    placeholder="YYYYMMDD",
         │    helperText="예: 19900101 (8자리 숫자)",
         │    value={birth},
         │    inputMode="numeric",
         │    maxLength=8,
         │    onChange,
         │    required
         │  )
         └─ TextField(
              label="휴대전화",
              placeholder="010-1234-5678",
              helperText="본인인증과 알림 발송에 사용해요",
              value={phone},
              inputMode="tel",
              onChange,
              required
            )

SectionDivider(thickness="section")

Section(gender)
└─ PageStackContents(title=TitleSection(title="성별"))
   └─ SectionItem
      └─ FieldStack
         ├─ ListSelected(
         │    data-figma-property-type="radio",
         │    label="남성",
         │    checked={gender === "male"},
         │    onChange={() => setGender("male")}
         │  )
         ├─ ListSelected(
         │    data-figma-property-type="radio",
         │    label="여성",
         │    checked={gender === "female"},
         │    onChange={() => setGender("female")}
         │  )
         └─ ListSelected(
              data-figma-property-type="radio",
              label="선택 안 함",
              checked={gender === "none"},
              onChange={() => setGender("none")}
            )
```

## Section Specs

| section | title | primary components | policy |
| --- | --- | --- | --- |
| `profile` | `기본 정보` | `PageStackContents`, `TitleSection`, `SectionItem`, `FieldStack`, `TextField` | POL-MBR-PROFILE-BASIC (TBD) — 이름/생년월일/휴대전화 필수 |
| `gender` | `성별` | `PageStackContents`, `TitleSection`, `SectionItem`, `FieldStack`, `ListSelected` | POL-MBR-PROFILE-GENDER (TBD) — 단일 선택, "선택 안 함" 옵션 허용 |

## Action Contract

| element | label | state | policy |
| --- | --- | --- | --- |
| Primary CTA | `다음으로` | `disabled` 기본 — 이름/생년월일/휴대전화 모두 입력 + 성별 선택 완료 시 `primary` 활성 | POL-MBR-PROFILE-BASIC, POL-MBR-PROFILE-GENDER — 필수값 누락 시 진행 불가 |

## State Rules

- `name`, `birth`, `phone` 세 값 모두 non-empty 일 때 텍스트 입력 요구 충족.
- `gender ∈ {"male", "female", "none"}` 선택되어 있어야 성별 요구 충족.
- 위 두 조건이 모두 참일 때만 CTA `disabled=false`.
- 성별 그룹은 단일 선택. 한 ListSelected가 `checked=true`가 되면 나머지는 자동으로 `checked=false`로 전환된다 (parent state로 단일 값만 유지).
- 검증 정규식(생년월일 8자리 숫자, 휴대전화 포맷 등)과 정책 ref 채번은 본 변환에서 의도적으로 생략하고 organism/policy-core 단계로 미룬다.

## Implementation Contract

- Use `@pxds/cx-components` for `AppBar`, `Button`, `ListSelected`, `SectionItem`, `StatusBar`, `TextField`, `TitleSection`.
- Use `@pxds/pxds-layout/components` for `AppScreen`, `FieldStack`, `PageStackContents`, `SectionDivider`, `SinglePrimaryAction`.
- Do NOT import `@pxds/pxds-components/*` (deprecated legacy) and `@pxds/pxds-icons` (deprecated legacy).
- Do NOT reuse `@/organisms/legacy-mbr/*`. 화면이 단순 조립이므로 Screen.tsx에서 직접 조립한다 (CX-EXAMPLE 방식과 동일). 재사용 가능한 단위가 식별되면 `@/organisms/mbr/`에 CX 어휘로 신설.
- Progress 정보(2/5, 40%)는 시각 progress bar로 표현하지 않는다. AppBar title이나 첫 TitleSection title의 자연어로 흡수하거나 생략한다.
- `AppScreen.Content`가 유일한 scroll owner.
- CTA는 반드시 `AppScreen.ActionBar` 안에 둔다.
- Section 사이는 `SectionDivider(thickness="section")` 외 다른 wrapper로 구분하지 않는다.
- TextField `helperText`는 TextField helper slot으로 전달하며, FieldStack 바깥에 별도 caption을 두지 않는다.
- Form-entry 화면은 Figma SOT를 따라 별도 hero/intro section을 두지 않는다.

## Open Questions

1. **생년월일 입력 UX** — 8자리 숫자 직접 입력인지, 별도 date picker bottom sheet인지. 본 변환은 legacy 동작(직접 입력)을 유지하되 검증/마스킹은 organism 단계에서 결정.
2. **휴대전화 자동 하이픈** — placeholder는 하이픈 포함이나 실제 입력 시 자동 포맷팅 여부는 정책 미정. TextField onChange에서 처리할지 별도 hook으로 뺄지 후속 결정.
3. **policy ref 채번** — 현 legacy 화면이 정책 ref를 들고 있지 않음. 기본 정보/성별 정책 ID는 policy-core 별도 트랙. 다이어그램에는 TBD로 표기.
