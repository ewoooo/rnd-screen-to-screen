# @pxds/cx-layout

화면/frame/layout runtime과 반복 pattern contract를 소유한다. `apps/mobile`의 screen root, scroll, sticky chrome, bottom-sheet, popup/layout overlay, primitive layout, screen export bridge는 이 패키지 경계 안에 둔다. iframe 기반 preview helper는 preview 앱 내부 책임이다.

`@pxds/cx-layout`은 `@pxds/pxds-components`를 의존하지 않는다. bottom-sheet처럼 layout runtime 자체에 필요한 WDS primitive는 이 패키지 경계에서 직접 흡수해서 `@pxds/pxds-components ↔ @pxds/cx-layout` 순환을 만들지 않는다.

## AppScreen compound API

`AppScreen`은 모바일 화면의 물리적 레이어 순서를 코드에 드러내는 compound API를 기본 사용한다. 새 화면과 리팩터 대상은 `top` / `bottom` prop보다 아래 구조를 우선한다.
`apps/mobile`의 route는 이 compound 구조를 사용한다.

```tsx
<AppScreen>
  <AppScreen.SystemHeader />
  <AppScreen.Header>
    <ProgressTopBar />
  </AppScreen.Header>
  <AppScreen.Content>
    <Hero />
    <SectionCard />
  </AppScreen.Content>
  <AppScreen.Bottom>
    <PrimaryCTABar />
  </AppScreen.Bottom>
</AppScreen>
```

레이어 순서:

```txt
AppScreen
  ├─ SystemHeader  // 시스템 상태바. 시간, 배터리, 신호
  ├─ Header        // 앱/글로벌 상단 chrome
  ├─ Content       // 유일한 scroll content flow
  └─ Bottom        // 앱/글로벌 하단 chrome
```

`cx-layout`은 `Component -> Pattern -> Organism -> Screen` 중 `Pattern` 레이어를 주로 소유한다. `Button`, `Badge`, `Icon`, 선택 컨트롤 같은 기초 component를 직접 새로 만들지 않고, `@pxds/cx-components`의 public surface를 pattern slot 안에 배치할 수 있게 한다.

### 레이어 책임

- `AppScreen.SystemHeader` — OS/디바이스 레벨 표시 영역이다. 내부에서 `StatusBar`를 렌더하며 children을 받지 않는다. 앱 도메인 header와 섞지 않는다.
- `AppScreen.Header` — 앱 레벨 상단 chrome이다. 전역 네비게이션, 진행 상단바, 검색 상단, 탭 묶음이 들어간다.
- `AppScreen.Content` — 화면 본문 흐름이다. 내부는 `ContentOutlet` + `ContentList`가 소유하며, direct content item gap은 `var(--spacing-4)`로 고정된다.
- `AppScreen.Bottom` — 앱 레벨 하단 chrome이다. CTA, 구매바, GNB처럼 화면 하단 flow를 차지하는 영역이 들어간다.

### 사용 규칙

- `SystemBottom`은 두지 않는다. 실제 필요가 생기기 전까지 시스템 하단 영역을 API로 만들지 않는다.
- `ProgressTopBar` 같은 글로벌 header organism은 `StatusBar`를 내부에 렌더하지 않는다. 새 compound 화면의 시스템 헤더는 항상 `<AppScreen.SystemHeader />`로 표현한다. legacy `systemHeader` prop은 기존 renderer 호환용이다.
- 화면 route에서 상단/하단 chrome을 `position: fixed` 또는 `absolute`로 직접 만들지 않는다.
- `Header`와 `Bottom`은 각자 내부 flow를 가질 수 있다. 예를 들어 검색 화면은 `Header` 안에 검색바와 탭을 함께 둘 수 있고, 상품 화면은 `Bottom` 안에 구매바와 GNB를 함께 둘 수 있다.
- `Content` 밖에는 scrollable content를 두지 않는다. 본문 기준선, bleed, readable measure는 `ContentSection`과 `ContentRail`로 표현한다.
- 기존 `top` / `bottom` prop은 renderer와 legacy route 호환용이다. 새 코드에서는 compound slot을 우선한다.

## Content API

- `ContentOutlet` — 스크롤 영역과 기본 좌우 inset을 소유한다.
- `ContentList` — `AppScreenContent` 내부 direct content item gap을 `var(--spacing-4)`로 통일한다.
- `ContentSection` — 섹션 경계. 일반 섹션은 Outlet padding을 상속하고, frame까지 확장해야 하는 영역만 `inset="bleed"`로 기록한다.
- `ContentRail` — bleed/full-width 표면 안에서 내부 콘텐츠 기준선을 복귀시킨다. caption/body/title measure가 필요하면 rail measure를 사용한다.

화면이나 route가 margin/padding으로 콘텐츠 기준선을 직접 보정하면 실패다.

## Spacing / Grid Contract

- foundation token은 `DESIGN_FOUNDATION.md`를 따른다.
- 화면·컴포넌트 실측 운영 규칙은 `DESIGN_PATTERNS.md`의 layout/spacing contract를 따른다.
- 기본 화면 폭은 393px이다.
- 369px section/card rail은 `spacing/layout/section-horizontal` 의미다.
- 361px 일반 content rail은 `spacing/layout/content-horizontal` 의미다.
- 329px inner rail은 `spacing/layout/card-horizontal-pagestack` 의미다.
- `space/5` 같은 실측 예외는 layout public token으로 즉시 승격하지 않는다.
- route-level raw `margin`, `padding`, `position`, width 보정은 pattern contract 후보로 끌어올린다.

## BottomSheet

바텀시트 route는 `AppScreenRoot`로 화면 root를 만든 뒤 `BottomSheet` 합성 API를 사용한다.

```tsx
<AppScreenRoot>
  {background}
  <BottomSheet open>{sheetContent}</BottomSheet>
</AppScreenRoot>
```

- `BottomSheetRoot` — WDS Modal open state, focus trap, scroll lock
- `BottomSheetBackdrop` — WDS ModalDimmer 기반 backdrop
- `BottomSheetContent` — bottom container와 sheet content
- `BottomSheet` — Root + Backdrop + Content 합성 단축 API

규칙:

- `Backdrop` 철자를 사용한다. 오타 alias를 만들지 않는다.
- page에서 backdrop을 별도 absolute layer로 만들지 않는다.
- sheet content의 도메인 구조는 organisms/molecules가 맡고, modal/container/dimmer 책임은 이 패키지가 맡는다.

## Frame portal 기록

deprecated frame portal runtime은 남기지 않는다. preview가 iframe으로 격리되고 AppScreen 안에 여러 frame/root를 둘 계획이 없으므로 BottomSheet는 별도 `container` 지정 없이 WDS Modal 기본 렌더링에 맡긴다. body 기준 modal이 radius/clipping/scroll boundary를 실제로 깨거나 한 document 안에 여러 AppScreenRoot가 동시에 필요해질 때만 git history에서 frame context 패턴 복구를 검토한다.

## Primitives

`primitives`는 semantic spacing 어휘 강제용이다. WDS가 동등한 token-coupled layout primitive를 제공하지 않으므로 유지한다.

- Box
- Flex
- Float
- Grid
- HStack
- VStack

spacing prop은 `DESIGN_FOUNDATION.md`의 제한된 spacing token 어휘와 `DESIGN_PATTERNS.md`의 layout/spacing contract를 따른다.
