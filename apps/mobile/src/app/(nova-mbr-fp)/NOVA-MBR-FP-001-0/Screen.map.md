# NOVA-MBR-FP-001-0 · Screen.map.md

> Phase 2 (Map) SOT. 정책 의미와 governance 선정만 소유한다. layout/spacing/component/route는 `Screen.diagram.md`·`Screen.config.ts`가 소유한다.

## Screen Identity

- screenId: `NOVA-MBR-FP-001-0`
- screenName: 약관 동의
- domain: `MBR` / group `TERM`
- 화면 설명: 회원 가입에 필요한 약관을 확인하고 동의한다.
- pattern: `form` (가입 플로우)
- 화면 전환: `NOVA-MBR-FP-001-0 → NOVA-MBR-FP-002-0` (필수·선택 약관 동의 정보 입력 완료, 전달 데이터: 동의이력ID, 세션ID)
- SB source: `SB-MBR-UC01_02-0513/screen/NOVA-MBR-FP-001-0.md`
- SB 관련 정책 그룹: PG-MBR-TERM-001, PG-MBR-TERM-002, PG-MBR-TERM-003

## Policy Coverage Matrix

Coverage 판정 = **YELLOW**. SB가 참조한 정책 ID 중 policy-core에 존재(present)하는 것만 구현 근거로 사용한다. 부재(absent) ID는 SB-only로만 기록하고, `Screen.config.ts generation.policyRefs`로 승격하지 않는다.

| OGN | SB policy IDs | present (policy-core) | absent (SB-only) | coverage | next action |
| --- | --- | --- | --- | --- | --- |
| `ogn-mbr-term-list` | TERM-001-01, TERM-001-02, TERM-001-10 | (none) | TERM-001-01, TERM-001-02, TERM-001-10 | yellow | map (structural-only; SB-only contents) |
| `ogn-mbr-term-agree` | TERM-001-06, TERM-001-07, TERM-003-01 | TERM-001-06 | TERM-001-07, TERM-003-01 | yellow | map |
| `ogn-mbr-guardian-input` | TERM-002-01, TERM-002-03, TERM-002-05, TERM-002-06 | TERM-002-01, TERM-002-05 | TERM-002-03, TERM-002-06 | yellow | map (conditional / under-14) |
| `ogn-mbr-guardian-result` | TERM-002-05, TERM-002-06 | TERM-002-05 | TERM-002-06 | yellow | map (out-of-state) |

Screen 종합 present policy IDs: `POL-MBR-TERM-001-06`, `POL-MBR-TERM-002-01`, `POL-MBR-TERM-002-05`.

Screen 종합 absent (SB-only, missingPolicyIds): `POL-MBR-TERM-001-01`, `POL-MBR-TERM-001-02`, `POL-MBR-TERM-001-07`, `POL-MBR-TERM-001-10`, `POL-MBR-TERM-002-03`, `POL-MBR-TERM-002-06`, `POL-MBR-TERM-003-01`.

- blockedReason: 없음. present 정책 3건이 화면 진행(필수 약관 차단, 미성년자 동의 대상, 동의 유효시간)을 충분히 지지하므로 화면은 blocked가 아니다.
- neededDecision: absent ID는 정책 backfill 없이는 구현 요구로 확정하지 않는다. SB-only 항목은 화면 구조 보존을 위해 표시는 유지하되 정책 의미 단정/copy 발명 금지.

## Policy-Backed Requirements (present in policy-core)

각 항목 sourceRef = policy-core file. copy = policy-core `copy` 원문 그대로 사용.

### REQ-001 · 필수 약관 미동의 시 진행 차단

- policyId: `POL-MBR-TERM-001-06`
- policyTitle: 필수 약관 미동의 시 진행 차단
- sourceRef: `packages/policy-core/policies/MBR/TERM/POL-MBR-TERM-001-06.policy.ts` (sourceRef.document: "NC 회원가입·탈퇴 정책서 Full v1.0 확정본", section: POL-MBR-TERM-001)
- sourceText: "필수 약관에 미동의한 경우 다음 단계 진행을 차단한다."
- requiredInformation: 필수 약관이 미동의 상태일 때 다음 단계로 진행할 수 없다는 제약이 화면에서 드러나야 한다.
- constraint/validation: 모든 필수 약관 동의 전에는 `다음` CTA 진행 차단. 미동의 상태에서 진행 시도 시 negative 안내 노출.
- errorRule: 필수 약관 미동의 상태에서 진행 시도 → 차단 + 에러 안내.
- userCopy.requirement: "필수 약관 동의 후 다음 단계로 진행 가능"
- userCopy.error: "필수 약관에 동의해 주세요"
- mappedOGN: `ogn-mbr-term-agree`
- CTA meaning: `다음` CTA는 필수 약관 전체 동의 상태에서만 진행을 수행한다. 미동의 시 진행을 막고 에러 안내를 노출한다.

