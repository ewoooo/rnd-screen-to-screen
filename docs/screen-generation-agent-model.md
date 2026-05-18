# Screen Generation Agent Model

`SCREEN_GENERATION_FLOW.md`에서 분리한 운영 참고 문서다. 화면 생성 절차의 세부 산출물과 검증 명령은 각 SOT가 소유하고, 이 문서는 메인/서브 에이전트 협업 방식과 stage별 책임 경계를 설명한다.

## 역할 모델

스크린 생성은 기본적으로 **메인 에이전트의 오케스트레이션/승인**과 **서브 에이전트의 stage별 산출물 제작**으로 나눈다. 병렬화는 책임을 분산하기 위한 장치가 아니다. 서브 에이전트는 정해진 입력, write scope, 완료조건 안에서 빠르게 artifact를 만들고, 메인 에이전트는 정책 충실도, 레이아웃 보존, 디자인 시스템 일관성, 산출물 간 최종 정합성을 승인한다.

메인 에이전트는 전체 작업의 매니저이자 최종 책임자다. 작업 범위를 해석하고, stage별 서브 에이전트에게 입력/출력/write scope/no-touch 파일/승인 검사 항목을 지정하며, `Screen.map.md -> Screen.diagram.html -> 구현 -> Screen.config.ts -> route/preview` 연결이 끊기지 않도록 판단한다. 서브 에이전트가 특정 stage artifact를 완성해도, cross-artifact consistency는 항상 메인 에이전트 소유다.

메인 에이전트의 독점 승인 권한은 다음 세 가지다.

- **Geometry evidence approval**: 렌더된 화면의 section/slot/stack/bounding box가 Diagram과 layoutContract를 보존하는지 승인한다. 텍스트 존재 확인이나 코드 diff만으로 통과시키지 않는다.
- **Design iteration approval**: 렌더 evidence에서 발견한 visual/layout 문제를 어떤 방향으로 고칠지 결정하고, iteration 결과가 정책 의미와 디자인 시스템을 해치지 않았는지 승인한다.
- **Contract sync final approval**: Design Iteration 이후 변경된 실제 구현과 `Screen.map.md`, `Screen.diagram.html`, `Screen.config.ts`, route/preview 노출이 서로 같은 화면 계약을 말하는지 최종 승인한다.

서브 에이전트는 위임받은 stage의 산출물을 만드는 워커다. Diagram 초안, Fast Build 구현, Render Geometry Evidence 수집, Design Iteration 패치, Contract Sync 초안 작성은 맡을 수 있다. 하지만 geometry evidence의 승인, design iteration 방향 승인, contract sync의 최종 승인, 산출물 간 충돌 해결은 메인 에이전트가 직접 수행한다.

기본 실행은 continuous execution이다. 사용자가 특정 stage까지만 하라고 명시하지 않는 한, 메인 에이전트는 stage마다 진행 허락을 묻지 않는다. 다만 구현 전 공개 체크포인트가 필요한 작업에서는 Reference Decision, Component Candidate Decision, Build Plan을 사용자에게 승인 가능한 형태로 보여주고, 사용자 승인/수정/중단 지시를 받은 뒤 Fast Build로 진입한다.

하위 에이전트 위임 전 작업 지시에는 worker 이름, stage, write scope, no-touch 파일, 입력 SOT, 완료 산출물, 승인 검사 항목을 반드시 포함한다. 작은 P0 수정도 예외가 아니다. 사용자가 “누가 무엇을 어디까지 만지는지” 볼 수 있어야 한다.

하위 에이전트 완료 후 메인 에이전트는 결과 보고를 참고하되 승인 전에는 별도로 확인한다. 최소 확인은 `git diff --stat`, worker별 scoped diff, 해당 validation/lint/build, UI 변경 시 bounding box/viewport/scroll/overlap 기반 geometry evidence다. Screenshot/capture artifact는 보조 증거로만 사용한다.

## Stage 책임

새로운 실행 모델은 긴 선행 Diagram과 늦은 QA를 줄이고, 얇은 구조 계약을 빠르게 만든 뒤 실제 렌더 증거로 반복한다.

