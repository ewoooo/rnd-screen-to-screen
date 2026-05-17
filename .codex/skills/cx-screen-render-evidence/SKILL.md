---
name: cx-screen-render-evidence
description: Collect rendered layout evidence for CX mobile screens after implementation. Use for Phase 5 or approval gates that require geometry evidence; screenshots are optional.
---

# CX Screen Render Evidence

Use this after a screen has code to prove the rendered layout still preserves the approved Map and Diagram. `SCREEN_GENERATION_FLOW.md` is the SOT for when render evidence is required and how it relates to Phase 5. Geometry evidence is required. Screenshots are optional unless the user, reviewer, or visual risk requires one.

## Required Reading

- `SCREEN_GENERATION_FLOW.md`
- target `Screen.diagram.html`
- target `Screen.config.ts`
- `AGENTS.md` common verification section
- nearest package `AGENTS.md`

## Evidence Requirement

Record geometry evidence for the rendered screen. Acceptable evidence includes:

- Playwright or Browser bounding boxes for Header, Content, Bottom rail, primary CTA, and critical OGN sections
- relative-position checks proving Content does not overlap Header or Bottom
- viewport-fit checks proving the CTA is visible or intentionally fixed
- overflow/wrapping checks for policy-critical rows, labels, values, and form controls

Screenshots may supplement geometry evidence, but screenshots alone are not enough when bounding boxes can be collected.

## Workflow

1. Start or reuse the appropriate local app server according to the repo's scripts and current task context.
2. Open the target route in Browser or an equivalent local browser tool.
3. Collect viewport size and route URL.
4. Measure geometry for:
   - App/Header rail
   - Content rail
   - Bottom rail or primary CTA area
   - each changed or risk-bearing OGN section
5. Compare measurements against `Screen.diagram.html` Distortion Gates and layout contracts.
6. Optionally capture screenshots for visual review, especially when typography, density, or state styling changed.
7. Report pass/fail with the measured facts, not only subjective visual notes.

## Guardrails

- Do not weaken validation because the screen "looks close."
- Do not use text-existence checks as layout evidence.
- Do not fix implementation while collecting evidence unless the user has asked for an iterative implementation pass; otherwise report the mismatch and route it to Build or Diagram.
- Do not require screenshots for every case. Geometry evidence is the required artifact.

## Done Criteria

- Geometry evidence covers the screen rails and every changed/risky section.
- Any overlap, clipping, off-viewport CTA, unstable alignment, or wrapping failure is tied back to the relevant Diagram contract.
- Verification status is clear: `pass`, `pass with residual risk`, or `fail`.
