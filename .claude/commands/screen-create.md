# Screen Create

Use this command when creating, converting, regenerating, or substantially updating a policy-based mobile screen in this repository.

## Required Reading

Before doing any work, read these files and treat them as the active procedure contract:

1. `AGENTS.md`
2. `SCREEN_GENERATION_FLOW.md`
3. `.codex/skills/cx-screen-create/SKILL.md`

Then read phase-specific skill files as each phase begins:

- Phase 1 Extract: `.codex/skills/cx-screen-extract/SKILL.md`
- Phase 2 Map: `.codex/skills/cx-screen-map/SKILL.md`
- Phase 3 Diagram: `.codex/skills/cx-screen-diagram/SKILL.md`
- Phase 4 Build: `.codex/skills/cx-screen-build/SKILL.md`
- Phase 5 Register/Verify: `.codex/skills/cx-screen-register-verify/SKILL.md`

## Operating Rules

- Do not treat this command file as SOT. It is only a Claude Code bridge into the repository SOT and Codex skills.
- Follow `SCREEN_GENERATION_FLOW.md` for the 0-10 sequence, public checkpoints, phase responsibilities, and document routing.
- Do not start implementation until Extract, Map, Reference Decision, Component Candidate Decision, Diagram Contract, and Build Plan gates are explicit.
- Default to autonomous continuous execution through internal phase gates. Do not ask the user for approval between every phase unless the user explicitly limited the scope. However, stop for user direction at the pre-implementation checkpoints: Reference Decision, Component Candidate Decision, and Build Plan. Also stop when another user approval gate condition from `SCREEN_GENERATION_FLOW.md` is hit.
- If using subagents, state worker name, write scope, no-touch scope, required checks, and expected evidence before delegation.
- If a policy referenced by SB is missing from `packages/policy-core`, stop in Phase 2 unless the user explicitly chooses simulation/backfill mode.
- For UI-affecting work, require screenshot or bounding-box/layout evidence in addition to text checks.

## User Input

Use the user's attached SB directory or source material as the input. Keep generated artifacts inside the repository's established screen locations unless the user asks for a dry-run or simulation pack.
