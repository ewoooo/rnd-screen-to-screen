# LEGACY-MBR-PG-005-0 — 탈퇴 사유 (CX 전환)

## Screen Contract

- legacy source: `apps/mobile/src/app/(legacy-mbr)/LEGACY-MBR-PG-005-0/Screen.tsx`
- target route: `/LEGACY-MBR-PG-005-0-CX`
- group: `legacy-converted-mbr`
- domain: `mbr`
- pattern: `form-entry` → 선택형 ListSelected 다중 + 자유 의견 TextField 입력 혼합 (DESIGN_PATTERNS.md `상세_정보 입력`). 탈퇴 흐름의 **첫 입력 화면**이므로 hero(TitleMain) + 단계 안내를 유지한다.
- 단계: 회원 탈퇴 2/6 (legacy `ProgressTopBar.percent=33.33`)

## Pattern Decision

- Figma SOT(`detail-information`)는 흐름 *중간* form-entry 화면 4종을 보여주며 hero/intro를 두지 않는다.
- 본 화면은 **탈퇴 흐름의 첫 입력 화면**(사용자에게 사유를 처음 묻는 자리)이므로 (1) 환영/유도 hero, (2) 진행 단계 안내가 사용자 경험에 필수다. 따라서 SOT의 *흐름 중간* 패턴을 그대로 따르지 않고 **`Section(intro) → TitleMain`을 유지**한다. SOT 예시 범위 밖의 *첫 입력* 케이스에 대한 결정.
- required design docs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`
- design SOT (참고): `apps/mobile/src/app/(legacy-converted-mbr)/LEGACY-MBR-PG-007-0-CX/Screen.diagram.md`, `apps/mobile/src/app/(cx)/CX-EXAMPLE-PERSONAL-INFO-INPUT/Screen.diagram.md`

## Conversion Intent (Legacy → CX)

| Legacy 어휘 | CX 대체 | 비고 |
| --- | --- | --- |
| `ProgressTopBar(title="탈퇴 사유", leading="back", progress={label:"회원 탈퇴 2/6"})` | `AppBar(title="탈퇴 사유", showLeftItem, showTitle)` + 단계 정보를 `TitleMain.titleSubText`(eyebrow)에 흡수 | CX `AppBar`에는 progress slot이 없음. `titleSubText`는 제목 상단의 eyebrow/메타 라벨 slot이라 단계 정보(2/6)와 의미 정합 |
| `MembershipHeroSection(titleLines, description)` | `Section(intro)` → `PageStackContents(title=TitleMain)` | 탈퇴 흐름 첫 입력 화면 hero. legacy titleLines는 `title`로(`\n` 보존), description은 `subTitle`로 분리 |
| `MembershipSelectableSection(selectionMode="multi", items=6)` | `Section(reasons)` → `PageStackContents(title=TitleSection)` + `SectionItem` + `FieldStack` → `ListSelected (checkbox variant via data-figma-property-type)` × 6 | `ListSelected`는 행 단위 컴포넌트. 다중 선택은 행마다 `data-figma-property-type="checkbox"` + `checked`/`onChange`로 표현하고 선택 집합은 screen-level state가 보유 |
| `MembershipFormSection(fields=[{free-text, helperText:"0/500자"}])` | `Section(freeText)` → `PageStackContents(title=TitleSection)` + `SectionItem` → `TextField(label, placeholder, helperText, maxLength=500)` | CX `TextField`는 단행 input. multiline/textarea를 지원하지 않음. Open Question에 명시 |
| `MembershipPrimaryActionBar(primaryLabel="다음", disabled)` | `AppScreen.ActionBar(preset="primary-cta")` + `SinglePrimaryAction` + `Button(disabled until ≥1 reason)` | CX 표준 CTA 어휘 |

폐기 대상 import:
- `@pxds/pxds-components/shared/global` (`ProgressTopBar`)
- `@/organisms/legacy-mbr` (`MembershipHeroSection`, `MembershipSelectableSection`, `MembershipFormSection`, `MembershipPrimaryActionBar`)

## Slot Ownership Map

```txt
┌─ AppScreen(headerPreset="form-entry") ────────────────────────────┐
│ [SystemHeader]                                                    │
│   StatusBar                                                       │
├───────────────────────────────────────────────────────────────────┤
│ [Header]                                                          │
│   AppBar(title="탈퇴 사유", showLeftItem, showTitle)               │
├───────────────────────────────────────────────────────────────────┤
│ [Content: scroll owner]                                           │
│   Section(intro)                                                  │
│   SectionDivider(thickness="section")                             │
│   Section(reasons)                                                │
│   SectionDivider(thickness="section")                             │
│   Section(freeText)                                               │
├───────────────────────────────────────────────────────────────────┤
│ [ActionBar: primary screen action]                                │
│   SinglePrimaryAction                                             │
│     Button(text="다음", fullWidth,                                 │
│            size="xlarge", variant="primary",                      │
│            disabled={selectedReasons.length === 0})               │
└───────────────────────────────────────────────────────────────────┘
```

## Content Flow

```txt
[Content: scroll owner]

