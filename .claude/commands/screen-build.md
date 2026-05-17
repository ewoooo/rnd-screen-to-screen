# Screen Build

Use this command for Phase 4 implementation from approved `Screen.map.md` and `Screen.diagram.md`.

## Required Reading

Read in order:

1. `AGENTS.md`
2. `SCREEN_GENERATION_FLOW.md`
3. `.codex/skills/cx-screen-build/SKILL.md`
4. `DESIGN_FOUNDATION.md`
5. `DESIGN_PATTERNS.md`
6. Approved `Screen.map.md`
7. Approved `Screen.diagram.md`

## Rules

- Build only after the Build Plan Gate is explicit.
- Use `@pxds/cx-layout`, `@pxds/cx-components`, `@pxds/cx-icons`, and `@pxds/cx-tokens`.
- Do not add deleted legacy adapter imports or direct WDS app-level imports.
- Screen/page code should assemble approved OGN and layout contracts, not invent layout.
- Route/screen code must not patch alignment with raw margin, padding, or font sizes.
- For UI changes, provide screenshot or bounding-box/layout evidence before completion.
