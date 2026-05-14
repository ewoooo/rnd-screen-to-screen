# TextButton

## Overview

Purpose: define the implementation-ready contract for the planned text-only button candidate from Figma `Component / base`.

Figma SOT:

- [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)
- [SKT_SDUI_Test_0512 / TextButton node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=10150-115492&t=wZRehc2DOVV8corW-1)

Figma component set id: `10150:115492`.

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components candidate |
| Figma Source | text-button |
| Dependencies | Text |
| Variants | Property 1: Default/Variant2 |
| Properties | 없음 |

### Implementation Files

Expected in `@pxds/cx-components`:

- `packages/cx-components/src/components/text-button/TextButton.tsx`
- `packages/cx-components/src/components/text-button/TextButton.types.ts`
- `packages/cx-components/src/components/text-button/text-button.variants.ts`
- `packages/cx-components/src/components/text-button/text-button.css`
- `packages/cx-components/src/components/text-button/text-button.readme.md`
- `packages/cx-components/src/components/text-button/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.
- Keep typography, color, gap, and divider styling tokenized through existing aliases rather than route-local raw styles.

## Structure

Purpose: normalize the Figma component set into a small action-text vocabulary.

### Target Structure

```txt
TextButton
├─ Text(label)
└─ Variant2 only
   ├─ Divider
   └─ Text(label)
```

The Figma node is a component set with one variant property, `Property 1`:

- `Default`: `28 x 21`, contains one text label with characters `버튼`.
- `Variant2`: `97 x 22`, contains two text labels with characters `버튼` and one `1 x 12` divider between them.

### Component Consumption

| Consumed component | Used for | Requirement |
| --- | --- | --- |
| `Text` | Visible button label or labels | Use the shared Text component for typography. Do not create a text-button-local text primitive. |

### Figma Source

```txt
TextButton
├─ Property 1=Default
│  └─ Text("버튼")
└─ Property 1=Variant2
   ├─ Text("버튼")
   ├─ Divider(1 x 12)
   └─ Text("버튼")
```

`Variant2` uses a simple vertical divider layer. This divider should be CSS, not a new component dependency, unless the shared `Divider` vocabulary is intentionally expanded to cover inline separators.

### SVG Assets

SVG asset: not required.

The Figma component contains text labels and a divider only. No icon, vector glyph, or external image asset is implied.

## Props

Purpose: define a minimal public API and Figma bridge contract.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | - | Primary button label. |
| `variant` | `"default" \| "paired"` | `"default"` | Normalizes Figma `Property 1=Default/Variant2` into code vocabulary. |
| `secondaryChildren` | `ReactNode` | - | Second label rendered only for `variant="paired"`. |
| `disabled` | `boolean` | `false` | Disables interaction and marks the control unavailable. |
| `asChild` | `boolean` | `false` | Optional composition escape hatch if matching the existing `Button` pattern. |
| `className` | `string` | - | Additional class name on root. |
| `onClick` | button handler | - | Native click handler for the default single-action case. |

Native button props should be supported if this is implemented as a standalone button component.

### Figma Mapping Props

| Code source | Figma property | Bridge value |
| --- | --- | --- |
| `variant="default"` | `Property 1=Default` | `data-figma-property-property-1="default"` |
| `variant="paired"` | `Property 1=Variant2` | `data-figma-property-property-1="variant2"` |

The root should also include:

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| root | `data-figma-render` | `component` |
| root | `data-figma-component-id` | `text-button` |

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { TextButton } from "@pxds/cx-components";
```

### Examples

```tsx
<TextButton onClick={handleClick}>버튼</TextButton>
```

```tsx
<TextButton variant="paired" secondaryChildren="버튼">
  버튼
</TextButton>
```

If this is absorbed into the existing button primitive instead of becoming public API:

```tsx
<Button variant="text">버튼</Button>
```

## Implementation Guide

Purpose: constrain implementation decisions before adding a new public component.

### Do

- Keep styling wired to `--semantic-*` / `--component-*` aliases and do not reintroduce component-local `--cx-*` CSS variables.
- Implement one `TextButton` component only if the component vocabulary confirms it should remain distinct from `Button` and `ButtonTextUnderline`.
- Consume `Text` for every visible label.
- Preserve `Default` as the single-label default.
- Normalize `Variant2` to a clearer code variant name such as `paired`.
- Render the `Variant2` divider as CSS using token aliases; keep it `1px` wide and `12px` high.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="text-button"` if a standalone component is added.
- Add `data-figma-property-property-1="default|variant2"` on the root.

### Don't

- Add SVG assets, icon dependencies, or separate vector files.
- Add a local typography primitive for the labels.
- Add a new component-local `--cx-*` variable to hold colors, spacing, typography, or divider values.
- Recreate this treatment with route-local padding, margin, font size, or raw screen styles.
- Merge with `ButtonTextUnderline` without preserving the Figma distinction between this larger text-button treatment and the smaller underline treatment.

### Normalization Notes

- Inventory lists `TextButton` as `제작 예정` and `cx-components candidate`; implementation should start as candidate vocabulary, not app-local UI.
- `Property 1=Default` is the default Figma variant and maps to a one-label text button.
- `Property 1=Variant2` is a two-label text-button group with one inline divider.
- The Figma sample label is `버튼`, but implementation must accept arbitrary short label content.
- The divider in `Variant2` is structural styling inside `TextButton`, not a separate SVG asset.

### Relationship to Text, Button, and ButtonTextUnderline

`TextButton` is action-like and text-only, so it must be checked against existing `Text`, `Button`, and `ButtonTextUnderline` vocabulary before becoming public API.

- As `Text`: feasible only if interaction semantics are handled elsewhere and this becomes a typography/action text preset.
- As `Button`: feasible if `Button` gains a text-only variant and the Figma bridge can still identify `text-button`.
- As standalone `TextButton`: justified if the paired `Variant2` structure is repeatedly used and needs a stable Figma component identity.
- Compared with `ButtonTextUnderline`: `TextButton` is the larger base text-action candidate with `Default/Variant2`; `ButtonTextUnderline` is a separate small underline treatment. They should not be merged without a broader text-button taxonomy.

Recommended first implementation path: implement as a standalone candidate only if `Variant2` is needed by screens or Figma export; otherwise, consider a `Button` text-only variant with a Figma bridge alias.

### Validation

Documentation-only changes do not require app build checks.

When implementation changes are made, validate through the consuming app:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes:

- `data-figma-render="component"`
- `data-figma-component-id="text-button"`
- `data-figma-property-property-1`
