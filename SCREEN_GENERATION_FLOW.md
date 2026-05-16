# Screen Generation Flow

SB가 첨부됐을 때 스크린을 생성하는 절차 계약이다. 이 문서는 **언제 / 무엇을 / 어떤 문서를 보고** 만드는지만 정의한다. 구조 원칙·패턴·spacing·foundation·검증의 내용은 각 참고 문서가 단독 소유하며, 이 문서는 가리키기만 한다(재서술 금지).

SB 기반 신규 생성 절차에서는 Figma SOT를 필수 대조 대상으로 삼지 않는다. Figma SOT는 실제 페이지 재현 또는 시각 기준 확인이 명시된 작업에서만 참조한다.

절차는 5개 책임 페이즈로 구성된다. 각 페이즈는 단일 책임, 고정 참고 문서, 고정 산출물, 완료조건(DoD)을 가진다. DoD는 검증이 아니라 "이 산출물이 내적으로 완성되어 다음 페이즈로 넘어갈 수 있는가"의 자체 판단 기준이다. `lint` / `build` / `check:*` 는 DoD가 아니다.

> **검증은 절차 페이즈가 아니다.** `lint` / `build` / `check:*` 실행과 그 책임은 `AGENTS.md` 의 `## 공통 검증` 섹션이 단독 소유하는 절차 밖 게이트다.

> **레이아웃 보존은 스크린 생성의 최우선 디자인 게이트다.** 정책 충실도는 무엇을 보여줄지 결정하고, 디자인 시스템은 어떻게 표현할지 제한하지만, Phase 3/4의 메인 에이전트 승인은 먼저 SB/wire reference/Diagram의 핵심 레이아웃이 보존됐는지 확인해야 한다. 레이아웃 보존을 해치는 정책 copy, component 선택, spacing 보정, 신규 OGN은 통과하지 않는다.

## 5 페이즈 계약

| Phase | 책임 (단일) | 참고 문서 (고정) | 산출물 | 완료조건 (DoD) |
|---|---|---|---|---|
| **1 · Extract** | SB → 화면ID·도메인·과업·상태·CTA·정책태그·도메인모듈ID/OGN ID·slot/part/hierarchy 추출 | SB (입력) | 추출 요약 | 화면ID·도메인·OGN ID·정책태그 누락 0으로 목록화 |
| **2 · Map** | 정책 필수정보/선택지/제약/에러/sourceRef → 화면 요구 매트릭스, 사용자 copy 분리 + 적용 governance refs 선정 | `packages/policy-core/policies/**/*.md`, `*.policy.ts`, `packages/policy-core/governance/**/*.md` | `Screen.map.md` | 모든 정책태그가 화면 정보/CTA/에러로 매핑되고, 관련 `UXP`/`UXPT`/`VOT` refs가 선정됨. 누락 시 다음 페이즈 진입 금지 |
| **3 · Diagram** | 유사 wire reference 탐색 + Pattern Analysis Gate + 화면 패턴 결정 + Phase 2 governance refs 적용 + OGN별 layoutStrategy/layoutContract 작성 + componentCandidates 나열 + SB 기반 Diagram, Layout Distortion Gate 자체 통과 | `apps/mobile/src/screen-diagrams/`, 기존 화면 `Screen.diagram.md`, `DESIGN_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`, `SPACING_PATTERNS.md`, Phase 2의 governance refs | `Screen.diagram.md` (모든 화면 의무) | `Screen→Chrome→Section→Slot→Stack→Component` 로 설명, `wireReference`와 한계, section별 patternEvidence/patternDecision, OGN별 layoutStrategy·layoutContract·componentCandidates·정책연결·governance 적용 표기 |
| **4 · Build** | Diagram의 layoutContract를 만족하는 컴포넌트/조합 선택 + 정책서 OGN 제작/보강 + `Screen.tsx` 조립 + `Screen.config.ts`(생성근거 포함) | `DESIGN_FOUNDATION.md`, `@pxds/cx-components`, `@pxds/cx-icons`, `@pxds/cx-tokens`, `@pxds/cx-layout` | `apps/mobile/src/organisms/<domain>/<ogn>/`, `Screen.tsx`, `Screen.config.ts` | Diagram의 모든 OGN/슬롯이 코드에 존재하고 layoutContract/Distortion Gates를 보존, `config.generation` 블록 채워짐 |
| **5 · Register** | route catalog 등록 + preview 노출 확인 | `apps/mobile/src/scripts/screen-routes/` | `routes.ts` 등록 항목 | route 등록 + preview iframe에서 해당 route 진입 가능 |

