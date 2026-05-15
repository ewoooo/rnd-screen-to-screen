# BadgeIcon Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, SPACING_PATTERNS.md, or pxds-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/badge-icon.md
- Component README: packages/cx-components/src/components/badge-icon/badge-icon.readme.md
- Implementation: packages/cx-components/src/components/badge-icon

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| Page Mock-up / page-list-card | 14243:28727 | Card List | `BadgeIcon` appears 100 times inside product list cards, paired with `Badge` and product specs/benefits. |

## Usage Pattern
- Purpose: compact icon+badge/spec label in product cards.
- Use when: product/list items need a short visual spec/benefit indicator.
- Do not use when: a standalone status label is enough; use `Badge`.
- Allowed context: product list/card modules and related product summaries.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Product benefit/spec row | `ListProductHorizontal -> BadgeIcon x N` | product feature/benefit metadata | README |

## States / Variants
- Observed states: high-frequency card metadata.
- Missing states:
- Variant/property notes: inventory exposes Subtext on/off.

## Missing / Reuse Decision
- Decision: README
- Reason: component exists; usage is strongly product-card scoped.
- Follow-up:

## Apply Later
- README changes: document product/list metadata context and Badge contrast.
- Inventory changes:
- Pattern doc changes:
