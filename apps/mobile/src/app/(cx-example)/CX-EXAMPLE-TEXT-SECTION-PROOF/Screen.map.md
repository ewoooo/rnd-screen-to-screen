# CX-EXAMPLE-TEXT-SECTION-PROOF — Text Section proof Map

## Screen Scope

- screenId: `CX-EXAMPLE-TEXT-SECTION-PROOF`
- source: `SB`
- pattern: `form`
- route: `/CX-EXAMPLE-TEXT-SECTION-PROOF`
- policyRefs: `POL-MBR-INFO-002-08`, `POL-MBR-AUTH-002-01`
- ognIds: []
- governanceRefs: []
- notApplicableReason: Component proof screen uses policy IDs only as content anchors. No governance refs were selected for this example.

## Requirement Matrix

| requirement | sourceRef | screen role | user copy | mapped section | OGN | status |
| --- | --- | --- | --- | --- | --- | --- |
| `POL-MBR-INFO-002-08` | policy-core | phone information | `기기변경 휴대폰 번호` | `phone` | structural-only | mapped |
| `POL-MBR-AUTH-002-01` | policy-core | auth completion state | `본인인증 완료` | `authComplete` | structural-only | mapped |
| `CX-TEXT-ADDRESS` | Text Section proof | address fields | `가입자 주소` | `address` | structural-only | mapped |
| `CX-TEXT-HOME-AREA` | Text Section proof | home area fields | `주 생활지역` | `homeArea` | structural-only | mapped |
| `CX-TEXT-EMAIL` | Text Section proof | email field | `이메일` | `email` | structural-only | mapped |

## Governance Review

| ref | selectionReason | affectedRequirement | impact | notApplicableReason |
| --- | --- | --- | --- | --- |
| governanceRefs | none selected | all | none | Component proof screen; governance application is intentionally not expanded beyond the component layout contract. |
