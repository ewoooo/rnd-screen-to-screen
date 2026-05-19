# NOVA-CHG-FP-004-0 Screen Map

## Source

- sourceMode: sb-only
- SB screen: `/Users/wooseong/Desktop/SB-CHG-UC01_0517/screen/NOVA-CHG-FP-004-0.md`
- SB organism: `/Users/wooseong/Desktop/SB-CHG-UC01_0517/organism/ogn-chg-change-complete.md`
- Policy refs are SB hints only: `POL-CHG-PLAN-006-01`, `POL-CHG-PLAN-006-02`.
- governanceRefs: not applicable
- notApplicableReason: SB-only source mode; policy-core governance was intentionally not used as SOT for this scoped implementation.

## Requirement Matrix

| OGN ID | SB requirement | UI requirement | Copy source |
|---|---|---|---|
| ogn-chg-change-complete | Show plan-change request result, effective timing, and follow-up actions. | Show completion title, changed plan summary, application timing, and two actions: home and change-history. | SB-only synthesized UX copy from organism notes. |

## Cases

| Case ID | Meaning | UI handling |
|---|---|---|
| NOVA-CHG-FP-004-E1 | Request failed. | Documented from SB; not implemented because this route represents the success FP base screen. |
| NOVA-CHG-FP-004-E2 | Reserved change. | Effective date row can carry the reserved date; current static data uses a concrete application date. |
| NOVA-CHG-FP-004-E3 | Notification send failed. | Completion content remains valid because SB says the completion 안내 is maintained. |

## Governance Notes

- Preserve SB-only completion semantics and do not cross-check policy-core as source of truth for this task.
- Keep actions inside the mobile bottom CTA rail.
- Do not introduce shared organisms; route catalog registration is handled by the main integration step.
