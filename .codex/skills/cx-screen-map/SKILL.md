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
2. Resolve every policy tag or unresolved hint against policy-core.
3. Separate source facts from user-facing copy.
4. Record required information, choices, constraints, error states, recovery states, and CTA meaning.
5. Select relevant `UXP`, `UXPT`, and `VOT` governance refs, or record `notApplicableReason`.
6. Connect each requirement to an OGN ID when known; otherwise record why it remains unresolved.
7. Write or update `Screen.map.md`.

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

- Every policy tag is mapped to screen information, CTA, state, or error treatment.
- Every policyRef and OGN ID expected in `Screen.config.ts generation` appears in the map.
- Phase 3 can design structure without re-reading policy meaning from scratch.
