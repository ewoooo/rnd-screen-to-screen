# Screen.map.md — NOVA-MBR-FP-002-0 개인정보 입력

> Phase 2 (Map). Owns policy meaning + governance selection only. No layout, spacing,
> component reuse/new, route registration. Structure lives in `Screen.diagram.md`.

## Screen Identity

- screenId: `NOVA-MBR-FP-002-0`
- screenName: 개인정보 입력
- domain: `mbr`
- pattern: `form` (가입 플로우 / multi-step: 약관 동의 > 개인정보 입력)
- policyGroups (SB-declared): `PG-MBR-INFO-001`, `PG-MBR-INFO-002`, `PG-MBR-INFO-003`
- transition: `NOVA-MBR-FP-002-0 → NOVA-MBR-FP-003-0` on 회원 정보 입력·검증 완료 (전달: 임시저장ID, 세션ID)
- OGN regions (from SB 화면 구성):
  - region 1 `ogn-mbr-member-input` — static, 항상 노출
  - region 2 `ogn-mbr-entry-check` — dynamic, 노출 개수 min 0 / max 1 (conditional, 서버 제어)

## Policy Coverage Matrix

| screen / OGN | SB policy IDs | present in policy-core | missing | verdict | next action |
|---|---|---|---|---|---|
| `NOVA-MBR-FP-002-0` (screen) | INFO-001, INFO-002, INFO-003 groups | INFO-002-03/04/05/06/08 | INFO-001-*, INFO-002-01/11, INFO-003-* | **yellow** | map INFO-002 facts; SB-only facts isolated, user-approved per task directive |
| `ogn-mbr-member-input` | INFO-001-01, INFO-001-02, INFO-002-01, INFO-002-04, INFO-002-05, INFO-002-11 | INFO-002-04, INFO-002-05 (+ INFO-002-03/06/08 apply to same fields) | INFO-001-01, INFO-001-02, INFO-002-01, INFO-002-11 | **yellow** | map INFO-002-03/04/05/06/08 field validation; record 필수항목/중복검증 as SB-only |
| `ogn-mbr-entry-check` | INFO-003-01, INFO-003-07, INFO-003-08, INFO-003-09 | none | INFO-003-01/07/08/09 | **red (SB-only)** | INFO-003 domain ABSENT — no copy/governance/sourceRef matrix; reserved/out-of-state OGN, blocked-from-config |

Coverage = **YELLOW**. `ogn-mbr-member-input` proceeds on policy-backed INFO-002 fields
plus task-approved SB-only structural facts. `ogn-mbr-entry-check` is fully SB-only
(INFO-003 absent): not surfaced in default visible wire, no policy-backed copy authored.

## Section A — Policy-Backed Requirements (INFO-002, present in policy-core)

sourceRef (all): `NC 회원가입·탈퇴 정책서 Full v1.0 확정본`, section `POL-MBR-INFO-002`
(`packages/policy-core/policies/MBR/INFO/POL-MBR-INFO-002.md` + `*.policy.ts`).
OGN: `ogn-mbr-member-input`.

| policyId | title | sourceText | requiredInfo / constraint | user copy (requirement) | user copy (error) | field |
|---|---|---|---|---|---|---|
| `POL-MBR-INFO-002-03` | 아이디 문자 종류 | 아이디는 영문과 숫자만 허용한다. | 아이디 입력 문자: 영문+숫자만 | `영문, 숫자만 입력` | `아이디는 영문과 숫자만 입력해 주세요` | text-field-user-id |
| `POL-MBR-INFO-002-04` | 아이디 길이 | 아이디는 6자 이상 20자 이하로 입력한다. | 아이디 길이 6~20자 (maxLength 20) | `6~20자` | `아이디는 6~20자로 입력해 주세요` | text-field-user-id |
| `POL-MBR-INFO-002-05` | 비밀번호 길이 | 비밀번호는 10자 이상 20자 이하로 입력한다. | 비밀번호 길이 10~20자 (maxLength 20) | `10~20자` | `비밀번호는 10~20자로 입력해 주세요` | text-field-password |
| `POL-MBR-INFO-002-06` | 비밀번호 문자 조합 | 비밀번호는 영문 대문자, 영문 소문자, 숫자, 특수문자 중 3종 이상을 조합한다. | 비밀번호 문자: 대문자/소문자/숫자/특수문자 중 3종 이상 | (helper로 002-05와 합산) `영문 대/소문자·숫자·특수문자 중 3종 이상, 10~20자` | `영문 대/소문자, 숫자, 특수문자 중 3종 이상 조합해 주세요` | text-field-password |
| `POL-MBR-INFO-002-08` | 휴대폰번호 형식 | 휴대폰번호는 숫자만 11자리로 입력한다. | 휴대폰번호: 숫자만 11자리 (numeric, maxLength 11) | `숫자 11자리` | `휴대폰번호는 숫자 11자리로 입력해 주세요` | text-field-phone |

