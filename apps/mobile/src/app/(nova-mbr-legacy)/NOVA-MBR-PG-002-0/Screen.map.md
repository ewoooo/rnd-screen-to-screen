# NOVA-MBR-PG-002-0 — MBR 가입 2·개인정보 입력 Map

## Screen Scope

- screenId: `NOVA-MBR-PG-002-0`
- source: `implementation`
- pattern: `form`
- route: `/NOVA-MBR-PG-002-0`
- current visible contract: `ProgressAppBar(title="회원 가입", currentStep=2, totalSteps=5)`, `SectionHeaderPage(title="개인정보 입력")`, `TextFieldMemberInfo`, `SectionMessageEntryBranch(visible={false})`
- policyRefs:
  - `POL-MBR-INFO-002-03`
  - `POL-MBR-INFO-002-04`
  - `POL-MBR-INFO-002-05`
  - `POL-MBR-INFO-002-06`
  - `POL-MBR-INFO-002-08`
- ognIds:
  - `ogn-mbr-section-header-page`
  - `ogn-mbr-text-field-member-info`
  - `ogn-mbr-section-message-entry-branch`
- selectedGovernanceRefs:
  - `UXPT_ERR`
  - `UXPT_NAV`
  - `VOT_RUL`
  - `UXP_ACT`

## Phase 2 Policy Mapping

## Requirement Matrix

| requirement | sourceRef | screen role | user copy | mapped section | OGN | status |
| --- | --- | --- | --- | --- | --- | --- |
| `MBR-INFO-INTRO` | `Screen.tsx` | introduce the current 가입 step | `개인정보 입력` | `intro` | `ogn-mbr-section-header-page` | mapped |
| `MBR-INFO-ID-CHARSET` | `POL-MBR-INFO-002-03` | 아이디 입력 제약 | requirement: `영문, 숫자만 입력`; error: `아이디는 영문과 숫자만 입력해 주세요` | `memberInfo` | `ogn-mbr-text-field-member-info` | mapped |
| `MBR-INFO-ID-LENGTH` | `POL-MBR-INFO-002-04` | 아이디 입력 제약 | requirement: `6~20자`; error: `아이디는 6~20자로 입력해 주세요` | `memberInfo` | `ogn-mbr-text-field-member-info` | mapped |
| `MBR-INFO-PASSWORD-LENGTH` | `POL-MBR-INFO-002-05` | 비밀번호 입력 제약 | requirement: `10~20자`; error: `비밀번호는 10~20자로 입력해 주세요` | `memberInfo` | `ogn-mbr-text-field-member-info` | mapped |
| `MBR-INFO-PASSWORD-COMPOSITION` | `POL-MBR-INFO-002-06` | 비밀번호 입력 제약 | requirement: `영문 대/소문자, 숫자, 특수문자 중 3종 이상 조합`; error: `영문 대/소문자, 숫자, 특수문자 중 3종 이상 조합해 주세요` | `memberInfo` | `ogn-mbr-text-field-member-info` | mapped |
| `MBR-INFO-PHONE-FORMAT` | `POL-MBR-INFO-002-08` | 휴대폰번호 입력 제약 | requirement: `숫자 11자리`; error: `휴대폰번호는 숫자 11자리로 입력해 주세요` | `memberInfo` | `ogn-mbr-text-field-member-info` | mapped |
| `MBR-INFO-ENTRY-BRANCH` | `Screen.tsx` | 가입 분기 안내 placeholder | hidden in current visible contract | `entryBranch` | `ogn-mbr-section-message-entry-branch` | mapped-hidden |

## Governance Review

| ref | selectionReason | affectedRequirement | impact |
| --- | --- | --- | --- |
| `UXPT_ERR` | Field policies include validation errors that must be shown near the failed input. | `MBR-INFO-ID-CHARSET`, `MBR-INFO-ID-LENGTH`, `MBR-INFO-PASSWORD-LENGTH`, `MBR-INFO-PASSWORD-COMPOSITION`, `MBR-INFO-PHONE-FORMAT` | Error copy stays field-specific and action-oriented; no top-level generic error is introduced. |
| `UXPT_NAV` | Current screen is step 2 of a 5-step 가입 flow. | `MBR-INFO-INTRO`, all field requirements | Header progress remains the navigation/progress owner; content sections do not duplicate progress. |
| `VOT_RUL` | Policy copy and validation copy must keep a consistent customer-facing tone. | all visible and validation copy | Use concise 해요체 for errors and avoid over-honorific wording. |
| `UXP_ACT` | 가입 information entry should minimize avoidable effort while preserving required policy validation. | all `memberInfo` requirements | Keep the form focused on required personal information and do not add unrelated confirmation or manual choice steps. |

## Section Mapping

### [intro]

- OGN: `ogn-mbr-section-header-page`
- role: states the current 개인정보 입력 task.
- policy: implementation-owned structural copy; no separate `POL-MBR-INFO-002-*` rule applies to the title.
- appliedGovernanceRefs: `UXPT_NAV`, `VOT_RUL`
- visibleCopy: `개인정보 입력`

### [memberInfo]

- OGN: `ogn-mbr-text-field-member-info`
- role: captures and validates member personal information.
- policy:
  - `POL-MBR-INFO-002-03`
  - `POL-MBR-INFO-002-04`
  - `POL-MBR-INFO-002-05`
  - `POL-MBR-INFO-002-06`
  - `POL-MBR-INFO-002-08`
- appliedGovernanceRefs: `UXPT_ERR`, `VOT_RUL`, `UXP_ACT`
- copyBoundary: field labels, helper requirements, and inline error messages must come from policy definitions or the component's current implementation contract.

### [entryBranch]

- OGN: `ogn-mbr-section-message-entry-branch`
- role: 가입 분기 안내 placeholder.
- policy: no visible policy copy in the current state because `visible={false}`.
- appliedGovernanceRefs: `VOT_RUL`
- visibility: hidden; do not invent branch copy, CTA, or future state in this map.
