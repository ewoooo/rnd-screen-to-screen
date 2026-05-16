# CX-EXAMPLE-COMPLETE-PLAN-CHANGE — Complete plan change Map

## Screen Scope

- screenId: `CX-EXAMPLE-COMPLETE-PLAN-CHANGE`
- source: `Figma`
- pattern: `complete`
- route: `/CX-EXAMPLE-COMPLETE-PLAN-CHANGE`
- policyRefs: []
- ognIds: []
- governanceRefs: []
- notApplicableReason: Figma component proof screen. It records layout and component contract only; no policy source has been bound yet.

## Requirement Matrix

| requirement | sourceRef | screen role | user copy | mapped section | OGN | status |
| --- | --- | --- | --- | --- | --- | --- |
| `CX-COMPLETE-PLAN-HERO` | Figma Text Section / 완료_요금제 변경 | completion message | `요금제 변경이 완료되었어요` | `completionHero` | structural-only | mapped |
| `CX-COMPLETE-PLAN-SUMMARY` | Figma Text Section / 완료_요금제 변경 | result summary | plan, effective date, monthly price rows | `completionSummary` | structural-only | mapped |
| `CX-COMPLETE-PLAN-ACTION` | Figma Text Section / 완료_요금제 변경 | bottom action | `확인` | `actions` | structural-only | mapped |

## Copy Inventory

| copyId | text | sourceRef | section |
| --- | --- | --- | --- |
| title | `요금제 변경이 완료되었어요` | Figma Text Section / 완료_요금제 변경 | `completionHero` |
| subtitle | `변경된 요금제는 다음 청구 주기부터 적용돼요.` | Figma Text Section / 완료_요금제 변경 | `completionHero` |
| cta | `확인` | Figma Text Section / 완료_요금제 변경 | `actions` |

## Governance Review

| ref | selectionReason | affectedRequirement | impact | notApplicableReason |
| --- | --- | --- | --- | --- |
| governanceRefs | none selected | all | none | Component proof screen without policy-bound UX governance refs. |
