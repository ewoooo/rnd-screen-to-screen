# ButtonXsmallSolid

## Overview

Purpose: identify ownership, source, implementation readiness, and whether this should become a standalone component or normalize into `Button`.

Figma SOT: [SKT_SDUI_Test_0512 / ButtonXsmallSolid component node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9743-57542&t=wZRehc2DOVV8corW-1)

Figma section reference: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 완료 |
| Implementation Target | cx-components candidate |
| Figma Source | button-xsmall-solid |
| Dependencies | Icon, Button |
| Internal Parts | 없음 |
| Variants | State: Active/Disabled |
| Properties | 없음 |

### Implementation Files

Implemented in `@pxds/cx-components`:

- `packages/cx-components/src/components/button-xsmall-solid/ButtonXsmallSolid.tsx`
- `packages/cx-components/src/components/button-xsmall-solid/ButtonXsmallSolid.types.ts`
- `packages/cx-components/src/components/button-xsmall-solid/button-xsmall-solid.variants.ts`
- `packages/cx-components/src/components/button-xsmall-solid/button-xsmall-solid.css`
- `packages/cx-components/src/components/button-xsmall-solid/button-xsmall-solid.readme.md`
- `packages/cx-components/src/components/button-xsmall-solid/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.

## Structure

Purpose: define the target component structure and how Figma-only nodes normalize into code.

### Target Structure

```txt
ButtonXsmallSolid
├─ label
└─ Icon(type="download", size=12)? (active only)
```

Figma source:

```txt
ButtonXsmallSolid
├─ State=Active
│  ├─ Text("쿠폰 받기")
│  └─ Icon, 12
└─ State=Disabled
   └─ Text("보유중")
```

Checked Figma dimensions and styling:

| State | Size | Padding | Radius | Content |
| --- | --- | --- | --- | --- |
| Active | 64 x 21 | horizontal 8, vertical 4 | 9999 | `쿠폰 받기` + 12px icon |
| Disabled | 42 x 21 | horizontal 8, vertical 4 | 9999 | `보유중` |

Text uses Pretendard Variable SemiBold, 10px, 130% line-height, white fill. Figma letter spacing is `-4%`; code should not introduce ad hoc font-size or spacing tokens without recording it as a token gap.

### Component Consumption

| Consumed component | Used for | Current implementation |
| --- | --- | --- |
| `Button` | Root interactive action, solid background, disabled behavior | Existing `Button` has `primary/secondary/disabled` and `small/medium/large/xlarge`; it does not yet expose `xsmall`. |
| `Icon` | Active-state trailing download glyph | Existing icon registry includes `download` and public size `12`, so no new icon component is required. |

### Figma Source Difference

This candidate appears absorbable by `Button` if the system accepts:

- `size="xsmall"` with 21px height, 8px horizontal padding, 4px vertical padding, 10px label typography, and full radius.
- Solid visual treatment mapped to existing `variant="primary"` or a future `variant="solid"` naming layer.
- Optional trailing `Icon type="download" size={12}` controlled by state/content rules.

Create a separate `ButtonXsmallSolid` only if downstream scoped items, especially `ListSelectedRightItem`, need this exact Figma component id and fixed label/icon contract as a private adapter.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `ButtonXsmallSolid` | `Button` extension or private `ButtonXsmallSolid` adapter | candidate |
| `State=Active` | `state="active"` | yes, if adapter exists |
| `State=Disabled` | `state="disabled"` and native disabled | yes, if adapter exists |
| text layer | `children` / `label` | no, content region |
| nested `Icon` | `Icon type="download" size={12}` | yes |

## Props

Purpose: define the public or private adapter API and the Figma bridge contract.

### Props

If implemented as a private adapter:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `state` | `"active" \| "disabled"` | `"active"` | Visual state matching the Figma `State` axis. |
| `disabled` | `boolean` | derived from `state` | Native disabled state. If `true`, resolves state to `disabled`. |
| `children` | `ReactNode` | state-based default | Button label. Default can be `쿠폰 받기` for active and `보유중` for disabled only in screen/spec fixtures; product code should pass explicit copy. |
| `icon` | `ReactNode \| false` | active download icon | Optional trailing icon. Hidden when disabled. |
| `className` | `string` | - | Additional class name on root. |

If absorbed into `Button`, avoid a new public prop surface and represent this as:

```tsx
<Button size="xsmall" variant="primary">
  쿠폰 받기
  <Icon type="download" size={12} color="on-brand" />
