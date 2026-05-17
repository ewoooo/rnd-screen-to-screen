# NOVA-MBR-FP-008-0 · Screen.map.md

> Phase 2 SOT. Owns policy meaning + governance selection only. No layout, spacing, component, or route decisions.

## Screen Identity

- screenId: `NOVA-MBR-FP-008-0`
- screenName: 본인인증
- screenDescription: 휴면 해제 전 본인 여부를 확인한다.
- flowContext: 휴면 해제 플로우 (로그인 > 휴면 여부 확인 > 본인인증)
- domain: `MBR`
- policyGroup: `PG-MBR-AUTH-001`, `PG-MBR-AUTH-002`, `PG-MBR-AUTH-003`, `PG-MBR-AUTH-004`, `PG-MBR-AUTH-005`
- function: `FN-MBR-COM-002`
- pattern: `form`
- transition: `NOVA-MBR-FP-008-0 → NOVA-MBR-FP-009-0` (본인인증 완료; 전달 데이터: 인증세션ID, 인증결과, 세션ID)
- sbSource: `SB-MBR-UC01_02-0513/screen/NOVA-MBR-FP-008-0.md`, `organism/ogn-mbr-auth-select.md`, `organism/ogn-mbr-auth-request.md`
- relationToFP003: SB declares the same two OGNs shared between NOVA-MBR-FP-003-0 and NOVA-MBR-FP-008-0. Policy requirements, choices, constraints, validation, and error semantics are identical. Differences are scoped to: (1) flow/intro context = 휴면 해제 전 본인 확인 (not 가입), (2) transition target = FP-009 (not FP-004), (3) intro copy reflects 휴면 해제. The same NEW OGN ids are reused across both screens at the OGN level (organism reuse), NOT legacy-screen reuse.

## Policy Coverage Matrix

| screen | OGN | SB policy IDs | present policy IDs | missing | verdict | next |
|---|---|---|---|---|---|---|
| NOVA-MBR-FP-008-0 | ogn-mbr-auth-select | POL-MBR-AUTH-002-01, POL-MBR-AUTH-002-05, POL-MBR-AUTH-002-09 | POL-MBR-AUTH-002-01, POL-MBR-AUTH-002-05, POL-MBR-AUTH-002-09 | — | green | map |
| NOVA-MBR-FP-008-0 | ogn-mbr-auth-request | POL-MBR-AUTH-001-01, POL-MBR-AUTH-003-01, POL-MBR-AUTH-003-03, POL-MBR-AUTH-004-01, POL-MBR-AUTH-004-02, POL-MBR-AUTH-005-01, POL-MBR-AUTH-005-03, POL-MBR-AUTH-005-07 | all 8 present | — | green | map |

All SB-referenced policy IDs resolve in `packages/policy-core/policies/MBR/AUTH/`. Coverage = GREEN for both OGNs. No blocked items. Both OGNs proceed to Implementation Map.

## Policy → Screen Requirement Matrix

sourceRef path is the policy-core `.policy.ts` file. sourceText/copy quoted from policy-core (policy-core is SOT).

### OGN: ogn-mbr-auth-select (인증수단 선택)

| policyId | title | sourceText | sourceRef | requirement on screen | type |
|---|---|---|---|---|---|
| POL-MBR-AUTH-002-01 | 허용 인증수단 | 본인인증 수단은 휴대폰, PASS, 공동인증서 중 하나를 사용한다. | packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-002-01.policy.ts | 인증수단 선택지는 휴대폰 / PASS / 공동인증서 3개로 한정. 단일 선택. | choice / constraint |
| POL-MBR-AUTH-002-05 | 기본 노출 인증수단 | 회원 가입 본인인증 화면의 기본 노출 인증수단은 휴대폰, PASS, 공동인증서이다. | packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-002-05.policy.ts | 진입 시 3개 인증수단 기본 노출. 본 정책 sourceText는 "회원 가입" 화면 기준이나 SB가 휴면 해제 화면에도 동일 OGN/정책을 연결하므로 동일 기본 노출 규칙을 적용한다. | required info |
| POL-MBR-AUTH-002-09 | 인증수단 노출 순서 | 인증수단은 휴대폰, PASS, 공동인증서 순서로 노출한다. | packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-002-09.policy.ts | 노출 순서 고정: 1)휴대폰 2)PASS 3)공동인증서. | constraint |

