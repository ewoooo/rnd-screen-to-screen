# AppBar Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, or cx-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/app-bar.md
- Component README: packages/cx-components/src/components/app-bar/app-bar.readme.md
- Implementation: packages/cx-components/src/components/app-bar

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| Page Mock-up / detail-information | 14243:28433 | Form Entry | `AppBar` appears 4 times paired with `StatusBar` as top chrome for transaction screens. |
| Page Mock-up / page-list-card | 14243:28727 | Card List | `AppBar` appears 6 times above optional `Chips` and `FilterSorting`. |
| Page Mock-up / page-list_text | 14243:28824 | Text List | `AppBar` appears 5 times above summary/list/filter content. |
| Page Mock-up / detail-product | 14243:29109 | Product Detail | `AppBar` appears 4 times in `Statusbar+Header` overlay composition above long product content. |
| Page Mock-up / success | 14243:29455 | Completion | AppBar variants include left/back and right/close states; completion should avoid normal back navigation when result is terminal. |

## Usage Pattern
- Purpose: top app chrome for navigation, title, logo, and right-side actions.
- Use when: screen needs page title/navigation or overlay header.
- Do not use when: a section title is needed; use `TitleSection`.
- Allowed context: AppScreen header chrome, overlay header for Product Detail, terminal Completion header variants.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Standard chrome | `StatusBar + AppBar` | screen title/navigation | README / LAYOUT_PATTERN |
| Product detail overlay header | `Statusbar+Header overlay -> scroll content starts at y=0` | persistent detail navigation | DESIGN_PATTERN |
| Completion header | `StatusBar + AppBar close/home variant` | terminal result navigation | DESIGN_PATTERN |

## States / Variants
- Observed states: title/back, title/close or right-item variants, overlay usage.
- Missing states:
- Variant/property notes: inventory exposes RightItem, Title, LeftItem, Logo on/off.

## Missing / Reuse Decision
- Decision: README / DESIGN_PATTERN
- Reason: component exists; enrichment should document screen chrome vs section-title boundary.
- Follow-up:

## Apply Later
- README changes: add overlay/header contexts and completion navigation caveat.
- Inventory changes:
- Pattern doc changes:
