# LEGACY-MBR-PG-002-0 — 가입 완료 (CX 전환)

## Screen Contract

- legacy source: `apps/mobile/src/app/(legacy-mbr)/LEGACY-MBR-PG-002-0/Screen.tsx`
- target route: `/LEGACY-MBR-PG-002-0-CX`
- group: `legacy-converted-mbr`
- domain: `mbr`
- pattern: `complete` (DESIGN_PATTERNS.md `<a name="section-complete">` / Pattern G — 단순 완료형)
- 단계: 회원 가입 5/5 (legacy `ProgressTopBar.percent=100`)
- required design docs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`
- design SOT (참고): `apps/mobile/src/app/(legacy-converted-mbr)/LEGACY-MBR-PG-007-0-CX/Screen.diagram.md`

## Conversion Intent (Legacy → CX)

| Legacy 어휘 | CX 대체 | 비고 |
| --- | --- | --- |
| `ProgressTopBar(title, leading="back", progress)` | `AppBar(title, showLeftItem, showTitle, leftIcon=<Icon type="close"/>, leftLabel="닫기")` | DESIGN_PATTERNS 완료형은 뒤로가기 금지 — '닫기(X)' 또는 '홈'만 허용. 단계 정보(5/5)는 `TitleMain.titleSubText`로 흡수하고 progress bar는 폐기 (완료 시점에 진행률 UI는 의미 손실) |
| `MembershipHeroSection(titleLines, description)` | `Section(intro)` → `PageStackContents(title=TitleMain(type="complete", titleSubText, title, subTitle))` | CX `TitleMain`은 `type="complete"`를 명시 지원. 완료형 hero의 표준 어휘 |
| `MembershipSummarySection(label, title, items[])` | `Section(summary)` → `PageStackContents(title=TitleSection(title))` + `RQRContentsDetail(title=label)` | Figma SOT `SKT GenUI Test 0513 / node 12285:9074`의 `ogn-contents-detail` 형태를 따른다. Legacy `title`은 카드 밖 section title, legacy `label`은 카드 내부 title로 분리한다. 카드 width 369, fill `#F4F5FA`(`semantic-color-bg-dim`), radius 20, padding 24, header + `ListText` 기본 모드 rows(left flex / right auto) 구조다. `ListText.table`은 value column fixed 80px라 사용하지 않는다. |
| `MembershipNoticeSection(badge="혜택", text)` | `Section(benefit)` → `Callout(title="혜택", children=...)` | DESIGN_PATTERNS Pattern A·G의 안내 어휘. badge 텍스트는 Callout title로 흡수 |
| `MembershipPrimaryActionBar(primaryLabel, secondaryLabel)` | `AppScreen.ActionBar` + `SinglePrimaryAction` + `ActionButton(actions=[secondary, primary])` | `SinglePrimaryAction`은 단일 슬롯 wrapper이지만 자식은 자유 — `ActionButton`이 1~2 action을 모두 처리하므로 2 CTA 케이스는 `ActionButton` 사용이 표준. `Button` 직접 2개 나열은 spacing/순서 contract를 깨므로 회피 |

