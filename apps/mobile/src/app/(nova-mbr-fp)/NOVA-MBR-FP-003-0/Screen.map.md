# NOVA-MBR-FP-003-0 · Screen.map.md

> Phase 2 SOT. Owns policy meaning + governance selection only. No layout, spacing, component, or route decisions.

## Screen Identity

- screenId: `NOVA-MBR-FP-003-0`
- screenName: 본인인증
- screenDescription: 가입자의 본인 여부를 확인한다.
- flowContext: 가입 플로우 (약관 동의 > 개인정보 입력 > 본인인증)
- domain: `MBR`
- policyGroup: `PG-MBR-AUTH-001`, `PG-MBR-AUTH-002`, `PG-MBR-AUTH-003`, `PG-MBR-AUTH-004`, `PG-MBR-AUTH-005`
- function: `FN-MBR-COM-002`
- pattern: `form`
- transition: `NOVA-MBR-FP-003-0 → NOVA-MBR-FP-004-0` (본인인증 완료; 전달 데이터: 인증세션ID, 인증결과, 세션ID)
- sbSource: `SB-MBR-UC01_02-0513/screen/NOVA-MBR-FP-003-0.md`, `organism/ogn-mbr-auth-select.md`, `organism/ogn-mbr-auth-request.md`

## Policy Coverage Matrix

| screen | OGN | SB policy IDs | present policy IDs | missing | verdict | next |
|---|---|---|---|---|---|---|
| NOVA-MBR-FP-003-0 | ogn-mbr-auth-select | POL-MBR-AUTH-002-01, POL-MBR-AUTH-002-05, POL-MBR-AUTH-002-09 | POL-MBR-AUTH-002-01, POL-MBR-AUTH-002-05, POL-MBR-AUTH-002-09 | — | green | map |
| NOVA-MBR-FP-003-0 | ogn-mbr-auth-request | POL-MBR-AUTH-001-01, POL-MBR-AUTH-003-01, POL-MBR-AUTH-003-03, POL-MBR-AUTH-004-01, POL-MBR-AUTH-004-02, POL-MBR-AUTH-005-01, POL-MBR-AUTH-005-03, POL-MBR-AUTH-005-07 | all 8 present | — | green | map |

All SB-referenced policy IDs resolve in `packages/policy-core/policies/MBR/AUTH/`. Coverage = GREEN for both OGNs. No `missingPolicyIds`, no blocked items. Both OGNs proceed to Implementation Map.

## Policy → Screen Requirement Matrix

sourceRef path is the policy-core `.policy.ts` file. sourceText/copy quoted from policy-core (policy-core is SOT; SB prose is not used to define requirements).

### OGN: ogn-mbr-auth-select (인증수단 선택)

| policyId | title | sourceText | sourceRef | requirement on screen | type |
|---|---|---|---|---|---|
| POL-MBR-AUTH-002-01 | 허용 인증수단 | 본인인증 수단은 휴대폰, PASS, 공동인증서 중 하나를 사용한다. | packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-002-01.policy.ts | 인증수단 선택지는 휴대폰 / PASS / 공동인증서 3개로 한정. 하나만 선택(상호배타). | choice / constraint |
| POL-MBR-AUTH-002-05 | 기본 노출 인증수단 | 회원 가입 본인인증 화면의 기본 노출 인증수단은 휴대폰, PASS, 공동인증서이다. | packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-002-05.policy.ts | 진입 시 3개 인증수단을 기본 노출. 서버 제어로 노출/순서/개수 조정 가능하나 기본은 3개. | required info |
| POL-MBR-AUTH-002-09 | 인증수단 노출 순서 | 인증수단은 휴대폰, PASS, 공동인증서 순서로 노출한다. | packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-002-09.policy.ts | 노출 순서 고정: 1)휴대폰 2)PASS 3)공동인증서. | constraint |

Required information: 선택 가능한 인증수단 목록과 각 수단 라벨, 현재 선택 상태.
Choices: 휴대폰 / PASS / 공동인증서 (단일 선택, radio semantics).
Constraints: 허용 수단 3종만, 노출 순서 고정, 영역 전체 숨김(서버 제어로 0개일 때 영역 비노출 — SB 오류 처리 방식 = `영역 전체 숨김`).
Validation/error: 인증수단을 선택하지 않으면 다음 단계(인증 요청)로 진행 불가. (POL-MBR-AUTH-002-01.copy.error: "허용된 인증수단을 선택해 주세요")
States: `default`(목록 표시), `loading`(목록 로딩 중 — skeleton).

User copy (policy-derived):
- section title (requirement copy 기반): "본인인증 수단을 선택해 주세요" (POL-MBR-AUTH-002-01.copy.requirement: "휴대폰, PASS, 공동인증서 중 선택")
- option labels: "휴대폰", "PASS", "공동인증서" (정책 명시 어휘 그대로; 순서 POL-MBR-AUTH-002-09)
- load failure (POL-MBR-AUTH-002-05.copy.error): "사용 가능한 인증수단을 불러오지 못했습니다"

### OGN: ogn-mbr-auth-request (본인인증 요청)

