# NOVA-MBR-PG-002-0 — MBR 가입 2·개인정보 입력 Map

## Screen Scope

- screenId: `NOVA-MBR-PG-002-0`
- source: `implementation`
- pattern: `form`
- route: `/NOVA-MBR-PG-002-0`
- policyRefs: []
- ognIds: []
- governanceRefs: []
- notApplicableReason: Existing current reference screen. Policy refs are not bound yet; this map records the current implementation contract until Phase 2 mapping is completed.

## Requirement Matrix

| requirement | sourceRef | screen role | user copy | mapped section | OGN | status |
| --- | --- | --- | --- | --- | --- | --- |
| `NOVA-MBR-INFO-INTRO` | implementation | intro | `개인정보 입력` | `intro` | `ogn-mbr-section-header-page` | mapped |
| `NOVA-MBR-INFO-FIELDS` | implementation | form fields | 회원 정보 입력 필드 | `memberInfo` | `ogn-mbr-text-field-member-info` | mapped |
| `NOVA-MBR-INFO-BRANCH` | implementation | hidden branch notice | hidden | `entryBranch` | `ogn-mbr-section-message-entry-branch` | mapped |

## Governance Review

| ref | selectionReason | affectedRequirement | impact | notApplicableReason |
| --- | --- | --- | --- | --- |
| governanceRefs | none selected | all | none | Existing implementation backfill; governance refs must be selected in the full Phase 2 pass. |