폐기 대상 import:
- `@pxds/pxds-components/shared/global` (ProgressTopBar)
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
│ OGN: ogn-mbr-complete-app-bar           │
│ role: completion-exit                   │
│ layoutStrategy                          │
│  widthTier : full-bleed                 │
│  stack     : horizontal chrome          │
│  alignment : leading title + close      │
│  wrapping  : title max 1 line           │
│ vocabularyDecision                      │
│  reuse: AppBar                          │
├─────────────────────────────────────────┤
│  ✕   가입 완료                          │
├─────────────────────────────────────────┤
│ Content: only scroll owner              │
│                                         │
│  OGN: ogn-mbr-complete-hero             │
│  role: hero                             │
│  layoutStrategy                         │
│   widthTier : content-361               │
│   stack     : vertical                  │
│   alignment : leading                   │
│   typography: step caption -> title -> body│
│   wrapping  : title max 2 / body max 2  │
│                                         │
│  회원 가입 5/5 · 가입 완료              │
│                                         │
│  환영합니다,                            │
│  우주에 오신 걸                         │
│                                         │
│  가입이 완료되었어요. 자동 로그인       │
│  상태이며, 첫 화면부터 모든 서비스를    │
│  이용할 수 있어요.                     │
│                                         │
│  ━━━━━━━ SectionDivider ━━━━━━━        │
│                                         │
│  OGN: ogn-mbr-signup-complete-summary   │
│  role: summary                          │
│  layoutStrategy                         │
│   widthTier : content-361               │
│   stack     : section title + card      │
│   alignment : left flex / right auto    │
│   surface   : bg-dim #F4F5FA / radius20 │
│   wrapping  : label/value max 1 line    │
│                                         │
│  이 정보로 가입이 완료됐어요            │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 가입 정보                         │  │
│  │                                   │  │
│  │ 회원 ID              wooseong**** │  │
│  │ 가입일       2026년 4월 30일 (수) │  │
│  │ 자동 로그인   이 기기에서 30일 유지 │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ━━━━━━━ SectionDivider ━━━━━━━        │
│                                         │
│  OGN: ogn-mbr-signup-benefit-notice     │
│  role: benefit                          │
│  layoutStrategy                         │
│   widthTier : section-369               │
│   stack     : card vertical             │
│   wrapping  : body max 3 lines          │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 혜택                              │  │
│  │ 신규 가입 첫 달 멤버십 무료 혜택이 │  │
│  │ 자동 적용되었어요. 사용 내역은     │  │
│  │ 내정보에서 확인할 수 있어요.       │  │
│  └───────────────────────────────────┘  │
├─────────────────────────────────────────┤
│ ActionBar(preset="primary-cta")         │
│ OGN: ogn-mbr-complete-actions           │
│ layoutStrategy                          │
│  widthTier : content-361                │
│  stack     : horizontal 2 buttons       │
│  wrapping  : button labels max 1 line   │
│                                         │
│  ┌───────────────┐ ┌────────────────┐  │
│  │ 내정보 확인    │ │ 홈으로 가기     │  │
│  └───────────────┘ └────────────────┘  │
└─────────────────────────────────────────┘
```

## Content Flow

```txt
AppScreen
  SystemHeader
    StatusBar
  Header
    OGN: ogn-mbr-complete-app-bar
      role: completion-exit
      pattern: complete
      layoutStrategy:
        widthTier: full-bleed
        stack: horizontal chrome
        alignment: leading title + close
        typography: app-bar title
        wrapping: title max 1 line
      vocabularyDecision:
        reuse: AppBar
  Content
    OGN: ogn-mbr-complete-hero
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
        titleSubText: "회원 가입 5/5 · 가입 완료"
        title: "환영합니다,\n우주에 오신 걸"
        subTitle: "가입이 완료되었어요. 자동 로그인 상태이며, 첫 화면부터 모든 서비스를 이용할 수 있어요."

    SectionDivider(thickness="section")

    OGN: ogn-mbr-signup-complete-summary
      role: summary
      pattern: complete
      figmaSot: SKT GenUI Test 0513 / node 12285:9074 / ogn-contents-detail
      layoutStrategy:
        widthTier: content-361
        stack: section title + card header + list rows
        alignment: left flex / right auto
        surface: fill #F4F5FA via semantic-color-bg-dim, radius 20, padding 24
        typography: outer TitleSection -> card title -> row label/value
        wrapping: label max 1 line, value max 1 line
        overflow: right value may ellipsize; never fixed 80px value column
      vocabularyDecision:
        reuse: PageStackContents + TitleSection + ListText(non-table)
        hold: ListText.table because current value column is fixed 80px
        new: RQRContentsDetail for the Figma ogn-contents-detail card contract
      content:
        sectionTitle: "이 정보로 가입이 완료됐어요"
        cardTitle: "가입 정보"
        rows:
          - label: "회원 ID"
            value: "wooseong****"
          - label: "가입일"
            value: "2026년 4월 30일 (수)"
          - label: "자동 로그인"
            value: "이 기기에서 30일 유지"

    SectionDivider(thickness="section")

    OGN: ogn-mbr-signup-benefit-notice
      role: benefit
      pattern: complete
      layoutStrategy:
        widthTier: section-369
        stack: card vertical
        alignment: leading
        typography: card title -> body
        wrapping: body max 3 lines
        overflow: keep visible in scroll content; never hidden by ActionBar
      vocabularyDecision:
        reuse: Callout if text budget fits
        new?: RQRBenefitNotice if title/body tone or action slots are required
      content:
        title: "혜택"
        body: "신규 가입 첫 달 멤버십 무료 혜택이 자동 적용되었어요. 사용 내역은 내정보에서 확인할 수 있어요."
  ActionBar
    OGN: ogn-mbr-complete-actions
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
        - secondary: "내정보 확인"
        - primary: "홈으로 가기"
```

## Layout Distortion Gate

`summary` section은 Figma SOT `node 12285:9074 / ogn-contents-detail` 기준으로 아래 조건을 통과해야 구현으로 넘어간다.

- value column fixed 80px 금지. 현재 `ListText.table`은 `.list-text--table-on .list-text__primary { flex: 0 0 var(--spacing-80); }` 구조라 긴 value를 담기에 부적합하다.
- summary card는 `PageStackContents` content slot 안의 369px card이며, card 내부 padding은 24px이다.
- summary card surface는 Figma SOT처럼 `#F4F5FA` 배경과 radius 20을 가진다.
- summary header는 외부 `TitleSection("이 정보로 가입이 완료됐어요")`와 내부 card title `가입 정보`로 분리한다. Card 내부는 단일 title만 받으며, 이 화면에서는 card subtitle을 사용하지 않는다.
- card header bottom spacing은 16px이다.
- row는 `ListText` 기본 모드처럼 left label flex-grow, right value auto width, gap 16을 따른다.
- label과 value는 max 1 line을 기본 예산으로 하며, 긴 value는 right item 영역에서 ellipsis 처리한다.
- `본인`, `활성` 같은 상태 보조값은 Figma SOT에 없는 별도 right item으로 추가하지 않는다.
- benefit card는 scroll content 안에서 ActionBar에 가려지지 않아야 한다.
- route-level raw padding, margin, width, font-size로 정렬을 보정하지 않는다.

