# LEGACY-MBR-PG-004-0 — 회원 탈퇴 영향 항목 안내 (CX 전환)

## Screen Contract

- legacy source: `apps/mobile/src/app/(legacy-mbr)/LEGACY-MBR-PG-004-0/Screen.tsx`
- target route: `/LEGACY-MBR-PG-004-0-CX`
- group: `legacy-converted-mbr`
- domain: `mbr`
- pattern: `form-entry` / 확인·동의형 영향 항목 안내
- 단계: 회원 탈퇴 3/6 (legacy `ProgressTopBar.percent=50`)
- required design docs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`
- baseline standard: `apps/mobile/src/app/(legacy-converted-mbr)/LEGACY-MBR-PG-002-0-CX/Screen.diagram.md`

## Conversion Intent (Legacy → CX)

| Legacy 어휘 | CX 대체 | 비고 |
| --- | --- | --- |
| `ProgressTopBar(title="회원 탈퇴", leading="back", progress)` | `AppBar(title="회원 탈퇴", showLeftItem, showTitle)` + `TitleMain.titleSubText` | 진행률 bar는 폐기하고 `회원 탈퇴 3/6`을 hero eyebrow로 흡수한다. 완료 화면이 아니므로 back affordance 유지. |
| `MembershipHeroSection(titleLines, description)` | `Section(intro)` → `PageStackContents(title=TitleMain)` | 탈퇴 영향과 30일 재가입 제한을 먼저 안내한다. |
| `MembershipSummarySection(label, title, items[])` | `Section(impact)` → `PageStackContents(title=TitleSection)` + `SectionItem` + `ListText(non-table, rightItem=badge)` | `항목명 -> 상태값`이 반복되므로 plain key-value list로 분류한다. 우측 `소멸/해지/보관`은 값 문장이 아니라 categorical status라 text value보다 badge/chip-like status pill이 맞다. legacy 보조 카피는 Open Questions/Gate에 남긴다. |
| `MembershipNoticeSection(badge="미납 확인", text)` | impact `SectionItem` 내부 `Callout(title="미납 확인")` | 미납은 탈퇴 진행을 막는 같은 의미 단위다. 별도 section으로 분리하지 않는다. |
| `MembershipPrimaryActionBar(primaryLabel="다음으로", disabled)` | `AppScreen.ActionBar` + `SinglePrimaryAction` + `Button(disabled)` | 미납 정산 전 진행 불가 상태를 보존한다. |

폐기 대상 import:
- `@pxds/pxds-components/shared/global` (`ProgressTopBar`)
- `@/organisms/legacy-mbr` (`MembershipHeroSection`, `MembershipSummarySection`, `MembershipNoticeSection`, `MembershipPrimaryActionBar`)

## Slot Ownership Map

```txt
┌─────────────────────────────────────────┐
│ AppScreen(headerPreset="form-entry")    │
│ pattern: form-entry / impact-check      │
│ viewport: 393w                          │
├─────────────────────────────────────────┤
│ SystemHeader                            │
│  9:41                              ▮▮▮  │
├─────────────────────────────────────────┤
│ OGN: ogn-mbr-withdraw-impact-app-bar    │
│ role: step-navigation                   │
│ layoutStrategy                          │
│  widthTier : full-bleed                 │
│  stack     : horizontal chrome          │
│  alignment : back + centered title      │
│  wrapping  : title max 1 line           │
│ vocabularyDecision                      │
│  reuse: AppBar                          │
├─────────────────────────────────────────┤
│  ‹   회원 탈퇴                          │
├─────────────────────────────────────────┤
│ Content: only scroll owner              │
│                                         │
│  OGN: ogn-mbr-withdraw-impact-intro     │
│  role: task-intro                       │
│  layoutStrategy                         │
│   widthTier : content-361               │
│   stack     : vertical                  │
│   alignment : leading                   │
│   typography: step caption -> title -> body│
│   wrapping  : title max 2 / body max 2  │
│                                         │
│  회원 탈퇴 3/6                          │
│                                         │
│  탈퇴하면 아래 정보가                   │
│  사라지거나 제한돼요                    │
│                                         │
│  탈퇴 후에는 같은 식별정보로 30일간     │
│  재가입이 제한될 수 있어요.             │
│                                         │
│  ━━━━━━━ SectionDivider ━━━━━━━        │
│                                         │
│  OGN: ogn-mbr-withdraw-impact-list      │
│  role: impact-summary                   │
│  layoutStrategy                         │
│   widthTier : content-361               │
│   stack     : key-value                 │
│   alignment : left label / right badge  │
│   wrapping  : label max 1 / badge max 1 │
│                                         │
│  사라지거나 정리되는 항목               │
│                                         │
│  T 멤버십 포인트                 [소멸] │
│  발급 쿠폰 6개                   [소멸] │
│  자동 결제 2건                   [해지] │
│  본인인증 이력                   [보관] │
│                                         │
│  OGN: ogn-mbr-withdraw-unpaid-callout   │
│  role: blocking-constraint              │
│  layoutStrategy                         │
│   widthTier : content-361               │
│   stack     : callout title + body      │
│   wrapping  : body max 3 lines          │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 미납 확인                         │  │
│  │ 현재 미납 요금 8,900원이 확인됐어요.│  │
│  │ 미납 정산 후 탈퇴를 진행할 수 있어요.│
│  └───────────────────────────────────┘  │
├─────────────────────────────────────────┤
│ ActionBar(preset="primary-cta")         │
│ OGN: ogn-mbr-withdraw-impact-action     │
│ layoutStrategy                          │
│  widthTier : content-361                │
│  stack     : single full-width button   │
│  wrapping  : label max 1 line           │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 다음으로                    disabled│
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Content Flow

