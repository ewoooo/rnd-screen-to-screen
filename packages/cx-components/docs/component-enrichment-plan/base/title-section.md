# TitleSection Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, SPACING_PATTERNS.md, or pxds-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/title-section.md
- Component README: packages/cx-components/src/components/title-section/title-section.readme.md
- Implementation: packages/cx-components/src/components/title-section

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| Page Mock-up / detail-information | 14243:28433 | Form Entry | `TitleSection/Default` appears 26 times as `PageStackContents` title slot. |
| Page Mock-up / page-list-card | 14243:28727 | Card List | `TitleSection/Default` appears 7 times in list group sections. |
| Page Mock-up / page-list_text | 14243:28824 | Text List | `TitleSection/Default` appears 8 times in list/history sections. |
| Page Mock-up / detail-product | 14243:29109 | Product Detail | `TitleSection/Default` appears 13 times as detail section titles. |
| Page Mock-up / success | 14243:29455 | Completion | Used in long completion/payment detail stack; completion main title uses `TitleMain`, not `TitleSection`. |

## Usage Pattern
- Purpose: section-level title with optional subtitle/left/right items.
- Use when: a content section or list group needs a compact title.
- Do not use when: page-level main/complete/search hero title is needed; use `TitleMain`.
- Allowed context: `PageStackContents` title slot, list group headers, detail/form section headers.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Page section title | `PageStackContents -> ContentsTitle: TitleSection/Default` | section label | README / LAYOUT_PATTERN |
| List group title | `PageStackList/ProductListGroup -> TitleSection` | category/list group | DESIGN_PATTERN |

## States / Variants
- Observed states: Default with left/right items in some list/detail contexts.
- Missing states:
- Variant/property notes: inventory exposes sub-title, left-item, right-item booleans.

## Missing / Reuse Decision
- Decision: README
- Reason: component exists; enrichment should clarify TitleSection vs TitleMain boundary.
- Follow-up:

## Apply Later
- README changes: add allowed slots and title hierarchy guidance.
- Inventory changes:
- Pattern doc changes:
