# Screen Structure Principles

> 이 문서는 `SCREEN_GENERATION_FLOW.md` Phase 3의 **구조 원칙·Diagram 작성 규칙·OGN별 layoutStrategy·Layout Distortion Gate** 책임을 단독 소유한다. 절차 문서는 이 규칙을 재서술하지 않고 이 문서를 가리킨다.

모바일 화면과 `Screen.diagram.md`를 만들 때 먼저 적용하는 구조 원칙이다. SB와 `Screen.map.md`의 정책 요구를 확인한 뒤 곧바로 구현으로 가지 않고, 제한된 layout vocabulary로 화면의 뼈대를 먼저 정리한다.

## 핵심 인사이트

실제 Figma SOT를 맞추며 확인한 중요한 사실은 화면 구조가 생각보다 단순하다는 점이다. 복잡한 좌표 배치나 화면별 wrapper를 늘리는 것보다, 아래 흐름을 일관되게 지키는 편이 재현성과 자동 생성 안정성이 높다.

```txt
Screen -> Chrome -> Section -> Slot -> Stack -> Component
```

컴포넌트 조립 레이어는 이 repo의 구현 어휘에 맞춰 아래처럼 해석한다. 외부 문서의 `Atom` 같은 클래스명은 직접 도입하지 않는다.

```txt
Component -> Pattern -> Organism -> Screen
```

- `Component`: `@pxds/cx-components`, `@pxds/cx-icons`, layout primitive가 제공하는 기초 UI 어휘다. `Button`, `Badge`, `Ico`, `RadioText`처럼 단독 시각 요소에 가까운 단위는 화면 route가 직접 배치하지 않는다.
- `Pattern`: `SinglePrimaryAction`, `PageStackContents`, `FieldStack`, `SectionDivider`, `PopupActionButton`처럼 반복 가능한 조합 계약이다. CTA, 리스트, 폼, 오버레이 액션은 pattern slot 안에서 조립한다.
- `Organism`: 정책 의미나 도메인 모듈 ID/OGN을 담는 화면 의미 단위다. `apps/mobile/src/organisms/<domain>/` 아래에 두며, 필요한 component와 pattern을 조합한다.
- `Screen`: `AppScreen` slot에 chrome, section, organism을 배치하는 지도다. 정책 의미와 화면 구조가 읽히는 수준까지만 책임진다.

이 구조는 다음 코드 구조로 대응된다.

```txt
AppScreen
  SystemHeader
  Header
  Content
    PageStackContents
      title slot
      content slot
        FieldStack
    SectionDivider
  Bottom
    SinglePrimaryAction
```

## Diagram 제작 원칙

`Screen.diagram.md`는 픽셀 좌표표가 아니다. 구현 전에 화면의 의미 구조를 확인하는 계약이다. 정책 요구와 사용자 copy는 `Screen.map.md` 를 참조하고, 이 문서는 그 요구를 어떤 AppScreen slot, section, OGN, component vocabulary로 조립할지만 판단한다. Phase 3에서는 먼저 유사한 `Screen Wire` reference를 찾고, 그 reference의 시각 구조와 밀도를 현재 화면에 적용할지 결정한다.

- Diagram은 아래 섹션 순서를 고정한다.
  1. `Screen Contract`
  2. `Screen Wire`
  3. `Section Contracts`
  4. `Policy / OGN Matrix`
  5. `Distortion Gates`
- `Screen Contract`에는 `wireReference`를 기록한다. 선택한 reference 경로, 유사하게 따른 부분, 의도적으로 따르지 않는 부분, reference 한계를 짧게 남긴다.
- Wire reference 후보는 `apps/mobile/src/screen-diagrams/`의 reference pack과 기존 구현 화면의 `Screen.diagram.md`에서 찾는다. list 화면은 `apps/mobile/src/screen-diagrams/skt-genui-test-0512/list-text`, detail/form 성격은 `apps/mobile/src/screen-diagrams/skt-genui-test-0512/detail-form`, complete/detail 성격은 가까운 converted screen diagram을 우선 후보로 본다.
- Wire reference는 AppScreen rail, section order, summary/list/search/filter zones, card density, CTA position, visible divider band 같은 시각 구조만 참고한다. 정책 필수 정보, copy, 에러, CTA 의미는 `Screen.map.md` 기준으로만 확정한다.
- `reference-only`, `unknown-from-figma-only/TBD`, `unknown/unregistered-from-figma` 값은 policy ID, OGN ID, route 계약, copy 근거로 승격하지 않는다.
- 먼저 `AppScreen`의 `SystemHeader`, `Header`, `Content`, `Bottom` slot을 나눈다.
- `Screen Wire`는 실제 화면처럼 읽히는 ASCII wire로 작성한다. 상태바, 앱바, 본문 copy, 카드/목록/필드/CTA를 화면에 보이는 형태로 묘사하고, 주요 의미 영역에는 `[intro]`, `[terms]`, `[actions]` 같은 section id를 붙인다.
- `Screen Wire`에는 AppScreen의 물리 slot rail을 반드시 표시한다. `├─Header─┤`, `├─Content─┤`, `├─Bottom─┤`를 사용해 생성 에이전트가 chrome, scroll body, fixed action zone을 즉시 구분하게 한다.
- 실제 화면에 section divider band가 있으면 `├══Divider══...┤`로 명시한다. `Divider`는 독립 section id를 갖지 않고, 앞뒤 section의 시각적 boundary evidence로 취급한다.
- 본문은 section 단위로 나누고, 각 section의 `title`, `content`, `action`, `body` slot을 이름으로 기록한다.
- 각 OGN section마다 `layoutStrategy`를 별도로 기록한다. section의 역할, grid/padding tier, 텍스트 위계, 주요 content alignment, 허용되는 wrapping 범위, overflow 처리 방식을 먼저 결정한다.
- section 사이의 구분은 route margin이 아니라 `SectionDivider` 같은 pattern node로 표현한다.
- 입력 필드 묶음은 개별 field 좌표가 아니라 `FieldStack` 같은 stack composition으로 표현한다.
- 하단 CTA는 본문 마지막 section이 아니라 `Bottom(preset="...")`으로 분리한다. `AppScreen.Bottom`이 표준 물리 slot이며, `AppScreen.ActionBar`는 같은 bottom slot의 런타임 호환 alias로만 본다. 신규 diagram 표준에는 `AppScreen.ActionBar`를 쓰지 않는다.
- 버튼, 배지, 아이콘, 라디오/체크 같은 기초 component는 route에 직접 흩뿌리지 않고 `Pattern` 또는 `Organism`의 이름 있는 slot 안에 둔다.
- component 후보는 Diagram 단계에서 `reuse` 또는 `new`로 결정한다. 먼저 wire reference에서 유사 section/part를 찾고, 그 다음 기존 `@pxds/cx-components/components/*`, `@pxds/cx-components/candidate/*`, `@pxds/cx-layout` pattern, 기존 organism으로 표현 가능하면 `reuse`로 기록한다.
- `new`로 분기한 component만 `RQR{Name}` / `rqr-{name}` 식별자를 사용해 `packages/cx-components/src/candidate`에 둔다.
- 정책 근거는 `Screen.map.md` 에서 확정한 요구사항을 기준으로 해당 section 또는 OGN node에 붙인다.

### Pattern Analysis Gate

이 gate는 `Screen Wire`를 작성한 직후, `Section Contracts`를 확정하기 전에 통과한다. 목적은 큰 화면 패턴만 맞고 micro pattern이 흐려지는 일을 막는 것이다. 특히 `FieldStack` 간격, contents divider, section divider band, 카드 내부 row separator, field action slot을 서로 대체하지 않는다.

각 section contract에는 아래 판단을 남긴다.

```txt
patternEvidence:
  sectionBoundary: none | SectionDivider | contentsDivider | cardBoundary
  fieldGrouping: none | single | FieldStack | FieldStackWithDividers
  rowSeparators: none | Divider(type="contents") | Divider(type="section")
  actionPlacement: none | Content | Bottom(preset="primary-cta") | inline field action
patternDecision:
  reuse: PageStackContents + FieldStack + SectionDivider
  or reuse: FieldStackWithDividers candidate composition
  or new: RQR{Name} / new organism candidate
  reason: visible evidence and layout contract
```