페이즈 이후 `lint` / `build` / `check:*` 는 절차 밖의 공통 검증 게이트(아래 `## 검증` 참조)가 실행한다.

## 운영 스킬

Codex 화면 생성 작업은 아래 `cx-*` 스킬을 사용해 페이즈별 절차를 고정한다. 스킬은 작업 실행 가이드이고, 이 문서와 각 SOT 문서가 절차/판단의 최종 기준이다.

프로젝트 로컬 스킬은 `.codex/skills/` 아래에 둔다. Phase 3 diagram 작업의 로컬 스킬 SOT는 `.codex/skills/cx-screen-diagram/SKILL.md`다.

| Phase | Skill | 역할 |
|---|---|---|
| 전체 관리 | `cx-screen-create` | 메인 에이전트가 5페이즈를 오케스트레이션하고 phase gate를 승인한다. |
| **1 · Extract** | `cx-screen-extract` | SB/첨부에서 화면ID·도메인·과업·상태·CTA·정책태그·OGN/slot/part/hierarchy를 추출한다. |
| **2 · Map** | `cx-screen-map` | 정책서·`.policy.ts`·governance를 `Screen.map.md`로 번역한다. |
| **3 · Diagram** | `cx-screen-diagram` | wire reference 탐색, Pattern Analysis Gate, 최신 Screen Wire rail, Section Contracts, layoutStrategy/layoutContract, componentCandidates를 `Screen.diagram.md`에 기록한다. |
| **4 · Build** | `cx-screen-build` | 승인된 Map/Diagram만 코드화하되, componentCandidates 중 layoutContract를 만족하는 구현을 선택하거나 필요한 OGN/component를 만든다. |
| **5 · Register** | `cx-screen-register-verify` | route catalog 등록과 policy/lint/build/preview 검증을 수행한다. |

작업자가 스킬을 사용할 수 없는 환경이면 같은 이름의 phase 규칙을 이 문서와 관련 SOT에서 직접 따른다. Phase 3에서 `cx-screen-diagram`을 건너뛰지 않는다.

## 페이즈 흐름

```mermaid
flowchart LR
    A["SB 첨부"] --> P1["Phase 1 · Extract<br/>SB → 화면ID/OGN/정책태그"]
    P1 --> P2["Phase 2 · Map<br/>정책 + governance → 요구 매트릭스"]
    P2 --> P3["Phase 3 · Diagram<br/>wire reference + 패턴 + governance 적용 + layoutStrategy + Diagram"]
    P3 --> P4["Phase 4 · Build<br/>OGN + Screen + config"]
    P4 --> P5["Phase 5 · Register<br/>route catalog + preview"]
    P5 -.->|절차 밖| G["공통 검증 게이트<br/>(AGENTS.md 공통 검증)"]
```

## 에이전트 역할 모델

메인 에이전트는 5페이즈 전체의 방향과 최종 정합성을 소유하고, 서브 에이전트는 위임받은 페이즈 산출물을 만든다. Phase 3/4에서는 레이아웃 보존을 최우선 승인 기준으로 삼고, 그 다음 정책 의미와 디자인 시스템 준수를 확인한다. 메인 에이전트의 검수는 다음 페이즈 진입을 승인하거나 반려하는 gate이며, 산출물 요약으로 대체하지 않는다.

상세 위임/점검 방식은 `docs/screen-generation-agent-model.md`를 참조한다.

## 페이즈별 책임

### Phase 1 · Extract

- 책임: SB에서 화면 ID, 도메인, 과업, 상태, CTA, 정책 태그, 도메인 모듈 ID, OGN ID, part/slot/hierarchy를 추출한다.
- 참고: SB(입력)
- 산출: 추출 요약(Phase 2 입력)
- DoD: 화면ID·도메인·OGN ID·정책태그가 누락 0으로 목록화된다.

