# ListText Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, SPACING_PATTERNS.md, or cx-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/list-text.md
- Component README: packages/cx-components/src/components/list-text/list-text.readme.md
- Implementation: packages/cx-components/src/components/list-text

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| Page Mock-up / detail-information | 14243:28433 | Form Entry / confirmation sections | `ListText` appears 41 times, mostly inside `PageStackContents -> SectionItem` for confirmed user/payment/order information. |
| Page Mock-up / page-list_text | 14243:28824 | Text List | Read-only list/info screens use repeated row content with `Divider(329x1)`; `Local_Info` is frequent and should be checked as a domain/list organism vs existing row composition. |

## Usage Pattern
- Purpose: read-only key-value, status, history, or summary information.
- Use when: information is already determined by policy or transaction state and is not directly selectable in that slot.
- Do not use when: the row is an actionable choice; use `ListSelected` for selectable options.
- Allowed context: Text List, Form Entry confirmation sections, Completion summaries, Product Detail info sections, Popup/Bottomsheet confirmation content.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Read-only section | `PageStackContents -> SectionItem -> ListText` | confirmed information, payment/order summary, before/after values | README |
| Text list row group | `Local_ListInfo / SectionItem -> Local_Info + Divider(329x1)` | notices, usage history, point/discount history | DESIGN_PATTERN / ORGANISM review |

## States / Variants
- Observed states: default rows, summary/history rows, rows separated by `Divider(329x1)`.
- Missing states: emphasized total/final amount should be checked in payment/success frames.
- Variant/property notes: inventory has `Table: off/on` and `right-item`; MOCK shows heavy read-only usage, not choice usage.

## Missing / Reuse Decision
- Decision: README
- Reason: existing `ListText` covers read-only policy information; observed gaps are usage rules and composition guidance.
- Follow-up: verify success/payment frames for total/emphasized row behavior.

## Apply Later
- README changes: document `ListText` vs `ListSelected` boundary and common read-only section composition.
- Inventory changes:
- Pattern doc changes: consider adding `PageStackContents + SectionItem + ListText` as a recurring read-only section pattern.