- 실제 화면에 4px section band가 있으면 `sectionBoundary: SectionDivider`로 기록하고 `Screen Wire`에는 `├══Divider 4px / ...══┤`로 표시한다.
- 같은 section 내부 row 사이 1px 선이 보이면 `rowSeparators: Divider(type="contents")`로 기록한다. 이를 `FieldStack` gap만으로 대체하지 않는다.
- 입력 필드가 같은 의미 그룹 안에서 `TextField -> Divider -> TextField`로 보이면 `fieldGrouping: FieldStackWithDividers` 또는 신규 pattern 후보로 기록한다.
- `TextField`의 우측 버튼처럼 필드 안에 들어가는 action은 `actionPlacement: inline field action`으로 기록한다. 별도 외부 버튼으로 분리하지 않는다.
- evidence가 불분명하면 `patternDecision.reason`에 보류 사유를 남기고, 구현 단계에서 임의로 divider를 추가하거나 제거하지 않는다.

### Screen Wire 문법

`Screen Wire`는 정확한 픽셀/토큰/컴포넌트 판정표가 아니다. 사람이 실제 화면을 먼저 이해하고, 생성 에이전트가 AppScreen slot과 section boundary를 놓치지 않게 하는 진입점이다.

```txt
┌─AppScreen───────────────────────────────┐
├─Header──────────────────────────────────┤
│ 9:41                              ▮▮▮  │
│ ‹  가입자 정보 입력                     │
├─Content─────────────────────────────────┤
│ [phone]                                 │
│ 기기변경 휴대폰 번호                    │
│ ┌─────────────────────────────────────┐ │
│ │ 010-1234-5678                       │ │
│ └─────────────────────────────────────┘ │
├══Divider════════════════════════════════┤
│ [summary]                               │
│ 이 정보로 가입이 완료됐어요             │
│ 가입 정보                               │
│ 선택 약정 할인 금액        78,650원     │
├─Bottom──────────────────────────────────┤
│ [actions]                               │
│ ┌─────────────────────────────────────┐ │
│ │                 다음                │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

- `Header`는 `StatusBar + AppBar` 또는 `ProgressAppBar` 같은 상단 chrome을 포함한다.
- `Content`는 scrollable body의 시작을 나타낸다.
- `Bottom`은 `Bottom(preset="...")` 계약으로 연결한다.
- `Divider`는 실제 렌더되는 section divider band가 있을 때만 쓴다. 단순 문서 가독성용 선은 `Divider`로 표기하지 않는다.
- `Screen Wire`에 등장한 section id는 모두 `Section Contracts`에 있어야 한다.

### Wire Reference 기록 형식

`Screen Contract`에는 아래 항목을 포함한다.

```txt
- wireReference:
  - source: apps/mobile/src/screen-diagrams/.../<semantic-name>.diagram.md
  - matchedParts: AppScreen rail, summary card density, filter chips, dated list rows
  - intentionalDifferences: policy-required error copy adds a notice section
  - limitation: reference-only visual structure; policy/copy/OGN ids come from Screen.map.md and Screen.config.ts
```

- 유사 reference가 없으면 `source: none-found`로 적고, `matchedParts` 대신 `reason`을 남긴다.
- Reference의 visual part를 그대로 쓰더라도 실제 section id와 OGN id는 현재 화면의 정책/도메인 기준으로 다시 붙인다.

## OGN별 Layout Strategy

다이어그램은 OGN을 단순 나열하지 않고, 각 OGN이 기존 component vocabulary로 안정적으로 조립 가능한지까지 판단해야 한다. 신규 component 필요 여부는 시각 취향이 아니라 layout contract 충족 여부로 결정한다.

각 OGN section은 아래 항목을 포함한다.

```txt
OGN: ogn-...
  role: hero | summary | form | notice | benefit | list | action
  pattern: complete | detail | form | list | bottom-sheet | popup
  layoutStrategy:
    widthTier: full-bleed | section-369 | content-361 | inner-329
    padding: DESIGN_FOUNDATION spacing token 또는 SPACING_PATTERNS tier
    stack: vertical | horizontal | key-value | grid | scroll-x
    alignment: leading | center | trailing | split
    typography: title/body/caption 위계
    wrapping: 제목/본문/값별 maxLines 또는 wrap 금지 사유
    overflow: truncate | multiline | scroll | split row | new component
  vocabularyDecision:
    reuse: component/pattern 이름
    new: RQR{Name}
    reason: 정책 의미, 상태, slot, Figma bridge identity, layout contract 중 충족 실패 항목
