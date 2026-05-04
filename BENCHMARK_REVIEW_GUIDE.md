# Screen Generation Benchmark & Heuristic Review Guide

## 목적

이 벤치마크는 화면이 “예쁜가”만 보는 평가가 아니다.

목표는 제한된 디자인 시스템 어휘와 토큰만으로 홈, 검색, 상품, TU, 바텀시트 같은 서로 다른 화면을 일관되게 표현할 수 있는지 확인하는 것이다. 즉, 화면이 늘어나도 spacing, chrome, component vocabulary, token, state, spec contract가 무너지지 않는지를 측정한다.

## 벤치마크와 휴리스틱 리뷰의 차이

| 구분 | 벤치마크 | 휴리스틱 리뷰 |
|---|---|---|
| 목적 | 시스템이 버티는지 측정 | UX 품질을 전문가 관점으로 판단 |
| 기준 | spec, component contract, token, WDS, preview 재현성 | 사용성 원칙, 이해 가능성, 실수 방지, 접근성, 정보 구조 |
| 산출물 | 항목별 score, finding, score cap | 리뷰 코멘트, 개선 제안, 우선순위 |
| 저장 위치 | active spec이 아니라 preview/report에서 계산 | active spec이 아니라 리뷰 문서/이슈/코멘트 |
| 역할 | 시스템 strain test | 제품/사용성 품질 보완 |

정리하면, 둘은 **따로 보되 서로 연결**한다.

- 벤치마크는 “이 화면이 시스템 계약을 지켰는가?”를 본다.
- 휴리스틱 리뷰는 “사용자가 이 화면을 이해하고 실수 없이 쓸 수 있는가?”를 본다.
- 휴리스틱 리뷰에서 발견한 문제가 반복되면, 그때 benchmark 항목이나 component contract로 승격한다.

## Global Guard

모든 항목보다 먼저 적용되는 강한 감점 조건이다. 아래 조건이 걸리면 개별 항목 점수가 좋아도 상한이 생긴다.

| Guard | 검사 내용 | 이유 |
|---|---|---|
| Raw escape hatch | 화면 코드에 raw UI, inline layout, 자체 fontSize/token이 있는데 spec의 `allowed_escape_hatches`에 없으면 감점 | 숨은 예외가 있으면 시스템이 실제로 어디서 깨졌는지 측정할 수 없다 |
| Spec/구현 불일치 | spec이 선언한 pattern과 실제 route/component 구조가 다르면 감점 | 벤치마크는 구현 가능한 시스템 어휘를 재는 것이므로 문서와 구현 계약이 같아야 한다 |
| Screen owns chrome | top/bottom chrome을 route에서 직접 fixed/absolute/raw로 만들면 감점 | chrome 책임이 흩어지면 AppScreen/ContentOutlet 기준 평가가 무의미해진다 |
| 설명 없는 신규 어휘 | 새 component/variant/slot/token이 생겼는데 `new_vocabulary_required`나 token 근거가 없으면 감점 | 새 어휘 자체는 괜찮지만, 근거 없이 생기면 시스템 붕괴 신호다 |

## Design Benchmark

