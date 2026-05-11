# pxdx

## 프로젝트 목표

이 저장소는 **한정된 컴포넌트 어휘와 토큰만으로 다양한 모바일 화면 스펙을 일관되게 표현할 수 있는지 검증하는 디자인 시스템 strain test**다. 화면을 예쁘게 하나씩 만드는 것보다, 화면 수가 늘어나도 spacing, component vocabulary, pattern contract가 무너지지 않는지를 본다.

회의와 구현에서 항상 확인할 질문:

1. **간격 토큰 정규화 / 일관성** — spacing이 화면마다 임의로 늘었다 줄었다 하지 않는가?
2. **컴포넌트 규칙·패턴 일관성** — 다양한 페이지 스펙에서도 같은 컴포넌트 어휘로 표현되는가?

규칙: 제공된 토큰과 컴포넌트를 우선 사용한다. 어휘에 없는 inline UI, 자체 token, 자체 fontSize가 강요되면 시스템 깨짐 신호로 기록한다.

## 문서 배치

루트 `AGENTS.md`는 큰 방향과 패키지 지도만 남긴다. 세부 운영 규약은 가장 가까운 하위 `AGENTS.md`를 따른다. 이 `AGENTS.md` 분리는 작업 에이전트용 운영 지침이며, 별도 제품 문서나 README를 늘리는 목적이 아니다.

```txt
.
├── apps/
│   ├── mobile/       Active WDS 모바일 화면 렌더러
│   └── preview/      shadcn 기반 브라우저 프리뷰 셸
├── packages/
│   ├── pxds-tokens/      WDS theme 기반 토큰 SSOT
│   ├── pxds-icons/       WDS icon adapter + icon registry
│   ├── pxds-components/  순수 UI 컴포넌트 + 모바일 domains + core WDS re-export + component vocabulary registry
│   ├── pxds-layout/      화면/frame/layout runtime
│   ├── pxds-preview/     모바일 iframe preview/helper
│   ├── pxds-figma/       Figma bridge/hooks/spec authoring
│   ├── policy-core/      Policy / UseCase 순수 문서 도메인
│   ├── policy-authoring/ 문서/정책서 → Screen 도출 추적
│   └── screen-evaluation/ benchmark / audit / strain test
├── registry/         WDS/PXDS registry index
├── AGENTS.md         루트 운영 방향
├── DESIGN.md         디자인 수치, 토큰, 어휘 variant SSOT
└── CLAUDE.md         AGENTS.md symlink
```

디렉터리 이름 이력: 2026-04-29 옛 `app2/`가 active 앱으로 승격되었고, 2026-04-30 `apps/mobile/`, `apps/preview/` 모노레포 구조로 정리됨. 2026-05-07 deprecated 앱 보존 디렉터리는 제거됨.

## 패키지 책임

- `apps/mobile` — 실제 모바일 화면 route와 WDS/PXDS 화면 조립. 앱은 컴포넌트를 소유하지 않고 각 page 폴더의 route, mock/spec, SDUI renderer만 소유한다. 각 page 폴더가 `page.tsx`, `registry.ts`, `spec.json`, `sdui.json`를 함께 소유하며 `@screen/mobile/screens`로 화면 registry/spec를 재노출한다.
- `apps/preview` — mobile을 iframe으로 소비하는 프리뷰 도구. `@screen/mobile/screens`를 통해 page registry/spec를 읽고, component/policy registry 탐색, Figma export 요청, spec 조회 UI를 소유한다.
- `@pxds/pxds-tokens` — 런타임 시각 token 값의 SSOT. WDS theme 값을 흡수하고 CSS/token export를 제공한다.
- `@pxds/pxds-icons` — WDS icon adapter와 PXDS-owned frame icon registry.
- `@pxds/pxds-components` — WDS core re-export, atoms/typography, atoms/feedback, molecules, shared/global/domain 컴포넌트, 구현 세부 없는 component vocabulary registry. 모바일 화면에서 쓰는 컴포넌트 어휘는 이 패키지가 소유한다.
- `@pxds/pxds-layout` — `AppScreen`, `Content*`, bottom-sheet, layout primitives, screen export bridge.
- `@pxds/pxds-preview` — 모바일 iframe/view frame helper. 실제 화면 layout runtime을 소유하지 않는다.
- `@pxds/pxds-figma` — Figma variables, component/page export, Figma capture/hooks/spec authoring.
- `@policy/core` — Policy / UseCase 순수 문서 도메인. Screen을 모른다.
- `@policy/authoring` — 정책서와 screen 도출 사이 trace/evidence. 화면 contract 자체는 `@screen/mobile/screens`에서 읽는다.
- `@screen/evaluation` — benchmark/audit/scoring.

