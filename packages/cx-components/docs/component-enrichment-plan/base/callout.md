# Callout Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, or cx-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/callout.md
- Component README: packages/cx-components/src/components/callout/callout.readme.md
- Implementation: packages/cx-components/src/components/callout

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| Page Mock-up / detail-information | 14243:28433 | Form Entry / notices | `Callout` appears 7 times around input/check/payment sections, used as contextual guidance rather than field-level validation. |

## Usage Pattern
- Purpose: expose contextual notice, limitation, caution, or policy guidance.
- Use when: policy condition affects the user's next action but is not a single field validation message.
- Do not use when: the message is a `TextField` validation error; use field help/error slot.
- Allowed context: Form Entry sections, Product Detail notice sections, Completion follow-up notices, card/organism internal notice slots.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Section notice | `PageStackContents -> SectionItem -> Callout` | caution/notice/condition | README |
| Agreement notice | `CheckBox group + Callout` | consent-related caveat | DESIGN_PATTERN review |

## States / Variants
- Observed states: default with optional title property in inventory.
- Missing states: warning/danger/info tone is not represented in current inventory and should be checked against Figma variants.
- Variant/property notes: inventory only lists `Property 1: Default` and `data-figma-property-title`.

## Missing / Reuse Decision
- Decision: README / INVENTORY_GAP review
- Reason: observed use is covered, but tone/state vocabulary may be under-specified.
- Follow-up: inspect component base variants for Callout tone before proposing RQR/new states.

## Apply Later
- README changes: document difference between section notice and field error.
- Inventory changes: verify whether tone variants exist but are missing from inventory.
- Pattern doc changes:
