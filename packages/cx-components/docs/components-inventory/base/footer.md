# Footer

## Overview

Purpose: define the simple footer compound used at the bottom of mobile content areas, without making each screen create its own legal/help text and action spacing.

Figma SOT: [SKT_SDUI_Test_0512 / Footer component node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9729-30506&t=wZRehc2DOVV8corW-1)

Figma section reference: [SKT_SDUI_Test_0512 / Component base](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components candidate |
| Figma Source | footer |
| Dependencies | Text, Button |
| Internal Parts | 없음 |
| Variants | Type: 01/02 |
| Properties | 없음 |

### Implementation Files

Not implemented yet. Expected files if this remains a standalone `@pxds/cx-components` candidate:

- `packages/cx-components/src/components/footer/Footer.tsx`
- `packages/cx-components/src/components/footer/Footer.types.ts`
- `packages/cx-components/src/components/footer/footer.variants.ts`
- `packages/cx-components/src/components/footer/footer.css`
- `packages/cx-components/src/components/footer/footer.readme.md`
- `packages/cx-components/src/components/footer/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.
- Footer spacing, typography, button placement, and background treatment must come from component/layout tokens, not route-local margin or padding fixes.

## Structure

Purpose: define the target component structure and normalize the two Figma footer types into a stable code contract.

### Target Structure

```txt
Footer
├─ Text?          supporting footer copy
└─ Button?        optional footer action
```

`Footer` owns the grouping and rhythm of footer copy plus an optional action. It should not own page chrome, safe-area placement, sticky positioning, or bottom navigation behavior.

### Component Consumption

| Consumed component | Used for | Expected implementation |
| --- | --- | --- |
| `Text` | Footer copy, notice text, or supporting information | Render semantic text with tokenized typography/color aliases. |
| `Button` | Optional footer action | Use existing `Button` size/type vocabulary; do not create a footer-only button style. |

### Figma Source / Normalization

Figma exposes `Footer` as a component set with `Type: 01/02`.

```txt
Footer
├─ Type=01
│  └─ Text
└─ Type=02
   ├─ Text
   └─ Button
```

Normalize the Figma type axis to lowercase code values: `type="01"` and `type="02"`. If later naming becomes clearer, code may offer semantic aliases such as `type="text"` and `type="action"` while preserving the Figma bridge value.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `Footer` component set | `Footer` | yes |
| `Type=01` | `type="01"` | variant value |
| `Type=02` | `type="02"` | variant value |
| nested text layer | `Text` content | yes, consumed dependency |
| nested button instance | `Button` slot/preset | yes, consumed dependency |

## Props

Purpose: define the public API and the Figma bridge contract expected for implementation.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"01" \| "02"` | derived from `button` presence | Figma type variant. `02` renders an action button region. |
| `children` | `ReactNode` | - | Footer copy. Prefer plain text or `Text`-compatible content. |
| `text` | `string` | - | Text fallback when `children` is absent. |
| `button` | `ReactNode` | - | Optional action slot. When present, resolves the component to `type="02"` unless explicitly overridden. |
| `buttonLabel` | `string` | - | Convenience label for rendering a default `Button`. |
| `onButtonClick` | `() => void` | - | Optional handler for the default button. |
| `className` | `string` | - | Additional class name on root. |

Do not bake product copy into the reusable component. Screen/spec fixtures may pass example Korean copy, but the component should require consumer-owned content.

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| `data-figma-render` prop default | `data-figma-render` | `component` |
| resolved component id | `data-figma-component-id` | `footer` when `data-figma-render="component"` |
| resolved `type` | `data-figma-property-type` | `01` / `02` |

The inventory currently lists no explicit properties, but `Type: 01/02` is a Figma variant axis. Emit the resolved type if Figma export needs stable variant matching.

### State Rules

- `type="01"` renders footer copy only.
- `type="02"` renders footer copy plus a button/action region.
- `button` presence may derive `type="02"`, but an explicit `type` prop should be normalized before bridge attributes are emitted.
- Disabled, loading, and pressed states belong to the nested `Button`, not to `Footer`.
- Sticky/fixed behavior belongs to the page layout or shell, not to `Footer`.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { Button, Footer } from "@pxds/cx-components";
```

### Examples

```tsx
<Footer text="가입 전 안내사항을 확인해 주세요." />

<Footer buttonLabel="확인" onButtonClick={handleConfirm}>
  신청 내용을 다시 확인해 주세요.
</Footer>

<Footer
  type="02"
  button={<Button size="medium" type="secondary">자세히 보기</Button>}
>
  추가 안내가 필요하면 상세 내용을 확인할 수 있습니다.
</Footer>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep styling wired to `--semantic-*` / `--component-*` aliases and do not reintroduce component-local `--cx-*` CSS variables.
- Keep one public `Footer` component with a small type axis.
- Consume `Text` for the copy region and `Button` for the action region.
- Normalize Figma `Type=01/02` to code `type="01" | "02"`.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="footer"` if the bridge consumes component metadata.
- Use existing layout primitives or tokenized CSS for internal alignment; do not repair footer position in screen routes.

### Don't

- Add route-local inline footer blocks for one-off spacing.
- Create footer-specific button variants when existing `Button` vocabulary can represent the action.
- Put bottom safe-area, sticky positioning, or navigation shell rules inside this component.
- Encode legal/product copy as defaults in the reusable component.
- Invent precise Figma measurements in code without checking token availability and recording gaps.

### Normalization Notes

- Inventory places `Footer` in Phase 3 because it depends only on the existing `Text` and `Button` foundations.
- Treat `Type: 01/02` as a visual/content composition axis, not an interaction state.
- If `Footer` appears only inside a larger page template, keep this component responsible for content grouping and let layout own placement.
- If `Type=02` needs a preconfigured button, implement it through existing `Button` props or a `button` slot rather than a new private item set.

### SVG Assets

SVG asset: not required.

The documented dependencies are `Text` and `Button`. No icon or image asset is implied by the inventory.

### Validation

Documentation-only changes do not require app build checks.

When implementation is added, validate through the consuming app checks:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes, if bridge metadata is implemented:

- `data-figma-render="component"`
- `data-figma-component-id="footer"`
- `data-figma-property-type="01"` or `data-figma-property-type="02"`
