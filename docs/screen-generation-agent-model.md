# Screen Generation Agent Model

`SCREEN_GENERATION_FLOW.md`에서 분리한 운영 참고 문서다. 5페이즈 절차 자체는 `SCREEN_GENERATION_FLOW.md`가 소유하고, 이 문서는 메인/서브 에이전트 협업 방식을 설명한다.

## 역할 모델

스크린 생성은 기본적으로 **메인 에이전트의 매니징/오케스트레이션**과 **서브 에이전트의 페이즈별 실무 생성**으로 나눈다. 이 역할 분리는 산출물 책임을 흐리기 위한 병렬화가 아니라, 메인 에이전트가 정책 충실도와 디자인 시스템 일관성을 관리하면서 서브 에이전트가 각 페이즈의 조사·작성·구현을 실행하도록 하는 운영 모델이다.

메인 에이전트는 5페이즈 전체의 방향과 최종 정합성을 소유하는 매니저다. 작업 범위를 해석하고, 페이즈별 서브 에이전트에게 입력·출력·완료조건을 지정하며, 산출물 사이의 불일치를 조정하고, `Screen.map.md -> Screen.diagram.md -> 구현 -> config -> route` 연결이 끊기지 않도록 최종 판단을 내린다. Phase 3/4에서는 레이아웃 보존을 최우선 승인 기준으로 삼고, 그 다음 정책 의미와 디자인 시스템 준수를 확인한다. 이 검수는 소극적 리뷰가 아니라 승인 게이트다. 산출물이 wire semantic tag, layoutContract, Summary Card Decision Rule, Distortion Gate 중 하나라도 약하게 처리하면 메인 에이전트가 다음 페이즈 진입을 보류하고 해당 페이즈로 되돌린다.

메인 에이전트는 작업이 블랙박스가 되지 않도록 구현 전에 네 가지 공개 체크포인트를 사용자에게 표면화한다: SB Extract 결과, Reference Decision, Component Candidate Decision, Build Plan. 서브 에이전트가 초안을 만들 수는 있지만, 이 네 지점은 메인이 승인 가능한 형태로 정리하고 다음 단계 진입 여부를 결정한다.

기본 실행은 continuous execution이다. 사용자가 특정 step까지만 하라고 명시하지 않는 한, 메인 에이전트는 사용자에게 phase마다 "다음 phase를 진행해도 되는지" 묻지 않는다. phase 전환은 메인 에이전트의 내부 승인 gate로 처리한다. 다만 구현 전 공개 체크포인트인 Reference Decision, Component Candidate Decision, Build Plan은 사용자 지시를 받는 gate다. 메인 에이전트는 이 세 항목을 공개한 뒤 구현을 시작하지 않고 사용자 승인/수정/중단 지시를 기다린다.

하위 에이전트 구현 위임 전 Build Plan에는 worker 이름, write scope, no-touch 파일, 승인 검사 항목을 반드시 포함한다. P0 수정처럼 작은 작업도 예외가 아니다. 짧게 쓰더라도 사용자가 “누가 무엇을 어디까지 만지는지” 볼 수 있어야 한다.

서브 에이전트는 메인 에이전트가 위임한 범위 안에서 실제 산출물을 만드는 워커다. Phase 1의 SB 추출, Phase 2의 정책/governance 조사와 `Screen.map.md` 초안, Phase 3의 구조 설계와 `Screen.diagram.md` 초안, Phase 4의 OGN/Screen/config 구현, Phase 5의 route 등록과 preview 확인을 맡을 수 있다. 서브 에이전트가 만든 산출물은 해당 페이즈의 작업 결과로 인정하되, 페이즈 간 최종 연결과 충돌 해결 책임은 메인 에이전트가 가진다.

서브 에이전트는 위임받은 phase의 산출물 책임만 가진다. Reference Decision, OGN Boundary Decision, Component Candidate Decision, Build Plan에서 생긴 판단은 메인 에이전트 승인 전까지 최종 결정이 아니며, 승인된 결정만 `Screen.map.md`, `Screen.diagram.md`, `Screen.config.ts`, 또는 작업 로그에 남긴다.

하위 에이전트 완료 후 메인 에이전트는 결과 보고를 신뢰하되, 승인 전에는 반드시 별도 확인한다. 최소 확인은 `git diff --stat`, worker별 scoped diff, 공통 checker/lint/build, 그리고 UI 변경 시 screenshot 또는 bounding box 기반 layout evidence다. 텍스트 존재 확인만으로 레이아웃 마이그레이션을 승인하지 않는다.

## 멀티 화면 배치 위임

여러 화면 제작 요청에서는 기본 위임 단위가 “한 화면 5페이즈 완주”가 아니라 “같은 phase의 화면별 병렬 산출물”이다. 메인 에이전트는 전체 화면 inventory를 먼저 만든 뒤, phase별로 서브 에이전트를 나누고, phase gate를 통합 승인한 뒤에 다음 phase를 시작한다.

권장 진행 표시는 화면별 end-to-end 완료가 아니라 phase batch 상태를 보여야 한다.