| policyId | title | sourceText | sourceRef | requirement on screen | type |
|---|---|---|---|---|---|
| POL-MBR-AUTH-001-01 | 회원 가입 본인인증 적용 | 회원 가입 시 본인인증을 적용한다. | packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-001-01.policy.ts | 가입 진행에 본인인증 완료가 필수. 미완료 시 다음 단계 차단. | constraint / CTA gate |
| POL-MBR-AUTH-003-01 | 인증번호 자리수 | 인증번호는 6자리이다. | packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-003-01.policy.ts | 인증번호 입력은 6자리 숫자. maxLength=6, numeric. | required info / validation |
| POL-MBR-AUTH-003-03 | 인증번호 유효시간 | 인증번호의 유효시간은 3분이다. | packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-003-03.policy.ts | 인증번호 발송 후 3분(180s) 유효. 잔여 시간 표시. 만료 시 재요청 필요. | constraint / state |
| POL-MBR-AUTH-004-01 | 재요청 쿨다운 | 인증번호 재요청 쿨다운 시간은 60초이다. | packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-004-01.policy.ts | 재요청 버튼은 발송 후 60초 쿨다운. 쿨다운 중 비활성/카운트다운. | constraint / state |
| POL-MBR-AUTH-004-02 | 재요청 최대 횟수 | 인증번호 재요청은 최대 5회까지 허용한다. | packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-004-02.policy.ts | 재요청 최대 5회. 초과 시 재요청 차단 + 안내. | constraint / error |
| POL-MBR-AUTH-005-01 | 인증 실패 최대 횟수 | 본인인증 실패는 최대 5회까지 허용한다. | packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-005-01.policy.ts | 인증번호 검증 실패 최대 5회. 초과 시 제한 처리. | constraint / error |
| POL-MBR-AUTH-005-03 | 인증 제한 시간 | 인증 실패 한도 초과 시 10분 동안 인증을 제한한다. | packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-005-03.policy.ts | 한도 초과 시 10분간 모든 인증 입력 차단(blocked 상태). | constraint / blocked state |
| POL-MBR-AUTH-005-07 | 인증 실패 안내 문구 | 인증 실패 시 재시도 또는 제한 처리 안내 문구를 노출한다. | packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-005-07.policy.ts | 실패 시 재시도 가능/제한 처리 안내 메시지 노출. | error copy |

Required information: 인증번호 입력 필드, 잔여 유효시간(타이머), 재요청 버튼(쿨다운/잔여 횟수 반영), 인증 확인 액션.
Choices: 없음(입력형). 재요청은 조건부 액션.
Constraints/validation:
- 인증번호 6자리 숫자만 (POL-MBR-AUTH-003-01)
- 유효시간 180초, 만료 시 무효 (POL-MBR-AUTH-003-03)
- 재요청 쿨다운 60초, 최대 5회 (POL-MBR-AUTH-004-01, POL-MBR-AUTH-004-02)
- 인증 실패 최대 5회 (POL-MBR-AUTH-005-01)
- 한도 초과 시 10분 제한 (POL-MBR-AUTH-005-03)
- 가입에 본인인증 완료 필수 (POL-MBR-AUTH-001-01)

Error / recovery states (case branches FP-003-E1~E4 mapped to policy):
- FP-003-E1 인증번호 만료 → 재발급 안내. copy (POL-MBR-AUTH-003-03.copy.error): "유효시간이 만료되어 다시 요청해 주세요" (cautionary tone)
- FP-003-E2 인증번호 불일치 → 재시도 또는 제한. copy (POL-MBR-AUTH-005-07.copy.error): "인증번호를 확인하거나 잠시 후 다시 시도해 주세요" (negative tone)
- FP-003-E3 인증 실패 한도 초과 → 재시도 제한. copy (POL-MBR-AUTH-005-01.copy.error): "인증 실패 한도(5회)를 초과했습니다" + (POL-MBR-AUTH-005-03.copy.error): "10분 후 다시 시도해 주세요" (negative / blocked)
- FP-003-E4 외부 인증기관 오류 → 대체 수단 안내. NO policy backing in policy-core (SB-only case). See SB-only facts.
- 재요청 쿨다운 차단 copy (POL-MBR-AUTH-004-01.copy.error): "60초 후 다시 요청해 주세요"
- 재요청 횟수 초과 copy (POL-MBR-AUTH-004-02.copy.error): "재요청 한도(5회)를 초과했습니다"
- 본인인증 미완료 copy (POL-MBR-AUTH-001-01.copy.error): "본인인증을 완료해 주세요"

User copy (policy-derived):
- 인증번호 입력 라벨 (POL-MBR-AUTH-003-01.copy.requirement): "인증번호 6자리 입력"
- 6자리 미충족 (POL-MBR-AUTH-003-01.copy.error): "6자리 인증번호를 입력해 주세요"
- 유효시간 안내 (POL-MBR-AUTH-003-03.copy.requirement): "유효시간 3분" (타이머 표기 mm:ss)
- 재요청 가능 안내 (POL-MBR-AUTH-004-01.copy.requirement): "재요청은 60초 후 가능"
- 재요청 횟수 안내 (POL-MBR-AUTH-004-02.copy.requirement): "재요청은 최대 5회"
- 시도 가능 안내 (POL-MBR-AUTH-005-01.copy.requirement): "최대 5회까지 시도 가능"

