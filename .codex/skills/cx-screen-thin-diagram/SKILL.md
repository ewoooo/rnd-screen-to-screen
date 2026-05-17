---
name: cx-screen-thin-diagram
description: Produce a minimal Phase 3 Screen.diagram.html update for CX mobile screens when Map and pattern decisions are already clear. Use for scoped diagram work that must preserve SCREEN_GENERATION_FLOW.md gates without re-running broad discovery.
---

# CX Screen Thin Diagram

Use this for narrowly scoped Phase 3 diagram work only. `SCREEN_GENERATION_FLOW.md` is the SOT for phase boundaries, public gates, document routing, and DoD. This skill keeps the diagram pass thin: confirm the existing contract, update only the necessary sections, and avoid replaying the full screen creation workflow unless the contract is missing or contradictory.

## Required Reading

- `SCREEN_GENERATION_FLOW.md`
- target `Screen.map.md`
- target `Screen.diagram.html`, if it exists
- `DESIGN_PATTERNS.md` only for the selected pattern section
- `SCREEN_STRUCTURE_PRINCIPLES.md` only for the relevant structure gate
- nearest package `AGENTS.md`

## Workflow

1. Confirm scope:
   - target screen and OGN IDs
   - diagram sections allowed to change
   - existing `wireReference`, `patternFamily`, and bottom/header/content rail ownership
2. Keep or minimally update the required Phase 3 decisions from `SCREEN_GENERATION_FLOW.md`:
   - Reference Decision
   - OGN Boundary Decision
   - Component Candidate Decision
   - Diagram Contract
3. Preserve the existing `Screen.diagram.html` structure:
   - visible Visual Screen
   - Review Summary
   - Reference Summary
   - Section Inspector
   - Distortion Gates
   - hidden `#diagram-contract` JSON
4. Update only the affected section records. Each touched section must still include:
   - `patternEvidence`
   - `patternDecision`
   - `ognBoundaryDecision`
   - `layoutStrategy`
   - `layoutContract`
   - `componentCandidates`
5. Recheck the selected pattern in `DESIGN_PATTERNS.md` after the edit and record `patternRecheck` as `revised` or `no-change`.
6. If thin work reveals missing policy meaning, unresolved OGN ownership, an absent reference, or a component vocabulary gap, stop and return to `cx-screen-diagram` or `cx-screen-create`.

## Guardrails

- Do not create `Screen.diagram.md`.
- Do not invent new policy meaning, copy, CTA behavior, or errors.
- Do not change implementation files.
- Do not score components by name similarity or sample copy length.
- Do not hide visual changes only in JSON. The visible diagram and `#diagram-contract` must agree.

## Done Criteria

- The changed diagram still satisfies the Phase 3 DoD in `SCREEN_GENERATION_FLOW.md`.
- All touched sections preserve their layout contract and Distortion Gates.
- The edit scope is small enough to explain as a diagram contract synchronization, not a redesign.
