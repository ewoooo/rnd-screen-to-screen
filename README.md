# PXDX Screen System

PXDX는 제한된 토큰과 컴포넌트 어휘만으로 모바일 화면 스펙을 일관되게 조립할 수 있는지 검증하는 디자인 시스템 실험입니다. 화면을 하나씩 예쁘게 만드는 것보다, 화면 수가 늘어나도 spacing, component vocabulary, pattern contract가 무너지지 않는지를 확인합니다.

## Apps And Packages

```txt
.
├── apps/
│   ├── mobile/   실제 모바일 화면 route와 WDS/PXDS 화면 조립
│   └── preview/  모바일 화면과 컴포넌트 registry를 확인하는 브라우저 프리뷰 셸
└── packages/
    ├── cx-tokens/               CX DS 기반 token SSOT
    ├── pxds-icons/                WDS icon adapter와 icon registry
    ├── pxds-layout/               AppScreen, content layout, bottom-sheet, layout primitives
    ├── pxds-components/           core adapter, atoms, molecules, shared/global component vocabulary
    ├── pxds-spec/                 screen route/config와 kind 같은 UI 비의존 spec 타입
    ├── pxds-figma/                Figma bridge/hooks/export 관련 도구
    ├── pxds-figma-bridge-plugin/  Figma bridge plugin artifact
    └── policy-core/               Policy / UseCase 순수 문서 도메인
```

책임 방향은 아래 흐름을 기본으로 둡니다.

```txt
@pxds/cx-tokens
  -> @pxds/pxds-icons
  -> @pxds/pxds-layout
  -> @pxds/pxds-components
  -> apps/mobile

apps/mobile/screens -> apps/preview
@policy/core -> @pxds/pxds-spec
```

`apps/mobile`은 실제 화면 DOM 조립의 기준입니다. `apps/preview`는 mobile의 route catalog와 component registry를 읽어 화면과 어휘를 확인하는 도구입니다. 공통 런타임 책임은 packages로 분리하되, 화면별 의미 구조는 앱의 page와 organism에 남깁니다.

## Screen Structure

화면은 route, screen, organism, package component가 분리된 구조를 사용합니다.

```txt
apps/mobile/src/app/(mbr)/NOVA-MBR-PG-001-0/
├── page.tsx          Next route entry. Screen을 감싸는 얇은 wrapper
├── Screen.tsx        화면 DOM 조립의 기준
├── Screen.config.ts  route catalog용 화면 설정
└── index.ts          screen module export
```

현재 화면 그룹은 두 축으로 나눕니다.

- `mbr`: `NOVA-MBR-PG-*` current reference 화면
- `legacy-mbr`: `LEGACY-MBR-PG-*` membership legacy 비교군

`@screen/mobile/screens`는 `apps/mobile/src/scripts/screen-routes`를 통해 route catalog와 조회 helper만 공개합니다. 페이지의 실제 UI 조립은 각 screen 폴더와 `apps/mobile/src/organisms/{mbr,legacy-mbr}`가 소유합니다.

## Component Structure

컴포넌트 계층은 아래처럼 둡니다.

```txt
WDS primitive
  -> @pxds/pxds-components/core
  -> atoms
  -> molecules + shared/global
  -> apps/mobile organisms
  -> screen/page
```

- `core`: WDS component adapter와 global CSS 진입점입니다.
- `atoms`: `TextBlock`, `Divider`, `Placeholder` 같은 최소 단위입니다.
- `molecules`: 모바일이 실제 소비하는 도메인 독립 조합입니다. 예: `FormField`, `SelectableList`, `ConsentList`, `PrimaryCTABar`, `TextFieldList`.
- `shared/global`: 여러 화면에서 공유하는 flow/chrome 성격의 컴포넌트입니다. 예: `ProgressTopBar`, `FlowHero`, `FlowNotice`, `FlowSummaryCard`.
- `organisms`: MBR 또는 legacy-mbr 화면 영역의 의미 구조입니다. 현재 앱이 소유하며 package registry로 올리지 않습니다.
- `screen/page`: route 단위의 최종 화면 조립입니다.

새 컴포넌트가 필요할 때는 먼저 기존 token, layout primitive, molecule로 표현 가능한지 확인합니다. 반복되는 조합이 확인될 때만 package component로 승격합니다.

## CX DS Porting Status

| Area | Status | Note |
| --- | --- | --- |
| Token | 완료 | `@pxds/cx-tokens`에서 token registry와 CSS export를 SSOT로 관리합니다. |
| Component | 기초 엘리먼츠 전환중 | WDS adapter, atoms, 모바일에서 실제 소비하는 molecules/shared-global 중심으로 정리 중입니다. |

현재는 token 기반을 먼저 고정하고, component vocabulary를 모바일 화면에서 실제로 쓰이는 어휘 위주로 좁히는 단계입니다.
