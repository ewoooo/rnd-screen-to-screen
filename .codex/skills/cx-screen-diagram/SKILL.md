---
name: cx-screen-diagram
description: Create or review latest-spec Phase 3 Screen.diagram.md for CX mobile screens in this repository. Use when Codex must select a screen-diagrams wire reference, run Pattern Analysis Gate, write screen-like ASCII Screen Wire rails, Section Contracts, layoutStrategy, layoutContract, componentCandidates, Policy / OGN Matrix, and Distortion Gates before implementation.
---

# CX Screen Diagram

Use this for Phase 3 only. `Screen.diagram.md` owns structure, wire reference application, layout strategy, layout contract, governance application, OGN boundary decisions, and component candidate discovery. It must not invent policy meaning or make component names the acceptance criteria.

This skill executes Step 3-6 from `SCREEN_GENERATION_FLOW.md`: Reference Decision, OGN Boundary Decision, Component Candidate Decision, and Diagram Contract. The flow and structure documents are the SOT; this skill only operationalizes them.

## Required Reading

- `SCREEN_STRUCTURE_PRINCIPLES.md`
- `SCREEN_GENERATION_FLOW.md`
- `DESIGN_PATTERNS.md`
- `DESIGN_FOUNDATION.md`
- Phase 2 `Screen.map.md`
- closest references under `apps/mobile/src/screen-diagrams/`

## Workflow

1. Run Reference Decision:
   - choose `patternFamily`
   - identify the official `DESIGN_PATTERNS.md` pattern
   - search `apps/mobile/src/screen-diagrams/`, nearby existing `Screen.diagram.md`, and `cx-example`
   - record accepted and rejected references with reasons
2. Record `wireReference` in `Screen Contract`.
3. Draw `Screen Wire` from the reference and current Map before naming components.
4. Run OGN Boundary Decision:
   - map SB OGN IDs to actual organism boundaries
   - choose `reuse | extend | new | structural-only`
   - record screen-owned slots, organism-owned policy meaning, and layout rhythm owner
   - keep AppBar/Header/Bottom chrome out of OGN organisms
5. Run Pattern Analysis Gate before finalizing section contracts:
   - `wireSemanticTag`: section id + semantic role + boundary/placement, such as `[summary | key-value-summary | card]`
   - `sectionBoundary`: `none | SectionDivider | contentsDivider | cardBoundary`
   - `fieldGrouping`: `none | single | FieldStack | FieldStackWithDividers`
   - `rowSeparators`: `none | Divider(type="contents") | Divider(type="section")`
   - `actionPlacement`: `none | Content | Bottom(preset="primary-cta") | inline field action`
   - `typography`: row title/caption roles, emphasis rule, and control label scale
   - `patternDecision`: existing pattern, existing composition, or new candidate
6. Run Component Candidate Decision:
   - score candidates as `strong | medium | weak | reject`
   - score by capability against layout behavior, not name similarity or sample/proof/copy length
   - reject candidates that need route-level CSS, raw spacing/color/font-size, deprecated imports, or known wrapping/alignment distortion
   - record vocabulary gaps instead of disguising them as custom screen CSS
7. Write sections in this exact order:
   1. `Screen Contract`
   2. `Screen Wire`
   3. `Section Contracts`
   4. `Policy / OGN Matrix`
   5. `Distortion Gates`
8. Apply Phase 2 governance refs to CTA hierarchy, state handling, navigation, and copy decisions.
9. For each section/OGN, write fields in this order: `patternEvidence`, `patternDecision`, `ognBoundaryDecision`, `layoutStrategy`, `layoutContract`, then `componentCandidates`.
10. Run the required Phase 3 validation before moving to Build.

## Pattern Analysis Gate

Do not collapse visible micro patterns into generic spacing. Record the evidence in `Section Contracts`.

- A 4px section band is `SectionDivider` and appears in `Screen Wire` as `├══Divider 4px / ...══┤`.
- A 1px line inside a section/card/list is `Divider(type="contents")`.
- Text fields separated by visible lines are `FieldStackWithDividers` or a new pattern candidate, not plain `FieldStack`.
- A button inside a text field is `inline field action`, not a sibling content button.
- Checkbox/radio/list rows must record typography evidence: `rowTitle`, `rowCaption`, `emphasisRule`, and `controlLabelScale`.
- If a row title looks larger than the reference, or every row uses a section-level title style, mark `controlLabelScale: too-large` and do not approve the pattern decision.
- Use `emphasisRule` to limit stronger typography to the allowed row, such as `first-row-only` for an all-agree checkbox row.
- If evidence is unclear, record the uncertainty in `patternDecision.reason`; do not invent or remove dividers during Build.

## Layout Contract Rules

Do not make a component name the acceptance criterion when the real requirement is visual/layout behavior. For each section, express the invariant contract before component candidates:

- `role`: what job the section performs for the user.
- `structure`: the visible composition, such as card + label-value rows, field stack, notice block, or action area.
- `alignment`: leading/center/split behavior and column stability.
- `density`: compact/comfortable spacing and card treatment relative to the wire reference.
- `wrapping`: what may wrap, what must stay stable, and how overflow is handled.
- `distortionRisk`: the specific failure mode that would make the implementation visually wrong.

`componentCandidates` names possible components, compositions, patterns, or organisms after `layoutContract`. Each candidate must record `fit: strong | medium | weak | reject`, `source`, `reason`, and `risk`. Candidates are search space for Build, not acceptance criteria. Do not make component names final unless the Diagram marks `required: true` with `sourceReason`.

For summary/detail cards with label-value rows, the contract must protect the key-value behavior itself: stable label/value alignment, readable value column, component-owned card background/radius/padding, and no narrow fixed column squeeze.

## Wire Semantic Tags

Add semantic tags to important `Screen Wire` sections before component scoring:

```txt
│ [summary | key-value-summary | card]       │
│ 가입 정보                                  │
│ 선택 약정 할인 금액          78,650원      │
```

- First field: section id.
- Second field: semantic role, such as `key-value-summary`, `form-field-group`, `choice-list`, `notice`, or `bottom-primary-action`.
- Third and later fields: boundary/placement, such as `card`, `contents-divider`, or `bottom-fixed`.
- Tags are layout meaning, not component names. They must flow into `patternDecision` and `layoutContract.role/structure`.
- If a tag and component scoring conflict, revise the scoring to preserve the tag/layout contract.

## Structure Gates

Apply the relevant gates from `SCREEN_STRUCTURE_PRINCIPLES.md` before final candidate scoring, including summary-card classification and Pattern-Family Precedent Gate handling. Record required gate fields, decisions, assumptions, and unresolved `decisionRequired` items in the section contract; do not resolve conflicts with unsupported component-name preference or proof-only omissions.

## Fit Scoring

Score fit by component capability against `layoutContract`, not by current copy length or component-name similarity.

- `strong`: directly supports role, structure, alignment, density, wrapping, and slots; has no known Distortion Gate risk; works without route-level CSS; preferably matches a nearby reference implementation.
- `medium`: supports the core structure, but one secondary concern needs verification, such as density, wrapping, state, or slot fit. Current short data alone is not enough for `medium` if the component has a known structural risk.
- `weak`: role is similar but structure, alignment, density, wrapping, or card/surface treatment is incomplete; known risk touches a core part of the layout contract; it would need wrappers, spacers, arbitrary width, or route-level CSS to look right.
- `reject`: violates a Distortion Gate, requires deprecated imports, lacks a required slot/state/wrapping behavior, or would change the wire reference's core layout.

When a candidate has a known fixed-width, missing surface, missing slot, or wrapping limitation that affects the section's core behavior, mark it `weak` or `reject` even if the current sample text is short.

Sample/proof/copy length may be used only as a wrapping test case, never as evidence for `fit`, `patternDecision`, `layoutContract`, candidate selection, rejection, or risk downgrade.

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

Run the Phase 3 validation required by `SCREEN_GENERATION_FLOW.md`. Do not proceed to Build while validation or the diagram contract fails.
