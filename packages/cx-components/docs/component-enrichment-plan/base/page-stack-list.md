# PageStackList Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, SPACING_PATTERNS.md, or pxds-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/page-stack-list.md
- Component README: packages/cx-components/src/components/page-stack-list/page-stack-list.readme.md
- Implementation: packages/cx-components/src/components/page-stack-list

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| Page Mock-up / page-list-card | 14243:28727 | Card List | `PageStackList` appears 7 times, grouping `TitleSection/Default` and `SectionItem` product list content. |
| Page Mock-up / page-list_text | 14243:28824 | Text List | `PageStackList` appears 4 times in history/point/discount list variants. |

## Usage Pattern
- Purpose: list-oriented page stack for grouped repeated content.
- Use when: a list page needs a title group plus repeated card/text rows.
- Do not use when: form/detail section content is not list-oriented; use `PageStackContents`.
- Allowed context: Card List product groups, Text List history/info groups.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Product list group | `PageStackList -> TitleSection -> SectionItem -> ListProduct*` | product/category group | DESIGN_PATTERN |
| Text history group | `PageStackList -> SectionItem -> Local_ListInfo/ListText-like rows` | history/notice/point records | DESIGN_PATTERN / ORGANISM review |

## States / Variants
- Observed states: grouped list with title and slot content.
- Missing states:
- Variant/property notes: inventory targets `cx-components / pxds-layout candidate`; ownership should be clarified.

## Missing / Reuse Decision
- Decision: LAYOUT_PATTERN / DESIGN_PATTERN
- Reason: observed behavior is list section structure; ownership may belong in layout/pattern rather than visual component.
- Follow-up:

## Apply Later
- README changes: document contrast with `PageStackContents`.
- Inventory changes:
- Pattern doc changes: clarify Card List/Text List list-group wrapper.