```txt
AppScreen
  SystemHeader
    StatusBar
  Header
    OGN: ogn-mbr-withdraw-impact-app-bar
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
    OGN: ogn-mbr-withdraw-impact-intro
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
        titleSubText: "회원 탈퇴 3/6"
        title: "탈퇴하면 아래 정보가\n사라지거나 제한돼요"
        subTitle: "탈퇴 후에는 같은 식별정보로 30일간 재가입이 제한될 수 있어요."

    SectionDivider(thickness="section")

    OGN: ogn-mbr-withdraw-impact-list
      role: impact-summary
      pattern: form-entry
      layoutStrategy:
        widthTier: content-361
        stack: key-value
        alignment: left label flex / right status badge auto
        typography: section title -> row label/status badge
        wrapping: label max 1 line, status badge max 1 line
        overflow: legacy sub copy is not represented in current rows; see gate
      vocabularyDecision:
        reuse: PageStackContents + TitleSection + SectionItem + ListText(non-table, rightItem badge)
        hold: custom inline row because ListText owns row spacing/status alignment
        hold: ChipItem because these statuses are display-only, not selectable filters
        new?: RQRKeyValueList if this needs secondary text, mixed value/status slots, or multiline values
      content:
        sectionTitle: "사라지거나 정리되는 항목"
        rows:
          - label: "T 멤버십 포인트"
            rightItem: { type: "badge", text: "소멸" }
            legacySub: "잔여 12,420P"
          - label: "발급 쿠폰 6개"
            rightItem: { type: "badge", text: "소멸" }
            legacySub: "사용 기한 내 소멸"
          - label: "자동 결제 2건"
            rightItem: { type: "badge", text: "해지" }
            legacySub: "구독 즉시 해지"
          - label: "본인인증 이력"
            rightItem: { type: "badge", text: "보관" }
            legacySub: "법정 보관 기간 후 파기"

    OGN: ogn-mbr-withdraw-unpaid-callout
      role: blocking-constraint
      pattern: form-entry
      layoutStrategy:
        widthTier: content-361
        stack: callout title + body
        alignment: leading
        typography: callout title -> body
        wrapping: body max 3 lines
        overflow: keep visible in scroll content; never hidden by ActionBar
      vocabularyDecision:
        reuse: Callout inside impact SectionItem
        new?: settlement action pattern if policy requires immediate payment entry
      content:
        title: "미납 확인"
        body: "현재 미납 요금 8,900원이 확인됐어요. 미납 정산 후 탈퇴를 진행할 수 있어요."
  ActionBar
    OGN: ogn-mbr-withdraw-impact-action
      role: blocked-continue
      pattern: form-entry
      layoutStrategy:
        widthTier: content-361
        stack: single full-width button
        alignment: stretch
        wrapping: button label max 1 line
      vocabularyDecision:
        reuse: SinglePrimaryAction + Button(disabled)
      actions:
        - primary: "다음으로"
          state: disabled
```

## Layout Distortion Gate

