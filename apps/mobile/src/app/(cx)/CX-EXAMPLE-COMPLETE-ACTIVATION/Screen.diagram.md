# CX-EXAMPLE-COMPLETE-ACTIVATION — 완료_개통

## Screen Contract

- screenId: `CX-EXAMPLE-COMPLETE-ACTIVATION`
- route: `/CX-EXAMPLE-COMPLETE-ACTIVATION`
- group: `cx`
- domain: `mbr`
- source: `Figma`
- pattern: `complete`
- frame: `SKT GenUI Test 0512 / Text Section / 완료_개통` (`393×852`)
- required design docs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`

## Screen Wire

```txt
┌─AppScreen──────────────────────────────────────────────┐
├─Header─────────────────────────────────────────────────┤
│ 9:41                                             ▮▮▮  │
│ 개통 완료                                             │
├─Content────────────────────────────────────────────────┤
│ [completionHero]                                      │
│ 개통이 완료되었어요                                  │
│ 지금부터 새로운 휴대폰 사용이 가능해요.              │
│                                                       │
│ [completionSummary]                                   │
│ ┌───────────────────────────────────────────────────┐ │
│ │ 개통 휴대폰                         갤럭시 S25    │ │
│ │ 요금제                              5GX 프라임    │ │
│ │ 개통일                              2026.05.15    │ │
│ └───────────────────────────────────────────────────┘ │
├─Bottom─────────────────────────────────────────────────┤
│ [actions]                                             │
│ 사진이나 연락처, 앱도 새 휴대폰으로 한 번에 옮겨볼까요? │
│ ┌───────────────────────┐ ┌─────────────────────────┐ │
│ │ 홈으로 이동           │ │ 데이터 옮기기           │ │
│ └───────────────────────┘ └─────────────────────────┘ │
└───────────────────────────────────────────────────────┘
```

## Section Contracts

| section | slot | layoutStrategy | component vocabulary |
| --- | --- | --- | --- |
| `completionHero` | `Content` title | complete pattern, centered title hierarchy, no route margin overrides | `PageStackContents`, `TitleMain(type="complete")` |
| `completionSummary` | `Content` content | card summary with table rows, wraps values if needed | `SectionItem(type="card")`, `ListText(table)` |
| `actions` | `Bottom` | `Bottom(preset="guided-action")`, two actions with AI guidance text | `SinglePrimaryAction`, `ActionButton(type="ai")` |

## Policy / OGN Matrix

| requirement | policy | OGN | section | governance |
| --- | --- | --- | --- | --- |
| `CX-COMPLETE-ACTIVATION-HERO` | - | structural-only | `completionHero` | notApplicableReason: component proof screen |
| `CX-COMPLETE-ACTIVATION-SUMMARY` | - | structural-only | `completionSummary` | notApplicableReason: component proof screen |
| `CX-COMPLETE-ACTIVATION-ACTION` | - | structural-only | `actions` | notApplicableReason: component proof screen |

## Distortion Gates

- Use `AppScreen.SystemHeader`, `AppScreen.Header`, `AppScreen.Content`, and `AppScreen.Bottom`.
- Keep completion message and summary inside `PageStackContents`; do not introduce free-positioned wrappers.
- Keep CTA in `Bottom(preset="guided-action")`, not as the last scroll content section.
- Do not use deprecated `@pxds/pxds-components` or deprecated `@pxds/pxds-icons`.
