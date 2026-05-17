---
name: cx-screen-extract
description: Extract Phase 1 inputs for CX mobile screen generation in this repository. Use when Codex has SB files or user-provided source material and must produce screen ID, domain, task, state, CTA, policy tags, OGN IDs, slots, parts, and hierarchy.
---

# CX Screen Extract

Use this for Step 1 / Phase 1 only. This skill executes `SCREEN_GENERATION_FLOW.md`; it is not the SOT.

## Required Reading

- `SCREEN_GENERATION_FLOW.md`
- SB input directory or file
- SB `screen/*.md`
- SB `organism/*.md`

Do not read design documents in this phase. Do not resolve policy meaning in this phase.

## Intake Dependency

Step 0 Intake must already have confirmed:

- SB path type: file or directory
- target screen ID
- found screen spec
- referenced OGN specs: found or missing
- existing route and organism status
- work type: new, update, or rewrite

If Intake is missing, return to `cx-screen-create` before extracting.

## Output Shape

Produce an `Extract Summary` containing:

- `screenId`
- `domain`
- `userTask`
- `state`
- `primaryCTA` and secondary CTAs
- `policyTags` or unresolved policy hints
- `domainModuleIds` and `ognIds`, or unresolved reasons
- `slots`: Header, Content, Bottom, popup, bottom-sheet as applicable
- `parts`: visible sections and repeated rows/cards/fields
- `hierarchy`: rough `Screen -> Chrome -> Section -> Slot -> Stack -> Component`
- `stateBranches` and screen transitions
- `openQuestions`: only items not discoverable from sources

## Rules

- Extract only facts present in SB files.
- Keep the result table-first: screen rows, OGN rows, transition rows, case branch rows, and policy ref rows.
- Treat SB component IDs as intent/vocabulary hints, not implementation component names.
- Do not invent policy refs, OGN IDs, eligibility rules, validation rules, or copy from visual material alone.
- Do not redesign OGN boundaries in this phase. Record the SB OGN links as-is; boundary decisions belong to Diagram.
- Do not write long screen-by-screen UX narratives. If explanation is needed, keep it as `missing` or `ambiguous` notes.
- Check nearby existing screens only to disambiguate naming or route conventions.

## Done Criteria

- Screen ID, domain, policy tags, and OGN IDs are either listed or explicitly marked unresolved.
- CTA, state branches, and slot ownership are clear enough for Phase 2 mapping.
- No policy meaning is inferred from visual evidence without later Map verification.
