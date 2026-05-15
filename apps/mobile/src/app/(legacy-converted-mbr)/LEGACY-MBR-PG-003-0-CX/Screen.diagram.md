# LEGACY-MBR-PG-003-0 — 탈퇴 완료 (CX 전환)

## Screen Contract

- legacy source: `apps/mobile/src/app/(legacy-mbr)/LEGACY-MBR-PG-003-0/Screen.tsx`
- target route: `/LEGACY-MBR-PG-003-0-CX`
- group: `legacy-converted-mbr`
- domain: `mbr`
- pattern: `complete` → 단순 완료형 (DESIGN_PATTERNS.md Pattern G — 완료)
- 단계: 회원 탈퇴 6/6 (legacy `ProgressTopBar.percent=100`)
- required design docs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`
- design SOT (참고): `apps/mobile/src/app/(legacy-converted-mbr)/LEGACY-MBR-PG-007-0-CX/Screen.diagram.md`, `apps/mobile/src/app/(cx)/CX-EXAMPLE-PERSONAL-INFO-INPUT/Screen.diagram.md`

## Conversion Intent (Legacy → CX)

| Legacy 어휘 | CX 대체 | 비고 |
| --- | --- | --- |
| `ProgressTopBar(title, leading="close", progress)` | `AppBar(title="탈퇴 완료", showLeftItem, leading="close", showTitle)` | DESIGN_PATTERNS 완료 패턴은 `close` leading 유지. progress 시각화는 제거하고 단계 정보를 `TitleMain.titleSubText`(eyebrow)에 흡수 |
| `MembershipHeroSection(titleLines, description)` | `Section(intro)` → `PageStackContents(title=TitleMain(type="complete"))` | 완료형 hero. `title`에 본문, `subTitle`에 설명, `titleSubText`에 단계 라벨 |
| `MembershipSummarySection(label, title, items[])` | `Section(summary)` → `PageStackContents(title=TitleSection)` + `SectionItem(variant=card)` + `ListText` 행들 | `trailingLabel`은 `ListText.rightItem`(`type="text"`) preset으로 표현 |
| `MembershipNoticeSection(badge, text)` | `Section(notice)` → `Callout(title, children)` | DESIGN_PATTERNS Pattern A/G 공통 안내 어휘 |
| `MembershipPrimaryActionBar(primaryLabel, secondaryLabel)` | `AppScreen.ActionBar` + `ActionButton(actions=[primary, secondary])` | dual CTA. `SinglePrimaryAction`은 단일 버튼 전용이라 부적합. `ActionButton`이 1·2 버튼 모두 수용 |

폐기 대상 import:
- `@pxds/pxds-components/shared/global` (ProgressTopBar)
- `@/organisms/legacy-mbr` (`MembershipHeroSection`, `MembershipSummarySection`, `MembershipNoticeSection`, `MembershipPrimaryActionBar`)

## Slot Ownership Map

```txt
┌─ AppScreen(headerPreset="complete") ───────────────────────────────┐
│ [SystemHeader]                                                     │
│   StatusBar                                                        │
├────────────────────────────────────────────────────────────────────┤
│ [Header]                                                           │
│   AppBar(title="탈퇴 완료", leading="close",                        │
│          showLeftItem, showTitle)                                  │
├────────────────────────────────────────────────────────────────────┤
│ [Content: scroll owner]                                            │
│   Section(intro)                                                   │
│   SectionDivider(thickness="section")                              │
│   Section(summary)                                                 │
│   SectionDivider(thickness="section")                              │
│   Section(notice)                                                  │
├────────────────────────────────────────────────────────────────────┤
│ [ActionBar: dual screen action]                                    │
│   ActionButton(                                                    │
│     buttonCount=2,                                                 │
│     actions=[                                                      │
│       { label: "홈으로 가기", variant: "primary" },                 │
│       { label: "철회하기",   variant: "secondary" }                 │
│     ]                                                              │
│   )                                                                │
└────────────────────────────────────────────────────────────────────┘
```

## Content Flow

```txt
[Content: scroll owner]

Section(intro)
└─ PageStackContents(
     title=TitleMain(
       type="complete",
       titleSubText="회원 탈퇴 6/6",                         // eyebrow (단계 라벨)
       title="탈퇴 처리가\n완료되었습니다",                    // hero copy
       subTitle="30일 이내에 다시 가입하시면 일부 정보를 복원할 수 있어요. 그 이후엔 모두 파기됩니다."
     )
   )

SectionDivider(thickness="section")

Section(summary)
└─ PageStackContents(title=TitleSection(title="이 내용으로 처리됐어요", titleSubText="처리 정보"))
   └─ SectionItem(variant="card")
      ├─ ListText(
      │    text="탈퇴 처리 시각",
      │    tableText="2026년 4월 30일 (수) 19:24",
      │    table=true,
      │    showRightItem=false,
      │    showDivider=true
      │  )
      ├─ ListText(
      │    text="철회 가능 기간",
      │    tableText="5월 30일까지 (30일 유예)",
      │    table=true,
      │    showRightItem=true,
      │    rightItem={ type: "text", text: "철회 가능" },     // trailingLabel → right-item
      │    showDivider=true
      │  )
      └─ ListText(
           text="개인정보 파기",
           tableText="유예 종료 시 자동 파기",
           table=true,
           showRightItem=false,
           showDivider=false
         )