- `impact` rows are a key-value group even though they are not inside a summary card. The trigger is repeated `left label -> right status` rows.
- Legacy item sub copy is missing from the current implementation. This is a policy fidelity risk, not a spacing issue. Decide whether CX `ListText` can carry secondary text or whether an MBR impact organism is required.
- The right status labels (`소멸`, `해지`, `보관`) are badge/chip-like status pills. Use `ListText.rightItem={type:"badge"}` rather than plain text when the right side is categorical status.
- Do not use `ChipItem` for these statuses unless they become selectable filters. `ChipItem` owns selection state; this section only displays withdrawal impact status.
- The right status labels must remain short. Do not replace them with full policy sentences inside `rightItem`.
- `Callout(title="미납 확인")` and disabled CTA must derive from the same source (`unpaidAmount > 0`). If they diverge, the screen can both block and allow withdrawal.
- Current CTA is hard-disabled. That preserves the legacy fixture, but it is suspicious for a real route unless a settlement path or resolved state exists.
- The unpaid Callout is inside the impact `SectionItem`. If a payment/settlement CTA is introduced, do not insert a raw button into the Callout; use a CX action pattern or define an organism contract.
- `Local_Sheet` for withdrawal target context is not present. If the flow needs persistent member identity context, add it as a deliberate screen-level pattern, not ad hoc AppBar-adjacent markup.
- Route-level `margin`, `padding`, `width`, `fontSize`, fixed/absolute CTA chrome, deprecated `@pxds/pxds-components`, deprecated `@pxds/pxds-icons`, and `@/organisms/legacy-mbr/*` are forbidden.

## Section Specs

| section | title | primary components | policy |
| --- | --- | --- | --- |
| `intro` | `탈퇴하면 아래 정보가 사라지거나 제한돼요` | `PageStackContents`, `TitleMain` | POL-MBR-WITHDRAW-INTRO (TBD) — 탈퇴 후 30일 재가입 제한 안내 |
| `impact` | `사라지거나 정리되는 항목` | `PageStackContents`, `TitleSection`, `SectionItem`, `ListText(non-table key-value + badge rightItem)`, `Callout` | POL-MBR-WITHDRAW-IMPACT (TBD) — 포인트 소멸, 쿠폰 소멸, 자동 결제 해지, 본인인증 이력 보관 |
| `impact.unpaid` | `미납 확인` | `Callout` | POL-MBR-WITHDRAW-UNPAID (TBD) — 미납 잔액이 있으면 탈퇴 진행 불가 |

## Action Contract

| element | label | variant | role | policy |
| --- | --- | --- | --- | --- |
| Primary CTA | `다음으로` | `primary` + `disabled` | 미납 정산 전 다음 단계 차단 | POL-MBR-WITHDRAW-UNPAID (TBD) |

- CTA becomes enabled only when `unpaidAmount === 0` or the policy-equivalent settlement state is complete.
- There is currently no visible settlement action. If policy requires immediate resolution, add a separate action contract rather than overloading `다음으로`.

## State Rules

- Current fixture state: `unpaidAmount=8900`, so `Callout` is visible and CTA is disabled.
- Target state model should derive both Callout visibility and CTA disabled state from one source.
- Impact rows are static summaries for this fixture; real values should come from withdrawal eligibility/impact API data.
- Progress information (`3/6`, `50%`) is represented only by `TitleMain.titleSubText`; do not restore visual progress bar.

## Implementation Contract

- Use `@pxds/cx-components` for `AppBar`, `Button`, `Callout`, `ListText`, `SectionItem`, `StatusBar`, `TitleMain`, `TitleSection`.
- Use `ListText(non-table, rightItem=badge)` as the current plain key-value row vocabulary for categorical status. Do not use `ListText.table` for this impact list.
- Use `@pxds/pxds-layout/components` for `AppScreen`, `PageStackContents`, `SectionDivider`, `SinglePrimaryAction`.
- Do NOT import `@pxds/pxds-components/*` or `@pxds/pxds-icons`.
- Do NOT reuse `@/organisms/legacy-mbr/*`. If secondary impact copy or settlement behavior needs structure, create a CX organism under `@/organisms/mbr/`.
- `AppScreen.Content` is the only scroll owner.
- CTA must live in `AppScreen.ActionBar`.
- Section boundaries use `SectionDivider(thickness="section")` only.
- Do not solve missing sub copy with inline `<div>` rows or raw spacing in the route.

## Open Questions

1. **legacy 보조 카피 보존** — `잔여 12,420P`, `사용 기한 내 소멸`, `구독 즉시 해지`, `법정 보관 기간 후 파기`가 현재 `Screen.tsx`에 표시되지 않는다. Policy fidelity 기준으로 복구 위치를 정해야 한다.
2. **미납 정산 flow trigger** — 미납 사용자가 어디에서 8,900원을 정산하는지 route/modal/외부 결제 진입점이 없다.
3. **policy ref 채번** — 탈퇴 영향, 미납 차단, 재가입 제한 정책 ID가 policy-core에 아직 없다.
4. **실제 데이터 출처** — 포인트 잔액, 쿠폰 개수, 자동 결제 건수, 본인인증 이력 보관 조건, 미납 금액의 API/spec 출처가 미정이다.
5. **Local_Sheet 도입 여부** — 탈퇴 대상 회원 ID/가입일/등급 같은 고정 컨텍스트가 필요한지 Figma SOT와 정책서 기준으로 판단해야 한다.