Required information: 선택 가능한 인증수단 목록, 각 수단 라벨, 현재 선택 상태.
Choices: 휴대폰 / PASS / 공동인증서 (단일 선택, radio semantics).
Constraints: 허용 수단 3종만, 노출 순서 고정, 서버 제어로 0개일 때 영역 전체 숨김 (SB 오류 처리 = `영역 전체 숨김`).
Validation/error: 인증수단 미선택 시 인증 요청 진행 불가 (POL-MBR-AUTH-002-01.copy.error: "허용된 인증수단을 선택해 주세요").
States: `default`, `loading`(skeleton).

User copy (policy-derived):
- section title: "본인인증 수단을 선택해 주세요" (POL-MBR-AUTH-002-01.copy.requirement)
- option labels: "휴대폰", "PASS", "공동인증서" (순서 POL-MBR-AUTH-002-09)
- load failure (POL-MBR-AUTH-002-05.copy.error): "사용 가능한 인증수단을 불러오지 못했습니다"

### OGN: ogn-mbr-auth-request (본인인증 요청)

| policyId | title | sourceText | sourceRef | requirement on screen | type |
|---|---|---|---|---|---|
| POL-MBR-AUTH-001-01 | 회원 가입 본인인증 적용 | 회원 가입 시 본인인증을 적용한다. | packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-001-01.policy.ts | 본인인증 완료가 휴면 해제 진행의 필수 게이트. 정책 sourceText는 "회원 가입" 표현이나 SB가 동일 OGN/정책을 휴면 해제 화면에 연결하므로 본인인증 필수 게이트 의미를 적용. 미완료 시 다음 단계 차단. | constraint / CTA gate |
| POL-MBR-AUTH-003-01 | 인증번호 자리수 | 인증번호는 6자리이다. | packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-003-01.policy.ts | 인증번호 6자리 숫자. maxLength=6, numeric. | required info / validation |
| POL-MBR-AUTH-003-03 | 인증번호 유효시간 | 인증번호의 유효시간은 3분이다. | packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-003-03.policy.ts | 발송 후 3분(180s) 유효, 잔여 시간 표시, 만료 시 재요청. | constraint / state |
| POL-MBR-AUTH-004-01 | 재요청 쿨다운 | 인증번호 재요청 쿨다운 시간은 60초이다. | packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-004-01.policy.ts | 재요청 60초 쿨다운, 쿨다운 중 비활성/카운트다운. | constraint / state |
| POL-MBR-AUTH-004-02 | 재요청 최대 횟수 | 인증번호 재요청은 최대 5회까지 허용한다. | packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-004-02.policy.ts | 재요청 최대 5회, 초과 시 차단 + 안내. | constraint / error |
| POL-MBR-AUTH-005-01 | 인증 실패 최대 횟수 | 본인인증 실패는 최대 5회까지 허용한다. | packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-005-01.policy.ts | 인증 검증 실패 최대 5회, 초과 시 제한. | constraint / error |
| POL-MBR-AUTH-005-03 | 인증 제한 시간 | 인증 실패 한도 초과 시 10분 동안 인증을 제한한다. | packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-005-03.policy.ts | 한도 초과 시 10분간 모든 입력 차단(blocked). | constraint / blocked state |
| POL-MBR-AUTH-005-07 | 인증 실패 안내 문구 | 인증 실패 시 재시도 또는 제한 처리 안내 문구를 노출한다. | packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-005-07.policy.ts | 실패 시 재시도/제한 안내 메시지 노출. | error copy |

