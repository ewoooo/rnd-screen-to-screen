# LEGACY-MBR-PG-004-0-CX - Withdrawal Impact Check Map

## Screen Scope

- screenId: `LEGACY-MBR-PG-004-0-CX`
- source: `legacy-converted-screen-tsx-backfill`
- sourceTruth: current `Screen.tsx`
- pattern: `form-entry`
- route: `/LEGACY-MBR-PG-004-0-CX`
- policyRefs: []
- ognIds: `ogn-mbr-withdraw-impact-app-bar`, `ogn-mbr-withdraw-impact-intro`, `ogn-mbr-withdraw-impact-list`, `ogn-mbr-withdraw-unpaid-callout`, `ogn-mbr-withdraw-impact-action`
- governanceRefs: []
- notApplicableReason: Legacy-converted screen metadata backfill. Current `Screen.tsx` is the visual/structural truth; policy-core references for withdrawal impacts, rejoin restriction, unpaid blocking, and CTA enablement are not confirmed. Do not invent policy IDs.

## Requirement Matrix

| requirement | sourceRef | screen role | user copy | mapped section | OGN | status |
| --- | --- | --- | --- | --- | --- | --- |
| `WITHDRAW-IMPACT-HEADER` | current `Screen.tsx` | step navigation header | `회원 탈퇴` | `appBar` | `ogn-mbr-withdraw-impact-app-bar` | structural-only; policy TBD |
| `WITHDRAW-IMPACT-INTRO` | current `Screen.tsx` | step intro | `회원 탈퇴 3/6`, `탈퇴하면 아래 정보가 사라지거나 제한돼요` | `impactIntro` | `ogn-mbr-withdraw-impact-intro` | structural-only; policy TBD |
| `WITHDRAW-REJOIN-RESTRICTION` | current `Screen.tsx` | restriction guidance | `탈퇴 후에는 같은 식별정보로 30일간 재가입이 제한될 수 있어요.` | `impactIntro` | `ogn-mbr-withdraw-impact-intro` | structural-only; policy TBD |
| `WITHDRAW-IMPACT-LIST` | current `Screen.tsx` | impact status summary | `T 멤버십 포인트`, `발급 쿠폰 6개`, `자동 결제 2건`, `본인인증 이력` | `impactList` | `ogn-mbr-withdraw-impact-list` | structural-only; policy TBD |
| `WITHDRAW-UNPAID-CALLOUT` | current `Screen.tsx` | blocking constraint | `미납 확인` and unpaid amount body | `unpaidCallout` | `ogn-mbr-withdraw-unpaid-callout` | structural-only; policy TBD |
| `WITHDRAW-IMPACT-ACTION` | current `Screen.tsx` | blocked continuation | disabled `다음으로` | `actions` | `ogn-mbr-withdraw-impact-action` | structural-only; policy TBD |

## Copy Inventory

| copyId | text | sourceRef | section |
| --- | --- | --- | --- |
| appBar.title | `회원 탈퇴` | current `Screen.tsx` | `appBar` |
| intro.step | `회원 탈퇴 3/6` | current `Screen.tsx` | `impactIntro` |
| intro.title | `탈퇴하면 아래 정보가\n사라지거나 제한돼요` | current `Screen.tsx` | `impactIntro` |
| intro.subtitle | `탈퇴 후에는 같은 식별정보로 30일간 재가입이 제한될 수 있어요.` | current `Screen.tsx` | `impactIntro` |
| impact.sectionTitle | `사라지거나 정리되는 항목` | current `Screen.tsx` | `impactList` |
| impact.points | `T 멤버십 포인트` / `소멸` | current `Screen.tsx` | `impactList` |
| impact.coupons | `발급 쿠폰 6개` / `소멸` | current `Screen.tsx` | `impactList` |
| impact.autoPayments | `자동 결제 2건` / `해지` | current `Screen.tsx` | `impactList` |
| impact.identityHistory | `본인인증 이력` / `보관` | current `Screen.tsx` | `impactList` |
| unpaid.title | `미납 확인` | current `Screen.tsx` | `unpaidCallout` |
| unpaid.body | `현재 미납 요금 8,900원이 확인됐어요. 미납 정산 후 탈퇴를 진행할 수 있어요.` | current `Screen.tsx` | `unpaidCallout` |
| action.primary | `다음으로` | current `Screen.tsx` | `actions` |

## Governance Review

| ref | selectionReason | affectedRequirement | impact | notApplicableReason |
| --- | --- | --- | --- | --- |
| governanceRefs | none selected | all | none | Legacy-converted metadata backfill without confirmed policy/governance source refs. |

## Policy Gaps

- Impact statuses (`소멸`, `해지`, `보관`) are fixture copy in the current implementation; the policy source and exact eligibility rules remain TBD.
- The unpaid amount `8,900원` and disabled CTA are structural-only in this pass. A future policy-bound implementation must define the state condition that drives both callout visibility and CTA disabled state.
- No settlement action is present in current `Screen.tsx`; do not infer one from the unpaid callout.
