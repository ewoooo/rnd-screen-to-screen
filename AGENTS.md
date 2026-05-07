# pxdx

## 프로젝트 목표 — 디자인 시스템 strain test

**한정된 컴포넌트 어휘와 토큰만으로 다양한 화면 스펙(홈·검색·제품·결제 등)을 일관되게 표현할 수 있는지 검증한다.** 화면을 "예쁘게 만드는 것"이 1차 목표가 아니라, 화면이 늘어나도 시스템이 무너지지 않는지를 측정하는 것이 목표다.

회의에서 검증해야 하는 두 질문:
1. **간격 토큰 정규화 / 일관성** — spacing이 화면마다 임의로 늘었다 줄었다 하지 않는가?
2. **컴포넌트 규칙·패턴 일관성** — 다양한 페이지 스펙에서도 같은 컴포넌트 어휘로 표현되는가?

**규칙**: 반드시 제공된 토큰과 컴포넌트만 사용한다. 어휘에 없는 inline·자체 토큰·자체 fontSize가 강요되면 시스템 깨짐 신호.

## 문서 구조

```
.
├── apps/
│   ├── mobile/       Active WDS 모바일 화면 렌더러
│   └── preview/      shadcn 기반 브라우저 프리뷰 셸
├── packages/
│   ├── pxds-tokens/      `@pxds/pxds-tokens` — WDS theme 기반 토큰 SSOT
│   ├── pxds-icons/       `@pxds/pxds-icons` — WDS icon adapter + icon registry
│   ├── pxds-components/  `@pxds/pxds-components` — 순수 UI 컴포넌트 + `core/` WDS component re-export
│   ├── pxds-layout/      `@pxds/pxds-layout` — 화면/frame/layout runtime
│   ├── pxds-preview/     `@pxds/pxds-preview` — 모바일 iframe preview/helper
│   ├── pxds-figma/       `@pxds/pxds-figma` — Figma bridge/hooks/spec authoring
│   ├── policy-core/      `@policy/core` — Policy / UseCase 순수 문서 도메인
│   ├── policy-authoring/ `@policy/authoring` — 문서/정책서 → Screen 도출 추적
│   ├── screen-registry/  `@screen/registry` — 순수 Screen registry
│   ├── screen-specs/     `@screen/specs` — ScreenSpec / RenderableSpec + spec JSON
│   ├── screen-evaluation/`@screen/evaluation` — benchmark / audit / strain test
│   └── screen-catalog/   `@screen/catalog` — component vocabulary catalog
├── registry/         WDS/PXDS registry index — 컴포넌트 / 매핑 진입점
├── AGENTS.md         ← 이 파일 (운영 규약 + 시스템 메타)
├── DESIGN.md         디자인 스펙 (수치, 토큰, 어휘 variant SSOT)
└── CLAUDE.md         AGENTS.md symlink (Claude 도구 호환)
```

**디렉터리 이름 이력**: 2026-04-29 옛 `app2/`가 active 앱으로 승격되었고, 2026-04-30 `apps/mobile/`, `apps/preview/` 모노레포 구조로 정리됨. 2026-05-07 deprecated 앱 보존 디렉터리는 제거됨.

`AGENTS.md`(이 문서)와 `DESIGN.md` 둘만이 SSOT다. 세부 README/LAYOUT 같은 추가 .md는 두지 않는다 — 시스템 분산을 막는다.

## 시스템 어휘 (`apps/mobile` 현재 단계)

### 화면 셸
- `AppScreen` (`@pxds/pxds-layout/app-screen`) — 합성 스크린 API. `top` / `content` / `bottom` 슬롯을 받아 `AppScreenRoot` + `AppScreenContent`를 조합
- `AppScreenRoot` (`@pxds/pxds-layout/app-screen`) — 모바일 화면 내부 root. 디바이스 frame/radius/browser canvas는 `apps/preview`가 담당
- `AppScreenContent` (`@pxds/pxds-layout/app-screen`) — `top` / scroll content / `bottom` 배치 책임. top/bottom chrome은 항상 layout flow를 차지하며 content만 가운데에서 스크롤
- `ContentOutlet` (`@pxds/pxds-layout/app-screen`) — 스크롤 영역. 기본 좌우 inset은 `var(--spacing-12)`이며 `ContentSection`이 같은 inset context를 공유
- `ContentList` (`@pxds/pxds-layout/app-screen`) — `AppScreenContent` 내부 전용 콘텐츠 리스트. 모든 direct content item 간 gap은 `var(--spacing-4)`로 고정
- `ContentSection` (`@pxds/pxds-layout/app-screen`) — `ContentOutlet` 안의 섹션 경계. 일반 섹션은 Outlet padding을 상속하고, 가로 스크롤/bleed 영역만 `inset="bleed"`로 명시
- `ContentRail` (`@pxds/pxds-layout/app-screen`) — bleed/full-width 배경 안에서 내부 콘텐츠 기준선을 다시 맞추는 rail API. `rail="inset"`은 본문 기준선, `rail="measure"`는 caption/body/title 행폭 제한, `rail="full"`은 예외적 전체 폭

### 본문 흐름
- 화면 본문 흐름은 도메인별 list wrapper가 아니라 `AppScreenContent` 내부 `ContentList`가 소유한다
- 화면은 `Banner`, `HomeHeroBlock`, `HomeInfoBlock`, `SearchResultList` 같은 콘텐츠 항목을 `AppScreen` children으로 직접 나열한다

### 홈 블록 — compound + preset
`HomeBlock`은 홈 도메인의 compound root다. WDS `Card`를 직접 쓰되, 홈 카드 표면 토큰은 `@pxds/pxds-tokens`의 semantic/project token 또는 legacy compatibility alias로 소비한다.

- `HomeBlock.Root` — 홈 카드형 표면
- `HomeBlock.Header` — label/title/sub 헤더 슬롯
- `HomeBlock.Body` — 자유 본문 슬롯
- `HomeBlock.Action` — 홈 브랜드 CTA 슬롯

화면에서는 기본적으로 preset을 사용한다.

- `HomeActionPairBlock` — 기존 DualMenu 패턴
- `HomeInfoBlock` — 기존 StatCard / BarcodeCard / List 패턴
- `HomeHeroBlock` — 기존 Hero 패턴

`level={1|2|3}` 같은 숫자형 API는 사용하지 않는다. 슬롯 이름과 preset 이름이 화면 의미를 드러내야 한다. 수치는 [`DESIGN.md`](./DESIGN.md) 참조.

### 배너 — 정확히 2 variant
- `Banner variant="top"` — 상단 얇은 홍보 (h=48)
- `Banner variant="offering"` — 카드형 반투명 배너 (h=94)

### 텍스트
`@pxds/pxds-components/typography`의 `TextBlock`를 기본 사용한다. 내부는 WDS `Typography`이며, `variant`는 화면 의미 역할을 WDS `variant + weight` 조합으로 고정한다. `text`/`lines`, `maxLines`, `overflow="truncate"`로 모바일 줄바꿈 정책을 표현한다.

### 비-카드 부품
- `StatBadge` / `PillChip` (장식 wrap, `organisms/home/Badges.tsx`)
- `ListRow` (썸네일 + 타이틀/서브 + pill)
- `MyEditButton` (footer ghost 버튼)
- `Placeholder` (WDS `Thumbnail` 기반 미정 이미지·아이콘 자리)
- `Logo` / `Status*` (`@pxds/pxds-icons`) — 현재 필요한 프레임 아이콘만 React SVG로 보존. 일반 WDS icon도 같은 PXDS icon adapter로 소비
- `TextBlock` (`@pxds/pxds-components/typography`) — WDS `Typography` 기반 텍스트 primitive. `text`/`lines`, `maxLines`, `overflow="truncate"`로 모바일 줄바꿈 정책 표현

### 토큰
- **PXDS 토큰** — `@pxds/pxds-tokens`가 컴포넌트 스타일링에 쓰이는 런타임 시각 토큰 값의 SSOT다. 여기에는 color, spacing, typography scale, radius, shadow, opacity, surface, project extension token이 포함된다. 컴포넌트 어휘/slot/variant 계약의 SSOT는 AGENTS.md/DESIGN.md와 각 컴포넌트 API다.
- **레지스트리 원천** — 토큰 값의 원천은 `@pxds/pxds-tokens/registry/wds-token-registry.json`이다. generated CSS는 `@pxds/pxds-tokens/tokens.css`로 노출한다.
- **WDS theme 흡수** — WDS token/theme 값은 별도 alias 패키지로 분산하지 않고 `@pxds/pxds-tokens`에서 흡수·재노출한다. CSS 변수는 `var(--semantic-*)` / `var(--atomic-*)` / `var(--spacing-*)` / `var(--opacity-*)`를 직접 소비할 수 있다.
- **프로젝트 확장 토큰** — WDS에 없는 런타임 시각 값은 `tiers.project` 또는 `semantic` project extension으로 흡수한다. 앱/패키지 로컬 `*tokens.ts`나 CSS 토큰 파일을 새로 만들지 않는다.
- **호환 alias** — `@pxds/pxds-tokens/brand`의 `CARD_*`, `OFFERING_*`, `BADGE_BG`, `GNB_BORDER`, `FONT` 등은 legacy compatibility export다. 새 코드는 가능한 CSS var/token path를 직접 사용한다.
- **브랜드 컬러** — 일반 브랜드/CTA는 WDS `semantic.primary.*` / WDS `Button color="primary"` / `Typography color="semantic.primary.normal"` 로 소비한다. 로고처럼 WDS semantic으로 설명되지 않는 값만 project token으로 둔다.
- **`semantic.surface.page.*` (프로젝트 확장)** — `--semantic-surface-page-{normal,semi}` CSS var. `AppScreenContent` 페이지 배경. `semanticSurface.page.normal/semi` alias로 소비. SSOT 동일

