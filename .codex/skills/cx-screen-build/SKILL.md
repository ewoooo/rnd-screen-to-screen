---
name: cx-screen-build
description: Implement Phase 4 CX mobile screens in this repository from approved Screen.map.md and Screen.diagram.md. Use when Codex must create or update organisms, Screen.tsx, and Screen.config.ts using cx-layout, cx-components, cx-icons, and cx-tokens.
---

# CX Screen Build

Use this for Phase 4 only. Build translates approved Map and Diagram decisions into code. Do not reinterpret policy or redesign layout during Build.

## Required Reading

- The target screen's `Screen.map.md`
- The target screen's `Screen.diagram.md`
- `DESIGN_FOUNDATION.md`
- `DESIGN_PATTERNS.md`
- package AGENTS files nearest the files being edited

## Implementation Rules

- Implement OGN units under `apps/mobile/src/organisms/<domain>/` when they are reusable domain organisms.
- Assemble the route in `Screen.tsx` according to the Diagram's AppScreen slots, section order, `layoutContract`, and Distortion Gates.
- Fill `Screen.config.ts generation` with source, pattern, policyRefs, ognIds, governanceRefs when applicable, and designDocsChecked.
- Use `@pxds/cx-layout`, `@pxds/cx-components`, `@pxds/cx-icons`, and `@pxds/cx-tokens`.
- Do not add deleted legacy imports such as `@pxds/pxds-components`, `@pxds/pxds-icons`, `@pxds/pxds-layout`, or `@pxds/pxds-spec`.
- Treat Diagram component names as candidates unless the Diagram says they are required. Select by capability against the contract, not by name match.
- Reject candidates that violate Distortion Gates. If no candidate passes, create or adapt a reusable organism/component, or return to `cx-screen-diagram` when the Diagram contract itself is insufficient.
- Avoid route-level raw margin/padding fixes. If layout distorts, fix the organism/component selection instead of masking it.

## Component Selection

For each section, decide in this order:

1. Read `layoutContract` and Distortion Gates as acceptance criteria.
2. Evaluate `componentCandidates` by capability: role, structure, alignment, density, wrapping, state handling, and slot fit.
3. Prefer the smallest existing component/composition that preserves the contract and matches nearby screen/reference behavior.
4. If every candidate violates a gate, create or adapt a reusable organism/component instead of forcing a named candidate.
5. Record the selected candidate/composition and any deviation reason in `Screen.config.ts generation` when supported, or in the work log with the section id.

## Done Criteria

- Every OGN/slot in `Screen.diagram.md` exists in code and passes its `layoutContract`/Distortion Gates, or has a recorded deviation.
- `Screen.config.ts generation.policyRefs` and `generation.ognIds` match Map and Diagram.
- Mobile lint/build can run without import or type errors.