### Field requirement summary (policy-backed, mapped to OGN `ogn-mbr-member-input`)

- **아이디 (text-field-user-id)**: 영문+숫자만(002-03), 6~20자(002-04). helper: `영문·숫자, 6~20자`.
  error 우선순위: 빈값 → 형식(002-03) → 길이(002-04).
- **비밀번호 (text-field-password, masked)**: 10~20자(002-05), 3종 이상 조합(002-06).
  helper: `영문 대/소문자·숫자·특수문자 중 3종 이상, 10~20자`. error: 길이(002-05) / 조합(002-06).
- **휴대폰번호 (text-field-phone, numeric)**: 숫자만 11자리(002-08). helper: `숫자 11자리`.
- 위 5개 정책은 모두 OGN `ogn-mbr-member-input` 의 입력 검증으로 매핑된다 (mapped 요구는
  최소 1개 OGN ID 보유 조건 충족).

## Section B — SB-only Facts (NOT policy-backed; do not fabricate policy)

SB 근거만 존재. 본 작업 지시(task directive)로 구현 진행은 승인됐으나, 정책 의미로 확정하지
않고 SB-only로 분리 기록한다. sourceRef = `SB` (SB-MBR-UC01_02-0513).

### B-1. `ogn-mbr-member-input` SB-only 구조 사실

| SB factId | fact | sourceRef | missingPolicyIds | status |
|---|---|---|---|---|
| SB-MI-01 | 회원가입 필수 입력 항목 정의(아이디·비밀번호·이메일·연락처 모두 필수) | SB | POL-MBR-INFO-001-01, POL-MBR-INFO-001-02 | INFO-001 domain ABSENT → SB-only 필수표시·필수누락(E1) 처리 |
| SB-MI-02 | 비밀번호 확인(재입력) 필드 | SB | — (no policy) | SB-only; 정책 근거 없음. 폼 무결성 보조 필드로만 처리 |
| SB-MI-03 | 이메일 입력 항목 | SB | POL-MBR-INFO-001-01 | SB-only 필드. 형식 검증 정책 없음 → 형식 규칙 발명 금지 |
| SB-MI-04 | 아이디·이메일·연락처 중복 검증 결과(E3/E4/E5) | SB | POL-MBR-INFO-002-01, POL-MBR-INFO-002-11 | INFO-002-01/11 ABSENT → SB-only 서버 error 행동. 중복 메시지 문안 발명 금지, 서버 응답 표시만 |
| SB-MI-05 | 아이디 중복확인 inline action (SB action-area 외 task directive) | SB | — | SB-only UI affordance. 정책 근거 없음 |

E1(필수값 누락)/E2(형식 오류) 처리: E2의 형식 규칙은 INFO-002-03/04/05/06/08(정책-backed)로만
판정한다. E1 필수 판정 자체(어떤 항목이 필수인가)는 INFO-001 부재로 SB-only.

### B-2. `ogn-mbr-entry-check` — fully SB-only, blocked-from-config

| SB factId | fact | sourceRef | missingPolicyIds | status |
|---|---|---|---|---|
| SB-EC-01 | 기존 정상 회원 식별 시 안내 (section-message cautionary) | SB | POL-MBR-INFO-003-07 | INFO-003 ABSENT — reserved/out-of-state. no authored copy |
| SB-EC-02 | 휴면 회원 식별 시 안내 (section-message cautionary) | SB | POL-MBR-INFO-003-08 | INFO-003 ABSENT — reserved/out-of-state. no authored copy |
| SB-EC-03 | 탈퇴 회원 식별 시 안내 (section-message info) | SB | POL-MBR-INFO-003-09 | INFO-003 ABSENT — reserved/out-of-state. no authored copy |
| SB-EC-04 | 진입 조건 확인 API + loading skeleton | SB | POL-MBR-INFO-003-01 | INFO-003 ABSENT — loading은 governance(UXPT_LOD)로만 다룸 |

`ogn-mbr-entry-check` 정책 set 전체(INFO-003-01/07/08/09)는 policy-core 부재.
`blockedReason`: INFO-003 도메인 정책 부재로 안내 문안·분기 의미를 정책으로 확정 불가.
`neededDecision`: INFO-003 정책 backfill 시 정상 OGN 승격. 그 전까지 default 화면에서
copy/분기를 표면화하지 않는 conditional/out-of-state reserved OGN으로만 둔다.
`Screen.config.ts generation.policyRefs` 에 INFO-003-* 를 넣지 않는다 (blocked-from-config).

