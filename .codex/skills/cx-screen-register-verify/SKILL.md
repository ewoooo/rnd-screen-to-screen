---
name: cx-screen-register-verify
description: Register and verify Phase 5 CX mobile screens in this repository. Use when Codex must add screen route catalog entries, confirm preview/mobile exposure, and run policy, lint, build, pattern, foundation, and required geometry checks after a screen is implemented.
---

# CX Screen Register Verify

Use this for Step 9 / Phase 5 and final verification only. This skill executes `SCREEN_GENERATION_FLOW.md`; it is not the SOT.

## Required Reading

- `SCREEN_GENERATION_FLOW.md`
- `AGENTS.md` `## 공통 검증`
- target `Screen.config.ts`
- target `Screen.map.md`
- target `Screen.diagram.html`
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

If `cx-screen-render-evidence` is available, use it for the rendered geometry evidence portion of Phase 5. If `cx-screen-audit` is available, use it for read-only Map/Diagram/config/implementation/route consistency before final reporting when the screen changed materially.

## Pattern And Foundation Checks

In addition to command checks, verify the target against `Screen.diagram.html` Distortion Gates and `#diagram-contract`:

- target route opens in a mobile viewport
- Header/Content/Bottom rails match the diagram
- bottom CTA position and scroll behavior match the pattern
- no overlap, blank screen, overflow, or unexpected layout shift
- pattern-specific checklist passes, such as Completion title/check/summary/bottom CTA rules
- foundation scan does not reveal raw hex color, raw spacing, raw font-size, or route-level layout patch in target files
- Component Spacing Review was completed after `Screen.tsx` assembly, covering section gaps, OGN gaps, Header/Content start, Content/Bottom clearance, and bottom CTA spacing

For UI-affecting changes, geometry evidence is required and screenshot evidence is optional:

- required: bounding box or equivalent geometry evidence for Header, Content, Bottom, and primary CTA, including viewport fit, ordering, scroll/rail behavior, and non-overlap.
- optional: screenshot evidence, useful for visual audit and communication but not a substitute for geometry checks.

Completion/Form/Detail migrations must not be approved by text-only checks or screenshot-only checks. If a fixed bottom rail is involved, verify by geometry that the rail stays inside the viewport and does not cover the final content section.

If a layoutContract, Distortion Gate, or command check fails, return to the relevant phase instead of weakening validation.

## Report

- State which checks passed.
- State pattern/foundation checks separately from command checks.
- State geometry evidence separately from screenshot evidence. If no screenshot was taken, say screenshot evidence was skipped because it is optional.
- If a check fails, fix the contract violation or return to the relevant phase instead of weakening validation.
- Mention remaining audit warnings separately from build failures.
