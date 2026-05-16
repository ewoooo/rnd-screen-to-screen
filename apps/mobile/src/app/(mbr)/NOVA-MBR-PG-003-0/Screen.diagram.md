# NOVA-MBR-PG-003-0 — MBR 가입 3·본인인증

## Screen Contract

- screenId: `NOVA-MBR-PG-003-0`
- route: `/NOVA-MBR-PG-003-0`
- group: `mbr`
- domain: `mbr`
- pattern: `form`
- implementation source: `Screen.tsx`

## Screen Wire

```txt
┌─AppScreen────────────────────────────────────┐
├─Header───────────────────────────────────────┤
│ 회원 가입                                    │
├─Content──────────────────────────────────────┤
│ [intro]                                      │
│ 본인 인증                                    │
│ 본인 명의 인증 수단으로 가입자를 확인해 주세요 │
│ [authMethods]                                │
│ 인증 수단 선택 목록                          │
├─Bottom───────────────────────────────────────┤
│ [actions]                                    │
│ 인증 완료 CTA disabled                       │
└──────────────────────────────────────────────┘
```

## Section Contracts

| section | slot | component vocabulary | notes |
| --- | --- | --- | --- |
| `intro` | `Content` | `SectionHeaderPage` | page title and subtitle |
| `authMethods` | `Content` | `ListCellAuthMethod` | authentication method list |
| `actions` | `Bottom` | `MbrPrimaryCTABar` | disabled bottom CTA |

## Policy / OGN Matrix

| section | OGN | policy |
| --- | --- | --- |
| `intro` | `ogn-mbr-section-header-page` | pending map |
| `authMethods` | `ogn-mbr-list-cell-auth-method` | pending map |
| `actions` | `MbrPrimaryCTABar` | pending map |

## Distortion Gates

- Use `AppScreen.Bottom` for CTA ownership.
- Do not add route-level margin or fixed bottom chrome.
- Keep policy mapping in `Screen.map.md` when the generation contract is completed.