### Phase 2 · Map

- 책임: 정책 필수정보·선택지·제약·에러·sourceRef를 화면 요구 매트릭스로 정리하고, 사용자에게 보여줄 copy를 분리한 뒤 적용 가능한 governance refs를 선정한다.
- 참고: `packages/policy-core/policies/**/*.md`, `packages/policy-core/policies/**/*.policy.ts`, `packages/policy-core/governance/**/*.md`
- 산출: `Screen.map.md` — 정책-화면 요구사항 매트릭스를 영구 기록한다.
- DoD: 모든 정책 태그가 화면 정보/CTA/에러로 매핑되고, 관련 `UXP`/`UXPT`/`VOT` refs가 선정된다. 정책 필수 정보 또는 필요한 governance refs가 누락되면 Phase 3로 진입하지 않는다.
- Governance 확인 시점은 이 페이즈다. 도메인 정책 매핑 직후 CTA, 상태, 에러/로딩/복구, navigation, writing tone에 영향을 주는 `UXP`/`UXPT`/`VOT` 항목을 `Screen.map.md`에 기록한다.
- 기록 항목: `governanceRefs`, `selectionReason`, `affectedRequirement`, `copy/state/CTA impact`, `notApplicableReason`(검토했지만 적용하지 않는 경우).
- 이 페이즈는 디자인 문서를 참조하지 않는다. 정책 충실도와 UX governance 적용 대상(무엇을 지켜야 하는가)이 디자인 표현(어떻게)에 의해 미리 걸러지지 않도록 의도적으로 분리한다.

### Phase 3 · Diagram

- 책임: `apps/mobile/src/screen-diagrams/` 와 기존 화면 `Screen.diagram.md` 에서 유사 wire reference를 먼저 찾고, Screen Wire를 그린 뒤, Pattern Analysis Gate로 반복 UI 구조와 divider evidence를 확정하고, 화면 패턴 결정 + Phase 2 governance refs 적용 + OGN별 layoutStrategy/layoutContract 작성 + componentCandidates 나열 + SB 기반 제작 Diagram 작성, Layout Distortion Gate 자체 통과.
- 참고: `apps/mobile/src/screen-diagrams/`, 기존 화면 `Screen.diagram.md`, `DESIGN_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`, `SPACING_PATTERNS.md`, Phase 2에서 선정한 `UXP`/`UXPT`/`VOT` refs
- 산출: `Screen.diagram.md` — **모든 화면 의무다.** 신규/기존 구분 없이 모든 화면이 이 산출물을 가진다.
- DoD: Diagram이 `Screen → Chrome → Section → Slot → Stack → Component` 구조로 설명되고, `Screen Contract`에 `wireReference`와 reference 한계가 기록되며, 각 section에 patternEvidence/patternDecision이 있고, 각 OGN에 layoutStrategy·layoutContract·componentCandidates·정책 연결·governance 적용 표기가 있다.
- 메인 에이전트 디자인 검수는 레이아웃 보존을 최우선으로 한다. SB/wire reference의 핵심 레이아웃, section 경계, slot 위치, CTA/navigation/notice/form field의 위치 관계, scroll/fixed 영역의 역할이 보존되지 않으면 정책·copy·component 판단이 맞아도 승인하지 않는다.
- Pattern Analysis Gate는 이 페이즈의 필수 선행 판단이다. 각 section에서 `sectionBoundary`, `fieldGrouping`, `rowSeparators`, `actionPlacement`, `typography`, `patternEvidence`, `patternDecision`을 확인하고 `Screen.diagram.md`의 `Section Contracts`에 기록한다. 실제 reference에 있는 contents divider, section divider band, row separator, field action slot을 단순 spacing gap이나 외부 버튼으로 대체하지 않는다. 선택 리스트와 row pattern은 `rowTitle`, `rowCaption`, `emphasisRule`, `controlLabelScale`까지 확인해 텍스트 위계 distortion을 막는다.
- 정책 정보 추가로 레이아웃이 늘어질 위험이 있으면 `Screen.diagram.md`에 접기, 분리, 우선순위 조정, 별도 state 처리 같은 layout preservation decision을 남긴다.
- 컴포넌트 후보는 `componentCandidates`로 나열하되, 후보명 자체를 승인 기준으로 삼지 않는다. Phase 4는 이 후보를 capability 기준으로 평가해 layoutContract를 가장 적은 왜곡으로 만족하는 구현을 선택한다.
- 이 페이즈는 governance를 새로 탐색하지 않는다. Phase 2에서 선정된 governance refs를 CTA hierarchy, button label, state handling, error/empty/loading treatment, navigation, writing tone 검증 기준으로 적용한다.
- 기록 항목: `appliedGovernanceRefs`, `sectionId`, `layoutOrStateDecision`, `copyDecision`, `CTA hierarchy/label decision`, `distortionRisk mitigated by governance`.
- Wire reference는 시각 구조와 밀도(AppScreen rail, section boundary, card/list/form/CTA placement, divider 사용)만 참고한다. `reference-only`, `unknown-from-figma-only/TBD`, `unknown/unregistered-from-figma` 값은 policy ID, OGN ID, route 계약, copy 근거로 승격하지 않는다.
- Diagram 작성 규칙, OGN별 layoutStrategy 형식, Layout Distortion Gate, 금지 신호, 설계 체크리스트의 상세는 `SCREEN_STRUCTURE_PRINCIPLES.md` 가 단독 소유한다. 이 문서는 그 규칙을 재서술하지 않고 그 문서를 따른다.

