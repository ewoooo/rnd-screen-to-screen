# NOVA-MBR-PG-005-0 — MBR 가입 5·가입 완료

## Screen Contract

- screenId: `NOVA-MBR-PG-005-0`
- route: `/NOVA-MBR-PG-005-0`
- group: `mbr`
- domain: `mbr`
- pattern: `complete`
- implementation source: `Screen.tsx`

## Screen Wire

```txt
┌─AppScreen────────────────────────────────────┐
├─Header───────────────────────────────────────┤
│ 회원 가입                                    │
├─Content──────────────────────────────────────┤
│ [intro]                                      │
│ 가입이 완료되었습니다                        │
│ 잠시 후 홈으로 이동합니다                    │
│ [completeMessage]                            │
│ 가입 완료 안내                               │
├─Bottom───────────────────────────────────────┤
│ [actions]                                    │
│ 홈으로 이동 CTA                              │
└──────────────────────────────────────────────┘
```

## Section Contracts

| section | slot | component vocabulary | notes |
| --- | --- | --- | --- |
| `intro` | `Content` | `SectionHeaderPage` | completion title and subtitle |
| `completeMessage` | `Content` | `SectionMessageJoinCompleteView` | completion message |
| `actions` | `Bottom` | `MbrPrimaryCTABar` | primary bottom CTA |

## Policy / OGN Matrix

| section | OGN | policy |
| --- | --- | --- |
| `intro` | `ogn-mbr-section-header-page` | pending map |
| `completeMessage` | `ogn-mbr-section-message-join-complete-view` | pending map |
| `actions` | `MbrPrimaryCTABar` | pending map |

## Distortion Gates

- Use `AppScreen.Bottom` for CTA ownership.
- Completion content stays in `Content`; primary action stays in `Bottom`.
- Keep policy mapping in `Screen.map.md` when the generation contract is completed.
