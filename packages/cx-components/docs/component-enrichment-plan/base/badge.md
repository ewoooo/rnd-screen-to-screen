# Badge Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, or cx-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/badge.md
- Component README: packages/cx-components/src/components/badge/badge.readme.md
- Implementation: packages/cx-components/src/components/badge

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| Page Mock-up / page-list-card | 14243:28727 | Card List | `Badge` appears 148 times inside product list cards, often paired with `BadgeIcon` and product info. |
| Page Mock-up / page-list_text | 14243:28824 | Text List | `Badge` appears 25 times in local list info rows, likely status/category labels. |
| Page Mock-up / detail-product | 14243:29109 | Product Detail | `Badge` appears 52 times across product info, accordions, cards, and detail labels. |

## Usage Pattern
- Purpose: compact label for status, benefit, condition, or category metadata.
- Use when: short status/category metadata should be scanned alongside product/list/detail content.
- Do not use when: primary action or long policy condition is needed; use Button/Callout/ListText.
- Allowed context: product/list cards, detail sections, title left/right slots, text-list status rows.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Product metadata | `ListProductHorizontal/ListProductVertical -> Badge/BadgeIcon` | benefit/status/condition labels | README |
| Detail label | `Product detail section/card -> Badge` | product condition/benefit marker | README |

## States / Variants
- Observed states: high-frequency product/list labels.
- Missing states:
- Variant/property notes: inventory exposes Type Gray/Blue/Black; exact semantic mapping needs SOT verification.

## Missing / Reuse Decision
- Decision: README
- Reason: component exists; enrichment should map badge types to semantic uses.
- Follow-up:

## Apply Later
- README changes: add product/list/detail label use and avoid long condition copy.
- Inventory changes:
- Pattern doc changes:
