# AccordionList Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, SPACING_PATTERNS.md, or cx-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/accordion-list.md
- Component README: packages/cx-components/src/components/accordion-list/accordion-list.readme.md
- Implementation: packages/cx-components/src/components/accordion-list

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| Page Mock-up / page-list_text | 14243:28824 | Text List / FAQ | `Accordion` appears 9 times with many `Divider(329x1)` instances; used in `리스트_이용안내` style FAQ/guide screen. |

## Usage Pattern
- Purpose: repeated expandable rows for FAQ, guide, terms, or detailed policy content.
- Use when: content has a title/question and hidden body that can be expanded without blocking the primary flow.
- Do not use when: short mandatory policy information must remain visible; use `Callout` or `ListText`.
- Allowed context: Text List FAQ/guide screens, Form Entry terms details, Product Detail detail/notice sections.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| FAQ/guide list | `AccordionList -> Accordion + Divider(329x1)` | FAQ, usage guide, detail info | README / DESIGN_PATTERN |
| Agreement details | `CheckBox agreement -> AccordionList/detail link` | terms details connected to consent | DESIGN_PATTERN review |

## States / Variants
- Observed states: accordion rows with item dividers; first-open behavior should be checked per frame.
- Missing states: exact open/collapsed default and long body scroll behavior.
- Variant/property notes: inventory has `Accordion State: Close/Open`; `AccordionList` itself has no variants listed.

## Missing / Reuse Decision
- Decision: README / DESIGN_PATTERN
- Reason: existing components cover observed list; need guidance that mandatory info should not be hidden only in collapsed content.
- Follow-up: inspect detail/form terms sections for agreement detail composition.

## Apply Later
- README changes: document FAQ/terms/detail use and divider alternation.
- Inventory changes:
- Pattern doc changes: reinforce `Accordion + Divider` alternation and mandatory-info caveat.
