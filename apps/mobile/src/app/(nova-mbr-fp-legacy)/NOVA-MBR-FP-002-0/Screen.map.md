# Screen.map.md - NOVA-MBR-FP-002-0 개인정보 입력

Phase 2 Map SOT. This file owns policy meaning, coverage, user copy, states,
CTA meaning, and governance refs only. It does not own layout, spacing,
component selection, or route registration.

## Policy Coverage Matrix

| screen / OGN | referenced policy group or IDs | present in policy-core | missing in policy-core | coverage | map handling |
|---|---|---|---|---|---|
| `NOVA-MBR-FP-002-0` screen | INFO-001, INFO-002, INFO-003 groups from SB | `POL-MBR-INFO-002-03`, `POL-MBR-INFO-002-04`, `POL-MBR-INFO-002-05`, `POL-MBR-INFO-002-06`, `POL-MBR-INFO-002-08` | INFO-001 required-field policy, INFO-003 entry-check policy | yellow | policy-backed INFO-002 validation proceeds; INFO-001 and INFO-003 are isolated as SB-only or blocked |
| `ogn-mbr-member-input` | 회원정보 입력, INFO-002 validation, required fields, duplicate checks | `POL-MBR-INFO-002-03/04/05/06/08` | INFO-001 required-field definition, duplicate-check policy IDs such as INFO-002-01/11 | yellow | validation rules are policy-backed; required field list, email/password-confirm, duplicate server messages remain SB-only |
| `ogn-mbr-entry-check` | INFO-003 entryCheck normal/dormant/withdrawn member branches | none | INFO-003-* | red | policy-blocked; reserved OGN only, no authored copy or visible default state |

## Screen Identity

- screenId: `NOVA-MBR-FP-002-0`
- screenName: 개인정보 입력
- domain: `MBR`
- flowContext: 회원 가입 플로우, 약관 동의 이후 개인정보를 입력하고 본인인증으로 이동한다.
- transition: successful member input validation moves to `NOVA-MBR-FP-003-0`.
- configTrace:
  - `Screen.config.ts generation.policyRefs`: `POL-MBR-INFO-002-03`, `POL-MBR-INFO-002-04`, `POL-MBR-INFO-002-05`, `POL-MBR-INFO-002-06`, `POL-MBR-INFO-002-08`
  - `Screen.config.ts generation.ognIds`: `ogn-mbr-member-input`, `ogn-mbr-entry-check`

## Policy-Backed Requirements

Source: `packages/policy-core/policies/MBR/INFO/POL-MBR-INFO-002.md` and matching `.policy.ts` files. OGN owner: `ogn-mbr-member-input`.

| policyId | policy meaning | source text | user-facing requirement copy | error copy | screen requirement |
|---|---|---|---|---|---|
| `POL-MBR-INFO-002-03` | 아이디 문자 종류 | 아이디는 영문과 숫자만 허용한다. | 영문, 숫자만 입력 | 아이디는 영문과 숫자만 입력해 주세요 | 아이디 입력은 영문/숫자만 허용한다. |
| `POL-MBR-INFO-002-04` | 아이디 길이 | 아이디는 6자 이상 20자 이하로 입력한다. | 6~20자 | 아이디는 6~20자로 입력해 주세요 | 아이디 입력은 6~20자, maxLength 20을 따른다. |
| `POL-MBR-INFO-002-05` | 비밀번호 길이 | 비밀번호는 10자 이상 20자 이하로 입력한다. | 10~20자 | 비밀번호는 10~20자로 입력해 주세요 | 비밀번호 입력은 10~20자, maxLength 20을 따른다. |
| `POL-MBR-INFO-002-06` | 비밀번호 문자 조합 | 비밀번호는 영문 대문자, 영문 소문자, 숫자, 특수문자 중 3종 이상을 조합한다. | 영문 대/소문자, 숫자, 특수문자 중 3종 이상 조합 | 영문 대/소문자, 숫자, 특수문자 중 3종 이상 조합해 주세요 | 비밀번호는 대문자/소문자/숫자/특수문자 중 3종 이상을 포함한다. |
| `POL-MBR-INFO-002-08` | 휴대폰번호 형식 | 휴대폰번호는 숫자만 11자리로 입력한다. | 숫자 11자리 | 휴대폰번호는 숫자 11자리로 입력해 주세요 | 휴대폰번호 입력은 숫자 11자리, numeric input, maxLength 11을 따른다. |

## Field And Validation Map

| field | policy-backed rules | SB-only facts | error / recovery rule | OGN |
|---|---|---|---|---|
| 아이디 | `POL-MBR-INFO-002-03`, `POL-MBR-INFO-002-04` | required field, inline duplicate-check action, duplicate-result server message | policy-backed format/length errors appear adjacent to the field; duplicate result copy is server-provided only | `ogn-mbr-member-input` |
| 비밀번호 | `POL-MBR-INFO-002-05`, `POL-MBR-INFO-002-06` | required field | policy-backed length/combination errors appear adjacent to the field | `ogn-mbr-member-input` |
| 비밀번호 확인 | none | confirm-field used to compare with password | mismatch behavior is form integrity only; no policy ID exists | `ogn-mbr-member-input` |
| 이메일 | none | required field, possible duplicate-result server message | no email format policy exists in policy-core; do not invent validation copy | `ogn-mbr-member-input` |
| 휴대폰번호 | `POL-MBR-INFO-002-08` | required field, possible duplicate-result server message | policy-backed numeric/length error appears adjacent to the field; duplicate result copy is server-provided only | `ogn-mbr-member-input` |

## SB-Only Facts

These facts may be necessary for the existing FP flow but are not policy-backed in `policy-core`.

| factId | fact | missing policy | handling |
|---|---|---|---|
| `SB-MI-REQUIRED` | 아이디, 비밀번호, 비밀번호 확인, 이메일, 휴대폰번호 are treated as required inputs. | INFO-001 required-field policy | keep as SB-only required-state metadata; do not promote to policy meaning |
| `SB-MI-DUPLICATE` | 아이디/이메일/휴대폰번호 duplicate checks may produce server results. | INFO-002 duplicate-check IDs such as 002-01/11 | server-provided message may be displayed, but copy and eligibility are not authored here |
| `SB-MI-ID-CHECK` | 아이디 has an inline duplicate-check affordance. | none | SB-only affordance tied to the 아이디 field |
| `SB-MI-EMAIL` | 이메일 field exists. | INFO-001 or email validation policy absent | field presence only; no invented format validation |
| `SB-MI-PASSWORD-CONFIRM` | 비밀번호 확인 field exists. | none | form consistency field only |

## Missing / Policy-Blocked Entry Check

`ogn-mbr-entry-check` is included in `Screen.config.ts generation.ognIds`, but policy-core has no INFO-003 policy files. Therefore it is policy-blocked.

| blocked item | missing policy | blocked reason | allowed treatment |
|---|---|---|---|
| 정상 회원 진입 차단 안내 | INFO-003-* | no source text or copy in policy-core | do not show authored copy in the default screen |
| 휴면 회원 안내 | INFO-003-* | no source text or copy in policy-core | reserved / out-of-state only |
| 탈퇴 회원 안내 | INFO-003-* | no source text or copy in policy-core | reserved / out-of-state only |
| entryCheck API loading | INFO-003-* | domain meaning absent; loading behavior can only follow governance if surfaced later | default screen keeps it non-visible |

`blockedReason`: INFO-003 policy is absent, so entry eligibility branches, labels, and recovery copy cannot be confirmed.
`neededDecision`: backfill INFO-003 policy before making entryCheck visible or adding policyRefs.

## CTA Meaning

- Bottom CTA label in the current screen is `다음`.
- CTA meaning: submit or validate member information and proceed to 본인인증.
- Enabled/disabled and submit error handling must reflect field validity. Policy-backed validation is limited to INFO-002 rules above; required-field and duplicate-server states remain SB-only.
- CTA does not confirm membership eligibility; INFO-003 entryCheck is policy-blocked.

## Governance Refs

| governanceRef | selection reason | affected requirement | copy / state / CTA impact |
|---|---|---|---|
| `UXPT_BTN` | The flow has a single bottom progression action and an inline duplicate-check action. | CTA `다음`, 아이디 중복확인 | keep one primary progression action; inline check action must not compete with bottom primary; labels should describe the action. |
| `UXPT_ERR` | INFO-002 validation errors are field-specific. | 아이디, 비밀번호, 휴대폰번호 validation | show errors near the field with cause and correction; avoid only a top-level generic error. |
| `UXPT_LOD` | entryCheck and duplicate checks can have server states, but entryCheck is blocked by policy. | SB-only server checks | if a server state is surfaced later, use area-appropriate loading; do not expose INFO-003 copy without policy. |
| `UXPT_NAV` | Multi-step signup flow must preserve previous input context. | back from FP-002 to FP-001 and forward to FP-003 | back returns to the previous step and preserves entered data; close/exit requires loss-prevention handling. |
| `VOT_RUL` | Input helper/error copy must remain consistent. | all helper/error/CTA copy | use 해요체 for guidance/errors, no customer name before identity is verified. |

Reviewed but not selected: `UXPT_ERR` empty-result and AI failure variants, `UXPT_LOD` AI thinking variant, and GNB-specific `UXPT_NAV` rules. They do not apply to this form step.

## Linked OGN IDs

- `ogn-mbr-member-input`: owns INFO-002 policy-backed validation and SB-only field structure.
- `ogn-mbr-entry-check`: reserved in config, policy-blocked because INFO-003 is missing.

## Done Criteria Check

- Coverage Matrix separates policy-backed, SB-only, and missing/policy-blocked items.
- All `Screen.config.ts generation.policyRefs` are mapped to field requirements.
- All `Screen.config.ts generation.ognIds` are traceable.
- INFO-003 entryCheck is explicitly policy-blocked and excluded from `policyRefs`.
