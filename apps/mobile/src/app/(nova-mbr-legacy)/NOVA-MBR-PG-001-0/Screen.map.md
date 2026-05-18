# NOVA-MBR-PG-001-0 — MBR 가입 1·약관 동의 Map

## Screen Scope

- screenId: `NOVA-MBR-PG-001-0`
- source: `implementation`
- pattern: `form`
- route: `/NOVA-MBR-PG-001-0`
- policyRefs: `POL-MBR-TERM-001-06`, `POL-MBR-TERM-002-01`, `POL-MBR-TERM-002-05`
- ognIds: `ogn-mbr-section-header-page`, `ogn-mbr-checkbox-terms`, `ogn-mbr-text-field-guardian-request`, `ogn-mbr-action-area-terms`
- selectedGovernanceRefs: `UXPT_BTN`, `UXPT_ERR`, `UXPT_NAV`, `VOT_RUL`
- implementationBoundary: This map prepares the policy/governance contract for later screen recreation. It does not expand beyond the current visible implementation: `TextFieldGuardianRequest visible={false}` and `ActionAreaTerms disabled`.

## Phase 2 Policy / Governance Mapping

### Policy Source Matrix

| policyRef | sourceText | user-facing requirement | mapped section | OGN | visible status |
| --- | --- | --- | --- | --- | --- |
| `POL-MBR-TERM-001-06` | 필수 약관에 미동의한 경우 다음 단계 진행을 차단한다. | 필수 약관 동의 전에는 다음 단계 진행을 막는다. | `terms`, `actions` | `ogn-mbr-checkbox-terms`, `ogn-mbr-action-area-terms` | `CheckboxTerms` visible, `ActionAreaTerms disabled` visible |
| `POL-MBR-TERM-002-01` | 만 14세 미만 고객은 법정대리인의 동의를 받아야 한다. | 만 14세 미만 상태에서는 법정대리인 동의 요청 흐름이 필요하다. | `guardian` | `ogn-mbr-text-field-guardian-request` | OGN mounted but hidden by `visible={false}` in current screen state |
| `POL-MBR-TERM-002-05` | 법정대리인 동의 요청의 유효시간은 24시간이다. | 법정대리인 동의 요청 상태에서는 24시간 유효시간을 관리해야 한다. | `guardian` | `ogn-mbr-text-field-guardian-request` | not visible in current screen state; do not surface copy until the guardian state is visible |

### Screen Requirement Matrix

| requirement | sourceRef | screen role | user copy | mapped section | OGN | status |
| --- | --- | --- | --- | --- | --- | --- |
| `NOVA-MBR-TERMS-INTRO` | current implementation + form pattern | introduce the membership terms step | `약관 동의`, `회원 가입을 위한 필수·선택 약관에 동의해 주세요` | `intro` | `ogn-mbr-section-header-page` | mapped |
| `NOVA-MBR-TERMS-LIST` | `POL-MBR-TERM-001-06` | collect/check required and optional terms agreement | terms checklist copy owned by `CheckboxTerms` | `terms` | `ogn-mbr-checkbox-terms` | mapped |
| `NOVA-MBR-TERMS-GUARDIAN` | `POL-MBR-TERM-002-01`, `POL-MBR-TERM-002-05` | reserve guardian consent request contract for under-14 state | none visible in this state | `guardian` | `ogn-mbr-text-field-guardian-request` | mapped as hidden current-state OGN |
| `NOVA-MBR-TERMS-ACTION` | `POL-MBR-TERM-001-06` | block progression until required terms are satisfied | disabled next action owned by `ActionAreaTerms` | `actions` | `ogn-mbr-action-area-terms` | mapped |

## Governance Review

| ref | selectionReason | affectedRequirement | impact | notApplicableReason |
| --- | --- | --- | --- | --- |
| `UXPT_BTN` | The bottom CTA is the primary task action and its disabled state communicates progression blocking. | `NOVA-MBR-TERMS-ACTION` | Keep one primary bottom action; do not add competing actions or ambiguous labels during recreation. | - |
| `UXPT_ERR` | Policy includes blocking and guardian-expiry error copy, even though the current state shows no inline error. | `NOVA-MBR-TERMS-LIST`, `NOVA-MBR-TERMS-GUARDIAN`, `NOVA-MBR-TERMS-ACTION` | Error copy remains policy-bound and should only appear in the matching failed state. | - |
| `UXPT_NAV` | The screen is the first step of a multi-step membership flow and uses header back navigation. | `NOVA-MBR-TERMS-INTRO`, `NOVA-MBR-TERMS-ACTION` | Preserve `AppBar` navigation ownership and do not replace it with an in-content close/previous action. | - |
| `VOT_RUL` | Intro and policy-derived copy must stay in consistent user-facing tone. | all mapped requirements | Keep copy concise, action-oriented, and consistent with the existing Korean voice. | - |
