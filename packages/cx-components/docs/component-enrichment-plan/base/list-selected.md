# ListSelected Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, SPACING_PATTERNS.md, or pxds-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/list-selected.md
- Component README: packages/cx-components/src/components/list-selected/list-selected.readme.md
- Implementation: packages/cx-components/src/components/list-selected

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| Page Mock-up / detail-information | 14243:28433 | Form Entry / selection sections | `ListSelected` appears 17 times with `RadioButton`, `ButtonXsmallSolid`, and `ListSelectedRightItem`, mostly for payment/delivery/option selections. |

## Usage Pattern
- Purpose: selectable row for single or multiple choices.
- Use when: policy provides choices, defaults, disabled options, or selection-dependent CTA enablement.
- Do not use when: information is read-only; use `ListText` instead.
- Allowed context: Form Entry selection sections, BottomSheet con slot, Popup contents for short simple choices.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Form selection section | `PageStackContents -> SectionItem -> ListSelected` | delivery/payment/options | README |
| BottomSheet selection | `Bottomsheet -> con: ListSelected x N -> ActionButton optional` | option/filter/period selection | DESIGN_PATTERN after BottomSheet verification |
| Popup simple selection | `Popup -> Contents -> ListSelected x <= 4` | short blocking choice | DESIGN_PATTERN after Popup verification |

## States / Variants
- Observed states: radio type, right item shown, sub text/right action variants implied by nested `ListSelectedRightItem`.
- Missing states: disabled reason and error/validation behavior still need targeted SOT examples.
- Variant/property notes: inventory exposes `type: Radio/Checkbox`, `show-list-selected-right-item`, and `show-sub-text`.

## Missing / Reuse Decision
- Decision: README
- Reason: existing component covers selectable rows; enrichment should document selection-vs-read-only boundary and overlay thresholds.
- Follow-up: verify BottomSheet/Popup frames for item count thresholds and action slot behavior.

## Apply Later
- README changes: add allowed contexts, `ListText` contrast, and popup/bottomsheet threshold guidance.
- Inventory changes:
- Pattern doc changes: add repeated bottomsheet/popup selection compositions if confirmed.
