---
name: cx-screen-diagram
description: Compatibility entrypoint for Step 3 Screen.diagram.html work. Use when Codex must select a screen-diagrams wire reference, run Pattern Analysis Gate, write visual mobile rail diagrams, Section Inspector, layoutStrategy, layoutContract, componentCandidates, Policy / OGN Matrix, and Distortion Gates before implementation; route to newer stage skills when available.
---

# CX Screen Diagram

Use this as the compatibility entrypoint for Step 3 Diagram work. `Screen.diagram.html` owns structure, wire reference application, layout strategy, layout contract, governance application, OGN boundary decisions, and component candidate discovery. Existing `Screen.diagram.md` is a migration source/reference during transition and must not be deleted just because an HTML diagram is created. The HTML diagram must not invent policy meaning or make component names the acceptance criteria.

This skill executes Step 3-6 from `SCREEN_GENERATION_FLOW.md`: Reference Decision, OGN Boundary Decision, Component Candidate Decision, and Diagram Contract. The flow and structure documents are the SOT; this skill only operationalizes them.

## Compatibility Routing

If newer stage-specific skills are available in the current Codex environment, route to them when they better match the work and use this file as the Step 3 compatibility contract:

- Use `cx-screen-thin-diagram` for scoped Screen.diagram.html updates where Map, pattern family, wire reference, and OGN ownership are already clear.
- Use `cx-screen-design-iterate` when rendered evidence or review feedback requires a deliberate Diagram/Build/Render loop.
- Use `cx-screen-contract-sync` when the diagram only needs consistency alignment with Map/config/implementation metadata and no new design decision.
- Use this compatibility entrypoint directly for full Step 3-6 work: Reference Decision, OGN Boundary Decision, Component Candidate Decision, and Diagram Contract.

When no newer stage skill is available, execute the workflow below directly. Do not split routing by creating files or ad-hoc local skills. Stage routing must preserve the same `Screen.diagram.html` output, hidden `#diagram-contract`, and Step 3 validation gates.

## Required Reading

- `SCREEN_STRUCTURE_PRINCIPLES.md`
- `docs/html-screen-diagram-standard.md`
- `SCREEN_GENERATION_FLOW.md`
- `DESIGN_PATTERNS.md`
- `DESIGN_FOUNDATION.md`
- Step 2 `Screen.map.md`
- closest references under `apps/mobile/src/screen-diagrams/`

## Workflow

1. Run Reference Decision:
   - choose `patternFamily`
   - identify the official `DESIGN_PATTERNS.md` pattern
   - search `apps/mobile/src/screen-diagrams/`, nearby existing `Screen.diagram.html`, legacy `Screen.diagram.md`, and `cx-example`
   - record accepted and rejected references with reasons
2. Record `wireReference` in `Screen Contract`.
3. Draw a draft `Screen Wire` from the reference and current Map before naming components.
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
   - `visualWeightContract`: primary-shaped action allowance, content secondary shape, forbidden button shape/scale, hierarchy fail conditions, and required evidence
6. Run Component Candidate Decision:
   - score candidates as `strong | medium | risky | weak | reject`
   - score by capability against layout behavior, not name similarity or sample/proof/copy length
   - reject candidates that need route-level CSS, raw spacing/color/font-size, deprecated imports, or known wrapping/alignment distortion
   - mark candidates `risky` when their capability is plausible but their rendered visual weight could violate CTA hierarchy, such as Content `ActionButton(secondary)` near a Bottom primary CTA
   - record vocabulary gaps instead of disguising them as custom screen CSS
7. Run Design Pattern Review Gate after the first draft diagram and before Build planning:
   - reopen `DESIGN_PATTERNS.md`; do not rely on memory or the initial reference selection
   - compare the chosen official pattern against the draft `Screen Wire`
   - verify the pattern's layout/spacing contract, section boundaries, CTA placement, divider behavior, content density, field/list/card grouping, and state expectations
   - verify Component Composition Gate: field actions use the correct inline/compact slot, list/choice rows use the correct list/card pattern, and Content actions do not visually compete with Bottom primary actions
   - verify visual weight from the drawn diagram, not component variant names. A `secondary` button that looks like a full-width primary CTA is a fail.
   - revise `Screen Wire`, `Section Contracts`, `layoutStrategy`, `layoutContract`, and `componentCandidates` before moving on
   - record the recheck result in `diagram-contract.screenContract.patternRecheck` as `revised | no-change`, with the pattern section, reason, and changes
8. Write `Screen.diagram.html` using `docs/html-screen-diagram-standard.md`:
   1. `Visual Screen`
   2. `Review Summary`
   3. `Reference Summary`
   4. `Section Inspector` with candidate evaluation details
   5. `Distortion Gates`
   6. hidden `<script type="application/json" id="diagram-contract">`
9. Apply Step 2 governance refs to CTA hierarchy, state handling, navigation, and copy decisions.
10. For each section/OGN in `diagram-contract.sections`, write fields in this order: `patternEvidence`, `patternDecision`, `ognBoundaryDecision`, `layoutStrategy`, `layoutContract`, `visualWeightContract`, then `componentCandidates`.
11. Run the required Step 3 validation before moving to Build.

