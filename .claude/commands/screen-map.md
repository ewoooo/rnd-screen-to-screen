# Screen Map

Use this command for Phase 2 policy mapping.

This command is a thin Claude Code bridge. Policy mapping procedure and artifact shape are owned by `SCREEN_GENERATION_FLOW.md`, `policy-core`, governance docs, and the map skill.

## Required Reading

Read in order:

1. `AGENTS.md`
2. `SCREEN_GENERATION_FLOW.md`
3. `.codex/skills/cx-screen-map/SKILL.md`
4. `packages/policy-core/policies/**/*.md` relevant to the extracted policy IDs
5. `packages/policy-core/policies/**/*.policy.ts` relevant to the extracted policy IDs
6. `packages/policy-core/governance/**/*.md` relevant to the task, state, copy, and pattern

## Scope

- Use Phase 1 extraction as input and produce/update `Screen.map.md`.
- Treat `policy-core` and governance docs as the source of policy meaning, copy constraints, source refs, and UX rules.
- Record policy gaps and stop for user direction when the SOT requires simulation/backfill approval.
- Do not solve layout in this phase; hand off mapped requirements and governance refs to Diagram.
