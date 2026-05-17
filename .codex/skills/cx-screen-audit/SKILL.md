---
name: cx-screen-audit
description: Read-only consistency audit for CX mobile screens. Use after screen creation, regeneration, substantial screen edits, or before final reporting to compare Screen.map.md, Screen.diagram.html, Screen.config.ts, Screen.tsx/organisms, and the route registry without modifying files.
---

# CX Screen Audit

Use this skill for a read-only consistency audit across a target CX mobile screen. It reports mismatches; it does not edit files, rewrite contracts, register routes, or run fixes.

## Scope

Audit these artifacts for the target screen:

- `Screen.map.md`
- `Screen.diagram.html`
- `Screen.config.ts`
- `Screen.tsx`
- target organisms under `apps/mobile/src/organisms/`
- route registry under `apps/mobile/src/scripts/screen-routes/`

Do not write files. Do not normalize formatting. Do not mark an implementation valid just because it builds; this audit checks contract consistency.

## Required Reading

- `AGENTS.md`
- `SCREEN_GENERATION_FLOW.md`
- `SCREEN_STRUCTURE_PRINCIPLES.md`
- target `Screen.map.md`
- target `Screen.diagram.html`
- target `Screen.config.ts`
- target `Screen.tsx` and referenced organisms
- relevant route registry entries

## Audit Steps

1. Identify the target route, screen ID, domain/group, `Screen.tsx`, `Screen.config.ts`, and organism paths.
2. Parse `Screen.map.md` for policy refs, OGN IDs, governance refs, copy decisions, constraints, errors, CTA, and source refs.
3. Inspect `Screen.diagram.html` visible sections and hidden `<script type="application/json" id="diagram-contract">`.
4. Compare Map and Diagram:
   - policy refs and OGN IDs agree
   - every mapped OGN has a diagram section or an explicit structural-only reason
   - governance refs used in layout/copy decisions come from Map
   - Diagram does not invent policy meaning absent from Map
5. Compare Diagram and Implementation:
   - `Screen.tsx` rails and slots match AppScreen/Header/Content/Bottom structure
   - implemented sections preserve `layoutStrategy`, `layoutContract`, OGN boundary decisions, and Distortion Gates
   - organisms referenced by the screen exist and correspond to diagram OGN IDs
   - implementation does not rely on route-level raw margin/padding patches, raw colors, raw font sizes, deleted legacy imports, or component-name-only acceptance
6. Compare Config and Contracts:
   - `Screen.config.ts generation.policyRefs`, `ognIds`, `governanceRefs`, source, pattern, and build selections match Map/Diagram
   - recorded build selections explain capability fit against layout contracts
   - deviations, if any, are explicit and do not weaken policy meaning or layout intent
7. Compare Route Registry and Config:
   - registry route/screen ID/name/group match `Screen.config.ts`
   - mobile export/route catalog points to the same implementation
   - preview exposure is present when the changed route requires it
8. Check rendered-evidence readiness:
   - confirm the work log or verification notes include geometry evidence for UI-affecting work: relevant bounding boxes, viewport fit, scroll/rail behavior, and non-overlap
   - treat screenshots/capture artifacts as optional supplements
   - flag text-only or screenshot-only verification as insufficient for layout changes

## Severity

Report findings by severity:

- `blocker`: policy, OGN, route, or implementation mismatch that makes the screen contract invalid.
- `major`: layout contract, Distortion Gate, route exposure, config generation, or rendered-evidence gap that must be resolved before final acceptance.
- `minor`: traceability, naming, or documentation drift that should be cleaned up but does not invalidate the screen.
- `note`: useful observation with no required action.

## Output Format

Return an audit report with:

```txt
CX Screen Audit
- target:
- artifacts reviewed:
- result: pass | pass-with-warnings | fail

Findings
- [severity] file/path:line - issue

Consistency Matrix
- Map <-> Diagram:
- Diagram <-> Implementation:
- Config <-> Contracts:
- Route Registry <-> Config:
- Render Evidence:

Recommended next step:
```

If there are no findings, say the audit passed and list any residual test or render-evidence risk. If a required artifact is missing, report it as `blocker` unless the screen is intentionally stopped before that stage.
