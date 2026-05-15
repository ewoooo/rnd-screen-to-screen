# Divider Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, SPACING_PATTERNS.md, or pxds-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/divider.md
- Component README: packages/cx-components/src/components/divider/divider.readme.md
- Implementation: packages/cx-components/src/components/divider

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| Page Mock-up / detail-information | 14243:28433 | Form Entry | `Divider` appears 28 times; section dividers separate `PageStackContents`, while item dividers appear in nested list content. |
| Page Mock-up / page-list_text | 14243:28824 | Text List | `Divider` appears 50 times, mainly `329x1` item separators in text/FAQ lists. |
| Page Mock-up / detail-product | 14243:29109 | Product Detail | `Divider` appears 42 times across section boundaries and accordion/list separators. |
| Page Mock-up / success | 14243:29455 | Completion | `Divider / Type=Section` appears 4 times in long payment completion detail stack. |

## Usage Pattern
- Purpose: visually separate page sections or repeated list/accordion rows.
- Use when: section boundaries or item separators need an explicit system divider.
- Do not use when: spacing alone or card internal padding should separate content.
- Allowed context: full-bleed section boundaries, inner row separators, accordion row separators.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Section divider | `PageStackContents -> Divider(Type=Section)` | separates policy sections | DESIGN_PATTERN |
| Item divider | `ListText/Accordion row -> Divider(329x1)` | repeated row separation | README / DESIGN_PATTERN |

## States / Variants
- Observed states: section divider and inner row divider.
- Missing states:
- Variant/property notes: inventory exposes `Type: Contents/Section`; observed usage should map section vs item divider clearly.

## Missing / Reuse Decision
- Decision: README / DESIGN_PATTERN
- Reason: component exists; enrichment should prevent section/item divider confusion.
- Follow-up:

## Apply Later
- README changes: document section vs content/item divider usage.
- Inventory changes:
- Pattern doc changes: reinforce 393x4 vs 329x1 divider roles.
