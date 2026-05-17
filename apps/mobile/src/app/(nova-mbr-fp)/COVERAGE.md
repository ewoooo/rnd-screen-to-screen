# (nova-mbr-fp) — Policy Coverage Matrix

> Phase 2 Coverage 산출물. SB `SB-MBR-UC01_02-0513`(화면 11 / OGN 15) 기준.
> policy-core(`packages/policy-core/policies/MBR`) 정의 정책 항목은 24개(AUTH 12, INFO-002 5, SESS-001 3, TERM 3, ACCT/PROF 1)이며, SB가 참조하는 STAT·JOIN·ROUTE·LOGIN·DORM·SESS-002·TERM-003·INFO-001·INFO-003 도메인/그룹은 부재.
> 사용자 결정(2026-05-17): **GREEN 3 + YELLOW 3 진행**, RED 5 blocked. 추가 지시: 기존 legacy 화면/organism reuse 금지, 모든 OGN 신규 추론.

## 진행(구현 대상)

| 화면 | 판정 | 근거 정책(present) | SB-only(absent) |
|---|---|---|---|
| NOVA-MBR-FP-003-0 본인인증(가입) | 🟢 GREEN | POL-MBR-AUTH-001-01/002-01/002-05/002-09/003-01/003-03/004-01/004-02/005-01/005-03/005-07 | E4 외부 인증기관 오류(정책 없음→일반 시스템오류 copy) |
| NOVA-MBR-FP-008-0 본인인증(휴면) | 🟢 GREEN | 동일 AUTH 11종 | AUTH sourceText "회원 가입" 문맥을 휴면 해제에 적용(flow copy로만) |
| NOVA-MBR-FP-005-0 가입완료 | 🟢 GREEN(무정책 완료) | 없음(완료 결과 화면, governance/DESIGN_PATTERNS Completion 소유) | 결과 요약 데이터 소스 미제공(조건부 미렌더) |
| NOVA-MBR-FP-001-0 약관동의 | 🟡 YELLOW | POL-MBR-TERM-001-06, POL-MBR-TERM-002-01, POL-MBR-TERM-002-05 | TERM-001-01/02/07/10, TERM-002-03/06, TERM-003-01 |
| NOVA-MBR-FP-002-0 개인정보입력 | 🟡 YELLOW | POL-MBR-INFO-002-03/04/05/06/08 | INFO-001-01/02, INFO-002-01/11, INFO-003-01/07/08/09(entry-check 전체) |
| NOVA-MBR-FP-009-0 약관재동의 | 🟡 YELLOW | POL-MBR-TERM-001-06 | TERM-001-01/02/07/10, TERM-003-01, 재동의 intro |

YELLOW의 SB-only 항목은 `Screen.map.md`에 policy-backed과 분리 기록, `Screen.config.ts generation.policyRefs`에 승격 금지, 구조(structural-only)로만 표현하며 정책 copy를 발명하지 않는다.

## 차단(blocked — 화면 폴더 미생성)

| 화면 | 판정 | missingPolicyIds(도메인 부재) | blockedReason | neededDecision |
|---|---|---|---|---|
| NOVA-MBR-FP-004-0 회원검증 | ⛔ RED | POL-MBR-STAT-001-*, POL-MBR-JOIN-001-*, POL-MBR-ROUTE-001-* | STAT/JOIN/ROUTE 정책 도메인 자체가 policy-core에 부재 | 정책 backfill 또는 SB-only 승인 |
| NOVA-MBR-FP-006-0 로그인 | ⛔ RED | POL-MBR-STAT-001-*, POL-MBR-LOGIN-001-* | STAT/LOGIN 도메인 부재 | 정책 backfill 또는 SB-only 승인 |
| NOVA-MBR-FP-007-0 휴면여부확인 | ⛔ RED | POL-MBR-STAT-001-*, POL-MBR-DORM-001-* | STAT/DORM 도메인 부재 | 정책 backfill 또는 SB-only 승인 |
| NOVA-MBR-FP-010-0 휴면해제처리 | ⛔ RED | POL-MBR-DORM-002-*, POL-MBR-DORM-003-*, POL-MBR-SESS-002-* | DORM/SESS-002 도메인 부재 | 정책 backfill 또는 SB-only 승인 |
| NOVA-MBR-FP-011-0 휴면해제완료 | ⛔ RED | POL-MBR-DORM-004-* | DORM 도메인 부재 | 정책 backfill 또는 SB-only 승인 |

RED 5개는 `SCREEN_GENERATION_FLOW.md` Phase 2 규칙에 따라 `Screen.map.md`/`Screen.diagram.md`/route를 생성하지 않는다. 정책 backfill 또는 SB-only 구현 승인 시 별도 절차로 재개한다.
