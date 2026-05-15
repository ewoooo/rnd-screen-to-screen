# PopupActionButton Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, SPACING_PATTERNS.md, or pxds-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/popup-action-button.md
- Component README: packages/cx-components/src/components/popup-action-button/popup-action-button.readme.md
- Implementation: packages/cx-components/src/components/popup-action-button

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| BottomSheet page / popup | 14672:15524 | Popup action | `PopupActionButton / Options=2Buttons` appears 2 times and `Options=1Button` appears 1 time; contains Large Primary/Secondary buttons. |

## Usage Pattern
- Purpose: fixed action footer for Popup decisions.
- Use when: Popup needs one confirm action or two cancel/confirm actions.
- Do not use when: rendering page or bottomsheet actions; use `ActionButton` or `Button` in the proper slot.
- Allowed context: Popup action slot only.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Popup 1-button | `Popup -> PopupActionButton Options=1Button` | alert/acknowledge | README |
| Popup 2-button | `Popup -> PopupActionButton Options=2Buttons` | cancel/confirm decision | README |

## States / Variants
- Observed states: 1Button, 2Buttons, Large Primary/Secondary children.
- Missing states:
- Variant/property notes: destructive/danger semantics are not explicit in inventory.

## Missing / Reuse Decision
- Decision: README
- Reason: component exists; enrichment should document order and popup-only usage.
- Follow-up:

## Apply Later
- README changes: add 2-button order rule and prohibit general Button direct placement in Popup.
- Inventory changes:
- Pattern doc changes:
