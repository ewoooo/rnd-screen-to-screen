# NOVA-MBR-PG-005-0 — MBR 가입 5·가입 완료 Map

## Screen Scope

- screenId: `NOVA-MBR-PG-005-0`
- source: `implementation`
- pattern: `complete`
- route: `/NOVA-MBR-PG-005-0`
- policyRefs: []
- ognIds: []
- governanceRefs: []
- notApplicableReason: Existing current reference screen. Policy refs are not bound yet; this map records the current implementation contract until Phase 2 mapping is completed.

## Requirement Matrix

| requirement | sourceRef | screen role | user copy | mapped section | OGN | status |
| --- | --- | --- | --- | --- | --- | --- |
| `NOVA-MBR-COMPLETE-INTRO` | implementation | completion intro | `가입이 완료되었습니다` | `intro` | `ogn-mbr-section-header-page` | mapped |
| `NOVA-MBR-COMPLETE-MESSAGE` | implementation | completion message | 가입 완료 안내 | `completeMessage` | `ogn-mbr-section-message-join-complete-view` | mapped |
| `NOVA-MBR-COMPLETE-ACTION` | implementation | bottom action | `홈으로 이동` | `actions` | structural-only | mapped |

## Governance Review

| ref | selectionReason | affectedRequirement | impact | notApplicableReason |
| --- | --- | --- | --- | --- |
| governanceRefs | none selected | all | none | Existing implementation backfill; governance refs must be selected in the full Phase 2 pass. |