```

### Reuse / New 판단 순서

1. 현재 화면의 pattern, section role, AppScreen slot 구조가 가까운 wire reference를 찾는다.
2. Reference의 유사 section/part가 기존 component, layout pattern, 기존 organism으로 구현 가능한지 확인한다.
3. 구현 가능하면 `vocabularyDecision.reuse`에 reference part와 실제 component/pattern 이름을 함께 기록한다.
4. Slot, wrapping, state, Figma bridge identity, 정책 의미 중 하나가 맞지 않아 layout contract가 깨지면 `vocabularyDecision.new`로 `RQR{Name}` candidate 또는 신규 organism을 기록한다.

### Layout Distortion Gate

아래 중 하나라도 발생하면 기존 컴포넌트 조합 reuse로 확정하지 않는다. 먼저 OGN 내부 layoutStrategy를 바꾸고, 그래도 해결되지 않으면 어휘 부족으로 보고 신규 candidate 또는 pattern 보강을 검토한다.

- 같은 section 안에 `항목명 -> 값/상태` 행이 2개 이상 반복되면 surface 유무와 관계없이 key-value group으로 분류한다. 카드형 summary만 key-value가 아니다.
- 같은 section 안에서 title, subtitle, body의 위계가 시각적으로 뒤섞인다.
- key-value, table, summary row에서 label/value column이 서로 침범하거나 기준선이 흔들린다.
- 긴 정책 문장 때문에 CTA, card, bottom action, 다음 section을 가린다.
- 중요한 값이 과도하게 wrap되어 사용자가 한눈에 비교해야 하는 정보의 행 구조가 무너진다.
- 2열 또는 split layout에서 한쪽 텍스트가 2줄 이상으로 늘어나 다른 행과 높이 리듬이 깨진다.
- 하단 fixed action과 scroll content가 겹치거나, action 위의 마지막 section이 잘린다.
- route-level padding, negative margin, raw width, 임의 fontSize로만 정렬 문제가 해결된다.
- existing component에는 필요한 slot 이름이 없어 의미 없는 wrapper나 빈 spacer가 추가된다.

이 gate는 디자인 세부 조정 단계가 아니라 Diagram 검증 단계에서 통과해야 한다. 화면이 뒤틀릴 가능성이 있으면 구현으로 넘어가지 않는다.

## 금지 신호

아래 상황이 보이면 구조를 다시 단순화한다.

- route에서 `margin`, `padding`, `position`, raw width로 Figma 기준선을 보정한다.
- 같은 화면 안에 비슷한 역할의 wrapper가 여러 개 겹친다.
- section title과 content의 책임이 OGN 내부와 layout wrapper에 중복된다.
- 하단 CTA가 scroll content와 bottom chrome 사이에서 애매하게 섞인다.
- 새 component가 필요해 보이지만 실제로는 기존 slot 이름이 부족한 상태다.
- `reuse` 판단 없이 신규 candidate를 만들거나, 신규 candidate에 `RQR` 식별자가 없다.
- 기초 component가 Screen route에 직접 배치되어 CTA, 선택지, 안내, 상태의 소유자가 불명확하다.

## Primitive 사용 방식

`Box`, `VStack`, `Slot`은 시각을 새로 만드는 도구가 아니다. 기존 CSS contract를 보존하면서 DOM에 layout 의미를 부여하는 얇은 syntax sugar다.

안전한 적용 방식:

- 기존 className과 variant CSS는 유지한다.
- 직접 `div + flex column` 구조는 `VStack`로 흡수한다.
- wrapper는 `Box`로, 이름 있는 내부 영역은 `Slot`으로 표현한다.
- `data-figma-layout-kind`, `data-figma-layout-layer`, `data-figma-layout-slot`을 함께 남긴다.

## 추천 Diagram 형태

```txt
AppScreen
  SystemHeader
    StatusBar
  Header
    OGN: ogn-... / AppBar or ProgressTopBar
  Content
    PageStackContents
      title: TitleSection
      content:
        FieldStack
          TextField
          TextField
      policy: POL-...
    SectionDivider
    PageStackContents
      title: TitleSection
      content:
        reuse: Callout
        or new candidate: RQRNotice
      policy: POL-...
  Bottom
    SinglePrimaryAction
      ActionButton
      policy: POL-...
