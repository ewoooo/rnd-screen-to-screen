# pxdx

## 프로젝트 정체성

이 저장소는 **정책서 기반 모바일 스크린 생성 시스템**이다. 정책서에 담긴 요구사항과 사용자 과업을 확인하고, 이를 PXDS 디자인 시스템의 foundation token과 화면 pattern으로 번역해 일관되고 아름다운 모바일 화면을 만든다.

중요한 목표는 두 가지다.

1. **정책 충실도** — 화면의 정보, 제약, 에러, 선택지는 정책서 원문과 use case에서 나온 것인가?
2. **디자인 시스템 일관성** — 화면 수가 늘어나도 spacing, typography, component vocabulary, pattern contract가 무너지지 않는가?

좋은 화면은 정책 의미를 숨기지 않고, 사용자가 해야 할 일을 선명하게 만든다. 단순히 예쁜 단발 화면을 만드는 것이 아니라, 정책 문서에서 출발해 반복 가능한 모바일 UI 생성 규칙을 검증한다.

## SOT 우선순위

작업 판단은 아래 순서를 따른다.

1. `packages/policy-core/policies/**/*.md` — 정책서 원문과 정책 항목의 문서 SOT
2. `packages/policy-core/policies/**/*.policy.ts` — 화면과 카피가 참조할 수 있는 구조화된 정책 정의
3. [SKT GenUI Test 0512](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_GenUI_Test_0512?node-id=12001-103520&t=MXbXJQlMpLVcgIv3-1) — 실제 페이지 목업 Figma SOT
4. `DESIGN_FOUNDATION.md` — color, typography, radius, icon, spacing 등 디자인 foundation SOT
5. `DESIGN_PATTERNS.md` — Main, list, detail, form, complete, bottom sheet, popup 등 화면 패턴 SOT
6. 가장 가까운 `AGENTS.md` — 패키지 책임, 의존 방향, 구현·검증 운영 규칙

정책과 디자인 문서가 충돌하면 정책 의미를 먼저 보존하고, 표현 방식은 디자인 foundation과 pattern 안에서 해결한다. 문서화된 토큰·패턴·컴포넌트 어휘 밖의 inline UI, 자체 spacing, 자체 fontSize가 필요하면 임의 확장하지 말고 시스템 깨짐 신호로 기록한다.

실제 페이지를 재현하거나 신규 화면의 시각 기준을 확인할 때는 Figma 목업 SOT를 함께 확인한다. Figma 목업은 최종 화면의 구체적 배치와 상태 참고 기준이며, foundation token과 pattern contract를 우회하는 근거로 사용하지 않는다.

## 핵심 질문

회의, 설계, 구현, 리뷰에서 항상 확인한다.

1. 이 화면의 핵심 요구사항은 어떤 정책 항목에서 왔는가?
2. 정책서의 필수 정보, 선택지, 제한 조건, 에러 메시지가 화면에서 누락되지 않았는가?
3. 같은 종류의 과업을 기존 component vocabulary와 pattern contract로 표현하고 있는가?
4. spacing, typography, color, radius가 `DESIGN_FOUNDATION.md`의 token 체계를 벗어나지 않는가?
5. 새 component, variant, slot이 정말 필요한가, 아니면 기존 molecule/pattern 조합으로 충분한가?

## 문서와 패키지 지도

루트 `AGENTS.md`는 큰 방향과 패키지 지도를 남긴다. 세부 운영 규약은 가장 가까운 하위 `AGENTS.md`를 따른다. 이 문서는 작업 에이전트용 운영 지침이며, 별도 제품 문서나 README를 늘리는 목적이 아니다.

```txt
.
├── apps/
│   ├── mobile/        정책 기반 모바일 화면 route와 PXDS 화면 조립
│   ├── preview/       화면·컴포넌트·정책 registry를 탐색하는 브라우저 프리뷰 셸
│   └── figma-export/  Figma export 보조 앱
├── packages/
│   ├── policy-core/               Policy / UseCase 순수 문서 도메인
│   ├── pxds-spec/                 screen/component registry와 UI 비의존 spec 타입
│   ├── cx-tokens/                 CX DS 기반 token SSOT
│   ├── cx-icons/                  CX DS icon originals + registry + React wrapper
│   ├── pxds-icons/                WDS icon adapter + PXDS icon registry
│   ├── pxds-layout/               AppScreen, content layout, bottom-sheet, layout primitives
│   ├── pxds-components/           Deprecated legacy PXDS/WDS component adapter
│   ├── cx-components/             최신 CX component package + inventory
│   ├── pxds-figma/                Figma bridge/hooks/spec authoring
│   └── pxds-figma-bridge-plugin/  Figma bridge plugin artifact
├── DESIGN_FOUNDATION.md  디자인 foundation SOT
├── DESIGN_PATTERNS.md    화면 패턴 SOT
├── SCREEN_GENERATION_FLOW.md  SB 첨부 기반 스크린 생성 workflow SOT
├── AGENTS.md             루트 운영 방향
└── CLAUDE.md             AGENTS.md symlink
```

