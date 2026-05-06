# NC Spec / Render Audit — 2026-05-06

범위: `nc-full`, `nc-simple` active spec 32개와 대응 `.sdui.json` 렌더 트리.

검수 질문: 설계서 기준, 스펙, 화면 렌더 계약이 잘 맞는가?

주의: 이 검수는 실제 브라우저 스크린샷 픽셀 검수가 아니라, `x_interfacePlan`, `screen_contract`, `areas`, `design_system_contract`, SDUI `children.type` 기준의 계약 검수다.

## 결론

| 도메인 | 총 화면 | 맞음 | 확인 필요 | 안 맞음 - 시스템 어휘 gap |
|---|---:|---:|---:|---:|
| nc-full | 16 | 0 | 0 | 16 |
| nc-simple | 16 | 0 | 9 | 7 |
| **합계** | **32** | **0** | **9** | **23** |

현재 기준으로는 `nc-full`과 `nc-simple` 모두 "설계서-스펙-렌더가 완전히 잘 맞는다"고 말하기 어렵다.

- `nc-full`: 16개 전부 `organisms/nc` 계열 신규 어휘를 전제로 한다. 화면 의도와 렌더 구조는 이어지지만, 현 시스템 어휘 안에 흡수됐다고 보기 어렵다.
- `nc-simple`: 7개는 신규 어휘 gap, 9개는 스펙의 `area.uses` 명칭과 렌더 node 명칭이 직접 매칭되지 않아 확인이 필요하다.

## 판정 기준

| 판정 | 의미 |
|---|---|
| 맞음 | 설계서 기준, 스펙 area, 렌더 node가 같은 컴포넌트 계약으로 이어짐 |
| 확인 필요 | 화면 구조는 있으나 스펙의 `area.uses`와 렌더 node 명칭이 직접 매칭되지 않음 |
| 안 맞음 - 시스템 어휘 gap | 신규 component/variant/prop이 필요하다고 기록되어 기존 시스템 어휘만으로는 설명 불가 |

## 상세 검수표

