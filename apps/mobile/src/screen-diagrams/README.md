# Screen Diagrams

Reference-only screen wire packs used during Phase 3 `Screen.diagram.md` creation and review.

This directory is the promoted SOT location for reusable screen diagram references. Files here are not implementation routes and must not supply policy IDs, OGN IDs, or final copy for a target screen unless those values are also confirmed in the target screen's `Screen.map.md` and `Screen.config.ts`.

## Naming

- Directory names describe the reference family, such as `detail-form` or `list-text`.
- Diagram filenames describe the visible screen role, such as `personal-info-input.diagram.md` or `discount-history-list.diagram.md`.
- Figma node IDs and frame indices stay inside each README or `Screen Contract` for traceability.

## Use

- Select the closest reference by screen family, AppScreen rails, section boundary behavior, field/list/card density, and CTA placement.
- Record the chosen file in the target screen's `Screen Contract.wireReference`.
- Treat divider evidence carefully: section divider bands, contents dividers, row separators, and field-stack gaps are different pattern decisions.
