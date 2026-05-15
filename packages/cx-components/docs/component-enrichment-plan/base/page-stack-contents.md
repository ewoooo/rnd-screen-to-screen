# PageStackContents Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, SPACING_PATTERNS.md, or pxds-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/page-stack-contents.md
- Component README:
- Implementation:

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| Page Mock-up / detail-information | 14243:28433 | Form Entry | `PageStackContents` appears 26 times, structuring input, confirmation, agreement, payment, and cart sections. |
| Page Mock-up / page-list_text | 14243:28824 | Text List | `PageStackContents` appears in some text-list variants, while other list pages use `PageStackList` or local list organisms. |
| Page Mock-up / detail-product | 14243:29109 | Product Detail | `PageStackContents` appears 13 times as the recurring detail section wrapper under overlay header + long content body. |
| Page Mock-up / success | 14243:29455 | Completion | `PageStackContents` appears 10 times; completion shell uses `PageStackContents -> TitleMain(Type=Complete) + ContentsSlot`, with payment completion adding repeated detail sections. |

## Usage Pattern
- Purpose: section wrapper with title/content slots for policy meaning units.
- Use when: screen content needs named section boundaries and slot-based content injection.
- Do not use when: only row-level list grouping is needed; consider `PageStackList` or list organism.
- Allowed context: Form Entry, Product Detail, Completion, selected Text List variants.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Form section | `PageStackContents -> SectionItem -> TextField/ListText/ListSelected/CheckBox/Callout` | input, confirmation, selection, agreement | LAYOUT_PATTERN |
| Read-only section | `PageStackContents -> SectionItem -> ListText` | confirmed policy values | LAYOUT_PATTERN |
| Product detail section | `Statusbar+Header overlay -> PageStackContents -> SectionItem` | product info, terms, notices, specs | DESIGN_PATTERN |
| Completion content block | `PageStackContents -> ContentsTitle: TitleMain(Type=Complete) -> ContentsSlot` | transaction result | DESIGN_PATTERN |
| Long completion detail stack | `PageStackContents + TitleSection/Default + Divider(Type=Section)` | payment/order detail sections | DESIGN_PATTERN |

## States / Variants
- Observed states: title shown with `TitleSection/Default`; completion title uses `TitleMain(Type=Complete)`; content slot uses `SectionItem_이친구를복붙하세요`.
- Missing states: title-hidden cases should be verified in detail/success frames.
- Variant/property notes: inventory targets `pxds-layout`, but staging note lives under cx-components docs for inventory continuity.

## Missing / Reuse Decision
- Decision: LAYOUT_PATTERN
- Reason: observed behavior is section/slot structure, not a new visual component.
- Follow-up: apply final guidance to pxds-layout README rather than cx component README; include completion title/content variant.

## Apply Later
- README changes: pxds-layout `PageStackContents` README should document allowed section contents and route-level spacing avoidance.
- Inventory changes:
- Pattern doc changes: keep form/detail section repetition aligned with `DESIGN_PATTERNS.md`.