## Section C — Governance Refs (선정 / 비선정)

확인 시점은 Phase 2. CTA·상태·에러·로딩·navigation·writing tone에 영향을 주는 항목만 선정.

### Selected

| governanceRef | selectionReason | affectedRequirement | copy/state/CTA impact |
|---|---|---|---|
| `UXPT_BTN` (BTN_2 동사형, BTN_3/4 위계) | 하단 단일 CTA `다음` 의 라벨·위계 결정 필요 | screen 전환 CTA (→ FP-003) | CTA는 Solid Primary 1개. BTN_2_RULE_1 동사형 → 라벨 후보 `다음` 유지하되 diagram에서 결과 예측 가능 라벨 검토 (`입력 완료하기` 등). 화면당 Primary 1개 |
| `UXPT_ERR` (ERR_1 인라인 에러) | INFO-002 형식 오류·SB-only 중복 오류를 필드 인접 표시해야 함 | 002-03/04/05/06/08 형식 error + SB-MI-04 중복 error | 에러는 상단 통합이 아닌 해당 필드 인접/하단. 원인+수정방법 동반. negative section-message 보조 사용 가능하나 필드 인접 우선 |
| `UXPT_LOD` (LOD_2 스켈레톤) | `ogn-mbr-entry-check` 진입 조건 확인 API loading 상태 존재 | SB-EC-04 loading | conditional OGN의 loading은 skeleton, 실제 레이아웃과 동일 구조, 레이아웃 점프 금지. reserved 상태이므로 default 비표시 |
| `UXPT_NAV` (NAV_2 뒤로가기, NAV_3 닫기) | multi-step 가입 플로우. 뒤로가기/이탈 시 입력 보존·확인 필요 | step 이동, 입력 보존 | NAV_2_RULE_3/4: 뒤로가기 시 직전 단계(약관 동의)로, 입력 보존. NAV_3_RULE_3: 입력 중 이탈 시 저장/확인 안내 |
| `VOT_RUL` (RUL_1 해요체, RUL_3 긍정형, RUL_4 호칭) | 모든 helper/error/CTA copy 문체 통일 | Section A copy 전체 | 해요체 통일(`...해 주세요`). 긍정형 기본. 미인증 단계 가능성 → 이름 호칭 사용 금지(RUL_4_RULE_1). error는 RUL_3 예외(제약 안내) 허용 |

### Reviewed but not selected

| governanceRef | notApplicableReason |
|---|---|
| `UXPT_NAV` (GNB sub-rule) | 가입 플로우 단일 태스크 화면, GNB 탭 구조 없음 (NAV의 GNB 규칙은 비적용; back/이탈 규칙만 적용 — Selected 참조) |
| `UXPT_ERR` (결과 없음 / 시스템·AI 에러 sub-rule) | 입력 폼 화면. 검색/리스트 empty 상태 없음. 시스템/AI 에러는 SB·정책 근거 없음 (ERR의 인라인 에러 규칙만 적용 — Selected 참조) |
| `UXPT_LOD` (부분/전체/AI 로딩 sub-rule) | entry-check는 영역 단위 skeleton만 해당. 전체/AI 로딩 근거 없음 (LOD의 skeleton 규칙만 적용 — Selected 참조) |
| UXP journey 원칙군 (행동·결정·진입·기대·예약·일정·과업완료 계열) | journey-level 원칙. 본 단일 폼 화면 요구에 직접 매핑되는 항목 없음(diagram 구조 판단 아님). 개별 ID 미선정 |

## Linked OGN IDs

- `ogn-mbr-member-input` — Section A 정책 5종(INFO-002-03/04/05/06/08) + Section B-1 SB-only.
  mapped 요구의 OGN owner. **NEW** (ognBoundaryDecision은 diagram 소유; legacy 재사용 금지).
- `ogn-mbr-entry-check` — Section B-2 fully SB-only, reserved/out-of-state. **NEW**.
  config policyRefs 비포함(blocked-from-config). diagram에서 conditional/hidden 처리.

## Done Criteria Check

- Coverage Matrix 작성 완료(green 없음, yellow 진행 + red SB-only 분리).
- 정책-backed(INFO-002-*) 와 SB-only(INFO-001/003, 중복검증, entry-check) 명시적 분리.
- 모든 INFO-002 정책 태그가 필드 정보·error로 매핑됨.
- governance refs 선정/비선정 사유 기록.
- mapped 요구는 OGN ID 보유. config 기대 policyRefs(INFO-002-03/04/05/06/08) 와 ognIds
  (`ogn-mbr-member-input`, `ogn-mbr-entry-check`) 가 map에 등장.
