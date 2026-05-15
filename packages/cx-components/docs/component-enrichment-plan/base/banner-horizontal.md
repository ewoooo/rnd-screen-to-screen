# BannerHorizontal Enrichment Notes

> Staging memo for Figma MOCK SOT observation. Final decisions should be applied to the component README, DESIGN_PATTERNS.md, SPACING_PATTERNS.md, or pxds-layout docs.

## Current Source
- Inventory: ../../component-inventory.md -> components/base/banner-horizontal.md
- Component README: packages/cx-components/src/components/banner-horizontal/banner-horizontal.readme.md
- Implementation: packages/cx-components/src/components/banner-horizontal

## Observed In Figma MOCK
| Page/Frame | Node | Pattern | Notes |
| --- | --- | --- | --- |
| Page Mock-up / detail-information | 14243:28433 | Form Entry / payment | `BannerHorizontal` appears in payment/cart section as a promotional or related content banner. |

## Usage Pattern
- Purpose: horizontal banner for promotion, related content, or contextual benefit.
- Use when: banner content is secondary to the current policy task and fits within section/card rail.
- Do not use when: content is mandatory policy information; use visible section/list/callout.
- Allowed context: Detail/Form supplemental sections, Main/manage promo areas, Product Detail related banners.

## Composition Pattern
| Composition | Parent/Slot | Policy Meaning | Decision |
| --- | --- | --- | --- |
| Supplemental banner | `PageStackContents/SectionItem -> BannerHorizontal` | promo/related benefit | README |

## States / Variants
- Observed states: indicator optional appears nested in observed sample.
- Missing states:
- Variant/property notes: inventory exposes `data-figma-property-indicator`.

## Missing / Reuse Decision
- Decision: README
- Reason: component exists; enrichment should clarify non-mandatory/promo role.
- Follow-up:

## Apply Later
- README changes: document promo/secondary role and mandatory-info caveat.
- Inventory changes:
- Pattern doc changes:
