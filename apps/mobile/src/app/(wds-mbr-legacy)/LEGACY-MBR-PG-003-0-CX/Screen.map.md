# LEGACY-MBR-PG-003-0-CX - Withdrawal Complete Map

## Screen Scope

- screenId: `LEGACY-MBR-PG-003-0-CX`
- source: `legacy-converted-screen-tsx-backfill`
- sourceTruth: current `Screen.tsx`
- pattern: `complete`
- route: `/LEGACY-MBR-PG-003-0-CX`
- policyRefs: []
- ognIds: `ogn-mbr-withdraw-complete-app-bar`, `ogn-mbr-withdraw-complete-hero`, `ogn-mbr-withdraw-complete-summary`, `ogn-mbr-withdraw-revoke-notice`, `ogn-mbr-withdraw-complete-actions`
- governanceRefs: []
- notApplicableReason: Legacy-converted screen metadata backfill. Current `Screen.tsx` is the visual/structural truth; policy-core references for withdrawal completion, grace period, revocation, and disposal are not confirmed. Do not invent policy IDs.

## Requirement Matrix

| requirement | sourceRef | screen role | user copy | mapped section | OGN | status |
| --- | --- | --- | --- | --- | --- | --- |
| `WITHDRAW-COMPLETE-HEADER` | current `Screen.tsx` | completion exit header | `탈퇴 완료`, `닫기` | `appBar` | `ogn-mbr-withdraw-complete-app-bar` | structural-only; policy TBD |
| `WITHDRAW-COMPLETE-HERO` | current `Screen.tsx` | completion result | `회원 탈퇴 6/6`, `탈퇴 처리가 완료되었습니다` | `completionHero` | `ogn-mbr-withdraw-complete-hero` | structural-only; policy TBD |
| `WITHDRAW-COMPLETE-GRACE-COPY` | current `Screen.tsx` | grace/disposal guidance | `30일 이내에 다시 가입하시면 일부 정보를 복원할 수 있어요. 그 이후엔 모두 파기됩니다.` | `completionHero` | `ogn-mbr-withdraw-complete-hero` | structural-only; policy TBD |
| `WITHDRAW-COMPLETE-SUMMARY` | current `Screen.tsx` | processing facts summary | `탈퇴 처리 시각`, `철회 가능 기간`, `개인정보 파기` | `completionSummary` | `ogn-mbr-withdraw-complete-summary` | structural-only; policy TBD |
| `WITHDRAW-REVOKE-NOTICE` | current `Screen.tsx` | revocation guidance | `철회 안내` and body copy | `revokeNotice` | `ogn-mbr-withdraw-revoke-notice` | structural-only; policy TBD |
| `WITHDRAW-COMPLETE-ACTIONS` | current `Screen.tsx` | completion actions | `철회하기`, `홈으로 가기` | `actions` | `ogn-mbr-withdraw-complete-actions` | structural-only; policy TBD |

## Copy Inventory

| copyId | text | sourceRef | section |
| --- | --- | --- | --- |
| appBar.title | `탈퇴 완료` | current `Screen.tsx` | `appBar` |
| hero.step | `회원 탈퇴 6/6` | current `Screen.tsx` | `completionHero` |
| hero.title | `탈퇴 처리가\n완료되었습니다` | current `Screen.tsx` | `completionHero` |
| hero.subtitle | `30일 이내에 다시 가입하시면 일부 정보를 복원할 수 있어요. 그 이후엔 모두 파기됩니다.` | current `Screen.tsx` | `completionHero` |
| summary.sectionTitle | `이 내용으로 처리됐어요` | current `Screen.tsx` | `completionSummary` |
| summary.cardTitle | `처리 정보` | current `Screen.tsx` | `completionSummary` |
| summary.processedAt | `2026년 4월 30일 (수) 19:24` | current `Screen.tsx` | `completionSummary` |
| summary.revocationPeriod | `5월 30일까지 (30일 유예)` | current `Screen.tsx` | `completionSummary` |
| summary.privacyDisposal | `유예 종료 시 자동 파기` | current `Screen.tsx` | `completionSummary` |
| revoke.title | `철회 안내` | current `Screen.tsx` | `revokeNotice` |
| revoke.body | `유예 기간 내 철회를 원하시면 탈퇴 시 사용한 본인인증으로 마이페이지에서 진행할 수 있어요.` | current `Screen.tsx` | `revokeNotice` |
| action.secondary | `철회하기` | current `Screen.tsx` | `actions` |
| action.primary | `홈으로 가기` | current `Screen.tsx` | `actions` |

## Governance Review

| ref | selectionReason | affectedRequirement | impact | notApplicableReason |
| --- | --- | --- | --- | --- |
| governanceRefs | none selected | all | none | Legacy-converted metadata backfill without confirmed policy/governance source refs. |

## Policy Gaps

- Withdrawal completion policy, 30-day grace period, revocation eligibility, and privacy disposal timing are all shown by current fixture copy but remain policy TBD.
- The screen currently renders revocation as available. A future policy-bound implementation must define the state condition that hides, disables, or keeps `철회하기`.
- Navigation destinations for `철회하기`, close, and `홈으로 가기` are structural-only in this metadata pass.
