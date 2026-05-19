# NOVA-MBR-FP-001-0 · Screen.map.md

> Step 2 (Thin Map) SOT. 정책 의미와 governance 선정만 소유한다. layout/spacing/component/route는 `Screen.diagram.html`·`Screen.config.ts`가 소유한다. legacy `(nova-mbr-fp-legacy)/NOVA-MBR-FP-001-0` Map을 migration source로 계승하되 group을 `nova-mbr-fp`로 교정한다.

## Policy Coverage Matrix

Coverage 판정 = **YELLOW**. policy-backed 3건은 모두 policy-core에 존재한다. SB가 참조했으나 policy-core에 없는 항목은 SB-only로 분리하며, 정책 의미·카피·제약의 구현 근거로 승격하지 않는다.

| OGN | config 추적 | SB policy IDs | policy-backed | SB-only / missing policy | coverage | next action |
| --- | --- | --- | --- | --- | --- | --- |
| `ogn-mbr-term-list` | `generation.ognIds` 포함, `policyRefs` 직접 연결 없음 | TERM-001-01, TERM-001-02, TERM-001-10 | 없음 | POL-MBR-TERM-001-01, POL-MBR-TERM-001-02, POL-MBR-TERM-001-10 | yellow | structural-only로 유지. 약관 항목/전문 구조만 표시하고 정책 copy 발명 금지 |
| `ogn-mbr-term-agree` | `POL-MBR-TERM-001-06` | TERM-001-06, TERM-001-07, TERM-003-01 | POL-MBR-TERM-001-06 | POL-MBR-TERM-001-07, POL-MBR-TERM-003-01 | yellow | 필수 약관 동의 완료 전 CTA 차단과 required error를 정책-backed로 확정 |
| `ogn-mbr-guardian-input` | `POL-MBR-TERM-002-01`, `POL-MBR-TERM-002-05` | TERM-002-01, TERM-002-03, TERM-002-05, TERM-002-06 | POL-MBR-TERM-002-01, POL-MBR-TERM-002-05 | POL-MBR-TERM-002-03, POL-MBR-TERM-002-06 | yellow | 만 14세 미만 조건부 법정대리인 동의와 24시간 유효시간 안내만 확정 |
| `ogn-mbr-guardian-result` | `POL-MBR-TERM-002-05` | TERM-002-05, TERM-002-06 | POL-MBR-TERM-002-05 | POL-MBR-TERM-002-06 | yellow | 요청 만료/재요청 recovery만 out-of-state로 추적 |

Screen 종합 policy-backed IDs: `POL-MBR-TERM-001-06`, `POL-MBR-TERM-002-01`, `POL-MBR-TERM-002-05`.

Screen 종합 SB-only / missingPolicyIds: `POL-MBR-TERM-001-01`, `POL-MBR-TERM-001-02`, `POL-MBR-TERM-001-07`, `POL-MBR-TERM-001-10`, `POL-MBR-TERM-002-03`, `POL-MBR-TERM-002-06`, `POL-MBR-TERM-003-01`.

- blockedReason: 없음. 필수 약관 차단, 만 14세 미만 법정대리인 조건, 동의 요청 24시간 유효시간은 policy-core로 확인됐다.
- neededDecision: missing policy는 정책 backfill 전까지 SB-only 구조 보존만 허용한다.
- configTrace: `generation.policyRefs` 3건과 `generation.ognIds` 4건은 이 Map의 Policy-Backed Requirements / OGN Linkage에서 모두 추적된다.

## Screen Identity

- screenId: `NOVA-MBR-FP-001-0`
- screenName: 약관 동의
- domain: `MBR` / group `TERM`
- 화면 설명: 회원 가입에 필요한 약관을 확인하고 동의한다.
- pattern: `form` (가입 플로우)
- 화면 전환: `NOVA-MBR-FP-001-0 → NOVA-MBR-FP-002-0` (필수·선택 약관 동의 정보 입력 완료, 전달 데이터: 동의이력ID, 세션ID)
- SB source: `SB-MBR-UC01_02-0513/screen/NOVA-MBR-FP-001-0.md`
- SB 관련 정책 그룹: PG-MBR-TERM-001, PG-MBR-TERM-002, PG-MBR-TERM-003

## Policy-Backed Requirements (present in policy-core)

각 항목 sourceRef = policy-core file. copy = policy-core `copy` 원문 그대로 사용.

### REQ-001 · 필수 약관 미동의 시 진행 차단

- policyId: `POL-MBR-TERM-001-06`
- policyTitle: 필수 약관 미동의 시 진행 차단
- sourceRef: `packages/policy-core/policies/MBR/TERM/POL-MBR-TERM-001-06.policy.ts` (sourceRef.document: "NC 회원가입·탈퇴 정책서 Full v1.0 확정본", section: POL-MBR-TERM-001)
- sourceText: "필수 약관에 미동의한 경우 다음 단계 진행을 차단한다."
- requiredInformation: 필수 약관이 미동의 상태일 때 다음 단계로 진행할 수 없다는 제약이 화면에서 드러나야 한다.
- constraint/validation: 모든 필수 약관 동의 전에는 `다음` CTA 진행 차단. disabled 상태를 기본으로 두고, 미동의 상태 진행 시도는 required error로 회수한다.
- requiredError: 필수 약관 미동의 상태에서 진행 시도 → `ogn-mbr-term-agree` 인접 영역에 negative 안내 노출.
- userCopy.requirement: "필수 약관 동의 후 다음 단계로 진행 가능"
- userCopy.error: "필수 약관에 동의해 주세요"
- mappedOGN: `ogn-mbr-term-agree`
- CTA meaning: `다음` CTA는 필수 약관 전체 동의 상태에서만 `NOVA-MBR-FP-002-0`로 진행한다. 미동의 상태에서는 이동·저장을 수행하지 않는다.

