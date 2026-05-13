# NOVA-MBR-PG-002-0 Handoff Bundle

This bundle collects the route, MBR OGN components, and directly used local package source needed to review or port `NOVA-MBR-PG-002-0`.

## Entry

- Route: `source/apps/mobile/src/app/(mbr)/NOVA-MBR-PG-002-0/page.tsx`
- Screen: `source/apps/mobile/src/app/(mbr)/NOVA-MBR-PG-002-0/Screen.tsx`
- Screen config: `source/apps/mobile/src/app/(mbr)/NOVA-MBR-PG-002-0/Screen.config.ts`

## Included Patterns

- `ProgressAppBar`

## Included OGN

- `SectionHeaderPage`
- `TextFieldMemberInfo`

## Included Component/CSS Sources

- CX components used by the screen and OGN:
  - `AppBar`
  - `StatusBar`
  - `TitleSection`
  - `TextField`
  - `Text`
  - `Button`
  - `IconButton`
  - `Icon`
- CX icons and original SVG registry.
- CX token CSS:
  - `tokens.css`
  - `text-styles.css`
- PXDS layout runtime used by the screen:
  - `AppScreen`
  - `PageStackContents`
  - primitives such as `VStack` and `Slot`
  - screen export helpers
- MBR pattern CSS for the progress app bar.

## External Runtime Dependencies

This bundle preserves the repo source layout, not a standalone npm package. It still assumes the normal project runtime dependencies, especially:

- `react`
- `next`
- `class-variance-authority`
- `clsx`
- `tailwind-merge`
- `radix-ui`

## Notes

- Files are copied under `source/` with their original repo-relative paths.
- App usage was not changed while creating this bundle.
- The inactive branch path from the source screen was removed from this handoff bundle only, so the handoff keeps only the visible progress-bar screen path.
- This bundle is the progress-bar version of `NOVA-MBR-PG-002-0`; the header uses `ProgressAppBar` with `currentStep={2}` and `totalSteps={5}`.
- The source reflects the current working tree state at bundle creation time.
