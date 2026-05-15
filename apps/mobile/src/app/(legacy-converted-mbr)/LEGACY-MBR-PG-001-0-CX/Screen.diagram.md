# LEGACY-MBR-PG-001-0 — 본인인증 수단 선택 (CX 전환)

## Screen Contract

- legacy source: `apps/mobile/src/app/(legacy-mbr)/LEGACY-MBR-PG-001-0/Screen.tsx`
- target route: `/LEGACY-MBR-PG-001-0-CX`
- group: `legacy-converted-mbr`
- domain: `mbr`
- pattern: `form-entry` → 선택형 (DESIGN_PATTERNS.md Pattern A `상세_정보 입력` / 인증 수단 single-select)
- 단계: 회원 가입 3/5 (legacy `ProgressTopBar.percent=60`)
- required design docs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`
- design SOT (참고): `apps/mobile/src/app/(legacy-converted-mbr)/LEGACY-MBR-PG-007-0-CX/Screen.diagram.md`, `apps/mobile/src/app/(cx)/CX-EXAMPLE-PERSONAL-INFO-INPUT/Screen.diagram.md`

## Conversion Intent (Legacy → CX)

| Legacy 어휘 | CX 대체 | 비고 |
| --- | --- | --- |
| `ProgressTopBar(title, leading, progress)` | `AppBar(title, showLeftItem, showTitle)` | 단계(3/5) 표기를 시각 progress 컴포넌트로 표현하지 않고 AppBar title 또는 첫 TitleSection title에서 자연어로만 보존하거나 생략. legacy progress %는 본 다이어그램에서 표현하지 않음 — Figma SOT 일치 |
| MembershipHeroSection(titleLines, description) | 별도 section 미생성. legacy hero 카피("본인 확인을 위해\n인증 수단을 선택해주세요" + description)는 첫 TitleSection title로 단순화 흡수("인증 수단 선택")하고, 상세 카피는 organism 단계에서 정책 카피 가이드에 맞춰 결정. Figma SOT는 form-entry 화면에 별도 hero를 두지 않음 |
| `MembershipSelectableSection(name, value, items)` | `Section(method)` → `PageStackContents(title=TitleSection("인증 수단 선택"))` + `SectionItem` + `ListSelected (radio variant via data-figma-property-type)` 4개 | DESIGN_PATTERNS 선택형 권장 어휘. 각 항목은 단일 선택 (radio), `subText`에 보조 설명, `rightItem`으로 "추천" 뱃지 |
| `MembershipNoticeSection(badge, text)` | `Section(method)` SectionItem 마지막 자식의 `Callout(title, children)` | DESIGN_PATTERNS Pattern A의 안내 어휘. Figma SOT 기준 별도 PageStackContents 분리 없이 method section 내부에 흡수 |
| `MembershipPrimaryActionBar(primaryLabel)` | `AppScreen.ActionBar(preset="primary-cta")` + `SinglePrimaryAction` + `Button` | CX 표준 CTA 어휘와 1:1 |

폐기 대상 import:
- `@pxds/pxds-components/shared/global` (ProgressTopBar)
- `@/organisms/legacy-mbr` (`MembershipHeroSection`, `MembershipSelectableSection`, `MembershipNoticeSection`, `MembershipPrimaryActionBar`)

## Slot Ownership Map

```txt
┌─ AppScreen(headerPreset="form-entry") ────────────────────────────┐
│ [SystemHeader]                                                    │
│   StatusBar                                                       │
├───────────────────────────────────────────────────────────────────┤
│ [Header]                                                          │
│   AppBar(title="본인인증", showLeftItem, showTitle)                │
├───────────────────────────────────────────────────────────────────┤
│ [Content: scroll owner]                                           │
│   Section(method)                                                 │
├───────────────────────────────────────────────────────────────────┤
│ [ActionBar: primary screen action]                                │
│   SinglePrimaryAction                                             │
│     Button(text="인증하기", fullWidth,                             │
│            size="xlarge", variant="primary")                      │
└───────────────────────────────────────────────────────────────────┘
```

## Content Flow

```txt
[Content: scroll owner]

Section(method)
└─ PageStackContents(title=TitleSection(title="인증 수단 선택"))
   └─ SectionItem
      ├─ ListSelected(
      │    data-figma-property-type="radio",
      │    label="카카오톡",
      │    subText="가장 빠르고 간편하게 인증할 수 있어요",
      │    showSubText,
      │    checked={selected === "kakao"},
      │    rightItem={{ type: "button-xsmall-solid", label: "추천" }},
      │    showListSelectedRightItem,
      │    onChange={() => setSelected("kakao")}
      │  )
      ├─ ListSelected(
      │    data-figma-property-type="radio",
      │    label="통신사 PASS",
      │    subText="통신 3사 명의 휴대전화로 인증",
      │    showSubText,
      │    checked={selected === "pass"},
      │    onChange={() => setSelected("pass")}
      │  )
      ├─ ListSelected(
      │    data-figma-property-type="radio",
      │    label="휴대전화 문자",
      │    subText="문자로 받은 인증번호 입력",
      │    showSubText,
      │    checked={selected === "sms"},
      │    onChange={() => setSelected("sms")}
      │  )
      ├─ ListSelected(
      │    data-figma-property-type="radio",
      │    label="아이핀(IPIN)",
      │    subText="주민번호 대체 인증 수단",
      │    showSubText,
      │    checked={selected === "ipin"},
      │    onChange={() => setSelected("ipin")}
      │  )
      └─ Callout(title="인증 정책 안내", children="인증 5회 연속 실패 시 30분간 인증이 제한돼요. 인증기관 별 추가 약관에 동의가 필요할 수 있어요.")
