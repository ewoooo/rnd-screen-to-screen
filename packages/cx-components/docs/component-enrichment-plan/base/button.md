# Button Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, SPACING_PATTERNS.md, or cx-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/button.md
- Component README: packages/cx-components/src/components/button/button.readme.md
- Implementation: packages/cx-components/src/components/button

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| Page Mock-up / detail-information | 14243:28433 | Form Entry | `Button` appears 13 times, including helper actions inside/near `TextField` and payment/list local content. |
| BottomSheet page / popup | 14672:15524 | Popup | Large Primary/Secondary buttons appear only inside `PopupActionButton`. |
| Page Mock-up / detail-product | 14243:29109 | Product Detail | `Button` appears 7 times, mostly as internal card/detail actions rather than page bottom CTA. |

## Usage Pattern
- Purpose: low-level button primitive for action slots and component internals.
- Use when: a parent component/pattern owns the action slot.
- Do not use when: placing a primary page CTA directly in scroll content; use `ActionButton`/`SinglePrimaryAction`.
- Allowed context: TextField helper/right slot, card/internal CTA slot, PopupActionButton internals, ActionButton internals.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Popup action internals | `PopupActionButton -> Button Primary/Secondary` | confirm/cancel | README |
| Field helper | `TextField/right or adjacent helper -> Button` | verify/search/address helper | README |
| Card internal CTA | `Card/organism internal slot -> Button` | secondary card-scoped action | README |

## States / Variants
- Observed states: Large Primary/Secondary in PopupActionButton; helper/card buttons in form/detail.
- Missing states:
- Variant/property notes: inventory exposes Small/Medium/Large/XLarge and Primary/Secondary/Disabled.

## Missing / Reuse Decision
- Decision: README
- Reason: component exists; enrichment should emphasize slot-scoped usage rather than direct page placement.
- Follow-up:

## Apply Later
- README changes: add parent-slot usage rule and primary CTA boundary.
- Inventory changes:
- Pattern doc changes:
