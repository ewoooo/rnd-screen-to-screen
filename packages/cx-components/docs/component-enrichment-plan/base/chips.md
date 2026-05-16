# Chips Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, SPACING_PATTERNS.md, or pxds-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/chips.md
- Component README: packages/cx-components/src/components/chips/chips.readme.md
- Implementation: packages/cx-components/src/components/chips

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| Page Mock-up / page-list-card | 14243:28727 | Card List | `Chips` appears 4 times and `ChipItem` 36 times above `FilterSorting` for category filtering. |
| Page Mock-up / page-list_text | 14243:28824 | Text List | `Chips` appears 3 times and `ChipItem` 27 times for date/category filtering. |

## Usage Pattern
- Purpose: horizontal category/date/filter chip row.
- Use when: a list or main surface needs quick category/date segmentation.
- Do not use when: the choice requires confirmation, multiple filter conditions, or long option lists; use BottomSheet selection.
- Allowed context: Card List below AppBar, Text List after summary/title, Main search/category areas.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Filtered list | `AppBar -> Chips -> FilterSorting -> ProductListGroup/PageStackList` | category/date filtering | DESIGN_PATTERN |
| Text history filter | `Local_Summary -> Chips -> PageStackList` | period/category filter | DESIGN_PATTERN |

## States / Variants
- Observed states: selected/off chip items; horizontal row.
- Missing states: disabled/unavailable chips not observed yet.
- Variant/property notes: `ChipItem` owns selected state; row gap aligns to `space/4` in the spacing doc.

## Missing / Reuse Decision
- Decision: README / DESIGN_PATTERN
- Reason: component exists; repeated value is ordering with `FilterSorting` and list groups.
- Follow-up: verify main page chip usage from remaining section.

## Apply Later
- README changes: document list/category/date use and bottomsheet handoff for complex filters.
- Inventory changes:
- Pattern doc changes: reinforce list order `Chips -> FilterSorting -> content`.
