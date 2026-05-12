# apps/mobile

Active WDS 모바일 화면 렌더러다. route는 화면을 조립하고, 실제 layout/chrome/scroll 계약은 `@pxds/pxds-layout`, 컴포넌트 어휘는 `@pxds/pxds-components`, icon은 `@pxds/pxds-icons`, token은 `@pxds/pxds-tokens`를 통과한다. 앱은 로컬 `src/components`를 소유하지 않는다.

## 화면 구조

- 화면 평탄 구조를 유지한다: screen은 `src/app/<screen>/page.tsx`, `meta.json`을 기준으로 한다.
- 버전 폴더(`v?-?`)를 만들지 않는다.
- 인덱스(`/`)는 hard-coded route 목록으로 둔다. registry generator에 의존하지 않는다.
- mock은 화면 재현용 임시 입력이며 API 연결 시 교체한다.
- `src/type`은 screen/render/organism 타입만 둔다.
- `src/scripts`는 검증/변환 함수만 둔다. `runtime`, `schema`, `lib` 같은 역할이 흐린 폴더를 다시 만들지 않는다.
- `src/registry`는 screen route/spec registry 생성물을 둔다.

## Current / Legacy 경계

- Current reference는 MBR이다: `src/app/NOVA-MBR-PG-*` page가 실제 React DOM을 직접 그리는 구조를 기준으로 삼는다. MBR organism은 `src/organisms/mbr`의 React 컴포넌트로 표현한다.
- Membership은 보존된 legacy 비교군이다: `src/app/LEGACY-MBR-PG-*`, `src/organisms/membership/*`는 React DOM 기준으로 남기되 신규 기준으로 승격하지 않는다.
- MBR과 membership을 제외한 legacy route는 삭제되어야 한다.
- `@screen/mobile/screens`는 `src/registry/screen-registry.ts`를 통해 route table을 노출한다. `referenceScreenRoutes`는 MBR만, `legacyScreenRoutes`는 보존된 membership만 포함한다.

## 화면 조립 규칙

일반 route는 `AppScreen` compound API를 우선 사용한다.

```tsx
<AppScreen>
  <AppScreen.SystemHeader />
  <AppScreen.Header>
    <GlobalNavigationHeader />
  </AppScreen.Header>
  <AppScreen.Content>
    {content}
  </AppScreen.Content>
  <AppScreen.Bottom>
    <GlobalNavigationBar />
  </AppScreen.Bottom>
</AppScreen>
```

- route는 fixture/spec을 읽고 `@pxds/pxds-layout` templates와 `@pxds/pxds-components/<domain>`를 배치한다.
- screen에서 WDS `Card`, `Button`, `Chip`, `Typography` 등을 직접 대량 조합하지 않는다.
- route에서 `position: fixed`, `absolute bottom: 0`로 chrome을 만들지 않는다. 상단은 `Header`, 하단은 `Bottom`에 올린다.
- scroll content는 `AppScreen.Content`가 소유한다. 화면별 별도 scroll container를 만들지 않는다.
- content direct item gap은 `ContentList`가 소유한다.
- 기본 inset은 `ContentOutlet`, section boundary/bleed는 `ContentSection`, bleed 내부 기준선 복귀와 readable measure는 `ContentRail`을 사용한다.

## 컴포넌트 계층

```txt
WDS primitive
  ↓
atoms
  ↓
molecules + domains/shared/global + domains/<domain>
  ↓
organism React components + templates + screen
```

- `atoms` — 도메인 없는 최소 부품. `@pxds/pxds-layout/primitives`, `@pxds/pxds-components/atoms/feedback`, `@pxds/pxds-components/atoms/typography`, `@pxds/pxds-components/core`, `@pxds/pxds-icons`.
- `molecules` — 도메인 독립 조합 패턴. `InfoList`, `SelectableList`, `ConsentList`, `PromoBlock`, `NoticeBlock`, `SectionCard`, `SummaryCard`, `ChipGroup`, `PrimaryCTABar`, `StickyActionBar` 등은 `@pxds/pxds-components/molecules`가 소유한다.
- `domains/shared/global` — 여러 화면이 공유하는 전역 chrome/flow section. `@pxds/pxds-components/shared/global`가 소유한다.
- `domains/<domain>` — 실제 React/Figma 인스턴스로 재사용되는 도메인 컴포넌트. `home`, `product`, `search`, `tu` 등은 `@pxds/pxds-components/<domain>`가 소유한다.
- `src/organisms/mbr` — MBR 화면 영역 React 컴포넌트. MBR OGN은 page가 실제 DOM으로 조립하는 화면 어휘이며 render-tree registry를 소유하지 않는다.
- `src/organisms/membership` — 보존된 membership legacy 화면 영역 React 컴포넌트. 신규 구조의 기준으로 삼지 않는다.
- 신규/legacy 모두 organism render-tree registry를 소유하지 않는다.
- `templates` — 화면 슬롯과 렌더링 컨텍스트. 실체는 `@pxds/pxds-layout/app-screen`, `@pxds/pxds-layout/bottom-sheet`.

허용 import:

- screen → `@pxds/pxds-layout/*`, `@pxds/pxds-components/<domain>`, `@pxds/pxds-components/molecules`, `@/organisms/{mbr,membership}`
- domain → molecules, shared/global, atoms, WDS core
- molecules → atoms, WDS core
- shared/global → molecules, atoms, WDS core
- atoms → WDS core 가능하지만 최소화

금지 import:

- molecules → domain
- home ↔ product 같은 도메인 교차 import
- atoms → molecules / shared/global / domain / templates
- 앱 아래에 `src/components` 또는 component shim을 다시 만들기
- screen에서 WDS primitive를 직접 대량 사용

## 승격 규칙

1. `@pxds/pxds-components/registry`에서 현재 어휘와 소유 패키지를 확인한다.
2. 기존 domain 컴포넌트로 표현 가능한지 본다.
3. 부족하면 먼저 molecules 조합으로 표현 가능한지 본다.
4. 같은 WDS 조합이 반복되면 `@pxds/pxds-components/molecules`로 승격한다.
5. 도메인 이름과 데이터 구조가 필요한 부분만 해당 domain에 둔다.
6. 기존 컴포넌트에 새 variant/slot을 추가하기 전에 더 일반적인 molecule 축이 있는지 검토한다.

## Figma capture

`layout.tsx`에는 Figma capture script가 들어갈 수 있다. `#figmacapture` hash가 붙은 경우에만 `.mobile-frame`을 `375×812`로 고정하는 capture mode를 허용한다. 일반 앱/프리뷰 동작에는 영향을 주지 않아야 한다.

## 검증

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`
