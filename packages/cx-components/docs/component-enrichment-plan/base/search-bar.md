# SearchBar Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, or cx-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/search-bar.md
- Component README: packages/cx-components/src/components/search-bar/search-bar.readme.md
- Implementation: packages/cx-components/src/components/search-bar

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| Page Mock-up / page-main | 14243:28908 | Main / Search | `메인_검색` frame is present in MOCK SOT. SearchBar is expected as the primary search affordance for this screen family; targeted node-level verification still needed because top-count summary did not surface it. |

## Usage Pattern
- Purpose: primary search entry point.
- Use when: main/list surfaces need user-entered search or LLM-style search affordance.
- Do not use when: the control is category filtering; use `Chips`/`FilterSorting` or BottomSheet filter.
- Allowed context: Main Search, FAQ/guide search, list search surfaces.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Main search | `StatusBar + AppBar -> TitleMain/Image optional -> Chips optional -> SearchBar` | search task entry | README / DESIGN_PATTERN |

## States / Variants
- Observed states: main search frame present; exact SearchBar variant needs targeted verification.
- Missing states: empty/search/LLM variants and result states.
- Variant/property notes: inventory exposes `type: LLM/search`.

## Missing / Reuse Decision
- Decision: README
- Reason: component exists; need search vs filter boundary.
- Follow-up: targeted inspect `메인_검색` frame to confirm exact variant and placement.

## Apply Later
- README changes: document search vs filter use and main-search composition.
- Inventory changes:
- Pattern doc changes:
