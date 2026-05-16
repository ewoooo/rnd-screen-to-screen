# NOVA-MBR-PG-002-0 — MBR 가입 2·개인정보 입력

## Screen Contract

- screenId: `NOVA-MBR-PG-002-0`
- route: `/NOVA-MBR-PG-002-0`
- group: `mbr`
- domain: `mbr`
- pattern: `form`
- implementation source: `Screen.tsx`

## Screen Wire

```txt
┌─AppScreen────────────────────────────────────┐
├─Header───────────────────────────────────────┤
│ 회원 가입 2/5 progress                       │
├─Content──────────────────────────────────────┤
│ [intro]                                      │
│ 개인정보 입력                                │
│ [memberInfo]                                 │
│ 회원 정보 입력 필드                          │
│ [entryBranch]                                │
│ 가입 분기 안내 hidden                        │
└──────────────────────────────────────────────┘
```

## Section Contracts

| section | slot | component vocabulary | notes |
| --- | --- | --- | --- |
| `intro` | `Content` | `SectionHeaderPage` | page title |
| `memberInfo` | `Content` | `TextFieldMemberInfo` | member information field group |
| `entryBranch` | `Content` | `SectionMessageEntryBranch` | currently hidden |

## Policy / OGN Matrix

| section | OGN | policy |
| --- | --- | --- |
| `intro` | `ogn-mbr-section-header-page` | pending map |
| `memberInfo` | `ogn-mbr-text-field-member-info` | pending map |
| `entryBranch` | `ogn-mbr-section-message-entry-branch` | pending map |

## Distortion Gates

- Keep `AppScreen.Content` as the only scroll owner.
- Header progress remains in the header slot, not in content.
- Keep policy mapping in `Screen.map.md` when the generation contract is completed.
