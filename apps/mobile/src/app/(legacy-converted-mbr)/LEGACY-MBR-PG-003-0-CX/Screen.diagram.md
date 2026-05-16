# LEGACY-MBR-PG-003-0 — 탈퇴 완료 (CX 전환)

## Screen Contract

- legacy source: `apps/mobile/src/app/(legacy-mbr)/LEGACY-MBR-PG-003-0/Screen.tsx`
- target route: `/LEGACY-MBR-PG-003-0-CX`
- group: `legacy-converted-mbr`
- domain: `mbr`
- pattern: `complete` (DESIGN_PATTERNS.md Pattern G — 단순 완료형)
- 단계: 회원 탈퇴 6/6 (legacy `ProgressTopBar.percent=100`)
- required design docs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`
- baseline standard: `apps/mobile/src/app/(legacy-converted-mbr)/LEGACY-MBR-PG-002-0-CX/Screen.diagram.md`

## Conversion Intent (Legacy → CX)

| Legacy 어휘 | CX 대체 | 비고 |
| --- | --- | --- |
| `ProgressTopBar(title="탈퇴 완료", leading="close", progress)` | `AppBar(title="탈퇴 완료", showLeftItem, showTitle, leftIcon=<Icon type="close"/>, leftLabel="닫기")` | 완료형은 back 대신 close exit를 쓴다. progress bar는 폐기하고 `회원 탈퇴 6/6`을 hero eyebrow로 흡수한다. |
| `MembershipHeroSection(titleLines, description)` | `Section(intro)` → `PageStackContents(title=TitleMain(type="complete"))` | 완료 상태를 즉시 알리고 30일 유예/파기 조건을 설명한다. |
| `MembershipSummarySection(label, title, items[])` | `Section(summary)` → `PageStackContents(title=TitleSection(title))` + `RQRContentsDetail(title="처리 정보")` | `PG-002`에서 확정한 카드형 key-value 표준을 재사용한다. `ListText.table`은 긴 날짜/유예 문구에서 value column 왜곡이 생기므로 사용하지 않는다. |
| `MembershipNoticeSection(badge="철회 안내", text)` | `Section(notice)` → `Callout(title="철회 안내")` | 완료 후 보조 절차 안내는 별도 section으로 둔다. |
| `MembershipPrimaryActionBar(primaryLabel, secondaryLabel)` | `AppScreen.ActionBar` + `SinglePrimaryAction` + `ActionButton(actions=[secondary, primary])` | 2 CTA는 `ActionButton`이 소유한다. 현재 순서는 좌측 `철회하기`, 우측 `홈으로 가기`다. |

폐기 대상 import:
- `@pxds/pxds-components/shared/global` (`ProgressTopBar`)
- `@/organisms/legacy-mbr` (`MembershipHeroSection`, `MembershipSummarySection`, `MembershipNoticeSection`, `MembershipPrimaryActionBar`)

## Slot Ownership Map

```txt
┌─────────────────────────────────────────┐
│ AppScreen(headerPreset="form-entry")    │
│ pattern: complete                       │
│ viewport: 393w                          │
├─────────────────────────────────────────┤
│ SystemHeader                            │
│  9:41                              ▮▮▮  │
├─────────────────────────────────────────┤
│ OGN: ogn-mbr-withdraw-complete-app-bar  │
│ role: completion-exit                   │
│ layoutStrategy                          │
│  widthTier : full-bleed                 │
│  stack     : horizontal chrome          │
│  alignment : leading title + close      │
│  wrapping  : title max 1 line           │
│ vocabularyDecision                      │
│  reuse: AppBar + Icon(close)            │
├─────────────────────────────────────────┤
│  ✕   탈퇴 완료                          │
├─────────────────────────────────────────┤
│ Content: only scroll owner              │
│                                         │
│  OGN: ogn-mbr-withdraw-complete-hero    │
│  role: hero                             │
│  layoutStrategy                         │
│   widthTier : content-361               │
│   stack     : vertical                  │
│   alignment : leading                   │
│   typography: step caption -> title -> body│
│   wrapping  : title max 2 / body max 2  │
│                                         │
│  회원 탈퇴 6/6                          │
│                                         │
│  탈퇴 처리가                            │
│  완료되었습니다                         │
│                                         │
│  30일 이내에 다시 가입하시면 일부 정보를 │
│  복원할 수 있어요. 그 이후엔 모두       │
│  파기됩니다.                           │
│                                         │
│  ━━━━━━━ SectionDivider ━━━━━━━        │
│                                         │
│  OGN: ogn-mbr-withdraw-complete-summary │
│  role: summary                          │
│  layoutStrategy                         │
│   widthTier : content-361               │
│   stack     : section title + card      │
│   alignment : left flex / right auto    │
│   wrapping  : label/value max 1 line    │
│                                         │
│  이 내용으로 처리됐어요                 │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 처리 정보                         │  │
│  │                                   │  │
│  │ 탈퇴 처리 시각  2026년 4월 30일 (수) 19:24│
│  │ 철회 가능 기간  5월 30일까지 (30일 유예)│
│  │ 개인정보 파기   유예 종료 시 자동 파기 │
│  └───────────────────────────────────┘  │
│                                         │
│  ━━━━━━━ SectionDivider ━━━━━━━        │
│                                         │
│  OGN: ogn-mbr-withdraw-revoke-notice    │
│  role: revoke-guidance                  │
│  layoutStrategy                         │
│   widthTier : content-361               │
│   stack     : callout title + body      │
│   wrapping  : body max 3 lines          │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 철회 안내                         │  │
│  │ 유예 기간 내 철회를 원하시면 탈퇴 시│  │
│  │ 사용한 본인인증으로 마이페이지에서 │  │
│  │ 진행할 수 있어요.                 │  │
│  └───────────────────────────────────┘  │
├─────────────────────────────────────────┤
│ ActionBar(preset="primary-cta")         │
│ OGN: ogn-mbr-withdraw-complete-actions  │
│ layoutStrategy                          │
│  widthTier : content-361                │
│  stack     : horizontal 2 buttons       │
│  wrapping  : button labels max 1 line   │
│                                         │
│  ┌───────────────┐ ┌────────────────┐  │
│  │ 철회하기       │ │ 홈으로 가기     │  │
│  └───────────────┘ └────────────────┘  │
└─────────────────────────────────────────┘
```

## Content Flow

```txt
AppScreen
  SystemHeader
    StatusBar
  Header
    OGN: ogn-mbr-withdraw-complete-app-bar
      role: completion-exit
      pattern: complete
      layoutStrategy:
        widthTier: full-bleed
        stack: horizontal chrome
        alignment: leading title + close
        typography: app-bar title
        wrapping: title max 1 line
      vocabularyDecision:
        reuse: AppBar + Icon(type="close")
  Content
    OGN: ogn-mbr-withdraw-complete-hero
      role: hero
      pattern: complete
      layoutStrategy:
        widthTier: content-361
        stack: vertical
        alignment: leading
        typography: step caption -> display title -> body
        wrapping: title max 2 lines, body max 2 lines
        overflow: body multiline only
      vocabularyDecision:
        reuse: PageStackContents + TitleMain(type="complete")
      content:
        titleSubText: "회원 탈퇴 6/6"
        title: "탈퇴 처리가\n완료되었습니다"
        subTitle: "30일 이내에 다시 가입하시면 일부 정보를 복원할 수 있어요. 그 이후엔 모두 파기됩니다."

    SectionDivider(thickness="section")

    OGN: ogn-mbr-withdraw-complete-summary
      role: summary
      pattern: complete
      layoutStrategy:
        widthTier: content-361
        stack: section title + card header + list rows
        alignment: left flex / right auto
        surface: fill #F4F5FA via semantic-color-bg-dim, radius 20, padding 24
        typography: outer TitleSection -> card title -> row label/value
        wrapping: label max 1 line, value max 1 line
        overflow: right value may ellipsize; never fixed 80px value column
      vocabularyDecision:
        reuse: PageStackContents + TitleSection + RQRContentsDetail + ListText(non-table)
        hold: ListText.table because current value column is fixed 80px
      content:
        sectionTitle: "이 내용으로 처리됐어요"
        cardTitle: "처리 정보"
        rows:
          - label: "탈퇴 처리 시각"
            value: "2026년 4월 30일 (수) 19:24"
          - label: "철회 가능 기간"
            value: "5월 30일까지 (30일 유예)"
            rightItem: "철회 가능"
          - label: "개인정보 파기"
            value: "유예 종료 시 자동 파기"

    SectionDivider(thickness="section")

    OGN: ogn-mbr-withdraw-revoke-notice
      role: revoke-guidance
      pattern: complete
      layoutStrategy:
        widthTier: content-361
        stack: callout title + body
        alignment: leading
        typography: callout title -> body
        wrapping: body max 3 lines
        overflow: keep visible in scroll content; never hidden by ActionBar
      vocabularyDecision:
        reuse: PageStackContents + SectionItem + Callout
      content:
        title: "철회 안내"
        body: "유예 기간 내 철회를 원하시면 탈퇴 시 사용한 본인인증으로 마이페이지에서 진행할 수 있어요."
  ActionBar
    OGN: ogn-mbr-withdraw-complete-actions
      role: exit-actions
      pattern: complete
      layoutStrategy:
        widthTier: content-361
        stack: horizontal 2 buttons
        alignment: stretch
        wrapping: button labels max 1 line
      vocabularyDecision:
        reuse: SinglePrimaryAction + ActionButton(actions=[secondary, primary])
      actions:
        - secondary: "철회하기"
        - primary: "홈으로 가기"
