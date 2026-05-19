# NOVA-MBR-FP-008-0 · Screen.map.md

> Phase 2 Map. Owns policy meaning, source coverage, state/CTA meaning, and governance selection only. No layout, spacing, component, or route implementation decisions.

## Screen Identity

- screenId: `NOVA-MBR-FP-008-0`
- screenName: 본인인증 (휴면 해제 플로우)
- domain: `MBR`
- flowContext: 휴면 해제 전 본인 확인
- pattern: `form`
- transition: 본인인증 완료 → `NOVA-MBR-FP-009-0`
- configOgnIds: `ogn-mbr-auth-select`, `ogn-mbr-auth-request`
- configPolicyRefs: `POL-MBR-AUTH-001-01`, `POL-MBR-AUTH-002-01`, `POL-MBR-AUTH-002-05`, `POL-MBR-AUTH-002-09`, `POL-MBR-AUTH-003-01`, `POL-MBR-AUTH-003-03`, `POL-MBR-AUTH-004-01`, `POL-MBR-AUTH-004-02`, `POL-MBR-AUTH-005-01`, `POL-MBR-AUTH-005-03`, `POL-MBR-AUTH-005-07`
- relationToFP003: same shared auth OGNs and auth policy meaning; FP-008 changes only the screen context and next transition to dormant-release continuation.

## Policy Coverage Matrix

| screen ID | OGN ID | SB / config policy IDs | policy-core present IDs | missing policy IDs | coverage | next action |
|---|---|---|---|---|---|---|
| NOVA-MBR-FP-008-0 | ogn-mbr-auth-select | `POL-MBR-AUTH-002-01`, `POL-MBR-AUTH-002-05`, `POL-MBR-AUTH-002-09` | all present | none | green | map |
| NOVA-MBR-FP-008-0 | ogn-mbr-auth-request | `POL-MBR-AUTH-001-01`, `POL-MBR-AUTH-003-01`, `POL-MBR-AUTH-003-03`, `POL-MBR-AUTH-004-01`, `POL-MBR-AUTH-004-02`, `POL-MBR-AUTH-005-01`, `POL-MBR-AUTH-005-03`, `POL-MBR-AUTH-005-07` | all present | none | green | map |
| NOVA-MBR-FP-008-0 | screen intro / dormant context | 휴면 해제 본인확인 context | no dormant-release-specific auth policy | dormant-specific auth policy absent | yellow | use as flow-context copy only |
| NOVA-MBR-FP-008-0 | ogn-mbr-auth-request | external authentication agency error / alternative method guidance | none | dedicated external-agency fallback policy absent | yellow | generic system error only; do not invent alternatives |

Coverage verdict: auth selection and auth request rules are green. Dormant-release context is yellow because policy-core AUTH source text is written for membership signup, while current screen/config attaches the same shared auth policies to the dormant-release flow. This map applies the common identity-verification gate and marks dormant-specific copy as flow context, not a new policy.

## Policy-Backed Requirements

### OGN: `ogn-mbr-auth-select`

| reqId | policyId | sourceText | sourceRef | screen requirement | type |
|---|---|---|---|---|---|
| A1 | `POL-MBR-AUTH-002-01` | 본인인증 수단은 휴대폰, PASS, 공동인증서 중 하나를 사용한다. | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-002-01.policy.ts` | 인증수단은 휴대폰, PASS, 공동인증서 중 하나만 선택한다. | choice / constraint |
| A2 | `POL-MBR-AUTH-002-05` | 회원 가입 본인인증 화면의 기본 노출 인증수단은 휴대폰, PASS, 공동인증서이다. | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-002-05.policy.ts` | 진입 시 세 인증수단을 기본 노출한다. FP-008에서는 shared auth OGN 적용 범위로 사용한다. | required info |
| A3 | `POL-MBR-AUTH-002-09` | 인증수단은 휴대폰, PASS, 공동인증서 순서로 노출한다. | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-002-09.policy.ts` | 노출 순서는 휴대폰 → PASS → 공동인증서로 고정한다. | ordering |

### OGN: `ogn-mbr-auth-request`

| reqId | policyId | sourceText | sourceRef | screen requirement | type |
|---|---|---|---|---|---|
| B1 | `POL-MBR-AUTH-001-01` | 회원 가입 시 본인인증을 적용한다. | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-001-01.policy.ts` | 본인인증 완료가 다음 단계 진행의 필수 게이트다. FP-008에서는 휴면 해제 전 본인 확인 문맥으로 표현한다. | constraint / CTA gate |
| B2 | `POL-MBR-AUTH-003-01` | 인증번호는 6자리이다. | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-003-01.policy.ts` | 인증번호는 숫자 6자리이며 6자리 미만이면 인증 확인을 완료할 수 없다. | validation |
| B3 | `POL-MBR-AUTH-003-03` | 인증번호의 유효시간은 3분이다. | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-003-03.policy.ts` | 발송 후 3분 유효시간과 만료 상태를 안내한다. | timing / error |
| B4 | `POL-MBR-AUTH-004-01` | 인증번호 재요청 쿨다운 시간은 60초이다. | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-004-01.policy.ts` | 재요청은 60초 쿨다운을 따른다. | constraint / state |
| B5 | `POL-MBR-AUTH-004-02` | 인증번호 재요청은 최대 5회까지 허용한다. | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-004-02.policy.ts` | 재요청은 최대 5회이며 초과 시 제한 안내가 필요하다. | constraint / error |
| B6 | `POL-MBR-AUTH-005-01` | 본인인증 실패는 최대 5회까지 허용한다. | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-005-01.policy.ts` | 인증 실패는 최대 5회까지 허용하고 초과 시 제한 상태가 된다. | constraint / error |
| B7 | `POL-MBR-AUTH-005-03` | 인증 실패 한도 초과 시 10분 동안 인증을 제한한다. | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-005-03.policy.ts` | 실패 한도 초과 시 10분 동안 입력/재요청/확인을 제한한다. | blocked state |
| B8 | `POL-MBR-AUTH-005-07` | 인증 실패 시 재시도 또는 제한 처리 안내 문구를 노출한다. | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-005-07.policy.ts` | 실패 시 재시도 가능 여부 또는 제한 처리 안내를 함께 노출한다. | error copy |

## State / Error Matrix

| state | policy backing | user-facing meaning | handling |
|---|---|---|---|
| default | A1-A3, B1-B5 | 인증수단 선택 후 인증번호를 요청/입력하고 본인 확인을 완료한다. | shared auth flow |
| auth method loading | A2 + `UXPT_LOD` | 사용 가능한 인증수단 로딩 중에도 결과 형태를 예측하게 한다. | same-row skeleton semantics |
| code expired | B3 | 유효시간이 만료되어 다시 요청해야 한다. | recoverable cautionary state |
| mismatch | B6, B8 | 인증번호가 맞지 않아 확인 또는 재시도가 필요하다. | field-adjacent/state notice |
| resend cooldown | B4 | 60초 후 다시 요청할 수 있다. | resend disabled state |
| resend limit | B5 | 재요청 한도 5회를 초과했다. | negative/limited state |
| failure limit blocked | B6, B7, B8 | 인증 실패 한도 초과로 10분간 인증이 제한된다. | all request actions blocked |
| external agency error | SB-only / no policy-core backing | 외부 처리 문제로 잠시 후 다시 시도해야 한다. | generic system-error copy only; no invented alternative method mapping |

## CTA Meaning

| CTA | source | meaning | state |
|---|---|---|---|
| 재요청 | B3-B5 | 인증번호를 다시 요청한다. | cooldown/limit/blocked 조건에 따라 비활성 |
| 인증 확인 | B2, B6-B8 | 입력한 인증번호로 본인 확인을 시도한다. | 6자리 미충족 또는 blocked 시 비활성 |
| 본인 확인 완료하기 | B1 | 휴면 해제 다음 단계로 진행한다. | 인증 확인 완료 전 비활성; 완료 후 단일 primary |

## User Copy Contract

| slot | copy meaning | source / governance |
|---|---|---|
| screen intro | 휴면 해제를 위해 본인 확인이 필요함을 안내한다. | B1 intent + FP-008 flow context; VOT_RUL |
| auth select title | 본인인증 수단 선택 요청. | A1 copy.requirement |
| option labels | 휴대폰 / PASS / 공동인증서. | A1-A3 |
| auth request title | 인증번호 6자리 입력. | B2 copy.requirement |
| timer helper | 유효시간 3분, 남은 시간, 재요청 조건. | B3-B5 |
| code length error | 6자리 인증번호를 입력하도록 안내. | B2 copy.error |
| expired error | 유효시간 만료 후 재요청 안내. | B3 copy.error |
| mismatch error | 인증번호 확인 또는 재시도 안내. | B8 copy.error |
| blocked error | 5회 초과와 10분 제한 안내. | B6-B7 copy.error |
| bottom CTA | 본인 확인 완료 후 다음 단계 진행. | B1 + UXPT_BTN |

## Governance Refs

| governanceRef | selection reason | affected requirement | copy/state/CTA impact |
|---|---|---|---|
| `UXPT_BTN` | 재요청, 인증 확인, 하단 완료 CTA의 위계와 동사형 라벨이 필요하다. | B1-B8 | 하단 Primary는 하나. 재요청/인증 확인은 보조 행동으로 둔다. |
| `UXPT_ERR` | 인증번호 입력 오류, 만료, 실패 한도, 시스템성 오류가 있다. | B2-B8, external agency error | 원인과 해결 방법을 인접 또는 상태 메시지로 함께 안내한다. |
| `UXPT_LOD` | 인증수단 목록 로딩 시 결과 형태를 보존해야 한다. | A2 | 스피너 단독이 아니라 실제 행 구조와 같은 로딩 상태를 사용한다. |
| `UXPT_NAV` | 휴면 해제 다단계 흐름의 직전 단계 복귀와 입력 보존 기준이 필요하다. | B1 flow | Header back은 직전 단계 복귀 의미. 완료 CTA는 다음 단계 진행 의미. |
| `VOT_RUL` | 보안/인증 화면 copy의 어체, 긍정/부정, 호칭 기준이 필요하다. | all copy | 해요체 기본, 미인증 상태 이름 호칭 금지, 보안 완료 문구는 정확한 사실 전달을 우선한다. |

Reviewed but not selected:

- `VOT_DEF`: general voice background only; selected copy rules are covered by `VOT_RUL` and state-specific governance.
- `UXPT_ERR` empty-result / AI variants: no search-empty or AI failure state.

## OGN Linkage

| OGN ID | requirements | boundary meaning |
|---|---|---|
| `ogn-mbr-auth-select` | A1-A3 | authentication method choice, order, loading/failure meaning |
| `ogn-mbr-auth-request` | B1-B8 + state/error matrix | code entry, resend, timer, verification, error/blocked states |
| screen intro | B1 flow context | dormant-release explanation only; no separate policy OGN |
| bottom CTA | B1 | AppScreen Bottom chrome owns physical rail; CTA meaning is gated progress after verified identity |

## Config Traceability Check

- `Screen.config.ts generation.policyRefs`: all eleven policy refs appear in this map.
- `Screen.config.ts generation.ognIds`: both OGN IDs appear in this map.
- `Screen.config.ts generation.buildSelections`: intro, authSelect, authRequest, actions are traceable to the rows above.
