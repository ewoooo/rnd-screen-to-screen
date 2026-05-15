# Popup Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, SPACING_PATTERNS.md, or pxds-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/popup.md
- Component README: packages/cx-components/src/components/popup/popup.readme.md
- Implementation: packages/cx-components/src/components/popup

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| BottomSheet page / popup | 14672:15524 | Popup | Three `팝업` frames, all 393x852. Repeated shell: dim overlay + `Popup` + title/subtext + optional contents slot + `PopupActionButton`. |

## Usage Pattern
- Purpose: blocking modal for short confirmation, alert, or simple selection.
- Use when: user must explicitly confirm/cancel a compact decision.
- Do not use when: content needs scrolling, tabs, or more than a short list; use Bottomsheet.
- Allowed context: overlay above current screen, with `PopupActionButton` action slot.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Popup confirm/select | `dim -> Popup -> Title/SubText -> Contents optional -> PopupActionButton` | blocking decision | DESIGN_PATTERN |
| Popup selection | `Popup Contents -> ListSelected x small N` | compact choice | README / DESIGN_PATTERN |
| Popup info check | `Popup Contents -> TitleSection + ListText` | before/after or summary confirmation | README |

## States / Variants
- Observed states: contents on/off, subtext shown, 1-button and 2-button action variants via nested `PopupActionButton`.
- Missing states: danger/destructive visual treatment needs targeted example.
- Variant/property notes: inventory exposes contents slot, show-contents, show-sub-text.

## Missing / Reuse Decision
- Decision: README / DESIGN_PATTERN
- Reason: component exists; need explicit content limits and bottomsheet handoff.
- Follow-up: capture exact list count/content length thresholds from pattern docs and observed frames.

## Apply Later
- README changes: document blocking-only use, content slot limits, and required `PopupActionButton`.
- Inventory changes:
- Pattern doc changes: reinforce popup vs bottomsheet switch conditions.
