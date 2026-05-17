---
name: cx-screen-contract-sync
description: Synchronize CX screen contract artifacts after scoped changes. Use when Screen.map.md, Screen.diagram.html, Screen.config.ts, and implementation metadata need consistency checks without broad redesign.
---

# CX Screen Contract Sync

Use this for consistency work across screen artifacts after a scoped change. `SCREEN_GENERATION_FLOW.md` is the SOT for artifact ownership, phase responsibilities, gates, and DoD. This skill checks that contracts point to the same policy, OGN, route, layout, and generation facts without duplicating full phase work.

## Required Reading

- `SCREEN_GENERATION_FLOW.md`
- target `Screen.map.md`
- target `Screen.diagram.html`
- target `Screen.config.ts`
- changed `Screen.tsx` and organisms
- nearest package `AGENTS.md`

## Ownership Model

- `Screen.map.md` owns policy meaning, source refs, governance refs, and user-facing requirements.
- `Screen.diagram.html` owns structure, wire reference, OGN boundary, layout strategy, layout contract, component candidates, and Distortion Gates.
- `Screen.config.ts` owns route metadata, generation IDs, source linkage, and verification-friendly indexes.
- Implementation owns rendered behavior and must preserve the approved contract.

## Workflow

1. Compare policy and governance refs:
   - Map refs
   - Diagram section refs
   - Config `generation.policyRefs` and governance fields when supported
2. Compare OGN IDs and section IDs:
   - Map OGN list
   - Diagram `diagram-contract.sections`
   - implementation organism usage
   - config `generation.ognIds`
3. Compare route and screen identity:
   - route path
   - screen ID
   - domain/task/state metadata
4. Compare layout contract status:
   - Diagram Distortion Gates
   - Build selections or deviations in config/work log
   - latest render geometry evidence, when available
5. Apply only sync edits that are within the current write scope. If required sync touches files outside scope, report the exact blocked path.
6. If policy meaning, layout structure, or component candidate decisions are actually wrong, route back to Map, Diagram, or Build instead of silently normalizing metadata.

## Guardrails

- Do not use sync work to redesign a screen.
- Do not make `Screen.config.ts` disagree with Map or Diagram for convenience.
- Do not duplicate long policy text in config or diagram when IDs/source refs are enough.
- Do not edit route registry or unrelated screen files unless the current task explicitly allows it.

## Done Criteria

- Policy refs, governance refs, OGN IDs, section IDs, route identity, and build-selection metadata agree across the touched artifacts.
- Any mismatch outside write scope is reported with file path and required owner phase.
- The synced artifacts still follow the ownership model from `SCREEN_GENERATION_FLOW.md`.
