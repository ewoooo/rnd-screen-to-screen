# LEGACY-MBR-PG-004-0 — 회원 탈퇴 영향 항목 안내 (CX 전환)

## Screen Contract

- legacy source: `apps/mobile/src/app/(legacy-mbr)/LEGACY-MBR-PG-004-0/Screen.tsx`
- target route: `/LEGACY-MBR-PG-004-0-CX`
- group: `legacy-converted-mbr`
- domain: `mbr`
- pattern: `form-entry` → 확인·동의형 (DESIGN_PATTERNS.md `상세_정보 입력` / ListText 중심 확인형)
- 단계: 회원 탈퇴 3/6 (legacy `ProgressTopBar.percent=50`)
- required design docs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`
- design SOT (참고): `apps/mobile/src/app/(legacy-converted-mbr)/LEGACY-MBR-PG-007-0-CX/Screen.diagram.md`, `apps/mobile/src/app/(cx)/CX-EXAMPLE-PERSONAL-INFO-INPUT/Screen.diagram.md`

## Conversion Intent (Legacy → CX)

| Legacy 어휘 | CX 대체 | 비고 |
| --- | --- | --- |
| `ProgressTopBar(title, leading="back", progress={label:"회원 탈퇴 3/6", percent:50})` | `AppBar(title="회원 탈퇴", showLeftItem, showTitle)` | CX `AppBar`에는 progress slot이 없음. 단계(3/6, 50%) 시각 표현은 제거하며, AppBar title 또는 TitleSection으로 흡수가 어려우면 생략한다. 완료 화면이 아니므로 back leading 유지 |
| `MembershipHeroSection(titleLines, description)` | 별도 hero section 미생성 | legacy hero ("탈퇴하면 아래 정보가\n사라지거나 제한돼요" + description) 의미는 첫 TitleSection title("사라지거나 정리되는 항목")로 흡수. 30일 재가입 제한 안내는 Open Question으로 분리 결정 |
| `MembershipSummarySection(label, title, items[])` | `Section(impact)` → `PageStackContents(title=TitleSection("사라지거나 정리되는 항목"))` + `SectionItem` + `ListText` 반복 (각 항목 `rightItem={{type:"text", text}}`) | legacy의 `label`이 section title 역할. `title`("이 정보가 영향을 받아요")은 정보 위계 중복이므로 SectionTitle로 흡수하며 단일 헤더로 정리. trailingLabel → ListText right-item text preset |
| `MembershipNoticeSection(badge="미납 확인", text)` | `Section(impact)` 내부 `SectionItem` 마지막 자식 `Callout(title="미납 확인", children=...)` | legacy badge "미납 확인"이 Callout `title` 역할. 본문이 CTA 비활성 사유를 설명. Callout은 tone variant 없음 — 경고 강조는 카피로 처리. 단일 의미 단위이므로 별도 section을 만들지 않고 impact section에 흡수 |
| `MembershipPrimaryActionBar(primaryLabel="다음으로", disabled)` | `AppScreen.ActionBar` → `SinglePrimaryAction` + `Button(variant="primary", size="xlarge", fullWidth, disabled)` | disabled 상태 보존. 미납 정산 완료가 disabled 해제 조건이라는 정책 의미를 State Rules에 명시 |

폐기 대상 import:
- `@pxds/pxds-components/shared/global` (ProgressTopBar)
- `@/organisms/legacy-mbr` (`MembershipHeroSection`, `MembershipSummarySection`, `MembershipNoticeSection`, `MembershipPrimaryActionBar`)

## Slot Ownership Map

```txt
┌─ AppScreen(headerPreset="form-entry") ────────────────────────────┐
│ [SystemHeader]                                                    │
│   StatusBar                                                       │
├───────────────────────────────────────────────────────────────────┤
│ [Header]                                                          │
│   AppBar(title="회원 탈퇴", showLeftItem, showTitle)               │
├───────────────────────────────────────────────────────────────────┤
│ [Content: scroll owner]                                           │
│   Section(impact)                                                 │
├───────────────────────────────────────────────────────────────────┤
│ [ActionBar: primary screen action]                                │
│   SinglePrimaryAction                                             │
│     Button(text="다음으로", fullWidth,                              │
│            size="xlarge", variant="primary", disabled)            │
└───────────────────────────────────────────────────────────────────┘
```

## Content Flow

```txt
[Content: scroll owner]

Section(impact)
└─ PageStackContents(title=TitleSection(title="사라지거나 정리되는 항목"))
   └─ SectionItem
      ├─ ListText(
      │    text="T 멤버십 포인트",                              // 보조 카피 "잔여 12,420P"는
      │    rightItem={ type: "text", text: "소멸" }            //   Open Question 참조
      │  )
      ├─ ListText(
      │    text="발급 쿠폰 6개",
      │    rightItem={ type: "text", text: "소멸" }
      │  )
      ├─ ListText(
      │    text="자동 결제 2건",
      │    rightItem={ type: "text", text: "해지" }
      │  )
      ├─ ListText(
      │    text="본인인증 이력",
      │    rightItem={ type: "text", text: "보관" }
      │  )
      └─ Callout(
           title="미납 확인",
           children="현재 미납 요금 8,900원이 확인됐어요. 미납 정산 후 탈퇴를 진행할 수 있어요."
         )
```

## Section Specs

| section | title | primary components | policy |
| --- | --- | --- | --- |
| `impact` | `사라지거나 정리되는 항목` | `PageStackContents`, `TitleSection`, `SectionItem`, `ListText`, `Callout` | POL-MBR-WITHDRAW-IMPACT (TBD) — 포인트 소멸, 쿠폰 소멸, 자동 결제 해지, 본인인증 이력 보관 / POL-MBR-WITHDRAW-UNPAID (TBD) — 미납 요금이 있는 경우 탈퇴 차단 |

## Action Contract

| element | label | state | policy |
| --- | --- | --- | --- |
| Primary CTA | `다음으로` | `disabled` (legacy 기본값 보존) — 미납 정산 완료 시 `primary` 활성 | POL-MBR-WITHDRAW-UNPAID (TBD) — 미납 잔액이 있는 동안 탈퇴 진행 불가 |

## State Rules

- legacy는 CTA가 항상 `disabled=true`로 하드코딩되어 있다. 본 변환은 이 상태를 그대로 보존한다.
- 정책 의도: 미납 요금 = 0 일 때 CTA `primary` 활성. 미납이 남아 있으면 `disabled`.
- 미납 정산 trigger(미납 결제 flow로의 이동, 정산 완료 콜백)는 본 변환 범위 밖이며 Open Questions에 기록한다.
- Section(notice)의 Callout과 CTA `disabled`는 같은 사유(미납 존재)에서 파생되어야 하며, 분리된 상태가 동기화되도록 organism/screen 단계에서 단일 source(unpaidAmount > 0)로 묶는다.

## Implementation Contract

- Use `@pxds/cx-components` for `AppBar`, `Button`, `Callout`, `ListText`, `SectionItem`, `StatusBar`, `TitleMain`, `TitleSection`.
- Use `@pxds/pxds-layout/components` for `AppScreen`, `PageStackContents`, `SectionDivider`, `SinglePrimaryAction`.
- Do NOT import `@pxds/pxds-components/*` (deprecated legacy) and `@pxds/pxds-icons` (deprecated legacy).
- Do NOT reuse `@/organisms/legacy-mbr/*`. 본 화면은 단순 조립으로 충분하므로 Screen.tsx에서 직접 조립한다 (CX-EXAMPLE 방식). 동일 도메인의 신규 organism이 필요해지면 `@/organisms/mbr/`에 신설한다.
- Progress 정보(3/6, 50%)는 시각 컴포넌트로 표현하지 않고 `TitleMain.titleSubText`(eyebrow)에 자연어로 흡수한다.
- `AppScreen.Content`가 유일한 scroll owner.
- CTA는 반드시 `AppScreen.ActionBar` 안에 둔다. 본문 마지막 section에 두지 않는다.
- Section 사이는 `SectionDivider(thickness="section")` 외 다른 wrapper로 구분하지 않는다.
- ListText의 trailingLabel은 반드시 `rightItem={ type: "text", text }` preset으로 전달한다. 자체 inline 노드를 우측에 끼워 넣지 않는다.
- Form-entry 화면은 Figma SOT를 따라 별도 hero/intro section을 두지 않는다.
- 단일 의미 단위로 묶이는 Callout(미납 등)은 관련 PageStackContents의 SectionItem 마지막 자식으로 배치한다.

## Open Questions

1. **항목별 보조 카피 보존 위치** — legacy `items[].sub`("잔여 12,420P", "사용 기한 내 소멸", "구독 즉시 해지", "법정 보관 기간 후 파기")의 시각 표현 위치. CX `ListText`는 단일 `text` slot 중심이므로 (a) `text`에 `\n`으로 보조 카피 결합, (b) `ListText.children`/`tableText` 활용, (c) 별도 helper component 도입 중 선택 필요. 본 다이어그램은 우선 우측 라벨(소멸/해지/보관) 보존을 목적으로 보조 카피는 organism 단계에서 결정한다.
2. **미납 정산 flow trigger** — 미납이 있는 사용자의 정산 진입점(별도 route 또는 modal)이 어디인지 정책서 확인 필요. Callout 내부 또는 별도 보조 CTA가 필요한지 결정 후 추가.
3. **policy ref 채번** — legacy 화면이 정책 ref를 들고 있지 않음. POL-MBR-WITHDRAW-* ID 부여는 별도 트랙. 다이어그램에는 TBD로 표기.
4. **실제 데이터 출처** — 포인트 잔액, 쿠폰 개수, 자동 결제 건수, 미납 금액의 API/spec 출처는 본 변환 범위 밖.
5. **Local_Sheet(상단 고정 컨텍스트 시트) 도입 검토** — 탈퇴 흐름 전반(PG-004/005/003)에서 "탈퇴 대상 회원 ID, 가입일, 등급" 같은 컨텍스트를 AppBar 직하 393×~88px Local_Sheet로 고정 표시할지 검토 필요. Figma SOT의 '상세_정보 체크' 패턴에서 사용. 현 다이어그램은 미도입.