Section(intro)
└─ PageStackContents(
     title=TitleMain(
       titleSubText="회원 탈퇴 2/6",
       title="탈퇴하시는 이유가\n무엇인가요?",
       subTitle="더 나은 서비스를 위해 알려주세요. (1개 이상 선택)"
     )
   )

SectionDivider(thickness="section")

Section(reasons)
└─ PageStackContents(title=TitleSection(title="탈퇴 사유"))
   └─ SectionItem
      └─ FieldStack
         ├─ ListSelected(
         │    data-figma-property-type="checkbox",
         │    label="가격이 부담돼요",
         │    checked={selected.has("price")},
         │    showListSelectedRightItem={false},
         │    showSubText={false},
         │    onChange={(c) => toggle("price", c)}
         │  )
         ├─ ListSelected(
         │    data-figma-property-type="checkbox",
         │    label="이용 빈도가 낮아요",
         │    checked={selected.has("rare-use")},
         │    showListSelectedRightItem={false},
         │    showSubText={false},
         │    onChange={(c) => toggle("rare-use", c)}
         │  )
         ├─ ListSelected(
         │    data-figma-property-type="checkbox",
         │    label="다른 서비스로 옮겨요",
         │    checked={selected.has("alt-service")},
         │    showListSelectedRightItem={false},
         │    showSubText={false},
         │    onChange={(c) => toggle("alt-service", c)}
         │  )
         ├─ ListSelected(
         │    data-figma-property-type="checkbox",
         │    label="사용이 불편해요",
         │    checked={selected.has("ux")},
         │    showListSelectedRightItem={false},
         │    showSubText={false},
         │    onChange={(c) => toggle("ux", c)}
         │  )
         ├─ ListSelected(
         │    data-figma-property-type="checkbox",
         │    label="오류·결제 문제가 있었어요",
         │    checked={selected.has("error")},
         │    showListSelectedRightItem={false},
         │    showSubText={false},
         │    onChange={(c) => toggle("error", c)}
         │  )
         └─ ListSelected(
              data-figma-property-type="checkbox",
              label="기타 (직접 입력)",
              checked={selected.has("etc")},
              showListSelectedRightItem={false},
              showSubText={false},
              onChange={(c) => toggle("etc", c)}
            )

SectionDivider(thickness="section")

Section(freeText)
└─ PageStackContents(title=TitleSection(title="자유 의견 (선택)"))
   └─ SectionItem
      └─ TextField(
           label="자유 의견 (선택)",
           placeholder="더 자세한 의견이 있다면 알려주세요. (최대 500자)",
           helperText="0/500자",      // 입력에 따라 "{n}/500자"로 갱신
           maxLength=500,
           value={freeText},
           onChange={(e) => setFreeText(e.target.value)},
           state={freeText.length > 0 ? "typed" : "default"}
         )
