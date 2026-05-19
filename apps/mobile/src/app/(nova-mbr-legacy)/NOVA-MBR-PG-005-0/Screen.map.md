# NOVA-MBR-PG-005-0 — MBR 가입 5·가입 완료 Map

## Screen Scope

- screenId: `NOVA-MBR-PG-005-0`
- source: `policy-core + DESIGN_PATTERNS.md Completion`
- pattern: `complete`
- route: `/NOVA-MBR-PG-005-0`
- policyRefs: [`POL-MBR-ACCT-001-09`, `POL-MBR-SESS-001-03`, `POL-MBR-SESS-001-07`, `POL-MBR-PROF-001-08`]
- ognIds: [`ogn-mbr-join-complete-result`]
- governanceRefs: [`UXPT_BTN`, `UXPT_NAV`, `VOT_RUL`, `VOT_DEF`]
- rewrite note: 첨부 스크린샷은 잘못 생성된 결과이므로 visual reference로 사용하지 않는다. 이 화면은 `DESIGN_PATTERNS.md`의 단순 완료형 Completion 패턴을 기준으로 `TitleMain(type="complete") + 요약 카드 + Bottom CTA` 구조로 재작성한다.

## Phase 1 Extraction Summary

- domain: `mbr`
- userTask: 회원 가입이 정상 완료되었음을 확인하고 홈으로 이동한다.
- state: 가입 완료 / 자동 로그인 예정 / 일반 회원 초기 권한
- primaryCTA: `홈으로 이동`
- secondaryCTA: none
- slots: `SystemHeader`, `Header`, `Content`, `Bottom`
- parts:
  - `Header`: `회원 가입` title with close affordance, not back navigation
  - `completeResult`: completion title, home transition subtitle, signup summary card
  - `actions`: fixed bottom primary CTA
- hierarchy: `Screen -> AppScreen rails -> completeResult OGN -> TitleMain + RQRContentsDetail summary -> Bottom CTA`

## Requirement Matrix

| requirement | sourceRef | screen role | user copy | mapped section | OGN | status |
| --- | --- | --- | --- | --- | --- | --- |
| `NOVA-MBR-COMPLETE-INTRO` | `POL-MBR-ACCT-001-09`, `DESIGN_PATTERNS.md` Completion | completion result announcement | `가입이 완료되었어요` | `completeResult` | `ogn-mbr-join-complete-result` | mapped |
| `NOVA-MBR-COMPLETE-REDIRECT` | `POL-MBR-SESS-001-07` | post-completion route cue | `잠시 후 홈으로 이동해요.`, `홈으로 이동` | `completeResult`, `actions` | `ogn-mbr-join-complete-result`; structural bottom chrome | mapped |
| `NOVA-MBR-COMPLETE-ACCOUNT-STATE` | `POL-MBR-ACCT-001-09`, `POL-MBR-PROF-001-08` | completed account readiness summary | `회원 상태` / `일반 회원` | `completeResult` summary card | `ogn-mbr-join-complete-result` | mapped |
| `NOVA-MBR-COMPLETE-LOGIN` | `POL-MBR-SESS-001-03` | automatic login summary | `로그인` / `자동 로그인` | `completeResult` summary card | `ogn-mbr-join-complete-result` | mapped |
| `NOVA-MBR-COMPLETE-SESSION` | `POL-MBR-SESS-001-03` | post-join session guide | `세션 유효시간` / `24시간` | `completeResult` summary card | `ogn-mbr-join-complete-result` | mapped |
| `NOVA-MBR-COMPLETE-DESTINATION` | `POL-MBR-SESS-001-07` | next route guide | `이동 경로` / `홈` | `completeResult` summary card | `ogn-mbr-join-complete-result` | mapped |
| `NOVA-MBR-COMPLETE-ACTION` | `POL-MBR-SESS-001-07` | explicit home navigation action | `홈으로 이동` | `actions` | structural-only: `MbrPrimaryCTABar` has no config id | mapped |

## Policy Mapping

| policyRef | policy meaning | screen application |
| --- | --- | --- |
| `POL-MBR-ACCT-001-09` | 가입 완료 시 계정 상태 코드는 `NORMAL`로 설정한다. | Completion title confirms signup completion; summary card exposes the user-facing state as `일반 회원`, not the internal code. |
| `POL-MBR-SESS-001-03` | 가입 완료 후 자동 로그인 처리한다. | Summary card states `로그인 / 자동 로그인`. |
| `POL-MBR-SESS-001-07` | 가입 완료 화면을 거친 뒤 홈으로 이동한다. | Subtitle, summary row, and bottom CTA preserve the home transition path. |
| `POL-MBR-PROF-001-08` | 가입 직후 초기 권한 상태는 일반 회원이다. | Summary card states the initial member state as `일반 회원`. |

## Governance Review

| ref | selectionReason | affectedRequirement | copy/state/CTA impact |
| --- | --- | --- | --- |
| `UXPT_BTN` | Completion screen has one clear follow-up action. | `NOVA-MBR-COMPLETE-ACTION` | Keeps `홈으로 이동` as a single primary CTA in `AppScreen.Bottom`. |
| `UXPT_NAV` | Completion navigation must prevent accidental return into the completed signup flow. | `NOVA-MBR-COMPLETE-REDIRECT`, `NOVA-MBR-COMPLETE-ACTION` | Uses a close affordance in AppBar and keeps home as the only stated destination after completion. |
| `VOT_RUL` | Completion copy should be user-facing and consistent with the pattern examples. | all visible copy | Uses friendly `해요` completion copy instead of formal `습니다` result language. |
| `VOT_DEF` | Voice should express the completed service state calmly and clearly. | `NOVA-MBR-COMPLETE-INTRO`, summary rows | Summarizes state in short label-value rows rather than a custom success notice. |

## Reviewed But Not Selected

- User-provided screenshot: rejected as a reference because it was the distorted result, not the target.
- Custom green success card: rejected because `DESIGN_FOUNDATION.md` does not define success/positive green semantic tokens for this pattern; use the existing summary card vocabulary instead.
- Recovery Flow System: no recovery CTA or failure state is visible in this default complete state.
