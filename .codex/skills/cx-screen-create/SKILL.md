---
name: cx-screen-create
description: Orchestrate the official CX policy-based mobile screen workflow in this repository. Use when Codex is asked to create, convert, regenerate, or substantially update an apps/mobile screen through Extract, Map, Diagram, Fast Build, Render Geometry Evidence, Design Iteration, Contract Sync, and Verification.
---

# CX Screen Create

Use this as the manager skill for the full screen-generation workflow. Keep the main agent in a manager role: define step inputs and outputs, delegate step work when useful, approve each gate before moving on, and keep `Screen.map.md -> Screen.diagram.html -> implementation -> Screen.config.ts -> route` consistent.

This skill is an executor, not the SOT. `SCREEN_GENERATION_FLOW.md` owns procedure, document routing, public checkpoints, and layout gates. Read `AGENTS.md` and `SCREEN_GENERATION_FLOW.md` first, then run the official flow below.

Default to autonomous continuous execution unless the user limits the turn to a specific step or asks for analysis only. Public checkpoints are still required, and user-direction gates must stop before implementation or before scope expansion.

## Official Flow

Run Extract and Map first, then use the implementation loop:

```txt
Extract -> Map -> Diagram -> Fast Build -> Render Geometry Evidence -> Design Iteration -> Contract Sync -> Verification
```

The loop is allowed to repeat. If rendered evidence reveals layout distortion, return to Design Iteration or an earlier contract decision; do not hide the issue with route-level margin/padding, raw spacing, raw color, custom font-size, or deleted legacy imports.

## Workflow

1. Run Step 0 Intake before delegating: confirm SB path type, `screen/*.md`, `organism/*.md`, target screen ID, referenced OGN specs, existing route/organism, and dirty worktree scope.
2. For multi-screen requests, create the full screen inventory first. Use step-batch execution by default: run the same gate across screens in parallel, approve the batch gate, then continue. Do not default to one screen completing the whole flow while the rest wait.
3. Run Extract with `cx-screen-extract`. Publicly report the SB Extract result before Map/Diagram decisions.
4. Run Map with `cx-screen-map`. Do not enter Diagram until policy tags, policy refs, copy, constraints, errors, and governance refs are mapped or explicitly marked not applicable.
5. Run Diagram with `cx-screen-diagram`, but keep it contract-first: wire reference, pattern decision, OGN boundary, `layoutStrategy`, `layoutContract`, `componentCandidates`, and Distortion Gates. After the first diagram draft, run Design Pattern Review Gate against `DESIGN_PATTERNS.md` and revise the diagram before Build planning. The diagram should be sufficient for build and audit, not a decorative spec dump.
6. Publicly report Reference Decision, Design Pattern Review Gate result, and Component Candidate Decision before implementation. These are user-direction gates; wait for approval or revision unless the user has explicitly pre-approved implementation.
7. Run Build Plan before editing files: list Create/Modify/Remove/No-touch, layout risk, raw CSS/token risk, shared file ownership, worker name, write scope, no-touch files, and approval checks.
8. Publicly report the Build Plan before implementation. Do not start implementation until approved or revised.
9. Run Fast Build with `cx-screen-build`: code only approved Map/Diagram decisions, preserve OGN boundaries and layout contracts, assemble `Screen.tsx`, fill `Screen.config.ts generation`, and complete Component Spacing Review after assembly.
10. Run Render Geometry Evidence immediately after buildable UI exists. Use Browser/Playwright or equivalent rendered inspection to capture geometry evidence for Header, Content, Bottom, primary CTA, viewport fit, scroll/rail behavior, and non-overlap. Screenshot/capture artifacts are optional supplements, not substitutes for geometry evidence. Text presence alone is not enough.
11. Run Design Iteration from the evidence. Fix the smallest contract-preserving issue in the right owner: `Screen.tsx` rails/slots, OGN body composition, layout primitive, component choice, or diagram decision. If the fix needs a new boundary, new component vocabulary, or pattern change, return to the relevant Diagram decision.
12. Run Contract Sync after each design iteration: update `Screen.diagram.html` when structure/layout contracts changed, update `Screen.config.ts` when implementation metadata/build selections changed, and confirm `Screen.map.md` remains policy-only. Do not let rendered implementation drift from the contract.
13. Run Verification with `cx-screen-register-verify`: register the route when needed, run applicable command checks, pattern/foundation checks, and rendered layout checks.
14. Run `cx-screen-audit` as a read-only consistency pass before final report when the task creates, regenerates, or substantially updates a screen. Resolve or report any audit mismatch.
15. Run final Report: include SB source, references, key decisions, rejected candidates, render geometry evidence, verification, audit result, and residual risks.

