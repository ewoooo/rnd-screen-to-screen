---
name: cx-screen-fast-build
description: Implement a scoped Phase 4 CX mobile screen change from an already approved Screen.map.md and Screen.diagram.html. Use when the build surface is small and the diagram contract is stable.
---

# CX Screen Fast Build

Use this for narrow Phase 4 implementation work. `SCREEN_GENERATION_FLOW.md` is the SOT for Build Plan, Implementation, gates, document routing, and DoD. This skill is a fast path only when policy mapping and diagram contracts are already approved and no new design judgment is needed.

## Required Reading

- `SCREEN_GENERATION_FLOW.md`
- target `Screen.map.md`
- target `Screen.diagram.html`
- `DESIGN_FOUNDATION.md`
- nearest package `AGENTS.md`
- existing target `Screen.tsx`, `Screen.config.ts`, and affected organisms

## Build Plan

Before editing, publish the short Build Plan required by `SCREEN_GENERATION_FLOW.md`:

- `Create`
- `Modify`
- `Remove`
- `No-touch`
- `Layout Risk`
- `CSS / token risk`
- `Shared Ownership`

Keep the write scope explicit and reject route-level margin/padding patches, raw color, raw spacing, raw font-size, and deleted legacy imports before implementation.

## Workflow

1. Confirm the change is fast-build eligible:
   - target files are known
   - affected OGN IDs are already in Map and Diagram
   - no new Reference Decision, OGN Boundary Decision, or Component Candidate Decision is needed
2. Implement only the approved contract:
   - `Screen.tsx` owns AppScreen rails and slots
   - organisms own policy-bearing body composition
   - `@pxds/cx-layout` owns layout rails/primitives
   - `@pxds/cx-components` owns internal component alignment and state visuals
3. Select components by capability against `layoutContract` and Distortion Gates.
4. Update `Screen.config.ts generation` when the schema supports the changed source, OGN, policy, governance, or build-selection data.
5. Run the Component Spacing Review required by the Build phase after `Screen.tsx` assembly.
6. If the implementation cannot satisfy the diagram without raw route CSS or a new component vocabulary decision, stop and return to Phase 3.

## Guardrails

- Do not reinterpret policy or copy during Build.
- Do not redesign the screen in code.
- Do not add imports from deleted legacy packages such as `@pxds/pxds-components`, `@pxds/pxds-icons`, `@pxds/pxds-layout`, or `@pxds/pxds-spec`.
- Do not touch files outside the approved Build Plan scope.

## Done Criteria

- All affected OGN/slot code preserves the approved `Screen.diagram.html` contract.
- Component Spacing Review is recorded in config when supported or in the work log.
- The change is ready for the verification commands owned by `AGENTS.md`.
