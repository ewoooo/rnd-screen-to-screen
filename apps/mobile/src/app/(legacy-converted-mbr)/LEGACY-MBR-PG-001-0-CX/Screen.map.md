# LEGACY-MBR-PG-001-0-CX — 본인인증 수단 선택 Map

## Screen Identity

- screenId: `LEGACY-MBR-PG-001-0-CX`
- domain: `membership`
- group: `legacy-converted-mbr`
- task: 회원 가입 중 본인인증 수단을 선택한다.
- state: 인증 수단 미선택 초기 상태. 선택 전 primary CTA는 disabled.
- primaryCta: `인증하기`
- source: legacy CX converted screen + policy-core backfill
- generationMode: `legacy-conversion-map-backfill`

## Source Inputs

| Source | Reference | Used For |
| --- | --- | --- |
| Converted screen | `apps/mobile/src/app/(legacy-converted-mbr)/LEGACY-MBR-PG-001-0-CX/Screen.tsx` | 현재 화면 copy, 선택지, CTA 상태 |
| Existing diagram | `apps/mobile/src/app/(legacy-converted-mbr)/LEGACY-MBR-PG-001-0-CX/Screen.diagram.md` | OGN ID, section 의미, 기존 open questions |
| Policy MD | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-002.md` | 허용 인증수단 정책 |
| Policy TS | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-002-01.policy.ts` | 허용 인증수단 sourceRef/copy |
| Policy MD | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-005.md` | 인증 실패 제한 정책 |
| Policy TS | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-005-01.policy.ts` | 인증 실패 최대 횟수 sourceRef/copy |
| Policy TS | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-005-03.policy.ts` | 인증 제한 시간 sourceRef/copy |

## Policy Requirement Matrix

| Policy Tag / ID | Source Ref | Requirement Type | Requirement | User-Facing Copy | Screen Expression | OGN ID | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `POL-MBR-AUTH-002-01` | `NC 회원가입·탈퇴 정책서 Full v1.0 확정본` / `POL-MBR-AUTH-002` | choice | 본인인증 수단은 휴대폰, PASS, 공동인증서 중 하나를 사용한다. | 현재 화면: `카카오톡`, `통신사 PASS`, `휴대전화 문자`, `아이핀(IPIN)` | radio option list | `ogn-mbr-auth-method-selector` | `conflict` — policy-core 허용 수단과 현재 화면 선택지가 다름 |
| `POL-MBR-AUTH-005-01` | `NC 회원가입·탈퇴 정책서 Full v1.0 확정본` / `POL-MBR-AUTH-005` | constraint / error | 본인인증 실패는 최대 5회까지 허용한다. | `인증 5회 연속 실패 시 ... 인증이 제한돼요.` | callout notice | `ogn-mbr-auth-policy-callout` | `mapped` |
| `POL-MBR-AUTH-005-03` | `NC 회원가입·탈퇴 정책서 Full v1.0 확정본` / `POL-MBR-AUTH-005` | constraint / error | 인증 실패 한도 초과 시 10분 동안 인증을 제한한다. | 현재 화면: `30분간 인증이 제한돼요.` | callout notice | `ogn-mbr-auth-policy-callout` | `conflict` — policy-core는 10분, 현재 화면은 30분 |
| `LEGACY-MBR-AUTH-INTRO` | converted screen copy | notice | 회원 가입 본인인증 단계와 재인증 면제 조건을 먼저 안내한다. | `회원 가입 3단계 (3/5)`, `한 번 인증하면 같은 단말에서 30일간 재인증이 면제돼요.` | intro title/subtitle | `ogn-mbr-auth-intro` | `missing-policy-source` |
| `LEGACY-MBR-AUTH-RECOMMENDATION` | converted screen copy | recommendation | 카카오톡 인증 수단을 추천 표시한다. | `추천` | option badge | `ogn-mbr-auth-method-selector` | `missing-policy-source` |
| `LEGACY-MBR-AUTH-EXTERNAL-TERMS` | converted screen copy | notice | 인증기관별 추가 약관 동의가 필요할 수 있다. | `인증기관 별 추가 약관에 동의가 필요할 수 있어요.` | callout notice | `ogn-mbr-auth-policy-callout` | `missing-policy-source` |
| `LEGACY-MBR-AUTH-CTA` | converted screen behavior | action | 인증 수단 선택 후 외부 인증 flow로 진행한다. | `인증하기` | primary CTA, disabled until selection | `ogn-mbr-auth-primary-action` | `missing-policy-source` |

## User Copy

| Copy Role | Copy | Policy Basis | OGN ID |
| --- | --- | --- | --- |
| app-bar-title | `본인인증` | screen task | `ogn-mbr-auth-app-bar` |
| step-caption | `회원 가입 3단계 (3/5)` | `LEGACY-MBR-AUTH-INTRO` | `ogn-mbr-auth-intro` |
| title | `본인 확인을 위해\n인증 수단을 선택해주세요` | `POL-MBR-AUTH-002-01` + screen task | `ogn-mbr-auth-intro` |
| description | `한 번 인증하면 같은 단말에서 30일간 재인증이 면제돼요.` | `LEGACY-MBR-AUTH-INTRO` | `ogn-mbr-auth-intro` |
| section-title | `인증 수단 선택` | `POL-MBR-AUTH-002-01` | `ogn-mbr-auth-method-selector` |
| option-label | `카카오톡` / `통신사 PASS` / `휴대전화 문자` / `아이핀(IPIN)` | current screen copy; conflicts with `POL-MBR-AUTH-002-01` | `ogn-mbr-auth-method-selector` |
| option-description | `가장 빠르고 간편하게 인증할 수 있어요` / `통신 3사 명의 휴대전화로 인증` / `문자로 받은 인증번호 입력` / `주민번호 대체 인증 수단` | current screen copy | `ogn-mbr-auth-method-selector` |
| badge | `추천` | `LEGACY-MBR-AUTH-RECOMMENDATION` | `ogn-mbr-auth-method-selector` |
| notice-title | `인증 정책 안내` | `POL-MBR-AUTH-005` | `ogn-mbr-auth-policy-callout` |
| notice-body | `인증 5회 연속 실패 시 30분간 인증이 제한돼요. 인증기관 별 추가 약관에 동의가 필요할 수 있어요.` | `POL-MBR-AUTH-005-01`, conflicts with `POL-MBR-AUTH-005-03`, plus `LEGACY-MBR-AUTH-EXTERNAL-TERMS` | `ogn-mbr-auth-policy-callout` |
| cta | `인증하기` | `LEGACY-MBR-AUTH-CTA` | `ogn-mbr-auth-primary-action` |

## OGN Mapping

| OGN ID | Role | Policy Inputs | Required Screen Content | Notes |
| --- | --- | --- | --- | --- |
| `ogn-mbr-auth-app-bar` | navigation | screen task | app bar title `본인인증` and back affordance | structural OGN; no policy-core ref |
| `ogn-mbr-auth-intro` | intro | `LEGACY-MBR-AUTH-INTRO`, `POL-MBR-AUTH-002-01` | step caption, main title, 30-day reauth exemption copy | 30-day exemption needs policy-core source |
| `ogn-mbr-auth-method-selector` | choice | `POL-MBR-AUTH-002-01`, `LEGACY-MBR-AUTH-RECOMMENDATION` | single-select auth options and Kakao recommendation badge | current option set conflicts with policy-core |
| `ogn-mbr-auth-policy-callout` | notice / constraint | `POL-MBR-AUTH-005-01`, `POL-MBR-AUTH-005-03`, `LEGACY-MBR-AUTH-EXTERNAL-TERMS` | failure limit notice and external terms notice | duration conflict: 10 minutes in policy-core vs 30 minutes in UI |
| `ogn-mbr-auth-primary-action` | action | `LEGACY-MBR-AUTH-CTA` | disabled `인증하기` CTA until a method is selected | external auth route/SDK is outside this screen |

## Policy Coverage Checklist

- [x] 정책 태그/정책 ID가 matrix에 있다.
- [x] 허용 인증수단 정책이 화면 선택지에 연결됐다.
- [x] 인증 실패 횟수 제한이 notice copy에 연결됐다.
- [x] 사용자 copy가 정책 요구와 별도로 분리됐다.
- [x] 각 mapped 요구사항이 OGN ID를 가진다.
- [ ] policy-core와 현재 화면의 인증 수단 불일치가 해소됐다.
- [ ] policy-core와 현재 화면의 인증 제한 시간 불일치가 해소됐다.
- [ ] 30일 재인증 면제, 카카오 추천, 인증기관 추가 약관, CTA flow의 policy-core 근거가 확인됐다.

## Open Questions / Missing Evidence

| Item | Why It Matters | Owner / Next Step |
| --- | --- | --- |
| 인증 수단 목록 불일치 | policy-core는 휴대폰/PASS/공동인증서를 허용하지만 현재 화면은 카카오톡/PASS/SMS/IPIN을 보여준다. | policy-core 또는 화면 copy 중 어느 쪽을 SOT로 고칠지 결정 |
| 인증 제한 시간 불일치 | policy-core는 10분 제한, 현재 화면은 30분 제한을 안내한다. | 정책 원문 확인 후 `Screen.tsx` copy 또는 policy-core 수정 |
| 30일 재인증 면제 근거 | intro copy의 핵심 혜택/조건이지만 policy-core AUTH 문서에서 근거를 찾지 못했다. | 정책 ID 채번 또는 copy 제거/수정 |
| 카카오톡 추천 근거 | 추천 badge는 사용자의 선택을 유도한다. 정책/사업 근거 없이 유지하면 우선순위 의미가 불명확하다. | 추천 기준 sourceRef 확인 |
| 인증기관 추가 약관 근거 | 외부 인증기관 약관 동의 가능성은 사용자 의무에 해당한다. | 약관/인증 정책 sourceRef 확인 |
| 외부 인증 flow trigger | CTA가 어떤 SDK 또는 route를 호출하는지 현재 map 범위 밖이다. | 구현/라우팅 설계 단계에서 별도 정의 |
