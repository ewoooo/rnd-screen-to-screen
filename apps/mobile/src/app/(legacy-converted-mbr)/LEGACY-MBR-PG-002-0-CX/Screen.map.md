# LEGACY-MBR-PG-002-0-CX — 가입 완료 Map

## Screen Identity

- screenId: `LEGACY-MBR-PG-002-0-CX`
- domain: `membership`
- group: `legacy-converted-mbr`
- task: 회원 가입 완료 상태를 확인하고 홈 또는 내정보로 이동한다.
- state: 가입 완료 정적 상태. 본문 상태 분기 없음.
- primaryCta: `홈으로 가기`
- secondaryCta: `내정보 확인`
- source: current legacy-converted CX screen
- generationMode: `legacy-conversion-structural-backfill`
- reverseEngineeringSource: current `Screen.tsx` is the visual/structural truth for this metadata pass.
- evidenceMode: structural-only / TBD. No policy-core membership completion policy IDs were verified in this worker scope.

## Source Inputs

| Source | Reference | Used For |
| --- | --- | --- |
| Converted screen | `apps/mobile/src/app/(legacy-converted-mbr)/LEGACY-MBR-PG-002-0-CX/Screen.tsx` | current copy, section order, CTA structure, summary rows |
| Current diagram | `apps/mobile/src/app/(legacy-converted-mbr)/LEGACY-MBR-PG-002-0-CX/Screen.diagram.md` | latest Screen Contract, section contract, layoutContract, component candidate 연결 |
| Wire reference | `apps/mobile/src/app/(cx)/CX-EXAMPLE-COMPLETE-ACTIVATION/Screen.diagram.md` | complete hero + summary + fixed bottom action contract comparison |
| Design docs | `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md` | completion pattern, rails, spacing/token guardrails |

## Policy Requirement Matrix

| Policy Tag / ID | Source Ref | Requirement Type | Requirement | User-Facing Copy | Screen Expression | OGN ID | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `STRUCTURAL-MBR-COMPLETE-APP-BAR` | current `Screen.tsx` | structural-only | 완료 화면에서 닫기 affordance와 화면 제목을 제공한다. | `가입 완료`, `닫기` | AppBar with close icon | `ogn-mbr-complete-app-bar` | `structural-only` |
| `TBD-MBR-SIGNUP-COMPLETE-HERO` | current `Screen.tsx` | result | 가입 완료 상태와 서비스 이용 가능 상태를 알린다. | `환영합니다,\n우주에 오신 걸`, `가입이 완료되었어요...` | complete hero | `ogn-mbr-complete-hero` | `TBD-policy-source` |
| `TBD-MBR-SIGNUP-COMPLETE-SUMMARY` | current `Screen.tsx` | result-summary | 가입 완료 결과의 주요 정보를 요약한다. | `회원 ID`, `가입일`, `자동 로그인` | detail summary card | `ogn-mbr-signup-complete-summary` | `TBD-policy-source` |
| `TBD-MBR-SIGNUP-BENEFIT-NOTICE` | current `Screen.tsx` | notice | 신규 가입 혜택 적용 사실을 안내한다. | `혜택`, `신규 가입 첫 달 멤버십 무료 혜택...` | callout notice | `ogn-mbr-signup-benefit-notice` | `TBD-policy-source` |
| `TBD-MBR-SIGNUP-COMPLETE-ACTIONS` | current `Screen.tsx` | action | 가입 완료 후 내정보 확인 또는 홈 진입 행동을 제공한다. | `내정보 확인`, `홈으로 가기` | fixed bottom two-action CTA | `ogn-mbr-complete-actions` | `TBD-policy-source` |

## User Copy

| Copy Role | Copy | Policy Basis | OGN ID |
| --- | --- | --- | --- |
| app-bar-title | `가입 완료` | `STRUCTURAL-MBR-COMPLETE-APP-BAR` | `ogn-mbr-complete-app-bar` |
| app-bar-left-label | `닫기` | `STRUCTURAL-MBR-COMPLETE-APP-BAR` | `ogn-mbr-complete-app-bar` |
| step-caption | `회원 가입 5/5 · 가입 완료` | `TBD-MBR-SIGNUP-COMPLETE-HERO` | `ogn-mbr-complete-hero` |
| title | `환영합니다,\n우주에 오신 걸` | `TBD-MBR-SIGNUP-COMPLETE-HERO` | `ogn-mbr-complete-hero` |
| description | `가입이 완료되었어요. 자동 로그인 상태이며, 첫 화면부터 모든 서비스를 이용할 수 있어요.` | `TBD-MBR-SIGNUP-COMPLETE-HERO` | `ogn-mbr-complete-hero` |
| section-title | `이 정보로 가입이 완료됐어요` | `TBD-MBR-SIGNUP-COMPLETE-SUMMARY` | `ogn-mbr-signup-complete-summary` |
| summary-card-title | `가입 정보` | `TBD-MBR-SIGNUP-COMPLETE-SUMMARY` | `ogn-mbr-signup-complete-summary` |
| summary-row | `회원 ID` / `wooseong****` | `TBD-MBR-SIGNUP-COMPLETE-SUMMARY` | `ogn-mbr-signup-complete-summary` |
| summary-row | `가입일` / `2026년 4월 30일 (수)` | `TBD-MBR-SIGNUP-COMPLETE-SUMMARY` | `ogn-mbr-signup-complete-summary` |
| summary-row | `자동 로그인` / `이 기기에서 30일 유지` | `TBD-MBR-SIGNUP-COMPLETE-SUMMARY` | `ogn-mbr-signup-complete-summary` |
| notice-title | `혜택` | `TBD-MBR-SIGNUP-BENEFIT-NOTICE` | `ogn-mbr-signup-benefit-notice` |
| notice-body | `신규 가입 첫 달 멤버십 무료 혜택이 자동 적용되었어요. 사용 내역은 내정보에서 확인할 수 있어요.` | `TBD-MBR-SIGNUP-BENEFIT-NOTICE` | `ogn-mbr-signup-benefit-notice` |
| secondary-cta | `내정보 확인` | `TBD-MBR-SIGNUP-COMPLETE-ACTIONS` | `ogn-mbr-complete-actions` |
| primary-cta | `홈으로 가기` | `TBD-MBR-SIGNUP-COMPLETE-ACTIONS` | `ogn-mbr-complete-actions` |

## OGN Mapping

| OGN ID | Role | Policy Inputs | Required Screen Content | Notes |
| --- | --- | --- | --- | --- |
| `ogn-mbr-complete-app-bar` | completion-exit navigation | `STRUCTURAL-MBR-COMPLETE-APP-BAR` | app bar title `가입 완료`, close affordance | structural OGN; no policy-core ref |
| `ogn-mbr-complete-hero` | completion hero | `TBD-MBR-SIGNUP-COMPLETE-HERO` | step caption, completion title, completion description | policy source TBD |
| `ogn-mbr-signup-complete-summary` | result summary | `TBD-MBR-SIGNUP-COMPLETE-SUMMARY` | card title and rows for member ID, joined date, auto-login | data source and policy source TBD |
| `ogn-mbr-signup-benefit-notice` | benefit notice | `TBD-MBR-SIGNUP-BENEFIT-NOTICE` | benefit callout title/body | benefit eligibility/source TBD |
| `ogn-mbr-complete-actions` | completion actions | `TBD-MBR-SIGNUP-COMPLETE-ACTIONS` | secondary `내정보 확인`, primary `홈으로 가기` | destination behavior TBD |

## Section Mapping

| Diagram Section | OGN IDs | Map Basis | Current Screen Evidence | Policy Status |
| --- | --- | --- | --- | --- |
| `[appBar]` | `ogn-mbr-complete-app-bar` | `STRUCTURAL-MBR-COMPLETE-APP-BAR` | `AppBar(title="가입 완료", leftIcon=close, leftLabel="닫기")` | `structural-only` |
| `[completionHero]` | `ogn-mbr-complete-hero` | `TBD-MBR-SIGNUP-COMPLETE-HERO` | `TitleMain(type="complete")` with step caption/title/subtitle | `TBD-policy-source` |
| `[completionSummary]` | `ogn-mbr-signup-complete-summary` | `TBD-MBR-SIGNUP-COMPLETE-SUMMARY` | `TitleSection` + `RQRContentsDetail(title="가입 정보", rows=...)` | `TBD-policy-source` |
| `[benefitNotice]` | `ogn-mbr-signup-benefit-notice` | `TBD-MBR-SIGNUP-BENEFIT-NOTICE` | `Callout(title="혜택")` inside `SectionItem` | `TBD-policy-source` |
| `[actions]` | `ogn-mbr-complete-actions` | `TBD-MBR-SIGNUP-COMPLETE-ACTIONS` | bottom `ActionButton(type="gift", actions=[secondary, primary])` | `TBD-policy-source` |

## Policy Coverage Checklist

- [x] 현재 화면의 모든 visible section이 OGN ID를 가진다.
- [x] 정책 근거가 확인되지 않은 항목은 `TBD-policy-source`로 표기했다.
- [x] navigation chrome은 policy-backed가 아니라 `structural-only`로 분리했다.
- [x] 사용자 copy를 정책 요구와 별도로 분리했다.
- [ ] 가입 완료 hero, summary, benefit, CTA destination의 policy-core sourceRef는 확인되지 않았다.
- [ ] 회원 ID, 가입일, 자동 로그인 값의 데이터 source는 확인되지 않았다.

## Open Questions / Missing Evidence

| Item | Why It Matters | Owner / Next Step |
| --- | --- | --- |
| 가입 완료 정책 ID | 완료 화면의 결과/CTA가 정책서 근거와 연결되어야 한다. | policy-core MBR signup completion 항목 확인 또는 신규 채번 |
| summary 데이터 출처 | 회원 ID 마스킹, 가입일 형식, 자동 로그인 유지 기간은 데이터/정책 규칙일 수 있다. | 가입 API/mock/spec 확인 |
| 첫 달 멤버십 무료 혜택 근거 | 혜택 안내는 사용자 권리/프로모션 조건에 해당한다. | 혜택 정책 또는 프로모션 sourceRef 확인 |
| CTA destination | `내정보 확인`, `홈으로 가기`, close affordance의 라우팅 목적지가 필요하다. | route/action 설계에서 별도 정의 |