### REQ-002 · 법정대리인 동의 대상

- policyId: `POL-MBR-TERM-002-01`
- policyTitle: 법정대리인 동의 대상
- sourceRef: `packages/policy-core/policies/MBR/TERM/POL-MBR-TERM-002-01.policy.ts` (section: POL-MBR-TERM-002)
- sourceText: "만 14세 미만 고객은 법정대리인의 동의를 받아야 한다."
- requiredInformation: 만 14세 미만 고객은 법정대리인 동의가 필요하다는 사실. 해당 고객 유형일 때만 법정대리인 입력 영역이 의미를 가진다.
- constraint/validation: 미성년자(만 14세 미만) 고객 상태일 때 법정대리인 동의 절차가 필수. 비대상 고객에게는 노출하지 않는다(조건부).
- errorRule: 법정대리인 동의 미완료 → 진행 불가 안내.
- userCopy.requirement: "만 14세 미만 고객은 법정대리인 동의가 필요합니다"
- userCopy.error: "법정대리인 동의를 완료해 주세요"
- mappedOGN: `ogn-mbr-guardian-input` (conditional, 고객유형=미성년자)
- CTA meaning: 동의 요청 발송은 미성년자 고객 상태에서만 의미를 가진다.

### REQ-003 · 법정대리인 동의 요청 유효시간

- policyId: `POL-MBR-TERM-002-05`
- policyTitle: 법정대리인 동의 요청 유효시간
- sourceRef: `packages/policy-core/policies/MBR/TERM/POL-MBR-TERM-002-05.policy.ts` (section: POL-MBR-TERM-002)
- sourceText: "법정대리인 동의 요청의 유효시간은 24시간이다."
- requiredInformation: 동의 요청 유효시간이 24시간이라는 안내. 만료 시 재요청이 필요하다는 사실.
- constraint/validation: 동의 요청 발송 후 24시간 경과 시 요청 만료. 만료 후에는 재요청 필요.
- errorRule: 유효시간 만료 → 만료 안내 + 재요청 유도.
- userCopy.requirement: "동의 요청 유효시간 24시간"
- userCopy.error: "동의 요청 유효시간이 만료되어 다시 요청해 주세요"
- mappedOGN: `ogn-mbr-guardian-input` (안내), `ogn-mbr-guardian-result` (만료/재요청, out-of-state)

## SB-Only Facts (absent from policy-core — NOT implementation policy)

아래는 SB organism/screen 문서에만 존재하며 policy-core에 없다. 구조 보존 목적으로 화면에 자리는 유지하되, 정책 의미를 단정하거나 copy를 발명하지 않는다. sourceRef = `SB-MBR-UC01_02-0513`. config `policyRefs`로 승격 금지.

| SB policy ID | SB 위치 | SB가 주장하는 의미 (SB-only) | 처리 |
| --- | --- | --- | --- |
| `POL-MBR-TERM-001-01` | ogn-mbr-term-list 컴포넌트 1 | 회원 가입 필수 약관 항목 | 구조 표시 유지(필수 약관 행). 정책 copy 발명 금지 |
| `POL-MBR-TERM-001-02` | ogn-mbr-term-list 컴포넌트 2 | 회원 가입 선택 약관 항목 | 구조 표시 유지(선택 약관 행). 정책 copy 발명 금지 |
| `POL-MBR-TERM-001-10` | ogn-mbr-term-list 노출 케이스 | 약관 버전 적용 기준 / 약관 전문 | 약관 전문 accordion 구조 part로만 유지. 본문 copy 발명 금지 |
| `POL-MBR-TERM-001-07` | ogn-mbr-term-agree 컴포넌트 3 | 선택 약관 미동의 처리 | 선택 약관 개별 동의 행 구조만 유지. 미동의 제약 단정 금지 |
| `POL-MBR-TERM-003-01` | ogn-mbr-term-agree 관련 정책서 | (PG-MBR-TERM-003 그룹) 미상 | SB-only. 구현 요구로 확정하지 않음 |
| `POL-MBR-TERM-002-03` | ogn-mbr-guardian-input 컴포넌트 2 | 법정대리인 인증수단 | 연락처 입력 필드 구조만 유지. 인증수단 정책 단정 금지 |
| `POL-MBR-TERM-002-06` | ogn-mbr-guardian-result 노출 케이스 | 법정대리인 동의 미완료 처리 | out-of-state 안내 자리만 유지. 미완료 처리 정책 단정 금지 |

## Choices / Options

- 전체 동의 (allTermsAgreed) / 개별 필수 약관 동의 / 개별 선택 약관 동의 — choice control은 ogn-mbr-term-agree 소유. (선택 약관 동의 가능 여부 자체는 SB-only TERM-001-07 기반이므로 정책 의미 단정 금지, 구조만 보존.)
- 약관 전문 펼치기/접기 (expandedTermId) — ogn-mbr-term-list 소유. SB-only(TERM-001-10) 구조 part.
- 미성년자 고객: 법정대리인 이름·연락처 입력 후 동의 요청 발송 (조건부, REQ-002).

