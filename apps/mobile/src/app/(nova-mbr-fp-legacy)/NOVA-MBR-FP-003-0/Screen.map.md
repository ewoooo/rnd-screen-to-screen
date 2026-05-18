# Screen.map.md - NOVA-MBR-FP-003-0 본인인증

Phase 2 Map SOT. This file owns policy meaning, coverage, user copy, states,
CTA meaning, and governance refs only. It does not own layout, spacing,
component selection, or route registration.

## Policy Coverage Matrix

| screen / OGN | referenced policy IDs | present in policy-core | missing in policy-core | coverage | map handling |
|---|---|---|---|---|---|
| `NOVA-MBR-FP-003-0` screen | AUTH-001, AUTH-002, AUTH-003, AUTH-004, AUTH-005 | all configured IDs present | external auth-agency error policy absent | green with one SB-only case | map policy-backed auth flow; isolate external agency failure |
| `ogn-mbr-auth-select` | `POL-MBR-AUTH-002-01`, `POL-MBR-AUTH-002-05`, `POL-MBR-AUTH-002-09` | all present | none | green | map authentication method choices |
| `ogn-mbr-auth-request` | `POL-MBR-AUTH-001-01`, `POL-MBR-AUTH-003-01`, `POL-MBR-AUTH-003-03`, `POL-MBR-AUTH-004-01`, `POL-MBR-AUTH-004-02`, `POL-MBR-AUTH-005-01`, `POL-MBR-AUTH-005-03`, `POL-MBR-AUTH-005-07` | all present | none for configured IDs | green | map code entry, timer, resend, confirm, failure, blocked state |
| SB external agency failure | FP-003-E4 | none | no AUTH policy for external agency outage / alternative method | SB-only | generic system-error governance may apply; do not invent alternative-method policy |

## Screen Identity

- screenId: `NOVA-MBR-FP-003-0`
- screenName: 본인인증
- domain: `MBR`
- flowContext: 회원 가입 플로우, 개인정보 입력 이후 본인 여부를 확인하고 다음 단계로 이동한다.
- transition: successful identity verification moves to `NOVA-MBR-FP-004-0`.
- configTrace:
  - `Screen.config.ts generation.policyRefs`: `POL-MBR-AUTH-001-01`, `POL-MBR-AUTH-002-01`, `POL-MBR-AUTH-002-05`, `POL-MBR-AUTH-002-09`, `POL-MBR-AUTH-003-01`, `POL-MBR-AUTH-003-03`, `POL-MBR-AUTH-004-01`, `POL-MBR-AUTH-004-02`, `POL-MBR-AUTH-005-01`, `POL-MBR-AUTH-005-03`, `POL-MBR-AUTH-005-07`
  - `Screen.config.ts generation.ognIds`: `ogn-mbr-auth-select`, `ogn-mbr-auth-request`

## Policy-Backed Requirements

### OGN: `ogn-mbr-auth-select`

| policyId | policy meaning | source text | user-facing copy | error copy | screen requirement |
|---|---|---|---|---|---|
| `POL-MBR-AUTH-002-01` | 허용 인증수단 | 본인인증 수단은 휴대폰, PASS, 공동인증서 중 하나를 사용한다. | 휴대폰, PASS, 공동인증서 중 선택 | 허용된 인증수단을 선택해 주세요 | present exactly three allowed choices and permit one selection. |
| `POL-MBR-AUTH-002-05` | 기본 노출 인증수단 | 회원 가입 본인인증 화면의 기본 노출 인증수단은 휴대폰, PASS, 공동인증서이다. | 휴대폰, PASS, 공동인증서를 기본 노출 | 사용 가능한 인증수단을 불러오지 못했습니다 | default state exposes the three methods. |
| `POL-MBR-AUTH-002-09` | 인증수단 노출 순서 | 인증수단은 휴대폰, PASS, 공동인증서 순서로 노출한다. | 휴대폰, PASS, 공동인증서 순서 | 인증수단 노출 순서를 확인해 주세요 | order is 휴대폰, PASS, 공동인증서. |

Choices: 휴대폰 / PASS / 공동인증서. Selection is mutually exclusive.

### OGN: `ogn-mbr-auth-request`

| policyId | policy meaning | source text | user-facing copy | error copy | screen requirement |
|---|---|---|---|---|---|
| `POL-MBR-AUTH-001-01` | 회원 가입 본인인증 적용 | 회원 가입 시 본인인증을 적용한다. | 회원 가입 시 본인인증 필요 | 본인인증을 완료해 주세요 | signup cannot continue until verification is complete. |
| `POL-MBR-AUTH-003-01` | 인증번호 자리수 | 인증번호는 6자리이다. | 인증번호 6자리 입력 | 6자리 인증번호를 입력해 주세요 | code input is 6 digits. |
| `POL-MBR-AUTH-003-03` | 인증번호 유효시간 | 인증번호의 유효시간은 3분이다. | 유효시간 3분 | 유효시간이 만료되어 다시 요청해 주세요 | show and enforce a 3-minute validity timer. |
| `POL-MBR-AUTH-004-01` | 재요청 쿨다운 | 인증번호 재요청 쿨다운 시간은 60초이다. | 재요청은 60초 후 가능 | 60초 후 다시 요청해 주세요 | resend is unavailable during 60-second cooldown. |
| `POL-MBR-AUTH-004-02` | 재요청 최대 횟수 | 인증번호 재요청은 최대 5회까지 허용한다. | 재요청은 최대 5회 | 재요청 한도(5회)를 초과했습니다 | after 5 resends, resend is blocked and explained. |
| `POL-MBR-AUTH-005-01` | 인증 실패 최대 횟수 | 본인인증 실패는 최대 5회까지 허용한다. | 최대 5회까지 시도 가능 | 인증 실패 한도(5회)를 초과했습니다 | after 5 failed attempts, verification is limited. |
| `POL-MBR-AUTH-005-03` | 인증 제한 시간 | 인증 실패 한도 초과 시 10분 동안 인증을 제한한다. | 한도 초과 시 10분 인증 제한 | 10분 후 다시 시도해 주세요 | blocked state prevents verification for 10 minutes. |
| `POL-MBR-AUTH-005-07` | 인증 실패 안내 문구 | 인증 실패 시 재시도 또는 제한 처리 안내 문구를 노출한다. | 실패 시 재시도 또는 제한 처리 안내 | 인증번호를 확인하거나 잠시 후 다시 시도해 주세요 | failed confirmation shows retry or limitation guidance. |

## State, Error, And Recovery Map

| state / case | policy backing | required handling | OGN |
|---|---|---|---|
| 인증수단 미선택 | `POL-MBR-AUTH-002-01` | ask user to select one of the allowed methods before confirmation can proceed | `ogn-mbr-auth-select` |
| 인증번호 입력 | `POL-MBR-AUTH-003-01` | accept and validate 6-digit code | `ogn-mbr-auth-request` |
| 타이머 running | `POL-MBR-AUTH-003-03` | expose remaining time for the 3-minute validity window | `ogn-mbr-auth-request` |
| 인증번호 만료 | `POL-MBR-AUTH-003-03` | tell user validity expired and require resend | `ogn-mbr-auth-request` |
| 재요청 cooldown | `POL-MBR-AUTH-004-01` | disable or gate resend until 60 seconds passes | `ogn-mbr-auth-request` |
| 재요청 한도 초과 | `POL-MBR-AUTH-004-02` | block resend after 5 attempts and explain the limit | `ogn-mbr-auth-request` |
| 인증번호 불일치 / 실패 | `POL-MBR-AUTH-005-07`, `POL-MBR-AUTH-005-01` | show failure guidance and remaining/retry implications | `ogn-mbr-auth-request` |
| 인증 실패 한도 초과 | `POL-MBR-AUTH-005-01`, `POL-MBR-AUTH-005-03` | block verification for 10 minutes and show recovery time | `ogn-mbr-auth-request` |
| 인증 확인 action | `POL-MBR-AUTH-001-01`, `POL-MBR-AUTH-003-01` | only meaningful after method selection and 6-digit code entry; success unlocks signup continuation | `ogn-mbr-auth-request` |
| 외부 인증기관 오류 | none | SB-only generic system failure; no policy-backed alternative-method behavior | `ogn-mbr-auth-request` |

## CTA Meaning

- Inline/section action meaning: `인증 확인` verifies the entered 6-digit code for the selected method.
- Resend action meaning: issue a new authentication code subject to 60-second cooldown and 5-resend maximum.
- Bottom CTA label in the current screen is `본인인증 완료하기`.
- Bottom CTA meaning: finish this signup step after verification is complete. It is blocked until the verification success state satisfies `POL-MBR-AUTH-001-01`.

## SB-Only Facts

| factId | fact | missing policy | handling |
|---|---|---|---|
| `SB-AUTH-EXTERNAL-ERROR` | external authentication agency error may occur with guidance toward retry or another method | no AUTH policy for external agency outage or alternative-method routing | treat as generic system-error surface if needed; do not invent concrete alternative eligibility/copy |
| `SB-AUTH-SERVER-CONTROL` | server may control method availability or runtime state | policy only defines default methods/order | defaults remain policy-backed; runtime suppression stays data/API concern |

## Governance Refs

| governanceRef | selection reason | affected requirement | copy / state / CTA impact |
|---|---|---|---|
| `UXPT_BTN` | Screen has bottom progression, resend, and verification actions. | `POL-MBR-AUTH-001-01`, `POL-MBR-AUTH-004-01`, `POL-MBR-AUTH-004-02` | keep one primary bottom CTA; resend is secondary; verification action must describe the action and not compete with bottom primary. |
| `UXPT_ERR` | Code mismatch, expiry, resend limit, and blocked state require explainable errors. | `POL-MBR-AUTH-003-01`, `003-03`, `004-02`, `005-01`, `005-03`, `005-07` | show field-adjacent errors for input issues and clear state messages for limits/system conditions with cause and recovery. |
| `UXPT_LOD` | Authentication method loading and request/confirm operations can wait on server responses. | `POL-MBR-AUTH-002-05`, request/confirm states | method list loading should preserve list shape; request/confirm processing should keep context visible. |
| `UXPT_NAV` | Multi-step signup flow must preserve the previous form context. | flow transition and back behavior | back returns to 개인정보 입력 with preserved data; close/exit protects in-progress auth state. |
| `VOT_RUL` | Security and verification copy must remain consistent. | all helper/error/CTA copy | use 해요체 for guidance/errors; no customer name before verification; completion copy may use restrained factual tone if needed. |

Reviewed but not selected: `UXPT_ERR` empty-result and AI failure variants, `UXPT_LOD` AI thinking variant, and GNB-specific `UXPT_NAV` rules. They do not apply to this verification step.

## Linked OGN IDs

- `ogn-mbr-auth-select`: owns AUTH-002 method choices, default exposure, and order.
- `ogn-mbr-auth-request`: owns AUTH-001 required verification, AUTH-003 code/timer, AUTH-004 resend, and AUTH-005 failure/blocked states.

## Done Criteria Check

- Coverage Matrix appears first and separates green policy-backed items from SB-only external-agency failure.
- All `Screen.config.ts generation.policyRefs` are mapped to policy-backed requirements.
- All `Screen.config.ts generation.ognIds` are traceable.
- Authentication method selection, code/timer/resend/confirm/error/blocked states, CTA meaning, and governance refs are explicit.
