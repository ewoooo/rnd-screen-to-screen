# Screen Map

Use this command for Phase 2 policy mapping.

## Required Reading

Read in order:

1. `AGENTS.md`
2. `SCREEN_GENERATION_FLOW.md`
3. `.codex/skills/cx-screen-map/SKILL.md`
4. `packages/policy-core/policies/**/*.md` relevant to the extracted policy IDs
5. `packages/policy-core/policies/**/*.policy.ts` relevant to the extracted policy IDs
6. `packages/policy-core/governance/**/*.md` relevant to the task, state, copy, and pattern

## Rules

- `policy-core` outranks SB when they conflict.
- If SB references a policy ID that does not exist in `policy-core`, record the gap and stop unless the user explicitly chooses simulation/backfill mode.
- `Screen.map.md` owns policy meaning, source refs, required information, constraints, choices, errors, and governance refs.
- Do not solve layout here; that belongs to Diagram.
