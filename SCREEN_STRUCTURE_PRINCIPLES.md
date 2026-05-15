# Screen Structure Principles

모바일 화면과 `Screen.diagram.md`를 만들 때 먼저 적용하는 구조 원칙이다. 정책서와 Figma SOT를 읽은 뒤 곧바로 구현으로 가지 않고, 제한된 layout vocabulary로 화면의 뼈대를 먼저 정리한다.

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

`Screen.diagram.md`는 픽셀 좌표표가 아니다. 구현 전에 화면의 의미 구조를 확인하는 계약이다.

- 먼저 `AppScreen`의 `SystemHeader`, `Header`, `Content`, `Bottom` slot을 나눈다.
- 본문은 section 단위로 나누고, 각 section의 `title`, `content`, `action`, `body` slot을 이름으로 기록한다.
- section 사이의 구분은 route margin이 아니라 `SectionDivider` 같은 pattern node로 표현한다.
- 입력 필드 묶음은 개별 field 좌표가 아니라 `FieldStack` 같은 stack composition으로 표현한다.
- 하단 CTA는 본문 마지막 section이 아니라 `Bottom` 또는 `action-area`로 분리한다.
- 버튼, 배지, 아이콘, 라디오/체크 같은 기초 component는 route에 직접 흩뿌리지 않고 `Pattern` 또는 `Organism`의 이름 있는 slot 안에 둔다.
- component 후보는 Diagram 단계에서 `reuse` 또는 `new`로 결정한다. 기존 `@pxds/cx-components/components/*`, `@pxds/cx-components/candidate/*`, `@pxds/pxds-layout` pattern으로 표현 가능하면 `reuse`로 기록한다.
- `new`로 분기한 component만 `RQR{Name}` / `rqr-{name}` 식별자를 사용해 `packages/cx-components/src/candidate`에 둔다.
- 정책 근거는 해당 section 또는 OGN node에 붙인다.

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

## 설계 체크리스트

구현 전 Diagram 단계에서 아래를 확인한다.

1. 화면이 `AppScreen -> Content -> Section -> Slot` 흐름으로 설명되는가?
2. 새 wrapper 없이 기존 `PageStackContents`, `FieldStack`, `SinglePrimaryAction`, `SectionDivider`, `Slot` 조합으로 표현 가능한가?
3. route-level raw spacing 없이 layout package의 pattern contract로 표현되는가?
4. Figma bridge가 읽을 수 있도록 layer, slot, auto-layout 의도가 남는가?
5. 정책 필수 정보와 CTA가 정확한 section 또는 action-area에 연결되는가?
6. 기초 component가 `Pattern` 또는 `Organism` slot 안에 배치되어 화면 의미 단위가 보존되는가?
7. component 후보가 `reuse` 또는 `new`로 분기되었고, `new` candidate는 `RQR{Name}` / `rqr-{name}` 규칙을 따르는가?

## 관련 문서

- `SCREEN_GENERATION_FLOW.md` — SB 기반 스크린 생성 workflow
- `DESIGN_FOUNDATION.md` — foundation token SOT
- `DESIGN_PATTERNS.md` — 화면 pattern SOT
- `SPACING_PATTERNS.md` — 화면·컴포넌트 spacing 실측 운영 규칙
- `packages/pxds-layout/docs/simple-page-structure-insight.md` — 실제 케이스에서 얻은 상세 기록
- `packages/pxds-layout/docs/figma-attribute.md` — Figma bridge attribute contract
