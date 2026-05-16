# CX-EXAMPLE-PERSONAL-INFO-INPUT — Personal info input Map

## Screen Scope

- screenId: `CX-EXAMPLE-PERSONAL-INFO-INPUT`
- source: `Figma`
- pattern: `form`
- route: `/CX-EXAMPLE-PERSONAL-INFO-INPUT`
- policyRefs: `POL-MBR-INFO-002-08`, `POL-MBR-AUTH-002-01`
- ognIds: []
- governanceRefs: []
- notApplicableReason: Component proof screen uses policy IDs only as content anchors. No governance refs were selected for this example.

## Requirement Matrix

| requirement | sourceRef | screen role | user copy | mapped section | OGN | status |
| --- | --- | --- | --- | --- | --- | --- |
| `POL-MBR-INFO-002-08` | policy-core | phone information | `기기변경 휴대폰 번호` | `phone` | structural-only | mapped |
| `POL-MBR-AUTH-002-01` | policy-core | auth completion state | `본인인증 완료` | `authComplete` | structural-only | mapped |
| `CX-PERSONAL-ADDRESS` | Figma 상세_정보 입력_인풋 | address fields | `가입자 주소` | `address` | structural-only | mapped |
| `CX-PERSONAL-HOME-AREA` | Figma 상세_정보 입력_인풋 | home area fields | `주 생활지역` | `homeArea` | structural-only | mapped |
| `CX-PERSONAL-EMAIL` | Figma 상세_정보 입력_인풋 | email field | `이메일` | `email` | structural-only | mapped |

## Governance Review

| ref | selectionReason | affectedRequirement | impact | notApplicableReason |
| --- | --- | --- | --- | --- |
| governanceRefs | none selected | all | none | Component proof screen; governance application is intentionally not expanded beyond the component layout contract. |