| 도메인 | 화면 | route | 설계서 기준 | 스펙 반영 | 렌더 반영 | 판정 | 이슈 / 조치 |
|---|---|---|---|---|---|---|---|
| nc-full | 본인인증 (휴면 해제) | `/nc-full-dormancy-auth` | 목적: 인증 수단 선택 / 위계: hero, required-input, supporting-notice, action / CTA: bottom-sticky / Progress: top-bar-thin | `NcTopBar`, `NcHero`, `SelectableList`, `NcNotice`, `NcContinueBar` | `AppScreen`, `NcHero`, `NcNotice`, `SelectableList` | 안 맞음 - 시스템 어휘 gap | 신규 어휘 후보: `organisms/nc` |
| nc-full | 로그인 (휴면 진입) | `/nc-full-dormancy-login` | 목적: 로그인 / 위계: hero, required-input, supporting-notice, action / CTA: bottom-sticky / Progress: top-bar-thin | `NcTopBar`, `NcHero`, `NcLoginForm`, `NcNotice`, `NcContinueBar` | `AppScreen`, `NcHero`, `NcLoginForm`, `NcNotice` | 안 맞음 - 시스템 어휘 gap | 신규 어휘 후보: `organisms/nc/NcLoginForm` |
| nc-full | 휴면 해제 완료 | `/nc-full-dormancy-result` | 목적: 결과 인지 + 다음 행동 / 위계: hero, result-summary, supporting-notice, actions / CTA: bottom-sticky / Progress: none | `NcTopBar`, `NcHero`, `NcSummaryCard`, `NcNotice`, `NcResultActions` | `AppScreen`, `NcHero`, `NcNotice`, `NcSummaryCard` | 안 맞음 - 시스템 어휘 gap | 신규 어휘 후보: `organisms/nc` |
| nc-full | 약관 재동의 (휴면 해제) | `/nc-full-dormancy-terms` | 목적: 재동의 대상 약관 동의 / 위계: hero, required-input, conditional-notice, action / CTA: bottom-sticky / Progress: top-bar-thin | `NcTopBar`, `NcHero`, `TermsAgreementGroup`, `NcNotice`, `NcContinueBar` | `AppScreen`, `NcHero`, `NcNotice`, `TermsAgreementGroup` | 안 맞음 - 시스템 어휘 gap | 신규 어휘 후보: `organisms/nc` |
| nc-full | 본인인증 | `/nc-full-join-auth` | 목적: 인증 수단 1개 선택 / 위계: hero, required-input, supporting-notice, action / CTA: bottom-sticky / Progress: top-bar-thin | `NcTopBar`, `NcHero`, `SelectableList`, `NcNotice`, `NcContinueBar` | `AppScreen`, `NcHero`, `NcNotice`, `SelectableList` | 안 맞음 - 시스템 어휘 gap | 신규 어휘 후보: `organisms/nc` |
| nc-full | 가입 완료 | `/nc-full-join-complete` | 목적: 결과 확인 + 다음 행동 선택 / 위계: hero, result-summary, supporting-notice, actions / CTA: bottom-sticky / Progress: none | `NcTopBar`, `NcHero`, `NcSummaryCard`, `NcNotice`, `NcResultActions` | `AppScreen`, `NcHero`, `NcNotice`, `NcSummaryCard` | 안 맞음 - 시스템 어휘 gap | 신규 어휘 후보: `NcSummaryCard`, `NcResultActions` |
| nc-full | 개인정보 입력 | `/nc-full-join-info` | 목적: 필수 정보 입력 + 검증 / 위계: hero, required-input, action / CTA: bottom-sticky / Progress: top-bar-thin | `NcTopBar`, `NcHero`, `NcPersonalInfoForm`, `NcContinueBar` | `AppScreen`, `NcHero`, `NcPersonalInfoForm` | 안 맞음 - 시스템 어휘 gap | 신규 어휘 후보: `NcPersonalInfoForm` |
| nc-full | 약관 동의 | `/nc-full-join-terms` | 목적: 필수 약관 동의 + 선택 약관 결정 / 위계: hero, required-input, conditional-notice, action / CTA: bottom-sticky / Progress: top-bar-thin | `NcTopBar`, `NcHero`, `TermsAgreementGroup`, `NcNotice`, `NcContinueBar` | `AppScreen`, `NcHero`, `NcNotice`, `TermsAgreementGroup` | 안 맞음 - 시스템 어휘 gap | 신규 어휘 후보: `NcShell`, `NcTopBar`, `NcHero`, `NcNotice`, `NcContinueBar`, `TermsAgreementGroup` |
| nc-full | 본인인증 (탈퇴) | `/nc-full-leave-auth` | 목적: 인증 수단 선택 / 위계: hero, required-input, supporting-notice, action / CTA: bottom-sticky / Progress: top-bar-thin | `NcTopBar`, `NcHero`, `SelectableList`, `NcNotice`, `NcContinueBar` | `AppScreen`, `NcHero`, `NcNotice`, `SelectableList` | 안 맞음 - 시스템 어휘 gap | 신규 어휘 후보: `organisms/nc` |
| nc-full | 탈퇴 최종 동의 | `/nc-full-leave-confirm` | 목적: 확인 체크 후 탈퇴 확정 / 위계: hero, required-input, action / CTA: bottom-sticky / Progress: top-bar-thin | `NcTopBar`, `NcHero`, `NcLeaveConfirmList`, `NcContinueBar` | `AppScreen`, `NcHero`, `NcLeaveConfirmList` | 안 맞음 - 시스템 어휘 gap | 신규 어휘 후보: `NcLeaveConfirmList`, `NcContinueBar destructive primary tone` |
| nc-full | 탈퇴 전 안내 확인 | `/nc-full-leave-notice` | 목적: 영향 인지 + 다음 단계 진행 / 위계: hero, result-summary, supporting-notice, action / CTA: bottom-sticky / Progress: top-bar-thin | `NcTopBar`, `NcHero`, `NcImpactCard`, `NcNotice`, `NcContinueBar` | `AppScreen`, `NcHero`, `NcImpactCard`, `NcNotice` | 안 맞음 - 시스템 어휘 gap | 신규 어휘 후보: `NcImpactCard` |
| nc-full | 탈퇴 사유 입력 | `/nc-full-leave-reason` | 목적: 사유 선택 + 보조 의견 / 위계: hero, required-input, action / CTA: bottom-sticky / Progress: top-bar-thin | `NcTopBar`, `NcHero`, `NcLeaveReasonForm`, `NcContinueBar` | `AppScreen`, `NcHero`, `NcLeaveReasonForm` | 안 맞음 - 시스템 어휘 gap | 신규 어휘 후보: `NcLeaveReasonForm` |
| nc-full | 탈퇴 결과 안내 | `/nc-full-leave-result` | 목적: 결과 인지 + 다음 행동 / 위계: hero, result-summary, supporting-notice, actions / CTA: bottom-sticky / Progress: none | `NcTopBar`, `NcHero`, `NcSummaryCard`, `NcNotice`, `NcResultActions` | `AppScreen`, `NcHero`, `NcNotice`, `NcSummaryCard` | 안 맞음 - 시스템 어휘 gap | 신규 어휘 후보: `NcResultActions`, `NcSummaryCard` |
| nc-full | 본인인증 (재가입) | `/nc-full-rejoin-auth` | 목적: 인증 수단 선택 / 위계: hero, required-input, supporting-notice, action / CTA: bottom-sticky / Progress: top-bar-thin | `NcTopBar`, `NcHero`, `SelectableList`, `NcNotice`, `NcContinueBar` | `AppScreen`, `NcHero`, `NcNotice`, `SelectableList` | 안 맞음 - 시스템 어휘 gap | 신규 어휘 후보: `organisms/nc` |
| nc-full | 재가입 완료 | `/nc-full-rejoin-complete` | 목적: 결과 인지 + 다음 행동 / 위계: hero, result-summary, supporting-notice, actions / CTA: bottom-sticky / Progress: none | `NcTopBar`, `NcHero`, `NcSummaryCard`, `NcNotice`, `NcResultActions` | `AppScreen`, `NcHero`, `NcNotice`, `NcSummaryCard` | 안 맞음 - 시스템 어휘 gap | 신규 어휘 후보: `organisms/nc` |
| nc-full | 재가입 정보 입력 | `/nc-full-rejoin-info` | 목적: 정보 입력 + 약관 재동의 / 위계: hero, required-input form, required-input consent, action / CTA: bottom-sticky / Progress: top-bar-thin | `NcTopBar`, `NcHero`, `NcPersonalInfoForm`, `TermsAgreementGroup`, `NcContinueBar` | `AppScreen`, `NcHero`, `NcPersonalInfoForm`, `TermsAgreementGroup` | 안 맞음 - 시스템 어휘 gap | 신규 어휘 후보: `NcPersonalInfoForm prefilled state` |
| nc-simple | 휴면 해제 - 본인인증 | `/nc-simple-dormancy-auth` | 목적: 인증 성공 / 위계: hero, method, code, action / CTA: bottom-sticky / Progress: top-bar-thin | `MembershipHero`, `SelectableList`, `FormField`, `MembershipContinueBar` | `AppScreen`, `FormField`, `MembershipHero`, `SelectableList` | 안 맞음 - 시스템 어휘 gap | 신규 어휘 후보: `AuthMethodSelector` |
| nc-simple | 휴면 해제 - 로그인 시도 | `/nc-simple-dormancy-login` | 목적: 로그인 -> 휴면 안내 -> 인증 진입 / 위계: hero, login-form, notice, action / CTA: bottom-sticky / Progress: top-bar-thin | `MembershipHero`, `FormField`, `MembershipNotice`, `MembershipContinueBar` | `AppScreen`, `FormField`, `MembershipHero`, `MembershipNotice` | 안 맞음 - 시스템 어휘 gap | 신규 어휘 후보: `LoginForm` |
| nc-simple | 휴면 해제 - 결과 안내 | `/nc-simple-dormancy-result` | 목적: 정상 세션 진입 / 위계: hero, action / CTA: bottom-sticky / Progress: top-bar-thin | `MembershipHero`, `MembershipResultActions` | `AppScreen`, `MembershipHero` | 확인 필요 | `MembershipResultActions`가 렌더 node에 직접 보이지 않음 |
| nc-simple | 휴면 해제 - 약관 재동의 | `/nc-simple-dormancy-terms` | 목적: 개정 필수 약관 재동의 / 위계: hero, consent-list, action / CTA: bottom-sticky / Progress: top-bar-thin | `MembershipHero`, `TermsAgreementGroup`, `MembershipContinueBar` | `AppScreen`, `MembershipHero`, `TermsAgreementGroup` | 확인 필요 | `MembershipContinueBar`가 렌더 node에 직접 보이지 않음 |
| nc-simple | 회원 가입 - 본인인증 | `/nc-simple-join-auth` | 목적: 본인인증 성공 / 위계: hero, method, code-input, action / CTA: bottom-sticky / Progress: top-bar-thin | `MembershipHero`, `SelectableList`, `FormField`, `MembershipContinueBar` | `AppScreen`, `FormField`, `MembershipHero`, `SelectableList` | 안 맞음 - 시스템 어휘 gap | 신규 어휘 후보: `AuthMethodSelector` |
| nc-simple | 회원 가입 - 완료 | `/nc-simple-join-complete` | 목적: 완료 확인 + 홈 진입 / 위계: hero, summary, action / CTA: bottom-sticky / Progress: top-bar-thin | `MembershipHero`, `MembershipSummaryCard`, `MembershipResultActions` | `AppScreen`, `MembershipHero`, `MembershipSummaryCard` | 확인 필요 | `MembershipResultActions`가 렌더 node에 직접 보이지 않음 |
| nc-simple | 회원 가입 - 개인정보 입력 | `/nc-simple-join-info` | 목적: 필수 4항목 입력 + 검증 통과 / 위계: hero, form, action / CTA: bottom-sticky / Progress: top-bar-thin | `MembershipHero`, `MembershipPersonalInfoForm`, `MembershipContinueBar` | `AppScreen`, `MembershipHero`, `MembershipPersonalInfoForm` | 확인 필요 | `MembershipContinueBar`가 렌더 node에 직접 보이지 않음 |
| nc-simple | 회원 가입 - 약관 동의 | `/nc-simple-join-terms` | 목적: 필수 약관 전체 동의 후 다음 단계 진행 / 위계: hero, consent-list, action / CTA: bottom-sticky / Progress: top-bar-thin | `MembershipHero`, `TermsAgreementGroup`, `MembershipContinueBar` | `AppScreen`, `MembershipHero`, `TermsAgreementGroup` | 확인 필요 | `MembershipContinueBar`가 렌더 node에 직접 보이지 않음 |
| nc-simple | 회원 탈퇴 - 본인인증 | `/nc-simple-leave-auth` | 목적: 고위험 인증 / 위계: hero, notice, method, code, action / CTA: bottom-sticky / Progress: top-bar-thin | `MembershipHero`, `MembershipNotice`, `SelectableList`, `FormField`, `MembershipContinueBar` | `AppScreen`, `FormField`, `MembershipHero`, `MembershipNotice`, `SelectableList` | 안 맞음 - 시스템 어휘 gap | 신규 어휘 후보: `AuthMethodSelector` |
| nc-simple | 회원 탈퇴 - 영향 확인 + 최종 동의 | `/nc-simple-leave-confirm` | 목적: 영향 + 동의 -> 탈퇴 / 위계: hero, impact-checklist, final-consent, action / CTA: bottom-sticky / Progress: top-bar-thin | `MembershipHero`, `ConsentList`, `MembershipContinueBar` | `AppScreen`, `ConsentList`, `MembershipHero` | 안 맞음 - 시스템 어휘 gap | 신규 어휘 후보: `LeaveImpactChecklist`, `Button variant=destructive` |
| nc-simple | 회원 탈퇴 - 사유 입력 | `/nc-simple-leave-reason` | 목적: 사유 입력 / 위계: hero, reason, action / CTA: bottom-sticky / Progress: top-bar-thin | `MembershipHero`, `MembershipReasonForm`, `MembershipContinueBar` | `AppScreen`, `MembershipHero`, `MembershipReasonForm` | 확인 필요 | `MembershipContinueBar`가 렌더 node에 직접 보이지 않음 |
| nc-simple | 회원 탈퇴 - 결과 안내 | `/nc-simple-leave-result` | 목적: 철회 가능성 인지 / 위계: hero, summary, notice, action / CTA: bottom-sticky / Progress: top-bar-thin | `MembershipHero`, `MembershipSummaryCard`, `MembershipNotice`, `MembershipResultActions` | `AppScreen`, `MembershipHero`, `MembershipNotice`, `MembershipSummaryCard` | 확인 필요 | `MembershipResultActions`가 렌더 node에 직접 보이지 않음 |
| nc-simple | 재가입 - 본인인증 | `/nc-simple-rejoin-auth` | 목적: 인증 + 자동 판정 / 위계: hero, method, code, action / CTA: bottom-sticky / Progress: top-bar-thin | `MembershipHero`, `SelectableList`, `FormField`, `MembershipContinueBar` | `AppScreen`, `FormField`, `MembershipHero`, `SelectableList` | 안 맞음 - 시스템 어휘 gap | 신규 어휘 후보: `AuthMethodSelector` |
| nc-simple | 재가입 - 제한 안내 | `/nc-simple-rejoin-blocked` | 목적: 사유 인지 / 위계: hero, summary, notice, action / CTA: bottom-sticky / Progress: none | `MembershipHero`, `MembershipSummaryCard`, `MembershipNotice`, `MembershipResultActions` | `AppScreen`, `MembershipHero`, `MembershipNotice`, `MembershipSummaryCard` | 확인 필요 | `MembershipResultActions`가 렌더 node에 직접 보이지 않음 |
| nc-simple | 재가입 - 완료 | `/nc-simple-rejoin-complete` | 목적: 정상 세션 진입 / 위계: hero, action / CTA: bottom-sticky / Progress: top-bar-thin | `MembershipHero`, `MembershipResultActions` | `AppScreen`, `MembershipHero` | 확인 필요 | `MembershipResultActions`가 렌더 node에 직접 보이지 않음 |
| nc-simple | 재가입 - 약관 동의 + 정보 입력 | `/nc-simple-rejoin-info` | 목적: 약관 + 정보 통합 / 위계: hero, terms, reused-info, form, action / CTA: bottom-sticky / Progress: top-bar-thin | `MembershipHero`, `TermsAgreementGroup`, `InfoList`, `MembershipPersonalInfoForm`, `MembershipContinueBar` | `AppScreen`, `InfoList`, `MembershipHero`, `MembershipPersonalInfoForm`, `TermsAgreementGroup` | 안 맞음 - 시스템 어휘 gap | 신규 어휘 후보: `ReusedInfoList` |

## 회의용 판단

| 질문 | 판단 |
|---|---|
| 설계서와 스펙이 맞는가? | 대체로 의도/위계/CTA는 스펙에 반영되어 있음 |
| 스펙과 렌더가 맞는가? | 일부 렌더 node가 스펙 area 명칭과 직접 매칭되지 않아 확인 필요 |
| 기존 디자인 시스템 어휘로 표현됐는가? | 아니오. `nc-full`은 전부, `nc-simple`은 일부가 신규 NC 어휘를 요구 |
| 바로 보고해야 할 포인트 | 화면 자체가 비어 있거나 목적이 빠진 문제보다는, NC 전용 organism을 시스템 어휘로 인정할지 또는 기존 membership/molecule 어휘로 흡수할지 결정이 필요 |
