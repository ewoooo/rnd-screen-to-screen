# Screen.map.md - NOVA-MBR-FP-002-0 개인정보 입력

Step 2 Thin Map SOT. Owns policy meaning, coverage, user copy, states, CTA
meaning, and governance refs only. No layout, spacing, component selection, or
route registration. Migrated from `(nova-mbr-fp-legacy)/NOVA-MBR-FP-002-0` and
corrected for the `nova-mbr-fp` group.

## Policy Coverage Matrix

| screen / OGN | referenced policy group or IDs | present in policy-core | missing in policy-core | coverage | map handling |
|---|---|---|---|---|---|
| `NOVA-MBR-FP-002-0` screen | SB `관련 정책 그룹`: PG-MBR-INFO-001, PG-MBR-INFO-002, PG-MBR-INFO-003 | `POL-MBR-INFO-002-03`, `POL-MBR-INFO-002-04`, `POL-MBR-INFO-002-05`, `POL-MBR-INFO-002-06`, `POL-MBR-INFO-002-08` | INFO-001 required-field policy, INFO-003 entry-check policy | yellow | policy-backed INFO-002 validation proceeds; INFO-001 and INFO-003 isolated as SB-only or policy-blocked |
| `ogn-mbr-member-input` | SB 관련 정책서: INFO-001-01/02, INFO-002-01/04/05/11; 형식·중복 검증, 필수 항목 | `POL-MBR-INFO-002-03/04/05/06/08` | INFO-001 required-field definition, duplicate-check IDs such as INFO-002-01/11 | yellow | INFO-002 format/length/combination validation is policy-backed; required-field list, password-confirm, email format, duplicate server messages remain SB-only |
| `ogn-mbr-entry-check` | SB 관련 정책서: INFO-003-01/07/08/09 entry-check normal/dormant/withdrawn branches | none | INFO-003-* | red | policy-blocked; reserved structural-only OGN; no authored copy, no visible default state |

`blockedReason` (ogn-mbr-entry-check): INFO-003 policy files are absent in
policy-core, so entry eligibility branches, labels, and recovery copy cannot be
confirmed. `neededDecision`: backfill INFO-003 policy before making entryCheck
visible or adding it to `policyRefs`.

## Screen Identity

- screenId: `NOVA-MBR-FP-002-0`
- screenName: 개인정보 입력
- domain: `MBR`
- group: `nova-mbr-fp`
- flowContext: 회원 가입 플로우, 약관 동의 이후 개인정보를 입력하고 본인인증으로 이동한다.
- transition: 회원 정보 입력 및 검증 완료 시 `NOVA-MBR-FP-003-0` (전달 데이터: 임시저장ID, 세션ID).
- configTrace:
  - `Screen.config.ts generation.policyRefs`: `POL-MBR-INFO-002-03`, `POL-MBR-INFO-002-04`, `POL-MBR-INFO-002-05`, `POL-MBR-INFO-002-06`, `POL-MBR-INFO-002-08`
  - `Screen.config.ts generation.ognIds`: `ogn-mbr-member-input`, `ogn-mbr-entry-check`

## Policy-Backed Requirements

Source: `packages/policy-core/policies/MBR/INFO/POL-MBR-INFO-002.md` and matching
`.policy.ts` files (copy quoted verbatim). OGN owner: `ogn-mbr-member-input`.

| policyId | policy meaning | source text | requirement copy | error copy | screen requirement |
|---|---|---|---|---|---|
| `POL-MBR-INFO-002-03` | 아이디 문자 종류 | 아이디는 영문과 숫자만 허용한다. | 영문, 숫자만 입력 | 아이디는 영문과 숫자만 입력해 주세요 | 아이디 입력은 영문/숫자만 허용한다. |
| `POL-MBR-INFO-002-04` | 아이디 길이 | 아이디는 6자 이상 20자 이하로 입력한다. | 6~20자 | 아이디는 6~20자로 입력해 주세요 | 아이디 입력은 6~20자, maxLength 20을 따른다. |
| `POL-MBR-INFO-002-05` | 비밀번호 길이 | 비밀번호는 10자 이상 20자 이하로 입력한다. | 10~20자 | 비밀번호는 10~20자로 입력해 주세요 | 비밀번호 입력은 10~20자, maxLength 20을 따른다. |
| `POL-MBR-INFO-002-06` | 비밀번호 문자 조합 | 비밀번호는 영문 대문자, 영문 소문자, 숫자, 특수문자 중 3종 이상을 조합한다. | 영문 대/소문자, 숫자, 특수문자 중 3종 이상 조합 | 영문 대/소문자, 숫자, 특수문자 중 3종 이상 조합해 주세요 | 비밀번호는 대/소문자/숫자/특수문자 중 3종 이상을 포함한다. |
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

Necessary for the FP flow but not policy-backed in policy-core. Kept as
SB-only metadata; not promoted to policy meaning.

| factId | fact | missing policy | handling |
|---|---|---|---|
| `SB-MI-REQUIRED` | 아이디, 비밀번호, 비밀번호 확인, 이메일, 휴대폰번호 are required inputs. | INFO-001 required-field policy | SB-only required-state metadata |
| `SB-MI-DUPLICATE` | 아이디/이메일/휴대폰번호 duplicate checks may produce server results (FP-002-E3/E4/E5). | INFO-002 duplicate IDs such as 002-01/11 | server-provided message may display; copy and eligibility not authored here |
| `SB-MI-ID-CHECK` | 아이디 has an inline duplicate-check affordance. | none | SB-only affordance tied to the 아이디 field |
| `SB-MI-EMAIL` | 이메일 field exists. | INFO-001 / email format policy absent | field presence only; no invented format validation |
| `SB-MI-PASSWORD-CONFIRM` | 비밀번호 확인 field exists. | none | form consistency field only |

## Missing / Policy-Blocked Entry Check

`ogn-mbr-entry-check` is listed in SB and config `ognIds`, but policy-core has
no INFO-003 policy files. It is therefore policy-blocked and excluded from
`policyRefs`.

| blocked item | missing policy | blocked reason | allowed treatment |
|---|---|---|---|
| 기존 정상 회원 진입 안내 | INFO-003-07 | no source text or copy in policy-core | no authored copy in default screen |
| 휴면 회원 안내 | INFO-003-08 | no source text or copy in policy-core | reserved / out-of-state only |
| 탈퇴 회원 안내 | INFO-003-09 | no source text or copy in policy-core | reserved / out-of-state only |
| entryCheck API loading | INFO-003-* | domain meaning absent; loading behavior follows governance only if surfaced later | default screen keeps it non-visible |

## CTA Meaning

- Bottom CTA label: `다음`.
- CTA meaning: submit/validate member information and proceed to 본인인증 (`NOVA-MBR-FP-003-0`).
- Enabled/disabled and submit error handling reflect field validity. Policy-backed validation is limited to the INFO-002 rules above; required-field and duplicate-server states remain SB-only.
- CTA does not confirm membership eligibility; INFO-003 entryCheck is policy-blocked.

## Governance Refs

| governanceRef | selection reason | affected requirement | copy / state / CTA impact |
|---|---|---|---|
| `UXPT_BTN` | Single bottom progression action plus an inline duplicate-check action. | CTA `다음`, 아이디 중복확인 | one primary progression action; inline check must not compete with bottom primary; labels describe the action |
| `UXPT_ERR` | INFO-002 validation errors are field-specific. | 아이디, 비밀번호, 휴대폰번호 validation | show errors near the field with cause and correction; avoid a top-level generic-only error |
| `UXPT_LOD` | entryCheck and duplicate checks can have server states, but entryCheck is policy-blocked. | SB-only server checks | if a server state surfaces later, use area-appropriate loading; do not expose INFO-003 copy without policy |
| `UXPT_NAV` | Multi-step signup must preserve previous input context. | back from FP-002 to FP-001, forward to FP-003 | back returns to the previous step and preserves entered data; close/exit needs loss-prevention handling |
| `VOT_RUL` | Input helper/error copy must remain consistent. | all helper/error/CTA copy | 해요체 for guidance/errors; no customer name before identity is verified |

Reviewed but not selected: `UXPT_ERR` empty-result and AI-failure variants,
`UXPT_LOD` AI-thinking variant, GNB-specific `UXPT_NAV` rules. They do not apply
to this form step.

## Linked OGN IDs

- `ogn-mbr-member-input`: owns INFO-002 policy-backed validation and SB-only field structure (mapped requirement; has policy + section).
- `ogn-mbr-entry-check`: reserved structural-only in config; policy-blocked because INFO-003 is missing. No mapped requirement.

## Done Criteria Check

- Coverage Matrix separates policy-backed, SB-only, and policy-blocked items.
- All `Screen.config.ts generation.policyRefs` map to field requirements.
- All `Screen.config.ts generation.ognIds` are traceable (`ogn-mbr-entry-check` is structural-only/blocked).
- INFO-003 entryCheck is explicitly policy-blocked and excluded from `policyRefs`.