```

## Section Specs

| section | title | primary components | policy |
| --- | --- | --- | --- |
| `intro` | `탈퇴하시는 이유가 무엇인가요?` | `PageStackContents`, `TitleMain` | POL-MBR-WITHDRAW-REASON-INTRO (TBD) |
| `reasons` | `탈퇴 사유` | `PageStackContents`, `TitleSection`, `SectionItem`, `FieldStack`, `ListSelected` | TBD — 다중 선택, 최소 1개 |
| `freeText` | `자유 의견 (선택)` | `PageStackContents`, `TitleSection`, `SectionItem`, `TextField` | TBD — 자유 의견 최대 500자 |

## Action Contract

| element | label | state | policy |
| --- | --- | --- | --- |
| Primary CTA | `다음` | `disabled` 기본 — 사유 ≥ 1개 선택 시 `primary` 활성 | TBD — 사유 미선택 시 진행 불가 |

## State Rules

- `selected: Set<string>` — 6개 사유 ID 중 선택된 집합. ListSelected `onChange`가 토글.
- `freeText: string` — TextField value. `maxLength=500`으로 입력 자체에서 상한 보장.
- `helperText`는 `${freeText.length}/500자` 형태로 동적 표기 (초기값 `"0/500자"`).
- CTA `disabled = selected.size === 0`. 자유 의견은 선택이므로 CTA 활성 조건에 포함하지 않는다.
- "기타 (직접 입력)" 선택 시 자유 의견 필수 여부는 본 변환 범위 밖 (정책 확정 시 분리). 현 단계는 단순 선택 토글로만 표현.

## Implementation Contract

- Use `@pxds/cx-components` for `AppBar`, `Button`, `ListSelected`, `SectionItem`, `StatusBar`, `TextField`, `TitleMain`, `TitleSection`.
- Use `@pxds/pxds-layout/components` for `AppScreen`, `FieldStack`, `PageStackContents`, `SectionDivider`, `SinglePrimaryAction`.
- Do NOT import `@pxds/pxds-components/*` (deprecated legacy) or `@pxds/pxds-icons` (deprecated legacy).
- Do NOT reuse `@/organisms/legacy-mbr/*`. 본 화면은 단순 조립으로 충분하므로 Screen.tsx에서 직접 조립한다 (CX-EXAMPLE / LEGACY-MBR-PG-007-0-CX와 동일 방식).
- 본 화면은 탈퇴 흐름의 **첫 입력 화면**이므로 `Section(intro) → TitleMain` 을 유지한다. Figma SOT(`detail-information`)는 흐름 중간 화면만 다루므로 본 화면에는 적용하지 않는다.
- Progress 정보(2/6, 33.33%)는 시각 progress 컴포넌트로 표현하지 않고 `TitleMain.titleSubText`(eyebrow)에 자연어로 흡수한다.
- `AppScreen.Content`가 유일한 scroll owner.
- CTA는 반드시 `AppScreen.ActionBar` 안에 둔다. 본문 마지막 section에 두지 않는다.
- Section 사이는 `SectionDivider(thickness="section")` 외 다른 wrapper로 구분하지 않는다.
- `ListSelected`는 행 단위 컴포넌트이며 그룹 multi-select 의미는 screen-level state가 보유한다. 행별 `data-figma-property-type="checkbox"` + `checked` + `onChange`로 다중 선택을 표현하고, `showListSelectedRightItem={false}` / `showSubText={false}`로 우측 영역과 sub text slot을 닫는다.

## Open Questions

1. **TextField multiline 부재** — CX `TextField`는 단행 `<input>` 기반으로 multiline/textarea를 지원하지 않는다. Legacy의 "자유 의견 (최대 500자)"은 시각상 multi-line 영역이 자연스러우나, 현 변환에서는 단행 TextField + `maxLength=500`로 둔다. 장문 입력 UX가 요구되면 `@pxds/cx-components`에 multiline TextField variant 또는 신규 TextArea 어휘를 보강해야 한다 (system 깨짐 신호로 기록).
2. **사유 코드 정합** — 6개 사유 ID(`price`, `rare-use`, `alt-service`, `ux`, `error`, `etc`)는 legacy 화면 내부 값으로, policy-core 사유 코드 체계와의 매핑은 별도 트랙.
3. **다음 단계 trigger** — "다음" CTA가 어디로 분기되는지(탈퇴 확인/검증 단계) 본 변환 범위 밖. 정책 ref 채번과 함께 확정.
4. **policy ref 채번** — 현재 legacy 화면이 정책 ref를 들고 있지 않음. 다이어그램에는 TBD로 표기.
5. **Local_Sheet 도입 검토** — 탈퇴 흐름 전반에서 "탈퇴 대상 회원 컨텍스트(ID, 가입일 등)" 393×~88px Local_Sheet 고정 표시 검토 필요. Figma SOT '상세_정보 체크' 패턴에서 사용. 본 다이어그램은 미도입.
