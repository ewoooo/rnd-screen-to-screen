# Screen.map.md - NOVA-MBR-FP-005-0 가입 완료

Step 2 Thin Map SOT. Owns policy meaning, coverage, user copy, state/CTA
meaning, and governance selection only. No layout, spacing, component, or route
implementation decisions. Migrated from
`(nova-mbr-fp-legacy)/NOVA-MBR-FP-005-0` and corrected for the `nova-mbr-fp`
group.

## Policy Coverage Matrix

| screen / OGN | SB referenced policy group or IDs | present in policy-core | missing in policy-core | coverage | map handling |
|---|---|---|---|---|---|
| `NOVA-MBR-FP-005-0` screen | SB `관련 정책 그룹`: `-` (none) | none referenced | none referenced | green | policy-irrelevant completion screen; governance-only |
| `ogn-mbr-join-complete` | SB `관련 정책서`: `-`, `관련 정책 그룹`: `-` | none referenced | none referenced | green | no policy binding; completion result + state meaning is SB/screen-owned, governance-applied |

Coverage verdict: SB `NOVA-MBR-FP-005-0` declares `관련 정책 그룹: -` and the
single organism `ogn-mbr-join-complete` declares `관련 정책서: -`. There is no
policy backing for this screen. It is a **policy-irrelevant completion screen**.
`policyRefs` is intentionally empty. Coverage is `green` because no policy
requirement exists to map; only governance (completion / CTA / writing tone)
applies. Do not invent ACCT/SESS or any other policy bindings for this screen.

## Screen Identity

- screenId: `NOVA-MBR-FP-005-0`
- screenName: 가입 완료
- domain: `MBR`
- group: `nova-mbr-fp`
- pattern: `complete`
- flowContext: 회원 생성 및 후속 처리 완료 결과. 화면 경로: 약관 동의 > 개인정보 입력 > 본인인증 > 회원 검증 > 가입 완료.
- transition: 가입 완료 화면 → 홈 (단일 후속 행동; SB 케이스 분기는 E1 계정 생성 실패, E2 동의 이력 누락, E3 세션 생성 실패).
- configTrace:
  - `Screen.config.ts generation.policyRefs`: `[]` (policy-irrelevant)
  - `Screen.config.ts generation.ognIds`: `ogn-mbr-join-complete`

## Policy-Backed Requirements

None. SB declares no policy group or policy reference for this screen or its
organism. This section is intentionally empty; do not backfill policy meaning.

## SB / Screen-State Requirements

Derived from SB `NOVA-MBR-FP-005-0` 화면 구성, 케이스 분기, and
`ogn-mbr-join-complete` 노출 케이스 / 케이스 분기. These are SB facts and
governance-shaped copy, not policy.

| reqId | source | screen requirement | handling |
|---|---|---|---|
| S1 | SB ogn-mbr-join-complete `[가입 완료 안내]` 노출 케이스 | 가입 완료 결과를 사용자에게 먼저 명확히 알린다. | VOT_DEF 결과 먼저 안내; copy는 SB/screen-owned |
| S2 | SB component `section-message-join-success` (positive) | 가입이 정상적으로 완료되었음을 긍정형 상태 메시지로 확인한다. | success state only; VOT_RUL 긍정 어체 |
| S3 | SB ogn-mbr-join-complete `[상태:error] 세션 생성 실패` / component `section-message-session-error` (cautionary) | 세션 생성 실패 시 가입 완료는 유지하되 다시 로그인하면 이용 가능함을 안내한다. | alternate state; mutually exclusive with success notice; UXPT_ERR + VOT_DEF |
| S4 | SB ogn-mbr-join-complete `[상태:error] 가입 완료 알림 실패: 화면 안내 유지` | 가입 완료 알림이 실패해도 완료 화면 안내는 유지한다. | screen안내 유지; 별도 visible 발명 금지 |
| S5 | SB ogn-mbr-join-complete `[액션:tap 홈으로 이동] navigate 홈` / component `action-area-join-done` (strong) | CTA: 홈으로 이동하는 단일 primary 행동. | 단일 primary; 결과 예측 가능 라벨 (`확인` 단독 금지) |