## 측정 신호 (strain test)

새 화면을 시스템에 넣었을 때:

| 신호 | 해석 |
|---|---|
| 신규 컴포넌트 0 추가, 기존 어휘로 표현됨 | **시스템 generality 100% — 통과** |
| 신규 컴포넌트 추가되더라도 기존 어휘에 새 variant/slot으로 흡수 (예: `Banner variant="search"`, `HomeBlock.Body` 조합) | **확장 가능성 통과** |
| 기존 preset API에 새 슬롯 강제 추가 필요 (예: `HomeInfoBlock`에 계속 새 slot 추가) | **부분 깨짐 — compound/pattern 재설계 신호** |
| 화면이 inline raw `<section>` / 자체 token / 자체 fontSize 강요 | **명백히 깨짐 — 어휘 부족** |

홈 5화면(현재 단계) 깨진 곳:
- `home-guest`의 Big Hero (`HomeBlock` preset 어떤 것에도 안 맞음 — `<section>` + raw `<button>`)
- `MyEditButton` (`HomeBlock`도 Banner도 아닌 footer 부품 — `ContentList`의 독립 item)

## 운영 규약 (`apps/mobile`)

### 폴더 구조
- 화면 평탄: `apps/mobile/src/app/<screen>/page.tsx` + `_mock.ts`. 버전 폴더(`v?-?`) 시스템 폐기
- 인덱스 (`/`)는 hard-coded 라우트 목록 (registry generator 의존 끊음)
- 새 도메인 추가 시 `apps/mobile/src/app/<screen>/` 평탄 구조 유지

### 타입 강제
- `HomeBlock` — compound slot으로 의미 경계를 드러낸다.
- `HomeHeroBlock` / `HomeInfoBlock` / `HomeActionPairBlock` — 화면 기본 사용 어휘. 숫자형 `level` API를 사용하지 않는다.
- `Banner` — variant 기반.

### WDS 사용 정책 (2026-04-29 forced migration 이후)
- **WDS 컴포넌트는 `@pxds/pxds-components/core`로 흡수한다**. 앱/패키지 코드는 `@wanteddev/wds`를 직접 보지 않고 `@pxds/pxds-components/core`를 우선 진입점으로 사용한다.
- **WDS 아이콘은 `@pxds/pxds-icons`로 흡수한다**. 앱/패키지 코드는 `@wanteddev/wds-icon` 또는 `@pxds/pxds-components/core`를 통해 icon을 소비하지 않는다.
- **패키지 의존 방향**: `@pxds/pxds-tokens` → `@pxds/pxds-icons`; `@pxds/pxds-tokens` → `@pxds/pxds-components`; `@pxds/pxds-tokens` / `@pxds/pxds-icons` / `@pxds/pxds-components` → `@pxds/pxds-layout`; `@pxds/pxds-tokens` → `@pxds/pxds-preview`; `apps/*`는 필요한 공개 패키지만 소비한다.
- **레이아웃 runtime 분리**: AppScreen류 화면 셸, bottom-sheet, primitives는 `@pxds/pxds-layout`이 소유한다. iframe 기반 모바일 preview helper는 `@pxds/pxds-preview`가 소유한다.
- **frame portal context 제거 기록**: `@pxds/pxds-layout`에는 deprecated frame portal runtime을 남기지 않는다. preview가 iframe으로 격리되고 AppScreen 안에 여러 frame/root를 둘 계획이 없으므로, BottomSheet는 별도 `container` 지정 없이 WDS Modal 기본 렌더링에 맡긴다. 나중에 body 기준 modal이 radius/clipping/scroll boundary를 실제로 깨뜨리거나, 한 document 안에 여러 AppScreenRoot가 동시에 필요해질 때만 git history에서 frame context 패턴을 복구 검토한다.
- **Figma 기능 분리**: component-to-Figma capture, Figma URL 읽기, component spec authoring 같은 순수 bridge/hook 기능은 `@pxds/pxds-figma`가 소유한다. 별도 `figma-export` 앱은 두지 않는다.
- **WDS 컴포넌트 사용 원칙**. `Button`/`Card`/`Chip`/`ContentBadge`/`Typography`/`Thumbnail`/`RadioGroup` 등을 화면·kit에서 사용할 때는 `@pxds/pxds-components/core`로 통과시킨다. 자체 wrapper(StatBadge·PillChip·MyEditButton·Typography 등)는 호출 시그니처 보존을 위한 얇은 위임만 허용
- **예외 — 유지하는 자체 layer**:
  - `@pxds/pxds-layout/primitives` (Box·Flex·Float·Grid·HStack·VStack) — semantic spacing 어휘 강제용. WDS 가 동등 토큰-결합 layout primitive를 제공하지 않음
  - `@pxds/pxds-components/feedback` — Divider/Placeholder 같은 최소 feedback atom
  - `@pxds/pxds-components/typography` — WDS `Typography`에 line break/maxLines 정책을 더한 텍스트 primitive
  - `@pxds/pxds-components/patterns` — 도메인 독립 WDS 조합 패턴. WDS/layout 외 의존이 없는 패턴부터 이곳으로 승격한다
  - `@pxds/pxds-layout/app-screen` — screen root, scroll, sticky 인프라
  - `molecules/` — 도메인 독립 조합 패턴. 내부에서 WDS 사용
  - `organisms/` — 도메인/글로벌 화면 영역. 내부에서 WDS와 molecules 사용
- **버려진 정책 (이전)**: "와이어프레임 도메인이라 raw + 토큰 조합이 명세 충실성에 더 부합" — Figma 픽셀 충실성을 우선으로 인라인 raw style을 허용하던 규칙. 2026-04-29부로 폐기. 픽셀 단위 충실성을 포기하고 WDS 컴포넌트 모양을 그대로 수용
- 토큰: `var(--semantic-*)` 직접 소비도 가능하나 가능하면 WDS prop(`color="semantic.label.normal"`)으로 통과. SSOT는 `@pxds/pxds-tokens/registry/wds-token-registry.json`
- `@wanteddev/*` 패키지 직접 import는 `@pxds/pxds-components/core`, `@pxds/pxds-icons`, `@pxds/pxds-tokens`, WDS reset/Next adapter 같은 패키지 경계에서만 허용한다. `@screen/*`·`@policy/*`·`registry/`는 런타임 의존성 없는 JSON/TS 메타만 둔다.
- `apps/preview/`는 shadcn/Tailwind 프리뷰 도구다. WDS 모바일 화면을 직접 import하지 않고 `@pxds/pxds-preview`의 iframe helper로 띄운다. iframe origin은 `NEXT_PUBLIC_MOBILE_ORIGIN`(기본 `http://localhost:3001`)이다.

### Mock / 데이터 배치
- 정책서/Use Case 순수 모델: `@policy/core` (`packages/policy-core/src/index.ts`)
- 문서/정책서 → screen 추적: `@policy/authoring` (`packages/policy-authoring/src/index.ts`)
- 프로젝트 수준 pure screen registry: `@screen/registry` (`packages/screen-registry/src/index.ts`)
- 프로젝트 수준 screen generation benchmark/audit: `@screen/evaluation` (`packages/screen-evaluation/src/index.ts`)
- 프로젝트 수준 spec(JSON SSOT): `packages/screen-specs/spec/active/<route-id>.json`
- 구버전/deprecated spec: 레포 상위 백업 디렉토리 `../rnd-screen-to-screen-backup/packages/screen-specs/spec/_deprecated/`로 이동. active 화면 조립 근거로 사용하지 않는다.
- 페이지 로컬 mock/seed (TS): 각 화면 폴더의 `_mock.ts`
- mock은 화면 재현용 임시 입력. API 연결 시 교체

## 요구사항 기반 구현 원칙

이 프로젝트의 프론트엔드 코드는 단순히 UI를 구현하는 것이 아니라, 요구사항을 어떤 구조로 이해했고 어떤 책임 단위로 나눴는지를 코드에 드러내야 한다. 좋은 코드는 요구사항이 적절한 추상화 레벨에서 읽히는 코드다.

### 요구사항에서 출발한다
- 구현 전에 먼저 요구사항만 보고 화면의 핵심 책임, 사용자의 주요 행동, 중요한 UI 개념, 코드에서 드러나야 하는 텍스트·라벨·액션·상태를 정리한다.
- 기존 skeleton이나 현재 구현에서 바로 출발하지 않는다. 기존 구현은 참고 자료일 뿐이고, 화면 구조의 기준은 정책서/spec/요구사항이다.
- 코드는 요구사항을 숨기지 않고, 적절한 추상화 레벨에서 드러내는 방향으로 작성한다.

### 추상화는 재사용성이 아니라 책임에서 출발한다
- 컴포넌트, 훅, 함수는 "나중에 재사용될 것 같아서" 분리하지 않는다.
- 분리 기준은 독립적인 책임, 의미 있는 이름, 상위가 몰라도 되는 구현 세부, 사용처의 이해도 개선이다.
- 재사용성은 좋은 책임 분리의 결과일 수 있지만 1차 목적이 아니다.