Required information: 인증번호 입력 필드, 잔여 유효시간(타이머), 재요청 버튼(쿨다운/잔여 횟수), 인증 확인 액션.
Choices: 없음(입력형). 재요청은 조건부 액션.
Constraints/validation: 동일 — 6자리 숫자(003-01), 180초 유효(003-03), 재요청 쿨다운 60초/최대 5회(004-01,004-02), 실패 최대 5회(005-01), 초과 시 10분 제한(005-03), 본인인증 완료 필수(001-01).

Error / recovery states (case branches FP-008-E1~E4 mapped to policy):
- FP-008-E1 인증번호 만료 → 재발급 안내. copy (POL-MBR-AUTH-003-03.copy.error): "유효시간이 만료되어 다시 요청해 주세요" (cautionary)
- FP-008-E2 인증번호 불일치 → 재시도 또는 제한. copy (POL-MBR-AUTH-005-07.copy.error): "인증번호를 확인하거나 잠시 후 다시 시도해 주세요" (negative)
- FP-008-E3 인증 실패 한도 초과 → 재시도 제한. copy (POL-MBR-AUTH-005-01.copy.error): "인증 실패 한도(5회)를 초과했습니다" + (POL-MBR-AUTH-005-03.copy.error): "10분 후 다시 시도해 주세요" (negative / blocked)
- FP-008-E4 외부 인증기관 오류 → 대체 수단 안내. NO policy backing (SB-only). See SB-only facts.
- 재요청 쿨다운 차단 copy (POL-MBR-AUTH-004-01.copy.error): "60초 후 다시 요청해 주세요"
- 재요청 횟수 초과 copy (POL-MBR-AUTH-004-02.copy.error): "재요청 한도(5회)를 초과했습니다"
- 본인인증 미완료 copy (POL-MBR-AUTH-001-01.copy.error): "본인인증을 완료해 주세요"

User copy (policy-derived):
- 인증번호 입력 라벨 (POL-MBR-AUTH-003-01.copy.requirement): "인증번호 6자리 입력"
- 6자리 미충족 (POL-MBR-AUTH-003-01.copy.error): "6자리 인증번호를 입력해 주세요"
- 유효시간 안내 (POL-MBR-AUTH-003-03.copy.requirement): "유효시간 3분" (타이머 mm:ss)
- 재요청 가능 안내 (POL-MBR-AUTH-004-01.copy.requirement): "재요청은 60초 후 가능"
- 재요청 횟수 안내 (POL-MBR-AUTH-004-02.copy.requirement): "재요청은 최대 5회"
- 시도 가능 안내 (POL-MBR-AUTH-005-01.copy.requirement): "최대 5회까지 시도 가능"

### Flow-context copy (휴면 해제 — policy-derived intent, 가입 문맥 치환)

- intro/title context: 휴면 해제 전 본인 확인임을 안내. 본인인증의 의미·필수성은 POL-MBR-AUTH-001-01에서 옴. intro copy는 "가입"이 아닌 "휴면 해제" 문맥으로 작성한다 (예: "휴면 해제를 위해 본인 확인이 필요해요"). 이는 정책 의미(본인인증 필수)를 휴면 해제 화면 문맥으로 표현한 것이며, 새 정책을 발명한 것이 아니다. 구체 문구 결정은 Phase 3 copyDecision.

## Governance Refs