</Button>
```

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| resolved state | `data-figma-property-state` | `active` / `disabled` |

Preserve the exact component identity only if a private adapter is created:

- `data-figma-render="component"`
- `data-figma-component-id="button-xsmall-solid"`
- `data-figma-property-state`

### State Rules

- Figma names the axis `State` with values `Active` and `Disabled`; code should normalize to `active` and `disabled`.
- `disabled=true` must override `state` and resolve to `disabled`.
- `state="disabled"` must set native `disabled` when rendering a real `button`.
- The `xsmall` part is a size contract, not a semantic variant.
- The `solid` part is a visual treatment contract. Prefer mapping to the existing Button primary/solid fill before adding a new variant name.
- Active state may render the trailing icon; Disabled state does not render the icon in the checked Figma source.

## Usage

Purpose: show expected consumer usage.

### Import

Preferred if absorbed into Button:

```tsx
import { Button, Icon } from "@pxds/cx-components";
```

Private adapter only if required:

```tsx
import { ButtonXsmallSolid } from "@pxds/cx-components";
```

### Examples

Preferred Button composition:

```tsx
<Button size="xsmall" variant="primary">
  쿠폰 받기
  <Icon type="download" size={12} color="on-brand" />
</Button>
```

Private adapter:

```tsx
<ButtonXsmallSolid>쿠폰 받기</ButtonXsmallSolid>
<ButtonXsmallSolid state="disabled">보유중</ButtonXsmallSolid>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep styling wired to `--semantic-*` / `--component-*` aliases and do not reintroduce component-local `--cx-*` CSS variables.
- First evaluate extending `Button` with `size="xsmall"` instead of adding a standalone public component.
- Use `Button` for the root action semantics and disabled behavior.
- Use `Icon type="download" size={12}` for the active-state trailing glyph.
- Keep the state axis limited to `active` and `disabled`.
- Preserve Figma bridge attributes if a private adapter is needed for export/import fidelity.
- Use token CSS for padding, radius, color, typography, and icon gap; record a token gap if the 10px label style or 21px height has no existing token.

### Don't

- Add a route-local inline pill button to match this one instance.
- Add a new icon asset for the active trailing glyph unless the existing `download` icon fails visual QA.
- Promote fixed Korean labels into the reusable component API.
- Add arbitrary `xsmall` numbers to screen code; the size contract belongs in Button or this adapter.

### Normalization Notes

- Inventory marks this as Phase 2, order 14, after primitive dependencies and before `ListSelectedRightItem`.
- It should remain private/scoped unless multiple public surfaces need the exact compact solid action.
- Existing `Button` currently supports `small/medium/large/xlarge`, so `xsmall` is the missing size contract.
- Existing `Button` currently names filled action as `primary`; Figma names this component `Solid`. Keep the naming bridge explicit if code uses `primary`.
- Existing `Icon` supports `download` at size `12`, and `download` is recolorable.

### SVG Assets

SVG asset: not required.

The checked Figma active state uses a 12px nested icon that matches the existing `download` icon direction. Use the current `Icon` registry first; only add a new SVG if screenshot QA proves the registry glyph is materially different.

### Validation

Validate through consuming app checks when implementation changes are made.

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes, if implemented as an adapter:

- `data-figma-render="component"`
- `data-figma-component-id="button-xsmall-solid"`
- `data-figma-property-state`

Verify disabled resolution forces:

- `data-figma-property-state="disabled"`
- native `disabled` or `aria-disabled=true`, depending on the rendered element
- no trailing icon
