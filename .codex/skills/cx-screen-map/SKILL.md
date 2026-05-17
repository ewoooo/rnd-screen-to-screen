---
name: cx-screen-map
description: Create or review Phase 2 Screen.map.md for CX mobile screens in this repository. Use when Codex must map extracted screen requirements to policy-core policy source, structured .policy.ts definitions, UX governance refs, user copy, constraints, choices, errors, and sourceRefs.
---

# CX Screen Map

Use this for Step 2 / Phase 2 only. `Screen.map.md` owns policy meaning and governance selection; it must not own layout, spacing, component reuse/new, or route registration. This skill executes `SCREEN_GENERATION_FLOW.md`; it is not the SOT.

## Required Reading

- `SCREEN_GENERATION_FLOW.md`
- Phase 1 `Extract Summary`
- `packages/policy-core/policies/**/*.md`
- `packages/policy-core/policies/**/*.policy.ts`
- `packages/policy-core/governance/**/*.md`

Do not read `DESIGN_PATTERNS.md` or `DESIGN_FOUNDATION.md` in this phase. Policy meaning must not be filtered by design expression.

## Workflow

1. Start from the Phase 1 extraction summary.
2. Run Coverage Map first: resolve every SB policy ID or unresolved hint against policy-core and classify each screen/OGN as `green`, `yellow`, or `red`.
3. For `red` items, stop mapping and record `missingPolicyIds`, `blockedReason`, and `neededDecision`. Do not infer missing policy from SB prose.
4. For `yellow` items, separate policy-backed facts from SB-only facts and require user approval before using SB-only facts as implementation requirements.
5. For `green` items and approved `yellow` items only, separate source facts from user-facing copy.
6. Record required information, choices, constraints, error states, recovery states, and CTA meaning.
7. Select relevant `UXP`, `UXPT`, and `VOT` governance refs, or record `notApplicableReason`.
8. Connect each requirement to an OGN ID when known; otherwise record why it remains unresolved.
9. Write or update `Screen.map.md` only for mappable items.

## Coverage Matrix

Before writing `Screen.map.md`, produce a compact `Policy Coverage Matrix`:

- screen ID
- OGN ID
- SB policy IDs
- present policy IDs
- missing policy IDs
- coverage verdict: `green`, `yellow`, or `red`
- next action: `map`, `needs-user-decision`, or `blocked`

Do not expand `red` rows into copy, governance, or sourceRef matrices.

## Screen.map.md Minimum Content

- screen ID and domain
- policy tags, policy IDs, and sourceRefs
- required information
- choices/options
- constraints and validation/error rules
- user copy derived from policy
- governance refs with selection reasons
- CTA meaning and state implications
- linked OGN IDs or unresolved reasons
- reviewed but not selected policy/governance refs when relevant

## Done Criteria

- Coverage Matrix exists before Implementation Map work starts.
- Every policy tag is mapped to screen information, CTA, state, or error treatment.
- Every policyRef and OGN ID expected in `Screen.config.ts generation` appears in the map.
- Phase 3 can design structure without re-reading policy meaning from scratch.
