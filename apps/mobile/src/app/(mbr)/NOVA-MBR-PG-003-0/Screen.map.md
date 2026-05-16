# NOVA-MBR-PG-003-0 — MBR 가입 3·본인인증 Map

## Screen Scope

- screenId: `NOVA-MBR-PG-003-0`
- source: `implementation`
- pattern: `form`
- route: `/NOVA-MBR-PG-003-0`
- policyRefs: []
- ognIds: []
- governanceRefs: []
- notApplicableReason: Existing current reference screen. Policy refs are not bound yet; this map records the current implementation contract until Phase 2 mapping is completed.

## Requirement Matrix

| requirement | sourceRef | screen role | user copy | mapped section | OGN | status |
| --- | --- | --- | --- | --- | --- | --- |
| `NOVA-MBR-AUTH-INTRO` | implementation | intro | `본인 인증` | `intro` | `ogn-mbr-section-header-page` | mapped |
| `NOVA-MBR-AUTH-METHODS` | implementation | auth method selection | 인증 수단 선택 목록 | `authMethods` | `ogn-mbr-list-cell-auth-method` | mapped |
| `NOVA-MBR-AUTH-ACTION` | implementation | bottom action | `인증 완료` | `actions` | structural-only | mapped |

## Governance Review

| ref | selectionReason | affectedRequirement | impact | notApplicableReason |
| --- | --- | --- | --- | --- |
| governanceRefs | none selected | all | none | Existing implementation backfill; governance refs must be selected in the full Phase 2 pass. |