### 컴포넌트 인터페이스는 화면 지도처럼 작성한다
- page/screen 컴포넌트에서는 화면의 큰 구조와 책임이 읽혀야 한다.
- 중요한 텍스트, 라벨, 액션, 상태는 적절히 드러내되, WDS 조합이나 DOM 세부는 하위 organism/molecule/template로 숨긴다.
- 너무 자세해서 상위가 모든 구현을 알게 되는 구조와, 너무 추상화되어 요구사항이 보이지 않는 구조를 모두 피한다.

### UI와 코드의 1:1 대응을 의식한다
- 화면의 주요 섹션, 폼 라벨, 버튼 액션, 탭·필터·정렬 같은 view 상태, 사용자에게 보이는 핵심 텍스트, 정책서의 도메인 개념은 코드에서 찾을 수 있어야 한다.
- 1:1 대응은 모든 DOM을 펼친다는 뜻이 아니다. UI 구조와 코드 구조가 같은 축척에서 대응되어야 한다는 뜻이다.

### 상태는 구현이 아니라 개념으로 다룬다
- 상태가 화면의 중요한 관점이거나 여러 UI 요소와 연결되거나 변경 규칙이 있으면, 문자열/boolean 구현값으로 흩뿌리지 말고 이름 붙일 만한 개념인지 검토한다.
- 커스텀 훅은 구현을 숨기기 위한 장식이 아니라 상태의 의도를 드러낼 때 사용한다.
- 상태 변경 규칙이 여러 컴포넌트에 흩어지면 책임 경계가 깨진 신호다.
- `useMemo` / `useCallback`은 기본 금지다. 렌더 비용이나 참조 안정성이 문제가 되면 먼저 컴포넌트 경계, state 위치, 데이터 변환 위치, props 계약을 조정한다. 필요한 예외는 시스템 규칙 변경으로 명시적으로 논의한다.

### optional과 fallback은 경계에서 처리한다
- API/mock/spec의 `null`·`undefined`·optional 값은 가능한 한 변환 계층이나 screen 경계에서 처리한다.
- 하위 component에는 UI에 필요한 fallback이 결정된 확정 값을 넘긴다.
- `user?.profile?.imageUrl` 같은 방어 로직이 여러 곳에 반복되면 데이터 경계가 새고 있는 신호다.

### 구현 리뷰 체크
- 요구사항의 중요한 개념이 코드에서 보이는가?
- 상위 컴포넌트가 적절한 축척의 지도처럼 보이는가?
- 추상화가 책임 단위인가, 단순 재사용 예상인가?
- 사용자에게 보이는 텍스트와 액션이 너무 깊이 숨어 있지 않은가?
- optional 값, loading, error, empty 상태의 책임 위치가 명확한가?
- 코드 줄 수를 줄이는 대신 요구사항의 구조를 잃어버리지는 않았는가?

## 컴포넌트 계층화 방향

이 섹션은 `apps/mobile`의 컴포넌트 아키텍처 의도를 설명한다. Figma의 Atomic naming과 코드 구조를 맞추기 위해 2026-04-30부터 `atoms / molecules / organisms / templates` 구조를 사용한다.

핵심 의도:
- WDS primitive를 화면에 직접 흩뿌리지 않는다.
- Figma Atom 페이지의 최소 부품은 `atoms/`에 둔다.
- 도메인 없는 반복 조합은 `molecules/`에 둔다.
- 도메인/글로벌 화면 영역은 `organisms/`에 둔다.
- 화면 슬롯, 상단 sticky/accessory 컨텍스트, 스크롤 컨텍스트, 포털 컨텍스트는 `templates/`에 둔다.
- 새 도메인에서 반복되는 구조는 organisms에 복제하지 말고 먼저 molecules로 승격한다.
- 컴포넌트 어휘 탐색은 `packages/screen-catalog/catalog/index.json`에서 시작한다. 이 catalog는 생성기나 토큰 SSOT가 아니라, 현재 코드베이스의 templates/atoms/molecules/organisms/pages 구조를 빠르게 파악하기 위한 사람이 읽는 색인이다.

우리가 만들려는 것은 “variant만 계속 늘어나는 kit”이 아니다. 목표는 **조합 가능한 의미 축을 가진 시스템**이다.

나쁜 확장 예:

```txt
HomeInfoBlockWithPrice
HomeInfoBlockWithSelectedState
Banner variant=product
Banner variant=coupon
ListRow with selected
ListRow with price
```

좋은 확장 예:

```txt
InfoList trailing="badge|action|value"
SelectableList selectionMode="single|multi"
PromoBlock tone="default|accent"
StickyActionBar primaryAction + secondaryAction
```

```txt
WDS primitive
  ↓
atoms
  ↓
molecules
  ↓
organisms
  ↓
templates + screen
```

### 레이어별 책임

#### `atoms/`

더 쪼개면 의미가 사라지는 최소 부품과 토큰 강제용 primitive다. 도메인 의미를 갖지 않는다.

현재 atoms:
- `@pxds/pxds-layout/primitives` — Box, Flex, Float, Grid, HStack, VStack. spacing prop은 7 슬롯 SpacingToken만 받음 (DESIGN.md 참조)
- `@pxds/pxds-components/feedback` — Divider, Placeholder. inset-aware feedback primitive
- `@pxds/pxds-components/typography` — TextBlock. 도메인 의미 없이 모바일 카피 줄바꿈과 maxLines/truncate 정책만 담당
- `@pxds/pxds-components/core` — WDS component re-export. 앱에서 WDS primitive가 필요하면 이 경로를 사용한다.
- `@pxds/pxds-icons` — WDS icon adapter + PXDS-owned frame icons. 앱/패키지에서 icon이 필요하면 이 경로를 사용한다.

판단 기준:
- Figma의 `atom/*`와 직접 대응하거나, WDS primitive 위에 아주 얇은 규칙만 얹으면 atoms 후보
- 홈/상품/검색/결제 어디에서 써도 이름이 어색하지 않아야 한다
- 도메인 데이터 prop을 받으면 atoms가 아니다

#### `molecules/`

도메인 독립적인 조합 패턴이다. WDS primitive와 atoms를 조합해서 반복 가능한 화면 구조를 만든다.

WDS/layout 외 의존이 없는 공용 패턴은 `@pxds/pxds-components/patterns`가 소유한다. 앱 로컬 `components/molecules/<name>/index.ts` shim은 두지 않고, package-owned 패턴은 공개 패키지 진입점에서 직접 import한다.

현재 molecules:
- `InfoList` — leading media + title/sub + trailing badge/action/value 구조
- `SelectableList` — 옵션·필터·배송 방식 선택 구조
- `ConsentList` — 전체 동의 + 필수/선택 동의 리스트 구조. 약관/동의/수신 설정처럼 required/optional 상태가 필요한 화면에서 사용
- `PromoBlock` — 배너 / 쿠폰 / 프로모션 구조
- `NoticeBlock` — 정책 안내/주의/오류 같은 정보성 안내 구조. 프로모션/쿠폰이 아닌 안내를 `PromoBlock`으로 표현하지 않는다
- `SectionCard` — 카드 표면 + label/title/trailing + body 슬롯 구조
- `SummaryCard` — 상단 media + 제목 영역 + 자유 meta body 구조
- `ChipGroup` — chip 묶음 flow
- `PrimaryCTABar` / `StickyActionBar` — 하단 CTA 구조. `AppScreen.bottom` 안에서는 떠 있는 카드가 아니라 docked surface로 표현

package-owned patterns:
- `MediaBlock`, `QueryBar`, `FilterTabs`, `FormField`, `SelectField`, `form-controls` — `@pxds/pxds-components/patterns`에서 직접 소비한다. 입력·선택 control은 새 wrapper를 만들기 전에 WDS control 또는 package-owned pattern을 먼저 사용한다.

판단 기준:
- 두 개 이상의 organisms에서 같은 구조가 반복되면 molecules 후보
- 도메인 단어 없이 이름 붙일 수 있으면 molecules 후보
- WDS primitive 여러 개를 매번 같은 방식으로 조합한다면 molecules 후보

#### `organisms/`

화면 영역 단위 컴포넌트다. 도메인 언어를 표현하는 얇은 wrapper이며 내부에서 molecules와 WDS를 사용한다.

현재 organisms:
- `organisms/global` — GlobalNavigationHeader, GlobalNavigationBar, GlobalSearch
- `organisms/home` — HomeBlock compound + presets, AiAnnotation, ListRow, Banner, MyEditButton
- `organisms/product` — ProductShell, ProductSummaryCard, ProductOptionSelector, ProductPromoBanner, ProductBenefitList, ProductPurchaseBar
- `organisms/search` — SearchResultTabs, SearchPromoBlock, SearchResultList, SearchSuggestionChips
- `organisms/tu` — TU 화면 전용 섹션과 타입

판단 기준:
- 이름에 홈·상품·검색·TU 같은 도메인 명사가 자연스럽게 들어가면 organisms 후보
- 데이터 prop이 도메인 모델을 닮았다면 organisms 후보
- 내부 구현은 molecules와 WDS를 조합하되, 화면에서는 도메인 이름으로 읽혀야 한다

#### `templates/`

화면 슬롯과 렌더링 컨텍스트를 관리하는 계층이다. Atomic Design의 page template에 해당하며, 도메인 의미를 갖지 않는다.

