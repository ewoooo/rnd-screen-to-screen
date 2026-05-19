# NOVA-MBR-FP-009-0 · Screen.map.md

> Step 2 (Thin Map) SOT. 정책 의미와 governance 선정만 소유한다. layout/spacing/component/route는 `Screen.diagram.html`·`Screen.config.ts`가 소유한다. legacy `(nova-mbr-fp-legacy)/NOVA-MBR-FP-009-0` Map을 migration source로 계승하되 group을 `nova-mbr-fp`로 교정한다.

## Policy Coverage Matrix

Coverage 판정 = **YELLOW**. 이 화면은 guardian OGN 없이 재동의 대상 약관 목록과 필수 동의 차단만 가진다. policy-backed `POL-MBR-TERM-001-06`은 policy-core에 존재한다.

| OGN / section | config 추적 | SB policy IDs | policy-backed | SB-only / missing policy | coverage | next action |
| --- | --- | --- | --- | --- | --- | --- |
| `intro` | OGN 아님, structural-only intro section | 재동의 intro context | 없음 | 재동의가 필요한 약관 및 고지 내용 확인 | yellow | structural-only 안내. 정책 문구로 단정하지 않음 |
| `ogn-mbr-term-list` | `generation.ognIds` 포함, `policyRefs` 직접 연결 없음 | TERM-001-01, TERM-001-02, TERM-001-10 | 없음 | POL-MBR-TERM-001-01, POL-MBR-TERM-001-02, POL-MBR-TERM-001-10 | yellow | 재동의 대상 약관 1..N 구조만 유지. 약관 본문 copy 발명 금지 |
| `ogn-mbr-term-agree` | `POL-MBR-TERM-001-06` | TERM-001-06, TERM-001-07, TERM-003-01 | POL-MBR-TERM-001-06 | POL-MBR-TERM-001-07, POL-MBR-TERM-003-01 | yellow | 필수 약관 재동의 완료 전 CTA 차단과 required error를 정책-backed로 확정 |

Screen 종합 policy-backed IDs: `POL-MBR-TERM-001-06`.

Screen 종합 SB-only / missingPolicyIds: `POL-MBR-TERM-001-01`, `POL-MBR-TERM-001-02`, `POL-MBR-TERM-001-07`, `POL-MBR-TERM-001-10`, `POL-MBR-TERM-003-01`, `(재동의 intro context)`.

- blockedReason: 없음. 필수 약관 미동의 차단은 policy-core로 확인됐다.
- neededDecision: missing policy와 재동의 intro는 정책 backfill 전까지 SB-only 구조 보존만 허용한다.
- configTrace: `generation.policyRefs` 1건과 `generation.ognIds` 2건, structural-only intro section은 이 Map의 Policy-Backed Requirements / SB-Only Facts / OGN Linkage에서 추적된다.

## Screen Identity

- screenId: `NOVA-MBR-FP-009-0`
- screenName: 약관 동의
- domain: `MBR` / group `TERM`
- 화면 설명: 재동의가 필요한 약관 및 고지 내용을 확인하고 동의한다.
- 화면 경로: 로그인 > 휴면 여부 확인 > 본인인증 > 약관 동의
- pattern: `form` (휴면 재동의 플로우)
- intro context: 재동의가 필요한 약관 및 고지 확인
- 화면 전환: `NOVA-MBR-FP-009-0 → NOVA-MBR-FP-010-0` (필수 약관 재동의 완료, 전달 데이터: 동의이력ID, 세션ID)
- SB source: `SB-MBR-UC01_02-0513/screen/NOVA-MBR-FP-009-0.md`
- SB 관련 정책 그룹: PG-MBR-TERM-001

## Policy-Backed Requirements (present in policy-core)

### REQ-001 · 필수 약관 미동의 시 진행 차단 (재동의)

- policyId: `POL-MBR-TERM-001-06`
- policyTitle: 필수 약관 미동의 시 진행 차단
- sourceRef: `packages/policy-core/policies/MBR/TERM/POL-MBR-TERM-001-06.policy.ts` (sourceRef.document: "NC 회원가입·탈퇴 정책서 Full v1.0 확정본", section: POL-MBR-TERM-001)
- sourceText: "필수 약관에 미동의한 경우 다음 단계 진행을 차단한다."
- requiredInformation: 재동의 대상 필수 약관이 미동의 상태이면 다음 단계로 진행할 수 없다는 제약.
- constraint/validation: 모든 재동의 대상 필수 약관 동의 전 진행 차단. 현재 구현 CTA는 enabled로 보일 수 있으나, 진행 시도 시 Screen이 이동을 막고 required error를 노출한다.
- requiredError: 필수 약관 미동의 상태 진행 시도 → `ogn-mbr-term-agree` 인접 영역에 negative 안내 노출.
- userCopy.requirement: "필수 약관 동의 후 다음 단계로 진행 가능"
- userCopy.error: "필수 약관에 동의해 주세요"
- mappedOGN: `ogn-mbr-term-agree`
- CTA meaning: `다음` CTA는 필수 약관 재동의 완료 상태에서만 `NOVA-MBR-FP-010-0` 진행을 수행한다. 미동의 상태에서는 이동·저장을 수행하지 않고 오류 위치로 시선을 회수한다.

## SB-Only Facts (absent from policy-core — NOT implementation policy)

sourceRef = `SB-MBR-UC01_02-0513`. config `policyRefs` 승격 금지.

| SB policy ID | SB 위치 | SB가 주장하는 의미 (SB-only) | 처리 |
| --- | --- | --- | --- |
| `POL-MBR-TERM-001-01` | ogn-mbr-term-list 컴포넌트 1 | 회원 가입 필수 약관 항목 | 구조 표시 유지(필수 약관 행). 정책 copy 발명 금지 |
| `POL-MBR-TERM-001-02` | ogn-mbr-term-list 컴포넌트 2 | 회원 가입 선택 약관 항목 | 구조 표시 유지(선택 약관 행). 정책 copy 발명 금지 |
| `POL-MBR-TERM-001-10` | ogn-mbr-term-list 노출 케이스 | 약관 버전 적용 기준 / 약관 전문 | 약관 전문 accordion 구조 part로만 유지. 본문 copy 발명 금지 |
| `POL-MBR-TERM-001-07` | ogn-mbr-term-agree 컴포넌트 3 | 선택 약관 미동의 처리 | 선택 약관 개별 동의 행 구조만 유지. 미동의 제약 단정 금지 |
| `POL-MBR-TERM-003-01` | ogn-mbr-term-agree 관련 정책서 | (PG-MBR-TERM-003 그룹) 미상 | SB-only. 구현 요구로 확정하지 않음 |
| (재동의 intro) | screen 화면 설명 | "재동의가 필요한 약관 및 고지 내용 확인" | 구조 intro 자리만 유지. 정확한 정책 안내 문구는 발명 금지, VOT_RUL 기조의 일반 안내만 |

## Choices / Options

- 전체 동의 (allTermsAgreed) / 개별 필수 약관 동의 / 개별 선택 약관 동의 — ogn-mbr-term-agree 소유. (선택 약관 동의 가능 여부 자체는 SB-only TERM-001-07; 구조만 보존.)
- 약관 전문 펼치기/접기 (expandedTermId) — ogn-mbr-term-list 소유. SB-only(TERM-001-10) 구조 part.

## States & Recovery (policy-backed)

- term-agree error: 필수 약관 미동의 상태에서 `다음` 시도 → 진행 차단 + negative 안내(`필수 약관에 동의해 주세요`). [REQ-001]
- term-list loading/error: skeleton / 조회 실패 안내. 정책-backed 아님(SB-only). UXPT_LOD / UXPT_ERR governance로만 통제.
- 케이스 분기(SB-only): E1 약관 버전 불일치(최신 약관 재동의), E2 필수 약관 미동의(진행 불가), E3 동의 저장 실패(재시도 안내) — 정책-backed 단정 금지. E2만 REQ-001과 의미 정렬.

## Governance Refs (Step 2 selection)

| governanceRef | selectionReason | affectedRequirement | copy/state/CTA impact | notApplicableReason |
| --- | --- | --- | --- | --- |
| `UXPT_BTN` (BTN_2 동사형 라벨, BTN_3/BTN_4 Primary 1개·위계) | 재동의 핵심 CTA(`다음`)가 행동 중심 단일 Primary 위계여야 한다 | REQ-001 | `다음`은 재동의 다음 단계 진행 의미를 가진다. Primary는 화면당 1개(Bottom) | - |
| `UXPT_ERR` (ERR_1 인라인 에러) | 필수 약관 미동의가 사용자 시선 근처에서 원인+해결과 함께 안내돼야 한다 | REQ-001 | 에러는 term-agree 영역 인접 노출. copy = policy error copy | ERR_4(AI 실패) 흐름 없음 |
| `UXPT_LOD` (LOD_2 스켈레톤) | 재동의 약관 목록 조회 중 결과 형태 예측 가능 skeleton 필요 | term-list 표시(구조-only) | term-list loading은 실제 콘텐츠와 동일 레이아웃 skeleton. 정책 의미 아님 | LOD_4 해당 없음 |
| `UXPT_NAV` (NAV_2 뒤로가기 입력 보존) | 재동의 폼에서 뒤로 시 동의 입력 보존 필요 | REQ-001 | 뒤로 가기 시 약관 동의 입력 보존 | NAV_1(GNB), NAV_3(닫기)은 단일 폼 진행에 미해당 |
| `VOT_RUL` (RUL_1 해요체, RUL_3 긍정형) | 재동의 안내·에러·CTA copy 어체/긍·부정 일관 | REQ-001 + 모든 화면 copy + 재동의 intro | policy copy 해요체·긍정형 기조 일관. policy error copy 원문 유지. intro 안내는 발명 금지 범위 내 일반 안내 | RUL_4(이름 호칭): 본인인증 이름 노출 근거 없음 → 미적용 |

- notApplicableReason 기록: `UXPT_PRC`/`UXPT_RCV`/`UXP_*`/`VOT_CS`/`VOT_CVS` 등은 이 화면의 정책-backed 요구(약관 차단)와 직접 연결되는 행동/상태/문체 영향이 없어 미선정.

## OGN Linkage

| OGN ID | 정책-backed 연결 | SB-only 비고 | mapped? |
| --- | --- | --- | --- |
| `ogn-mbr-term-list` | 없음 (정책-backed 직접 연결 없음) | TERM-001-01/02/10 SB-only. 재동의는 노출 개수 1..N. structural-only | structural-only |
| `ogn-mbr-term-agree` | REQ-001 (POL-MBR-TERM-001-06) | TERM-001-07/003-01 SB-only | mapped |

- 모든 OGN은 Diagram에서 `ognBoundaryDecision`으로 확정한다. 현 Map은 OGN과 정책 의미 연결만 소유한다.
- `ogn-mbr-term-list`는 정책-backed 요구가 없어 `structural-only`. Diagram에서 structural-only 사유로 기록한다.
- guardian OGN 없음: 이 화면은 SB 구성상 term-list + term-agree만 가진다.
- legacy 대비 변경점: group `nova-mbr-fp-legacy → nova-mbr-fp`, 이름에서 "Legacy ·" 제거. 정책 의미·coverage 판정·governance 선정은 legacy Map과 동일하게 계승한다.
