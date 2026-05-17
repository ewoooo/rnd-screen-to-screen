# Screen Generation Workflow Improvement Plan

이 문서는 SB 파일 수신형 화면 생성 작업이 블랙박스화되는 문제를 줄이고, 패턴 무시·정렬 불량·임의 CSS 보정을 제작 중에 잡기 위한 개선 계획이다.

`SCREEN_GENERATION_FLOW.md`는 현재 5페이즈 절차 계약을 소유한다. 이 문서는 그 계약을 즉시 대체하지 않고, 실제 작업 루프에 추가해야 할 공개 게이트와 책임 분리를 정의한다.

## 문제 정의

현재 작업은 산출물과 자동 검증은 남지만, 중간 판단이 사용자에게 충분히 공개되지 않는다.

현재 실제 흐름은 대략 아래와 같다.

```txt
요청 수신
→ 관련 파일 탐색
→ map / diagram / config / 구현 읽기
→ 내부적으로 reference / OGN / component 후보 판단
→ 바로 문서와 구현 수정
→ check / lint / build
→ browser 확인
→ 결과 보고
```

이 흐름의 약점은 다음과 같다.

- SB의 screen 문서와 organism 문서를 연결하는 intake 결과가 먼저 공개되지 않는다.
- `DESIGN_PATTERNS.md`와 `DESIGN_FOUNDATION.md`를 언제 어떤 책임으로 적용했는지 잘 드러나지 않는다.
- reference 선택, OGN boundary, component 후보 평가가 구현 전에 사용자에게 보이지 않는다.
- `Screen.diagram.md`에 사후 기록은 남지만, 구현 전 승인 가능한 작업 로그로 제공되지 않는다.
- 자동 검증은 문서 존재, 타입, lint, build를 잘 잡지만 패턴 의미 위반과 정렬 불량은 충분히 잡지 못한다.
- 구현 중 레이아웃 문제가 생겼을 때 이전 단계로 돌아가지 않고 raw CSS나 임의 spacing으로 보정할 위험이 있다.

## 개선 목표

1. SB 입력을 신뢰 가능한 작업 단위로 정리한다.
2. 판단 단계와 구현 단계를 명확히 분리한다.
3. 구현 전 공개 체크포인트를 만들어 사용자가 방향을 확인할 수 있게 한다.
4. `DESIGN_PATTERNS.md`는 구조 판정 기준, `DESIGN_FOUNDATION.md`는 표현 제한 기준으로 반복 적용한다.
5. 레이아웃 ownership을 `Screen`, `OGN`, `cx-layout`, `cx-components`로 분리해 임의 보정을 줄인다.
6. 구현 중 정렬이 깨지면 CSS 보정이 아니라 `Component Candidate Decision` 또는 `Diagram Contract`로 되돌아간다.

## 보강 후 운영 순서

```txt
0. Intake
1. SB Extract
2. Policy Map
3. Reference Decision
4. OGN Boundary Decision
5. Component Candidate Decision
6. Diagram Contract
7. Build Plan
8. Implementation
9. Verification
10. Report
```

0-10 단계는 기존 5페이즈를 대체하지 않는다. 0-10은 SB 기반 화면 제작 중 메인 에이전트가 공개하고 승인해야 할 세부 checkpoint를 확장한 것이다.

5페이즈와의 매핑:

| 0-10 단계 | 기존 Phase | 담당 구조 |
|---:|---|---|
| 0. Intake | Pre-phase | 메인 에이전트 only |
| 1. SB Extract | Phase 1 · Extract | 서브 가능, 메인 승인 |
| 2. Policy Map | Phase 2 · Map | 서브 가능, 메인 승인 |
| 3. Reference Decision | Phase 3 · Diagram | 서브 초안 가능, 메인 승인 필수 |
| 4. OGN Boundary Decision | Phase 3 · Diagram | 서브 초안 가능, 메인 승인 필수 |
| 5. Component Candidate Decision | Phase 3 · Diagram | 서브 초안 가능, 메인 승인 필수 |
| 6. Diagram Contract | Phase 3 · Diagram | 서브 작성 가능, 메인 승인 |
| 7. Build Plan | Phase 4 · Build | 메인 주도, 서브 보조 가능 |
| 8. Implementation | Phase 4 · Build | 서브 가능, 메인 검수 |
| 9. Verification | Phase 5 · Register/Verify | 서브 가능, 메인 통합 승인 |
| 10. Report | Post-phase | 메인 에이전트 only |