현재 templates:
- `@pxds/pxds-layout/app-screen/AppScreen`
- `@pxds/pxds-layout/app-screen/AppScreenRoot`
- `@pxds/pxds-layout/app-screen/AppScreenContent`
- `@pxds/pxds-layout/app-screen/ContentOutlet`
- `@pxds/pxds-layout/app-screen/ContentList` — 내부 전용 content flow, direct item gap `var(--spacing-4)`
- `@pxds/pxds-layout/app-screen/ContentRail` — full/bleed 표면 안의 내용 기준선과 readable measure
- `@pxds/pxds-layout/app-screen/StatusBar`
- `@pxds/pxds-layout/bottom-sheet/BottomSheetRoot` — WDS Modal open state, focus trap, scroll lock
- `@pxds/pxds-layout/bottom-sheet/BottomSheetBackdrop` — WDS ModalDimmer 기반 dimmer/backdrop
- `@pxds/pxds-layout/bottom-sheet/BottomSheetContent` — bottom container + sheet content
- `@pxds/pxds-layout/bottom-sheet/BottomSheet` — Root + Backdrop + Content 합성 단축 API

판단 기준:
- top / content / bottom 같은 슬롯 계약을 관리하면 templates 후보
- scroll context와 screen root boundary를 다루면 templates 후보
- 바텀시트처럼 별도 렌더 컨텍스트가 필요하면 `BottomSheetRoot` / `BottomSheetBackdrop` / `BottomSheetContent`로 계약을 드러낸다. 화면에서는 보통 합성 단축 API인 `BottomSheet`를 사용한다

### Templates API 사용 규칙

이 섹션은 다른 세션이 화면을 조립할 때 따라야 하는 인터페이스 계약이다. `DESIGN.md`에는 수치·토큰을 두고, `AGENTS.md`에는 어떤 template API를 어떻게 써야 하는지를 둔다.

#### `AppScreen`

일반 page route는 기본적으로 `AppScreen`을 사용한다. 화면은 chrome slot을 직접 absolute/fixed로 배치하지 않고 slot에 넘긴다.

```tsx
<AppScreen
  top={<GlobalNavigationHeader />}
  bottom={<GlobalNavigationBar />}
>
  {content}
</AppScreen>
```

슬롯 의미:
- `top` — 상태바/상단 네비게이션/검색바처럼 화면 상단 chrome의 주 영역
- `children` — 실제 scroll content. 화면에서 별도 scroll container를 만들지 않는다
- `bottom` — GNB, 구매 바, 다음 버튼처럼 화면 하단 chrome

사용 규칙:
- top/bottom chrome 배경은 각 organism이 임의로 칠하지 않고 `AppScreenContent`의 `background`를 공유한다
- 모든 scroll content direct item 간 gap은 `ContentList`가 `var(--spacing-4)`로 소유한다. 도메인별 `*List` wrapper로 같은 책임을 다시 만들지 않는다
- 일반 카드/리스트/프로모션 영역은 화면이나 organism에서 `px`를 다시 주지 않고 `ContentSection` 안에 둔다. ContentOutlet이 이미 좌우 inset을 소유하므로 reusable row/card가 외부 horizontal padding을 중복 소유하면 benchmark 실패다
- 가로 스크롤, 선택 row highlight, edge-to-edge media처럼 frame까지 확장해야 하는 영역은 `ContentSection inset="bleed"`로만 예외를 기록한다
- bleed 표면의 배경은 full width를 쓰되, 내부 label/control/CTA/text 시작점은 `ContentRail rail="inset"`으로 본문 기준선에 복귀시킨다
- caption/description처럼 full-width 문장이 어색한 텍스트는 `ContentRail rail="measure" measure="caption|body|title"` 또는 전용 copy molecule로 행폭을 제한한다
- top과 bottom은 항상 layout flow를 차지한다. 콘텐츠를 chrome 아래로 깔아 넣는 overlay 계약은 사용하지 않는다
- 검색 탭처럼 상단에 붙는 영역은 global chrome organism 안에서 함께 조합한다. 예: `GlobalSearch`가 `GlobalSearchTopBar`와 `SearchResultTabs`를 `top` 슬롯에 함께 배치
- 구매 바처럼 하단 navigation 위에 붙는 영역은 `bottom` 안에서 함께 조합한다. 예: `<><ProductPurchaseBar /><GlobalNavigationBar /></>`
- page route에서 `position: fixed` / `absolute bottom: 0`로 직접 chrome을 만들지 않는다. 필요한 경우 `top` 또는 `bottom` 조합으로 올린다
- `AppScreenRoot`는 표준 `AppScreen` flow 없이 화면 root만 필요한 특수 화면이나 합성 template 내부에서만 직접 사용한다

#### `BottomSheet`

바텀시트 route는 `AppScreenRoot`로 화면 root를 만든 뒤 `BottomSheet` 합성 API를 사용한다.

```tsx
<AppScreenRoot>
  {backgroundSilhouette}
  <BottomSheet open>
    {sheetContent}
  </BottomSheet>
</AppScreenRoot>
```

기본 사용은 합성 API인 `BottomSheet`다. backdrop, portal, content를 세밀하게 바꿔야 할 때만 하위 API를 직접 조합한다.

```tsx
<BottomSheetRoot open>
  <BottomSheetContent backdrop={<BottomSheetBackdrop background="rgba(0,0,0,.5)" />}>
    {sheetContent}
  </BottomSheetContent>
</BottomSheetRoot>
```

역할:
- `BottomSheetRoot` — WDS `Modal`의 open state, focus trap, scroll lock
- `BottomSheetBackdrop` — WDS `ModalDimmer` 기반 dimmer/backdrop
- `BottomSheetContent` — bottom container, sheet padding/gap
- `BottomSheet` — Root + Backdrop + Content 합성 단축 API

사용 규칙:
- `Backdrop` 철자를 사용한다. `Backdroup` 같은 오타 alias는 만들지 않는다
- 바텀시트 backdrop을 page에서 별도 absolute layer로 만들지 않는다. `BottomSheetBackdrop` 또는 `BottomSheetContent.backdrop`으로 통과시킨다
- sheet content 내부의 도메인 구조는 organisms/molecules가 맡고, modal/container/dimmer 책임은 templates가 맡는다
- WDS `ModalContainer`를 route에서 직접 쓰지 않는다. bottom-sheet 계약이 분산되기 쉽다

#### `screen`

라우트 단위 화면이다. 화면은 조립만 한다. WDS primitive 조합 세부를 화면에 쓰지 않는다.

예:

```tsx
<ProductShell>
  <ProductSummaryCard />
  <ProductOptionSelector />
  <ProductPromoBanner />
  <ProductBenefitList />
  <ProductPurchaseBar />
</ProductShell>
```

화면에서 허용되는 일:
- mock/fixture를 읽는다.
- organisms와 templates를 배치한다.
- route-local 상태가 필요하면 최소한으로 둔다.

화면에서 피해야 하는 일:
- WDS `Card`, `ListCell`, `Button`, `Chip`을 직접 많이 조합한다.
- organisms에 있어야 할 slot 구조를 inline JSX로 만든다.
- spacing, color, font size를 새로 만든다.

### 디렉토리 구조

```txt
apps/mobile/src/components/
├── atoms/         최소 부품 + 토큰 강제 primitive. layout, feedback, icon, typography
├── molecules/     도메인 독립 조합 패턴. InfoList, MediaBlock, PromoBlock, QueryBar, StickyActionBar 등
├── organisms/     글로벌/도메인 화면 영역. global, home, product, search, tu
└── templates/     화면 셸과 렌더링 컨텍스트. app-screen, bottom-sheet
```

### 의존 방향

```txt
atoms
  ↑
molecules
  ↑
organisms
  ↑
templates + screen
```

허용 import:
- screen → templates, organisms, `@pxds/pxds-layout/primitives`
- templates → atoms, organisms(global slot은 props로 주입)
- organisms → molecules, atoms, WDS
- molecules → atoms, WDS
- atoms → WDS 가능하지만 최소화

금지 import:
- molecules → organisms
- organisms/home ↔ organisms/product 같은 도메인 교차 import
- atoms → molecules / organisms / templates
- screen에서 WDS primitive를 직접 대량 사용

### 승격 규칙

새 화면을 만들 때 판단 순서:

1. `packages/screen-catalog/catalog/index.json`에서 현재 어휘와 페이지 패턴을 먼저 찾는다.
2. 기존 organisms로 표현 가능한지 본다.
3. organisms가 부족하면, 먼저 molecules 조합으로 표현 가능한지 본다.
4. 같은 WDS 조합이 반복되면 molecules로 승격한다.
5. 도메인 이름과 데이터 구조가 필요한 부분만 organisms에 둔다.
6. 기존 컴포넌트에 새 variant나 slot을 추가하기 전에, 더 일반적인 molecule 축이 있는지 검토한다.

### product-detail에서 얻은 결론

제품 상세 화면은 첫 product organism strain test다.

`organisms/home`만으로는 다음 영역에서 어휘 부족이 드러났다.
- 상품 요약: 큰 media, 가격, 할인, 리뷰 메타가 필요하다.
- 옵션 선택: 선택 상태와 변경 가능한 row 의미가 필요하다.
- sticky 구매 CTA: 하단 고정 action bar가 필요하다.
- 상품 chrome: 홈 shell과 다른 top/bottom navigation 계약이 필요하다.

따라서 product organism은 WDS를 직접 화면에 흩뿌리지 않고, `molecules/` 기반의 얇은 도메인 wrapper로 둔다.

현재 `/product-detail`의 의도된 흐름:

```txt
product-detail/page.tsx
  → organisms/product
    → ProductShell
      → templates/app-screen/AppScreen
      → WDS TopNavigation, organisms/global/GlobalNavigationBar
    → ProductSummaryCard
      → molecules/SummaryCard, molecules/MediaBlock
    → ProductOptionSelector
      → molecules/SectionCard, molecules/InfoList
    → ProductPromoBanner
      → molecules/PromoBlock
    → ProductBenefitList
      → molecules/SectionCard, molecules/InfoList
    → ProductPurchaseBar
      → molecules/StickyActionBar
```

