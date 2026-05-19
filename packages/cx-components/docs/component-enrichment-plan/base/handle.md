# Handle Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, or cx-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/handle.md
- Component README: packages/cx-components/src/components/handle/handle.readme.md
- Implementation: packages/cx-components/src/components/handle

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| BottomSheet page / bottomsheet | 14672:15438 | BottomSheet shell | `Handle / state=Default` appears 6 times, once per bottomsheet frame. |

## Usage Pattern
- Purpose: visual drag/affordance area at the top of a bottomsheet.
- Use when: rendering a bottomsheet shell that needs the standard handle area.
- Do not use when: building a popup or page-level card.
- Allowed context: `Bottomsheet` shell top slot.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Bottomsheet shell | `Bottomsheet -> Handle -> TitleBottomSheet` | modal affordance | README |

## States / Variants
- Observed states: Default.
- Missing states:
- Variant/property notes: inventory exposes `show-handle`.

## Missing / Reuse Decision
- Decision: README
- Reason: existing component covers observed affordance.
- Follow-up:

## Apply Later
- README changes: note bottomsheet-only usage.
- Inventory changes:
- Pattern doc changes:
