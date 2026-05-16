# NOVA-MBR-PG-001-0 — MBR 가입 1·약관 동의 Map

## Screen Scope

- screenId: `NOVA-MBR-PG-001-0`
- source: `implementation`
- pattern: `form`
- route: `/NOVA-MBR-PG-001-0`
- policyRefs: []
- ognIds: []
- governanceRefs: []
- notApplicableReason: Existing current reference screen. Policy refs are not bound yet; this map records the current implementation contract until Phase 2 mapping is completed.

## Requirement Matrix

| requirement | sourceRef | screen role | user copy | mapped section | OGN | status |
| --- | --- | --- | --- | --- | --- | --- |
| `NOVA-MBR-TERMS-INTRO` | implementation | intro | `약관 동의` | `intro` | `ogn-mbr-section-header-page` | mapped |
| `NOVA-MBR-TERMS-LIST` | implementation | terms list | 약관 체크 목록 | `terms` | `ogn-mbr-checkbox-terms` | mapped |
| `NOVA-MBR-TERMS-ACTION` | implementation | bottom action | disabled CTA | `actions` | `ogn-mbr-action-area-terms` | mapped |

## Governance Review

| ref | selectionReason | affectedRequirement | impact | notApplicableReason |
| --- | --- | --- | --- | --- |
| governanceRefs | none selected | all | none | Existing implementation backfill; governance refs must be selected in the full Phase 2 pass. |