정리:

```txt
Phase 1 = Step 1
Phase 2 = Step 2
Phase 3 = Step 3-6
Phase 4 = Step 7-8
Phase 5 = Step 9
Pre/Post = Step 0, Step 10
```

메인/서브 구조는 유지한다. 단, `Reference Decision`, `OGN Boundary Decision`, `Component Candidate Decision`, `Build Plan`은 서브가 초안을 만들 수 있어도 메인이 사용자에게 공개하고 승인해야 한다.

### 보강된 스크린 제작 순서와 책임 요약

이 순서는 실제 SB 기반 신규 생성, 기존 화면 재작성, legacy 화면 보정에 공통으로 적용한다. 각 단계는 단일 책임을 가지며, 이전 단계의 판단이 부족하면 다음 단계에서 조용히 보정하지 않고 해당 단계로 되돌아간다.

| 순서 | 단계 | 단일 책임 | 주요 산출/공개물 | 다음 단계 진입 조건 |
|---:|---|---|---|---|
| 0 | Intake | 입력 파일과 작업 범위의 존재성을 확인한다. | `Intake Summary` | target screen, screen spec, OGN spec, 기존 구현 여부가 확인됨 |
| 1 | SB Extract | SB에 적힌 화면/OGN 사실을 추출한다. | `Extract Summary` | screenId, OGN list, state, CTA, transition/case branch가 목록화됨 |
| 2 | Policy Map | 정책 의미, sourceRef, governance, copy 근거를 확정한다. | `Screen.map.md` | 요구사항이 policy/governance/copy와 연결됨 |
| 3 | Reference Decision | 공식 패턴과 가까운 구현/wire reference를 선택한다. | `Reference Decision Log` | patternFamily, official pattern, rejected references가 명시됨 |
| 4 | OGN Boundary Decision | 정책 의미와 layout rhythm의 소유자를 결정한다. | `OGN Boundary Decision` | reuse/extend/new/structural-only와 owner가 정해짐 |
| 5 | Component Candidate Decision | 구현 어휘와 레이아웃 후보를 capability 기준으로 평가한다. | `Component Candidate Decision` | selected/rejected candidates와 reject 이유가 기록됨 |
| 6 | Diagram Contract | 화면 구조, layoutContract, Distortion Gate를 구현 전 계약으로 고정한다. | `Screen.diagram.md` | 모든 section에 patternEvidence, layoutStrategy, layoutContract, componentCandidates가 있음 |
| 7 | Build Plan | 파일 변경 범위와 raw CSS/layout patch 위험을 공개한다. | `Build Plan` | create/modify/remove/no-touch와 layout risk가 명시됨 |
| 8 | Implementation | 승인된 map/diagram/build plan을 코드화한다. | `Screen.tsx`, `Screen.config.ts`, organisms, registry/route | 구현이 diagram contract와 OGN boundary를 보존함 |
| 9 | Verification | 자동 검증과 브라우저/pattern/foundation 검사를 수행한다. | check/lint/build/browser 결과 | strict check, lint, build, pattern checklist가 통과함 |
| 10 | Report | 사용한 source, 결정, reject, 검증, 남은 위험을 보고한다. | `Final Report` | 사용자가 변경 범위와 판단 근거를 추적할 수 있음 |

구현 전 반드시 공개해야 하는 지점은 아래 네 개다.

```txt
1. SB Extract 결과
2. Reference Decision
3. Component Candidate Decision
4. Build Plan
```

## 단계별 책임

### 0. Intake

입력 존재성과 작업 범위를 확인한다.

책임:

- 전달받은 SB 경로가 파일인지 디렉터리인지 확인한다.
- `screen/*.md` 목록을 확인한다.
- `organism/*.md` 목록을 확인한다.
- 대상 `screenId`가 존재하는지 확인한다.
- screen 문서가 참조한 OGN 문서가 실제로 존재하는지 확인한다.
- 대상 route와 organism 구현이 이미 있는지 확인한다.

산출:

```txt
Intake Summary
- target screen
- found screen spec
- referenced OGN specs: found / missing
- existing route 여부
- 작업 유형: 신규 / 수정 / 재작성
```

차단해야 할 실패:

- 없는 SB 문서를 상상해서 진행한다.
- screen 문서만 보고 organism 문서를 읽지 않는다.
- 기존 구현 존재 여부를 확인하지 않고 덮어쓴다.

### 1. SB Extract

SB에 적힌 사실만 추출한다. 이 단계에서는 CX component를 고르지 않는다.

책임:

- screen 문서에서 화면 ID, 화면명, 설명, 화면 경로, 관련 정책 그룹, 기능 ID를 추출한다.
- 화면 구성 테이블에서 영역, layout, OGN ID, 노출 조건, 오류 처리 방식을 추출한다.
- 화면 전환과 케이스 분기를 추출한다.
- organism 문서에서 OGN 설명, 노출 조건, 상태, 컴포넌트 상세, 액션을 추출한다.

산출:

```txt
Extract Summary
- userTask
- state
- primaryCTA / secondaryCTA
- slots
- parts
- OGN list
- state branches
- policy/function hints
```

책임 경계:

- SB Extract는 "무엇이 있다"만 소유한다.
- SB의 `component ID`는 구현 컴포넌트명이 아니라 의도와 어휘 힌트다.

### 2. Policy Map

정책 의미와 사용자 copy 근거를 확정한다.

책임:

- SB의 관련 정책서, 정책 그룹, 기능 ID를 `policy-core`와 대조한다.
- 직접 policyRef가 없으면 `policy-core`에서 의미상 가까운 정책을 역추적한다.
- 정책 필수 정보, 선택지, 제한 조건, 에러 상태를 확인한다.
- governance refs를 선택한다.
- 사용자 copy 후보를 작성한다.

산출 파일:

```txt
Screen.map.md
```

산출 내용:

- `Screen Scope`
- `Requirement Matrix`
- `Policy Mapping`
- `Governance Review`
- `Reviewed But Not Selected`

책임 경계:

- Map은 정책 의미와 copy 근거를 소유한다.
- 레이아웃과 component 선택은 아직 하지 않는다.

차단해야 할 실패:

- SB 문구를 그대로 UI copy로 확정한다.
- 정책에 없는 의미를 추가한다.
- policyRef가 비어 있는데 이유나 역추적 기록 없이 넘어간다.

### 3. Reference Decision

무엇을 기준으로 화면 구조를 판정할지 결정한다.

책임:

- 화면의 `patternFamily`를 결정한다.
- 공식 패턴 문서를 선택한다.
- `apps/mobile/src/screen-diagrams/`에서 가장 가까운 wire reference를 탐색한다.
- `cx-example`과 기존 페이지 중 구현 선례를 탐색한다.
- 참고할 것과 reject할 것을 명시한다.

reference 우선순위:

```txt
1. DESIGN_PATTERNS.md
2. DESIGN_FOUNDATION.md
3. SCREEN_STRUCTURE_PRINCIPLES.md
4. apps/mobile/src/screen-diagrams/
5. 같은 patternFamily의 기존 Screen.diagram.md
6. cx-example
7. 같은 route group 기존 페이지
```

산출:

```txt
Reference Decision Log
- official pattern
- foundation constraints
- wire reference
- nearby implementation
- rejected references
- conflict resolution
```

`DESIGN_PATTERNS.md` 적용 책임:

- 이 화면이 어떤 구조여야 하는지 결정한다.
- 패턴별 필수 구성, 금지 구조, action placement를 확인한다.

`DESIGN_FOUNDATION.md` 적용 책임:

- 색상, typography, spacing, radius의 큰 제약을 확인한다.
- 이 단계에서는 후보 평가가 아니라 위반 가능성이 높은 영역을 표시한다.

차단해야 할 실패:

- 가까운 기존 페이지를 공식 패턴보다 우선한다.
- SB component ID를 디자인 컴포넌트로 직역한다.
- 공식 reference 없이 임의 레이아웃을 만든다.

### 4. OGN Boundary Decision

정책 의미와 layout rhythm의 소유자를 결정한다.

책임:

- SB OGN ID와 실제 organism 경계를 매핑한다.
- 기존 OGN 재사용, 확장, 신규 생성, reject를 판단한다.
- Screen이 소유할 것과 OGN이 소유할 것을 분리한다.
- structural-only 영역을 구분한다.

산출:

