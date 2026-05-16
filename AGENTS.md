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
3. `packages/policy-core/governance/**/*.md` — UX 원칙(UXP), UI pattern/state control(UXPT), UX writing/voice(VOT) SOT
4. [SKT GenUI Test 0512](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_GenUI_Test_0512?node-id=12001-103520&t=MXbXJQlMpLVcgIv3-1) — 실제 페이지 목업 Figma SOT
5. `DESIGN_FOUNDATION.md` — color, typography, radius, icon, spacing 등 디자인 foundation SOT
6. `DESIGN_PATTERNS.md` — Main, list, detail, form, complete, bottom sheet, popup 등 화면 패턴 SOT
7. `SPACING_PATTERNS.md` — foundation spacing token을 화면·컴포넌트 실측 간격으로 적용하는 운영 규칙
8. `SCREEN_STRUCTURE_PRINCIPLES.md` — Diagram과 화면 조립의 단순 구조 원칙
9. 가장 가까운 `AGENTS.md` — 패키지 책임, 의존 방향, 구현·검증 운영 규칙

정책과 governance, 디자인 문서가 충돌하면 정책 의미를 먼저 보존하고, UX governance의 행동·상태·문체 규칙을 적용한 뒤, 표현 방식은 디자인 foundation과 pattern 안에서 해결한다. 문서화된 토큰·패턴·컴포넌트 어휘 밖의 inline UI, 자체 spacing, 자체 fontSize가 필요하면 임의 확장하지 말고 시스템 깨짐 신호로 기록한다.

`Screen.map.md`, `Screen.diagram.md`, `Screen.config.ts`, 실제 구현이 `packages/policy-core/policies` 의 정책 원문/정의와 불일치하면 항상 policy-core를 우선한다. 불일치는 map에 기록하되, 최종 화면 요구·copy·구현은 policy-core 기준으로 수정한다.

SB 기반 신규 생성 절차에서는 Figma 목업 SOT를 필수 대조 대상으로 삼지 않는다. 실제 페이지를 재현하거나 신규 화면의 시각 기준을 확인하는 작업에서만 Figma 목업 SOT를 함께 확인한다. Figma 목업은 최종 화면의 구체적 배치와 상태 참고 기준이며, foundation token과 pattern contract를 우회하는 근거로 사용하지 않는다.

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
│   ├── storybook/     cx-components와 cx-tokens 카탈로그용 Storybook 셸
│   └── figma-export/  Figma export 보조 앱
├── packages/
│   ├── policy-core/               Policy / UseCase / UX Governance 순수 문서 도메인
│   ├── pxds-spec/                 screen/component registry와 UI 비의존 spec 타입
│   ├── cx-tokens/                 CX DS 기반 token SSOT
│   ├── cx-icons/                  CX DS icon originals + registry + React wrapper
│   ├── pxds-layout/               AppScreen, content layout, bottom-sheet, layout primitives
│   ├── cx-components/             최신 CX component package + inventory
│   ├── pxds-figma/                Figma bridge/hooks/spec authoring
│   └── pxds-figma-bridge-plugin/  Figma bridge plugin artifact
├── DESIGN_FOUNDATION.md  디자인 foundation SOT
├── DESIGN_PATTERNS.md    화면 패턴 SOT
├── SPACING_PATTERNS.md   화면·컴포넌트 spacing 실측 운영 규칙
├── SCREEN_STRUCTURE_PRINCIPLES.md  Diagram/화면 구조 원칙 SOT
├── SCREEN_GENERATION_FLOW.md  SB 첨부 기반 스크린 생성 5페이즈 절차 계약 SOT
├── AGENTS.md             루트 운영 방향
└── CLAUDE.md             AGENTS.md symlink
```

## 정책서 기반 화면 생성 흐름

새 화면을 만들거나 기존 화면을 고칠 때는 `SCREEN_GENERATION_FLOW.md` 의 **5페이즈 절차 계약**을 따른다. 이 문서(AGENTS.md)는 절차를 재서술하지 않고 페이즈 요약과 포인터만 둔다.

메인 에이전트와 서브 에이전트의 감독/교정 역할 분리는 `SCREEN_GENERATION_FLOW.md` 의 `## 에이전트 역할 모델`을 따른다.

1. **Extract** — SB에서 화면ID·도메인·과업·상태·CTA·정책태그·도메인모듈ID/OGN ID·slot/part/hierarchy 추출. 참고: SB.
2. **Map** — 정책 필수정보/선택지/제약/에러/sourceRef → 화면 요구 매트릭스, 사용자 copy 분리 + 적용 governance refs 선정. 산출: `Screen.map.md`(모든 화면 의무). 참고: `packages/policy-core/policies` (`.md` + `.policy.ts`)와 `packages/policy-core/governance`.
3. **Diagram** — 패턴 결정 + Phase 2 governance refs 적용 + OGN별 layoutStrategy + reuse/new 분기 + SB 기반 Diagram, Layout Distortion Gate 통과. 산출: `Screen.diagram.md`(모든 화면 의무). 참고: `DESIGN_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`, `SPACING_PATTERNS.md`.
4. **Build** — 정책서 OGN을 `apps/mobile/src/organisms/<domain>/` 에 제작/보강 + `Screen.tsx` 조립 + `Screen.config.ts`(`generation` 포함). 참고: `DESIGN_FOUNDATION.md`, `@pxds/cx-components`, `@pxds/cx-icons`, `@pxds/cx-tokens`, `@pxds/pxds-layout`.
5. **Register** — `apps/mobile/src/scripts/screen-routes/routes.ts` 등록 + preview 노출 확인.

