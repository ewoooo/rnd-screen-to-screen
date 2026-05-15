# Accordion

## Overview

Purpose: define an implementation-ready contract for the planned CX base accordion component.

Figma SOT: [SKT_SDUI_Test_0512 / Component node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=10065-55537&t=wZRehc2DOVV8corW-1)

Also checked the broader base section: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components |
| Figma Source | accordion |
| Dependencies | Icon, Text |
| Variants | State: Close/Open |
| Properties | `data-figma-property-txt`: slot; `data-figma-property-left-text`: boolean |

### Implementation Files

Not implemented yet. Expected in `@pxds/cx-components`:

- `packages/cx-components/src/components/accordion/Accordion.tsx`
- `packages/cx-components/src/components/accordion/Accordion.types.ts`
- `packages/cx-components/src/components/accordion/accordion.variants.ts`
- `packages/cx-components/src/components/accordion/accordion.css`
- `packages/cx-components/src/components/accordion/accordion.readme.md`
- `packages/cx-components/src/components/accordion/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.
- Keep state styling local to the component class and variant attributes; route or screen styles must not correct accordion spacing.

## Structure

Purpose: define the normalized code shape while keeping undocumented Figma internals out of the public API.

### Target Structure

```txt
Accordion
├─ header button
│  ├─ Text(leftText)?
│  ├─ Text(title)
│  └─ Icon(open/close affordance)
└─ content slot? (state=open)
```

`Accordion` is a public compound. The header owns the interactive disclosure control, and the body is caller-supplied slot content represented by Figma `txt`.

### Component Consumption

| Consumed component | Used for | Notes |
| --- | --- | --- |
| `Text` | Header title, optional left text | Use existing CX typography vocabulary instead of native one-off text styles where possible. |
| `Icon` | Open/close affordance | Use the existing icon registry. Do not embed custom SVG in the component. |

### Figma Source / Normalization

Figma exposes `Accordion` with:

- `State: Close/Open`
- `txt` as a slot property
- `left-text` as a boolean property

Code should normalize those into one component with explicit `open`, `leftText`, and `children`/`content` inputs. The `Close` state omits or hides the content slot; the `Open` state exposes the slot region. Figma-specific `txt` remains a bridge name, not a public prop name.

## Props

Purpose: define the minimal public API and Figma bridge expectations.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | - | Main header text/content. |
| `leftText` | `ReactNode` | - | Optional left-side text region mapped from Figma `left-text`. |
| `open` | `boolean` | `false` | Controlled visual open state. |
| `defaultOpen` | `boolean` | `false` | Initial uncontrolled open state if uncontrolled behavior is supported. |
| `onOpenChange` | `(open: boolean) => void` | - | Called when the header disclosure control toggles. |
| `children` | `ReactNode` | - | Body content mapped to the Figma `txt` slot. |
| `disabled` | `boolean` | `false` | Disables header interaction if a parent flow requires it. |
| `className` | `string` | - | Additional root class. |

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| component root | `data-figma-render` | `component` |
| component root | `data-figma-component-id` | `accordion` |
| `open` resolved state | `data-figma-property-state` | `open` / `close` |
| body slot wrapper | `data-figma-property-txt` | slot marker |
| `leftText` presence | `data-figma-property-left-text` | `true` / `false` |

Figma variant names are `Close/Open`; code should use lowercase bridge values only if that matches the existing renderer convention. Preserve the documented property names even if the public API uses clearer prop names.

### State Rules

- `open=true` maps to Figma `State=Open`; `open=false` maps to `State=Close`.
- `leftText` presence controls `data-figma-property-left-text`.
- The body slot should remain mounted or unmounted according to the implementation's accessibility approach, but the bridge must still express the resolved open state.
- `disabled` is an implementation convenience, not a Figma variant from the current inventory.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { Accordion } from "@pxds/cx-components";
```

### Examples

```tsx
<Accordion title="자주 묻는 질문" open>
  <Text>상세 안내 문구를 표시합니다.</Text>
</Accordion>

<Accordion title="요금제 혜택" leftText="01" onOpenChange={setOpen}>
  <Text>혜택 상세 내용을 표시합니다.</Text>
</Accordion>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep one public `Accordion` component with `State: Close/Open` normalized through the resolved open state.
- Use `Text` and `Icon` vocabulary for visible header content and the disclosure affordance.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="accordion"`.
- Preserve `data-figma-property-txt` for the content slot and `data-figma-property-left-text` for left text presence.
- Use semantic button behavior for the header and keep `aria-expanded` aligned with the resolved open state.
- Add registry metadata if this becomes a public `cx-components` export.

### Don't

- Do not create separate public `AccordionOpen` or `AccordionClose` components.
- Do not expose `txt` as a public prop name; keep it as a Figma bridge term only.
- Do not add local `--cx-*` variables or one-off spacing values when a token alias is available.
- Do not embed a new chevron/arrow SVG if the existing `Icon` registry covers the affordance.
- Do not add route or parent-level margin/padding to correct accordion layout.

### Normalization Notes

- Inventory lists `Accordion` as a Phase 3 simple public compound depending only on `Icon` and `Text`.
- The current source is not implemented in `@pxds/cx-components`; this document is the implementation contract.
- The Figma `txt` property is treated as slot content because the inventory explicitly labels it as `slot`.
- The optional `left-text` property is represented as presence-based API and bridge metadata.
- Any exact icon type, spacing, and typography values must be confirmed from Figma during implementation before hardcoding a contract.

### SVG Assets

SVG asset: not required at this stage.

Use the existing `Icon` registry for the open/close affordance. If Figma resolves to a missing icon type during implementation, record the icon gap in the icon inventory before adding a new asset.

### Validation

Documentation-only changes do not require app build checks.

When implementation changes are made, validate through the consuming app:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify:

- The root includes `data-figma-render="component"` and `data-figma-component-id="accordion"`.
- Open/close state maps to the documented state bridge.
- `leftText` presence maps to `data-figma-property-left-text`.
- Body content is represented as the `txt` slot without inventing route-local layout fixes.