```txt
OGN Boundary Decision
- OGN ID
- owner component
- reuseDecision: reuse / extend / new / reject / structural-only
- screen-owned slots
- organism-owned policy meaning
- layout rhythm owner
```

layout ownership:

```txt
Screen owns:
- AppScreen rails
- SystemHeader
- Header
- Content
- Bottom

OGN owns:
- 정책 의미가 있는 body composition
- section 내부 구조

cx-layout owns:
- PageStackContents
- FieldStack
- Bottom fixed rail
- content rails / paddings

cx-components owns:
- card 내부 padding
- row alignment
- button internal alignment
- component state visuals
```

`DESIGN_PATTERNS.md` 적용 책임:

- 패턴상 같이 있어야 하는 구조를 여러 OGN으로 쪼개지 않는지 확인한다.
- AppBar, Bottom 같은 chrome이 OGN에 들어가지 않는지 확인한다.

차단해야 할 실패:

- AppBar와 Bottom을 OGN 내부로 흡수한다.
- 하나의 패턴 rhythm을 여러 OGN으로 쪼개 정렬을 깨뜨린다.
- Screen.tsx에서 margin/padding으로 OGN 간격을 조정한다.

### 5. Component Candidate Decision

구현 어휘와 레이아웃 후보를 결정한다.

책임:

- 각 section별 component/composition 후보를 나열한다.
- 후보를 `strong`, `medium`, `weak`, `reject`로 평가한다.
- reject 이유를 기록한다.
- Foundation 위반 가능성을 사전에 차단한다.
- raw CSS 필요 여부를 확인한다.

후보 평가 기준:

```txt
- pattern contract 충족
- layoutContract 충족 가능성
- alignment
- widthTier
- density
- wrapping / overflow
- token / foundation 준수
- route-level CSS 없이 가능한가
- 기존 component vocabulary 안에 있는가
```

산출:

```txt
Component Candidate Decision
- section별 후보
- selected candidate
- rejected candidates
- vocabulary gap
- layout risk
```

`DESIGN_PATTERNS.md` 적용 책임:

- 후보가 패턴의 구조와 action placement를 만족하는지 평가한다.

`DESIGN_FOUNDATION.md` 적용 책임:

- raw color, raw spacing, custom font var, 임의 radius가 필요한 후보를 reject한다.
- semantic token이나 component-owned style로 해결 가능한 후보를 우선한다.

차단해야 할 실패:

- 현재 sample copy가 짧아서 괜찮다고 판단한다.
- component 이름이 비슷하다는 이유만으로 선택한다.
- raw color, raw spacing, custom card CSS로 패턴을 흉내낸다.

### 6. Diagram Contract

구현 전 화면 구조 계약을 확정한다.

책임:

- `Screen.diagram.md`를 작성 또는 갱신한다.
- Screen Wire를 실제 mobile rail 형태로 작성한다.
- Section Contracts를 작성한다.
- Policy / OGN Matrix를 작성한다.
- Distortion Gates를 작성한다.

산출 파일:

```txt
Screen.diagram.md
```

각 section 필수 항목:

```txt
- patternEvidence
- patternDecision
- ognBoundaryDecision
- layoutStrategy
- layoutContract
- componentCandidates
```

layout 필수 항목:

```txt
layoutStrategy:
- widthTier
- padding owner
- stack direction
- alignment
- wrapping
- overflow

layoutContract:
- role
- structure
- alignment
- density
- wrapping
- distortionRisk
```

`DESIGN_PATTERNS.md` 적용 책임:

- `wireReference.source` 또는 `patternEvidence`에 공식 패턴 근거를 기록한다.
- 패턴별 필수 구조를 Distortion Gate로 고정한다.

`DESIGN_FOUNDATION.md` 적용 책임:

- raw style 금지, semantic token, typography, spacing 제약을 Distortion Gate에 반영한다.

차단해야 할 실패:

- Diagram 없이 구현한다.
- Diagram이 component 이름만 적고 layout behavior를 적지 않는다.
- Distortion Gate 없이 Build로 넘어간다.

### 7. Build Plan

구현 직전 변경 범위와 구현 방식을 공개한다.

책임:

- 생성, 수정, 삭제 파일 목록을 확정한다.
- route, organism, config, registry 변경 범위를 공개한다.
- raw CSS 여부를 공개한다.
- 기존 dirty worktree와 충돌 가능성을 확인한다.