페이즈별 책임·산출물·완료조건의 단일 SOT는 `SCREEN_GENERATION_FLOW.md`다. 검증은 절차 밖이며 아래 `## 공통 검증` 이 단독 소유한다.

`Screen.map.md` 는 정책 의미, `Screen.diagram.md` 는 화면 구조, `Screen.config.ts` 는 route 등록과 검증 가능한 ID 색인을 소유한다. 세 파일은 서로 내용을 재서술하지 않고 policy ID와 OGN ID로 연결한다.

## 패키지 책임

- `@policy/core` — 정책서 원문, use case, section, evidence reference, 구조화된 policy definition, UX governance source를 소유한다. Screen, route, component, UI runtime을 모른다.
- `@pxds/pxds-spec` — screen/component registry와 kind 같은 UI 비의존 spec 타입을 소유한다.
- `@pxds/cx-tokens` — 런타임 시각 token 값의 SSOT. CX primitive/semantic token set과 generated CSS를 제공한다.
- `@pxds/cx-icons` — CX DS Figma 원천 SVG, icon registry, React `Icon` wrapper 초안을 소유한다.
- `@pxds/pxds-layout` — `AppScreen`, `Content*`, bottom-sheet, layout primitives, screen export bridge를 소유한다.
- `@pxds/cx-components` — 최신 CX component package. 신규 화면/컴포넌트 제작의 기준 어휘와 구현 surface를 소유한다.
- `@pxds/pxds-figma` — Figma variables, component/page export, Figma renderer, Figma capture/hooks/spec authoring을 소유한다.
- `apps/mobile` — 정책 기반 모바일 화면 route와 PXDS 화면 조립의 SOT. page와 organism이 실제 React DOM을 직접 그리는 구조를 기준으로 삼는다.
- `apps/preview` — mobile을 iframe으로 소비하는 프리뷰 도구. screen/component/policy registry 탐색, Figma export 요청, spec 조회 UI를 소유한다.
- `apps/storybook` — Storybook 셸. `@pxds/cx-components`의 preview registry/examples를 자동으로 스토리로 변환하고 `@pxds/cx-tokens` 카탈로그(color/typography/spacing/radius/theme aliases) MDX를 제공한다. 컴포넌트와 토큰 어휘를 한 화면에서 확인할 때 사용한다.

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
  → @pxds/pxds-layout
  → apps/mobile

@pxds/pxds-figma → apps/preview
```

WDS와 외부 package 직접 사용은 패키지 경계로 흡수한다. **WDS Component와 삭제된 legacy adapter(`@pxds/pxds-components`, `@pxds/pxds-icons`)는 신규 화면/컴포넌트 제작의 기준 어휘로 삼지 않는다.**

- 기존 호환이 필요한 WDS/PXDS legacy component/icon은 현재 repo에 남은 실제 package 경계에서만 제한적으로 소비한다. 삭제된 `@pxds/pxds-components`, `@pxds/pxds-icons` import를 새로 추가하지 않는다.
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
- 새 component/variant/slot이 필요하면 먼저 `@pxds/cx-components`의 최신 어휘를 확인하고, 기존 molecule/pattern 축으로 표현 가능한지 검토한다. 삭제된 legacy adapter registry를 신규 기준으로 삼지 않는다.
- 아름다운 UI는 token과 pattern을 벗어난 장식이 아니라, 정책 정보의 위계, 간격, 상태, 행동이 명확하게 정리된 결과여야 한다.

## 디자인 품질 기준

- Foundation token을 직접 값으로 흉내 내지 않는다. 색상은 semantic role, 텍스트는 text style, 간격은 spacing token을 우선한다.
- 화면 패턴은 사용자의 과업 흐름을 보존해야 한다. form, detail, list, complete, bottom sheet, popup의 역할을 섞지 않는다.
- 한 화면 안에서 CTA, navigation, error, notice의 위계가 즉시 읽혀야 한다.
- 정책상 중요한 제한 조건과 에러는 숨기지 않는다. 단, 긴 정책 문장은 사용자가 행동할 수 있는 UI copy로 정리한다.
- WDS Component, 삭제된 legacy adapter import, 임의 inline UI로 빠르게 맞춘 결과가 반복되면 `@pxds/cx-components` / `@pxds/cx-icons` vocabulary를 보강할 후보로 기록한다.

## 공통 검증

검증은 스크린 생성 절차(`SCREEN_GENERATION_FLOW.md` 의 5페이즈)의 일부가 아니다. 절차 밖 게이트이며 이 섹션과 `@policy/core` 의 `check:*` 스크립트가 검증 명령·책임을 단독 소유한다. 작업 범위에 맞게 실행한다.

- mobile: `npm run lint -w @screen/mobile`, `npm run build -w @screen/mobile`
- preview: `npm run lint -w @screen/preview`, `npm run build -w @screen/preview`
- policy: `npm run check:compliance -w @policy/core` (= `check:policy-source` + `check:screen-generation`). 신규 화면 생성 정합성 강제는 `npm run check:screen-generation:strict -w @policy/core`.
- package-only 변경: 관련 package의 타입/consumer build로 검증한다. 이 모노레포는 앱 빌드가 가장 현실적인 통합 검증이다.
