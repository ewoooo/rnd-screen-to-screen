# Screen Generation Agent Model

`SCREEN_GENERATION_FLOW.md`에서 분리한 운영 참고 문서다. 5페이즈 절차 자체는 `SCREEN_GENERATION_FLOW.md`가 소유하고, 이 문서는 메인/서브 에이전트 협업 방식을 설명한다.

## 역할 모델

스크린 생성은 기본적으로 **메인 에이전트의 매니징/오케스트레이션**과 **서브 에이전트의 페이즈별 실무 생성**으로 나눈다. 이 역할 분리는 산출물 책임을 흐리기 위한 병렬화가 아니라, 메인 에이전트가 정책 충실도와 디자인 시스템 일관성을 관리하면서 서브 에이전트가 각 페이즈의 조사·작성·구현을 실행하도록 하는 운영 모델이다.

메인 에이전트는 5페이즈 전체의 방향과 최종 정합성을 소유하는 매니저다. 작업 범위를 해석하고, 페이즈별 서브 에이전트에게 입력·출력·완료조건을 지정하며, 산출물 사이의 불일치를 조정하고, `Screen.map.md -> Screen.diagram.md -> 구현 -> config -> route` 연결이 끊기지 않도록 최종 판단을 내린다. Phase 3/4에서는 레이아웃 보존을 최우선 승인 기준으로 삼고, 그 다음 정책 의미와 디자인 시스템 준수를 확인한다. 이 검수는 소극적 리뷰가 아니라 승인 게이트다. 산출물이 wire semantic tag, layoutContract, Summary Card Decision Rule, Distortion Gate 중 하나라도 약하게 처리하면 메인 에이전트가 다음 페이즈 진입을 보류하고 해당 페이즈로 되돌린다.

서브 에이전트는 메인 에이전트가 위임한 범위 안에서 실제 산출물을 만드는 워커다. Phase 1의 SB 추출, Phase 2의 정책/governance 조사와 `Screen.map.md` 초안, Phase 3의 구조 설계와 `Screen.diagram.md` 초안, Phase 4의 OGN/Screen/config 구현, Phase 5의 route 등록과 preview 확인을 맡을 수 있다. 서브 에이전트가 만든 산출물은 해당 페이즈의 작업 결과로 인정하되, 페이즈 간 최종 연결과 충돌 해결 책임은 메인 에이전트가 가진다.

## 점검 지점

- Phase 1: 서브 에이전트가 SB에서 화면ID·도메인·과업·상태·CTA·정책태그·OGN ID·slot/part/hierarchy를 추출하고, 메인 에이전트가 누락 0 상태인지 확인한다.
- Phase 2: 서브 에이전트가 정책 필수정보, 선택지, 제약, 에러, sourceRef, governance refs를 조사해 `Screen.map.md`를 작성하고, 메인 에이전트가 정책 태그가 화면 정보/CTA/에러로 모두 매핑됐는지 승인한다.
- Phase 3: 서브 에이전트가 유사 wire reference를 찾고, Screen Wire, Wire Semantic Tags, pattern contract, layoutStrategy/layoutContract, Layout Distortion Gate, componentCandidates를 반영해 `Screen.diagram.md`를 작성한다. 메인 에이전트는 컴포넌트 후보가 아니라 레이아웃 보존과 구조 계약을 먼저 승인한다. `[... | key-value-summary | card]`로 읽히는 summary card는 `patternFamily: card-key-value-summary`와 required capability가 먼저 정의됐는지 확인하고, 후보 평가가 component-name preference나 현재 샘플 길이에 기대면 반려한다. 후보가 타 화면 pattern family 선례와 thin 소스에서만 충돌하면 모순을 reject로 굳히지 말고 `SCREEN_STRUCTURE_PRINCIPLES.md`의 Pattern-Family Precedent Gate로 사용자 결정 또는 assumption을 surface한다.
- Phase 4: 서브 에이전트가 componentCandidates를 capability 기준으로 평가해 layoutContract를 만족하는 컴포넌트/조합을 선택하거나 필요한 OGN/component를 만든다. 메인 에이전트는 실제 렌더링에서 section/slot/stack 배치와 layoutContract가 보존되는지 먼저 확인한다.
- Phase 5: 서브 에이전트가 route catalog 등록과 preview 진입 확인을 수행하고, 메인 에이전트가 최종 검증 범위와 남길 기록을 확정한다.

서브 위임은 모든 화면에 같은 강도로 적용하지 않는다. 단순 detail/complete 화면은 메인 에이전트가 직접 처리하거나 하나의 서브 에이전트에게 연속 위임할 수 있다. form, eligibility, error-heavy 화면, 신규 organism 또는 신규 pattern 후보, 정책 해석이 애매한 화면은 Phase 2/3/4를 분리해 위임하고 메인 에이전트의 승인 지점을 명확히 둔다.

서브 에이전트의 작업 메모나 중간 판단은 원문을 별도 산출물로 늘리지 않는다. 메인 에이전트가 승인한 결정만 해당 소유 파일에 반영한다. 정책·copy·governance 결정은 `Screen.map.md`, 구조·패턴·layoutContract·componentCandidates는 `Screen.diagram.md`, 구현 선택과 차이는 `Screen.config.ts` 또는 작업 로그의 `deviationReason`에 남긴다.
