# TextField Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, or cx-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/text-field.md
- Component README: packages/cx-components/src/components/text-field/text-field.readme.md
- Implementation: packages/cx-components/src/components/text-field

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| Page Mock-up / detail-information | 14243:28433 | Form Entry / input | `TextField` appears 18 times inside `PageStackContents -> SectionItem`; observed nested states include `TextFieldDisabled`, `TextFieldTyped`, and `TextFieldDefault`. |

## Usage Pattern
- Purpose: collect or verify user-entered values.
- Use when: policy requires user input, verification, or editable transaction data.
- Do not use when: value is read-only confirmation; use `ListText`.
- Allowed context: Form Entry field groups, usually inside `PageStackContents` content slot and a field/section stack.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Field group | `PageStackContents -> SectionItem -> TextField x N` | user input, verification, address/payment data | README / LAYOUT_PATTERN |
| Field with helper action | `TextField + Button/right slot` | search/verify/address helper action | README |

## States / Variants
- Observed states: default, disabled, typed; help text labels are present in nested text samples.
- Missing states: focused/typing/error examples need targeted check.
- Variant/property notes: inventory exposes state, error, label, help-text, and button properties.

## Missing / Reuse Decision
- Decision: README
- Reason: existing component covers observed input states; enrichment should document placement and validation/help text rules.
- Follow-up: verify whether `FieldStack` is present in implementation even when Figma names only `SectionItem`.

## Apply Later
- README changes: add Form Entry usage, read-only boundary, helper button/right slot, and help/error placement.
- Inventory changes:
- Pattern doc changes: if repeated, clarify `PageStackContents + field group` structure.
