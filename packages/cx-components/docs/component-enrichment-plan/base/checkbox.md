# CheckBox Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, SPACING_PATTERNS.md, or pxds-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/checkbox.md
- Component README: packages/cx-components/src/components/checkbox/checkbox.readme.md
- Implementation: packages/cx-components/src/components/checkbox

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| Page Mock-up / detail-information | 14243:28433 | Form Entry / agreement | `CheckBox` appears 18 times in agreement/check sections; paired with repeated `Divider` and `Callout` in the same section family. |

## Usage Pattern
- Purpose: collect agreement, confirmation, or opt-in decisions.
- Use when: policy requires required/optional consent, notice acknowledgement, or grouped agreement.
- Do not use when: choosing product/payment/delivery options; use `ListSelected`.
- Allowed context: Form Entry agreement sections, BottomSheet agreement content if SOT confirms, short popup confirmation only when content is minimal.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Agreement group | `전체 동의 -> Divider -> CheckBox individual items` | required/optional policy consent | DESIGN_PATTERN |
| Checkbox with notice | `CheckBox + Callout` | consent plus important condition/notice | README |

## States / Variants
- Observed states: repeated checkbox rows; required/optional distinction should be verified from text labels.
- Missing states: checked/unchecked/disabled relationship and whole-group indeterminate behavior need targeted SOT.
- Variant/property notes: inventory name is `CheckBox`; repo file/staging slug is `checkbox`.

## Missing / Reuse Decision
- Decision: README / DESIGN_PATTERN
- Reason: existing checkbox covers agreement rows; repeated agreement composition belongs in pattern guidance.
- Follow-up: verify exact whole-agreement frame and policy detail/accordion connection.

## Apply Later
- README changes: document agreement-only use and option-selection boundary.
- Inventory changes: consider normalizing `CheckBox` naming vs file/component naming if needed.
- Pattern doc changes: add agreement composition after SOT verification.