## 정책서 기반 화면 생성 흐름

새 화면을 만들거나 기존 화면을 고칠 때는 아래 흐름을 기본으로 한다.

SB가 첨부된 신규 화면 생성은 `SCREEN_GENERATION_FLOW.md`를 따른다. 이 문서는 SB 구조 추출, 필수 SOT 조회, 제작 Diagram 생성, Diagram 검증, OGN 구현, Screen 조립, preview/검증까지의 표준 순서를 정의한다.

1. SB에서 화면 ID, 도메인, 과업, 상태, CTA, 정책 태그, 도메인 모듈 ID, OGN ID, part/slot/hierarchy를 추출한다.
2. `packages/policy-core/policies`에서 관련 정책 md와 `.policy.ts`를 확인한다.
3. `DESIGN_PATTERNS.md`와 `DESIGN_FOUNDATION.md`를 반드시 조회한다.
4. 정책의 필수 요구사항, 선택지, 제한 조건, evidence/sourceRef, 사용자에게 보여줄 copy를 분리한다.
5. 화면 유형을 `DESIGN_PATTERNS.md`의 패턴 중 하나로 매핑한다. 맞는 패턴이 없으면 새 패턴을 만들기 전에 기존 패턴의 변형으로 표현 가능한지 검토한다.
6. 구현 전에 SB 기반 제작 Diagram을 작성한다. Diagram은 AppScreen slot, OGN 배치, 주요 컴포넌트, 정책 연결을 함께 보여주어야 한다.
7. Diagram 단계에서 정책 필수 정보, 정책서의 도메인 모듈 ID/OGN 포함 여부, 패턴/토큰/spacing 위반 여부를 검증한다.
8. 정책서에 적힌 도메인 모듈 ID/OGN별로 반드시 `apps/mobile/src/organisms/<domain>/` 아래에 컴포넌트를 제작하거나 기존 OGN을 보강한다.
9. 시각 표현은 `DESIGN_FOUNDATION.md`의 semantic token, text style, spacing, radius, icon 규칙을 우선한다.
10. 구현은 `@pxds/pxds-layout`, `@pxds/cx-components`, `@pxds/pxds-icons`, `@pxds/cx-tokens`의 공개 surface를 우선 사용한다. `@pxds/pxds-components`는 deprecated 호환 경계로만 다룬다.
11. 화면 route는 정책 의미와 화면 구조가 읽히는 지도여야 한다. 복잡한 의미 단위는 `apps/mobile/src/organisms`에 둔다.
12. preview에서 screen, component, policy registry를 통해 생성 결과를 탐색 가능하게 유지한다.

## 패키지 책임

- `@policy/core` — 정책서 원문, use case, section, evidence reference, 구조화된 policy definition을 소유한다. Screen, route, component, UI runtime을 모른다.
- `@pxds/pxds-spec` — screen/component registry와 kind 같은 UI 비의존 spec 타입을 소유한다.
- `@pxds/cx-tokens` — 런타임 시각 token 값의 SSOT. CX primitive/semantic token set과 generated CSS를 제공한다.
- `@pxds/cx-icons` — CX DS Figma 원천 SVG, icon registry, React `Icon` wrapper 초안을 소유한다.
- `@pxds/pxds-icons` — WDS icon adapter와 PXDS-owned frame icon registry를 소유한다.
- `@pxds/pxds-layout` — `AppScreen`, `Content*`, bottom-sheet, layout primitives, screen export bridge를 소유한다.
- `@pxds/cx-components` — 최신 CX component package. 신규 화면/컴포넌트 제작의 기준 어휘와 구현 surface를 소유한다.
- `@pxds/pxds-components` — deprecated legacy PXDS/WDS component adapter. 신규 화면/컴포넌트 제작의 기준 어휘로 삼지 않고, 기존 호환이 필요한 경우에만 제한적으로 소비한다.
- `@pxds/pxds-figma` — Figma variables, component/page export, Figma renderer, Figma capture/hooks/spec authoring을 소유한다.
- `apps/mobile` — 정책 기반 모바일 화면 route와 PXDS 화면 조립의 SOT. page와 organism이 실제 React DOM을 직접 그리는 구조를 기준으로 삼는다.
- `apps/preview` — mobile을 iframe으로 소비하는 프리뷰 도구. screen/component/policy registry 탐색, Figma export 요청, spec 조회 UI를 소유한다.

