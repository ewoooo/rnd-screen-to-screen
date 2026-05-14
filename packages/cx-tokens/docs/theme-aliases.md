# Theme Aliases

## Purpose

This document defines how `@pxds/cx-tokens` exposes theme-neutral CSS variables for light and dark mode.

The goal is not to replace component CSS or move styling into Tailwind. The goal is to remove repeated light/dark alias wiring from each component while keeping `src/tokens.css` as the generated source of truth.

## Source Of Truth

`src/tokens.css` is generated from the Tokens Studio source under `src/originals`.

Do not hand-edit token values in generated CSS.

```txt
src/originals
  -> scripts/generate-css-variables.mjs
  -> src/tokens.css
```

`tokens.css` owns:

- Primitive tokens: `--color-*`, `--spacing-*`, `--radius-*`, font primitives.
- Text style tokens: `--16-semi-*`, `--14-med-*`, etc.
- Light and dark semantic tokens: `--semantic-light-*`, `--semantic-dark-*`.
- Light and dark component tokens: `--component-light-*`, `--component-dark-*`.

## Alias Layer

Theme aliases collapse light/dark token pairs into stable variables.

```txt
src/tokens.css
  -> src/theme-aliases.css
  -> src/style.css
  -> component CSS
```

Example:

```css
:root,
[data-theme="light"] {
	--component-button-bg-primary: var(--component-light-button-bg-primary);
	--semantic-color-text-primary: var(--semantic-light-color-text-primary);
}

[data-theme="dark"] {
	--component-button-bg-primary: var(--component-dark-button-bg-primary);
	--semantic-color-text-primary: var(--semantic-dark-color-text-primary);
}
```

Component CSS can then use the stable alias and stop repeating dark-mode mappings locally.

```css
.cx-button {
	background: var(--component-button-bg-primary);
	color: var(--component-button-fg-primary);
}
```

## Public Import

Consumers should import the public adapter:

```css
@import "@pxds/cx-tokens/style.css";
```

`style.css` imports both the generated token values and theme aliases.

```css
@import "./tokens.css";
@import "./theme-aliases.css";
```

Existing `@pxds/cx-tokens/tokens.css` imports can remain during migration. Components should move to `style.css` when they start using theme-neutral aliases.

## Generation

Run this after `tokens.css` changes:

```sh
npm run generate:theme-aliases -w @pxds/cx-tokens
```

The generator reads `src/tokens.css` and writes:

```txt
src/theme-aliases.css
src/style.css
```

## Component Migration

Migrate components incrementally.

Before:

```css
.cx-button {
	--cx-button-bg-primary: var(--component-light-button-bg-primary);
	background: var(--cx-button-bg-primary);
}

[data-theme="dark"] .cx-button {
	--cx-button-bg-primary: var(--component-dark-button-bg-primary);
}
```

After:

```css
.cx-button {
	background: var(--component-button-bg-primary);
}
```

Recommended order:

1. Keep `tokens.css` as the generated value source.
2. Generate `theme-aliases.css`.
3. Export `@pxds/cx-tokens/style.css`.
4. Move one low-risk component to theme-neutral aliases.
5. Remove only the component-local light/dark alias variables that are now redundant.
6. Keep component CSS structure and Figma-matched values intact.

## Validation

For each alias migration:

- Do not hand-edit generated token values.
- Do not replace component CSS with utility classes.
- Do not introduce new raw color, spacing, radius, or typography values.
- Use theme-neutral aliases only when a light/dark pair exists.
- Verify light and dark themes through variable swapping.
- Run the relevant consumer build.