## States & Recovery (policy-backed)

- term-agree error: 필수 약관 미동의 상태에서 `다음` 시도 → 진행 차단 + negative 안내(`필수 약관에 동의해 주세요`). [REQ-001]
- guardian-input error: 법정대리인 인증 실패/정보 불일치 → negative 안내. 정책 backfill 전이므로 실패 사유 copy는 발명하지 않고 REQ-002 error copy(`법정대리인 동의를 완료해 주세요`) 범위로 한정.
- guardian-result expire: 동의 요청 유효시간 만료 → 만료 안내 + 재요청. error copy = `동의 요청 유효시간이 만료되어 다시 요청해 주세요` [REQ-003]
- term-list loading/error: skeleton / 조회 실패 안내. 정책-backed 아님(SB-only). UXPT_LOD / UXPT_ERR governance로만 통제.

## Governance Refs (Phase 2 selection)

| governanceRef | selectionReason | affectedRequirement | copy/state/CTA impact | notApplicableReason |
| --- | --- | --- | --- | --- |
| `UXPT_BTN` (BTN_2 동사형 라벨, BTN_3/BTN_4 Primary 1개·위계) | 화면의 핵심 CTA(`다음`, `동의 요청 발송`, `재요청`)가 행동 중심·단일 Primary 위계여야 한다 | REQ-001, REQ-002, REQ-003 | `다음` 라벨은 행동 결과 예측 가능 형태. Primary는 화면당 1개(Bottom), guardian/result action은 보조 위계 | - |
| `UXPT_ERR` (ERR_1 인라인 에러) | 필수 약관 미동의·법정대리인 인증 실패·만료가 사용자 시선 근처에서 원인+해결과 함께 안내돼야 한다 | REQ-001, REQ-002, REQ-003 | 에러는 상단 통합 알림이 아니라 해당 영역(term-agree / guardian) 인접에 노출. copy는 policy error copy 사용 | ERR_4(AI 실패)는 해당 흐름 없음 |
| `UXPT_LOD` (LOD_2 스켈레톤) | 약관 목록 조회 중 결과 형태 예측 가능한 skeleton 필요 | term-list 표시(구조-only) | term-list loading은 실제 콘텐츠와 동일 레이아웃의 skeleton. 정책 의미 아님(SB-only 구조 통제용) | LOD_4(AI 생각중) 해당 없음 |
| `UXPT_NAV` (NAV_2 뒤로가기 입력 보존, NAV_3 닫기 손실 방지) | 다단계 가입 폼에서 뒤로/닫기 시 입력 보존·확인 필요 | REQ-001, REQ-002 | 뒤로 가기 시 약관 동의·법정대리인 입력 보존. 닫기 시 손실 방지 확인 | NAV_1(GNB)은 폼 화면에 미해당 |
| `VOT_RUL` (RUL_1 해요체, RUL_3 긍정형) | 모든 안내·에러·CTA copy 어체/긍·부정 일관 | REQ-001~003 + 모든 화면 copy | policy copy를 해요체·긍정형 기조로 일관 적용. policy error copy는 원문 유지 | RUL_4(이름 호칭): 본인인증 이름 노출 근거 없음 → 미적용 |

- selectionReason 공통: governance는 Phase 3에서 CTA hierarchy/state/error/navigation/copy 검증 기준으로만 적용한다(README Generation Timing).
- notApplicableReason 기록: `UXPT_PRC`/`UXPT_RCV`/`UXP_*`/`VOT_CS`/`VOT_CVS` 등은 이 화면의 정책-backed 요구(약관 차단·법정대리인 대상·유효시간)와 직접 연결되는 행동/상태/문체 영향이 없어 미선정.

## OGN Linkage

| OGN ID | 정책-backed 연결 | SB-only 비고 | mapped? |
| --- | --- | --- | --- |
| `ogn-mbr-term-list` | 없음 (정책-backed 직접 연결 없음) | TERM-001-01/02/10 SB-only. structural-only로 Diagram에서 처리 | structural-only |
| `ogn-mbr-term-agree` | REQ-001 (POL-MBR-TERM-001-06) | TERM-001-07/003-01 SB-only | mapped |
| `ogn-mbr-guardian-input` | REQ-002 (TERM-002-01), REQ-003 (TERM-002-05) | TERM-002-03 SB-only. conditional 노출(미성년자) | mapped |
| `ogn-mbr-guardian-result` | REQ-003 (TERM-002-05) | TERM-002-06 SB-only. out-of-state | mapped |

- 모든 OGN은 신규(`ognBoundaryDecision = new`, Diagram에서 확정). legacy organism 재사용 금지.
- `ogn-mbr-term-list`는 정책-backed 요구가 없어 `structural-only`. Diagram에서 structural-only 사유로 기록한다.