이 구조의 목적은 “상품 페이지 전용 컴포넌트 폭증”을 막는 것이다. 새 도메인이 들어오면 먼저 `molecules/`로 버틸 수 있는지 확인하고, organisms는 의미 있는 이름과 데이터 mapping만 담당한다.

## Figma → 코드 워크플로우

1. **노드 좌표 추출**: `mcp__plugin_figma_figma__get_metadata` 호출 → 각 frame의 `x/y/width/height`
2. **실 gap/size 계산**: `child[n+1].y - (child[n].y + child[n].height)`. Figma 에디터 숫자 의존 금지
3. **시스템 어휘 매핑**: `DESIGN.md`의 HomeBlock preset / Banner variant / Typography variant에서 찾는다
4. **어휘에 없으면 strain 신호**: 새 variant 추가 vs 새 컴포넌트 vs raw inline — 결정 + 회의에 보고
5. **360px viewport 시각 검증**: Chrome/Safari 모바일 모드 또는 AppScreen 안

## Registry / Mock 메타

### `registry/` (WDS SSOT)
- `index.json` — 매니페스트, 진입점
- `wds-component-registry.json` — 84종
- `@pxds/pxds-icons/registry/wds-icon-registry.json` — 344개 (`entries[]`에서 `kebab` 또는 `name` 검색)
- `@pxds/pxds-tokens/registry/wds-token-registry.json` — 색·간격·typography 수치 SSOT
- `wds-component-mapping-registry.json` / `wds-component-compound-layout-registry.json`

### 토큰 / 사이즈 조회 워크플로우
1. WDS variant 사이즈 → `@pxds/pxds-tokens/registry/wds-token-registry.json`의 `tiers.typography` grep
2. 색상 → 같은 레지스트리의 `atomic` / `semantic`
3. 컴포넌트별 prop enum → `node_modules/@wanteddev/wds/dist/components/<name>/types.d.ts`
4. **이 문서나 다른 메모에 수치 표 베이크 금지** — stale 위험 (실 사례: title2를 20px로 잘못 외우고 작성 → 런타임 28px)

### `@policy/*` / `@screen/*`
- `packages/policy-core/` (`@policy/core`) — Policy, UseCase, PolicySource, PolicySection, EvidenceRef 순수 문서 도메인. Screen을 모른다.
- `packages/policy-authoring/` (`@policy/authoring`) — 문서/정책서 → Screen 도출 추적. `PolicySourceRef`, `PolicyToScreenTrace`, `policyToScreenTraces`를 소유한다. `policy_doc`, `policy_section`, `pagination_ref`, `x_policyExtract` 같은 출처 정보는 이 레이어에서 해석한다.
- `packages/screen-registry/` (`@screen/registry`) — pure Screen registry. 화면 id, route, label, group, lifecycle status, spec/renderSpec id만 소유한다. 정책서 출처나 도출 근거를 품지 않는다.
- `packages/screen-specs/` (`@screen/specs`) — ScreenSpecV2, RenderableScreenSpecV1, active spec import, spec validation, spec JSON 저장소를 소유한다.
- `packages/screen-evaluation/` (`@screen/evaluation`) — screen generation benchmark/audit SSOT. 디자인/기획 평가 항목, 관련 API, 1~5 scoring hint, audit formatter를 소유한다.
- `packages/screen-catalog/` (`@screen/catalog`) — 생성기·토큰 제외 컴포넌트 catalog. templates/atoms/molecules/organisms/pages 어휘와 page pattern을 사람이 읽는 JSON으로 정리한다.
- `packages/screen-catalog/catalog/index.json` — 생성기·토큰 제외 컴포넌트 catalog 진입점. templates/atoms/molecules/organisms/pages 어휘와 page pattern을 사람이 읽는 JSON으로 정리한다
- `packages/screen-specs/spec/active/<route-id>.json` — 렌더 가능한 화면의 screen contract SSOT. `screen_contract` / `areas` / `system_mapping` / `layout_tokens` / `system_fit` 중심
- `packages/screen-specs/spec/active/<route-id>.sdui.json` — 정책서 → 화면 요구사항 → SDUI 렌더 트리 파일럿. 현재 `product-detail`, `membership-terms-consent`가 운영 중이며, v2 screen contract를 대체하지 않고 검증용으로 병행한다
- `packages/screen-specs/spec/active/<domain>/_pagination/<policy-id>.json` — 정책서 단위 화면 분할 SSOT. domain 버킷 안에 정책별로 둔다(예: `membership/_pagination/membership-join.json`, `membership/_pagination/membership-leave.json`, `nc-full/_pagination/nc-full.json`, `nc-simple/_pagination/nc-simple.json`). `policy_id` / `source_ref`(예: `docs/NC_정책서_Full_v1.0_확정본.md`) / `routes[]`(id, type, primary_task, predecessor, successor, step_fraction, split_reason) / `transitions[]`(from, to, trigger, guard)을 담는다. 각 route의 `.sdui.json`에 들어가는 `x_pagination` 슬라이스는 이 파일에서 derive되며, 슬라이스의 `_canonical_hash`(B 파일의 sha256)가 lint에서 검증된다. AI 세션은 `.sdui.json`만 읽어도 해당 route의 위치/전이를 알 수 있고, 더 깊은 컨텍스트가 필요하면 `_canonical` 경로로 B를 따라간다
- 구버전 imported/legacy/source-for-active spec은 레포 상위 백업 디렉토리 `../rnd-screen-to-screen-backup/packages/screen-specs/spec/_deprecated/`에 보존한다. `packages/screen-specs/spec/active/`와 active registry는 이 백업을 참조하지 않는다.

### 정책서 → UX 단계 → 화면 분할 → 인터페이스 설계 → 스펙/계약 → 렌더 생성

스크린 생성 전용 세션은 아래 순서만 따른다. 정책서 원문에서 바로 `children` 렌더 트리나 route JSX로 뛰지 않는다. 먼저 정책 내용을 구조화하고, 생성할 화면 단위를 나눈 뒤, **각 화면의 인터페이스 장르와 UX 구조를 설계한 다음** 화면 계약과 시스템 어휘를 고정하고, 마지막에 SDUI 트리와 모바일 렌더를 만든다.

현재 실패 패턴: 명세를 충실히 읽고도 화면이 문서형/계약형 UI로 평평해지는 경우가 있다. 따라서 `x_screenContract`를 쓰기 전에 반드시 `x_interfacePlan`으로 화면의 장르, 주요 과업, 정보 위계, progress/CTA 위치, 텍스트 measure 정책을 먼저 결정한다.

