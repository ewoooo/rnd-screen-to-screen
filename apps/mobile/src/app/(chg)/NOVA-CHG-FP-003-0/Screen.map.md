# NOVA-CHG-FP-003-0 Screen Map

## Source

- sourceMode: sb-only
- SB screen: `/Users/wooseong/Desktop/SB-CHG-UC01_0517/screen/NOVA-CHG-FP-003-0.md`
- SB organisms:
  - `/Users/wooseong/Desktop/SB-CHG-UC01_0517/organism/ogn-chg-plan-comparison.md`
  - `/Users/wooseong/Desktop/SB-CHG-UC01_0517/organism/ogn-chg-plan-notice-agree.md`
- Policy refs are SB hints only: `POL-CHG-PLAN-004-01`, `POL-CHG-PLAN-005-01`, `POL-CHG-PLAN-005-02`, `POL-CHG-PLAN-005-03`.
- governanceRefs: not applicable
- notApplicableReason: SB-only source mode; policy-core governance was intentionally not used as SOT for this scoped implementation.

## Requirement Matrix

| OGN ID | SB requirement | UI requirement | Copy source |
|---|---|---|---|
| ogn-chg-plan-comparison | Compare current and selected plans by monthly fee, data, benefits, and effective timing. | Show current plan and selected plan as adjacent vertical summary cards, then show expected monthly fee and effective date. | SB-only synthesized UX copy from organism notes. |
| ogn-chg-plan-notice-agree | Show required notices for pro-rated billing, discount/combined benefit changes, and add-on compatibility before submit. | Show required notices in a section, require confirmation checkbox, disable submit until checked. | SB-only synthesized UX copy from notice cases. |

## Screen Transitions

| From | To | Condition | Data |
|---|---|---|---|
| NOVA-CHG-FP-003-0 | NOVA-CHG-FP-004-0 | Required notices confirmed and user taps 변경 신청. | selectedPlanId, noticeAgreementId, expectedEffectiveDate |

## Cases

| Case ID | Meaning | UI handling |
|---|---|---|
| NOVA-CHG-FP-003-E1 | Required notice unchecked. | Primary CTA remains disabled until checkbox is checked. |
| NOVA-CHG-FP-003-E2 | Price condition needs recalculation. | Expected-change section includes pro-rated billing notice; live recalculation is out of scope for this static FP implementation. |
| NOVA-CHG-FP-003-E3 | Agreement save failed. | Error state is documented from SB but not implemented because no API/save flow exists in this route-local static screen. |

## Governance Notes

- Preserve policy meaning from SB-only hints rather than policy-core SOT.
- Do not introduce shared organisms; route catalog registration is handled by the main integration step.
- Use `@pxds/cx-layout` for screen rails and `@pxds/cx-components` for card, list, notice, checkbox, and CTA vocabulary.
