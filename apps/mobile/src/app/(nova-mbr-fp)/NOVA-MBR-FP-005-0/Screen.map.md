# Screen.map.md — NOVA-MBR-FP-005-0 가입 완료

> Phase 2 (Map). Owns policy meaning + governance selection only. No layout/spacing/component/route decisions.
> This is a **policy-free completion result screen**. Governance (UXPT_BTN, UXPT_NAV, VOT) + DESIGN_PATTERNS Completion own the contract. No policy IDs are invented.

## Screen Identity

- screenId: `NOVA-MBR-FP-005-0`
- screenName: 가입 완료
- domain: `mbr` (가입 플로우 / FP)
- pattern: `complete`
- screenPath: 약관 동의 > 개인정보 입력 > 본인인증 > 회원 검증 > 가입 완료
- relatedFeature: `FN-MBR-JOIN-005`
- relatedPolicyGroup: 없음 (`-`)
- finalTransition: → 홈 (홈으로 이동)

## Policy Coverage Matrix

| screen ID | OGN ID | SB policy IDs | present policy IDs | missing policy IDs | coverage | next action |
|---|---|---|---|---|---|---|
| NOVA-MBR-FP-005-0 | ogn-mbr-join-complete | (없음 `-`) | (없음) | (없음) | **green** | map |

Coverage verdict rationale: SB `관련 정책 그룹: -`, `관련 정책서: -`. SB declares **no policy reference**. This is not a `red`/blocked state — it is a deliberately policy-free completion result screen whose contract is owned by UX governance + DESIGN_PATTERNS Completion (per user directive and SB). `policyRefs = []` (empty). No policy IDs are inferred from SB prose.

## Policy Requirement Matrix

No policy refs — completion result screen. Required information / CTA meaning / error states are mapped from SB (`screen/NOVA-MBR-FP-005-0.md`, `organism/ogn-mbr-join-complete.md`) and constrained by governance + writing voice.

| reqId | source | required info / meaning | mapped OGN | state |
|---|---|---|---|---|
| R1 | SB ogn `[가입 완료 안내]` | 가입(회원 생성)이 완료되었음을 사용자에게 명확히 알리는 결과 안내 (완료 hero: 완료 메시지 + 보조 카피) | ogn-mbr-join-complete | default (success) |
| R2 | SB ogn 컴포넌트 #1 `section-message-join-success` (positive) | 가입 완료 성공 상태를 긍정형으로 확인시키는 안내 메시지 | ogn-mbr-join-complete | default (success) |
| R3 | SB ogn `[액션:tap 홈으로 이동]` / 컴포넌트 #3 `action-area-join-done` (strong, navigate 홈) | 후속 행동: 홈으로 이동. 가입 플로우 종료 후 단일 다음 행동 제시 | ogn-mbr-join-complete | default (success) |
| R4 | SB ogn 컴포넌트 #2 `section-message-session-error` (cautionary) / 케이스분기 E3 | 세션 생성 실패 시: 로그인 재시도를 안내하는 주의(cautionary) 안내. 화면 안내 유지 | ogn-mbr-join-complete | out-of-state (error: 세션 생성 실패) |
| R5 (optional, SB-only) | SB screen `오가니즘 설명: 가입 결과를 안내` + DESIGN_PATTERNS Completion 요약 카드 권장 | 가입 결과 요약(key-value)이 있을 경우 처리 결과 확인 카드. **SB `서버 제어 항목: -`** → 표시할 결과 필드가 SB에 명시되지 않음. 정책/SB 데이터 소스 없음 | ogn-mbr-join-complete (conditional) | default (success) |

### Error / Case Branches (out-of-state)

SB `케이스 분기`의 E1/E2/E3는 NOVA-MBR-FP-005-0 본 화면의 default(success) 상태가 아닌 **out-of-state**다. 본 Map/Diagram의 일차 대상은 default(success) + 화면 내 표현 가능한 error state(E3)다.