산출:

```txt
Build Plan
- Create
- Modify
- Remove
- No-touch
- Layout Risk
- CSS / token risk
```

layout risk 기록 예:

```txt
Layout Risk
- No route-level margin/padding patch
- PageStackContents owns content rail
- RQRContentsDetail owns card padding/alignment
- AppScreen.Bottom owns CTA fixed position
```

`DESIGN_FOUNDATION.md` 적용 책임:

- 새 CSS가 필요한지 확인한다.
- raw token을 쓸 가능성이 있으면 구현 전에 차단한다.

차단해야 할 실패:

- 예상하지 못한 파일을 수정한다.
- 기존 사용자 변경을 덮어쓴다.
- 계획에 없던 component/package를 추가한다.
- route-level layout patch를 계획에 숨긴다.

### 8. Implementation

확정된 Diagram과 Build Plan을 코드화한다.

책임:

- `Screen.tsx`는 AppScreen rails를 조립한다.
- organism은 정책 의미를 가진 body composition을 구현한다.
- `Screen.config.ts`에 generation 근거를 기록한다.
- registry와 route를 등록한다.
- CSS가 필요하면 semantic token만 사용하고, layout owner가 못 하는 보조 역할로 제한한다.

책임 경계:

- Implementation은 새 디자인 판단을 조용히 발명하지 않는다.
- 구현 중 후보가 layoutContract를 만족하지 못하면 `Component Candidate Decision` 또는 `Diagram Contract`로 되돌아간다.

차단해야 할 실패:

- 구현 중 임의 구조를 추가한다.
- route-level margin/padding으로 정렬을 맞춘다.
- 삭제된 legacy adapter를 import한다.
- raw fontSize, raw color, raw spacing으로 foundation을 우회한다.

### 9. Verification

자동 검증과 실제 렌더 검사를 수행한다.

책임:

- policy/screen generation strict check를 실행한다.
- mobile lint를 실행한다.
- mobile build를 실행한다.
- browser render check를 실행한다.
- pattern-specific checklist를 실행한다.
- foundation-specific scan을 실행한다.

명령:

```bash
npm run check:screen-generation:strict -w @policy/core
npm run lint -w @screen/mobile
npm run build -w @screen/mobile
```

browser 확인:

```txt
- target route open
- mobile viewport
- 주요 텍스트 존재
- component data attributes
- header / content / bottom rail 위치
- card width / row alignment
- overlap / blank / build error 없음
```

foundation scan 예:

```bash
rg "color-green|#[0-9a-fA-F]{3,6}|spacing-80|font-size|font-weight" <target-files>
```

pattern checklist 예:

```txt
Completion:
- AppBar back 없음
- TitleMain(type=complete)
- summary card 존재
- Bottom CTA fixed
- custom green card 없음
- raw spacing patch 없음
```

실패 처리:

- 자동 검증 실패는 해당 파일을 수정한다.
- layoutContract 실패는 Implementation만 고치지 않고 Diagram 또는 Candidate 단계로 되돌아간다.
- patternFamily가 틀렸으면 Reference Decision부터 되돌린다.

### 10. Report

결과와 판단 근거를 공개한다.

책임:

- 어떤 SB source를 사용했는지 명시한다.
- 어떤 official reference와 implementation reference를 사용했는지 명시한다.
- 중요한 결정과 reject 이유를 요약한다.
- 검증 결과를 공유한다.
- 남은 위험과 미해결 항목을 기록한다.

산출:

```txt
Final Report
- SB source
- Reference
- Created / Modified
- Key decisions
- Rejected candidates
- Verification
- Residual risks
```

## 구현 전 공개 체크포인트

작업자는 모든 세부 판단을 길게 보고할 필요는 없지만, 구현 전에 아래 네 가지는 공개해야 한다.

```txt
1. SB Extract 결과
2. Reference Decision
3. Component Candidate Decision
4. Build Plan
```

이 네 지점은 사용자가 다음 문제를 구현 전에 잡기 위한 승인 가능 지점이다.

- 잘못된 reference 선택
- OGN boundary 오류
- 패턴과 맞지 않는 component 후보
- raw CSS나 route-level layout patch
- 예상 밖 파일 수정

## 디자인 문서 적용 시점

`DESIGN_PATTERNS.md`와 `DESIGN_FOUNDATION.md`는 한 번만 읽는 문서가 아니다. 단계별 책임이 다르다.