### Phase 4 · Build

- 책임: Diagram의 componentCandidates를 capability 기준으로 평가해 layoutContract를 만족하는 컴포넌트/조합을 선택하고, 정책서 도메인 모듈 ID/OGN별로 `apps/mobile/src/organisms/<domain>/` 아래에 OGN을 제작하거나 기존 OGN을 보강하고, `Screen.tsx` 를 Diagram 그대로 조립하며, `Screen.config.ts` 에 생성 근거(`generation`)를 담는다.
- 참고: `DESIGN_FOUNDATION.md`, `@pxds/cx-components`, `@pxds/cx-icons`, `@pxds/cx-tokens`, `@pxds/cx-layout`. `@pxds/pxds-components` / `@pxds/pxds-icons` 는 deprecated 호환 경계로만 다룬다.
- 산출: `apps/mobile/src/organisms/<domain>/<ogn>/`, `Screen.tsx`, `Screen.config.ts`
- DoD: Diagram의 모든 OGN/슬롯이 코드에 존재하고, `Screen.config.ts` 의 `generation` 블록이 채워진다.
- 메인 에이전트 구현 검수는 실제 렌더링에서 레이아웃 보존 여부를 먼저 본다. `Screen.diagram.md`의 section/slot/stack 배치, 하단 CTA/fixed 영역, scroll/content 영역, 모바일 viewport 줄바꿈, overflow, 겹침, 과도한 여백을 preview에서 확인한다.
- Build는 후보 컴포넌트의 이름 일치가 아니라 layoutContract와 Distortion Gates 충족을 기준으로 선택한다. 모든 후보가 distortion을 만들면 이름이 적힌 후보를 억지로 쓰지 않고 재사용 가능한 organism/component 후보를 만들거나 Diagram으로 되돌린다.
- route/screen/organism은 raw margin, padding, fontSize, color로 레이아웃을 억지 보정하지 않는다. layout primitive와 foundation token으로 보존할 수 없는 경우 임의 구현하지 않고 `deviationReason` 또는 component vocabulary 보강 후보로 기록한다.
- 기록 항목: `Screen.config.ts generation.governanceRefs`(지원 시), 또는 구현 PR/작업 로그에 `implementedGovernanceRefs`, `diagramSection`, `component/organism owner`, `deviationReason`(diagram과 다를 때)을 남긴다. Build 단계에서 새 governance 해석을 추가하지 않는다.

### Phase 5 · Register

- 책임: `apps/mobile/src/scripts/screen-routes/routes.ts` 에 화면을 등록하고, preview에서 해당 route가 노출되는지 확인한다.
- 참고: `apps/mobile/src/scripts/screen-routes/`
- 산출: `routes.ts` 등록 항목
- DoD: route catalog가 화면 디렉터리를 참조하고, preview iframe에서 해당 route로 진입할 수 있다.

## 생성 산출물 계약

SB 기반 화면 폴더는 다음 산출물을 가진다. `Screen.map.md` 와 `Screen.diagram.md` 는 **모든 화면 의무**다.

```txt
apps/mobile/src/app/(<domain>)/<screen-id>/
├── Screen.tsx
├── Screen.config.ts
├── Screen.map.md
├── Screen.diagram.md
├── page.tsx
└── index.ts
```

`Screen.config.ts` 는 route 등록 정보와 생성 근거(`generation`)를 함께 담는 단일 계약이다. `Screen.meta.json` 같은 별도 meta 파일을 만들지 않는다.

`Screen.map.md` 는 Phase 2의 정책-화면 요구사항 매트릭스와 적용 governance refs를 담는다. 최소한 화면 ID, 정책 태그/정책 ID, sourceRef, 필수 정보, 선택지, 제약, 에러, 사용자 copy, 관련 `UXP`/`UXPT`/`VOT` refs, 연결될 OGN ID 또는 미결정 사유를 포함해야 한다. 이 파일은 디자인 판단을 담지 않고, Phase 3의 `Screen.diagram.md` 가 참조하는 정책 충실도와 governance 적용 근거가 된다.

### Governance 기록 계약

Phase 2 이후 산출물은 governance 확인 결과를 아래처럼 이어 받아야 한다.

- `Screen.map.md`: 선정/비선정 근거를 기록한다. `governanceRefs`, `selectionReason`, `affectedRequirement`, `copy/state/CTA impact`, `notApplicableReason`을 남긴다.
- `Screen.diagram.md`: 선정된 refs의 적용 결과를 기록한다. `appliedGovernanceRefs`, `sectionId`, `layoutOrStateDecision`, `copyDecision`, `CTA hierarchy/label decision`, `distortionRisk mitigated by governance`를 남긴다.
- `Screen.config.ts`: 기계 검증 필드가 준비된 경우 `generation.governanceRefs`에 최소 ID 색인을 둔다. 필드가 없으면 config에 임의 필드를 추가하지 않고 PR/작업 로그에 구현 refs를 남긴다.
- `Screen.tsx`/organisms: governance 문서를 직접 재해석하지 않는다. `Screen.diagram.md`에 기록된 section/decision을 코드화한다.

### 산출물 책임 분리

| File | 책임 | 핵심 질문 | 담지 않는 것 |
| --- | --- | --- | --- |
| `Screen.map.md` | 정책 요구와 governance refs를 화면 요구로 번역하는 Phase 2 SOT | 무엇이 왜 화면에 있어야 하고, 어떤 UX/writing/state 규칙을 지켜야 하는가? | layoutStrategy, spacing, componentCandidates, AppScreen slot 구조, route 등록 정보 |
| `Screen.diagram.md` | 화면 구조와 layout/governance/wire reference 적용 판단을 기록하는 Phase 3 SOT | 그 요구를 어떤 시각 reference와 구조로 조립하고, 선정된 governance를 어떻게 반영하는가? | 정책 원문/sourceRef 상세 매트릭스, route catalog metadata, `createdAt`/`owner`/`status` |
| `Screen.config.ts` | route 등록과 생성 메타데이터를 담는 기계 계약 | 이 화면을 시스템이 어떻게 식별·노출·검증하는가? | 정책 요구 설명, 사용자 copy 전체, layoutStrategy, Screen Wire, 미결정 질문 |

흐름은 `Policy/SB → Screen.map.md → Screen.diagram.md → Screen.tsx/organisms → Screen.config.ts` 순서다. `Screen.config.ts` 는 map과 diagram의 내용을 재서술하지 않고, `policyRefs` 와 `ognIds` 같은 검증 가능한 최소 ID 색인만 가진다.

정합성 규칙:

- `Screen.map.md`, `Screen.diagram.md`, `Screen.config.ts`, 구현이 policy-core 정책 원문/정의와 불일치하면 policy-core를 우선하고 다른 산출물을 수정한다.
- `Screen.config.ts` 의 `generation.policyRefs` 는 `Screen.map.md` 에 등장해야 한다.
- `Screen.config.ts` 의 `generation.ognIds` 는 `Screen.map.md` 와 `Screen.diagram.md` 에 모두 등장해야 한다.
- Phase 2에서 선정한 governance refs는 `Screen.map.md` 에 등장해야 하고, 화면 구조·CTA·state·copy에 영향을 주는 항목은 `Screen.diagram.md` 에 적용 근거가 있어야 한다.
- `Screen.map.md` 의 `mapped` 요구사항은 최소 하나의 OGN ID를 가져야 한다.
- `Screen.diagram.md` 의 OGN이 `Screen.map.md` 에 없으면 `structural-only` 같은 사유를 남긴다.

```ts
import type { ScreenRouteConfig } from "@pxds/cx-spec";
import { defineScreenConfig } from "@pxds/cx-spec";

export const screenConfig = defineScreenConfig({
	id: "NOVA-MBR-PG-001-0",
	name: "MBR 가입 1·약관 동의",
	label: "MBR 가입 1·약관 동의",
	route: "/NOVA-MBR-PG-001-0",
	group: "mbr",
	owner: "@screen/mobile",
	status: "active",
	createdAt: "2026-05-11",
	domain: "mbr",
	node: { kind: "screen" },
	figma: { frameName: "NOVA-MBR-PG-001-0", width: 375, height: 812 },
	generation: {
		source: "SB",
		pattern: "form",
		policyRefs: ["POL-MBR-TERM-001-06"],
		ognIds: ["ogn-mbr-checkbox-terms"],
		designDocsChecked: [
			"DESIGN_PATTERNS.md",
			"DESIGN_FOUNDATION.md",
			"SPACING_PATTERNS.md",
			"SCREEN_STRUCTURE_PRINCIPLES.md",
		],
	},
} as const satisfies ScreenRouteConfig);
```

`Screen.diagram.md` 는 최소한 `AppScreen`, 화면 ID, `Screen.map.md` 에서 확정한 모든 OGN ID, `Screen.config.ts` 의 `generation.policyRefs` 의 모든 정책 ID를 포함해야 한다(`check:screen-generation` 계약). Diagram 구조 형식은 `SCREEN_STRUCTURE_PRINCIPLES.md` 를 따른다.

## 13단계 → 5페이즈 매핑 (추적성)

기존 13단계 절차가 어느 페이즈로 흡수되는지 명시한다.

- 기존 1 → Phase 1
- 기존 2 (SOT 6종 일괄 조회) → 해체. 페이즈별 고정 참고 문서로 분산(2단계 포괄 요구 제거)
- 기존 3 → Phase 2 (+ governance refs 선정)
- 기존 4·5·6·7·8 → Phase 3 (wire reference 탐색 + 패턴 결정 + governance 적용 + layoutStrategy/layoutContract + componentCandidates + Diagram + Layout Distortion Gate)
- 기존 9·10·11 → Phase 4
- 기존 11(route)·12(preview) → Phase 5
- 기존 13(검증) + 검증 명령 나열 서술 → 절차 밖 공통 검증 게이트로 이동

## 검증

검증은 이 절차 밖이다. 실행 명령과 책임은 `AGENTS.md` 의 `## 공통 검증` 섹션이 단독 소유한다. 생성 정합성은 `@policy/core` 의 `check:screen-generation`(+`--strict`), `check:policy-source` 가 검사한다.

## 관련 문서

- `SCREEN_STRUCTURE_PRINCIPLES.md` — Phase 3 구조/Diagram/layoutStrategy/Layout Distortion Gate 단독 소유
- `docs/screen-generation-agent-model.md` — 메인/서브 에이전트 운영 모델
- `DESIGN_PATTERNS.md` / `DESIGN_FOUNDATION.md` / `SPACING_PATTERNS.md` — Phase 3/4 패턴·시각·spacing 참고
- `packages/policy-core/policies` — Phase 2 도메인 정책 원천
- `packages/policy-core/governance` — Phase 2 governance refs 선정 원천, Phase 3 적용 기준
- `AGENTS.md` `## 공통 검증` — 검증 게이트 (절차 밖)
