---
name: cx-screen-create
description: Orchestrate the full CX policy-based mobile screen creation workflow in this repository. Use when Codex is asked to create, convert, regenerate, or substantially update an apps/mobile screen across Extract, Map, Diagram, Build, and Register phases.
---

# CX Screen Create

Use this as the manager skill for the full screen-generation workflow. Keep the main agent in a manager role: define phase inputs and outputs, delegate phase work when useful, approve each phase before moving on, and keep `Screen.map.md -> Screen.diagram.md -> implementation -> Screen.config.ts -> route` consistent.

## Workflow

1. Read `AGENTS.md` and `SCREEN_GENERATION_FLOW.md`.
2. Run Phase 1 with `cx-screen-extract`.
3. Run Phase 2 with `cx-screen-map`; do not enter Diagram until policy tags, policy refs, copy, constraints, errors, and governance refs are mapped or explicitly marked not applicable.
4. Run Phase 3 with `cx-screen-diagram`; do not enter Build until every section/OGN has `layoutContract` and `componentCandidates`, candidates include fit/reason/risk scored by capability, and acceptance is expressed as layout behavior rather than component-name usage.
5. Run Phase 4 with `cx-screen-build`; accept implementation by `layoutContract` and Distortion Gate preservation, not by whether it used candidate names.
6. Run Phase 5 with `cx-screen-register-verify`; register the route and run applicable checks.

## Manager Gates

- Treat `packages/policy-core/policies` as the policy SOT and `packages/policy-core/governance` as governance SOT.
- Treat `SCREEN_STRUCTURE_PRINCIPLES.md` as the Phase 3 diagram contract SOT.
- Record approved decisions in owned files: policy/copy/governance in `Screen.map.md`, structure/layoutContract/componentCandidates in `Screen.diagram.md`, implementation metadata in `Screen.config.ts`.
- Return to Phase 3 if the Diagram over-specifies exact components as acceptance criteria, omits `layoutContract`, omits `componentCandidates`, lists candidates without fit/reason/risk, or assigns `medium/strong` because sample data is short despite known structural risk.
- Return to Phase 3 if Build cannot preserve the layout contract from available candidates and the Diagram does not describe the contract or risk clearly enough to choose an alternative.
- Return to the failing phase before continuing when a phase output fails its checker or contract.

## Required Final Verification

Run at least:

```bash
npm run check:screen-generation:strict -w @policy/core
npm run lint -w @screen/mobile
npm run build -w @screen/mobile
```

Add preview, figma-export, storybook, or package checks when the change touches those surfaces.