## Section Specs

| section | title | primary components | policy |
| --- | --- | --- | --- |
| `intro` | `환영합니다, 우주에 오신 걸` | `PageStackContents`, `TitleMain(type="complete")` | POL-MBR-SIGNUP-COMPLETE (TBD) |
| `summary` | `이 정보로 가입이 완료됐어요` | `PageStackContents`, `TitleSection`, `RQRContentsDetail`, `ListText(non-table)` | POL-MBR-SIGNUP-SUMMARY (TBD) — 가입 결과 회원 ID·가입일·자동 로그인 노출 |
| `benefit` | (제목 없음) | `PageStackContents`, `SectionItem`, `Callout` | POL-MBR-BENEFIT-FIRSTMONTH (TBD) — 신규 가입 첫 달 멤버십 무료 자동 적용 |

## Action Contract

| element | label | variant | role | policy |
| --- | --- | --- | --- | --- |
| Primary CTA (우측) | `홈으로 가기` | `primary` | 기본 동선 — 가입 완료 후 홈으로 진입 | POL-MBR-SIGNUP-COMPLETE (TBD) |
| Secondary CTA (좌측) | `내정보 확인` | `secondary` | 보조 동선 — 가입 정보 상세 확인 | POL-MBR-SIGNUP-COMPLETE (TBD) |

- 완료 화면은 뒤로가기 금지. AppBar leading은 `닫기(X)`로 통일하고, 닫기 시 홈 진입을 default로 한다 (Open Question 참고).
- `ActionButton.actions` 순서는 `[secondary, primary]` — Figma 2-button 패턴은 우측이 primary.

## State Rules

- 완료 직후 진입하는 정적 화면이므로 본문 상태 분기는 없음.
- `자동 로그인` 값(`이 기기에서 30일 유지` / `활성`)은 가입 직후 세션 정책에서 파생된 표시값.

## Implementation Contract

- Use `@pxds/cx-components` for `AppBar`, `ActionButton`, `Callout`, `Icon`, `RQRContentsDetail`, `SectionItem`, `StatusBar`, `TitleMain`, `TitleSection`.
- Use `PageStackContents(title=TitleSection("이 정보로 가입이 완료됐어요")) + RQRContentsDetail(title="가입 정보")` for the `summary` section, following Figma `node 12285:9074`. Keep `ListText.table` on hold for this screen because its current value column is fixed 80px.
- Use `@pxds/cx-layout/components` for `AppScreen`, `PageStackContents`, `SectionDivider`, `SinglePrimaryAction`.
- Do NOT import `@pxds/pxds-components/*` (deprecated legacy) and `@pxds/pxds-icons` (deprecated legacy).
- Do NOT reuse `@/organisms/legacy-mbr/*`. 본 화면은 단순 조립으로 충분하므로 Screen.tsx에서 직접 조립한다 (CX-EXAMPLE 방식과 동일). 별도 organism이 필요할 만큼 의미 단위가 무거워지면 `@/organisms/mbr/`에 CX 어휘로 신설한다.
- Progress 정보(5/5, 100%)는 시각 컴포넌트로 표현하지 않고 `TitleMain.titleSubText`에 자연어로 흡수한다.
- `AppScreen.Content`가 유일한 scroll owner.
- 2-CTA는 반드시 `ActionButton`으로 표현한다. `Button` 2개를 `SinglePrimaryAction` 안에 나열하면 spacing/순서 contract가 깨진다.
- Section 사이는 `SectionDivider(thickness="section")` 외 다른 wrapper로 구분하지 않는다.

## Open Questions

1. **policy ref 채번** — 현재 legacy 화면이 정책 ref를 들고 있지 않다. policy-core에서 가입 완료/혜택 안내/자동 로그인 정책 ID를 부여하는 작업은 별도 트랙. 다이어그램에는 TBD로 표기.
2. **AppBar 닫기(X) onClick 목적지** — 완료 화면의 '닫기'가 (a) 홈 진입 (b) 외부 trigger 복귀 중 어디로 가야 하는지 정책 확인 필요. 기본은 (a) 홈 진입.
3. **summary 데이터 출처** — 회원 ID(`wooseong****`), 가입일, 세션 만료(30일) 값을 가입 응답 어디서 가져오는지. 실제 데이터 wiring은 본 변환 범위 밖.
4. **자동 로그인 "활성" 라벨 의미** — 우측 `rightItem.text="활성"`이 단순 상태 표시인지, 토글 진입점인지. 단순 표시면 현 다이어그램대로, 토글 진입이면 `rightItem.type="textButton"` 또는 별도 sheet 전환이 필요.
5. **혜택 Callout 시각 강조** — `Callout`은 현재 tone variant가 없음(`callout.variants.ts`). 긍정/혜택 톤을 시각적으로 분리할 필요가 있다면 Callout에 tone variant를 신설하거나 다른 어휘를 도입할지 결정 필요. 임시로 기본 Callout 사용.
