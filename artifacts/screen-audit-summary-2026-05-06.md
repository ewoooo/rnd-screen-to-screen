# Screen Audit Summary — 2026-05-06

기준: `packages/screens/spec/active`의 active spec 69개와 대응 `.sdui.json` 렌더 트리.

범위: 설계 의도 / spec / SDUI 렌더 계약 일치 여부. 실제 브라우저 스크린샷 픽셀 검수는 별도.

## 전체 요약

| 도메인 | 총 화면 | OK | Needs Review | System Gap |
|---|---:|---:|---:|---:|
| billing | 30 | 23 | 7 | 0 |
| membership | 7 | 0 | 2 | 5 |
| nc-full | 16 | 0 | 0 | 16 |
| nc-simple | 16 | 0 | 9 | 7 |
| **합계** | **69** | **23** | **18** | **28** |

## 판정 기준

| 판정 | 의미 |
|---|---|
| OK | 설계 의도, spec, SDUI 렌더 계약이 대체로 일치 |
| Needs Review | 구조는 있으나 `area.uses`와 render node 명칭 등 계약 명칭 불일치 확인 필요 |
| System Gap | 신규 컴포넌트, variant, slot, prop 등 시스템 확장 후보가 기록됨 |

## 판정이 필요한 화면

| 도메인 | 화면 | route | 판정 | 이슈 / 조치 |
|---|---|---|---|---|
| billing | 자동 선결제 설정 | `/billing-set-auto-prepay` | Needs Review | `area.uses`와 render node 명칭 불일치 |
| billing | 콘텐츠 이용료 한도 | `/billing-set-content-limit` | Needs Review | `area.uses`와 render node 명칭 불일치 |
| billing | 납부방법 신청·변경 | `/billing-set-method` | Needs Review | `area.uses`와 render node 명칭 불일치 |
| billing | 납부방법 해지 | `/billing-set-method-cancel` | Needs Review | `area.uses`와 render node 명칭 불일치 |
| billing | 납부방법 해지 결과 | `/billing-set-method-cancel-result` | Needs Review | `area.uses`와 render node 명칭 불일치 |
| billing | 휴대폰 결제 이용한도 | `/billing-set-msc-limit` | Needs Review | `area.uses`와 render node 명칭 불일치 |
| billing | 요금안내서 수신 설정 | `/billing-set-statement` | Needs Review | `area.uses`와 render node 명칭 불일치 |
| membership | 본인인증 | `/membership-identity-verification` | System Gap | `SelectableItem.leading prop` 필요 |
| membership | 가입 완료 | `/membership-join-complete` | System Gap | `MembershipSummaryCard`, `MembershipResultActions` |
| membership | 탈퇴 결과 안내 | `/membership-leave-complete` | Needs Review | `area.uses`와 render node 명칭 불일치 |
| membership | 탈퇴 영향 안내 | `/membership-leave-impact` | System Gap | `ConfirmRow` 후보 |
| membership | 탈퇴 사유 입력 | `/membership-leave-reason` | Needs Review | `area.uses`와 render node 명칭 불일치 |
| membership | 개인정보 입력 | `/membership-personal-info` | System Gap | `MembershipPersonalInfoForm` |
| membership | 약관 동의 | `/membership-terms-consent` | System Gap | `organisms/membership` 신규 어휘 |
| nc-full | 전체 16개 | `/nc-full-*` | System Gap | `organisms/nc` 계열 신규 어휘로 분류됨 |
| nc-simple | 9개 | `/nc-simple-*` | Needs Review | 주로 `area.uses`와 render node 명칭 불일치 |
| nc-simple | 7개 | `/nc-simple-*` | System Gap | `AuthMethodSelector`, `LoginForm`, `LeaveImpactChecklist`, `ReusedInfoList` 등 |

## 회의용 결론

| 검수 질문 | 현재 결과 |
|---|---|
| 설계서 -> 스펙 -> 렌더가 대체로 맞는가? | billing은 대부분 맞음. membership/nc는 신규 어휘 기록이 많음 |
| spacing/raw style drift가 보이는가? | 이번 계약 검수 기준에서는 raw render hint 없음 |
| 컴포넌트 규칙이 흔들리는가? | `area.uses`와 render node 명칭 불일치 18건 |
| 시스템 확장 신호가 있는가? | 28건. 특히 `organisms/nc`와 인증/결과/개인정보/탈퇴 패턴 |
| 우선 조치 | 1. `Needs Review`는 spec 명칭과 render node 명칭 맞추기 2. `System Gap`은 진짜 신규 어휘인지 기존 molecule로 흡수 가능한지 회의 판단 |
