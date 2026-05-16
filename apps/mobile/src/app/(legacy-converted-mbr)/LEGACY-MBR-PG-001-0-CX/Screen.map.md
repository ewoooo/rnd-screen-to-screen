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
- reverseEngineeringSource: current `Screen.tsx` is the visual/structural truth for this metadata pass.
- evidenceMode: policy-backed where IDs are listed; otherwise `missing-policy-source` or `structural-only`.

## Source Inputs

| Source | Reference | Used For |
| --- | --- | --- |
| Latest SB screen | `/Users/wooseong/Desktop/SB-MBR-UC01_02-0513/screen/NOVA-MBR-FP-003-0.md` | 본인인증 화면 task, auth-select/auth-request slot 근거 |
| Latest SB organism | `/Users/wooseong/Desktop/SB-MBR-UC01_02-0513/organism/ogn-mbr-auth-select.md` | 허용 인증수단, 기본 노출 수단, 노출 순서 |
| Latest SB organism | `/Users/wooseong/Desktop/SB-MBR-UC01_02-0513/organism/ogn-mbr-auth-request.md` | 본인인증 적용, 실패/제한 안내 근거 |
| Converted screen | `apps/mobile/src/app/(legacy-converted-mbr)/LEGACY-MBR-PG-001-0-CX/Screen.tsx` | 현재 화면 copy, 선택지, CTA 상태 |
| Current diagram | `apps/mobile/src/app/(legacy-converted-mbr)/LEGACY-MBR-PG-001-0-CX/Screen.diagram.md` | 최신 Screen Contract, section contract, layoutContract, component candidate 연결 |
| Policy MD | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-001.md` | 회원 가입 본인인증 적용 정책 |
| Policy TS | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-001-01.policy.ts` | 본인인증 적용 sourceRef/copy |
| Policy MD | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-002.md` | 허용 인증수단 정책 |
| Policy TS | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-002-01.policy.ts` | 허용 인증수단 sourceRef/copy |
| Policy TS | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-002-05.policy.ts` | 기본 노출 인증수단 sourceRef/copy |
| Policy TS | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-002-09.policy.ts` | 인증수단 노출 순서 sourceRef/copy |
| Policy MD | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-005.md` | 인증 실패 제한 정책 |
| Policy TS | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-005-01.policy.ts` | 인증 실패 최대 횟수 sourceRef/copy |
| Policy TS | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-005-03.policy.ts` | 인증 제한 시간 sourceRef/copy |
| Policy TS | `packages/policy-core/policies/MBR/AUTH/POL-MBR-AUTH-005-07.policy.ts` | 요청/에러 UI 정책. 이 선택 화면에서는 out-of-scope |

## Policy Requirement Matrix

| Policy Tag / ID | Source Ref | Requirement Type | Requirement | User-Facing Copy | Screen Expression | OGN ID | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `POL-MBR-AUTH-001-01` | `SB-MBR-UC01_02-0513` / `ogn-mbr-auth-request` | required-info | 회원 가입 시 본인인증을 적용한다. | `본인 확인을 위해 인증 수단을 선택해주세요` | intro title + auth flow | `ogn-mbr-auth-intro` | `mapped` |
| `POL-MBR-AUTH-002-01` | `NC 회원가입·탈퇴 정책서 Full v1.0 확정본` / `POL-MBR-AUTH-002` | choice | 본인인증 수단은 휴대폰, PASS, 공동인증서 중 하나를 사용한다. | `휴대폰 본인인증`, `PASS 인증`, `공동인증서 인증` | radio option list | `ogn-mbr-auth-select` | `mapped` — 이전 화면 선택지와 충돌해 policy-core 기준으로 수정 |
| `POL-MBR-AUTH-002-05` | `SB-MBR-UC01_02-0513` / `ogn-mbr-auth-select` | choice | 회원 가입 본인인증 화면의 기본 노출 인증수단은 휴대폰, PASS, 공동인증서이다. | `휴대폰 본인인증`, `PASS 인증`, `공동인증서 인증` | radio option list | `ogn-mbr-auth-select` | `mapped` |
| `POL-MBR-AUTH-002-09` | `SB-MBR-UC01_02-0513` / `ogn-mbr-auth-select` | ordering | 인증수단은 휴대폰, PASS, 공동인증서 순서로 노출한다. | 위 순서대로 표시 | radio option order | `ogn-mbr-auth-select` | `mapped` |
| `POL-MBR-AUTH-005-01` | `NC 회원가입·탈퇴 정책서 Full v1.0 확정본` / `POL-MBR-AUTH-005` | constraint / error | 본인인증 실패는 최대 5회까지 허용한다. | `인증 5회 연속 실패 시 ... 인증이 제한돼요.` | callout notice | `ogn-mbr-auth-policy-callout` | `mapped` |
| `POL-MBR-AUTH-005-03` | `NC 회원가입·탈퇴 정책서 Full v1.0 확정본` / `POL-MBR-AUTH-005` | constraint / error | 인증 실패 한도 초과 시 10분 동안 인증을 제한한다. | `10분간 인증이 제한돼요.` | callout notice | `ogn-mbr-auth-policy-callout` | `mapped` — 이전 화면 copy와 충돌해 policy-core 기준으로 수정 |
| `POL-MBR-AUTH-005-07` | `SB-MBR-UC01_02-0513` / `ogn-mbr-auth-request` | error | 인증 실패 시 재시도 또는 제한 처리 안내 문구를 노출한다. | `재시도 또는 제한 처리 안내` | request-side error/blocked notice | `ogn-mbr-auth-request` | `out-of-scope` — 인증번호 입력/검증 요청 UI에서 처리 |
| `LEGACY-MBR-AUTH-INTRO` | converted screen copy | notice | 회원 가입 본인인증 단계와 재인증 면제 조건을 먼저 안내한다. | `회원 가입 3단계 (3/5)`, `한 번 인증하면 같은 단말에서 30일간 재인증이 면제돼요.` | intro title/subtitle | `ogn-mbr-auth-intro` | `missing-policy-source` |
| `LEGACY-MBR-AUTH-EXTERNAL-TERMS` | converted screen copy | notice | 인증기관별 추가 약관 동의가 필요할 수 있다. | `인증기관 별 추가 약관에 동의가 필요할 수 있어요.` | callout notice | `ogn-mbr-auth-policy-callout` | `missing-policy-source` |
| `LEGACY-MBR-AUTH-CTA` | converted screen behavior | action | 인증 수단 선택 후 외부 인증 flow로 진행한다. | `인증하기` | primary CTA, disabled until selection | `ogn-mbr-auth-primary-action` | `missing-policy-source` |
| `STRUCTURAL-MBR-AUTH-APP-BAR` | current `Screen.tsx` | structural-only | 본인인증 화면의 header navigation chrome을 제공한다. | `본인인증` | AppBar with left affordance | `ogn-mbr-auth-app-bar` | `structural-only` |

## User Copy

| Copy Role | Copy | Policy Basis | OGN ID |
| --- | --- | --- | --- |
| app-bar-title | `본인인증` | screen task | `ogn-mbr-auth-app-bar` |
| step-caption | `회원 가입 3단계 (3/5)` | `LEGACY-MBR-AUTH-INTRO` | `ogn-mbr-auth-intro` |
| title | `본인 확인을 위해\n인증 수단을 선택해주세요` | `POL-MBR-AUTH-001-01`, `POL-MBR-AUTH-002-01` + screen task | `ogn-mbr-auth-intro` |
| description | `한 번 인증하면 같은 단말에서 30일간 재인증이 면제돼요.` | `LEGACY-MBR-AUTH-INTRO` | `ogn-mbr-auth-intro` |
| section-title | `인증 수단 선택` | `POL-MBR-AUTH-002-01` | `ogn-mbr-auth-select` |
| option-label | `휴대폰 본인인증` / `PASS 인증` / `공동인증서 인증` | `POL-MBR-AUTH-002-01`, `POL-MBR-AUTH-002-05`, `POL-MBR-AUTH-002-09` | `ogn-mbr-auth-select` |
| option-description | `본인 명의 휴대폰으로 인증` / `통신사 PASS로 인증` / `공동인증서로 인증` | `POL-MBR-AUTH-002-01` | `ogn-mbr-auth-select` |
| notice-title | `인증 정책 안내` | `POL-MBR-AUTH-005` | `ogn-mbr-auth-policy-callout` |
| notice-body | `인증 5회 연속 실패 시 10분간 인증이 제한돼요. 인증기관 별 추가 약관에 동의가 필요할 수 있어요.` | `POL-MBR-AUTH-005-01`, `POL-MBR-AUTH-005-03`, plus `LEGACY-MBR-AUTH-EXTERNAL-TERMS` | `ogn-mbr-auth-policy-callout` |
| cta | `인증하기` | `LEGACY-MBR-AUTH-CTA` | `ogn-mbr-auth-primary-action` |

## OGN Mapping

| OGN ID | Role | Policy Inputs | Required Screen Content | Notes |
| --- | --- | --- | --- | --- |
| `ogn-mbr-auth-app-bar` | navigation | `STRUCTURAL-MBR-AUTH-APP-BAR` | app bar title `본인인증` and back affordance | structural OGN; no policy-core ref |
| `ogn-mbr-auth-intro` | intro | `POL-MBR-AUTH-001-01`, `LEGACY-MBR-AUTH-INTRO`, `POL-MBR-AUTH-002-01` | step caption, main title, 30-day reauth exemption copy | 30-day exemption needs policy-core source |
| `ogn-mbr-auth-select` | choice | `POL-MBR-AUTH-002-01`, `POL-MBR-AUTH-002-05`, `POL-MBR-AUTH-002-09` | single-select auth options: 휴대폰 본인인증, PASS 인증, 공동인증서 인증 in that order | preserves latest SB OGN identity |
| `ogn-mbr-auth-policy-callout` | notice / constraint | `POL-MBR-AUTH-005-01`, `POL-MBR-AUTH-005-03`, `LEGACY-MBR-AUTH-EXTERNAL-TERMS` | failure limit notice and external terms notice | policy-core 10-minute restriction wins over previous 30-minute copy |
| `ogn-mbr-auth-request` | request / error | `POL-MBR-AUTH-003-01`, `POL-MBR-AUTH-003-03`, `POL-MBR-AUTH-004-01`, `POL-MBR-AUTH-004-02`, `POL-MBR-AUTH-005-07` | 인증번호 입력/타이머/재요청/오류 UI | out of scope for this selection-only screen |
| `ogn-mbr-auth-primary-action` | action | `LEGACY-MBR-AUTH-CTA` | disabled `인증하기` CTA until a method is selected | external auth route/SDK is outside this screen |

## Section Mapping

| Diagram Section | OGN IDs | Map Basis | Current Screen Evidence | Policy Status |
| --- | --- | --- | --- | --- |
| `[appBar]` | `ogn-mbr-auth-app-bar` | `STRUCTURAL-MBR-AUTH-APP-BAR` | `AppBar(title="본인인증", showLeftItem, showTitle)` | `structural-only` |
| `[intro]` | `ogn-mbr-auth-intro` | `POL-MBR-AUTH-001-01`, `POL-MBR-AUTH-002-01`, `LEGACY-MBR-AUTH-INTRO` | `TitleMain` step caption, task title, 30-day reauth copy | mixed; 30-day copy is `missing-policy-source` |
| `[authMethod]` | `ogn-mbr-auth-select`, `ogn-mbr-auth-policy-callout` | `POL-MBR-AUTH-002-*`, `POL-MBR-AUTH-005-*`, `LEGACY-MBR-AUTH-EXTERNAL-TERMS` | `TitleSection`, three `RQRListOption(type="radio")`, `Callout` | mixed; external terms copy is `missing-policy-source` |
| `[actions]` | `ogn-mbr-auth-primary-action` | `LEGACY-MBR-AUTH-CTA` | bottom `Button` disabled until `selected != null` | `missing-policy-source` |

## Policy Coverage Checklist

- [x] 정책 태그/정책 ID가 matrix에 있다.
- [x] 허용 인증수단 정책이 화면 선택지에 연결됐다.
- [x] 기본 노출 인증수단과 노출 순서 정책이 선택지 순서에 연결됐다.
- [x] 인증 실패 횟수 제한이 notice copy에 연결됐다.
- [x] 요청/에러 UI 정책(`POL-MBR-AUTH-005-07`)은 이 선택 화면 범위 밖으로 분리됐다.
- [x] 사용자 copy가 정책 요구와 별도로 분리됐다.
- [x] 각 mapped 요구사항이 OGN ID를 가진다.
- [x] policy-core와 이전 화면의 인증 수단 불일치가 policy-core 기준으로 해소됐다.
- [x] policy-core와 이전 화면의 인증 제한 시간 불일치가 policy-core 기준으로 해소됐다.
- [ ] 30일 재인증 면제, 인증기관 추가 약관, CTA flow의 policy-core 근거가 확인됐다.

## Open Questions / Missing Evidence

| Item | Why It Matters | Owner / Next Step |
| --- | --- | --- |
| 30일 재인증 면제 근거 | intro copy의 핵심 혜택/조건이지만 policy-core AUTH 문서에서 근거를 찾지 못했다. | 정책 ID 채번 또는 copy 제거/수정 |
| 인증기관 추가 약관 근거 | 외부 인증기관 약관 동의 가능성은 사용자 의무에 해당한다. | 약관/인증 정책 sourceRef 확인 |
| 외부 인증 flow trigger | CTA가 어떤 SDK 또는 route를 호출하는지 현재 map 범위 밖이다. | 구현/라우팅 설계 단계에서 별도 정의 |
