# SearchBar

## Overview

Purpose: define an implementation-ready contract for the planned CX base search bar component.

Figma SOT: [SKT_SDUI_Test_0512 / Component node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9914-57887&t=wZRehc2DOVV8corW-1)

Also checked the broader base section: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components |
| Figma Source | search-bar |
| Dependencies | Icon, Text, IconButton |
| Variants | type: LLM/search |
| Properties | 없음 |

### Implementation Files

Not implemented yet. Expected in `@pxds/cx-components`:

- `packages/cx-components/src/components/search-bar/SearchBar.tsx`
- `packages/cx-components/src/components/search-bar/SearchBar.types.ts`
- `packages/cx-components/src/components/search-bar/search-bar.variants.ts`
- `packages/cx-components/src/components/search-bar/search-bar.css`
- `packages/cx-components/src/components/search-bar/search-bar.readme.md`
- `packages/cx-components/src/components/search-bar/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.
- Keep the component visual-only unless the interaction contract is explicitly added by a consumer flow.

## Structure

Purpose: define the normalized code shape and keep the Figma type axis explicit.

### Target Structure

```txt
SearchBar
├─ Icon(search or LLM affordance)
├─ Text(placeholder/value)
└─ IconButton(action)?
```

`SearchBar` is a compact public compound for search entry affordances. The current inventory does not define text input state, focus state, submitted state, or clear-button behavior.

### Component Consumption

| Consumed component | Used for | Notes |
| --- | --- | --- |
| `Icon` | Leading search or LLM affordance | Use existing icon registry keys. |
| `Text` | Placeholder or display value | Use CX typography vocabulary rather than one-off text styles. |
| `IconButton` | Optional trailing action | Use only when the selected visual type or consumer flow requires a trailing action. |

### Figma Source / Normalization

Figma exposes `SearchBar` with:

- `type: LLM/search`
- no documented component properties

Code should normalize this to a `type` prop with two values, `llm` and `search`. Because no Figma bridge properties are listed in the inventory, the type axis should be expressed through the implementation's variant system and root component identity. Do not invent `data-figma-property-*` attributes unless the Figma export contract is expanded.

## Props

Purpose: define the minimal public API and Figma bridge expectations.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"llm" \| "search"` | `"search"` | Visual type mapped from Figma `type: LLM/search`. |
| `placeholder` | `string` | - | Placeholder text shown when no value is provided. |
| `value` | `string` | - | Optional display value. This does not imply native input behavior by itself. |
| `leadingIcon` | `IconType` | type-derived | Optional override only if Figma allows another affordance later. |
| `action` | `{ icon: IconType; label: string; onClick?: () => void }` | - | Optional trailing icon action rendered through `IconButton`. |
| `onClick` | `() => void` | - | Opens search, focuses a parent-owned input, or starts the owning flow. |
| `disabled` | `boolean` | `false` | Disables interaction when needed by a parent flow. |
| `className` | `string` | - | Additional root class. |

### Figma Mapping Props

Figma exposes no documented component properties for this source.

If implemented as a bridgeable component, use stable identity attributes only:

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| component root | `data-figma-render` | `component` |
| component root | `data-figma-component-id` | `search-bar` |

Variant values should stay in `search-bar.variants.ts` unless Figma later documents a `data-figma-property-type` bridge attribute.

### State Rules

- `type="search"` maps to Figma `type=search`.
- `type="llm"` maps to Figma `type=LLM`.
- `disabled` is an implementation convenience, not a Figma variant from the current inventory.
- Native input behavior is out of scope until a spec defines value editing, focus, submit, clear, or composition behavior.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { SearchBar } from "@pxds/cx-components";
```

### Examples

```tsx
<SearchBar placeholder="검색어를 입력해 주세요" onClick={openSearch} />

<SearchBar
  type="llm"
  placeholder="AI에게 물어보기"
  action={{ icon: "close", label: "닫기", onClick: closeSearch }}
/>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep `SearchBar` as one public component with `type="search" | "llm"`.
- Use `Icon`, `Text`, and `IconButton` instead of local inline UI.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="search-bar"` if bridge metadata is emitted.
- Keep the component visual and trigger-oriented until a true input contract is specified.
- Add registry metadata if this becomes a public `cx-components` export.

### Don't

- Do not silently turn this into `TextField`; SearchBar has a separate Figma source and visual contract.
- Do not add undocumented state axes such as focused, typed, error, or loading.
- Do not invent `data-figma-property-type` while the inventory says properties are `없음`.
- Do not create new icon assets before checking `@pxds/cx-icons` / `@pxds/pxds-icons` registries.
- Do not add route or parent-level margin/padding to correct SearchBar layout.

### Normalization Notes

- Inventory lists `SearchBar` as a Phase 3 simple public compound depending on `Icon`, `Text`, and `IconButton`.
- The current source is not implemented in `@pxds/cx-components`; this document is the implementation contract.
- Existing notes say it should stay visual-only until the interaction contract is defined.
- The exact icon types and trailing action presence must be confirmed from Figma during implementation.
- If a consumer needs full text input behavior, compose or extend deliberately rather than importing TextField semantics by accident.

### SVG Assets

SVG asset: not required at this stage.

Use existing icon registry entries for search, LLM, close, or action affordances. Missing Figma icon mappings should be recorded as icon inventory gaps before adding assets.

### Validation

Documentation-only changes do not require app build checks.

When implementation changes are made, validate through the consuming app:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify:

- The root includes stable component identity metadata if bridge metadata is emitted.
- The two visual types map to the Figma `LLM/search` axis.
- No undocumented `data-figma-property-*` attributes are emitted.
- The component does not duplicate `TextField` state or behavior without an explicit spec update.
