# NOVA-MBR-FP-003-0 — 본인인증 (UC01 회원가입) Map

## Screen Scope

- screenId: `NOVA-MBR-FP-003-0`
- source: `SB`
- pattern: `form`
- route: `/NOVA-MBR-FP-003-0`
- policyRefs: `POL-MBR-AUTH-001-01`, `POL-MBR-AUTH-002-01`, `POL-MBR-AUTH-002-05`, `POL-MBR-AUTH-002-09`, `POL-MBR-AUTH-003-01`, `POL-MBR-AUTH-003-03`, `POL-MBR-AUTH-004-01`, `POL-MBR-AUTH-004-02`, `POL-MBR-AUTH-005-01`, `POL-MBR-AUTH-005-03`, `POL-MBR-AUTH-005-07`
- ognIds: `ogn-mbr-auth-select`, `ogn-mbr-auth-request`
- selectedGovernanceRefs: `UXPT_BTN`, `UXPT_ERR`, `UXPT_NAV`, `UXPT_LOD`, `VOT_RUL`
- scopeBoundary: This map owns the policy/governance contract for the UC01 회원가입 본인인증 step (약관 동의 > 개인정보 입력 > 본인인증). Screen role is to confirm the applicant's identity and hand off to NOVA-MBR-FP-004-0 on completion. This map does not own layout, spacing, or component vocabulary decisions (Phase 3 responsibility). Authentication backend protocol, OTP delivery channel, and external CA integration are out of screen scope; the screen only surfaces policy-bound requirements, choices, constraints, and error copy.

## Phase 2 Policy / Governance Mapping

### Policy Source Matrix

| policyRef | sourceText | user-facing requirement | mapped section | OGN | visible status |
| --- | --- | --- | --- | --- | --- |
| `POL-MBR-AUTH-001-01` | 회원 가입 시 본인인증을 적용한다. | 회원 가입 시 본인인증 필요 | `auth-request` | `ogn-mbr-auth-request` | visible (notice that 회원 가입에 본인인증이 필요함) |
| `POL-MBR-AUTH-002-01` | 본인인증 수단은 휴대폰, PASS, 공동인증서 중 하나를 사용한다. | 휴대폰, PASS, 공동인증서 중 선택 | `auth-select` | `ogn-mbr-auth-select` | visible (인증수단 선택 목록) |
| `POL-MBR-AUTH-002-05` | 회원 가입 본인인증 화면의 기본 노출 인증수단은 휴대폰, PASS, 공동인증서이다. | 휴대폰, PASS, 공동인증서를 기본 노출 | `auth-select` | `ogn-mbr-auth-select` | visible (3개 인증수단 기본 노출) |
| `POL-MBR-AUTH-002-09` | 인증수단은 휴대폰, PASS, 공동인증서 순서로 노출한다. | 휴대폰, PASS, 공동인증서 순서 | `auth-select` | `ogn-mbr-auth-select` | visible (고정 노출 순서) |
| `POL-MBR-AUTH-003-01` | 인증번호는 6자리이다. | 인증번호 6자리 입력 | `auth-request` | `ogn-mbr-auth-request` | visible (인증번호 입력 필드 6자리) |
| `POL-MBR-AUTH-003-03` | 인증번호의 유효시간은 3분이다. | 유효시간 3분 | `auth-request` | `ogn-mbr-auth-request` | visible (유효시간 타이머) |
| `POL-MBR-AUTH-004-01` | 인증번호 재요청 쿨다운 시간은 60초이다. | 재요청은 60초 후 가능 | `auth-request` | `ogn-mbr-auth-request` | conditional (재요청 버튼 쿨다운 상태에서 노출) |
| `POL-MBR-AUTH-004-02` | 인증번호 재요청은 최대 5회까지 허용한다. | 재요청은 최대 5회 | `auth-request` | `ogn-mbr-auth-request` | conditional (재요청 한도 안내) |
| `POL-MBR-AUTH-005-01` | 본인인증 실패는 최대 5회까지 허용한다. | 최대 5회까지 시도 가능 | `auth-request` | `ogn-mbr-auth-request` | conditional (인증 실패 시 안내) |
| `POL-MBR-AUTH-005-03` | 인증 실패 한도 초과 시 10분 동안 인증을 제한한다. | 한도 초과 시 10분 인증 제한 | `auth-request` | `ogn-mbr-auth-request` | conditional (한도 초과 blocked 상태에서 노출) |
| `POL-MBR-AUTH-005-07` | 인증 실패 시 재시도 또는 제한 처리 안내 문구를 노출한다. | 실패 시 재시도 또는 제한 처리 안내 | `auth-request` | `ogn-mbr-auth-request` | conditional (인증 실패 error 상태에서 노출) |

