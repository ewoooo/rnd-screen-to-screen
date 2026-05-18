# TitleMain Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, SPACING_PATTERNS.md, or cx-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/title-main.md
- Component README: packages/cx-components/src/components/title-main/title-main.readme.md
- Implementation: packages/cx-components/src/components/title-main

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| Page Mock-up / page-main | 14243:28908 | Main | Search and shopping main use title blocks; `Local_TitleMain -> TitleText + Indicator` repeats 9 times in shopping carousel sections. |
| Page Mock-up / Page Mock-up root | 14707:28674 | Completion/reference | A standalone `TitleMain` instance sits near success/reference area. |
| Page Mock-up / success | 14243:29455 | Completion | `TitleMain / Type=Complete` appears 3 times as the primary completion message inside `PageStackContents`. |

## Usage Pattern
- Purpose: prominent title block for search/complete/main section hero contexts.
- Use when: screen or section needs a large guided title, optional image/indicator, or completion message.
- Do not use when: ordinary section title is enough; use `TitleSection`.
- Allowed context: Main search, Completion title, large main content title blocks.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Main search title | `PageStackContents -> TitleMain + image/indicator optional` | search prompt/empty recommendation | README / DESIGN_PATTERN |
| Completion title | `Completion -> TitleMain` | final transaction result | DESIGN_PATTERN |
| Complete content block | `PageStackContents -> ContentsTitle: TitleMain(Type=Complete)` | successful transaction state | README |

## States / Variants
- Observed states: local main section title with indicator; completion uses `Type=Complete`.
- Missing states:
- Variant/property notes: inventory exposes Type Complete/Search and show-title-sub-text/image/indicator flags.

## Missing / Reuse Decision
- Decision: README / DESIGN_PATTERN
- Reason: component exists; local `Local_TitleMain` may be organism/section composition rather than new component.
- Follow-up:

## Apply Later
- README changes: document when to use TitleMain vs TitleSection.
- Inventory changes:
- Pattern doc changes:
