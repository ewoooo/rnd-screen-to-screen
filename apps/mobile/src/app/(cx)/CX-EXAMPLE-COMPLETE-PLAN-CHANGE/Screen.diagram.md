# CX-EXAMPLE-COMPLETE-PLAN-CHANGE — 완료_요금제 변경

## Screen Contract

- screenId: `CX-EXAMPLE-COMPLETE-PLAN-CHANGE`
- route: `/CX-EXAMPLE-COMPLETE-PLAN-CHANGE`
- group: `cx`
- domain: `mbr`
- source: `Figma`
- pattern: `complete`
- frame: `SKT GenUI Test 0512 / Text Section / 완료_요금제 변경` (`393×852`)
- required design docs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`

## Screen Wire

```txt
┌─AppScreen──────────────────────────────────────────────┐
├─Header─────────────────────────────────────────────────┤
│ 9:41                                             ▮▮▮  │
│ 요금제 변경                                          │
├─Content────────────────────────────────────────────────┤
│ [completionHero]                                      │
│ 요금제 변경이 완료되었어요                           │
│ 변경된 요금제는 다음 청구 주기부터 적용돼요.         │
│                                                       │
│ [completionSummary]                                   │
│ ┌───────────────────────────────────────────────────┐ │
│ │ 변경한 요금제                       5GX 프라임    │ │
│ │ 적용일                              2026.05.16    │ │
│ │ 월정액                              89,000원      │ │
│ └───────────────────────────────────────────────────┘ │
├─Bottom─────────────────────────────────────────────────┤
│ [actions]                                             │
│ ┌───────────────────────────────────────────────────┐ │
│ │ 확인                                              │ │
│ └───────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────┘
```

## Section Contracts

| section | slot | layoutStrategy | component vocabulary |
| --- | --- | --- | --- |
| `completionHero` | `Content` title | complete pattern, centered title hierarchy, no route margin overrides | `PageStackContents`, `TitleMain(type="complete")` |
| `completionSummary` | `Content` content | card summary with table rows, wraps values if needed | `SectionItem(type="card")`, `ListText(table)` |
| `actions` | `Bottom` | `Bottom(preset="primary-cta")`, single primary confirmation action | `SinglePrimaryAction`, `ActionButton(type="default")` |

## Policy / OGN Matrix

| requirement | policy | OGN | section | governance |
| --- | --- | --- | --- | --- |
| `CX-COMPLETE-PLAN-HERO` | - | structural-only | `completionHero` | notApplicableReason: component proof screen |
| `CX-COMPLETE-PLAN-SUMMARY` | - | structural-only | `completionSummary` | notApplicableReason: component proof screen |
| `CX-COMPLETE-PLAN-ACTION` | - | structural-only | `actions` | notApplicableReason: component proof screen |

## Distortion Gates

- Use `AppScreen.SystemHeader`, `AppScreen.Header`, `AppScreen.Content`, and `AppScreen.Bottom`.
- Keep completion message and summary inside `PageStackContents`; do not introduce free-positioned wrappers.
- Keep CTA in `Bottom(preset="primary-cta")`, not as the last scroll content section.
- Do not use deprecated `@pxds/pxds-components` or deprecated `@pxds/pxds-icons`.
