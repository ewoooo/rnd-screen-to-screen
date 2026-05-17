# Screen Register Verify

Use this command for Phase 5 registration and verification.

## Required Reading

Read in order:

1. `AGENTS.md`
2. `SCREEN_GENERATION_FLOW.md`
3. `.codex/skills/cx-screen-register-verify/SKILL.md`

## Required Work

- Register screen route entries in `apps/mobile/src/scripts/screen-routes/routes.ts`.
- Update route group typing when needed.
- Confirm preview/mobile exposure.
- Run relevant checks from `AGENTS.md` common verification.

## Standard Checks

Run these when the scope touches mobile screens or screen generation contracts:

- `npm run check:screen-generation:strict -w @policy/core`
- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Report warnings separately from failures.
