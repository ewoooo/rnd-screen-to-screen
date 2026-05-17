---
name: cx-screen-design-iterate
description: Iterate CX mobile screen design after rendered evidence reveals layout, density, hierarchy, or component-fit issues. Use to move deliberately between Diagram, Build, and Render Evidence without drifting from SCREEN_GENERATION_FLOW.md.
---

# CX Screen Design Iterate

Use this when rendered evidence or review feedback shows that a CX mobile screen needs design iteration after initial diagram/build work. `SCREEN_GENERATION_FLOW.md` is the SOT for phase boundaries, gates, document routing, and approval requirements. This skill coordinates a small loop; it does not replace Phase 3 or Phase 4.

## Required Reading

- `SCREEN_GENERATION_FLOW.md`
- latest render evidence notes
- target `Screen.map.md`
- target `Screen.diagram.html`
- target implementation files
- relevant `DESIGN_PATTERNS.md` section
- relevant `DESIGN_FOUNDATION.md` tokens or typography rules

## Workflow

1. Classify the issue:
   - `diagram-contract` if the layout contract, candidate scoring, OGN boundary, or Distortion Gate is wrong or incomplete
   - `build-selection` if implementation chose the wrong component/composition for a valid contract
   - `foundation` if token, typography, radius, or color usage violates the design SOT
   - `render-only` if evidence was incomplete or measured the wrong target
2. Choose the smallest valid loop:
   - Diagram update with `cx-screen-thin-diagram`
   - Build update with `cx-screen-fast-build`
   - Render evidence refresh with `cx-screen-render-evidence`
3. Preserve policy meaning from `Screen.map.md`; do not alter policy, CTA, errors, or choices to solve a layout issue.
4. Make one coherent iteration at a time, then collect fresh geometry evidence.
5. Record what changed and why, including any rejected component or layout option.

## Guardrails

- Do not patch route-level spacing to compensate for a bad component choice.
- Do not change OGN boundaries during Build without returning to Diagram.
- Do not use screenshots alone to close an issue that needs geometry evidence.
- Do not broaden scope into unrelated cleanup.
- Stop for user approval when `SCREEN_GENERATION_FLOW.md` requires a user gate: new component/variant/slot, policy conflict, legacy reference, or broad structural change.

## Done Criteria

- The iteration ends with synced Diagram/Build contracts or an explicit blocked reason.
- Fresh geometry evidence confirms the issue is fixed or identifies the remaining mismatch.
- The report distinguishes changed files from no-touch files.