### Screen Requirement Matrix

| requirement | sourceRef | screen role | user copy (해요체) | mapped section | OGN | status |
| --- | --- | --- | --- | --- | --- | --- |
| `FP-003-AUTH-APPLY` | `POL-MBR-AUTH-001-01` | 회원 가입 단계에서 본인인증이 필요함을 알린다 | `회원 가입을 위해 본인인증을 완료해 주세요` | `auth-request` | `ogn-mbr-auth-request` | mapped |
| `FP-003-AUTH-METHOD-CHOICE` | `POL-MBR-AUTH-002-01` | 허용된 인증수단 중 하나를 선택하게 한다 | `휴대폰, PASS, 공동인증서 중 하나를 선택해 주세요` | `auth-select` | `ogn-mbr-auth-select` | mapped |
| `FP-003-AUTH-METHOD-DEFAULT` | `POL-MBR-AUTH-002-05` | 기본 인증수단 3종을 노출한다 | `휴대폰, PASS, 공동인증서로 인증할 수 있어요` | `auth-select` | `ogn-mbr-auth-select` | mapped |
| `FP-003-AUTH-METHOD-ORDER` | `POL-MBR-AUTH-002-09` | 인증수단을 고정 순서로 노출한다 | 노출 순서는 휴대폰 → PASS → 공동인증서 (별도 안내 문구 없음, 목록 순서로 표현) | `auth-select` | `ogn-mbr-auth-select` | mapped |
| `FP-003-AUTH-CODE-LENGTH` | `POL-MBR-AUTH-003-01` | 6자리 인증번호를 입력받는다 | `6자리 인증번호를 입력해 주세요` | `auth-request` | `ogn-mbr-auth-request` | mapped |
| `FP-003-AUTH-CODE-TTL` | `POL-MBR-AUTH-003-03` | 인증번호 유효시간 3분을 안내·관리한다 | `인증번호는 3분 동안 유효해요` / 만료 시 `유효시간이 만료되어 다시 요청해 주세요` | `auth-request` | `ogn-mbr-auth-request` | mapped |
| `FP-003-AUTH-RESEND-COOLDOWN` | `POL-MBR-AUTH-004-01` | 재요청 60초 쿨다운을 안내한다 | `60초 후 다시 요청해 주세요` | `auth-request` | `ogn-mbr-auth-request` | mapped |
| `FP-003-AUTH-RESEND-LIMIT` | `POL-MBR-AUTH-004-02` | 재요청 최대 5회 한도를 안내한다 | `재요청은 최대 5회까지 할 수 있어요` / 초과 시 `재요청 한도(5회)를 초과했어요` | `auth-request` | `ogn-mbr-auth-request` | mapped |
| `FP-003-AUTH-FAIL-LIMIT` | `POL-MBR-AUTH-005-01` | 인증 실패 최대 5회 한도를 안내한다 | `인증은 최대 5회까지 시도할 수 있어요` / 초과 시 `인증 실패 한도(5회)를 초과했어요` | `auth-request` | `ogn-mbr-auth-request` | mapped |
| `FP-003-AUTH-FAIL-BLOCK` | `POL-MBR-AUTH-005-03` | 한도 초과 시 10분 인증 제한을 안내한다 | `10분 후 다시 시도해 주세요` | `auth-request` | `ogn-mbr-auth-request` | mapped |
| `FP-003-AUTH-FAIL-GUIDE` | `POL-MBR-AUTH-005-07` | 인증 실패 시 재시도 또는 제한 처리 안내를 노출한다 | `인증번호를 확인하거나 잠시 후 다시 시도해 주세요` | `auth-request` | `ogn-mbr-auth-request` | mapped |
| `FP-003-AUTH-COMPLETE-HANDOFF` | SB-MBR-UC01_02-0513 / NOVA-MBR-FP-003-0 화면 전환 | 본인인증 완료 시 다음 단계로 전환한다 | 인증 완료 시 자동 전환, 별도 안내 문구 없음 (전환 대상: NOVA-MBR-FP-004-0) | `auth-request` | `ogn-mbr-auth-request` | mapped |

## Governance Review

| ref | selectionReason | affectedRequirement | impact | notApplicableReason |
| --- | --- | --- | --- | --- |
| `UXPT_BTN` | 인증 요청·인증 확인·재요청이 화면의 주요 실행 행동이며, 상태(쿨다운/한도 초과)에 따라 버튼 노출·활성이 달라진다. | `FP-003-AUTH-APPLY`, `FP-003-AUTH-CODE-LENGTH`, `FP-003-AUTH-RESEND-COOLDOWN`, `FP-003-AUTH-RESEND-LIMIT`, `FP-003-AUTH-COMPLETE-HANDOFF` | 인증 확인을 단일 주요 행동으로 유지하고, 재요청은 보조 행동으로 분리한다. 버튼 라벨은 동사형 행동 표현을 쓰고 상태별로 활성/비활성을 명확히 한다. | - |
| `UXPT_ERR` | 인증번호 만료·불일치·실패 한도 초과·외부 인증기관 오류 등 정책 기반 에러 분기가 존재한다. | `FP-003-AUTH-CODE-TTL`, `FP-003-AUTH-RESEND-LIMIT`, `FP-003-AUTH-FAIL-LIMIT`, `FP-003-AUTH-FAIL-BLOCK`, `FP-003-AUTH-FAIL-GUIDE` | 에러 copy는 정책에 묶이며 해당 실패 상태에서만 노출한다. 만료는 cautionary, 한도 초과/제한은 negative 톤으로 구분해 후속 행동(재요청/대기)을 안내한다. | - |
| `UXPT_NAV` | 회원가입 다중 단계 흐름의 한 단계(약관 동의 > 개인정보 입력 > 본인인증)이며 헤더 뒤로가기 내비게이션을 사용한다. | `FP-003-AUTH-COMPLETE-HANDOFF` | 단계 내비게이션 소유권을 헤더(AppBar)에 두고, 인증 완료 시 NOVA-MBR-FP-004-0로의 전환 흐름을 본문 내 임의 이동으로 대체하지 않는다. | - |
| `UXPT_LOD` | 인증수단 목록 로딩(skeleton)과 인증 요청 API 호출 중 버튼 loading 상태가 SB 케이스 분기에 명시되어 있다. | `FP-003-AUTH-METHOD-CHOICE`, `FP-003-AUTH-METHOD-DEFAULT`, `FP-003-AUTH-CODE-LENGTH` | 인증수단 목록 로딩은 skeleton으로, API 호출 중 버튼은 loading 상태로 표현한다. 로딩 상태에서 사용자 입력·재요청을 차단해 중복 호출을 막는다. | - |
| `VOT_RUL` | 정책에서 파생된 안내·에러 copy가 일관된 사용자 voice(해요체)로 유지되어야 한다. | all mapped requirements | copy는 간결하고 행동 지향적으로, 기존 한국어 voice·해요체와 일관되게 유지한다. 긴 정책 문장은 사용자가 행동 가능한 짧은 UI copy로 정리한다. | - |

## System-Break Signal

- 이 화면은 정책 갭 없음 — 모든 SB(SB-MBR-UC01_02-0513) 참조 정책이 policy-core에 실재한다.
- 매트릭스에 사용한 11개 policyRef(`POL-MBR-AUTH-001-01`, `POL-MBR-AUTH-002-01`, `POL-MBR-AUTH-002-05`, `POL-MBR-AUTH-002-09`, `POL-MBR-AUTH-003-01`, `POL-MBR-AUTH-003-03`, `POL-MBR-AUTH-004-01`, `POL-MBR-AUTH-004-02`, `POL-MBR-AUTH-005-01`, `POL-MBR-AUTH-005-03`, `POL-MBR-AUTH-005-07`)는 모두 `packages/policy-core/policies/MBR/AUTH/` 의 실재 `.policy.ts` 정의이며 sourceText/copy를 SOT로 사용했다.
- SB-only 추론으로 작성한 항목은 `FP-003-AUTH-COMPLETE-HANDOFF`(SB 화면 전환표 기반, 정책 미작성 영역 아님 — SB 원문 명시)이며 별도 정책 갭이 아니다.
