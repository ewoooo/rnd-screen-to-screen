# Screen Create

Use this command when creating, converting, regenerating, or substantially updating a policy-based mobile screen in this repository.

This command is a thin Claude Code bridge. It routes work to the repository SOT and Codex screen skills; it does not replace or restate their procedure.

## Required Reading

Before doing any work, read:

1. `AGENTS.md`
2. `SCREEN_GENERATION_FLOW.md`
3. `.codex/skills/cx-screen-create/SKILL.md`

Then read the phase skill as each phase begins:

- Phase 1 Extract: `.codex/skills/cx-screen-extract/SKILL.md`
- Phase 2 Map: `.codex/skills/cx-screen-map/SKILL.md`
- Phase 3 Diagram: `.codex/skills/cx-screen-diagram/SKILL.md`
- Phase 4 Build: `.codex/skills/cx-screen-build/SKILL.md`
- Phase 5 Register/Verify: `.codex/skills/cx-screen-register-verify/SKILL.md`

## Scope

- Follow `SCREEN_GENERATION_FLOW.md` for the 0-10 operating sequence, phase responsibilities, artifact routing, and validation gates.
- Keep generated artifacts in the repository's established screen locations unless the user asks for a dry run or simulation pack.
- If delegating, give each worker an explicit phase, write scope, no-touch scope, required evidence, and check expectations.

## User Gates

- Use the user's attached SB directory or source material as input.
- Proceed autonomously through internal phase work unless the user limits scope.
- Stop for user direction at the pre-implementation gates owned by `SCREEN_GENERATION_FLOW.md`, especially Reference Decision, Component Candidate Decision, and Build Plan.
- Do not start Build until Extract, Map, Reference Decision, Component Candidate Decision, Diagram Contract, and Build Plan are explicit.