```txt
Phase 1 Extract 병렬 진행
  - FP-001 Extract
  - FP-002 Extract
  - FP-003 Extract
  - FP-005 Extract
  - Main Gate: Extract 통합 승인

Phase 2 Map 병렬 진행
Phase 3 Diagram 병렬 진행
Phase 4 Build 병렬 진행
Phase 5 Register/Verify 통합
```

- Phase 1/2/3은 화면별 병렬 실행을 기본으로 하며, 메인 에이전트가 전체 화면 세트의 누락, 정책·governance 일관성, wire semantics, layoutContract, componentCandidates fit 근거를 승인한다.
- Step 0-2의 병렬 위임은 긴 분석 회의가 아니라 기계적 분할 추출이다. 하위 에이전트는 같은 문서를 중복 정독하지 않고, screen group / OGN group / policy ID coverage처럼 분리된 표를 만든다. 메인 에이전트는 하위 산출물이 narrative 중심이거나 Coverage Map과 Implementation Map을 섞으면 승인하지 않고 표/판정 중심으로 재작업시킨다.
- Phase 4는 승인된 Diagram만 병렬 제작한다. 같은 organism/component 파일을 여러 서브 에이전트가 동시에 수정할 수 있으면 메인이 파일 소유 범위를 분리하거나 순차화한다.
- Phase 5는 route 등록과 preview/check 결과를 통합 검수한다.
- 단일 화면 요청이나 명확히 독립적인 단순 proof/detail 화면은 예외적으로 page end-to-end 위임할 수 있다. 멀티 화면 배치에서 이 예외를 쓰면 예외 사유와 메인 gate 위치를 명시한다.

## 점검 지점

0-10 세부 단계는 5페이즈를 대체하지 않는다. 0-10은 phase 내부의 공개/검수 checkpoint를 세분화한 것이다.

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

```txt
Phase 1 = Step 1
Phase 2 = Step 2
Phase 3 = Step 3-6
Phase 4 = Step 7-8
Phase 5 = Step 9
Pre/Post = Step 0, Step 10
```

- Phase 1: 서브 에이전트가 SB에서 화면ID·도메인·과업·상태·CTA·정책태그·OGN ID·slot/part/hierarchy를 추출하고, 메인 에이전트가 누락 0 상태인지 확인한다.
- Phase 2: 서브 에이전트가 먼저 Coverage Map으로 SB policy ID와 `policy-core` 존재 여부를 대조하고, `green`/`yellow`/`red`를 판정한다. `red`는 missing/blocked로 종료하고, `yellow`는 사용자 승인 gate로 올린다. `green` 또는 승인된 `yellow`만 정책 필수정보, 선택지, 제약, 에러, sourceRef, governance refs를 조사해 `Screen.map.md`를 작성한다. 메인 에이전트는 Coverage Map과 Implementation Map이 섞였거나 없는 정책을 추정한 산출물을 반려한다.
- Phase 3: 서브 에이전트가 유사 wire reference를 찾고, Screen Wire, Wire Semantic Tags, pattern contract, layoutStrategy/layoutContract, Layout Distortion Gate, componentCandidates를 반영해 `Screen.diagram.md`를 작성한다. 메인 에이전트는 컴포넌트 후보가 아니라 레이아웃 보존과 구조 계약을 먼저 승인한다. `[... | key-value-summary | card]`로 읽히는 summary card는 `patternFamily: card-key-value-summary`와 required capability가 먼저 정의됐는지 확인하고, 후보 평가가 component-name preference나 현재 샘플 길이에 기대면 반려한다. 후보가 타 화면 pattern family 선례와 thin 소스에서만 충돌하면 모순을 reject로 굳히지 말고 `SCREEN_STRUCTURE_PRINCIPLES.md`의 Pattern-Family Precedent Gate로 사용자 결정 또는 assumption을 surface한다.
- Phase 4: 서브 에이전트가 componentCandidates를 capability 기준으로 평가해 layoutContract를 만족하는 컴포넌트/조합을 선택하거나 필요한 OGN/component를 만든다. 메인 에이전트는 실제 렌더링에서 section/slot/stack 배치와 layoutContract가 보존되는지 먼저 확인한다.
- Phase 5: 서브 에이전트가 route catalog 등록과 preview 진입 확인을 수행하고, 메인 에이전트가 최종 검증 범위와 남길 기록을 확정한다.

서브 위임은 모든 화면에 같은 강도로 적용하지 않는다. 단일 화면 요청의 단순 detail/complete 화면은 메인 에이전트가 직접 처리하거나 하나의 서브 에이전트에게 연속 위임할 수 있다. 멀티 화면 배치에서는 phase batch를 기본으로 하며, form, eligibility, error-heavy 화면, 신규 organism 또는 신규 pattern 후보, 정책 해석이 애매한 화면은 특히 Phase 2/3/4를 분리해 위임하고 메인 에이전트의 승인 지점을 명확히 둔다.

서브 에이전트의 작업 메모나 중간 판단은 원문을 별도 산출물로 늘리지 않는다. 메인 에이전트가 승인한 결정만 해당 소유 파일에 반영한다. 정책·copy·governance 결정은 `Screen.map.md`, 구조·패턴·layoutContract·componentCandidates는 `Screen.diagram.md`, 구현 선택과 차이는 `Screen.config.ts` 또는 작업 로그의 `deviationReason`에 남긴다.
