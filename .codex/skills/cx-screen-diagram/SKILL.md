---
name: cx-screen-diagram
description: Create or review latest-spec Phase 3 Screen.diagram.md for CX mobile screens in this repository. Use when Codex must select a screen-diagrams wire reference, run Pattern Analysis Gate, write screen-like ASCII Screen Wire rails, Section Contracts, layoutStrategy, vocabularyDecision, Policy / OGN Matrix, and Distortion Gates before implementation.
---

# CX Screen Diagram

Use this for Phase 3 only. `Screen.diagram.md` owns structure, wire reference application, layout strategy, governance application, and reuse/new decisions. It must not invent policy meaning.

## Required Reading

- `SCREEN_STRUCTURE_PRINCIPLES.md`
- `SCREEN_GENERATION_FLOW.md`
- `DESIGN_PATTERNS.md`
- `SPACING_PATTERNS.md`
- Phase 2 `Screen.map.md`
- closest references under `apps/mobile/src/screen-diagrams/`

## Workflow

1. Search `apps/mobile/src/screen-diagrams/` and nearby existing `Screen.diagram.md` files for the closest visual wire reference.
2. Record `wireReference` in `Screen Contract`.
3. Run Pattern Analysis Gate before finalizing section contracts:
   - `sectionBoundary`: `none | SectionDivider | contentsDivider | cardBoundary`
   - `fieldGrouping`: `none | single | FieldStack | FieldStackWithDividers`
   - `rowSeparators`: `none | Divider(type="contents") | Divider(type="section")`
   - `actionPlacement`: `none | Content | Bottom(preset="primary-cta") | inline field action`
   - `patternDecision`: existing pattern, existing composition, or new candidate
4. Write sections in this exact order:
   1. `Screen Contract`
   2. `Screen Wire`
   3. `Section Contracts`
   4. `Policy / OGN Matrix`
   5. `Distortion Gates`
5. Apply Phase 2 governance refs to CTA hierarchy, state handling, navigation, and copy decisions.
6. For each section/OGN, write `patternEvidence`, `patternDecision`, `layoutStrategy`, and `vocabularyDecision`.
7. Run the checker before moving to Build.

## Pattern Analysis Gate

Do not collapse visible micro patterns into generic spacing. Record the evidence in `Section Contracts`.

- A 4px section band is `SectionDivider` and appears in `Screen Wire` as `├══Divider 4px / ...══┤`.
- A 1px line inside a section/card/list is `Divider(type="contents")`.
- Text fields separated by visible lines are `FieldStackWithDividers` or a new pattern candidate, not plain `FieldStack`.
- A button inside a text field is `inline field action`, not a sibling content button.
- If evidence is unclear, record the uncertainty in `patternDecision.reason`; do not invent or remove dividers during Build.

## Screen Wire Rules

`Screen Wire` must look like an actual mobile screen rail, not a prose outline. Include:

```txt
┌─AppScreen
├─Header
├─Content
├─Bottom
├══Divider
```

- `┌─AppScreen`, `├─Header`, and `├─Content` are always required.
- `├─Bottom` is required when the diagram or implementation uses `Bottom(preset=...)`.
- `├══Divider` is required when a visible section divider appears.
- Every `[section-id]` in `Screen Wire` must appear in `Section Contracts`.
- Use `Bottom(preset="...")`; do not use `AppScreen.ActionBar` in new diagrams.

## Wire Reference Rules

`Screen Contract` must include:

```txt
- wireReference:
  - source: apps/mobile/src/screen-diagrams/.../<semantic-name>.diagram.md
  - matchedParts: ...
  - intentionalDifferences: ...
  - limitation: reference-only visual structure; policy/copy/OGN ids come from Screen.map.md and Screen.config.ts
```

If no reference exists, use `source: none-found` and record `reason`.

## Done Criteria

Run:

```bash
npm run check:screen-generation:strict -w @policy/core
```

Do not proceed to Build while the checker fails.