```

## Layout Distortion Gate

- `ListText.table` is forbidden for this summary because its table value column can be too narrow for `2026년 4월 30일 (수) 19:24` and `5월 30일까지 (30일 유예)`.
- The `철회 가능` right status competes with the already long value. It must remain a short status token; if policy copy lengthens, move it to a badge/callout, not a custom inline node.
- Current `Screen.tsx` wraps `ActionButton` in `SinglePrimaryAction`. This matches the local precedent in `PG-002`, but should be watched: `SinglePrimaryAction` must not impose single-button spacing on a 2-button `ActionButton`.
- `AppScreen(headerPreset="form-entry")` is preserved from the implementation even though the pattern is `complete`. If complete-specific preset behavior becomes available, update all complete converted screens consistently.
- 완료 화면 must not expose a back navigation affordance. Use close/home exit only.
- Notice Callout must remain above the ActionBar in scroll content and must not be obscured by the bottom chrome.
- Route-level `margin`, `padding`, `width`, `fontSize`, fixed/absolute CTA chrome, deprecated `@pxds/pxds-components`, deprecated `@pxds/pxds-icons`, and `@/organisms/legacy-mbr/*` are forbidden.

## Section Specs

| section | title | primary components | policy |
| --- | --- | --- | --- |
| `intro` | `탈퇴 처리가 완료되었습니다` | `PageStackContents`, `TitleMain(type="complete")` | POL-MBR-WITHDRAW-COMPLETE (TBD) |
| `summary` | `이 내용으로 처리됐어요` | `PageStackContents`, `TitleSection`, `RQRContentsDetail`, `ListText(non-table)` | POL-MBR-WITHDRAW-GRACE (TBD) — 처리 시각, 30일 유예, 철회 가능 기간, 개인정보 파기 시점 |
| `notice` | `철회 안내` | `PageStackContents`, `SectionItem`, `Callout` | POL-MBR-WITHDRAW-REVOKE (TBD) — 유예 기간 내 철회 절차 |

## Action Contract

| element | label | variant | role | policy |
| --- | --- | --- | --- | --- |
| Primary CTA (우측) | `홈으로 가기` | `primary` | 완료 후 기본 출구 | POL-MBR-WITHDRAW-COMPLETE (TBD) |
| Secondary CTA (좌측) | `철회하기` | `secondary` | 유예 기간 내 탈퇴 철회 진입 | POL-MBR-WITHDRAW-REVOKE (TBD) |

- `ActionButton.actions` order is `[secondary, primary]`, so the primary exit remains on the right.
- `철회하기` is not destructive in this context; it reverses a pending withdrawal and remains secondary.

## State Rules

- Static complete screen; no input state in the content body.
- `철회하기` should be enabled only while `now <= grace.endsAt`. Current implementation renders it enabled because the placeholder data is inside the 30-day grace period.
- After the grace period expires, the secondary action should become disabled or disappear according to policy.
- `회원 탈퇴 6/6` is an eyebrow label only. Do not restore a progress bar on completion.

## Implementation Contract

- Use `@pxds/cx-components` for `ActionButton`, `AppBar`, `Callout`, `Icon`, `RQRContentsDetail`, `SectionItem`, `StatusBar`, `TitleMain`, `TitleSection`.
- Use `@pxds/cx-layout/components` for `AppScreen`, `PageStackContents`, `SectionDivider`, `SinglePrimaryAction`.
- Do NOT import `@pxds/pxds-components/*` or `@pxds/pxds-icons`.
- Do NOT reuse `@/organisms/legacy-mbr/*`.
- `AppScreen.Content` is the only scroll owner.
- Dual CTA must be represented by a single `ActionButton(actions=[secondary, primary])` in `AppScreen.ActionBar`.
- Section boundaries use `SectionDivider(thickness="section")` only.
- Do not fix key-value distortion with route-level raw CSS; use `RQRContentsDetail` for this complete summary.

## Open Questions

1. **policy ref 채번** — 탈퇴 완료, 유예, 철회, 개인정보 파기 정책 ID가 policy-core에 아직 없다.
2. **철회 가능 status 위치** — 기존 `ListText.table` 행의 right status `철회 가능`은 card row로 옮기면서 빠졌다. 별도 badge/status slot이 필요한지 policy와 Figma SOT 확인 필요.
3. **실제 데이터 출처** — 처리 시각, 철회 가능 종료일, 개인정보 파기 예정일이 서버 응답인지 route state인지 미정이다.
4. **철회 flow trigger** — `철회하기`가 본인인증 step으로 직접 진입하는지, 마이페이지 철회 entry로 이동하는지 정의 필요.
5. **complete preset 정합성** — route uses `headerPreset="form-entry"` while the screen pattern is complete. This may be harmless layout reuse, but should be checked against `AppScreen` preset contracts.
