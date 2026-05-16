# ActionButton Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, SPACING_PATTERNS.md, or cx-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/action-button.md
- Component README: packages/cx-components/src/components/action-button/action-button.readme.md
- Implementation: packages/cx-components/src/components/action-button

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| Page Mock-up / detail-information | 14243:28433 | Form Entry | Bottom fixed action appears as `Component 2`/action footer in 4 transaction frames; nested `Tooltip` appears 4 times. |
| Page Mock-up / detail-product | 14243:29109 | Product Detail | `ActionButton` appears in subscription/gifticon/device detail frames as fixed bottom CTA, paired with overlay header and long content. |
| Page Mock-up / success | 14243:29455 | Completion | `ActionButton / Type=Ai, Button=2` appears 3 times across completion screens; completion shell pairs `StatusBar + AppBar + PageStackContents + ActionButton`. |
| BottomSheet page / bottomsheet | 14672:15438 | BottomSheet | `Bottomsheet / ActionButton=on` appears 5 times as sheet action area. |

## Usage Pattern
- Purpose: primary bottom action area for page or overlay task completion.
- Use when: transaction/detail/form/bottomsheet requires a persistent primary CTA.
- Do not use when: page uses `BottomNavigation`, or when action is only a card-internal secondary action.
- Allowed context: AppScreen bottom/action slot, Product Detail, Form Entry, Completion, Bottomsheet action slot.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Page action | `AppScreen bottom -> ActionButton` | submit/apply/pay/confirm | README / DESIGN_PATTERN |
| Bottomsheet action | `Bottomsheet -> ActionButton` | confirm selected option/filter | README |
| Tooltip action | `ActionButton + Tooltip` | guided or AI/action hint | README review |
| Completion action | `Completion shell -> ActionButton(Type=Ai, Button=2)` | final confirmation/home/secondary navigation | DESIGN_PATTERN |

## States / Variants
- Observed states: standard bottom action, bottomsheet action, completion AI/2-button action, tooltip-present variants.
- Missing states: disabled/loading/danger conditions need policy frame examples.
- Variant/property notes: inventory exposes Type Default/Ai/Gift, Button 1/2, show-text, show-tooltip.

## Missing / Reuse Decision
- Decision: README / DESIGN_PATTERN
- Reason: component exists; usage boundary with BottomNavigation and card CTA is the key enrichment.
- Follow-up:

## Apply Later
- README changes: document bottom action contexts, bottomsheet action usage, and no coexistence with BottomNavigation.
- Inventory changes:
- Pattern doc changes: reinforce action-zone dichotomy.