### REQ-002 · 법정대리인 동의 대상

- policyId: `POL-MBR-TERM-002-01`
- policyTitle: 법정대리인 동의 대상
- sourceRef: `packages/policy-core/policies/MBR/TERM/POL-MBR-TERM-002-01.policy.ts` (section: POL-MBR-TERM-002)
- sourceText: "만 14세 미만 고객은 법정대리인의 동의를 받아야 한다."
- requiredInformation: 만 14세 미만 고객은 법정대리인 동의가 필요하다는 사실. 해당 고객 유형일 때만 법정대리인 입력 영역이 의미를 가진다.
- guardian condition: 고객이 만 14세 미만일 때만 법정대리인 동의 절차가 필수다. 비대상 고객에게 법정대리인 입력/결과 영역은 정책 의미를 갖지 않는다. (SB `ogn-mbr-guardian-input` 노출 조건 `[고객유형]=미성년자`, 노출 개수 min0/max1)
- constraint/validation: 만 14세 미만 고객 상태에서 법정대리인 동의 미완료 → 진행 불가 안내.
- requiredError: 법정대리인 동의 미완료 → "법정대리인 동의를 완료해 주세요" 범위로 안내한다.
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
- requiredError/recovery: 유효시간 만료 → 만료 안내 + 재요청 유도.
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

## Governance Refs (Step 2 selection)

| governanceRef | selectionReason | affectedRequirement | copy/state/CTA impact | notApplicableReason |
| --- | --- | --- | --- | --- |
| `UXPT_BTN` (BTN_2 동사형 라벨, BTN_3/BTN_4 Primary 1개·위계) | 화면의 핵심 CTA(`다음`, `동의 요청 발송`, `재요청`)가 행동 중심·단일 Primary 위계여야 한다 | REQ-001, REQ-002, REQ-003 | `다음`은 가입 다음 단계 진행 의미를 가진다. Primary는 화면당 1개(Bottom), guardian/result action은 보조 위계 | - |
| `UXPT_ERR` (ERR_1 인라인 에러) | 필수 약관 미동의·법정대리인 인증 실패·만료가 사용자 시선 근처에서 원인+해결과 함께 안내돼야 한다 | REQ-001, REQ-002, REQ-003 | 에러는 상단 통합 알림이 아니라 해당 영역(term-agree / guardian) 인접에 노출. copy는 policy error copy 사용 | ERR_4(AI 실패)는 해당 흐름 없음 |
| `UXPT_LOD` (LOD_2 스켈레톤) | 약관 목록 조회 중 결과 형태 예측 가능한 skeleton 필요 | term-list 표시(구조-only) | term-list loading은 실제 콘텐츠와 동일 레이아웃의 skeleton. 정책 의미 아님(SB-only 구조 통제용) | LOD_4(AI 생각중) 해당 없음 |
| `UXPT_NAV` (NAV_2 뒤로가기 입력 보존, NAV_3 닫기 손실 방지) | 다단계 가입 폼에서 뒤로/닫기 시 입력 보존·확인 필요 | REQ-001, REQ-002 | 뒤로 가기 시 약관 동의·법정대리인 입력 보존. 닫기 시 손실 방지 확인 | NAV_1(GNB)은 폼 화면에 미해당 |
| `VOT_RUL` (RUL_1 해요체, RUL_3 긍정형) | 모든 안내·에러·CTA copy 어체/긍·부정 일관 | REQ-001~003 + 모든 화면 copy | policy copy를 해요체·긍정형 기조로 일관 적용. policy error copy는 원문 유지 | RUL_4(이름 호칭): 본인인증 이름 노출 근거 없음 → 미적용 |

- selectionReason 공통: governance는 Step 3에서 CTA hierarchy/state/error/navigation/copy 검증 기준으로만 적용한다.
- notApplicableReason 기록: `UXPT_PRC`/`UXPT_RCV`/`UXP_*`/`VOT_CS`/`VOT_CVS` 등은 이 화면의 정책-backed 요구(약관 차단·법정대리인 대상·유효시간)와 직접 연결되는 행동/상태/문체 영향이 없어 미선정.

## OGN Linkage

| OGN ID | 정책-backed 연결 | SB-only 비고 | mapped? |
| --- | --- | --- | --- |
| `ogn-mbr-term-list` | 없음 (정책-backed 직접 연결 없음) | TERM-001-01/02/10 SB-only. structural-only로 Diagram에서 처리 | structural-only |
| `ogn-mbr-term-agree` | REQ-001 (POL-MBR-TERM-001-06) | TERM-001-07/003-01 SB-only | mapped |
| `ogn-mbr-guardian-input` | REQ-002 (TERM-002-01), REQ-003 (TERM-002-05) | TERM-002-03 SB-only. conditional 노출(미성년자) | mapped |
| `ogn-mbr-guardian-result` | REQ-003 (TERM-002-05) | TERM-002-06 SB-only. out-of-state | mapped |

- 모든 OGN은 Diagram에서 `ognBoundaryDecision`으로 확정한다. 현 Map은 OGN과 정책 의미 연결만 소유한다.
- `ogn-mbr-term-list`는 정책-backed 요구가 없어 `structural-only`. Diagram에서 structural-only 사유로 기록한다.
- legacy 대비 변경점: group `nova-mbr-fp-legacy → nova-mbr-fp`, 이름에서 "Legacy ·" 제거. 정책 의미·coverage 판정·governance 선정은 legacy Map과 동일하게 계승한다.
