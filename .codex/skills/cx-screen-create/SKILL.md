---
name: cx-screen-create
description: Orchestrate the full CX policy-based mobile screen creation workflow in this repository. Use when Codex is asked to create, convert, regenerate, or substantially update an apps/mobile screen across Extract, Map, Diagram, Build, and Register phases.
---

# CX Screen Create

Use this as the manager skill for the full screen-generation workflow. Keep the main agent in a manager role: define phase inputs and outputs, delegate phase work when useful, approve each phase before moving on, and keep `Screen.map.md -> Screen.diagram.md -> implementation -> Screen.config.ts -> route` consistent.

Default to autonomous continuous execution. Unless the user explicitly limits the turn to a specific step or asks for analysis only, continue through internal phase gates without asking for approval on every phase transition. However, stop for user direction at the pre-implementation public checkpoints: Reference Decision, Component Candidate Decision, and Build Plan. Also stop when other `SCREEN_GENERATION_FLOW.md` user approval gate conditions apply.

This skill is an executor, not the SOT. The procedure, document routing, public checkpoints, and layout gates are owned by `SCREEN_GENERATION_FLOW.md`; read that file first and follow its 0-10 operating sequence.

## Workflow

1. Read `AGENTS.md` and `SCREEN_GENERATION_FLOW.md`.
2. Run Step 0 Intake before delegating: confirm SB path type, `screen/*.md`, `organism/*.md`, target screen ID, referenced OGN specs, existing route/organism, and dirty worktree scope.
3. For multi-screen requests, create the full screen inventory first. Use phase-batch execution by default: run the same phase across screens in parallel, then approve the phase gate for the whole batch before starting the next phase. Do not default to one screen completing all five phases while the rest wait.
4. Run Step 1 / Phase 1 with `cx-screen-extract`.
5. Public checkpoint: report the SB Extract result before Map/Diagram decisions.
6. Run Step 2 / Phase 2 with `cx-screen-map`; do not enter Diagram until policy tags, policy refs, copy, constraints, errors, and governance refs are mapped or explicitly marked not applicable.
7. Run Step 3-6 / Phase 3 with `cx-screen-diagram`; do not enter Build until every section/OGN has `layoutContract` and capability-scored `componentCandidates`, and acceptance is expressed as layout behavior rather than component-name usage.
8. Public checkpoint: report Reference Decision and Component Candidate Decision before implementation.
9. Run Step 7 Build Plan before editing files: list Create/Modify/Remove/No-touch, layout risk, raw CSS/token risk, and shared file ownership.
10. Public checkpoint: report the Build Plan before implementation.
11. When delegating to workers, include explicit write scope, no-touch files, approval checks, and the instruction that they are not alone in the codebase.
12. Run Step 8 / Phase 4 with `cx-screen-build`; accept implementation by `layoutContract` and Distortion Gate preservation, not by whether it used candidate names. Build only screens whose Map and Diagram passed the batch gate, and split file ownership when workers may touch shared organisms/components.
13. Run Step 9 / Phase 5 with `cx-screen-register-verify`; register the route and run applicable checks.
14. Run Step 10 Report: include SB source, references, key decisions, rejected candidates, verification, and residual risks.

## Manager Gates

- Treat `packages/policy-core/policies` as the policy SOT and `packages/policy-core/governance` as governance SOT.
- Treat `SCREEN_STRUCTURE_PRINCIPLES.md` as the Phase 3 diagram contract SOT.
- Treat `DESIGN_PATTERNS.md` as the screen pattern and layout/spacing contract SOT.
- Treat `DESIGN_FOUNDATION.md` as the visual foundation/token SOT.
- Record approved decisions in owned files: policy/copy/governance in `Screen.map.md`, structure/layoutContract/componentCandidates in `Screen.diagram.md`, implementation metadata in `Screen.config.ts`.
- The main agent must publicly surface these checkpoints before implementation: SB Extract result, Reference Decision, Component Candidate Decision, Build Plan. Reference Decision, Component Candidate Decision, and Build Plan are user-direction gates; do not start implementation until the user approves or revises them.
- Main-agent review is an approval gate, not a passive summary. The main agent must block the next phase when a delegated artifact misses required structure, weakens wire semantics, or leaves candidate scoring unsupported.
- Before worker implementation starts, the main agent must expose a short Build Plan with worker name, write scope, no-touch files, and approval checks. For tiny P0 fixes, this can be compact, but it must exist.
- After workers finish, the main agent must inspect `git diff --stat` and scoped diffs for each worker-owned path before accepting. If a worker edits outside scope, either justify the expansion in the report or return the work for correction.
- For multi-screen batches, main-agent review is a batch gate. Approve or reject the phase across the screen set before moving the batch forward; per-screen completion badges do not replace the phase gate.
- In Phase 3, verify Wire Semantic Tags before candidate scoring and apply `SCREEN_STRUCTURE_PRINCIPLES.md` for summary-card and pattern-family precedent decisions.
- Return to Phase 3 if the Diagram over-specifies exact components as acceptance criteria, omits `layoutContract`, omits `componentCandidates`, lists candidates without fit/reason/risk, or uses sample/proof/copy length as fit evidence despite known structural risk.
- Return to Phase 3 or Phase 4 if any artifact uses current sample/proof/copy length as fit or selection evidence. Sample length may verify wrapping only; it cannot justify selection, rejection, or risk downgrade.
- Return to Phase 3 if a summary card skips `patternFamily` and required capabilities, scores by component-name preference, or upgrades a candidate with known structural risk without proving the required capabilities are preserved.
- Return to Phase 3 if a Pattern-Family Precedent Gate conflict from `SCREEN_STRUCTURE_PRINCIPLES.md` is resolved as an unsupported reject instead of a recorded decision or assumption.
- Return to Phase 3 if Build cannot preserve the layout contract from available candidates and the Diagram does not describe the contract or risk clearly enough to choose an alternative.
- Return to Reference Decision, OGN Boundary Decision, Component Candidate Decision, or Diagram Contract when implementation reveals layout distortion. Do not hide the problem with route-level margin/padding, raw spacing, raw color, or custom font-size.
- Return to the failing phase before continuing when a phase output fails validation or contract requirements.

## Required Final Verification

Run the common verification from `AGENTS.md` for each touched surface, with strict screen-generation compliance for new or changed screens. Add preview, figma-export, storybook, or package checks when the change touches those surfaces.

For UI-affecting screen work, also verify rendered layout with Browser/Playwright evidence. Text presence alone is not enough for layout migration. Capture or compute at least one of:

- screenshot evidence for the changed route
- bounding boxes for Header, Content, Bottom, and primary CTA
- viewport fit and overlap checks for fixed bottom rails