SectionDivider(thickness="section")

Section(notice)
└─ PageStackContents
   └─ SectionItem
      └─ Callout(
           title="철회 안내",
           children="유예 기간 내 철회를 원하시면 탈퇴 시 사용한 본인인증으로 마이페이지에서 진행할 수 있어요."
         )
```

## Section Specs

| section | title | primary components | policy |
| --- | --- | --- | --- |
| `intro` | `탈퇴 처리가 완료되었습니다` | `PageStackContents`, `TitleMain(type="complete")` | POL-MBR-WITHDRAW-COMPLETE (TBD) |
| `summary` | `이 내용으로 처리됐어요` | `PageStackContents`, `TitleSection`, `SectionItem(card)`, `ListText`, `ListTextRightItem` | POL-MBR-WITHDRAW-GRACE (TBD) — 30일 유예, 철회 가능 기간, 개인정보 파기 시점 |
| `notice` | (제목 없음, Callout 자체 title) | `PageStackContents`, `SectionItem`, `Callout` | POL-MBR-WITHDRAW-REVOKE (TBD) — 철회 절차 안내 |

## Action Contract

| element | label | variant | state | policy |
| --- | --- | --- | --- | --- |
| Primary CTA | `홈으로 가기` | `primary` | always enabled — 완료 화면 표준 출구 | - |
| Secondary CTA | `철회하기` | `secondary` | 유예 기간 내에서만 활성. 만료 시 `disabled` | POL-MBR-WITHDRAW-REVOKE (TBD) |

`철회하기`는 destructive가 아니라 "완료된 탈퇴를 되돌리는" 보조 행동이므로 `secondary` variant로 표현한다. `primary` 한 자리는 사용자가 가장 자연스럽게 닫고 나가는 "홈으로 가기"가 가져간다.

## State Rules

- 본 화면은 입력이 없는 완료형이며, 두 CTA 외 trigger 없음.
- `철회하기` 활성 조건은 `now <= grace.endsAt` (현재 다이어그램에서는 항상 활성으로 가정, 만료 처리 로직은 organism 단계에서 결정).
- 단계 표시(6/6)는 시각 progress bar로 그리지 않고 `titleSubText` eyebrow 문구로만 표현 — 완료형이므로 진행률보다 "마지막 단계"라는 의미 라벨만 남긴다.
- `ListText.rightItem` `text` preset은 짧은 상태 라벨(`철회 가능`) 표시에 한정한다. 길어지면 `badgeLevel`이나 별도 `Callout`으로 분리 후보.

## Implementation Contract

- Use `@pxds/cx-components` for `ActionButton`, `AppBar`, `Callout`, `ListText`, `ListTextRightItem`, `SectionItem`, `StatusBar`, `TitleMain`, `TitleSection`.
- Use `@pxds/pxds-layout/components` for `AppScreen`, `PageStackContents`, `SectionDivider`.
- Do NOT import `@pxds/pxds-components/*` (deprecated legacy) and `@pxds/pxds-icons` (deprecated legacy).
- Do NOT reuse `@/organisms/legacy-mbr/*`. 단순 조립으로 충분하므로 Screen.tsx에서 직접 조립한다.
- Dual CTA는 반드시 `AppScreen.ActionBar` 안의 단일 `ActionButton(buttonCount=2)`로 둔다. `SinglePrimaryAction`을 두 번 쌓지 않는다.
- Progress 정보(6/6, 100%)는 시각 컴포넌트로 표현하지 않고 `TitleMain.titleSubText`에 자연어로 흡수한다.
- `AppScreen.Content`가 유일한 scroll owner.
- Section 사이는 `SectionDivider(thickness="section")` 외 다른 wrapper로 구분하지 않는다.
- 처리 정보 카드는 `SectionItem(variant="card")` + `ListText(table=true)` 행 조합으로 구성하고, 행 간 구분은 `ListText.showDivider`로 처리한다. 임의 border/margin 추가 금지.

## Open Questions

1. **정책 ref 채번** — 탈퇴 완료/유예/철회와 관련된 정책 ID가 policy-core에 아직 없음. POL-MBR-WITHDRAW-* 신설은 별도 트랙. 다이어그램에는 TBD로 표기.
2. **실제 데이터 출처** — `탈퇴 처리 시각`, `철회 가능 기간 종료일`, `처리 정보` 항목 목록을 어디서 가져오는지(서버 응답 vs 라우트 state) 미정. 본 변환에서는 legacy의 정적 placeholder를 그대로 보존.
3. **철회 flow trigger** — `철회하기` 클릭 시 본인인증 step으로 직접 진입하는지, 마이페이지 진입 후 별도 entry를 거치는지 정의되지 않음. 본 다이어그램은 버튼 위계와 변환 어휘까지만 다루고 후속 화면 연결은 별도 추적.