## Governance Refs

| governanceRef | selectionReason | affectedRequirement | copy/state/CTA impact | source |
|---|---|---|---|---|
| UXPT_BTN | 화면 내 다중 행동(인증 요청, 재요청, 인증 확인, 다음). 단일 Primary 위계 + 동사형 라벨 필요. | POL-MBR-AUTH-001-01 (CTA gate), POL-MBR-AUTH-004-01, POL-MBR-AUTH-004-02 (재요청) | 하단 Primary 1개(가입 진행: "본인인증 완료하기" / 상태 기반 "다음"), 재요청은 Secondary(outline), 인증 확인은 영역 내 strong action. 모호한 "확인" 라벨 금지. | governance/UXPT/Structure Control/UXPT_BTN.md |
| UXPT_ERR | 인라인 입력 에러(불일치/6자리 미충족)와 시스템성 제한(한도 초과/외부기관 오류). 원인+해결 동시 노출 필요. | POL-MBR-AUTH-003-01, POL-MBR-AUTH-005-01, POL-MBR-AUTH-005-03, POL-MBR-AUTH-005-07 | 인증번호 필드 인접에 에러 + 수정 방법 노출. 제한/시스템 오류는 고객 책임 아님 + 복귀 경로 안내. | governance/UXPT/State Control/UXPT_ERR.md |
| UXPT_LOD | ogn-mbr-auth-select `loading` 상태가 skeleton 요구. 레이아웃 점프 방지. | POL-MBR-AUTH-002-05 (목록 로딩) | 인증수단 목록 로딩은 실제 행 레이아웃과 동일한 skeleton. 스피너 단독 금지. | governance/UXPT/State Control/UXPT_LOD.md |
| UXPT_NAV | 다단계 가입 플로우. 뒤로 가기/닫기 시 이전 입력 보존, 직전 단계 복귀. | POL-MBR-AUTH-001-01 (다단계 태스크) | 헤더 back은 직전 단계(개인정보 입력)로, 입력 보존. 인증 진행 중 닫기 시 손실 방지 확인. | governance/UXPT/Structure Control/UXPT_NAV.md |
| VOT_RUL | 모든 안내/에러/버튼 copy의 어체·능동/긍정·호칭 일관성. | 전 정책 copy | 해요체 통일, 능동·긍정형 기본, 미인증 단계이므로 이름 호칭 미사용. 보안 완료 메시지는 합니다체 예외 허용. | governance/VOT/VOT_RUL.md |

Reviewed but not selected (notApplicable variants — generalized to canonical doc IDs):
- UXPT_NAV (GNB variant): notApplicableReason — 가입 플로우 단계 화면으로 전역 GNB 탭 구조와 무관.
- UXPT_ERR (결과 없음 variant): notApplicableReason — 검색/리스트 결과 없음 상태가 아님.
- UXPT_ERR (AI 실패 variant): notApplicableReason — AI 처리 없음.
- UXPT_LOD (AI 생각중 variant): notApplicableReason — AI 처리 없음.
- UXPT_LOD (부분/전체 로딩 variant): reviewed — skeleton이 주 패턴. 인증 요청/확인 버튼 처리 중은 버튼 인라인 로딩(UXPT_LOD)으로 부수 적용(Phase 3 section에서 판단).

## Linked OGN IDs

- `ogn-mbr-auth-select` (NEW) — POL-MBR-AUTH-002-01, POL-MBR-AUTH-002-05, POL-MBR-AUTH-002-09
- `ogn-mbr-auth-request` (NEW) — POL-MBR-AUTH-001-01, POL-MBR-AUTH-003-01, POL-MBR-AUTH-003-03, POL-MBR-AUTH-004-01, POL-MBR-AUTH-004-02, POL-MBR-AUTH-005-01, POL-MBR-AUTH-005-03, POL-MBR-AUTH-005-07

Both OGNs are new builds (no legacy reuse). Every mapped requirement is linked to at least one OGN.

## SB-only facts (NOT policy-confirmed — flagged, not implementation-confirmed)

- FP-003-E4 "외부 인증기관 오류 → 대체 수단 안내": no policy in policy-core (no POL-MBR-AUTH-* for external auth-agency failure). Treat the screen-level case as a generic system-error surface via UXPT_ERR copy ("일시적으로 처리할 수 없어요, 잠시 후 다시 시도해 주세요"); do NOT invent 대체 수단 mapping or eligibility logic. Needs user/policy decision if a concrete alternative-method behavior is required.
- SB component `text-field-auth-timer` (timer as a text-field): structural SB hint only. Policy POL-MBR-AUTH-003-03 confirms the 3-minute meaning; the timer presentation belongs to Phase 3.
- SB server-control items (유형/순서/개수 for select; 유형 for request): SB-only runtime control; policy fixes default = 3 methods, fixed order. Defaults are policy-backed; dynamic overrides are runtime concern, not a screen requirement to author.