## Manager Gates

- Treat `packages/policy-core/policies` as the policy SOT and `packages/policy-core/governance` as governance SOT.
- Treat `SCREEN_STRUCTURE_PRINCIPLES.md` as the Step 3 diagram contract SOT.
- Treat `DESIGN_PATTERNS.md` as the screen pattern and layout/spacing contract SOT.
- Treat `DESIGN_FOUNDATION.md` as the visual foundation/token SOT.
- Record approved decisions in owned files: policy/copy/governance in `Screen.map.md`, structure/layoutContract/componentCandidates in `Screen.diagram.html`, implementation metadata in `Screen.config.ts`.
- Keep Diagram thin but binding. It must contain enough visible and hidden contract data for Build, Render Geometry Evidence, Contract Sync, and Audit to compare against; it must not over-specify exact components as acceptance criteria.
- Block Fast Build if `Screen.diagram.html` lacks `diagram-contract.screenContract.patternRecheck` from `DESIGN_PATTERNS.md` after the first diagram draft.
- Main-agent review is an approval gate, not a passive summary. Block the next gate when a delegated artifact misses required structure, weakens wire semantics, leaves candidate scoring unsupported, or omits required rendered evidence.
- Before worker implementation starts, expose a short Build Plan with worker name, write scope, no-touch files, and approval checks. Include the instruction that workers are not alone in the codebase.
- After workers finish, inspect `git diff --stat` and scoped diffs for each worker-owned path before accepting. If a worker edits outside scope, either justify the expansion in the report or return the work for correction.
- For multi-screen batches, main-agent review is a batch gate. Approve or reject the gate across the screen set before moving the batch forward; per-screen completion badges do not replace the batch gate.
- Return to Diagram if the diagram omits `layoutContract`, omits `componentCandidates`, scores by component-name preference, lists candidates without fit/reason/risk, or uses sample/proof/copy length as fit evidence.
- Return to Reference Decision, OGN Boundary Decision, Component Candidate Decision, or Diagram Contract when implementation or render evidence reveals layout distortion. Do not patch around the issue with route-level margin/padding, raw spacing, raw color, or custom font-size.
- Return to Contract Sync if `Screen.map.md`, `Screen.diagram.html`, `Screen.config.ts`, `Screen.tsx`/organisms, or the route registry disagree after design iteration.

## Render Geometry Evidence

For UI-affecting screen work, collect rendered evidence after Fast Build and after each meaningful design iteration. Required evidence is geometry-based:

- bounding boxes for Header, Content, Bottom, and primary CTA
- viewport fit and overlap checks for fixed bottom rails
- scroll/rail checks showing the final content is not hidden by Bottom
- visible policy-bearing text for the major sections

Screenshot/capture artifacts may be attached when useful, but they are optional and cannot replace geometry evidence.

Record the evidence in the work log and final report. If the evidence contradicts `Screen.diagram.html` or the pattern contract, iterate before Verification.

## Contract Sync

Before final Verification, confirm:

- `Screen.map.md` policy IDs, OGN IDs, copy, constraints, errors, and governance refs match policy-core and are not overwritten by design iteration.
- `Screen.diagram.html` visible Visual Screen and hidden `#diagram-contract` match the implemented rails, sections, OGN boundaries, layout contracts, component candidates, and Distortion Gates.
- `Screen.config.ts generation` matches Map/Diagram policy refs, OGN IDs, governance refs, source, pattern, and build selections.
- `Screen.tsx` and organisms implement the diagram contract without deleted legacy imports or route-level layout patches.
- route registry points to the same screen ID/route metadata as `Screen.config.ts`.

Use `cx-screen-audit` for the read-only consistency pass when a screen has been created or substantially changed.

## Required Final Verification

Run the common verification from `AGENTS.md` for each touched surface, with strict screen-generation compliance for new or changed screens. Add preview, figma-export, storybook, or package checks when the change touches those surfaces.

For normal mobile screen work, default to:

```bash
npm run check:screen-generation:strict -w @policy/core
npm run lint -w @screen/mobile
npm run build -w @screen/mobile
```

Also run preview build when route catalog, preview registry, or `@screen/mobile/screens` consumers changed. Run Storybook or figma-export builds only when those surfaces changed.
