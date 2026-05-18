---
name: cx-screen-build
description: Compatibility/phase entrypoint for Phase 4 CX mobile screen implementation from approved Screen.map.md and Screen.diagram.html. Use when Codex must create or update organisms, Screen.tsx, and Screen.config.ts using cx-layout, cx-components, cx-icons, and cx-tokens; route to newer stage skills when available.
---

# CX Screen Build

Use this as the compatibility entrypoint for Phase 4 only. Build translates approved Map and Diagram decisions into code. Do not reinterpret policy or redesign layout during Build.

This skill executes Step 7-8 from `SCREEN_GENERATION_FLOW.md`: Build Plan and Implementation. The flow document owns the procedure and document routing; this skill enforces it during code changes.

## Compatibility Routing

If newer stage-specific skills are available in the current Codex environment, route to them when they better match the work and use this file as the Phase 4 compatibility contract:

- Use `cx-screen-fast-build` for scoped implementation from an already approved Map and Diagram when no new design judgment is needed.
- Use `cx-screen-design-iterate` when rendered evidence or review feedback requires a deliberate Diagram/Build/Render loop.
- Use `cx-screen-contract-sync` after scoped implementation metadata changes that need Map/Diagram/config consistency alignment.
- Use `cx-screen-render-evidence` after implementation when geometry evidence is needed for approval or Phase 5 handoff.
- Use this compatibility entrypoint directly for full Step 7-8 work: Build Plan and Implementation.

When no newer stage skill is available, execute the workflow below directly. Do not create local replacement skills or broaden the write scope. Stage routing must preserve the same approved Map/Diagram inputs, Build Plan gate, component selection rules, `Screen.config.ts generation` evidence, and Component Spacing Review.

## Required Reading

- The target screen's `Screen.map.md`
- The target screen's `Screen.diagram.html`
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
- `Visual Weight Risk`: whether any Content action could look like a second primary CTA; confirm the Diagram `visualWeightContract` or identify that the work must return to Diagram.
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
- Preserve each section's `visualWeightContract`. A `secondary` variant is not sufficient if the rendered size, width, radius, color, or proximity makes the action compete with the Bottom primary CTA.
- Reject candidates that violate Distortion Gates. If no candidate passes, create or adapt a reusable organism/component, or return to `cx-screen-diagram` when the Diagram contract itself is insufficient.
- Avoid route-level raw margin/padding fixes. If layout distorts, fix the organism/component selection instead of masking it.
- Keep layout ownership explicit: `Screen.tsx` owns AppScreen rails and slots, OGN owns policy-bearing body composition, `@pxds/cx-layout` owns layout rails/primitives, and `@pxds/cx-components` owns internal component alignment/state visuals.
- If implementation reveals a wrong boundary, wrong reference, missing layoutContract, or candidate vocabulary gap, stop and return to the relevant Step 3-6 decision instead of quietly redesigning in code.

## Component Spacing Review

After the target `Screen.tsx` is fully assembled, review spacing between components before handing the screen to Register/Verify.

- Check section-to-section gaps, OGN-to-OGN gaps, Header-to-Content start, Content-to-Bottom rail clearance, and fixed bottom CTA spacing.
- Confirm spacing ownership matches the Diagram: `Screen.tsx` owns AppScreen rails/slots, layout primitives own content rails and stack gaps, organisms own policy-bearing body composition, and components own internal padding.
- Compare the assembled screen against `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, and the target `Screen.diagram.html` `diagram-contract.sections[].layoutContract`.
- Do not fix spacing with route-level raw margin/padding, raw spacing values, or custom font-size. If spacing cannot be corrected through the approved layout primitives or component/organism boundary, return to Diagram or record a vocabulary gap.
- Record the result in `Screen.config.ts generation.buildSelections` when supported, or in the work log as `Component Spacing Review: pass | revised | blocked` with the sections reviewed and any change made.

## Component Selection

For each section, decide in this order:

1. Read `layoutContract` and Distortion Gates as acceptance criteria.
2. Evaluate `componentCandidates` by capability: role, structure, alignment, density, wrapping, state handling, slot fit, and visual weight. Use the Diagram fit scoring rules; sample/proof/copy length is not selection evidence.
3. Prefer the smallest existing component/composition that preserves the contract and matches nearby screen/reference behavior.
4. If the Diagram records a Pattern-Family Precedent Gate outcome from `SCREEN_STRUCTURE_PRINCIPLES.md`, follow the recorded `assumption` or stop on unresolved `decisionRequired`.
5. If every candidate violates a gate, create or adapt a reusable organism/component instead of forcing a named candidate.
6. Record the selection in `Screen.config.ts generation.buildSelections` when the config schema supports it, or in the work log with the section id.
7. For each selected candidate/composition, include a reason that explains how it satisfies the section `layoutContract` and Distortion Gates; do not cite component name similarity as sufficient rationale.
8. Use only these `source` values for build selections: `componentCandidates`, `existing-composition`, `new-organism`, `new-component`.
9. Record rejected candidates as `{ candidate, reason }`, especially when they fail role, structure, alignment, density, wrapping, state handling, slot fit, visual weight, or any Distortion Gate. Treat `weak` as reject unless no stronger candidate exists and the contract can still be proven without route-level CSS. Treat `risky` as requiring rendered evidence before final acceptance.
10. When the implemented composition deviates from the Diagram candidate or contract, record the deviation with `deviationReason`; use deviations only when policy meaning and layout intent remain intact.

Invalid rationale: `buildSelections.reason`, `rejected.reason`, and work logs must not use sample/proof/copy length as acceptance evidence. Short data is only a wrapping verification input and cannot upgrade fit, justify rejection, or override a Distortion Gate risk.

If Build cannot satisfy a recorded structure gate or needs an unresolved authorable structural part, return to Phase 3 instead of silently falling back to a weaker composition.

## Done Criteria

- Every OGN/slot in `Screen.diagram.html` exists in code and passes its `layoutContract`/Distortion Gates, or has a recorded deviation.
- Every action-bearing section passes `visualWeightContract`, especially Content action vs Bottom primary CTA hierarchy.
- `Component Spacing Review` has been performed after `Screen.tsx` assembly and before Register/Verify.
- `Screen.config.ts generation.policyRefs` and `generation.ognIds` match Map and Diagram.
- Mobile lint/build can run without import or type errors.