```

## Section Specs

| section | title | primary components | policy |
| --- | --- | --- | --- |
| `method` | `인증 수단 선택` | `PageStackContents`, `TitleSection`, `SectionItem`, `ListSelected`, `Callout` | POL-MBR-AUTH-METHOD (TBD) — kakao/pass/sms/ipin 4종 single-select, kakao 추천. 정책 안내 Callout이 method SectionItem 내부에 마지막 자식으로 배치됨 (POL-MBR-AUTH-LIMIT TBD — 5회 실패 시 30분 제한, 인증기관 추가 약관 가능) |

## Action Contract

| element | label | state | policy |
| --- | --- | --- | --- |
| Primary CTA | `인증하기` | `selected` 값이 존재하면 `primary` 활성, 없으면 `disabled` | POL-MBR-AUTH-METHOD — 인증 수단 미선택 시 진행 불가 |

State 기본값으로 legacy와 동일하게 `kakao`가 미리 선택되어 있다면 CTA는 초기부터 활성.

## State Rules

- `selected: "kakao" | "pass" | "sms" | "ipin"` — single source of truth. 각 `ListSelected.checked`는 `selected` 비교로 파생.
- `ListSelected.onChange`는 해당 id로 `selected` 갱신. radio 그룹이므로 동시에 둘 이상 체크되지 않는다.
- legacy 화면이 `value="kakao"`로 초기값을 들고 오는 것을 그대로 보존 (추천 항목 기본 선택).
- `rightItem`("추천" 뱃지)은 시각 hint이며 선택 상태와 무관.
- 인증 실패 누적·외부 인증 flow 결과는 본 화면 범위 밖.

## Implementation Contract

- Use `@pxds/cx-components` for `AppBar`, `Button`, `Callout`, `ListSelected`, `SectionItem`, `StatusBar`, `TitleMain`, `TitleSection`.
- Use `@pxds/pxds-layout/components` for `AppScreen`, `PageStackContents`, `SectionDivider`, `SinglePrimaryAction`.
- Do NOT import `@pxds/pxds-components/*` (deprecated legacy) and `@pxds/pxds-icons` (deprecated legacy).
- Do NOT reuse `@/organisms/legacy-mbr/*`. 신규 organism은 `@/organisms/mbr/`에 CX 어휘로 신설하거나, 본 화면이 단순 조립으로 충분하면 Screen.tsx에서 직접 조립한다 (CX-EXAMPLE 방식과 동일).
- Progress 정보(3/5, 60%)는 시각 progress 컴포넌트로 표현하지 않고 `TitleMain.titleSubText`(eyebrow)로 흡수한다.
- `AppScreen.Content`가 유일한 scroll owner.
- CTA는 반드시 `AppScreen.ActionBar` 안에 둔다. 본문 마지막 section에 두지 않는다.
- Section 사이는 `SectionDivider(thickness="section")` 외 다른 wrapper로 구분하지 않는다.
- `ListSelected` 4개는 같은 `SectionItem` 안에 형제로 배치한다. 별도 `FieldStack`이나 inline margin으로 간격을 보정하지 않는다.
- Form-entry 화면은 Figma SOT(`detail-information` node)를 따라 별도 hero/intro section을 두지 않는다. AppBar → 첫 PageStackContents(TitleSection) 순으로 시작한다.
- 단일 의미 단위로 묶이는 Callout(안내/정책)은 관련 PageStackContents의 SectionItem 마지막 자식으로 배치한다. 의미가 별개일 때만 독립 PageStackContents로 분리한다.

## Open Questions

1. **policy ref 채번** — 인증 수단 선택, 인증 실패 제한 정책의 ID가 policy-core에 부여되어 있지 않다. 본 다이어그램에서는 TBD로 표기하고 별도 트랙에서 부여.
2. **외부 인증 flow trigger** — "인증하기" CTA가 호출하는 외부 인증 모듈(카카오 인증, PASS, SMS, IPIN) 연결은 본 변환 범위 밖. 본 화면은 선택 + CTA 활성/비활성까지만 책임진다.
3. **카피 원문** — "추천" 뱃지 문구, 각 수단 보조 설명, Callout 본문은 legacy 원문을 그대로 옮겼다. policy-core에서 정식 카피가 확정되면 교체. 현 단계는 placeholder로 간주.
