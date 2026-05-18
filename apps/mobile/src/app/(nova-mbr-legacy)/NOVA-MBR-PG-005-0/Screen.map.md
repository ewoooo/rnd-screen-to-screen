# NOVA-MBR-PG-005-0 — MBR 가입 5·가입 완료 Map

## Screen Scope

- screenId: `NOVA-MBR-PG-005-0`
- source: `implementation`
- pattern: `complete`
- route: `/NOVA-MBR-PG-005-0`
- policyRefs: [`POL-MBR-ACCT-001-09`, `POL-MBR-SESS-001-03`, `POL-MBR-SESS-001-07`, `POL-MBR-PROF-001-08`]
- ognIds: [`ogn-mbr-section-header-page`, `ogn-mbr-section-message-join-complete-view`]
- governanceRefs: [`UXPT_BTN`, `UXPT_NAV`, `VOT_RUL`, `VOT_DEF`]
- implementation source: `Screen.tsx`
- scope note: This map binds the current visible implementation contract only. It does not introduce future UI or behavior beyond the existing completion title, message organism, and bottom primary CTA.

## Requirement Matrix

| requirement | sourceRef | screen role | user copy | mapped section | OGN | status |
| --- | --- | --- | --- | --- | --- | --- |
| `NOVA-MBR-COMPLETE-INTRO` | `POL-MBR-ACCT-001-09` | completion result announcement | `가입이 완료되었습니다` | `intro` | `ogn-mbr-section-header-page` | mapped |
| `NOVA-MBR-COMPLETE-REDIRECT` | `POL-MBR-SESS-001-07` | post-completion route cue | `잠시 후 홈으로 이동합니다` | `intro` | `ogn-mbr-section-header-page` | mapped |
| `NOVA-MBR-COMPLETE-MESSAGE` | `POL-MBR-SESS-001-03`, `POL-MBR-PROF-001-08` | completion state detail | 가입 완료 안내 | `completeMessage` | `ogn-mbr-section-message-join-complete-view` | mapped |
| `NOVA-MBR-COMPLETE-ACTION` | `POL-MBR-SESS-001-07` | explicit home navigation action | `홈으로 이동` | `actions` | structural-only: `MbrPrimaryCTABar` has no config id | mapped |

## Policy Mapping

| policyRef | policy meaning | screen application |
| --- | --- | --- |
| `POL-MBR-ACCT-001-09` | 가입 완료 시 계정 상태 코드는 `NORMAL`로 설정한다. | Completion title confirms the account creation result without exposing internal status code. |
| `POL-MBR-SESS-001-03` | 가입 완료 후 자동 로그인 처리한다. | Completion message may explain the successful post-signup state; current visible contract keeps it inside `SectionMessageJoinCompleteView`. |
| `POL-MBR-SESS-001-07` | 가입 완료 화면을 거친 뒤 홈으로 이동한다. | Subtitle and bottom CTA both preserve the required home transition path. |
| `POL-MBR-PROF-001-08` | 가입 직후 초기 권한 상태는 일반 회원이다. | Completion message owns any visible initial member-state explanation; no extra UI is added in this doc pass. |

## Governance Review

| ref | selectionReason | affectedRequirement | copy/state/CTA impact |
| --- | --- | --- | --- |
| `UXPT_BTN` | Completion screen has one primary follow-up action. | `NOVA-MBR-COMPLETE-ACTION` | Keeps `홈으로 이동` as a single primary CTA in `AppScreen.Bottom`. |
| `UXPT_NAV` | Post-completion navigation must be predictable and tied to the previous signup task. | `NOVA-MBR-COMPLETE-REDIRECT`, `NOVA-MBR-COMPLETE-ACTION` | Keeps home as the only stated destination after completion. |
| `VOT_RUL` | Completion copy must use a consistent, user-facing Korean sentence style. | all visible copy | Keeps the title/subtitle direct and avoids internal policy terminology. |
| `VOT_DEF` | Voice should express the completed service state clearly and calmly. | `NOVA-MBR-COMPLETE-INTRO`, `NOVA-MBR-COMPLETE-MESSAGE` | Frames the result as successful signup rather than exposing backend state changes. |

## Reviewed But Not Selected

- none