## Pattern Analysis Gate

Do not collapse visible micro patterns into generic spacing. Record the evidence in `diagram-contract.sections[].patternEvidence` and surface the review in the visible Section Inspector.

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

For sections with actions, especially when the screen also has `Bottom(preset="primary-cta")`, add `visualWeightContract`:

- `primaryShapeAllowed`: where a primary-shaped action may appear, usually `Bottom only`.
- `contentActionShape`: `inline | compact | text-link | card-local | none`.
- `disallowed`: shapes that would visually compete, such as Content full-width pill `ActionButton`.
- `hierarchyFailIf`: concrete visual fail conditions based on width, height, radius, emphasis, and proximity.
- `evidenceRequired`: `geometry` plus `screenshot-or-visual-review` when visual hierarchy is at risk.

`componentCandidates` names possible components, compositions, patterns, or organisms after `layoutContract`. Each candidate must record `fit: strong | medium | risky | weak | reject`, `source`, `reason`, and `risk`. Candidates are search space for Build, not acceptance criteria. Do not make component names final unless the Diagram marks `required: true` with `sourceReason`.

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
- `risky`: supports behavior but may violate visual weight or hierarchy once rendered. Use this for candidates such as Content `ActionButton(secondary)` on a screen with Bottom primary CTA; require screenshot/visual review before accepting.
- `weak`: role is similar but structure, alignment, density, wrapping, or card/surface treatment is incomplete; known risk touches a core part of the layout contract; it would need wrappers, spacers, arbitrary width, or route-level CSS to look right.
- `reject`: violates a Distortion Gate, requires deprecated imports, lacks a required slot/state/wrapping behavior, or would change the wire reference's core layout.

When a candidate has a known fixed-width, missing surface, missing slot, or wrapping limitation that affects the section's core behavior, mark it `weak` or `reject` even if the current sample text is short.

Sample/proof/copy length may be used only as a wrapping test case, never as evidence for `fit`, `patternDecision`, `layoutContract`, candidate selection, rejection, or risk downgrade.

## Screen Wire Rules

The visible `Visual Screen` must look like an actual mobile screen rail, not a prose outline or generic section-card summary. It must expose the layer structure and real display text: title, subtitle, labels, values, helper/error copy, list row titles/captions, card titles, and CTA labels. Left/right key-value sections must be rendered as left/right rows, not prose bullets. The hidden `diagram-contract.screenWire` must preserve the same rail and section structure. Include:

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
- Every visual `data-section-id` must appear in `diagram-contract.sections`.
- Use `Bottom(preset="...")`; do not use `AppScreen.ActionBar` in new diagrams.
- Reject placeholder visual output such as only section ids, component names, or "Migrated from legacy markdown" cards. If the md has richer Screen Wire content, move that visible structure into HTML instead of summarizing it.

## Wire Reference Rules

`diagram-contract.screenContract.wireReference` must include:

```txt
- wireReference:
  - source: apps/mobile/src/screen-diagrams/.../<semantic-name>.diagram.md
  - matchedParts: ...
  - intentionalDifferences: ...
  - limitation: reference-only visual structure; policy/copy/OGN ids come from Screen.map.md and Screen.config.ts
```

If no reference exists, use `source: none-found` and record `reason`.

## Design Pattern Review Gate

After drawing the first draft `Screen Wire`, reopen `DESIGN_PATTERNS.md` and compare the selected official pattern against the draft diagram. This is a required gate inside Step 3: draw, check the pattern SOT, revise the diagram, then continue to Build planning.

Build cannot start until this gate is recorded. If the draft differs from the pattern contract, revise the diagram first; do not leave the mismatch for Fast Build or route-level CSS to solve.

`diagram-contract.screenContract` must include:

```txt
- patternRecheck:
  - source: DESIGN_PATTERNS.md#<pattern-or-section>
  - result: revised | no-change
  - changes: ...
  - reason: ...
```

If the recheck changes section boundaries, divider behavior, CTA placement, density, or component fit, update both the visible `Visual Screen` and hidden `diagram-contract.sections`. Do not leave stale visual DOM with corrected JSON underneath.

Gate checks:

- selected pattern family matches the user task and screen state
- section boundaries, divider bands, and contents dividers follow the pattern contract
- CTA placement matches the pattern, especially fixed bottom actions
- Component Composition Gate passes: field-bound actions remain inline/compact, Content secondary actions are visually subordinate, and only one primary-shaped CTA is visible on a Bottom CTA screen
- field/list/card grouping preserves the reference density and hierarchy
- typography scale and row emphasis do not drift from the pattern
- state, notice, error, empty, or loading treatment follows the pattern rules

## Done Criteria

Run the Step 3 validation required by `SCREEN_GENERATION_FLOW.md`. Do not proceed to Build while validation or the diagram contract fails.
