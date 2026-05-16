# LEGACY-MBR-PG-005-0-CX — 회원 탈퇴 사유 Map

## Screen Scope

- screenId: `LEGACY-MBR-PG-005-0-CX`
- source: current `Screen.tsx`
- pattern: `form-entry`
- route: `/LEGACY-MBR-PG-005-0-CX`
- policyRefs: `structural-only`
- ognIds: `ogn-mbr-withdraw-reason-intro`, `ogn-mbr-withdraw-reason-options`, `ogn-mbr-withdraw-reason-free-text`, `ogn-mbr-withdraw-reason-actions`
- governanceRefs: `TBD`
- implementationBoundary: Legacy-converted metadata is reverse-engineered from the current implementation. No policy-core source is confirmed for the withdrawal reason taxonomy, minimum-one-selection rule, or optional free-text behavior.

## Requirement Matrix

| requirement | sourceRef | screen role | user copy | mapped section | OGN | status |
| --- | --- | --- | --- | --- | --- | --- |
| `LEGACY-MBR-WITHDRAW-REASON-INTRO` | current `Screen.tsx` | introduce withdrawal reason step | `회원 탈퇴 2/6`, `탈퇴하시는 이유가 무엇인가요?`, `더 나은 서비스를 위해 알려주세요. (1개 이상 선택)` | `intro` | `ogn-mbr-withdraw-reason-intro` | structural-only |
| `LEGACY-MBR-WITHDRAW-REASON-OPTIONS` | current `Screen.tsx` | collect one or more withdrawal reasons | `가격이 부담돼요`, `이용 빈도가 낮아요`, `다른 서비스로 옮겨요`, `사용이 불편해요`, `오류·결제 문제가 있었어요`, `기타 (직접 입력)` | `reasons` | `ogn-mbr-withdraw-reason-options` | structural-only; policy TBD |
| `LEGACY-MBR-WITHDRAW-REASON-FREE-TEXT` | current `Screen.tsx` | collect optional free-form feedback | `자유 의견 (선택)`, `자세한 의견을 입력해주세요`, `{freeText.length}/500자` | `freeText` | `ogn-mbr-withdraw-reason-free-text` | structural-only; policy TBD |
| `LEGACY-MBR-WITHDRAW-REASON-ACTIONS` | current `Screen.tsx` | block progression until at least one reason is selected | `다음` | `actions` | `ogn-mbr-withdraw-reason-actions` | structural-only |

## Governance Review

| ref | selectionReason | affectedRequirement | impact | notApplicableReason |
| --- | --- | --- | --- | --- |
| `UXPT_BTN` | Candidate only: bottom CTA has disabled/enabled progression behavior. | `LEGACY-MBR-WITHDRAW-REASON-ACTIONS` | Preserve one fixed primary action and no secondary action. | Governance source not formally mapped for this legacy-converted screen. |
| `UXPT_NAV` | Candidate only: screen uses header back navigation in a multi-step flow. | `LEGACY-MBR-WITHDRAW-REASON-INTRO` | Preserve AppBar ownership of navigation. | Governance source not formally mapped for this legacy-converted screen. |
| `VOT_RUL` | Candidate only: existing copy is concise and task-oriented. | all requirements | Do not rewrite copy while metadata is structural-only. | Governance source not formally mapped for this legacy-converted screen. |

## Policy Notes

- Do not create policy IDs for this screen until policy-core has a confirmed withdrawal reason source.
- Current implementation defines `selected.size === 0` as the only CTA blocking condition.
- Current implementation treats free text as optional even when `기타 (직접 입력)` is selected.
- Current implementation uses a single-line `TextField` with `maxLength=500`; multiline text-area capability is not established here.
