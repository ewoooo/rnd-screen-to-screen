# TitleBottomSheet Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, SPACING_PATTERNS.md, or pxds-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/title-bottom-sheet.md
- Component README: packages/cx-components/src/components/title-bottom-sheet/title-bottom-sheet.readme.md
- Implementation: packages/cx-components/src/components/title-bottom-sheet

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| BottomSheet page / bottomsheet | 14672:15438 | BottomSheet title | `TitleBottomSheet` appears 6 times, once per bottomsheet frame, forming the title area after `Handle`. |

## Usage Pattern
- Purpose: title/subtitle/close area for bottomsheet shells.
- Use when: bottomsheet needs a clear task title, supporting text, or close affordance.
- Do not use when: title belongs to a page section or popup; use `TitleSection` or Popup title instead.
- Allowed context: `Bottomsheet` title slot only.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Bottomsheet title area | `Bottomsheet -> Handle -> TitleBottomSheet -> con` | modal task framing | README |

## States / Variants
- Observed states: title area present in every observed bottomsheet.
- Missing states: close button/sub text variants need targeted per-frame read.
- Variant/property notes: inventory exposes show-title-text, show-title-button, show-sub-text, show-sub-text-2, show-title.

## Missing / Reuse Decision
- Decision: README
- Reason: component exists and is tightly scoped to bottomsheet title slot.
- Follow-up: document that it should not be used as general section title.

## Apply Later
- README changes: add bottomsheet-only allowed context and variant meaning.
- Inventory changes:
- Pattern doc changes:
