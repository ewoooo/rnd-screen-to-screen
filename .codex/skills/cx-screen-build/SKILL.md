---
name: cx-screen-build
description: Implement Phase 4 CX mobile screens in this repository from approved Screen.map.md and Screen.diagram.md. Use when Codex must create or update organisms, Screen.tsx, and Screen.config.ts using cx-layout, cx-components, cx-icons, and cx-tokens.
---

# CX Screen Build

Use this for Phase 4 only. Build translates approved Map and Diagram decisions into code. Do not reinterpret policy or redesign layout during Build.

This skill executes Step 7-8 from `SCREEN_GENERATION_FLOW.md`: Build Plan and Implementation. The flow document owns the procedure and document routing; this skill enforces it during code changes.

## Required Reading

- The target screen's `Screen.map.md`
- The target screen's `Screen.diagram.md`
- `DESIGN_FOUNDATION.md`
- `DESIGN_PATTERNS.md`
- package AGENTS files nearest the files being edited

## Build Plan Gate

Before editing files, publish a Build Plan:

- `Create`: new route, organism, config, registry, docs, or tests.
- `Modify`: existing files that will change.
- `Remove`: files to delete.
- `No-touch`: nearby files intentionally left alone.
- `Layout Risk`: rail owner, padding owner, bottom CTA owner, wrapping/overflow risk.
- `CSS / token risk`: whether any CSS is needed, and why it is not a route-level layout patch.
- `Shared Ownership`: files that must not be edited in parallel without coordination.

Do not implement until route-level margin/padding patch, raw color, raw spacing, raw font-size, and deleted legacy imports are either absent or explicitly rejected in the plan.

## Implementation Rules

- Implement OGN units under `apps/mobile/src/organisms/<domain>/` when they are reusable domain organisms.
- Assemble the route in `Screen.tsx` according to the Diagram's AppScreen slots, section order, `layoutContract`, and Distortion Gates.
- Fill `Screen.config.ts generation` with source, pattern, policyRefs, ognIds, governanceRefs when applicable, designDocsChecked, and `buildSelections` when the config schema supports it.
- Use `@pxds/cx-layout`, `@pxds/cx-components`, `@pxds/cx-icons`, and `@pxds/cx-tokens`.
- Do not add deleted legacy imports such as `@pxds/pxds-components`, `@pxds/pxds-icons`, `@pxds/pxds-layout`, or `@pxds/pxds-spec`.
- Treat Diagram component names as candidates unless the Diagram says they are required. Select by capability against the contract, not by name match. A component name match alone is not acceptance evidence.
- Reject candidates that violate Distortion Gates. If no candidate passes, create or adapt a reusable organism/component, or return to `cx-screen-diagram` when the Diagram contract itself is insufficient.
- Avoid route-level raw margin/padding fixes. If layout distorts, fix the organism/component selection instead of masking it.
- Keep layout ownership explicit: `Screen.tsx` owns AppScreen rails and slots, OGN owns policy-bearing body composition, `@pxds/cx-layout` owns layout rails/primitives, and `@pxds/cx-components` owns internal component alignment/state visuals.
- If implementation reveals a wrong boundary, wrong reference, missing layoutContract, or candidate vocabulary gap, stop and return to the relevant Step 3-6 decision instead of quietly redesigning in code.

## Component Selection

For each section, decide in this order:

1. Read `layoutContract` and Distortion Gates as acceptance criteria.
2. Evaluate `componentCandidates` by capability: role, structure, alignment, density, wrapping, state handling, and slot fit. Use the Diagram fit scoring rules; do not upgrade a candidate because the current sample data is short.
3. Prefer the smallest existing component/composition that preserves the contract and matches nearby screen/reference behavior.
4. If the Diagram records `sourceCompleteness: under-specified-proof` or `conflict-with-convention` from `SCREEN_STRUCTURE_PRINCIPLES.md` → `Pattern-Family Precedent Gate`, follow the recorded `assumption` or stop on unresolved `decisionRequired`; do not downgrade an established primary convention because the thin proof wire omitted an authorable structural title/header.
5. If every candidate violates a gate, create or adapt a reusable organism/component instead of forcing a named candidate.
6. Record the selection in `Screen.config.ts generation.buildSelections` when the config schema supports it, or in the work log with the section id.
7. For each selected candidate/composition, include a reason that explains how it satisfies the section `layoutContract` and Distortion Gates; do not cite component name similarity as sufficient rationale.
8. Use only these `source` values for build selections: `componentCandidates`, `existing-composition`, `new-organism`, `new-component`.
9. Record rejected candidates as `{ candidate, reason }`, especially when they fail role, structure, alignment, density, wrapping, state handling, slot fit, or any Distortion Gate. Treat `weak` as reject unless no stronger candidate exists and the contract can still be proven without route-level CSS.
10. When the implemented composition deviates from the Diagram candidate or contract, record the deviation with `deviationReason`; use deviations only when policy meaning and layout intent remain intact.

Forbidden rationale: `buildSelections.reason`, `rejected.reason`, and work logs must not use current sample/proof/copy length as acceptance evidence. Phrases such as "current values are short enough", "current proof copy fits", or "현재 값이 짧아서 괜찮다" are invalid. Short current data is only a verification input for wrapping tests; it cannot upgrade `weak` to `medium`, justify rejection of a stronger candidate, or override a known Distortion Gate risk.

Forbidden under-reach: do not reject an established primary convention candidate only because the proof source omitted an authorable structural part. If Build needs a title/header to use the convention, consume the Diagram's Pattern-Family Precedent Gate assumption or return to Phase 3 for `decisionRequired`; do not silently fall back to a weaker no-header composition.

## Done Criteria

- Every OGN/slot in `Screen.diagram.md` exists in code and passes its `layoutContract`/Distortion Gates, or has a recorded deviation.
- `Screen.config.ts generation.policyRefs` and `generation.ognIds` match Map and Diagram.
- Mobile lint/build can run without import or type errors.