흐름:
1. **정책서 읽기** — `docs/`의 정책서 또는 사용자가 지정한 Notion 원문만 기준으로 삼는다. 레포 상위 백업의 deprecated spec은 읽지 않는다.
2. **`x_uxStage` 분류** — 각 use case와 각 route를 고객 여정 단계로 먼저 분류한다. 허용값은 `entry`(진입), `explore`(탐색), `search`(검색), `decision`(결정), `execution`(실행/구매), `complete`(완료), `support`(문제해결/CS)다. 한 화면이 여러 단계에 걸치면 primary 1개와 secondary N개를 기록한다. 이 분류는 이후 `x_interfacePlan`의 장르·톤·CTA·정보 위계를 결정하는 첫 단추다.
3. **`x_pagination` 작성 (화면 단위 분할 SSOT)** — 정책 process, entry/exit condition, 주요 user action, branch/exception을 기준으로 route를 분할하고 화면 간 전이를 표현한다. 한 화면은 하나의 primary task와 하나의 primary CTA를 가져야 한다. **분할 단위는 use case (flow)** 다. 정책서가 여러 use case(예: 회원 가입 / 휴면 해제 / 회원 탈퇴 / 재가입)를 담고 있으면 use case당 1개 pagination 파일로 분리한다. 산출물은 두 곳에 둔다. (B) use case당 1개 SSOT — `packages/screen-specs/spec/active/<domain>/_pagination/<policy-id>.json`. `<policy-id>`는 `<doc>-<use-case>` 형식(예: `nc-full-join`, `nc-full-leave`). domain 버킷은 그릇이고 한 도메인에 여러 flow 파일이 있을 수 있다. 같은 정책서에서 파생된 flow 파일을 묶어보고 싶으면 `<domain>/_pagination/_index.json`에 source doc + flow 목록만 담는 얇은 색인 파일을 둘 수 있다(routes/transitions는 담지 않는다 — SSOT 충돌 방지). (A) 각 route의 `.sdui.json` 안 `x_pagination` 슬라이스 — B의 동일 정보 중 해당 route 부분만 denormalize. drift 방지를 위해 슬라이스에 B의 `_canonical_hash`(sha256)를 박고, lint에서 모든 슬라이스 hash가 B의 현재 hash와 일치하는지 검증한다. AI/세션은 A만 읽어도 predecessor/successor/step_fraction을 알 수 있고, 더 깊은 컨텍스트가 필요하면 `_canonical` 경로로 B를 따라간다. **공유 화면 규칙**: 같은 UI(예: 본인인증)가 여러 flow에서 등장해도 route id는 flow별로 분리한다(`nc-join-auth`, `nc-rejoin-auth`처럼). 컴포넌트는 organism/molecule 레벨에서 재사용하고, pagination route는 흐름 단위로 별개로 유지한다 — 한 route에 여러 flow context가 동시에 들어가면 슬라이스 SSOT가 깨진다.
4. **`x_policyExtract` 작성** — 정책서의 process, purpose, system/user input, output, branches, exceptions, design_signals를 추출한다. 정책 ID와 원문 ref를 반드시 남긴다. `source.refs`는 정책서/섹션 단위 출처를 보존하고, `evidence_refs`에는 각 process, branch, exception, user/system input이 어떤 원문 섹션·문장·표에서 왔는지 항목별 근거를 남긴다. 원문 근거 없이 요약만 만든 `x_policyExtract`는 화면 계약 근거로 쓰지 않는다. 정책 화면은 `legal_notices[]`에 필수/사용성 고지, 표시 위계, target area를 기록하고, 완료/처리 화면은 `output_mapping[]`에 정책 output이 어떤 결과 요약/카드/수치로 노출되는지 기록한다.
5. **`x_interfacePlan` 작성** — 화면 장르(`flow`/`browse`/`detail`/`form`/`result` 등), primary task, 사용자 결정/입력, 정보 위계, `visual_order`, progress 위치, CTA 위치, 선택/입력 패턴, 텍스트 measure 정책을 먼저 정한다. 이 단계는 “어떤 컴포넌트를 쓸지”보다 “어떤 인터페이스 문법이 맞는지”를 결정한다.
6. **상태·인터랙션 매트릭스 작성** — 선택/입력/분기/로딩이 있는 화면은 `x_stateMatrix`와 `x_interactions`를 작성한다. `x_interactions.tag` 허용값은 `tap`, `interactive`, `sync`, `enabled`, `loading`, `modal`, `state`, `nav`다. 예: 전체동의는 `interactive + sync`, CTA 활성 조건은 `enabled`, 약관 전문은 `tap + modal`, 처리중 화면은 `loading + nav`로 기록한다.
7. **Pattern Fit 점검** — 먼저 `packages/screen-catalog/catalog/index.json`에서 기존 어휘와 page pattern을 확인한 뒤, `x_interfacePlan`과 상태/인터랙션 매트릭스를 기존 template/molecule/organism으로 표현 가능한지 검사한다. 예: 절차형 가입/탈퇴 화면은 일반 `AppScreen + ContentList`만으로 충분한지, 아니면 `FlowScreen`/`ChoiceList`/`FlowCTA` 같은 어휘가 필요한지 판단한다.
8. **`x_screenContract` 작성** — v2 `screen_contract` / `layout_contract` / `areas` / `design_system_contract`로 화면 슬롯, 레이아웃 소유권, 사용 컴포넌트 어휘를 고정한다. 이 단계에서 `AppScreen`/`BottomSheet`, `ContentSection`, molecule/organism 사용 여부를 결정하되, 결정 근거는 `x_uxStage`, `x_interfacePlan`, `x_stateMatrix`, `x_interactions`와 연결되어야 한다.
9. **SDUI `data`와 `children` 작성** — `RenderableScreenSpecV1`의 `data`에는 화면 fixture를, `children`에는 공식 SDUI schema의 `SDUINode[]`에 가까운 렌더 트리를 둔다. `type`은 등록된 template/organism/molecule/atom 이름만 사용한다.
10. **Heuristic/Audit Review** — 렌더 구현 전/후에 인터페이스 품질 체크를 수행한다. full-width caption 남용, 과도한 카드화, progress가 본문에 섞임, CTA가 required state와 분리됨, 선택지가 문서형 row로 평평해짐, primary task가 첫 viewport에서 보이지 않음, legal notice가 target area 없이 누락됨, `x_interactions`의 enabled 조건이 CTA 상태와 분리됨 같은 문제를 확인한다.
11. **active 파일 생성** — `packages/screen-specs/spec/active/<route-id>.json`에는 `ScreenSpecV2` 계약을, `packages/screen-specs/spec/active/<route-id>.sdui.json`에는 `RenderableScreenSpecV1`을 둔다. `.sdui.json`의 `x_screenContract`는 `.json` 계약과 같은 내용을 가져야 한다.
12. **registry 등록** — pure Screen 정보는 `@screen/registry`가 제공하는 Screen 모델(id/route/label/group/status/spec id)과 맞아야 한다. 화면 목록은 `packages/screen-registry/src/index.ts`에 등록하고, contract/renderable spec import는 `packages/screen-specs/src/active-spec-list.ts`에 추가한다. 문서/정책서 도출 정보는 Screen에 넣지 않고 `@policy/authoring`에서 추적한다. `packages/screen-specs/spec/active/_manifest.json`의 `screens`와 `render_spec_pilots`도 같이 갱신한다.
13. **렌더 구현** — `apps/mobile/src/app/<route-id>/page.tsx`는 `activeRenderableScreenSpecs["<route-id>"]`를 읽고 route-local `_sdui-renderer.tsx` 또는 공용 renderer로 넘긴다. 필요한 도메인 UI는 `apps/mobile/src/components/organisms/<domain>/`에 두되, 반복 조합은 먼저 `molecules/` 후보인지 본다.
14. **검증** — `npm run lint:mobile`, `npm run lint:preview`, `npm run build:mobile`, `npm run build:preview`를 통과시킨다. preview는 mobile iframe으로 확인한다.

`x_interfacePlan` 최소 예:

```json
{
	"screen_genre": "flow",
	"primary_task": "필수 약관에 동의하고 다음 가입 단계로 진행",
	"user_decision": "동의 여부",
	"hierarchy": {
		"top": "progress",
		"lead": "short_action_title",
		"body": "required_choice_group",
		"bottom": "primary_cta"
	},
	"copy_policy": {
		"title_style": "short_action",
		"caption_measure": "short",
		"avoid_full_width_caption": true
	},
	"interaction_pattern": {
		"main_control": "consent_or_choice_list",
		"cta_position": "bottom_chrome",
		"progress_position": "top_chrome"
	},
	"quality_checks": [
		"caption does not span full viewport",
		"primary task visible in first viewport",
		"bottom CTA is always reachable",
		"progress is not mixed into body content"
	]
}
```

`x_uxStage` / 상태·인터랙션 최소 예:

```json
{
	"x_uxStage": {
		"primary": "execution",
		"secondary": ["complete"],
		"evidence": "사용자가 필수 동의 후 다음 단계로 진행하는 실행 단계이며, 완료 화면으로 이어짐",
		"checkpoints": ["required input drives CTA", "single primary CTA"]
	},
	"x_stateMatrix": [
		{
			"state": "default",
			"trigger": "screen enter",
			"visual": "필수 항목 미동의, CTA disabled",
			"action": "필수 동의 전까지 다음 단계 차단"
		},
		{
			"state": "ready",
			"trigger": "all required consents checked",
			"visual": "CTA enabled",
			"action": "tap CTA navigates to successor"
		}
	],
	"x_interactions": [
		{
			"tag": "interactive",
			"selector": "consent-all",
			"description": "전체 동의 토글"
		},
		{
			"tag": "sync",
			"source": "consent-all",
			"target": "required consent rows",
			"description": "전체 동의 상태가 개별 필수 동의 상태를 갱신"
		},
		{
			"tag": "enabled",
			"selector": "primary-cta",
			"condition": "all required consents checked",
			"description": "필수 동의 완료 시 다음 CTA 활성"
		}
	]
}
```

Heuristic Review 룰 (적용 시 `x_heuristicReview.applied_rules`에 결과/근거 기록):

| 룰 | 의미 |
|---|---|
| H-1 | `genre=form`에서 카드 수 ≤ 1. 2개 이상이면 위계 충돌 신호 |
| H-2 | hero가 곧 section header. SectionCard label/title이 hero를 의미적으로 반복하면 둘 중 하나 제거 |
| H-3 | 모든 row에 동일 패턴 sub가 있으면 SelectableList `density="compact"` 후보 |
| H-4 | textarea 노출 정책(조건부/항상)을 spec `state_binding` 또는 `area.layout`에 명시 |
| H-5 | 폼 안 errorText와 CTA 위 eyebrow 동시 에러 금지. 주인을 한 곳으로 |
| H-6 | TopBar progress 라벨과 hero eyebrow에 동일 단계 텍스트 동시 표기 금지 |
| H-7 | step flow면 `leading="back"`, dead-end/result/modal이면 `leading="close"` |
| H-8 | form 장르의 NoticeBlock은 폼 영역과 분리 (위 또는 다음 단계로 이동) |
| H-9 | required `*`는 CTA 상태 + helperText로 대체 가능하면 생략 |
| H-10 | InfoList trailingLabel은 `status` / `action` / `value` 중 어느 의미인지 spec `area.layout.trailing_semantic`에 기록 |
| H-11 | molecule이 가진 raw style을 화면이 의존하면 `design_system_contract.allowed_escape_hatches`에 location/kind/value/reason/owner로 기록 |
| H-12 | screen/route가 margin·padding으로 콘텐츠 기준선을 직접 보정하면 실패. 기본 inset은 `ContentOutlet`, bleed는 `ContentSection`, 내부 기준선 복귀는 `ContentRail`로만 표현 |

`x_interfacePlan` 항목 (현 운영 기준):
- `genre`: `form` / `result` / `list` / `notice` / `selector` / `flow` / `browse` / `detail`
- `primary_task`: 한 문장
- `info_hierarchy`: `[hero, required-input?, supporting?, action]`
- `cta_location`: `bottom-sticky` / `inline` / `none`
- `progress_location`: `top-bar-thin` / `hero-eyebrow` / `none`
- `sectioning`: `flat` / `one-card` / `multi-card`

규칙:
- `className`/`style`은 가능하면 쓰지 않는다. 필요하면 `design_system_contract.allowed_escape_hatches`에 기록한다.
- 텍스트 줄바꿈과 행폭은 `x_interfacePlan.copy_policy`에서 먼저 결정한다. 캡션/보조문구는 기본 full-width로 두지 않고, 필요한 경우 별도 measure 정책 또는 copy molecule로 제한한다.
- 화면이나 route에서 margin/padding으로 콘텐츠 기준선을 직접 보정하지 않는다. 기본 inset은 `ContentOutlet`, vertical rhythm은 `ContentList`, section boundary/bleed는 `ContentSection`, bleed 내부 기준선 복귀와 measure는 `ContentRail`이 소유한다.
- 데이터는 `data`에 두고, 노드는 `bind`/slot/variant/token alias만 가진다.
- 화면 route는 WDS primitive를 대량 조합하지 않는다. route는 spec/fixture를 읽고 renderer 또는 organism을 배치하는 책임만 가진다.
- 새 component/variant/slot이 필요하면 먼저 기존 molecule 축으로 표현 가능한지 검토하고, 불가능하면 `new_vocabulary_required`에 strain signal로 남긴다.
- active spec은 deprecated 백업을 `source_ref`로 참조하지 않는다. 원문 정책 ID, Notion URL, docs 경로만 참조한다.
- 파일럿은 `RenderableScreenSpecV1` 타입과 `getRenderableScreenSpecIssues` 검증 함수를 통과해야 한다.

생성 산출물 체크리스트:
- `packages/screen-specs/spec/active/<domain>/_pagination/<policy-id>.json` (정책서당 1회 작성·갱신, B-SSOT)
- `packages/screen-specs/spec/active/<route-id>.json`
- `packages/screen-specs/spec/active/<route-id>.sdui.json` (`x_pagination` 슬라이스 포함, `_canonical_hash` 박음)
- `packages/screen-registry/src/index.ts`
- `packages/policy-authoring/src/index.ts`
- `packages/screen-specs/src/active-spec-list.ts`
- `packages/screen-specs/spec/active/_manifest.json`
- `apps/mobile/src/app/<route-id>/page.tsx`
- 필요 시 `apps/mobile/src/app/<route-id>/_sdui-renderer.tsx`
- 필요 시 `apps/mobile/src/components/organisms/<domain>/`

## WDS prop 규약 (참고)

WDS 컴포넌트를 직접 사용할 일이 생기면 (예: 후속 production 마이그레이션):

- **`FlexBox`/`Card`/`CardContent`**: CSS 표준 prop명만 — `flexDirection`/`alignItems`/`justifyContent`. `direction`/`align`/`justify` ✗
- **`Typography.variant`**: weight 분리 — `variant="title3" weight="bold"` ✓ / `"title3-bold"` ✗. 변형 enum: display1-3, title1-3, heading1-2, headline1-2, body1-2, label1-2, caption1-2
- **`color` prop**:
  - `TopNavigationButton.color`: 자체 enum (`"assistive"` 등) — 사용 가능
  - `IconButton.color` / `Typography.color`: `ThemeColorsToken` (deep dotted, 예: `"semantic.label.normal"`) — 단순 문자열 금지. 색 커스텀 필요하면 `sx`로 CSS var 직접 주입
- **`Thumbnail.ratio`**: 콜론 표기 `"1:1"` (슬래시 ✗). 이미지 없을 땐 WDS `Thumbnail` 기반 `Placeholder` 사용
- **아이콘명**: import 전 `@pxds/pxds-icons/registry/wds-icon-registry.json`에서 검증. `IconAdd` 없음 → `IconPlus`
- **`TopNavigation.variant`**: `"floating"`이 gradient + backdrop-blur 내장. 단순 헤더는 `"normal"`

## Next.js 주의

이 프로젝트는 Next.js 16 (Turbopack) 기준. 학습 데이터와 차이 가능. 의심되면 `node_modules/next/dist/docs/`의 가이드 직접 확인.

## 다음 단계 (현재 미진행)

- 검색·제품 도메인 진입 시 strain test의 진짜 라운드. 도메인-무관 부품을 특정 organism에서 끌어 쓰는 어색함이 발생하는 시점에 `molecules/` 또는 `atoms/`로 **승격**
- Figma `Card/L?/Senior` 변형 적용 (현재 home-senior 일반 카드와 동일 톤)
- product/search에 반복되는 `Card + label/title + InfoList` 구조를 `SectionCard`류 패턴으로 승격할지 검토

## 변경 이력