| 항목 | 검사 내용 | 이유 |
|---|---|---|
| 시각적 위계 | 핵심 정보, 보조 정보, 액션의 읽는 순서가 명확한가 | 사용자가 화면 목적과 다음 행동을 즉시 이해해야 한다 |
| 텍스트 브레이킹 품질 | 핵심 카피는 의미 단위 줄바꿈, 동적 텍스트는 `maxLines/truncate` 정책이 있는가 | 모바일에서 긴 한국어/상품명/권한명이 레이아웃을 깨지 않게 하기 위함 |
| 정보 그룹핑 | 관련 정보가 같은 카드/섹션/리스트 안에 묶였는가 | 정책/혜택/옵션 구조가 스캔 가능해야 한다 |
| CTA 우선순위 | 주요 액션 위치, label, 상태가 명확한가 | 사용자가 무엇을 눌러야 하는지와 왜 가능한지 알아야 한다 |
| 레이아웃 안정성 | 긴 텍스트, 리스트 수, 상태 변화에도 무너지지 않는가 | 대표 데이터만 예쁜 화면을 방지한다 |
| 가로 여백/프레임 적합성 | ContentOutlet 12px 좌우 inset이 한 번만 적용되는가 | 좌우 붙음/24px 중첩 같은 반복 문제를 시스템적으로 잡기 위함 |
| Chrome/Inset 적합성 | top/bottom chrome이 AppScreen flow 안에서 본문과 충돌 없이 배치되는가 | header, tab, bottom nav, CTA가 본문을 침범하지 않아야 한다 |
| Sticky 영역 충돌 | sticky CTA, bottom nav, bottom sheet가 본문을 가리거나 겹치지 않는가 | 스크롤 끝과 하단 action의 안정성 확인 |
| 컴포넌트 일관성 | 같은 의미의 UI가 같은 component vocabulary로 반복되는가 | 화면마다 다른 wrapper가 늘어나는 것을 방지한다 |
| Molecule 재사용률 | raw WDS 조합을 반복하지 않고 molecule/organism으로 흡수했는가 | 화면은 조립만 하고 반복 구조는 시스템 어휘로 올라가야 한다 |
| WDS 반영도 | WDS 컴포넌트와 variant를 우선 사용했는가 | 시각뿐 아니라 interaction/accessibility 계약까지 재사용하기 위함 |
| Token 순응도 | 색, 간격, radius, typography가 token/alias로 설명되는가 | 화면별 임의 수치가 쌓이는 것을 방지한다 |
| 상태 표현 명확성 | selected, disabled, loading, error 등이 구분되는가 | 정책 화면에서 입력 상태와 CTA 상태가 연결되어야 한다 |
| 데이터 길이 대응성 | 긴 이름, 긴 가격, 많은 항목, 없는 이미지에서도 안정적인가 | 실제 데이터 변형에 견디는지 확인한다 |
| 미디어/썸네일 처리 | 이미지, placeholder, badge가 맥락에 맞게 표현되는가 | 미정 이미지/아이콘 자리가 정보 품질을 떨어뜨리지 않아야 한다 |
| 접근성 기본 품질 | 터치 타깃, label, role, contrast가 기본 기준을 만족하는가 | WDS 사용의 핵심 이유 중 하나가 접근성 계약 보존이다 |
| Escape hatch 정직성 | 시스템 밖 구현 의도가 spec에 명시되었는가 | 예외를 숨기지 않아야 strain test 결과가 의미 있다 |
| Preview 판독성 | preview에서 화면, 상태, 계약, iframe을 쉽게 확인할 수 있는가 | 검수 도구 자체가 비교와 커뮤니케이션을 도와야 한다 |

## Planning Benchmark

| 항목 | 검사 내용 | 이유 |
|---|---|---|
| 정책서 반영 | 정책 요구사항이 spec과 mock에 누락 없이 반영되었는가 | 화면이 임의 해석이 아니라 요구사항 기반인지 확인한다 |
| 플로우 완결성 | 진입, 주요 액션, 종료/다음 단계가 이어지는가 | 단편 화면이 아니라 실제 사용 흐름으로 검증하기 위함 |
| 엣지 케이스 처리 | 노데이터, 에러, 로딩, 권한 거부, 선택 불가 상태가 설계되었는가 | happy path만 만든 화면을 걸러내기 위함 |
| Spec/구현 계약 일치 | active spec의 shell/slot/area/system mapping이 실제 구현과 맞는가 | spec만 보고 구현 구조를 재현할 수 있어야 한다 |
| 현상 재현율 | batch마다 화면 구조와 콘텐츠 출력이 일관적인가 | registry/spec/mock 기준으로 안정적으로 재현되는지 확인한다 |

## 휴리스틱 리뷰는 어떻게 붙일까

휴리스틱 리뷰는 벤치마크 점수와 별도 코멘트로 운영한다.

추천 리뷰 축:

| 리뷰 축 | 질문 |
|---|---|
| 명확성 | 사용자가 이 화면의 목적을 바로 이해하는가? |
| 행동 가능성 | 다음에 무엇을 해야 하는지 명확한가? |
| 실수 방지 | 위험하거나 되돌리기 어려운 행동에 충분한 안내가 있는가? |
| 상태 피드백 | 선택, 로딩, 오류, 완료 상태가 즉시 이해되는가? |
| 정보 구조 | 중요한 정보가 먼저 보이고, 보조 정보는 적절히 물러나 있는가? |
| 접근성 | 터치, 대비, label, role이 기본 품질을 만족하는가? |
| 회복 가능성 | 실패/거부/노데이터 상황에서 사용자가 다음 행동을 알 수 있는가? |

운영 원칙:

- 휴리스틱 리뷰 결과는 active spec에 저장하지 않는다.
- 반복적으로 발견되는 휴리스틱 문제만 benchmark 항목이나 component contract로 승격한다.
- preview에서는 benchmark finding과 heuristic note를 분리해서 보여준다.

## 한 문장 요약

이 벤치마크는 화면의 미적 완성도만 보는 것이 아니라, 제한된 디자인 시스템 어휘가 여러 도메인의 화면을 일관되게 표현할 수 있는지 검증한다. 휴리스틱 리뷰는 그 위에 사용자 이해, 실수 방지, 상태 피드백 같은 UX 품질을 별도로 보완하는 리뷰 레이어다.
