# NOVA-MBR-PG-001-0 — MBR 가입 1·약관 동의

## Screen Contract

- screenId: `NOVA-MBR-PG-001-0`
- route: `/NOVA-MBR-PG-001-0`
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
│ 약관 동의                                    │
│ 회원 가입을 위한 필수·선택 약관에 동의해 주세요 │
│ [terms]                                      │
│ 약관 체크 목록                               │
│ [guardian]                                   │
│ 법정대리인 요청 입력 hidden                  │
├─Bottom───────────────────────────────────────┤
│ [actions]                                    │
│ 다음 CTA disabled                            │
└──────────────────────────────────────────────┘
```

## Section Contracts

| section | slot | component vocabulary | notes |
| --- | --- | --- | --- |
| `intro` | `Content` | `SectionHeaderPage` | page title and subtitle |
| `terms` | `Content` | `CheckboxTerms` | terms agreement list |
| `guardian` | `Content` | `TextFieldGuardianRequest` | currently hidden |
| `actions` | `Bottom` | `ActionAreaTerms` | disabled bottom CTA |

## Policy / OGN Matrix

| section | OGN | policy |
| --- | --- | --- |
| `intro` | `ogn-mbr-section-header-page` | pending map |
| `terms` | `ogn-mbr-checkbox-terms` | pending map |
| `guardian` | `ogn-mbr-text-field-guardian-request` | pending map |
| `actions` | `ogn-mbr-action-area-terms` | pending map |

## Distortion Gates

- Use `AppScreen.Bottom` for CTA ownership.
- Do not add route-level margin or fixed bottom chrome.
- Keep policy mapping in `Screen.map.md` when the generation contract is completed.