## Missing Policy / Traceability Notes

- SB provides no policy-core reference for this screen. There are no confirmed completion summary rows (요금제/금액/적용일 등) in SB or policy-core. Do not invent any plan, fee, date, account-status, or session-policy values.
- Legacy `(nova-mbr-fp-legacy)/NOVA-MBR-FP-005-0` performed a "full remap" that pulled in `POL-MBR-ACCT-001-09`, `POL-MBR-SESS-001-03`, `POL-MBR-SESS-001-07`. This map intentionally does not inherit those bindings: SB declares `관련 정책 그룹: -` and the organism declares `관련 정책서: -`, so this screen is policy-irrelevant. `policyRefs` stays empty.

## User Copy Contract

| slot | meaning | source / governance |
|---|---|---|
| hero title | 가입 완료 결과를 먼저 알림. Example wording: `가입이 완료됐어요`. | S1, VOT_DEF, VOT_RUL |
| hero subtitle | 이후 서비스를 바로 이용할 수 있음을 안내. | S1, VOT_DEF |
| success notice | 정상 완료 상태를 짧게 확인. | S2, VOT_RUL positive wording |
| session error notice | 가입은 완료됐고 세션만 실패했으므로 다시 로그인하면 이용 가능함을 안내. | S3, UXPT_ERR, VOT_DEF |
| bottom CTA | 홈으로 이동하는 단일 행동. `확인` 단독 금지. | S5, UXPT_BTN |

No `completionSummary` key-value card is authored by default: SB supplies no
confirmed summary rows. The reserved summary slot renders only if confirmed
rows are later supplied; it must not invent values.

## Governance Refs

| governanceRef | selection reason | affected requirement | copy / state / CTA impact |
|---|---|---|---|
| `UXPT_BTN` | 가입 완료 후 사용자가 할 단일 후속 행동은 홈 이동이다. | S5 | Primary는 한 개. 라벨은 행동과 결과가 드러나야 한다. |
| `UXPT_NAV` | 완료 후 뒤로가기로 가입 흐름에 재진입하지 않도록 종료 이동 기준을 고정한다. | S5 | 홈 이동이 종료 navigation 기준; 완료 화면에 back 추가 금지 |
| `UXPT_ERR` | 세션 생성 실패는 사용자 입력 오류가 아니라 시스템/세션 상태다. | S3 | 사용자 책임으로 보이지 않게 원인과 다음 행동을 함께 안내한다 |
| `VOT_RUL` | 완료/상태/CTA copy의 어체와 긍정/부정 표현을 통일한다. | S1-S5 | 해요체 기본, 결과/상태 수동형 허용, 모호한 버튼 라벨 금지 |
| `VOT_DEF` | 완료 화면은 결과 먼저, 다음 기대값을 함께 제공해야 한다. | S1-S4 | 완료 결과 → 이용 가능성 → 홈 이동 순서로 의미를 둔다 |

Reviewed but not selected:

- `UXPT_LOD`: 본 완료 화면의 default contract에는 로딩 대기 상태가 없다.
- `UXPT_ERR` empty-result / AI variants: 결과 없음 또는 AI 실패 화면이 아니다.

## Linked OGN IDs

- `ogn-mbr-join-complete`: owns completion result, success/session-error state messages, and reserved optional summary meaning. Mapped requirement (S1-S4); no policy binding.
- bottom CTA: AppScreen Bottom chrome owns the physical rail; CTA meaning is home navigation after completion (S5, structural-only).

## Done Criteria Check

- Coverage Matrix records `green` policy-irrelevant verdict with empty `policyRefs` and SB-quoted reason.
- All `Screen.config.ts generation.ognIds` (`ogn-mbr-join-complete`) are traceable to S1-S4.
- `policyRefs` is intentionally empty; no policy meaning invented.
- Legacy ACCT/SESS bindings explicitly not inherited, with reason recorded.
