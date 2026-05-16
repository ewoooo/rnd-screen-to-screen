# CX-EXAMPLE-COMPLETE-ACTIVATION — Complete activation Map

## Screen Scope

- screenId: `CX-EXAMPLE-COMPLETE-ACTIVATION`
- source: `Figma`
- pattern: `complete`
- route: `/CX-EXAMPLE-COMPLETE-ACTIVATION`
- policyRefs: []
- ognIds: []
- governanceRefs: []
- notApplicableReason: Figma component proof screen. It records layout and component contract only; no policy source has been bound yet.

## Requirement Matrix

| requirement | sourceRef | screen role | user copy | mapped section | OGN | status |
| --- | --- | --- | --- | --- | --- | --- |
| `CX-COMPLETE-ACTIVATION-HERO` | Figma Text Section / 완료_개통 | completion message | `개통이 완료되었어요` | `completionHero` | structural-only | mapped |
| `CX-COMPLETE-ACTIVATION-SUMMARY` | Figma Text Section / 완료_개통 | result summary | device, plan, activation date rows | `completionSummary` | structural-only | mapped |
| `CX-COMPLETE-ACTIVATION-ACTION` | Figma Text Section / 완료_개통 | bottom action | `홈으로 이동`, `데이터 옮기기` | `actions` | structural-only | mapped |

## Copy Inventory

| copyId | text | sourceRef | section |
| --- | --- | --- | --- |
| title | `개통이 완료되었어요` | Figma Text Section / 완료_개통 | `completionHero` |
| subtitle | `지금부터 새로운 휴대폰 사용이 가능해요.` | Figma Text Section / 완료_개통 | `completionHero` |
| action-guide | `사진이나 연락처, 앱도 새 휴대폰으로 한 번에 옮겨볼까요?` | Figma Text Section / 완료_개통 | `actions` |

## Governance Review

| ref | selectionReason | affectedRequirement | impact | notApplicableReason |
| --- | --- | --- | --- | --- |
| governanceRefs | none selected | all | none | Component proof screen without policy-bound UX governance refs. |