## 의존 방향

정책 문서 도메인과 UI 런타임은 분리한다. 정책은 화면을 모르고, 화면은 정책 정의를 읽어 사용자 경험으로 번역한다.

```txt
@policy/core
  → @pxds/pxds-spec
  → apps/mobile screens
  → apps/preview

@pxds/cx-tokens
  → @pxds/cx-icons
  → @pxds/cx-components
  → @pxds/pxds-icons
  → @pxds/pxds-layout
  → apps/mobile

@pxds/pxds-figma → apps/preview
```

WDS와 외부 package 직접 사용은 패키지 경계로 흡수한다. **WDS Component와 `@pxds/pxds-components`는 deprecated이며 신규 화면/컴포넌트 제작의 기준 어휘로 삼지 않는다.**

- 기존 호환이 필요한 WDS/PXDS legacy component는 `@pxds/pxds-components` 경계를 통해 제한적으로 소비한다.
- 신규 구현은 `@pxds/cx-components`, `DESIGN_FOUNDATION.md`, `DESIGN_PATTERNS.md`를 우선한다.
- `@wanteddev/wds` 직접 import는 adapter/core 경계 안에 격리한다.
- `@pxds/pxds-layout`의 bottom-sheet처럼 layout runtime 자체를 구성하는 WDS primitive는 순환 의존을 피하기 위해 layout 패키지 경계에서 직접 흡수할 수 있다.
- `apps/*`는 필요한 공개 패키지만 소비한다.
- `apps/mobile` 아래에 `src/components`를 두지 않는다.

## 구현 원칙

- 정책 요구사항의 중요한 개념이 코드에서 보이게 한다. 화면 route는 큰 구조와 책임이 읽히는 지도여야 한다.
- optional/fallback은 API/mock/spec 경계에서 처리하고 하위 component에는 확정 값을 넘긴다.
- `useMemo` / `useCallback`은 기본 금지다. 렌더 비용이나 참조 안정성이 실제 문제가 되면 먼저 컴포넌트 경계, state 위치, 데이터 변환 위치를 조정한다.
- route/screen에서 margin, padding, raw style로 기준선을 보정하지 않는다. layout 책임은 `@pxds/pxds-layout`의 template과 primitives가 가진다.
- 새 component/variant/slot이 필요하면 먼저 `@pxds/cx-components`의 최신 어휘를 확인하고, 기존 molecule/pattern 축으로 표현 가능한지 검토한다. `@pxds/pxds-components/registry`는 deprecated legacy 참고로만 사용한다.
- 아름다운 UI는 token과 pattern을 벗어난 장식이 아니라, 정책 정보의 위계, 간격, 상태, 행동이 명확하게 정리된 결과여야 한다.

## 디자인 품질 기준

- Foundation token을 직접 값으로 흉내 내지 않는다. 색상은 semantic role, 텍스트는 text style, 간격은 spacing token을 우선한다.
- 화면 패턴은 사용자의 과업 흐름을 보존해야 한다. form, detail, list, complete, bottom sheet, popup의 역할을 섞지 않는다.
- 한 화면 안에서 CTA, navigation, error, notice의 위계가 즉시 읽혀야 한다.
- 정책상 중요한 제한 조건과 에러는 숨기지 않는다. 단, 긴 정책 문장은 사용자가 행동할 수 있는 UI copy로 정리한다.
- WDS Component, deprecated `@pxds/pxds-components`, 임의 inline UI로 빠르게 맞춘 결과가 반복되면 `@pxds/cx-components` vocabulary를 보강할 후보로 기록한다.

## 공통 검증

작업 범위에 맞게 실행한다.

- mobile: `npm run lint -w @screen/mobile`, `npm run build -w @screen/mobile`
- preview: `npm run lint -w @screen/preview`, `npm run build -w @screen/preview`
- policy: `npm run check:compliance -w @policy/core`
- package-only 변경: 관련 package의 타입/consumer build로 검증한다. 이 모노레포는 앱 빌드가 가장 현실적인 통합 검증이다.
