---
name: cx-screen-register-verify
description: Register and verify Phase 5 CX mobile screens in this repository. Use when Codex must add screen route catalog entries, confirm preview/mobile exposure, and run policy, lint, build, pattern, and foundation checks after a screen is implemented.
---

# CX Screen Register Verify

Use this for Step 9 / Phase 5 and final verification only. This skill executes `SCREEN_GENERATION_FLOW.md`; it is not the SOT.

## Required Reading

- `SCREEN_GENERATION_FLOW.md`
- `AGENTS.md` `## 공통 검증`
- target `Screen.config.ts`
- target `Screen.map.md`
- target `Screen.diagram.md`
- `apps/mobile/src/scripts/screen-routes/`

## Register

1. Add or update the screen in `apps/mobile/src/scripts/screen-routes/routes.ts` or the relevant route catalog module.
2. Confirm route metadata matches `Screen.config.ts`.
3. Confirm `@screen/mobile` exports still expose the route through `src/scripts/screen-routes/index.ts`.
4. Do not register a route whose map/diagram/config IDs disagree.

## Verify

Run the repository common verification from `AGENTS.md` that applies to the touched surface. For normal mobile screen work, default to:

```bash
npm run check:screen-generation:strict -w @policy/core
npm run lint -w @screen/mobile
npm run build -w @screen/mobile
```

Also run:

```bash
npm run build -w @screen/preview
```

when route catalog, preview registry, or `@screen/mobile/screens` consumers changed.

Run Storybook or figma-export builds only when their package surfaces changed.

## Pattern And Foundation Checks

In addition to command checks, verify the target against `Screen.diagram.md` Distortion Gates:

- target route opens in a mobile viewport
- Header/Content/Bottom rails match the diagram
- bottom CTA position and scroll behavior match the pattern
- no overlap, blank screen, overflow, or unexpected layout shift
- pattern-specific checklist passes, such as Completion title/check/summary/bottom CTA rules
- foundation scan does not reveal raw hex color, raw spacing, raw font-size, or route-level layout patch in target files

For UI-affecting changes, produce layout evidence beyond text existence:

- screenshot evidence, or
- bounding box evidence for Header, Content, Bottom, and primary CTA, including viewport fit and non-overlap.

Completion/Form/Detail migrations must not be approved by text-only checks. If a fixed bottom rail is involved, verify that the rail stays inside the viewport and does not cover the final content section.

If a layoutContract, Distortion Gate, or command check fails, return to the relevant phase instead of weakening validation.

## Report

- State which checks passed.
- State pattern/foundation checks separately from command checks.
- If a check fails, fix the contract violation or return to the relevant phase instead of weakening validation.
- Mention remaining audit warnings separately from build failures.