| Stage | Subagent 가능 작업 | Main agent 책임 |
|---|---|---|
| Diagram | wire reference 탐색, 핵심 section/slot/OGN 구조, layoutContract, componentCandidates 초안 작성, 1차 draft 후 `DESIGN_PATTERNS.md` 대조 결과 기록 | Reference/OGN/component 결정 승인, Design Pattern Review Gate 승인, Diagram이 정책 의미와 구조 계약을 담는지 승인 |
| Fast Build | 승인된 Diagram 기준으로 OGN/Screen/config 구현 또는 보강 | write scope 충돌 조정, 구현이 승인된 계약에서 벗어나지 않는지 검수 |
| Render Geometry Evidence | preview/mobile 렌더 확인, bounding box, section geometry, viewport, scroll/rail, overflow/overlap evidence 수집 | geometry evidence approval 소유. 실제 렌더가 layoutContract를 지키는지 최종 판단 |
| Design Iteration | evidence 기반 spacing/stack/component 조정 패치, 필요 시 후보 component 보강 | design iteration approval 소유. 수정 방향, 반복 종료 여부, 정책/DS 훼손 여부 판단 |
| Contract Sync | 실제 구현과 맞도록 `Screen.diagram.html`, `Screen.config.ts`, route/preview 메타 초안 동기화 | contract sync final approval 소유. map/diagram/config/implementation/route 최종 정합성 승인 |

### Diagram

Diagram은 완성형 명세가 아니라 Fast Build를 시작할 수 있는 최소 구조 계약이다. 서브 에이전트는 유사 wire reference, 화면 pattern, 주요 section/slot, OGN boundary, layoutContract, componentCandidates를 빠르게 정리한다. 세부 시각 완성도와 모든 edge copy를 여기서 끝내려 하지 않는다.

메인 에이전트는 Diagram 단계에서 다음을 승인한다.

- 정책 의미상 반드시 보여야 하는 정보/선택지/제약/에러가 구조에서 빠지지 않았는가
- OGN boundary와 section hierarchy가 구현 가능한가
- componentCandidates가 layout capability 기준으로 적절한가
- 1차 Diagram draft 이후 `DESIGN_PATTERNS.md`의 pattern/layout/spacing contract를 다시 대조했고, 그 결과가 `patternRecheck`로 기록됐는가
- Fast Build에 들어갈 수 있을 만큼 layoutContract가 구체적인가

### Fast Build

Fast Build는 승인된 Diagram을 실제 React 화면으로 빠르게 옮기는 stage다. 서브 에이전트는 `apps/mobile/src/organisms/`, `Screen.tsx`, `Screen.config.ts` 등 승인된 write scope 안에서만 작업한다. 같은 organism/component 파일을 여러 worker가 동시에 수정할 가능성이 있으면 메인 에이전트가 파일 소유 범위를 나누거나 순차화한다.

Fast Build의 목적은 첫 렌더 가능한 화면을 만드는 것이다. 완성 판단은 코드 모양이 아니라 다음 stage의 Render Geometry Evidence에서 한다.

### Render Geometry Evidence

Render Geometry Evidence는 실제 브라우저 렌더를 기준으로 layoutContract 준수 여부를 증명하는 stage다. 서브 에이전트는 viewport 조건, section bounding box, 주요 CTA 위치, overflow/overlap 여부, bottom area 안전성 같은 geometry evidence를 수집한다. Screenshot/capture artifact는 가능할 때 남기는 보조 증거다.

메인 에이전트는 evidence를 승인하거나 반려한다. 다음 경우는 통과할 수 없다.

- geometry evidence 없이 DOM/text 존재만 확인한 경우
- section/slot geometry가 Diagram과 다르지만 deviationReason이 없는 경우
- CTA, notice, error, bottom sheet, safe area가 겹치거나 잘린 경우
- mobile viewport에서 핵심 과업 흐름이 보이지 않는 경우

### Design Iteration

Design Iteration은 Render Geometry Evidence에서 확인한 문제를 고치는 stage다. 서브 에이전트는 spacing token, component 조합, section stack, content density, copy wrapping, state 표현을 조정할 수 있다. 정책 의미나 component vocabulary를 바꾸는 수정은 메인 에이전트 승인 없이 확정하지 않는다.

메인 에이전트는 iteration 방향을 승인하고, 반복 종료 조건을 정한다. 종료 기준은 “더 이상 눈에 띄는 문제가 없음”이 아니라, geometry evidence와 디자인 시스템 기준으로 layoutContract가 보존됐다는 판단이다.

### Contract Sync

