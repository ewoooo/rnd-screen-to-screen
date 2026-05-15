# SectionItem_이친구를복붙하세요 Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, SPACING_PATTERNS.md, or pxds-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/section-item.md
- Component README: packages/cx-components/src/components/section-item/section-item.readme.md
- Implementation: packages/cx-components/src/components/section-item

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| Page Mock-up / detail-information | 14243:28433 | Form Entry | `SectionItem_이친구를복붙하세요` appears 27 times under `PageStackContents`, wrapping field/list/choice/notice content. |
| Page Mock-up / page-list-card | 14243:28727 | Card List | Appears 7 times wrapping product list modules inside `PageStackList`. |
| Page Mock-up / page-list_text | 14243:28824 | Text List | Appears 12 times wrapping `Local_ListInfo`/row groups. |

## Usage Pattern
- Purpose: Figma slot item wrapper for default/card content inside page-stack patterns.
- Use when: content is injected into a `PageStackContents` or `PageStackList` slot.
- Do not use when: a route needs arbitrary spacing wrapper; use layout primitives/patterns.
- Allowed context: PageStack section content slots in form/detail/list screens.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Default slot item | `PageStackContents -> SectionItem -> TextField/ListText/ListSelected/Callout` | form/info/selection content | LAYOUT_PATTERN |
| Card/list slot item | `PageStackList -> SectionItem -> ListProductHorizontal/ListProductRow` | product list group | DESIGN_PATTERN |

## States / Variants
- Observed states: default and card/list content usage.
- Missing states: exact `Card 0` vs `Default 20` mapping should be verified per frame.
- Variant/property notes: inventory exposes `Type: Card 0/Default 20` and content slot.

## Missing / Reuse Decision
- Decision: LAYOUT_PATTERN / README
- Reason: existing slot item is sufficient; need clearer usage contract and naming cleanup around Figma copy label.
- Follow-up: decide whether README should use repo-safe name while preserving Figma alias.

## Apply Later
- README changes: document default/card slot usage and discourage route-level wrapper use.
- Inventory changes: consider alias note for `SectionItem_이친구를복붙하세요`.
- Pattern doc changes: keep card/list and form section examples aligned.