| 날짜 | 변경 |
|---|---|
| 2026-04-29 | 디렉터리 이름 변경: `app2/` → active app |
| 2026-04-29 | `system/layout/` 도입 — Box/Flex/HStack/VStack + 7 슬롯 semantic spacing 어휘 (`row/inline/stack/group/inset/block/section`) |
| 2026-05-07 | layout primitive 패키지 승격 — Box/Flex/Float/Grid/HStack/VStack + spacing token helper를 `@pxds/pxds-layout/primitives`로 이동. 앱 atoms layout shim은 이후 제거 |
| 2026-05-07 | primitive atom 패키지 승격 — TextBlock을 `@pxds/pxds-components/typography`, Divider/Placeholder를 `@pxds/pxds-components/feedback`으로 이동. 앱 atoms shim은 이후 제거 |
| 2026-05-07 | WDS core 흡수 — WDS component re-export를 `@pxds/pxds-components/core`로 분리하고 앱의 WDS component import를 core 진입점으로 전환 |
| 2026-05-07 | WDS/PXDS icon 흡수 — WDS icon adapter, icon registry, Logo/Status* frame icons를 `@pxds/pxds-icons`로 분리하고 앱/패키지의 icon import를 icons 진입점으로 전환 |
| 2026-05-07 | 모바일 공용 패턴 1차 승격 — FilterTabs/FormControls/FormField/MediaBlock/QueryBar/SelectField를 `@pxds/pxds-components/patterns`로 이동. 앱 molecule shim은 이후 제거 |
| 2026-05-07 | 모바일 package shim 제거 — 앱 atoms/templates shim과 package-owned pattern별 molecule shim을 제거하고 공개 패키지 진입점 직접 import로 전환 |
| 2026-05-07 | 모바일 토큰 SSOT 승격 — 앱/패키지 로컬 런타임 토큰 shim을 제거하고 `@pxds/pxds-tokens/registry/wds-token-registry.json`, `@pxds/pxds-tokens/tokens.css`, `@pxds/pxds-tokens/brand`로 흡수 |
| 2026-05-07 | `apps/figma-export` 제거 — Figma bridge/hook 기능은 `@pxds/pxds-figma` 패키지에 보존하고 실행 앱은 폐기 |
| 2026-05-07 | preview helper 패키지 분리 — `MobileViewFrame`/`MobilePreviewFrame`을 `@pxds/pxds-preview`로 이동하고 `@pxds/pxds-layout`은 실제 화면 layout runtime만 소유 |
| 2026-05-07 | `@pxds/pxds-layout` frame portal context 제거 — iframe preview boundary를 공식 격리 경계로 보고, deprecated runtime 대신 AGENTS 기록과 git history로 복구 가능성만 남김 |
| 2026-04-29 | `system/Divider` 도입 — orientation/inset/thickness, `role="separator"` |
| 2026-04-29 | `home-kit/AiAnnotation` 흡수 — 4곳 반복되던 icon+ai-text+spacing-2 패턴 |
| 2026-04-29 | dead code 삭제: `home-kit/card/` (Card·CardHeader), `home-kit/wrapper/` (CardList) — HomeBlock으로 흡수 완료 |
| 2026-04-29 | nova-* 36 페이지 + `patterns/modal/` + `patterns/screen-chrome/NovaTopBar` 삭제 |
| 2026-04-29 | 화면 patterns/home-kit 14 파일 layout primitive 마이그레이션 — raw `style={{ display:'flex', gap:'Npx' }}` 다수 제거 |
| 2026-04-29 | **WDS forced migration Phase 1** — Typography 6 변형은 WDS Typography(label1/title3/caption1·2)에 위임, `StatBadge`/`PillChip` → `ContentBadge`/`Chip` 위임, `MyEditButton`·`HomeBlock.Action`·home-guest Big Hero CTA → WDS `Button`. 픽셀 충실성 포기 |
| 2026-04-29 | global/system/typography 차수 — `global/GlobalNavigationHeader`·`Bar` → WDS `TopNavigation`/`BottomNavigation` 직접; `system/Icon` 삭제 → WDS icon 사용; `system/Divider` → WDS `Divider` 위임(inset 어휘만 보존); `components/typography/` 삭제 → WDS `Typography` (variant+weight+color 트리플)로 재작성. `system/layout/Float` 도입(edge 프리셋) |
| 2026-04-29 | 자체 브랜드 컬러 토큰 폐기 — 브랜드 컬러를 WDS `semantic.primary.*` 로 수렴. CTA는 WDS `Button color="primary"`, 텍스트는 `Typography color="semantic.primary.normal"` 사용 |
| 2026-04-29 | `PAGE_BG`/`PAGE_BG_SEMI` 자체 토큰 폐기 — `--semantic-surface-page-{normal,semi}` CSS var + `semanticSurface.page.*` alias 도입. frame shell 소비처 재작성. registry에 `semantic.surface` (`_project_extension`) 추가 |
| 2026-04-29 | frame shell patterns → system 승격 후 `AppScreenContent`로 명칭 정리 — 4 도메인(홈/검색/제품/TU) 공유 frame infrastructure 으로 layer 정합화 |
| 2026-04-29 | `AppScreen` 합성 API 도입 — 일반 라우트는 `AppScreen` 사용, 바텀시트 화면은 `AppScreenRoot` 직접 사용 |
| 2026-04-30 | `AppScreenContent` raw padding/gap prop 제거 — scroll context를 상위 셸에서 결정 |
| 2026-04-30 | `patterns/Surface` 제거 — WDS `Card`를 직접 사용하고, 실제 반복 구조는 `InfoList`/`PromoBlock`/`StickyActionBar` 같은 패턴에 남김 |
| 2026-04-30 | 컴포넌트 디렉토리 Atomic 재정렬 — `atoms/`(layout·feedback·icon), `molecules/`, `organisms/`, `templates/app-screen/` 구조로 이동 |
| 2026-04-30 | molecules 두께 확장 — `SectionCard`/`SummaryCard`/`ChipGroup` 도입, product/search organisms의 카드·칩 조합 책임을 molecules로 이동 |
| 2026-04-30 | WDS 기반 molecule 정렬 — `FormField`는 WDS Form 계열, `SelectableList`는 WDS List/ListCell 계열로 교체. `InfoList`와 `SectionCard` header는 WDS 완전 교체 시 search-result 시각 회귀가 커서 기존 molecule 레이아웃 유지. WDS `FlexBox` 직접 도입은 보류 |
| 2026-04-30 | WDS selection/input 적극 도입 — 검색 결과 카테고리는 WDS `Tab`, 상품 옵션은 WDS `RadioGroup` 기반 `SelectableList`, 약관 동의와 입력 control은 이후 `@pxds/pxds-components/patterns` 공개 진입점 기준으로 정리 |
| 2026-04-30 | `Placeholder`를 WDS `Thumbnail` 기반으로 변경 — 기존 w/h/label 호출 시그니처는 유지하고 미정 이미지 자리도 Thumbnail 표면으로 표현 |
| 2026-04-30 | TU 전용 tone island 흡수 — `handoff-tu-tone.css` 의존 제거, TU organisms를 WDS `Typography`/`Card`와 `SectionCard`/`InfoList`/`PromoBlock` 조합으로 재작성, 페이지 배경은 `semantic.surface.page.*`로 수렴 |
| 2026-04-30 | preview/mobile 모노레포 1차 분리 — `apps/mobile`은 WDS 모바일 화면, `apps/preview`는 shadcn 프리뷰 셸로 분리. preview는 mobile을 iframe으로만 소비 |
| 2026-04-30 | screen registry/spec SSOT 통합 — active registry와 active spec을 패키지 SSOT로 이동. mobile/preview 하드코딩 목록과 mobile generated registry 제거 |
| 2026-05-07 | screens facade 제거. registry/spec/evaluation/catalog를 `@screen/registry`, `@screen/specs`, `@screen/evaluation`, `@screen/catalog`로 분리 |
| 2026-04-30 | screen generation benchmark SSOT 추가 — `packages/screen-evaluation/src/benchmark.ts`에 디자인/기획 평가 항목, API refs, 1~5 scoring hint 정의 |
| 2026-04-30 | `TextBlock` 추가 — WDS Typography 기반 `text`/`lines`, `maxLines`, `overflow="truncate"` 지원. 현재 공개 진입점은 `@pxds/pxds-components/typography` |
| 2026-04-30 | 홈 텍스트 전면 TextBlock 적용 후 기본 역할 variant로 승격 — `displayTitle`/`sectionLabel`/`contentTitle`/`listTitle`/`supportText`/`meta`/`assistive`/`price`/`rating`/`promo*`를 WDS Typography 조합으로 고정하고 raw banner font/letter-spacing 제거 |
| 2026-04-30 | bottom-sheet template API 도입 — `BottomSheetRoot`/`BottomSheetBackdrop`/`BottomSheetContent`/`BottomSheet`로 WDS Modal, dimmer, content 책임을 분리. 기존 `organisms/global`의 Backdrop/BottomSheet 제거 |
| 2026-04-30 | AppScreen flow-only 계약으로 단순화 — `topAccessory`/`bottomAccessory`/`contentInset`/`topBehavior`/`contentLayout` 제거. top/bottom chrome은 항상 layout flow를 차지하고, 검색 탭·구매 바는 각각 `top`/`bottom` 조합 안에서 표현 |
| 2026-04-30 | `ContentList` 전역화 — `AppScreenContent` 내부에서 모든 scroll content direct item gap을 `var(--spacing-4)`로 통일. 도메인별 `HomeBlockList` 제거 |
| 2026-04-30 | `SearchShell`을 `organisms/global/GlobalSearch`로 이동 — 검색 상단 chrome 조합은 global organism이 소유하고, 검색 도메인은 결과 탭/콘텐츠 섹션만 유지 |
| 2026-04-30 | `StickyActionBar` docked surface화 — `AppScreen.bottom` flow에 맞춰 플로팅 카드/그림자/gradient 제거, 하단 chrome 면 + 상단 divider로 정리 |
| 2026-04-30 | `MembershipContinueBar` docked surface화 — membership 하단 CTA도 `AppScreen.bottom` flow에 맞춰 플로팅 카드/그림자/gradient 제거 |
| 2026-04-30 | membership 진행률을 top global layout context로 이동 — `회원 가입 1/5` 같은 step fraction은 `MembershipTopBar` + WDS `ProgressIndicator`가 소유하고, `MembershipHero`는 본문 메시지만 표현 |
| 2026-04-30 | `product-detail.sdui.json` 파일럿 추가 — 정책 추출물(`x_policyExtract`) → 화면 계약(`x_screenContract`) → SDUI children 흐름을 한 화면에 적용. `RenderableScreenSpecV1` 타입과 검증 함수 추가 |
| 2026-04-30 | `/product-detail` SDUI 화면 생성 연결 — route가 `activeRenderableScreenSpecs["product-detail"]`를 읽고 `_sdui-renderer.tsx`로 AppScreen/Product organism을 생성하도록 전환 |
| 2026-04-30 | `/membership-terms-consent` 신규 화면 생성 — Notion형 정책 스펙 `membership-v3-01-terms-consent-join`을 `x_policyExtract`/`x_screenContract`/SDUI children으로 변환하고, membership organism + route renderer로 화면 생성 |
| 2026-04-30 | membership 화면 품질 1차 보정 — 약관 row 패턴을 `ConsentList` molecule로 승격하고, 법정대리인 안내를 `PromoBlock` 대신 `NoticeBlock` molecule로 교체 |
| 2026-04-30 | 스크린 생성 전용 세션 운영 절차 명시 — 정책서 읽기 → 화면 단위 분할 → `x_policyExtract`/`x_screenContract` → SDUI `data`/`children` → active registry → mobile renderer → lint/build 검증 순서로 고정 |
| 2026-04-30 | 스크린 생성 절차 — `x_interfacePlan`(genre/sectioning/cta_location/progress_location 등) + `x_heuristicReview`(11개 룰) 산출물 도입. `selector/form/result` 장르별 SectionCard 사용 정책 차등화 |
| 2026-04-30 | `SelectableList density="compact"` 도입 — sub 미렌더 + verticalPadding=small. form 장르 라디오 단일행 대응 |
| 2026-04-30 | `MembershipTopBar` `leading="back"|"close"` + `progress.showLabel` 옵션 — step flow는 back/thin progress, dead-end는 close |
| 2026-04-30 | `membership-leave-reason` flat 재설계 — SectionCard/NoticeBlock 제거, textarea 항상 노출(선택), error 메시지 폼 안 단일화 |
| 2026-04-30 | 스크린 생성 절차에 `x_interfacePlan`과 Heuristic Review 단계 추가 — 명세를 단순 계약으로 옮기기 전에 화면 장르, primary task, 정보 위계, progress/CTA 위치, caption measure 정책을 먼저 결정 |
| 2026-04-30 | `ContentRail` 채택 — screen margin 보정 금지, `ContentOutlet` 기본 inset / `ContentSection` bleed / `ContentRail` inset·measure로 가로 기준선과 caption 행폭을 분리 |
| 2026-05-04 | `x_pagination` 단계 신설 — 정책서와 `x_policyExtract` 사이에 화면 단위 분할 SSOT 단계를 명시화. 정책서당 1개 SSOT(`spec/active/<domain>/_pagination/<policy-id>.json`)와 각 route `.sdui.json`의 `x_pagination` 슬라이스(hybrid + hash guard 옵션 4) 운영. drift는 `_canonical_hash`로 lint 검증 |
| 2026-05-04 | spec 버킷 도메인화 — `spec/active/` 평탄에서 도메인 버킷(`membership/`, `nc-full/`, `nc-simple/`)으로 그룹. 한 도메인에 복수 정책 가능(`membership/`은 join + leave 2 정책). NC는 Full/Simple 두 정책서 분리 운영(`docs/NC_정책서_Full_v1.0_확정본.md`, `docs/NC_정책서_간소화_v1.0_확정본.md`) |
| 2026-05-04 | pagination 분할 단위 정정 — "정책서당 1개" → "use case(flow)당 1개". 정책서가 여러 flow(가입/휴면/탈퇴/재가입)를 담으면 flow별로 pagination 파일 분리. policy_id 형식 `<doc>-<use-case>`. 공유 화면(예: 본인인증)은 flow별 별도 route id로 분리 강제(`nc-join-auth`, `nc-rejoin-auth`). 컴포넌트는 organism 레벨에서 재사용 |
| 2026-05-07 | deprecated 앱 보존 디렉터리 제거 |
