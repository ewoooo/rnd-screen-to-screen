# Bottomsheet Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, SPACING_PATTERNS.md, or pxds-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/bottomsheet.md
- Component README: packages/cx-components/src/components/bottomsheet/bottomsheet.readme.md
- Implementation: packages/cx-components/src/components/bottomsheet

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| BottomSheet page / bottomsheet | 14672:15438 | BottomSheet | Six `바텀시트` frames, all 393x852. Repeated shell: dim overlay + `Bottomsheet` + `Handle` + title area + contents slot + optional `ActionButton`. |

## Usage Pattern
- Purpose: modal bottom anchored shell for contextual selection or confirmation without leaving the current screen.
- Use when: options/filters/periods/confirmation content need more room than Popup or need scroll/tab variants.
- Do not use when: the task is a full multi-step input flow; use Form Entry screen.
- Allowed context: overlay above current screen, especially list filters, product options, agreement/confirmation helpers.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Bottomsheet shell | `dim -> Bottomsheet -> Handle + TitleBottomSheet + con + ActionButton optional` | contextual modal task | DESIGN_PATTERN / LAYOUT_PATTERN |
| Selection sheet | `Bottomsheet con -> ListSelected Radio/Checkbox x N` | option/filter selection | README / DESIGN_PATTERN |
| Action footer | `Bottomsheet -> ActionButton=on` | explicit selection confirmation | README |

## States / Variants
- Observed states: `Bottomsheet / ActionButton=on` appears 5 times; `Handle / state=Default` and `TitleBottomSheet` appear 6 times.
- Missing states: action-button-off/no-action variants and scroll area thresholds need per-frame examples.
- Variant/property notes: observed Radio/Checkbox option variants inside content; inventory exposes `ActionButton: on/off` and `data-figma-property-con`.

## Missing / Reuse Decision
- Decision: DESIGN_PATTERN / LAYOUT_PATTERN
- Reason: shell exists; key gap is content/action slot contract and when to choose Bottomsheet over Popup/Form.
- Follow-up: final rule should live in overlay pattern docs and component README.

## Apply Later
- README changes: document shell slots, action optionality, and con slot selection composition.
- Inventory changes:
- Pattern doc changes: reinforce bottomsheet vs popup thresholds and no nested bottomsheet rule.
