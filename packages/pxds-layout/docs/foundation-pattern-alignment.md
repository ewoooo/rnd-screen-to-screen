# pxds-layout foundation/pattern alignment plan

## 목적

`@pxds/pxds-layout`은 단순한 화면 wrapper나 scroll utility가 아니라, `DESIGN_FOUNDATION.md`와 `DESIGN_PATTERNS.md`의 물리적 화면 계약을 강제하는 layout runtime이어야 한다.

정책서 기반 모바일 스크린 생성 시스템에서 layout package가 맡아야 할 책임은 세 가지다.

1. 정책 의미를 담은 화면 구조가 route마다 같은 방식으로 조립되도록 한다.
2. foundation token의 spacing, radius, color, typography 기준을 raw style 없이 쓰게 한다.
3. pattern guide의 393px viewport, 369/361/329 너비 rail, header/bottom chrome, overlay contract를 API로 고정한다.

## 현재 간극

현재 `pxds-layout`은 `AppScreen`, `ContentOutlet`, `ContentSection`, `ContentRail`, `BottomSheet`, low-level primitives를 제공한다. 화면 뼈대는 있으나 디자인 SOT의 핵심 규칙을 충분히 강제하지 못한다.

- 393 -> 369 / 361 -> 329 화면 너비 rail이 명명된 API가 아니라 padding/inset 조합으로 표현된다.
- `StatusBar 59px + AppBar 48px = 107px` header contract가 layout API에 고정되어 있지 않다.
- `BottomNavigation(88)`과 `ActionButton(102)`의 이분법을 막거나 표현하는 bottom zone API가 없다.
- Figma 계층의 `PageStackContents`, `PageStackList + Divider(393x4)` 반복 패턴이 공식 layout composition으로 정리되어 있지 않다.
- BottomSheet는 WDS modal wrapper에 가까우며, handle/title/content/action/scroll contract가 부족하다.
- Popup runtime이 없다.
- primitives가 `CSSProperties` 기반 raw spacing/style을 넓게 허용한다.
- token 이름이 새 foundation 문서의 semantic token 체계와 완전히 정렬되어 있지 않다.

## Figma Text Section 확인값

실제 페이지 목업 SOT인 [SKT GenUI Test 0512 / Text Section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_GenUI_Test_0512?node-id=14627-15206&t=MXbXJQlMpLVcgIv3-1)을 기준으로, 이 문서는 아래 구조를 직접 대응해야 한다.

### 확인된 화면 유형

- `완료_개통`: completion 화면, `ActionButton` 393x154
- `완료_요금제 변경`: completion 화면, `ActionButton` 393x108
- `상세_정보 입력_인풋`: form entry 화면, `PageStackContents + Divider(393x4)` 반복

### 확인된 layout contract

| 영역 | Figma 값 | layout 해석 |
| --- | --- | --- |
| Viewport | 393px width | `AppScreenRoot viewport="iphone-393"` 기준 |
| Header | `StatusBar 61 + AppBar 56 = 117` | GenUI Text Section header preset 필요 |
| PageStackContents | 393px full width | page-level section frame |
| ContentsTitle | x=12, width 369, y=32 | section rail + top inset 32 |
| TitleMain / TitleSection | x=20 inside 369, width 329 | inner rail |
| ContentsSlot | x=12, width 369 | section rail slot |
| SectionItem | width 369 | slot item wrapper |
| content slot | x=20, width 329 | inner rail for ListText/TextField/CheckBox |
| Divider | 393x4 | full-bleed section divider |
| ActionButton default | 393x108 | top 12 + button 56 + bottom 40 |
| ActionButton with text | 393x154 | text row + gap 12 + button 56 + bottom 40 |

### 중요한 차이

기존 pattern guide에는 header가 `StatusBar 59 + AppBar 48 = 107`로 정리되어 있다. Text Section 목업은 `61 + 56 = 117`을 사용한다. 따라서 `pxds-layout`은 하나의 숫자를 전역 상수로 박기보다, 화면 역할에 따른 semantic preset을 제공해야 한다. 수치는 preset 내부 contract로 숨기고 route API에는 드러내지 않는다.

```ts
type HeaderPreset = "standard" | "form-entry";
```

`standard`는 일반 패턴 기준 header이고, `form-entry`는 form/detail 입력 화면에서 사용하는 header chrome이다. legacy `pattern-107`, `genui-text-section-117` 값은 compatibility alias로만 남긴다.

## 개선 원칙

- 화면 route가 `padding`, `margin`, `position: fixed`, raw width로 기준선을 보정하지 않게 한다.
- 디자인 문서의 반복 수치와 패턴을 컴포넌트 props가 아니라 layout vocabulary로 승격한다.
- WDS Component는 deprecated로 보고, 기존 호환이 필요한 영역만 package boundary 안에 격리한다.
- low-level escape hatch는 남기되, 이름과 import 경로에서 위험성이 드러나게 한다.
- pattern compliance는 구현 편의가 아니라 생성 시스템의 품질 관리 장치로 본다.

## 우선순위

### P0. 화면 너비 rail과 spacing token API

Foundation, pattern, spacing 문서에서 가장 강하게 반복되는 기준은 `393 -> 369 / 361 -> 329` 너비 체계다.

필요한 API 후보:

- `ContentFrame variant="page|section|content|inner"`
- `ContentRail rail="full|section|content|inner|bottom-sheet-title|bottom-sheet-content"`
- `PageBleed`, `SectionRail`, `InnerRail`
- `SpacingToken`, `LayoutSpacingToken`, `InnerSpacingToken`
- `gap="component-md"`처럼 semantic spacing name만 받는 prop

기대 효과:

- `x=12`, `x=16`, `x=20`, `x=32` 기준선을 route에서 직접 padding으로 만들지 않는다.
- card/list/form/detail 화면이 같은 width contract를 공유한다. 369px는 section/card/list group, 361px는 일반 content/form/detail, 329px는 inner content 기준선으로 사용한다.
- raw `var(--spacing-*)` 문자열 사용을 layout package 내부로 줄인다.

### P0. Bottom action zone contract

Pattern guide는 메인/브라우즈 화면의 `BottomNavigation(88)`과 상세/폼 화면의 `ActionButton(102)`을 동시에 쓰지 않는다고 명시한다. Text Section 목업에서는 CX `ActionButton` 계열이 108px 또는 154px 높이로 확인된다.

필요한 API 후보:

- `AppScreen.BottomNavigation`
- `AppScreen.ActionBar`
- `bottomKind="navigation|action|none"`
- `actionBarPreset="compact-action|default-action|guided-action|primary-cta"`
- bottom kind에 따른 content bottom padding 자동 계산
- dev mode warning: navigation/action 동시 사용 감지

기대 효과:

- CTA와 GNB의 역할이 route마다 섞이지 않는다.
- 하단 고정 영역 높이가 화면별 임의 padding으로 보정되지 않는다.
- `ActionButton` 자체의 시각 구현은 `@pxds/cx-components`가 맡고, `pxds-layout`은 action zone 높이와 scroll boundary를 맡는다.

예상 사용:

```tsx
<AppScreen.ActionBar preset="guided-action">
  <ActionButton text="사진이나 연락처, 앱도 새 휴대폰으로 한 번에 옮겨볼까요?" />
</AppScreen.ActionBar>
```

### P0. PageStackContents / PageStackList / section divider layout

상세, 폼, 완료 화면의 기본 구조는 Figma에 명명된 `PageStackContents + SectionItem + Divider(393x4)` 반복이다. 공식 공개 vocabulary는 Figma 명칭과 맞춘 `PageStackContents`와 실제 content rail을 닫는 `SectionItem`이어야 하며, 일반화된 `PageStack` 패턴은 마이그레이션 중 내부 호환 또는 임시 별칭으로만 남기고 최종적으로 제거한다.

`PageStackList`는 진짜 list-page layout contract가 필요할 때만 사용한다. 실제 `상세_정보 입력_인풋` 프레임은 `PageStackContents -> SectionItem`으로 충분하므로, form/detail 화면에 관성적으로 `PageStackList`를 끼우지 않는다. `@pxds/cx-components`에 있는 `PageStackList`는 기존 소비자를 위한 deprecated bridge로만 취급하고, 신규 화면과 마이그레이션 대상은 `@pxds/pxds-layout`의 Figma-named composition을 사용한다.

필요한 API 후보:

- `PageStackContents`
- `PageStackList`
- `ScreenSection`
- `SectionDivider thickness="section|hairline"`
- `SectionItem` 또는 `SlotItemFrame`

기대 효과:

- `ContentsTitle -> TitleSection`, `ContentsSlot -> item` 구조가 화면마다 같은 이름으로 드러난다.
- 4px full-bleed section divider와 1px inner divider를 구분한다.
- SDUI 슬롯 패턴을 route별 markup 관습이 아니라 layout contract로 만든다.
- `cx-components`의 bridge 구현과 실제 layout contract 소유 위치가 분리되어, 소비자가 `pxds-layout` API로 이동할 수 있다.

Text Section의 Figma 계층은 아래처럼 표현할 수 있어야 한다.

```tsx
<PageStackContents title={<TitleSection />}>
  <SectionItem>
    <TextField />
  </SectionItem>
</PageStackContents>
<SectionDivider thickness="section" />
```

이 구조에서 `PageStackContents`는 393px section root와 title slot을 소유하고, `SectionItem`은 실제 콘텐츠의 329px inner rail을 담당한다. 여러 field가 연속될 때만 `FieldStack` 같은 작은 composition을 `SectionItem` 안에 둔다. 기존 `PageStack.*` 형태는 이 구조로 수렴하기 전의 내부/임시 API로 본다.

### P0. Overlay, BottomSheet, Popup contract

BottomSheet와 Popup은 pattern guide에서 별도 섹션으로 정의된 핵심 overlay다. BottomSheet는 runtime shell과 composition slot을 함께 안정화해야 하고 Popup은 blocking overlay pattern으로 관리한다.

BottomSheet API 후보:

- `BottomSheet.Frame`
- `BottomSheet.Handle`
- `BottomSheet.Title`
- `BottomSheet.Content`
- `BottomSheet.Action`
- `BottomSheet.ScrollArea`
- title rail x=32, width 329
- content rail x=20, width 353 또는 자식 component contract
- max height와 fixed action zone

Popup API 후보:

- `PopupRoot`
- `PopupBackdrop`
- `PopupContent`
- `PopupTitle`
- `PopupActions`
- width 361, x=16, radius 24
- 1-button / 2-button action layout

기대 효과:

- dim overlay color, radius, handle, action zone이 foundation/pattern 기준으로 고정된다.
- content item이 많을 때 bottom sheet로 전환해야 하는 UX rule을 문서화하거나 dev warning으로 연결할 수 있다.

### P1. Header chrome contract

Pattern guide는 `StatusBar(59) + AppBar(48) = 107`을 화면 구조의 기본으로 둔다. Text Section 목업은 `StatusBar(61) + AppBar(56) = 117`을 사용한다. 상품 상세는 overlay header로 콘텐츠 위에 고정된다.

필요한 API 후보:

- `AppScreen.SystemHeader` height contract 재정의
- `AppScreen.AppBarSlot` 또는 `ChromeHeader`
- `headerMode="normal|overlay|transparent|sticky"`
- `headerPreset="standard|form-entry"`
- product detail용 overlay header layer
- `StatusBar` token/color/height 정렬

기대 효과:

- StatusBar와 AppBar가 화면마다 다른 높이로 재현되지 않는다.
- overlay header가 route의 `position: fixed` 스타일로 만들어지지 않는다.
- Figma 목업 재현과 pattern guide 기준을 둘 다 표현하면서, route raw height 보정을 막는다.

### P1. Horizontal scroll lane

Chips, carousel, card lane은 full width 영역 안에서 section 기준선으로 시작하는 horizontal scroll 패턴을 갖는다.

필요한 API 후보:

- `HorizontalLane inset="section|inner|none"`
- `CarouselRail`
- scroll padding, first item offset, hidden scrollbar 표준화
- peek/first-card 노출 규칙

기대 효과:

- Chips와 carousel의 x=12 시작점이 route마다 다르게 구현되지 않는다.
- 가로 스크롤 UI의 scrollbar, padding, overflow 처리가 일관된다.

### P1. AppScreenRoot viewport contract

Pattern guide의 기준 viewport는 393px width다. root는 preview/mobile/capture에서 같은 기준을 가져야 한다.

필요한 API 후보:

- `AppScreenRoot viewport="iphone-393"`
- CSS variables: `--pxds-screen-width`, `--pxds-screen-height`
- stable root selector와 data attributes
- capture/export mode를 위한 metadata

기대 효과:

- preview, mobile, Figma capture가 같은 root geometry를 공유한다.
- 393px 기준 수치가 CSS 곳곳에 흩어지지 않는다.

### P1. Foundation / spacing pattern 정렬

현재 코드에는 기존 token name과 새 foundation 문서의 token name, 그리고 실측 spacing 운영값이 섞일 수 있다. layout package는 compatibility layer를 제공해야 한다.

필요한 작업:

- `styles.css`에 layout semantic variables 선언
- old token -> foundation token alias 정리
- `space/*`, `spacing/layout/*`, `spacing/inner/*` 매핑 table 추가
- `SPACING_PATTERNS.md`의 component/screen 실측값과 layout semantic rail 매핑 table 추가
- overlay/radius token mapping 추가

기대 효과:

- foundation 문서가 바뀌어도 route와 screen code의 변경 범위를 줄인다.
- token 이름 혼재를 package boundary에서 흡수한다.
- `space/5` 같은 실측 예외가 route나 public token API로 새어 나가지 않는다.

### P2. Primitive escape hatch 축소

현재 `Box`, `Flex`, `VStack` 등은 `CSSProperties` 기반 props와 `style`을 넓게 허용한다. 생성 시스템 기준에서는 raw style 우회가 너무 쉽다.

필요한 API 후보:

- public primitive와 low-level primitive 분리
- `RawBox` 또는 `UnsafeBox`로 escape hatch 명명
- tokenized props 중심의 `Box`, `Stack`, `Grid`
- `position="fixed"` 같은 chrome 우회 사용 제한
- lint 또는 dev warning 후보 기록

기대 효과:

- 화면 route가 layout contract를 피해 임의 보정을 하기 어려워진다.
- 반복되는 raw style이 component vocabulary 보강 후보로 드러난다.

### P2. Pattern compliance dev checks

Layout package는 개발 중 생성 화면의 contract 위반을 알려줄 수 있어야 한다.

검사 후보:

- `BottomNavigation`과 `ActionBar` 동시 사용
- `AppScreen.Content` 밖 scroll container
- raw 369px/329px width 직접 지정
- section divider 없이 `PageStackContents`/`PageStackList` 반복
- Popup content item 과다
- pattern metadata 누락

기대 효과:

- 디자인 SOT 위반을 리뷰 이후가 아니라 구현 중에 발견한다.
- 생성 시스템의 품질 기준을 자동화할 수 있다.

## 권장 export 구조

전면 개선 후에는 import 경로도 책임 단위로 나눈다.

```txt
@pxds/pxds-layout
@pxds/pxds-layout/components
@pxds/pxds-layout/components/primitives
@pxds/pxds-layout/components/compositions
@pxds/pxds-layout/components/contents
@pxds/pxds-layout/components/chrome
@pxds/pxds-layout/components/overlays
@pxds/pxds-layout/components/patterns
@pxds/pxds-layout/primitives
@pxds/pxds-layout/styles.css
```

예상 모듈:

- `components`: AI와 신규 화면이 기본으로 소비하는 layout component barrel
- `components/chrome`: root, system header, app header, content, bottom zone
- `components/contents`: content slot shapes such as `PageStackContents`, `ListContents`, `TabsContents`
- `components/compositions`: repeated layout assemblies such as `FieldStack`, `PageStackList`, `SinglePrimaryAction`
- `components/overlays`: overlay layout components such as `BottomSheet`, `Popup`
- `components/patterns`: SOT-derived repeated layout patterns such as `SectionDivider`
- `components/primitives`: tokenized box/stack/grid/slot primitives

기존 `app-screen`, `patterns`, `overlays`, `bottom-sheet` shim export는 제거한다. 신규 화면과 자동 생성은 책임 단위 export인 `@pxds/pxds-layout/components/{chrome,contents,compositions,overlays,patterns,primitives}`를 우선한다.

## 마이그레이션 순서 제안

1. Foundation spacing/radius/color alias와 3단 rail API를 먼저 추가한다.
2. `AppScreen.Bottom`을 bottom kind 기반 API로 확장하고 기존 API는 compatibility로 유지한다.
3. `PageStackContents`, `PageStackList`, `ScreenSection`, `SectionDivider`를 `pxds-layout`에 추가해 Text Section의 completion/form 화면부터 적용한다.
4. `headerPreset`과 `actionBarPreset`을 semantic preset으로 추가해 `standard/form-entry`, `compact-action/default-action/guided-action/primary-cta` 차이를 route raw style 없이 표현한다.
5. BottomSheet compound API를 재정의하고 Popup runtime을 추가한다.
6. Header overlay mode와 horizontal lane을 추가한다.
7. `cx-components`의 `PageStackList`는 deprecated bridge로 표시하고 소비자를 `pxds-layout`의 `PageStackList`로 이동시킨다.
8. 임시/internal `PageStack` API를 제거하거나 비공개 경계로 내린다.
9. primitives의 raw style escape hatch를 줄이고 dev checks를 추가한다.
10. `apps/mobile`의 대표 화면 한두 개를 새 API로 옮겨 pattern coverage를 검증한다.

## 완료 기준

- 주요 화면 패턴(Form, List, Detail, Main, Completion, BottomSheet, Popup)을 route raw spacing 없이 조립할 수 있다.
- 393/369/329 기준선이 layout API 이름으로 표현된다.
- header 107/117, bottom navigation 88, action bar 102/108/154, divider 4px, bottom sheet x=32, popup x=16 규칙이 package에 모인다.
- Text Section의 `PageStackContents -> ContentsTitle -> ContentsSlot -> SectionItem -> inner content` 계층을 `pxds-layout`의 공식 Figma-named layout API로 표현할 수 있다.
- `cx-components`의 `PageStackList`는 deprecated bridge로 남고, 신규 소비자는 `pxds-layout`의 `PageStackList`를 사용한다.
- 신규 화면에서 WDS Component를 기본 어휘로 선택하지 않아도 된다.
- `DESIGN_FOUNDATION.md`와 `DESIGN_PATTERNS.md`의 반복 규칙이 code review 체크리스트가 아니라 layout runtime contract로 내려온다.
