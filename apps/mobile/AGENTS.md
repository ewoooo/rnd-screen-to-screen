# apps/mobile

Active 모바일 화면 렌더러다. route는 화면을 조립하고, 실제 layout/chrome/scroll 계약은 `@pxds/pxds-layout`, 최신 컴포넌트 어휘는 `@pxds/cx-components`, 최신 icon 어휘는 `@pxds/cx-icons`, token은 `@pxds/cx-tokens`를 통과한다. `@pxds/pxds-components`와 `@pxds/pxds-icons`는 deprecated legacy 호환 경계로만 다룬다. 앱은 로컬 `src/components`를 소유하지 않는다.

## 화면 구조

- 화면 route는 `src/app/(mbr)/<screen>/page.tsx`, `src/app/(legacy-mbr)/<screen>/page.tsx`처럼 route group으로 분리한다.
- 버전 폴더(`v?-?`)를 만들지 않는다.
- 인덱스(`/`)는 `src/scripts/screen-routes`의 route catalog를 읽어 화면 목록을 보여준다.
- mock은 화면 재현용 임시 입력이며 API 연결 시 교체한다.
- `src/scripts/screen-routes`는 screen route catalog와 조회/분류 helper를 카테고리별 파일로 둔다. 파생 목록은 소비처에서 필요한 기준으로 만든다. route config 공용 타입은 `@pxds/pxds-spec`의 `ScreenRouteConfig`를 사용한다.

## Current / Legacy 경계

- Current reference는 MBR이다: `src/app/(mbr)/NOVA-MBR-PG-*` page가 실제 React DOM을 직접 그리는 구조를 기준으로 삼는다. MBR organism은 `src/organisms/mbr`의 React 컴포넌트로 표현한다.
- Legacy MBR은 보존된 membership 비교군이다: `src/app/(legacy-mbr)/LEGACY-MBR-PG-*`, `src/organisms/legacy-mbr/*`는 React DOM 기준으로 남기되 신규 기준으로 승격하지 않는다.
- MBR과 legacy-mbr을 제외한 legacy route는 삭제되어야 한다.
- `@screen/mobile/screens`는 `src/scripts/screen-routes/index.ts`를 통해 route catalog와 조회/분류 helper만 노출한다.

## 화면 조립 규칙

일반 route는 `AppScreen` compound API를 우선 사용한다.

```tsx
<AppScreen>
  <AppScreen.SystemHeader />
  <AppScreen.Header>
    <ProgressTopBar />
  </AppScreen.Header>
  <AppScreen.Content>
    {content}
  </AppScreen.Content>
  <AppScreen.Bottom>
    <PrimaryCTABar />
  </AppScreen.Bottom>
</AppScreen>
```

- route는 fixture/spec을 읽고 `@pxds/pxds-layout` templates와 `@pxds/cx-components` public surface를 우선 배치한다. 기존 화면 호환이 필요한 경우에만 deprecated `@pxds/pxds-components`를 제한적으로 사용한다.
- screen에서 WDS `Card`, `Button`, `Chip`, `Typography` 등을 직접 대량 조합하지 않는다.
- route에서 `position: fixed`, `absolute bottom: 0`로 chrome을 만들지 않는다. 상단은 `Header`, 하단은 `Bottom`에 올린다.
- scroll content는 `AppScreen.Content`가 소유한다. 화면별 별도 scroll container를 만들지 않는다.
- content direct item gap은 `ContentList`가 소유한다.
- 기본 inset은 `ContentOutlet`, section boundary/bleed는 `ContentSection`, bleed 내부 기준선 복귀와 readable measure는 `ContentRail`을 사용한다.
- 신규 화면은 `DESIGN_FOUNDATION.md`, `DESIGN_PATTERNS.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`, `SCREEN_GENERATION_FLOW.md`를 함께 조회한다.
- 361px 일반 콘텐츠 폭은 `spacing/layout/content-horizontal`, 369px section/card 폭은 `spacing/layout/section-horizontal`, 329px 내부 콘텐츠 폭은 `spacing/layout/card-horizontal-pagestack` 의미로 해석한다.
- `space/5`처럼 실측 예외로만 등장한 값은 route에서 새 token처럼 확장하지 않는다. 필요한 경우 컴포넌트 실측 evidence로 남기고 token 승격은 foundation에서 결정한다.

## 컴포넌트 계층

```txt
Component
  ↓
Pattern
  ↓
Organism
  ↓
Screen
```

- `Component` — `@pxds/cx-components`, `@pxds/cx-icons`, tokenized layout primitive가 제공하는 기초 UI 어휘다. `Button`, `Badge`, `Icon`, 선택 컨트롤처럼 단독 시각 요소에 가까운 단위는 screen route에 직접 흩뿌리지 않는다.
- `Pattern` — `@pxds/pxds-layout`과 CX compound가 제공하는 반복 조합 계약이다. CTA, list, form, popup/bottom sheet action은 pattern slot 안에서 조립한다.
- `Organism` — 정책 의미, 도메인 모듈 ID, OGN을 담는 앱 소유 의미 단위다.
- `Screen` — `AppScreen` slot에 chrome, section, organism을 배치하는 지도다.
- `@pxds/cx-components` — 최신 CX component vocabulary와 구현 surface. 신규 component/pattern 후보의 기준이다.
- `@pxds/pxds-components` — deprecated legacy PXDS/WDS adapter. 기존 화면 호환 또는 migration reference가 필요할 때만 제한적으로 사용한다.
- `@pxds/cx-icons` — 최신 CX icon vocabulary와 React `Icon` wrapper 기준이다.
- `@pxds/pxds-icons` — deprecated legacy WDS icon adapter. 기존 화면 호환 또는 migration reference가 필요할 때만 제한적으로 사용한다.
- `domains/<domain>` — 현재 모바일 소비 기준에서는 별도 도메인 컴포넌트를 두지 않는다. MBR과 legacy-mbr의 화면별 의미 구조는 앱 organism이 소유한다.
- `src/organisms/mbr` — MBR 화면 영역 React 컴포넌트. MBR OGN은 page가 실제 DOM으로 조립하는 화면 어휘이며 render-tree registry를 소유하지 않는다.
- `src/organisms/legacy-mbr` — 보존된 membership legacy 화면 영역 React 컴포넌트. 신규 구조의 기준으로 삼지 않는다.
- 신규/legacy 모두 organism render-tree registry를 소유하지 않는다.
- `templates` — 화면 슬롯과 렌더링 컨텍스트. 실체는 `@pxds/pxds-layout/components/chrome`, `@pxds/pxds-layout/components/overlays`.
- 화면 route가 `Button`, `Badge`, `RadioButton`, `CheckBox`, `Icon` 같은 기초 component를 직접 나열해야 한다면 먼저 `Pattern` 또는 `Organism` slot으로 올릴 수 있는지 검토한다.

허용 import:

- screen → `@pxds/pxds-layout/*`, `@pxds/cx-components`, `@/organisms/{mbr,legacy-mbr}`
- legacy compatibility only → `@pxds/pxds-components/*`
- app organism → `@pxds/cx-components`, `@pxds/pxds-layout/*`, `@pxds/cx-icons`
- CX component internals → `@pxds/cx-tokens`, `@pxds/cx-icons`, 필요한 primitive

금지 import:

- home ↔ product 같은 도메인 교차 import
- 앱 아래에 `src/components` 또는 component shim을 다시 만들기
- 신규 screen/organism에서 WDS primitive 또는 deprecated `@pxds/pxds-components`를 직접 대량 사용
- 신규 screen/organism에서 deprecated `@pxds/pxds-icons`를 새 icon 기준으로 사용

## 승격 규칙

1. `@pxds/cx-components`에서 최신 어휘와 소유 패키지를 확인한다. `@pxds/pxds-components/registry`는 deprecated legacy 참고로만 본다.
2. 먼저 기존 molecules/shared-global 조합으로 표현 가능한지 본다.
3. 부족하면 앱 organism 경계에서 의미 구조를 분리할 수 있는지 본다.
4. 같은 조합이 반복되면 `@pxds/cx-components` vocabulary 승격 후보로 기록한다.
5. 도메인 이름과 데이터 구조가 필요한 부분은 현재 앱 organism에 두고, 재사용 계약이 확정될 때만 패키지 승격을 검토한다.
6. 기존 컴포넌트에 새 variant/slot을 추가하기 전에 더 일반적인 molecule 축이 있는지 검토한다.

## 검증

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`
