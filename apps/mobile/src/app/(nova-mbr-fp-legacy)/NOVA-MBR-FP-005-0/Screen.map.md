# NOVA-MBR-FP-005-0 · Screen.map.md

> Phase 2 Map. Owns policy meaning, source coverage, state/CTA meaning, and governance selection only. No layout, spacing, component, or route implementation decisions.

## Screen Identity

- screenId: `NOVA-MBR-FP-005-0`
- screenName: 가입 완료
- domain: `MBR`
- flowContext: 회원 가입 플로우 완료 결과
- pattern: `complete`
- transition: 가입 완료 화면 → 홈
- configOgnIds: `ogn-mbr-join-complete`
- configPolicyRefs: `[]`
- mapMode: full remap from policy-core + current screen/config

## Policy Coverage Matrix

| screen ID | OGN ID | SB / current policy IDs | policy-core present IDs | missing policy IDs | coverage | next action |
|---|---|---|---|---|---|---|
| NOVA-MBR-FP-005-0 | ogn-mbr-join-complete | none in current `Screen.config.ts` | `POL-MBR-ACCT-001-09`, `POL-MBR-SESS-001-03`, `POL-MBR-SESS-001-07` | none | yellow | map policy-backed facts, keep config mismatch explicit |
| NOVA-MBR-FP-005-0 | ogn-mbr-join-complete | SB-only completion message / success state message | none beyond above result policies | none | yellow | map as SB-only copy/state, not policy ID |
| NOVA-MBR-FP-005-0 | ogn-mbr-join-complete | session creation failure state | `POL-MBR-SESS-001-03` supports automatic login failure only indirectly through copy.error | dedicated session-create-failure policy absent | yellow | map as policy-adjacent state + governance error handling |

Coverage verdict: `Screen.config.ts` currently has `policyRefs: []`, but policy-core contains direct 가입 완료 result policies. This map therefore separates `policy-backed` requirements from `SB-only` screen copy/state and records the config traceability mismatch without editing config.

## Policy-Backed Requirements

| reqId | policyId | sourceText | sourceRef | screen requirement | OGN / slot | status |
|---|---|---|---|---|---|---|
| R1 | `POL-MBR-ACCT-001-09` | 가입 완료 시 계정 상태 코드는 NORMAL로 설정한다. | `packages/policy-core/policies/MBR/ACCT/POL-MBR-ACCT-001-09.policy.ts` | 가입이 정상 처리된 완료 결과를 먼저 알린다. 계정 상태 값 자체는 화면에 표시할 확정 데이터가 있을 때만 요약으로 노출한다. | `ogn-mbr-join-complete` | policy-backed |
| R2 | `POL-MBR-SESS-001-03` | 가입 완료 후 자동 로그인 처리한다. | `packages/policy-core/policies/MBR/SESS/POL-MBR-SESS-001-03.policy.ts` | 가입 완료 뒤 자동 로그인 또는 세션 처리 결과를 안내한다. 자동 로그인 실패는 사용자 책임이 아닌 상태 안내로 다룬다. | `ogn-mbr-join-complete` | policy-backed |
| R3 | `POL-MBR-SESS-001-07` | 가입 완료 후 이동 경로는 가입 완료 화면을 거친 뒤 홈으로 이동한다. | `packages/policy-core/policies/MBR/SESS/POL-MBR-SESS-001-07.policy.ts` | 가입 완료 화면을 거친 뒤 홈으로 이동하는 단일 후속 행동을 제공한다. | bottom CTA / `ogn-mbr-join-complete` meaning | policy-backed |

## SB-Only / Screen-State Requirements

| reqId | source | screen requirement | policy status | handling |
|---|---|---|---|---|
| S1 | current implementation / SB completion screen intent | 완료 hero title: 가입 완료 결과를 사용자에게 명확히 알린다. | policy-backed by R1, copy wording is SB/screen-owned | VOT 기준으로 결과 먼저 안내 |
| S2 | current implementation / success notice | 성공 상태 메시지: 가입이 정상적으로 완료되었음을 긍정형으로 확인한다. | policy-backed by R1, exact notice copy is SB-only | success state only |
| S3 | current implementation / optional `summaryRows` | 가입 정보 요약은 확정 key-value 데이터가 있을 때만 표시한다. | partial policy-backed by R1-R3; concrete rows are absent | 임의 요금제/금액/일자 발명 금지 |
| S4 | current implementation / `sessionError` state | 세션 생성 실패 시 가입 완료는 유지하되 다시 로그인하면 이용 가능하다고 안내한다. | no dedicated session-create-failure policy; R2 copy.error only adjacent | UXPT_ERR + VOT_DEF로 책임 있는 상태 안내 |
| S5 | current implementation / bottom action | CTA label meaning: 홈으로 이동한다. | policy-backed by R3 | 단일 primary, 결과 예측 가능 라벨 |

## Missing Policy / Traceability Notes

- No policy-core item explicitly says "세션 생성 실패 후 로그인 재시도 안내". Treat this as a policy-adjacent state derived from `POL-MBR-SESS-001-03` automatic login handling plus UXPT_ERR, not as a new policy.
- No policy-core item provides concrete completion summary rows beyond account NORMAL, automatic login, and home destination. Summary rows must come from confirmed data; do not invent plan, fee, date, or benefit values.
- Current `Screen.config.ts generation.policyRefs` is empty. This map can trace policy-backed facts to policy-core, but config remains out of sync until a later owned config pass.

## User Copy Contract

| slot | meaning | source / governance |
|---|---|---|
| hero title | 가입 완료 결과를 먼저 알림. Example wording: `가입이 완료됐어요`. | R1, VOT_DEF, VOT_RUL |
| hero subtitle | 이후 서비스를 바로 이용할 수 있음을 안내. | R2, VOT_DEF |
| success notice | 정상 완료 상태를 짧게 확인. | R1, VOT_RUL positive wording |
| optional summary title | 표시 데이터가 있을 때 가입 정보 요약임을 알림. | R1-R3 |
| session error notice | 가입은 완료됐고 로그인 세션만 실패했으므로 다시 로그인하면 이용 가능함을 안내. | R2 adjacent, UXPT_ERR, VOT_DEF |
| bottom CTA | 홈으로 이동하는 단일 행동. `확인` 단독 금지. | R3, UXPT_BTN |

## Governance Refs

| governanceRef | selection reason | affected requirement | copy/state/CTA impact |
|---|---|---|---|
| `UXPT_BTN` | 가입 완료 후 사용자가 할 단일 후속 행동은 홈 이동이다. | R3, S5 | Primary는 한 개. 라벨은 행동과 결과가 드러나야 한다. |
| `UXPT_NAV` | 완료 후 뒤로가기로 가입 흐름에 재진입하지 않도록 종료 이동 기준을 고정한다. | R3, S5 | 홈 이동이 종료 navigation 기준이다. |
| `UXPT_ERR` | 세션 생성 실패는 사용자 입력 오류가 아니라 시스템/세션 상태다. | S4 | 사용자 책임으로 보이지 않게 원인과 다음 행동을 함께 안내한다. |
| `VOT_RUL` | 완료/상태/CTA copy의 어체와 긍정/부정 표현을 통일한다. | S1-S5 | 해요체 기본, 결과/상태 수동형 허용, 모호한 버튼 라벨 금지. |
| `VOT_DEF` | 완료 화면은 결과 먼저, 다음 기대값을 함께 제공해야 한다. | R1-R3, S1-S4 | 완료 결과 → 이용 가능성 → 홈 이동 순서로 의미를 둔다. |

Reviewed but not selected:

- `UXPT_LOD`: 본 완료 화면의 default/synced contract에는 로딩 대기 상태가 없다.
- `UXPT_ERR` empty-result / AI variants: 결과 없음 또는 AI 실패 화면이 아니다.

## OGN Linkage

| OGN ID | requirements | boundary meaning |
|---|---|---|
| `ogn-mbr-join-complete` | R1, R2, S1, S2, S3, S4 | 가입 완료 결과, 성공/세션오류 상태 메시지, optional summary meaning |
| bottom CTA | R3, S5 | AppScreen Bottom chrome owns physical rail; CTA meaning is home navigation after completion |

## Config Traceability Check

- `Screen.config.ts generation.ognIds`: `ogn-mbr-join-complete` is covered above.
- `Screen.config.ts generation.policyRefs`: empty. Map now identifies policy-backed refs `POL-MBR-ACCT-001-09`, `POL-MBR-SESS-001-03`, `POL-MBR-SESS-001-07`; config remains unchanged by scope.
- `Screen.config.ts generation.buildSelections`: completeHero, joinSuccessNotice, completionSummary, sessionErrorNotice, homeAction are traceable to R/S rows above.
