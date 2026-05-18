# NOVA-MBR-PG-003-0 — MBR 가입 3·본인인증 Map

## Screen Scope

- screenId: `NOVA-MBR-PG-003-0`
- source: `implementation`
- pattern: `form`
- route: `/NOVA-MBR-PG-003-0`
- task: 회원 가입 중 가입자 본인 명의 인증 수단을 확인한다.
- visibleState: 인증 수단 영역 노출, bottom primary CTA `인증 완료` disabled.
- policyRefs: `POL-MBR-AUTH-001-01`, `POL-MBR-AUTH-002-01`, `POL-MBR-AUTH-002-05`, `POL-MBR-AUTH-002-09`, `POL-MBR-AUTH-005-01`, `POL-MBR-AUTH-005-03`, `POL-MBR-AUTH-005-07`
- ognIds: `ogn-mbr-section-header-page`, `ogn-mbr-list-cell-auth-method`
- structuralOnly: bottom CTA `MbrPrimaryCTABar` has no config OGN ID in the current contract.

## Source Inputs

| Source | Reference | Used For |
| --- | --- | --- |
| Current implementation | `apps/mobile/src/app/(nova-mbr-legacy)/NOVA-MBR-PG-003-0/Screen.tsx` | visible copy, slot ownership, component vocabulary |
| Route config | `apps/mobile/src/app/(nova-mbr-legacy)/NOVA-MBR-PG-003-0/Screen.config.ts` | registered policy refs and OGN ids |
| Wire reference | `apps/mobile/src/screen-diagrams/skt-genui-test-0512/detail-form/additional-info-check.diagram.md` | AppScreen rails, scroll content, fixed bottom CTA pattern |
| Legacy auth reference | `apps/mobile/src/app/(wds-mbr-legacy)/LEGACY-MBR-PG-001-0-CX/Screen.map.md` | auth policy interpretation and governance precedent |
| Policy MD | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-001.md` | membership signup authentication requirement |
| Policy MD | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-002.md` | allowed authentication methods and order |
| Policy MD | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-005.md` | authentication failure, retry, and restriction policies |
| Governance | `packages/policy-core/governance/UXPT/Structure Control/UXPT_BTN.md` | primary CTA hierarchy and disabled action state |
| Governance | `packages/policy-core/governance/UXPT/State Control/UXPT_ERR.md` | failure and retry guidance for future auth result states |
| Governance | `packages/policy-core/governance/UXPT/Structure Control/UXPT_NAV.md` | app bar/back navigation ownership |
| Governance | `packages/policy-core/governance/VOT/VOT_RUL.md` | Korean UX writing tone and customer-facing copy rules |

## Policy Requirement Matrix

| Policy Tag / ID | Source Ref | Requirement Type | Requirement | User-Facing Copy | Screen Expression | OGN ID | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `POL-MBR-AUTH-001-01` | `POL-MBR-AUTH-001.md` | required-info | 회원 가입 시 본인인증을 적용한다. | `본인 인증`, `본인 명의 인증 수단으로 가입자를 확인해 주세요` | intro title/subtitle + auth method area | `ogn-mbr-section-header-page` | mapped |
| `POL-MBR-AUTH-002-01` | `POL-MBR-AUTH-002.md` | choice | 본인인증 수단은 휴대폰, PASS, 공동인증서 중 하나를 사용한다. | auth method labels owned by `ListCellAuthMethod` | authentication method list | `ogn-mbr-list-cell-auth-method` | mapped |
| `POL-MBR-AUTH-002-05` | `POL-MBR-AUTH-002.md` | choice | 회원 가입 본인인증 화면의 기본 노출 인증수단은 휴대폰, PASS, 공동인증서이다. | default visible method set owned by `ListCellAuthMethod` | authentication method list | `ogn-mbr-list-cell-auth-method` | mapped |
| `POL-MBR-AUTH-002-09` | `POL-MBR-AUTH-002.md` | ordering | 인증수단은 휴대폰, PASS, 공동인증서 순서로 노출한다. | list order owned by `ListCellAuthMethod` | authentication method list order | `ogn-mbr-list-cell-auth-method` | mapped |
| `POL-MBR-AUTH-005-01` | `POL-MBR-AUTH-005.md` | constraint / error | 본인인증 실패는 최대 5회까지 허용한다. | no failure copy visible in initial state | future auth result handling | structural-only | out-of-state |
| `POL-MBR-AUTH-005-03` | `POL-MBR-AUTH-005.md` | constraint / error | 인증 실패 한도 초과 시 10분 동안 인증을 제한한다. | no restriction copy visible in initial state | future auth result handling | structural-only | out-of-state |
| `POL-MBR-AUTH-005-07` | `POL-MBR-AUTH-005.md` | error | 인증 실패 시 재시도 또는 제한 처리 안내 문구를 노출한다. | no retry/error copy visible in initial state | future auth result handling | structural-only | out-of-state |
| `NOVA-MBR-AUTH-ACTION` | current implementation | action | 인증 완료 후 다음 흐름으로 진행한다. | `인증 완료` | disabled bottom primary CTA | structural-only | mapped-current |

## User Copy

| Copy Role | Copy | Policy Basis | OGN ID |
| --- | --- | --- | --- |
| app-bar-title | `회원 가입` | membership signup flow context | structural-only |
| intro-title | `본인 인증` | `POL-MBR-AUTH-001-01` | `ogn-mbr-section-header-page` |
| intro-subtitle | `본인 명의 인증 수단으로 가입자를 확인해 주세요` | `POL-MBR-AUTH-001-01`, `POL-MBR-AUTH-002-01` | `ogn-mbr-section-header-page` |
| auth-method-list | labels owned by `ListCellAuthMethod` | `POL-MBR-AUTH-002-01`, `POL-MBR-AUTH-002-05`, `POL-MBR-AUTH-002-09` | `ogn-mbr-list-cell-auth-method` |
| bottom-primary-cta | `인증 완료` | current implementation action state | structural-only |

## OGN Mapping

| OGN ID | Role | Policy Inputs | Required Screen Content | Notes |
| --- | --- | --- | --- | --- |
| `ogn-mbr-section-header-page` | intro | `POL-MBR-AUTH-001-01`, `POL-MBR-AUTH-002-01` | `SectionHeaderPage` with title `본인 인증` and subtitle `본인 명의 인증 수단으로 가입자를 확인해 주세요` | registered in `Screen.config.ts` |
| `ogn-mbr-list-cell-auth-method` | auth method list | `POL-MBR-AUTH-002-01`, `POL-MBR-AUTH-002-05`, `POL-MBR-AUTH-002-09` | `ListCellAuthMethod` renders the available authentication method choices | registered in `Screen.config.ts`; exact row copy remains organism-owned |
| structural-only | bottom action | current implementation action state; related to completion flow after auth | `MbrPrimaryCTABar` primaryLabel `인증 완료`, disabled | not added to config `ognIds` because no current config OGN ID exists |
| structural-only | auth failure/retry state | `POL-MBR-AUTH-005-01`, `POL-MBR-AUTH-005-03`, `POL-MBR-AUTH-005-07` | no visible initial-state copy | kept in policyRefs for generation traceability; future result/error surface must map these before implementation |

## Governance Review

| Ref | Selection | Affected Requirement | Impact | notApplicableReason |
| --- | --- | --- | --- | --- |
| `UXPT_BTN` | selected | `NOVA-MBR-AUTH-ACTION` | keeps one bottom primary CTA, disabled until the screen can complete authentication |  |
| `UXPT_ERR` | selected | `POL-MBR-AUTH-005-01`, `POL-MBR-AUTH-005-03`, `POL-MBR-AUTH-005-07` | preserves failure/retry/restriction policies as out-of-state requirements instead of inventing hidden UI in the initial screen |  |
| `UXPT_NAV` | selected | app-bar-title / signup flow navigation | app bar owns navigation chrome; route content does not add custom navigation controls |  |
| `VOT_RUL` | selected | all visible copy | uses concise 해요체-style guidance and avoids unsupported customer name personalization before authentication |  |

## Policy Coverage Checklist

- [x] policyRefs are bound in `Screen.config.ts`.
- [x] registered OGN ids are limited to current config-supported organisms.
- [x] bottom CTA is recorded as structural-only and excluded from config `ognIds`.
- [x] initial-state copy is separated from out-of-state failure/retry policies.
- [x] governance refs are documented here but not added to `Screen.config.ts`.
- [ ] exact `ListCellAuthMethod` option labels and row states remain organism-owned until the later screen recreation pass.
