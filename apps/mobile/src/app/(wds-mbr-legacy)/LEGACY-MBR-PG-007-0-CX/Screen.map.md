# LEGACY-MBR-PG-007-0-CX — 회원 가입 약관 동의 Map

## Screen Scope

- screenId: `LEGACY-MBR-PG-007-0-CX`
- source: current `Screen.tsx`
- pattern: `form-entry`
- route: `/LEGACY-MBR-PG-007-0-CX`
- policyRefs: `structural-only`
- ognIds: `ogn-mbr-consent-intro`, `ogn-mbr-consent-terms-section`, `ogn-mbr-consent-terms-accordion`, `ogn-mbr-consent-actions`
- governanceRefs: `TBD`
- implementationBoundary: Legacy-converted metadata is reverse-engineered from the current implementation and `ConsentTermsAccordion`. No policy-core source is confirmed for legal terms text, minor consent branching, or all-agree semantics.

## Requirement Matrix

| requirement | sourceRef | screen role | user copy | mapped section | OGN | status |
| --- | --- | --- | --- | --- | --- | --- |
| `LEGACY-MBR-CONSENT-INTRO` | current `Screen.tsx` | introduce signup consent step | `회원 가입 1단계 (1/5)`, `약관에 동의하고 가입을 시작하세요`, `필수 약관에 동의하면 다음 단계로 진행할 수 있어요. 선택 약관은 나중에 변경할 수 있습니다.` | `intro` | `ogn-mbr-consent-intro` | structural-only |
| `LEGACY-MBR-CONSENT-TERMS` | current `Screen.tsx` | group terms consent and related guidance | `약관 동의`, `법정대리인 동의 안내`, `만 14세 미만 고객은 법정대리인 동의 요청이 함께 진행됩니다.` | `terms` | `ogn-mbr-consent-terms-section` | structural-only; policy TBD |
| `LEGACY-MBR-CONSENT-TERMS-ACCORDION` | `ConsentTermsAccordion.tsx` | collect all/individual required and optional terms consent | `전체 동의 (필수·선택 약관 모두)`, `[필수] T 우주 서비스 이용약관 (v3.2)`, `[필수] 개인정보 수집·이용 동의 (v5.1)`, `[선택] 혜택·이벤트 정보 수신 동의` | `termsAccordion` | `ogn-mbr-consent-terms-accordion` | structural-only; legal source TBD |
| `LEGACY-MBR-CONSENT-ACTIONS` | current `Screen.tsx` | block progression until required terms are checked | `동의하고 계속하기` | `actions` | `ogn-mbr-consent-actions` | structural-only |

## Governance Review

| ref | selectionReason | affectedRequirement | impact | notApplicableReason |
| --- | --- | --- | --- | --- |
| `UXPT_BTN` | Candidate only: bottom CTA has disabled/enabled progression behavior. | `LEGACY-MBR-CONSENT-ACTIONS` | Preserve one fixed primary action and no secondary action. | Governance source not formally mapped for this legacy-converted screen. |
| `UXPT_NAV` | Candidate only: screen uses header back navigation in a multi-step flow. | `LEGACY-MBR-CONSENT-INTRO` | Preserve AppBar ownership of navigation. | Governance source not formally mapped for this legacy-converted screen. |
| `UXPT_ERR` | Candidate only: consent flows may have blocking/error states, but the current screen only shows disabled CTA. | `LEGACY-MBR-CONSENT-TERMS-ACCORDION`, `LEGACY-MBR-CONSENT-ACTIONS` | Do not add error copy unless a policy/state source is confirmed. | Governance source not formally mapped for this legacy-converted screen. |
| `VOT_RUL` | Candidate only: existing copy is concise and task-oriented. | all requirements | Do not rewrite copy while metadata is structural-only. | Governance source not formally mapped for this legacy-converted screen. |

## Policy Notes

- Do not create policy IDs for this screen until policy-core has confirmed terms and consent requirements.
- Current implementation blocks CTA until `REQUIRED_CONSENT_IDS` are checked.
- Current implementation defines `service` and `privacy` as required and `marketing` as optional inside `ConsentTermsAccordion`.
- Current implementation's accordion body text contains placeholders and should not be treated as verified legal text.
- Current implementation shows a legal guardian callout only as guidance; it does not branch to a legal guardian consent flow.
