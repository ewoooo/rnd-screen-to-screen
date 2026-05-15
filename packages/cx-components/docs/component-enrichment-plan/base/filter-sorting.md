# FilterSorting Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, SPACING_PATTERNS.md, or pxds-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/filter-sorting.md
- Component README: packages/cx-components/src/components/filter-sorting/filter-sorting.readme.md
- Implementation: packages/cx-components/src/components/filter-sorting

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| Page Mock-up / page-list-card | 14243:28727 | Card List | `FilterSorting` appears 6 times after optional `Chips`, paired with `ButtonListOrder`, filter text, and `Divider`. |

## Usage Pattern
- Purpose: expose result count, sorting, and filter entry for list pages.
- Use when: list content supports sort order or filter refinement.
- Do not use when: there is no list refinement action or result count.
- Allowed context: Card List and potentially Text List/search result pages.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Filtered product list | `Chips optional -> FilterSorting -> ProductListGroup/PageStackList` | category + sort/filter controls | DESIGN_PATTERN |
| Filter action handoff | `FilterSorting -> BottomSheet selection` | advanced sort/filter conditions | DESIGN_PATTERN |

## States / Variants
- Observed states: divider shown, order button, filter affordance.
- Missing states: no-filter/no-sort variants and disabled filter states.
- Variant/property notes: inventory exposes `data-figma-property-divider`.

## Missing / Reuse Decision
- Decision: README / DESIGN_PATTERN
- Reason: component exists; usage contract is list ordering and bottomsheet handoff.
- Follow-up: verify whether Text List filter/sort uses `FilterSorting` or only `Chips`.

## Apply Later
- README changes: document sorting/filter role and bottomsheet handoff.
- Inventory changes:
- Pattern doc changes: align Card List structure with observed count/order.