## 의존 방향

WDS와 외부 package 직접 사용은 패키지 경계로 흡수한다.

- WDS component는 `@pxds/pxds-components/core`를 통해 소비한다. 단, `@pxds/pxds-layout`의 bottom-sheet처럼 layout runtime 자체를 구성하는 WDS primitive는 순환 의존을 피하기 위해 layout 패키지 경계에서 직접 흡수한다.
- WDS icon은 `@pxds/pxds-icons`를 통해 소비한다.
- token 값은 `@pxds/pxds-tokens`와 generated CSS를 통해 소비한다.
- `apps/*`는 필요한 공개 패키지만 소비한다.
- `apps/mobile` 아래에 `src/components`를 두지 않는다. 화면 route는 `@pxds/pxds-components/molecules`, `@pxds/pxds-components/<domain>`, `@pxds/pxds-layout/*`를 직접 소비한다.
- `@pxds/pxds-components`는 모바일 shared/domain 구현을 위해 `@pxds/pxds-layout`을 의존할 수 있다.
- `@screen/mobile/screens`, `@policy/*`, `registry/`는 런타임 UI 의존성 없는 메타/문서 도메인을 유지한다.

패키지 대략 방향:

```txt
@pxds/pxds-tokens
  → @pxds/pxds-icons
  → @pxds/pxds-layout
  → @pxds/pxds-components
  → apps/mobile

@pxds/pxds-preview → apps/preview
@pxds/pxds-figma  → apps/preview
apps/mobile/src/app/<page-id> → @screen/mobile/screens → apps/preview, @screen/evaluation
@policy/core → @policy/authoring → @screen/mobile/screens
```

## 구현 원칙

- 요구사항의 중요한 개념이 코드에서 보이게 한다. 화면 route는 큰 구조와 책임이 읽히는 지도여야 한다.
- 추상화는 재사용 예감이 아니라 책임 분리에서 출발한다.
- optional/fallback은 API/mock/spec 경계에서 처리하고 하위 component에는 확정 값을 넘긴다.
- `useMemo` / `useCallback`은 기본 금지다. 렌더 비용이나 참조 안정성이 실제 문제가 되면 먼저 컴포넌트 경계, state 위치, 데이터 변환 위치를 조정한다.
- route/screen에서 margin, padding, raw style로 기준선을 보정하지 않는다. layout 책임은 `@pxds/pxds-layout`의 template과 primitives가 가진다.
- 새 component/variant/slot이 필요하면 먼저 `@pxds/pxds-components/registry`에서 현재 어휘를 확인하고, 기존 molecule/pattern 축으로 표현 가능한지 검토한다.

## Strain Signal

| 신호 | 해석 |
|---|---|
| 신규 컴포넌트 0 추가, 기존 어휘로 표현됨 | 시스템 generality 통과 |
| 신규 컴포넌트가 기존 어휘의 새 variant/slot으로 흡수됨 | 확장 가능성 통과 |
| 기존 preset에 계속 새 slot을 강제 추가해야 함 | compound/pattern 재설계 신호 |
| 화면이 inline raw section, 자체 token, 자체 fontSize를 강요함 | 어휘 부족 |

## 공통 검증

작업 범위에 맞게 실행한다.

- mobile: `npm run lint -w @screen/mobile`, `npm run build -w @screen/mobile`
- preview: `npm run lint -w @screen/preview`, `npm run build -w @screen/preview`
- package-only 변경: 관련 package의 타입/consumer build로 검증한다. 이 모노레포는 앱 빌드가 가장 현실적인 통합 검증이다.

## 변경 이력 요약

- 2026-04-29: active app 승격, WDS forced migration 시작.
- 2026-04-30: `apps/mobile`, `apps/preview` 모노레포 분리. Atomic 계층과 AppScreen 계약 정리.
- 2026-05-07: layout/components/icons/tokens/preview helper를 패키지로 승격. deprecated 앱 보존 디렉터리 제거.
- 2026-05-08: component catalog를 얇은 component vocabulary registry로 대체.
- 2026-05-11: 별도 `@pxds/component-registry` 패키지를 제거하고 `@pxds/pxds-components/registry`로 흡수.
- 2026-05-11: 하위 앱/패키지별 `AGENTS.md`로 운영 규약 분리. 루트는 개요와 방향만 유지.
- 2026-05-11: 모바일 앱 로컬 컴포넌트 계층을 제거하고 모바일 domains를 `@pxds/pxds-components`로 흡수.