| caseId | 이름 | 의미 | 후속 처리 | 본 화면 표현 |
|---|---|---|---|---|
| NOVA-MBR-FP-005-E1 | 계정 생성 실패 | 회원(계정) 생성 실패 | 가입 완료 처리 중단 | out-of-state. 본 완료 화면에 도달하지 않음(처리 중단). 화면 내 인라인 표현 대상 아님 |
| NOVA-MBR-FP-005-E2 | 동의 이력 누락 | 약관 동의 이력 누락 | 약관 단계 재진입 | out-of-state. 약관 단계로 재진입(다른 화면 흐름). 본 완료 화면 내 인라인 표현 대상 아님 |
| NOVA-MBR-FP-005-E3 | 세션 생성 실패 | 가입은 성공했으나 로그인 세션 생성 실패 | 로그인 재시도 안내 | **in-screen out-of-state**. SB ogn `error` 케이스: section-message(cautionary) 노출 + 화면 안내 유지. → R4. 본 화면의 cautionary Notice로 표현 |

> SB ogn 케이스분기 표는 error trigger를 "세션 생성 실패"(setState, section-message cautionary)로만 in-screen으로 명시한다. "가입 완료 알림 실패"는 SB ogn 노출 케이스 설명에 `화면 안내 유지`로만 언급되며 별도 컴포넌트 변화가 없으므로 본 화면 default 안내를 그대로 유지하는 것으로 매핑한다. E1/E2는 화면 도달 전/다른 흐름으로 분기하므로 본 화면 인라인 상태가 아니다.

## User Copy (derived from governance + writing voice; no policy source)

정책 원문이 없으므로 copy는 SB 의미 + VOT writing voice 기준으로 작성한다. 최종 문구는 Phase 4에서 확정하되 의미·톤 계약은 아래로 고정한다.

| slot | copy 의미 (계약) | 톤 근거 |
|---|---|---|
| 완료 hero title | 가입이 완료되었음을 결과 중심으로 먼저 짚는 친근한 구어체. 예 의미: "가입이 완료됐어요" | VOT_RUL (해요체 어체), VOT_DEF (완료는 결과 먼저), DESIGN_PATTERNS 완료 화면 copy |
| 완료 hero subTitle / titleSubText | 다음 기대값 안내(이제 서비스를 이용할 수 있음). 긍정형 | VOT_RUL (긍정형), VOT_DEF (유리한 다음 행동 먼저 제시) |
| success section-message (positive) | 가입 성공을 긍정형으로 확인. 손실/부정 표현 금지 | VOT_RUL (긍정형 + 결과/상태 수동형 허용: "가입이 완료됐어요") |
| 홈 이동 버튼 라벨 | 동사형, 결과 예측 가능한 단일 행동. 의미: "홈으로 이동하기" 류. `'확인'` 단독 금지 | UXPT_BTN (동사형·결과 예측·완료 화면 홈 복귀 라벨 위계) |
| 세션 생성 실패 cautionary Notice | 가입은 됐으나 로그인 세션 생성 실패 → 로그인 재시도 안내. 책임지는 톤, 사용자가 다음 행동을 알 수 있게 | VOT_DEF (공감 후 다음 행동), VOT_RUL (완료/핵심 메시지 어체·상태 인지 부정형 제한 허용) |

## Governance Refs

### Selected

이 화면이 실제로 적용하는 governance는 아래 canonical ID로 한정한다 (suffix·하위번호 사용 금지). 각 ID의 Diagram 적용은 `Screen.diagram.md`의 `## Governance Application` 및 section별 `appliedGovernanceRefs`에 1:1로 반영된다.