| governanceRef | selectionReason | affectedRequirement | copy/state/CTA impact | source |
|---|---|---|---|---|
| UXPT_BTN | 다중 행동(인증 요청/재요청/인증 확인/다음). 단일 Primary 위계 + 동사형 라벨. | POL-MBR-AUTH-001-01, POL-MBR-AUTH-004-01, POL-MBR-AUTH-004-02 | 하단 Primary 1개(휴면 해제 진행 동사형 라벨, 상태 기반), 재요청 Secondary(outline), 인증 확인 영역 내 strong action. 모호한 "확인" 금지. | governance/UXPT/Structure Control/UXPT_BTN.md |
| UXPT_ERR | 인라인 입력 에러 + 시스템성 제한. 원인+해결 동시 노출. | POL-MBR-AUTH-003-01, POL-MBR-AUTH-005-01, POL-MBR-AUTH-005-03, POL-MBR-AUTH-005-07 | 인증번호 필드 인접 에러+수정 방법. 제한/시스템 오류는 고객 책임 아님 + 복귀 경로. | governance/UXPT/State Control/UXPT_ERR.md |
| UXPT_LOD | auth-select `loading` skeleton 요구, 레이아웃 점프 방지. | POL-MBR-AUTH-002-05 | 목록 로딩은 실제 행 레이아웃 skeleton. 스피너 단독 금지. | governance/UXPT/State Control/UXPT_LOD.md |
| UXPT_NAV | 다단계 휴면 해제 플로우. 뒤로/닫기 시 입력 보존, 직전 단계 복귀. | POL-MBR-AUTH-001-01 | 헤더 back은 직전 단계(휴면 여부 확인)로 입력 보존. 진행 중 닫기 시 손실 방지 확인. | governance/UXPT/Structure Control/UXPT_NAV.md |
| VOT_RUL | 안내/에러/버튼 copy 어체·능동/긍정·호칭 일관. | 전 정책 copy + 휴면 해제 intro | 해요체 통일, 능동·긍정형. 휴면 해제 진입 = 미인증 단계이므로 이름 호칭 미사용. 보안 완료 메시지는 합니다체 예외 허용. | governance/VOT/VOT_RUL.md |

Reviewed but not selected (notApplicable variants — generalized to canonical doc IDs):
- UXPT_NAV (GNB variant): notApplicableReason — 휴면 해제 플로우 단계 화면, 전역 GNB 무관.
- UXPT_ERR (결과 없음 variant): notApplicableReason — 검색/리스트 결과 없음 아님.
- UXPT_ERR / UXPT_LOD (AI variant): notApplicableReason — AI 처리 없음.
- UXPT_LOD (부분/전체 로딩 variant): reviewed — skeleton이 주 패턴, 버튼 처리 중은 인라인 로딩(UXPT_LOD) 부수 적용은 Phase 3 판단.

## Linked OGN IDs

- `ogn-mbr-auth-select` (NEW, shared with FP-003-0 at OGN level) — POL-MBR-AUTH-002-01, POL-MBR-AUTH-002-05, POL-MBR-AUTH-002-09
- `ogn-mbr-auth-request` (NEW, shared with FP-003-0 at OGN level) — POL-MBR-AUTH-001-01, POL-MBR-AUTH-003-01, POL-MBR-AUTH-003-03, POL-MBR-AUTH-004-01, POL-MBR-AUTH-004-02, POL-MBR-AUTH-005-01, POL-MBR-AUTH-005-03, POL-MBR-AUTH-005-07

Both OGNs are NEW builds. OGN-level reuse across FP-003/FP-008 is allowed (SB declares shared usage). Legacy-screen / legacy-organism reuse is forbidden and not used.

## SB-only facts (NOT policy-confirmed)

- FP-008-E4 "외부 인증기관 오류 → 대체 수단 안내": no policy in policy-core. Treat as generic system-error surface via UXPT_ERR; do NOT invent 대체 수단 mapping. Needs user/policy decision for concrete alternative behavior.
- POL-MBR-AUTH-002-05 / POL-MBR-AUTH-001-01 sourceText literally says "회원 가입". SB connects the same OGNs/policies to the 휴면 해제 screen, so the meaning (default 3 methods, 본인인증 mandatory gate) is applied here as policy intent. The 휴면 해제 framing is a flow-context copy adaptation, not a new policy. If product requires 휴면 해제-specific auth rules distinct from 가입, that needs a policy decision (not present in policy-core).
- SB server-control items + `text-field-auth-timer`: same as FP-003-0 — defaults are policy-backed; presentation is Phase 3.
