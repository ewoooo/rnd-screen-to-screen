# LEGACY-MBR-PG-006-0-CX — 회원 가입 기본 정보 Map

## Screen Scope

- screenId: `LEGACY-MBR-PG-006-0-CX`
- source: current `Screen.tsx`
- pattern: `form-entry`
- route: `/LEGACY-MBR-PG-006-0-CX`
- policyRefs: `structural-only`
- ognIds: `ogn-mbr-signup-profile-intro`, `ogn-mbr-signup-basic-profile`, `ogn-mbr-signup-gender-choice`, `ogn-mbr-signup-profile-actions`
- governanceRefs: `TBD`
- implementationBoundary: Legacy-converted metadata is reverse-engineered from the current implementation. No policy-core source is confirmed for field requirements, format validation, gender choice semantics, or data-use copy.

## Requirement Matrix

| requirement | sourceRef | screen role | user copy | mapped section | OGN | status |
| --- | --- | --- | --- | --- | --- | --- |
| `LEGACY-MBR-SIGNUP-PROFILE-INTRO` | current `Screen.tsx` | introduce signup basic-info step | `회원 가입 2/5`, `기본 정보를 입력해주세요`, `본인인증과 회원 식별에 사용해요. 입력값은 서비스 이용 외에 활용되지 않습니다.` | `intro` | `ogn-mbr-signup-profile-intro` | structural-only |
| `LEGACY-MBR-SIGNUP-BASIC-PROFILE` | current `Screen.tsx` | collect name, birth date, and phone number | `이름`, `생년월일`, `휴대전화`, related placeholders and helper text | `profile` | `ogn-mbr-signup-basic-profile` | structural-only; policy TBD |
| `LEGACY-MBR-SIGNUP-GENDER-CHOICE` | current `Screen.tsx` | collect one gender option | `남성`, `여성`, `선택 안 함` | `gender` | `ogn-mbr-signup-gender-choice` | structural-only; policy TBD |
| `LEGACY-MBR-SIGNUP-PROFILE-ACTIONS` | current `Screen.tsx` | block progression until implemented required inputs are present | `다음으로` | `actions` | `ogn-mbr-signup-profile-actions` | structural-only |

## Governance Review

| ref | selectionReason | affectedRequirement | impact | notApplicableReason |
| --- | --- | --- | --- | --- |
| `UXPT_BTN` | Candidate only: bottom CTA has disabled/enabled progression behavior. | `LEGACY-MBR-SIGNUP-PROFILE-ACTIONS` | Preserve one fixed primary action and no secondary action. | Governance source not formally mapped for this legacy-converted screen. |
| `UXPT_NAV` | Candidate only: screen uses header back navigation in a multi-step flow. | `LEGACY-MBR-SIGNUP-PROFILE-INTRO` | Preserve AppBar ownership of navigation. | Governance source not formally mapped for this legacy-converted screen. |
| `VOT_RUL` | Candidate only: existing copy is concise and task-oriented. | all requirements | Do not rewrite copy while metadata is structural-only. | Governance source not formally mapped for this legacy-converted screen. |

## Policy Notes

- Do not create policy IDs for this screen until policy-core has confirmed signup profile requirements.
- Current implementation blocks CTA when `name.trim().length === 0`, `birth.length !== 8`, phone length is not 10 or 11, or `gender` is unset.
- Current implementation does not validate actual calendar date correctness beyond 8 characters.
- Current implementation filters phone input to digits and truncates to 11 digits.
- Current implementation treats "선택 안 함" as a selected gender value that satisfies CTA activation.