| governanceRef | selectionReason | affectedRequirement | copy/state/CTA impact |
|---|---|---|---|
| `UXPT_BTN` | 완료 화면의 단일 후속 행동(홈 이동). SB action-area `strong` 단일 버튼. 화면당 Primary 1개·동사형·결과 예측 가능 라벨 계약 필요 | R3 (홈 이동 CTA) | CTA는 Solid Primary 단 1개. 라벨은 `'확인'` 단독 금지, 동사형(홈 이동 행동 명시). 비교/선택 버튼 나열 금지 |
| `UXPT_NAV` | 완료 화면은 가입 플로우 종료 지점. 닫기/홈 이동 navigation 소유와 "닫은 후 사전 정의 기준 화면(홈)" 규칙, 완료 후 재진입 방지(뒤로가기 금지) 적용. 하단 GNB 탭 구조는 본 종료 결과 화면에서 비대상 | R3 (홈 이동 / 종료 navigation), screen chrome | 완료 후 이동 위치는 사전 정의(홈)으로 고정. AppBar 뒤로가기 금지(완료 후 재진입 방지) — DESIGN_PATTERNS Completion 주의사항과 일치. 본문 CTA가 navigation 소유. GNB 미소유 |
| `VOT_RUL` | 정책 원문이 없으므로 모든 사용자 copy의 어체·능동/수동·긍정/부정·호칭 계약을 VOT가 단독 소유 | R1·R2·R3·R4·R5 copy 전반 | 해요체 통일, 결과/상태는 수동형 허용("완료됐어요"), 긍정형 기본, 호칭은 본인인증 완료 고객 한정·화면 내 1회. 완료/핵심 메시지 어체·상태 인지 부정형 제한 허용 |
| `VOT_DEF` | 완료 단계 보이스 원칙(책임지는 톤). 결과 먼저 짚고 다음 기대값/유리한 다음 행동 제시 | R1·R2·R3·R4 | hero는 결과(가입 완료) 먼저 → 다음 기대값. 세션 실패 Notice는 공감 후 다음 행동(로그인 재시도) 안내 |
| `UXPT_ERR` | E3(세션 생성 실패)가 본 화면 내 표현 대상인 out-of-state. 상태 안내 메시지 톤·노출 계약을 적용(입력 필드 에러 패턴은 없음 — cautionary 안내 메시지로만 처리) | R4 (세션 생성 실패 안내) | 세션 실패 시 cautionary section-message만 추가, default success 안내와 배타. 별도 복구 UI 신설 금지 |

### Reviewed but not selected (해당 없음)

본 단순 완료형(완료 결과) 화면 구조상 진행 표시·로딩·페이지 전환·콘텐츠 제어·복구 전용 UI·상담/대화형/탐색 보이스 governance는 적용 대상이 아니다. 비대상 governance는 Screen.map.md에 governanceRef로 echo하지 않으며(불필요한 token 발산 방지), 그 비적용 판단은 `Screen.diagram.md`의 `## Governance Application` notApplicable 항목에 truthful하게 기록한다.

## OGN Linkage

| OGN ID | requirements | boundary (Phase 3에서 확정) |
|---|---|---|
| `ogn-mbr-join-complete` | R1, R2, R3, R4, R5(conditional) | 사용자 지시: **new** (legacy reuse 금지). Phase 3 Diagram에서 ognBoundaryDecision=new 확정 |

mapped 요구사항(R1–R4)은 모두 `ogn-mbr-join-complete`에 연결됨. R5는 SB-only·데이터 소스 미명시 conditional → Diagram에서 conditional/structural 처리 결정.

## SB-only Facts / Ambiguity (Phase 3·4 주의)

- 정책 원문 0개. 모든 화면 의미는 SB + governance 기준. 정책 ID 발명 금지 (`policyRefs = []`).
- **R5 결과 요약 카드 데이터 소스 부재**: SB screen `서버 제어 항목: -`, ogn에 표시할 결과 필드(요금제명/적용일 등) 미명시. SB ogn 설명은 "가입 결과를 안내"라고만 함. DESIGN_PATTERNS Completion은 요약 카드를 "항상 포함 권장"으로 두지만, 표시할 key-value 데이터가 SB/정책에 없다. → Phase 3에서 요약 카드는 (a) 데이터가 없으면 structural-only/생략, (b) 후속 데이터 제공 시 card-key-value-summary로 확장 가능, 두 경로를 Diagram에 명시. 임의 가격/자격/선택지 값을 발명하지 않는다.
- "가입 완료 알림 실패" (SB ogn 노출 케이스): 별도 컴포넌트 변화 없이 "화면 안내 유지". 본 화면 default 안내 유지로 매핑, 추가 UI 없음.
- E1/E2는 본 완료 화면 도달 전/다른 흐름 분기. 본 화면 인라인 상태로 구현하지 않는다.

## Blocking Ambiguity

없음 (정책 결손이 아니라 의도된 policy-free 완료 화면 — coverage green으로 진행). R5 요약 카드 데이터 부재는 blocking이 아니라 Phase 3 conditional 처리 사항.