```txt
3 Reference Decision        처음 읽고 patternFamily 판정
4 OGN Boundary Decision     경계가 패턴 rhythm을 깨지 않는지 확인
5 Component Candidate       후보 평가 기준으로 강하게 적용
6 Diagram Contract          Screen.diagram.md 근거와 gate로 기록
7 Build Plan                raw CSS / token 위험 점검
8 Implementation            token / component ownership 준수
9 Verification              checklist와 scan으로 최종 검사
```

요약:

- `DESIGN_PATTERNS.md`는 이 화면이 어떤 구조여야 하는지 정한다.
- `DESIGN_FOUNDATION.md`는 그 구조를 어떤 시각 어휘로만 표현할 수 있는지 제한한다.

## 레이아웃 관리 책임

레이아웃은 Implementation에서 즉흥적으로 맞추지 않는다.

```txt
Reference Decision
- 기준 레이아웃 선택

OGN Boundary Decision
- layout rhythm 소유자 결정

Component Candidate Decision
- 정렬 / width / wrapping 가능한 후보만 통과

Diagram Contract
- layoutStrategy / layoutContract / Distortion Gates 확정

Build Plan
- route-level patch와 raw CSS 위험 차단

Implementation
- layout owner를 코드에 반영

Verification
- 실제 렌더에서 정렬 / 겹침 / 패턴 이탈 확인
```

구현 중 정렬이 안 맞으면 다음 중 하나로 본다.

```txt
- 후보 선택 실패
- Diagram layoutContract 부족
- 패턴 reference 선택 오류
- component vocabulary gap
```

이 경우 CSS로 즉시 보정하지 않고 필요한 단계로 되돌아간다.

## 적용 계획

### 1차: 작업 로그 운영 반영

- 신규 또는 재작성 요청에서 구현 전 네 가지 공개 체크포인트를 적용한다.
- final report에 SB source, reference, key decisions, rejected candidates, verification을 고정 형식으로 포함한다.

### 2차: 문서 역할 분리와 문서 라우팅 정리

문서가 늘어나면서 "무엇을 읽어야 하는지 판단하는 문서"가 다시 늘어나는 문제를 막아야 한다. 절차와 문서 라우팅의 SOT는 repo 안에 두고, Codex skill은 그 SOT를 실행하는 어댑터로 둔다.

원칙:

```txt
문서는 SOT다.
스킬은 실행자다.
스킬이 문서 역할 분리의 유일한 출처가 되면 repo 밖에서 절차가 drift 된다.
```

역할 분리:

```txt
AGENTS.md
- 프로젝트 정체성
- SOT 우선순위
- 패키지 책임
- 공통 검증

SCREEN_GENERATION_FLOW.md
- 화면 생성 절차 SOT
- phase별 책임
- phase별 읽어야 할 문서 라우팅
- 공개 체크포인트
- 레이아웃 게이트

DESIGN_PATTERNS.md
- 화면 패턴 + layout/spacing contract SOT

DESIGN_FOUNDATION.md
- 시각 foundation / token SOT

SPACING_PATTERNS.md
- 제거됨
- spacing 적용 SOT는 `DESIGN_PATTERNS.md`의 layout/spacing contract로 통합됨

SCREEN_STRUCTURE_PRINCIPLES.md
- diagram / layout contract 작성 원칙 SOT

docs/screen-generation-agent-model.md
- 메인 / 서브 에이전트 위임 모델

docs/screen-generation-workflow-improvement-plan.md
- 임시 개선 계획 / migration plan
- 적용 후 축약 또는 archive 후보

.codex/skills/*
- 실행 절차
- 어떤 phase에서 어떤 SOT를 읽을지 강제
- SOT 자체가 되면 안 됨
```

phase별 문서 라우팅은 `SCREEN_GENERATION_FLOW.md`에 짧은 표로 흡수한다.