```

### 완료 화면 Diagram 예시

완료 화면은 상단 완료 메시지, 가입/신청 결과 요약, 혜택/안내, 하단 action이 서로 다른 OGN 전략을 가진다. 각 section을 같은 stack으로 밀어 넣지 않는다.

```txt
AppScreen
  SystemHeader
    StatusBar
  Header
    OGN: ogn-mbr-complete-header
      pattern: complete
      layoutStrategy:
        widthTier: content-361
        stack: vertical
        alignment: leading
        typography: progress caption -> display title -> body
        wrapping: title max 2 lines, body max 2 lines
      vocabularyDecision:
        reuse: AppBar + TitleMain inside complete hero organism
  Content
    OGN: ogn-mbr-signup-summary
      role: summary
      pattern: complete
      layoutStrategy:
        widthTier: content-361
        stack: key-value
        alignment: split
        typography: section title -> caption title -> row value/label
        wrapping: row label max 1 line, row value max 2 lines
        overflow: split row when value is long; do not compress label column
      vocabularyDecision:
        reuse: key-value summary organism
        new: RQRSummaryKeyValue if existing list vocabulary cannot hold multiline values without column drift
      policy: POL-MBR-...
    OGN: ogn-mbr-withdraw-impact-list
      role: impact-summary
      pattern: form-entry
      layoutStrategy:
        widthTier: content-361
        stack: key-value
        alignment: left label flex / right status auto
        typography: section title -> row label/status
        wrapping: row label max 1 line, row status max 1 line
        overflow: status labels stay short; secondary policy copy needs a new row/body slot
      vocabularyDecision:
        reuse: ListText(non-table, rightItem=badge) when right side is categorical status
        reuse: ListText(non-table, rightItem=text) when right side is literal value
        new: RQRKeyValueList if secondary text, badges, or multiline values are required
      policy: POL-MBR-...
    SectionDivider
    OGN: ogn-mbr-complete-benefit
      role: benefit
      pattern: complete
      layoutStrategy:
        widthTier: section-369
        stack: vertical
        alignment: leading
        typography: card title -> body
        wrapping: body max 3 lines or collapsible/scroll handoff
        overflow: keep card height inside scroll content; never hide behind Bottom
      vocabularyDecision:
        reuse: Callout/CardSection if text budget fits
        new: RQRBenefitNotice if card needs title/body/action slots not present
  Bottom
    SinglePrimaryAction
      secondary: TextButton or ActionButton
      primary: ActionButton
      layoutStrategy:
        widthTier: content-361
        stack: horizontal
        wrapping: button label max 1 line
```

## 설계 체크리스트

구현 전 Diagram 단계에서 아래를 확인한다.

1. 화면이 `AppScreen -> Content -> Section -> Slot` 흐름으로 설명되는가?
2. 새 wrapper 없이 기존 `PageStackContents`, `FieldStack`, `SinglePrimaryAction`, `SectionDivider`, `Slot` 조합으로 표현 가능한가?
3. route-level raw spacing 없이 layout package의 pattern contract로 표현되는가?
4. Figma bridge가 읽을 수 있도록 layer, slot, auto-layout 의도가 남는가?
5. 정책 필수 정보와 CTA가 정확한 section 또는 `Bottom(preset="...")`에 연결되는가?
6. 기초 component가 `Pattern` 또는 `Organism` slot 안에 배치되어 화면 의미 단위가 보존되는가?
7. `Screen Contract`에 `wireReference`가 있고, reference-only 한계와 의도적 차이가 기록되었는가?
8. component 후보가 wire reference 탐색 이후 `reuse` 또는 `new`로 분기되었고, `new` candidate는 `RQR{Name}` / `rqr-{name}` 규칙을 따르는가?
9. 각 section에 `patternEvidence`와 `patternDecision`이 있으며, section divider와 contents divider, field gap과 row separator를 혼동하지 않았는가?
10. 각 OGN section에 `layoutStrategy`가 있고, alignment/text hierarchy/wrapping/overflow 예산이 명시되어 있는가?
11. Layout Distortion Gate를 통과했는가? 통과하지 못했다면 reuse 판단을 보류하고 신규 candidate 또는 pattern 보강 후보를 기록했는가?

## 관련 문서

- `SCREEN_GENERATION_FLOW.md` — SB 첨부 기반 스크린 생성 5페이즈 절차 계약 SOT
- `DESIGN_FOUNDATION.md` — foundation token SOT
- `DESIGN_PATTERNS.md` — 화면 pattern SOT
- `SPACING_PATTERNS.md` — 화면·컴포넌트 spacing 실측 운영 규칙
- `packages/cx-layout/docs/simple-page-structure-insight.md` — 실제 케이스에서 얻은 상세 기록
- `packages/cx-layout/docs/figma-attribute.md` — Figma bridge attribute contract