Contract Sync는 구현 후 실제 화면 계약을 문서와 registry에 맞추는 stage다. 서브 에이전트는 `Screen.diagram.html`의 visible review/hidden contract, `Screen.config.ts`의 generation metadata, route/preview 메타 초안을 동기화할 수 있다.

최종 승인은 메인 에이전트가 한다. 특히 Design Iteration에서 실제 구조가 바뀌었다면, 변경이 `Screen.map.md`, `Screen.diagram.html`, 구현, config, route에 같은 의미로 반영됐는지 확인한다. 서브 에이전트가 만든 sync artifact는 초안이며, 최종 cross-artifact consistency는 메인 소유다.

## Step-Batch 병렬화 규칙

여러 화면 제작 요청에서는 기본 위임 단위가 “한 화면 end-to-end 완주”가 아니라 “같은 stage의 화면별 batch 산출물”이다. 메인 에이전트는 전체 화면 inventory와 파일 소유 범위를 먼저 만든 뒤, stage별 병렬 작업을 실행하고, stage gate를 통합 승인한 뒤 다음 stage로 넘어간다.

권장 진행 표시는 화면별 완료가 아니라 stage batch 상태를 보여야 한다.

```txt
Batch 1 · Diagram 병렬 진행
  - FP-001 Diagram
  - FP-002 Diagram
  - FP-003 Diagram
  - FP-005 Diagram
  - Main Gate: Diagram 통합 승인

Batch 2 · Fast Build 병렬 진행
Batch 3 · Render Geometry Evidence 병렬 수집
Batch 4 · Design Iteration 병렬 패치
Batch 5 · Contract Sync 통합
```

병렬화 규칙은 다음과 같다.

- Diagram은 화면별 병렬 실행을 기본으로 한다. 메인은 전체 batch의 policy coverage, OGN boundary, wire reference, componentCandidates가 서로 충돌하지 않는지 통합 승인한다.
- Fast Build는 승인된 Diagram만 병렬 제작한다. 같은 파일, 같은 organism, 같은 shared component를 여러 worker가 만질 수 있으면 메인이 write scope를 분리하거나 순차화한다.
- Render Geometry Evidence는 화면별 병렬 수집할 수 있다. 단, evidence format과 viewport 기준은 batch 시작 전에 메인이 통일한다.
- Design Iteration은 evidence issue 단위로 병렬화할 수 있다. 한 화면의 같은 layout stack을 여러 worker가 동시에 고치지 않는다.
- Contract Sync는 최종 통합 stage다. 초안 작성은 병렬 가능하지만, 최종 승인과 cross-artifact consistency 판정은 메인 에이전트가 단일 gate로 처리한다.
- 단일 화면 요청이나 명확히 독립적인 단순 detail/complete 화면은 예외적으로 한 worker에게 연속 위임할 수 있다. 멀티 화면 batch에서 이 예외를 쓰면 예외 사유와 메인 gate 위치를 명시한다.

## 책임 경계

서브 에이전트의 작업 메모나 중간 판단은 원문을 별도 산출물로 늘리지 않는다. 메인 에이전트가 승인한 결정만 해당 소유 파일에 반영한다. 정책/copy/governance 결정은 `Screen.map.md`, 구조/pattern/layoutContract/componentCandidates는 `Screen.diagram.html`, 구현 선택과 차이는 `Screen.config.ts` 또는 작업 로그의 `deviationReason`에 남긴다.

서브 에이전트가 생성한 artifact 사이에 불일치가 있으면 마지막으로 쓴 worker가 아니라 메인 에이전트가 해결한다. 특히 다음 불일치는 메인 승인이 필요하다.

- `Screen.map.md`의 필수 정책 정보가 Diagram 또는 구현에서 누락됨
- Diagram의 layoutContract와 Fast Build의 DOM 구조가 다름
- Render Geometry Evidence가 layoutContract 위반을 보여주는데 Contract Sync가 통과 처리함
- Design Iteration에서 componentCandidates 또는 OGN boundary가 바뀜
- route/preview 노출명, config generation metadata, 화면 파일의 screen ID가 서로 다름

최종 보고는 메인 에이전트만 한다. 보고에는 stage별로 무엇을 만들었는지, 어떤 evidence로 승인했는지, 어떤 파일이 변경됐는지, 남은 risk 또는 실행하지 못한 검증이 있는지를 포함한다.
