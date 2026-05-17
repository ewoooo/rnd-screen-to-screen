# BottomNavigation Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, or cx-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/bottom-navigation.md
- Component README: packages/cx-components/src/components/bottom-navigation/bottom-navigation.readme.md
- Implementation: packages/cx-components/src/components/bottom-navigation

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| Page Mock-up / page-main | 14243:28908 | Main | Main screens use bottom navigation as top-level app navigation rather than page transaction CTA. |

## Usage Pattern
- Purpose: app-level bottom tab navigation for main/browse surfaces.
- Use when: screen is a hub or browsing surface with persistent app tabs.
- Do not use when: transaction/detail/form/completion requires primary action; use `ActionButton`.
- Allowed context: Main and selected browse screens only.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Main chrome | `StatusBar + AppBar + content + BottomNavigation` | app-level navigation | DESIGN_PATTERN |

## States / Variants
- Observed states: main/browse navigation context.
- Missing states:
- Variant/property notes: inventory exposes State My/Search/Shopping.

## Missing / Reuse Decision
- Decision: README / DESIGN_PATTERN
- Reason: component exists; key rule is action-zone exclusion with `ActionButton`.
- Follow-up:

## Apply Later
- README changes: document main/browse-only use and ActionButton exclusion.
- Inventory changes:
- Pattern doc changes:
