# PXDX Screen System

PXDX는 정책서 기반 모바일 화면을 제한된 토큰, 컴포넌트 어휘, 레이아웃 패턴으로 일관되게 조립할 수 있는지 검증하는 디자인 시스템 실험입니다. 화면을 하나씩 예쁘게 만드는 것보다, 화면 수가 늘어나도 정책 충실도, spacing, component vocabulary, pattern contract가 무너지지 않는지를 확인합니다.

## Apps And Packages

```txt
.
├── apps/
│   ├── mobile/   정책 기반 모바일 화면 route와 PXDS/CX 화면 조립
│   └── preview/  모바일 화면과 컴포넌트 registry를 확인하는 브라우저 프리뷰 셸
└── packages/
    ├── cx-tokens/                CX DS token-set SSOT, CSS variables, text style classes
    ├── cx-icons/                 CX DS icon originals, registry, React Icon wrapper
    ├── pxds-layout/               AppScreen, content layout, bottom-sheet, layout primitives
    ├── cx-components/             latest CX component package and inventory
    ├── pxds-spec/                 screen route/config와 kind 같은 UI 비의존 spec 타입
    ├── pxds-figma/                Figma bridge/hooks/export 관련 도구
    ├── pxds-figma-bridge-plugin/  Figma bridge plugin artifact
    └── policy-core/               Policy / UseCase / UX Governance 순수 문서 도메인
```

책임 방향은 아래 흐름을 기본으로 둡니다.

```txt
@pxds/cx-tokens
  -> @pxds/cx-icons
  -> @pxds/cx-components
  -> @pxds/pxds-layout
  -> apps/mobile

apps/mobile/screens -> apps/preview
@policy/core -> @pxds/pxds-spec
```

`apps/mobile`은 실제 화면 DOM 조립의 기준입니다. `apps/preview`는 mobile의 route catalog와 component registry를 읽어 화면과 어휘를 확인하는 도구입니다. 공통 런타임 책임은 packages로 분리하되, 화면별 의미 구조는 앱의 page와 organism에 남깁니다.

## Screen Structure

화면은 route, screen, organism, pattern, package component가 분리된 구조를 사용합니다. 신규 화면은 루트 SOT 문서를 함께 조회합니다.

```txt
DESIGN_FOUNDATION.md
DESIGN_PATTERNS.md
SPACING_PATTERNS.md
SCREEN_STRUCTURE_PRINCIPLES.md
SCREEN_GENERATION_FLOW.md
```

```txt
apps/mobile/src/app/(mbr)/NOVA-MBR-PG-001-0/
├── page.tsx          Next route entry. Screen을 감싸는 얇은 wrapper
├── Screen.tsx        화면 DOM 조립의 기준
├── Screen.config.ts  route catalog용 화면 설정
└── index.ts          screen module export
```

현재 화면 그룹은 두 축으로 나눕니다.

- `mbr`: `NOVA-MBR-PG-*` current reference 화면
- `legacy-converted-mbr`: `LEGACY-MBR-PG-*-CX` membership legacy CX 전환 비교군

`@screen/mobile/screens`는 `apps/mobile/src/scripts/screen-routes`를 통해 route catalog와 조회 helper만 공개합니다. 페이지의 실제 UI 조립은 각 screen 폴더와 `apps/mobile/src/organisms/mbr`가 소유합니다.

## Component And Layout Structure

컴포넌트와 레이아웃 계층은 아래처럼 둡니다. 외부 디자인 문서의 `Atom` 같은 분류명은 직접 도입하지 않고 repo 어휘로 정규화합니다.

```txt
Component -> Pattern -> Organism -> Screen
```

- `Component`: `@pxds/cx-components`, `@pxds/cx-icons`, tokenized layout primitive가 제공하는 기초 UI 어휘입니다.
- `Pattern`: `@pxds/pxds-layout`의 `AppScreen`, `PageStackContents`, `FieldStack`, `SinglePrimaryAction`, `SectionDivider`, overlay/action slot 같은 반복 조합 계약입니다.
- `Organism`: 정책 의미와 도메인 OGN을 담는 앱 소유 의미 단위입니다.
- `Screen`: `AppScreen` slot에 chrome, section, organism을 배치하는 지도입니다.
- `@pxds/cx-components`: 최신 CX component package입니다. 신규 화면/컴포넌트 제작의 기준 어휘입니다.
- `@pxds/cx-icons`: 최신 CX icon package입니다. 신규 icon vocabulary와 React `Icon` wrapper의 기준입니다.
- `organisms`: MBR 화면 영역의 의미 구조입니다. 현재 앱이 소유하며 package registry로 올리지 않습니다.
- `screen/page`: route 단위의 최종 화면 조립입니다.

새 컴포넌트가 필요할 때는 먼저 기존 token, layout primitive, molecule로 표현 가능한지 확인합니다. 반복되는 조합이 확인될 때만 package component로 승격합니다.

기초 component(`Button`, `Badge`, `Icon`, 선택 컨트롤 등)는 화면 route에 직접 흩뿌리지 않고 pattern 또는 organism slot 안에서 사용합니다. spacing은 `DESIGN_FOUNDATION.md`의 token을 기준으로 하며, 실제 화면/컴포넌트 적용값은 `SPACING_PATTERNS.md`의 운영 규칙을 따릅니다.

## CX DS Porting Status

| Area | Status | Note |
| --- | --- | --- |
| Token | CSS Variable화 완료 | `@pxds/cx-tokens`가 Tokens Studio token-set을 SSOT로 두고 `tokens.css` CSS custom properties와 `text-styles.css` 합성 텍스트 스타일 클래스를 생성합니다. |
| Icon | 최신 패키지 기준 | 신규 icon vocabulary는 `@pxds/cx-icons`를 기준으로 합니다. 삭제된 legacy icon adapter import를 새로 추가하지 않습니다. |
| Component | 최신 패키지 기준 | 신규 component vocabulary는 `@pxds/cx-components`를 기준으로 합니다. 삭제된 legacy component adapter import를 새로 추가하지 않습니다. |

현재는 token 기반을 먼저 고정하고, component vocabulary를 모바일 화면에서 실제로 쓰이는 어휘 위주로 좁히는 단계입니다.