```txt
Intake
- SB input
- AGENTS.md

SB Extract
- SB screen/*.md
- SB organism/*.md

Policy Map
- packages/policy-core/policies/**/*.md
- packages/policy-core/policies/**/*.policy.ts
- packages/policy-core/governance/**/*.md

Reference Decision
- DESIGN_PATTERNS.md
- DESIGN_FOUNDATION.md
- apps/mobile/src/screen-diagrams/
- nearby Screen.diagram.md
- cx-example

OGN Boundary Decision
- Screen.map.md
- DESIGN_PATTERNS.md
- SCREEN_STRUCTURE_PRINCIPLES.md
- existing organisms

Component Candidate Decision
- Screen.diagram.md draft
- DESIGN_PATTERNS.md
- DESIGN_FOUNDATION.md
- @pxds/cx-components API
- @pxds/cx-layout API

Diagram Contract
- SCREEN_STRUCTURE_PRINCIPLES.md
- DESIGN_PATTERNS.md
- Screen.map.md

Build Plan
- Screen.map.md
- Screen.diagram.md
- DESIGN_FOUNDATION.md
- existing route / organism files
- git status

Implementation
- Screen.map.md
- Screen.diagram.md
- DESIGN_FOUNDATION.md
- @pxds/cx-components
- @pxds/cx-layout
- @pxds/cx-icons

Verification
- AGENTS.md 공통 검증
- Screen.diagram.md Distortion Gates
- pattern-specific checklist
- foundation-specific scan
```

skill 역할:

```txt
cx-screen-create
- SCREEN_GENERATION_FLOW.md의 문서 라우팅을 읽고 전체 오케스트레이션
- 공개 체크포인트 강제

cx-screen-extract
- SB 구조만 읽음
- 디자인 문서 읽지 않음

cx-screen-map
- policy / governance만 읽음
- 디자인 문서 읽지 않음

cx-screen-diagram
- DESIGN_PATTERNS / FOUNDATION / STRUCTURE 읽음
- reference, boundary, candidate, layoutContract 작성

cx-screen-build
- 승인된 map / diagram과 component API 읽음
- 새 디자인 판단을 만들지 않음

cx-screen-register-verify
- route 등록과 검증만 담당
```

정리 순서:

1. 이 개선 계획 문서에서 영구 규칙만 추린다.
2. `SCREEN_GENERATION_FLOW.md`에 문서 라우팅, 공개 체크포인트, 레이아웃 게이트 섹션을 추가한다.
3. `cx-screen-create`, `cx-screen-diagram`, `cx-screen-build` 스킬을 그 라우팅에 맞게 축소 갱신한다.
4. 이 개선 계획 문서는 적용 이력으로 남기거나 이후 archive한다.

성공 기준:

- 문서가 늘어나도 phase별로 읽어야 할 문서가 명확하다.
- skill이 repo SOT를 대체하지 않는다.
- 작업자가 skill 없이도 `SCREEN_GENERATION_FLOW.md`만 보고 문서 라우팅을 재현할 수 있다.

### 3차: 스킬 보강

- `cx-screen-create`에 Intake와 공개 체크포인트를 추가한다.
- `cx-screen-extract`에 SB 디렉터리 구조 확인 규칙을 추가한다.
- `cx-screen-diagram`에 Reference Decision, OGN Boundary Decision, layout ownership 기록을 강화한다.
- `cx-screen-build`에 Build Plan과 raw CSS 차단 규칙을 추가한다.

### 4차: 문서 계약 반영

- `SCREEN_GENERATION_FLOW.md`에 Intake와 공개 checkpoint를 절차 보강으로 연결한다.
- `docs/screen-generation-agent-model.md`에 메인 에이전트의 공개 gate 책임을 추가한다.

### 5차: checker 보강 후보

자동 checker는 다음 항목을 점진적으로 검사할 수 있다.

- `Screen.diagram.md`에 `wireReference`가 있는지
- 각 section에 `layoutContract`가 있는지
- `pattern=complete`일 때 `TitleMain(type="complete")`, back 금지, bottom CTA gate가 기록됐는지
- target files에 raw hex color, raw spacing, raw font-size가 있는지
- `Screen.config.ts generation.ognIds`가 map과 diagram에 모두 등장하는지

## 성공 기준

- 사용자가 구현 전에 reference, OGN boundary, component 후보, 변경 파일을 확인할 수 있다.
- `Screen.diagram.md`가 component 이름이 아니라 layout behavior를 계약으로 기록한다.
- 구현 중 layout 문제가 생기면 CSS 보정 대신 이전 판단 단계로 되돌아간다.
- 완료 후 검증 결과가 "빌드됨"뿐 아니라 "패턴 계약을 통과함"을 설명한다.
